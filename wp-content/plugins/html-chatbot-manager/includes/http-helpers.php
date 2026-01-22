<?php
/**
 * HTTP + OpenAI helpers for HTML Chatbot Manager
 *
 * This file is UI-agnostic. It NEVER echoes admin notices.
 * Callers should handle WP_Error and render notices themselves.
 */

if (!defined('ABSPATH')) exit;

/**
 * Core OpenAI request helper (JSON or multipart).
 *
 * @param string      $endpoint  Full API URL.
 * @param string      $api_key   OpenAI API key.
 * @param string      $method    HTTP method (GET|POST|DELETE|...).
 * @param array|mixed $body      Request body (PHP array for JSON or raw for multipart).
 * @param bool        $is_json   If true, body is JSON-encoded and header set.
 * @return array|WP_Error        Decoded JSON array on success, WP_Error on failure.
 */
if (!function_exists('hcm_openai_request')) {
    function hcm_openai_request($endpoint, $api_key, $method = 'GET', $body = null, $is_json = true) {
        $args = [
            'method'  => $method,
            'timeout' => 45,
            'headers' => [
                'Authorization' => 'Bearer ' . $api_key,
                'OpenAI-Beta'   => 'assistants=v2',
            ],
        ];

        if ($is_json && $body !== null) {
            $args['headers']['Content-Type'] = 'application/json';
            $args['body'] = wp_json_encode($body);
        } elseif ($body !== null) {
            // For multipart (e.g., file upload via cURL done elsewhere).
            $args['body'] = $body;
        }

        $resp = wp_remote_request($endpoint, $args);
        if (is_wp_error($resp)) return $resp;

        $code = (int) wp_remote_retrieve_response_code($resp);
        $raw  = (string) wp_remote_retrieve_body($resp);
        $json = json_decode($raw, true);

        if ($code >= 200 && $code < 300) {
            // Successful JSON; if not JSON, still return decoded/array or raw fallback
            return is_array($json) ? $json : ['raw' => $raw];
        }

        $msg = (is_array($json) && isset($json['error']['message'])) ? $json['error']['message'] : $raw;
        return new WP_Error('openai_http_error', $msg, ['status' => $code, 'body' => $raw]);
    }
}

/**
 * Delete an assistant (ignore 404s).
 */
if (!function_exists('hcm_openai_delete_assistant')) {
    function hcm_openai_delete_assistant($api_key, $assistant_id) {
        if (empty($assistant_id)) return true;
        $endpoint = 'https://api.openai.com/v1/assistants/' . rawurlencode($assistant_id);
        $res = hcm_openai_request($endpoint, $api_key, 'DELETE', null, false);
        // Treat 404 as success
        if (is_wp_error($res) && (int) ($res->get_error_data()['status'] ?? 0) !== 404) {
            return $res;
        }
        return true;
    }
}

/**
 * Delete a vector store (ignore 404s).
 */
if (!function_exists('hcm_openai_delete_vector_store')) {
    function hcm_openai_delete_vector_store($api_key, $vector_store_id) {
        if (empty($vector_store_id)) return true;
        $endpoint = 'https://api.openai.com/v1/vector_stores/' . rawurlencode($vector_store_id);
        $res = hcm_openai_request($endpoint, $api_key, 'DELETE', null, false);
        if (is_wp_error($res) && (int) ($res->get_error_data()['status'] ?? 0) !== 404) {
            return $res;
        }
        return true;
    }
}

/**
 * Detach a file from a vector store (ignore 404s).
 */
if (!function_exists('hcm_vector_store_detach_file')) {
    function hcm_vector_store_detach_file($api_key, $vector_store_id, $file_id) {
        if (empty($vector_store_id) || empty($file_id)) return true;
        $endpoint = 'https://api.openai.com/v1/vector_stores/' . rawurlencode($vector_store_id)
                  . '/files/' . rawurlencode($file_id);
        $res = hcm_openai_request($endpoint, $api_key, 'DELETE', null, false);
        if (is_wp_error($res) && (int) ($res->get_error_data()['status'] ?? 0) !== 404) {
            return $res;
        }
        return true;
    }
}

/**
 * Delete a file from OpenAI Files API (ignore 404s).
 */
if (!function_exists('hcm_openai_delete_file')) {
    function hcm_openai_delete_file($api_key, $file_id) {
        if (empty($file_id)) return true;
        $endpoint = 'https://api.openai.com/v1/files/' . rawurlencode($file_id);
        $res = hcm_openai_request($endpoint, $api_key, 'DELETE', null, false);
        if (is_wp_error($res) && (int) ($res->get_error_data()['status'] ?? 0) !== 404) {
            return $res;
        }
        return true;
    }
}

/**
 * Upload a local file to OpenAI Files API (purpose=assistants) using native cURL.
 * More reliable for multipart on some hosts than wp_remote_*.
 *
 * @return array|WP_Error JSON (includes ['id']) or WP_Error.
 */
if (!function_exists('hcm_openai_upload_file')) {
    function hcm_openai_upload_file($api_key, $path, $mime = 'application/octet-stream', $display_name = '') {
        if (!file_exists($path)) {
            return new WP_Error('file_missing', 'Local file not found: ' . $path);
        }
        if (!function_exists('curl_file_create')) {
            return new WP_Error('curl_missing', 'curl_file_create not available (PHP cURL extension required).');
        }

        $name  = $display_name !== '' ? $display_name : basename($path);
        $cfile = curl_file_create($path, $mime, $name);

        $ch = curl_init('https://api.openai.com/v1/files');
        $headers = [
            'Authorization: Bearer ' . $api_key,
            'OpenAI-Beta: assistants=v2',
            // Let cURL set the multipart boundary; avoid 100-continue stalls:
            'Expect:',
        ];
        $fields = [
            'purpose' => 'assistants',
            'file'    => $cfile,
        ];

        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $fields,
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 120,
            CURLOPT_CONNECTTIMEOUT => 30,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
        ]);

        $respBody = curl_exec($ch);
        $errno    = curl_errno($ch);
        $errstr   = curl_error($ch);
        $status   = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($errno) {
            error_log('HCM upload cURL error: [' . $errno . '] ' . $errstr);
            return new WP_Error('curl_error', $errstr, ['code' => $errno]);
        }

        $json = json_decode($respBody, true);
        if ($status < 200 || $status >= 300) {
            $msg = is_array($json) && isset($json['error']['message']) ? $json['error']['message'] : $respBody;
            error_log('HCM upload HTTP ' . $status . ' body: ' . $respBody);
            return new WP_Error('openai_upload_error', $msg, ['code' => $status]);
        }

        if (empty($json['id'])) {
            error_log('HCM upload: no file id in response: ' . $respBody);
            return new WP_Error('openai_upload_bad_response', 'No file id returned from OpenAI.');
        }

        return $json; // e.g. ['id' => 'file_...']
    }
}

/**
 * Ensure a vector store exists; returns the vector_store_id (or WP_Error).
 * Mutates $config to store the created ID.
 */
if (!function_exists('hcm_ensure_vector_store')) {
    function hcm_ensure_vector_store($api_key, $client, &$config) {
        if (!empty($config['vector_store_id'])) {
            return $config['vector_store_id'];
        }
        $payload = ['name' => 'HCM - ' . $client];
        $json = hcm_openai_request('https://api.openai.com/v1/vector_stores', $api_key, 'POST', $payload, true);
        if (is_wp_error($json)) return $json;

        $vsid = $json['id'] ?? '';
        if (!$vsid) return new WP_Error('vs_missing', 'Vector store create returned no id.');
        $config['vector_store_id'] = $vsid;
        return $vsid;
    }
}

/**
 * Attach files to vector store via file batch (returns batch JSON or WP_Error).
 */
if (!function_exists('hcm_vector_store_add_files')) {
    function hcm_vector_store_add_files($api_key, $vector_store_id, $file_ids) {
        if (empty($file_ids)) return true;
        $endpoint = 'https://api.openai.com/v1/vector_stores/' . rawurlencode($vector_store_id) . '/file_batches';
        $payload  = ['file_ids' => array_values($file_ids)];
        $json = hcm_openai_request($endpoint, $api_key, 'POST', $payload, true);
        if (is_wp_error($json)) return $json;
        return $json; // { id, status, ... }
    }
}

/**
 * Poll vector store ingestion until done or timeout; returns file_counts (or WP_Error).
 */
if (!function_exists('hcm_vector_store_poll')) {
    function hcm_vector_store_poll($api_key, $vector_store_id, $max_secs = 60) {
        $endpoint = 'https://api.openai.com/v1/vector_stores/' . rawurlencode($vector_store_id);
        $start = time();
        do {
            $json = hcm_openai_request($endpoint, $api_key, 'GET', null, false);
            if (is_wp_error($json)) return $json;

            $counts = $json['file_counts'] ?? [];
            $inprog = (int) ($counts['in_progress'] ?? 0);
            if ($inprog === 0) {
                return $counts; // e.g. ['total'=>X,'completed'=>Z,'failed'=>W,...]
            }

            sleep(2);
        } while (time() - $start < $max_secs);

        return new WP_Error('vs_timeout', 'Timed out waiting for vector store ingestion.');
    }
}

/**
 * List file IDs currently attached to a vector store.
 *
 * @return array|WP_Error  Array of IDs or WP_Error.
 */
if (!function_exists('hcm_vector_store_list_files')) {
    function hcm_vector_store_list_files($api_key, $vector_store_id, $limit = 100) {
        $endpoint = 'https://api.openai.com/v1/vector_stores/' . rawurlencode($vector_store_id)
                  . '/files?limit=' . (int) $limit;
        $json = hcm_openai_request($endpoint, $api_key, 'GET', null, false);
        if (is_wp_error($json)) return $json;

        $ids = [];
        if (isset($json['data']) && is_array($json['data'])) {
            foreach ($json['data'] as $row) {
                if (!empty($row['id'])) $ids[] = $row['id'];
            }
        }
        return $ids;
    }
}
