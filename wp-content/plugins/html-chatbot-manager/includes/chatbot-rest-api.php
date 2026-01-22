<?php
// REST API endpoint for sending chatbot messages
add_action('rest_api_init', function () {
    register_rest_route('wp-chatbot/v1', '/send', [
        'methods'  => 'POST',
        'callback' => 'wp_chatbot_rest_send_message',
        'permission_callback' => '__return_true'
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('wp-chatbot/v1', '/history', [
        'methods'  => 'POST',
        'callback' => 'wp_chatbot_get_thread_history',
        'permission_callback' => '__return_true'
    ]);
});

/**
 * Small helper to standardize OpenAI HTTP calls and JSON decoding.
 */
function wp_chatbot_openai_request($method, $url, $api_key, $body = null, $timeout = 55) {
    $args = [
        'timeout' => $timeout,
        'method'  => strtoupper($method),
        'headers' => [
            'Authorization' => 'Bearer ' . $api_key,
            'Content-Type'  => 'application/json',
            'OpenAI-Beta'   => 'assistants=v2',
        ],
    ];
    if (!is_null($body)) {
        $args['body'] = is_string($body) ? $body : wp_json_encode($body);
    }

    $res = wp_remote_request($url, $args);

    if (is_wp_error($res)) {
        return new WP_Error('wp_chatbot_http_error', $res->get_error_message(), ['status' => 502]);
    }

    $code = wp_remote_retrieve_response_code($res);
    $raw  = wp_remote_retrieve_body($res);

    if ($code < 200 || $code >= 300) {
        // Log upstream detail for debugging, but return a generic message.
        error_log("[wp-chatbot] OpenAI non-2xx ($code) for $method $url: $raw");
        return new WP_Error('wp_chatbot_upstream_error', 'Upstream error from OpenAI', ['status' => 502, 'upstream_code' => $code]);
    }

    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("[wp-chatbot] JSON decode failed for $method $url: " . json_last_error_msg());
        return new WP_Error('wp_chatbot_bad_json', 'Invalid JSON from OpenAI', ['status' => 502]);
    }

    return [
        'code' => $code,
        'data' => $data,
        'raw'  => $raw,
        'headers' => wp_remote_retrieve_headers($res),
    ];
}

function wp_chatbot_get_thread_history($request) {
    $params    = $request->get_json_params();
    $thread_id = sanitize_text_field($params['thread_id'] ?? '');
    $api_key   = sanitize_text_field($params['api_key_id'] ?? '');

    if (!$thread_id || !$api_key) {
        return new WP_REST_Response(['error' => 'Missing thread_id or api_key'], 400);
    }

    $res = wp_chatbot_openai_request(
        'GET',
        "https://api.openai.com/v1/threads/{$thread_id}/messages",
        $api_key,
        null,
        55
    );
    if (is_wp_error($res)) {
        return $res;
    }

    $data = $res['data'] ?? null;
    if (!isset($data['data']) || !is_array($data['data'])) {
        return new WP_REST_Response(['error' => 'Invalid response from OpenAI'], 502);
    }

    $messages = [];
    foreach ($data['data'] as $msg) {
        $role = $msg['role'] ?? 'unknown';
        $text = '';

        if (!empty($msg['content']) && is_array($msg['content'])) {
            foreach ($msg['content'] as $block) {
                if (isset($block['text']['value'])) {
                    $text .= $block['text']['value'] . "\n";
                }
            }
        }

        $messages[] = [
            'role' => $role,
            'text' => trim($text)
        ];
    }

    // Most recent last
    return new WP_REST_Response(['messages' => array_reverse($messages)], 200);
}

function wp_chatbot_cleanup_old_threads($api_key) {
    $threads     = get_option('wp_chatbot_threads', []);
    $now         = time();
    $persistence = (int) get_option('wp_chatbot_thread_persistence', 30); // minutes
    $cutoff      = $now - ($persistence * 60);
    $deleted_count = 0;

    foreach ($threads as $thread_id => $timestamp) {
        if ($timestamp < $cutoff) {
            $delete_url = "https://api.openai.com/v1/threads/{$thread_id}";
            $res = wp_chatbot_openai_request('DELETE', $delete_url, $api_key, null, 55);

            // If OpenAI says it's gone or returns a structured success, remove locally.
            if (!is_wp_error($res)) {
                unset($threads[$thread_id]);
                $deleted_count++;
            } else {
                // If upstream error, keep local entry to retry later, but log it.
                error_log("[wp-chatbot] Failed to delete expired thread $thread_id: " . $res->get_error_message());
            }
        }
    }

    update_option('wp_chatbot_threads', $threads);
    // error_log("🧹 Cleaned up $deleted_count expired threads");
}

function wp_chatbot_thread_is_valid($thread_id) {
    $threads   = get_option('wp_chatbot_threads', []);
    $timestamp = $threads[$thread_id] ?? 0;
    $expiry    = (int) get_option('wp_chatbot_thread_persistence', 30); // minutes
    return ($timestamp && (time() - $timestamp) < ($expiry * 60));
}

function wp_chatbot_get_or_create_thread($api_key, $thread_expiry_minutes = 30) {
    $cookie_name = 'chatbot_thread_id';
    $threads     = get_option('wp_chatbot_threads', []);
    $now         = time();

    // 1) Check cookie
    if (!empty($_COOKIE[$cookie_name])) {
        $thread_id = sanitize_text_field($_COOKIE[$cookie_name]);
        $timestamp = $threads[$thread_id] ?? 0;

        // 2) Reuse if still valid
        if ($timestamp && ($now - $timestamp < ($thread_expiry_minutes * 60))) {
            return $thread_id;
        }

        // 3) Expired — delete upstream (best-effort)
        $delete_url = "https://api.openai.com/v1/threads/{$thread_id}";
        $res = wp_chatbot_openai_request('DELETE', $delete_url, $api_key, null, 55);
        if (is_wp_error($res)) {
            error_log("[wp-chatbot] Failed to delete expired cookie thread $thread_id: " . $res->get_error_message());
        }

        unset($threads[$thread_id]);
        update_option('wp_chatbot_threads', $threads);
    }

    // 4) Create new thread
    $res = wp_chatbot_openai_request('POST', "https://api.openai.com/v1/threads", $api_key, [], 55);
    if (is_wp_error($res)) {
        return null;
    }

    $response = $res['data'] ?? [];
    $new_thread_id = $response['id'] ?? null;

    if ($new_thread_id) {
        $threads[$new_thread_id] = $now;
        update_option('wp_chatbot_threads', $threads);
        return $new_thread_id;
    }

    return null;
}

function wp_chatbot_rest_send_message($request) {
    $params       = $request->get_json_params();
    $message      = sanitize_text_field($params['message'] ?? '');
    $assistant_id = sanitize_text_field($params['assistant_id'] ?? '');
    $api_key      = sanitize_text_field($params['api_key_id'] ?? '');
    $incoming_thread_id = sanitize_text_field($params['thread_id'] ?? '');

    if (!$message || !$assistant_id || !$api_key) {
        return new WP_REST_Response(['error' => 'Missing parameters'], 400);
    }

    // 🧹 Delete expired threads before starting new one
    wp_chatbot_cleanup_old_threads($api_key);

    // Thread selection
    if ($incoming_thread_id && wp_chatbot_thread_is_valid($incoming_thread_id)) {
        $thread_id = $incoming_thread_id;
    } else {
        $thread_id = wp_chatbot_get_or_create_thread($api_key, 30);
    }

    if (!$thread_id) {
        return new WP_REST_Response(['error' => 'Unable to get or create thread'], 502);
    }

    // Add message
    $message_payload = [
        'role'    => 'user',
        'content' => $message,
    ];
    $res_add = wp_chatbot_openai_request('POST', "https://api.openai.com/v1/threads/{$thread_id}/messages", $api_key, $message_payload, 55);
    if (is_wp_error($res_add)) {
        return $res_add; // 502 with detail
    }

    // Start run
    $res_run = wp_chatbot_openai_request('POST', "https://api.openai.com/v1/threads/{$thread_id}/runs", $api_key, ['assistant_id' => $assistant_id], 55);
    if (is_wp_error($res_run)) {
        return $res_run;
    }

    $run_data = $res_run['data'] ?? [];
    $run_id   = $run_data['id'] ?? null;
    if (!$run_id) {
        return new WP_REST_Response(['error' => 'Failed to start assistant run'], 502);
    }

    // Poll run status (max ~20s)
    $attempts  = 0;
    $completed = false;

    while (!$completed && $attempts < 10) {
        sleep(2);
        $res_check = wp_chatbot_openai_request('GET', "https://api.openai.com/v1/threads/{$thread_id}/runs/{$run_id}", $api_key, null, 55);
        if (is_wp_error($res_check)) {
            // Upstream temporarily failing; stop and report
            return $res_check;
        }

        $status = $res_check['data']['status'] ?? null;
        if ($status === 'completed') {
            $completed = true;
            break;
        }
        // Break early on terminal failure-like states
        if (in_array($status, ['failed', 'cancelled', 'expired'], true)) {
            $err = $res_check['data']['last_error']['message'] ?? 'Run did not complete';
            error_log("[wp-chatbot] Run $run_id ended with status '$status': $err");
            return new WP_REST_Response(['error' => "Assistant run $status", 'detail' => $err], 502);
        }

        $attempts++;
    }

    if (!$completed) {
        // Did not complete in polling window
        return new WP_REST_Response(['error' => 'Assistant run did not complete in time'], 504);
    }

    // Fetch messages
    $res_msgs = wp_chatbot_openai_request('GET', "https://api.openai.com/v1/threads/{$thread_id}/messages", $api_key, null, 55);
    if (is_wp_error($res_msgs)) {
        return $res_msgs;
    }

    $messages_data = $res_msgs['data'] ?? [];
    $reply = '';

    if (!empty($messages_data['data'])) {
        foreach ($messages_data['data'] as $msg) {
            if (($msg['role'] ?? '') === 'assistant') {
                if (!empty($msg['content']) && is_array($msg['content'])) {
                    foreach ($msg['content'] as $content) {
                        if (isset($content['text']['value'])) {
                            $reply .= $content['text']['value'] . "\n";
                        }
                    }
                }
                break; // take the most recent assistant message first
            }
        }
    }

    return new WP_REST_Response([
        'reply'     => trim($reply),
        'thread_id' => $thread_id
    ], 200);
}

add_action('rest_api_init', function () {
    register_rest_route('wp-chatbot/v1', '/client-settings', [
        'methods' => 'GET',
        'callback' => 'wp_chatbot_get_client_settings',
        'permission_callback' => '__return_true'
    ]);
});

function wp_chatbot_get_client_settings($request) {
    $client = sanitize_text_field($request->get_param('client'));
    $all    = get_option('wp_chatbot_clients', []);

    if (!$client || !isset($all[$client])) {
        return new WP_REST_Response(['error' => 'Client not found'], 404);
    }

    $config = $all[$client];

    // Attach full avatar URL
    $config['settings']['avatar_url'] = plugins_url(
        'html-chatbot-manager/images/' . basename($config['settings']['avatar']),
        plugin_dir_path(__DIR__)
    );

    return new WP_REST_Response($config, 200);
}
