<?php
/**
 * Plugin Name: HTML Chatbot Manager
 * Plugin URI: https://tony-marriott.com/html-chatbot-manager
 * Description: A powerful AI chatbot manager. Creates front-end HTML chatbots with OpenAI Assistants. Provides interactive and intelligent conversations for customer support, FAQs, and more.
 * Version: 1.1.0
 * Requires at least: 5.8
 * Requires PHP: 8.*
 * Author: Tony Marriott
 * Author URI: https://tony-marriott.com
 * License: Single Install - One Year.
 * License URI: one-year-licence.pdf
 * Text Domain: html-chatbot-manager
 * Domain Path: /languages
 * Tags: chatbot, AI assistant, OpenAI, AI chatbot, customer support, GPT
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Paths/URLs
define('HCM_PLUGIN_FILE', __FILE__);
define('HCM_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('HCM_PLUGIN_URL', plugin_dir_url(__FILE__));

add_action('admin_enqueue_scripts', function ($hook) {
    // Only load on Settings → Chatbot HTML Manager
    if ($hook !== 'settings_page_wp-chatbot-html-manager') return;
    wp_enqueue_style(
        'hcm-admin',
        HCM_PLUGIN_URL . 'assets/admin.css',
        [],
        '1.0.0'
    );
});

// 🔹 Add new admin submenu page under "Settings"
add_action('admin_menu', 'wp_chatbot_add_manager_submenu');

function wp_chatbot_add_manager_submenu() {
    add_submenu_page(
        'options-general.php',            // Parent slug: Settings
        'Chatbot HTML Manager',                // Page title
        'Chatbot HTML Manager',                // Menu label
        'manage_options',                 // Capability
        'wp-chatbot-html-manager',             // Slug
        'wp_chatbot_manage_page_render'   // Callback
    );
}





// include additional files
require_once HCM_PLUGIN_DIR . 'includes/http-helpers.php';
require_once HCM_PLUGIN_DIR . 'includes/hashing-helpers.php';
require_once HCM_PLUGIN_DIR . 'includes/files-helpers.php';
require_once HCM_PLUGIN_DIR . 'includes/templates-helpers.php';




/** Build data-only backup payload (no API keys) */
function hcm_build_backup_payload() {
    $clients = get_option('wp_chatbot_clients', []);
    if ( ! is_array($clients) ) $clients = [];

    // Deep copy & strip api_key
    $safe_clients = [];
    foreach ($clients as $name => $cfg) {
        if (!is_array($cfg)) continue;
        $copy = $cfg;
        unset($copy['api_key']); // 🔒 strip sensitive key
        $safe_clients[$name] = $copy;
    }

    return [
        'schema_version' => 1,
        'plugin_version' => '1.0.2',
        'site_url'       => home_url(),
        'exported_at'    => gmdate('c'),
        'clients'        => $safe_clients,
    ];
}


// Handle data-only export in a clean request
add_action('admin_post_hcm_export_backup', 'hcm_handle_export_backup');

function hcm_handle_export_backup() {
    if ( ! current_user_can('manage_options') ) {
        wp_die('Unauthorized.', 403);
    }
    check_admin_referer('hcm_export_backup');

    // Build payload (strip api_key inside this helper)
    $payload = hcm_build_backup_payload();
    $json    = wp_json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    $fname = 'html-chatbot-manager-backup-' . gmdate('Y-m-d') . '.json';

    // Clear any buffered output just in case
    if (ob_get_level()) { @ob_end_clean(); }

    nocache_headers();
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $fname . '"');
    header('Content-Length: ' . strlen($json));
    echo $json;
    exit;
}


add_action('admin_post_hcm_import_backup', 'hcm_handle_import_backup');

function hcm_handle_import_backup() {
    if ( ! current_user_can('manage_options') ) {
        wp_die('Unauthorized', 403);
    }
    check_admin_referer('hcm_import_backup', 'hcm_import_nonce');

    if (empty($_FILES['hcm_import_file']['tmp_name'])) {
        return wp_redirect( add_query_arg('hcm_import', rawurlencode('no file'), admin_url('options-general.php?page=wp-chatbot-html-manager')) );
    }

    $tmp = $_FILES['hcm_import_file']['tmp_name'];
    $size = (int)($_FILES['hcm_import_file']['size'] ?? 0);
    if ($size <= 0 || !is_uploaded_file($tmp)) {
        return wp_redirect( add_query_arg('hcm_import', rawurlencode('invalid upload'), admin_url('options-general.php?page=wp-chatbot-html-manager')) );
    }

    $raw = file_get_contents($tmp);
    if ($raw === false) {
        return wp_redirect( add_query_arg('hcm_import', rawurlencode('read error'), admin_url('options-general.php?page=wp-chatbot-html-manager')) );
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return wp_redirect( add_query_arg('hcm_import', rawurlencode('bad json'), admin_url('options-general.php?page=wp-chatbot-html-manager')) );
    }

    // Basic validation of payload (matches your export)
if (empty($data['schema_version']) || empty($data['clients']) || !is_array($data['clients'])) {
   wp_safe_redirect( add_query_arg('hcm_import', rawurlencode($msg), admin_url('options-general.php?page=wp-chatbot-html-manager')) );
exit;

}

$overwrite = !empty($_POST['overwrite']);
$result = hcm_apply_import_payload($data['clients'], $overwrite); // <-- use "clients"


    $flag = $result['status']; // ok | partial | error
    $msg  = $flag === 'error' ? ($result['message'] ?? 'error') : $flag;

    return wp_redirect( add_query_arg('hcm_import', rawurlencode($msg), admin_url('options-general.php?page=wp-chatbot-html-manager')) );
}

function hcm_apply_import_payload(array $incoming_chatbots, bool $overwrite=false) : array {
    $existing = get_option('wp_chatbot_clients', []);
    if (!is_array($existing)) $existing = [];

    $issues = [];
    $imported = 0;

    foreach ($incoming_chatbots as $client => $cfg) {
        if (!is_string($client) || $client === '' || !is_array($cfg)) {
            $issues[] = "Skipped invalid client entry.";
            continue;
        }

        // Never import API keys
        unset($cfg['api_key']);

        // Normalize sub-keys
        $cfg['settings'] = isset($cfg['settings']) && is_array($cfg['settings']) ? $cfg['settings'] : [];
        $cfg['files']    = isset($cfg['files'])    && is_array($cfg['files'])    ? $cfg['files']    : [];

        if (isset($existing[$client])) {
            // ---- MERGE MODE (overwrite == false)
            if (!$overwrite) {
                $current = $existing[$client];

                // Preserve existing API key
                $api_key = $current['api_key'] ?? '';

                // Merge settings (incoming overrides / augments)
                $merged_settings = array_merge(
                    isset($current['settings']) && is_array($current['settings']) ? $current['settings'] : [],
                    $cfg['settings']
                );

                // Keep current files unless incoming explicitly provides some
                $merged_files = !empty($cfg['files'])
                    ? $cfg['files']
                    : (isset($current['files']) ? $current['files'] : []);

                // Start from current, DO NOT touch remote IDs in merge mode
                $next = $current;
                $next['settings'] = $merged_settings;
                $next['files']    = $merged_files;
                $next['api_key']  = $api_key;

                // Recompute current_hash; clear synced_hash if changed
                $new_hash = hcm_compute_current_hash($next['settings'], $next['files']);
                if (($next['current_hash'] ?? '') !== $new_hash) {
                    $next['current_hash'] = $new_hash;
                    $next['synced_hash']  = ''; // force "Update Assistant"
                }

                $existing[$client] = $next;
                $imported++;
                continue;
            }

            // ---- OVERWRITE MODE (overwrite == true)
            // Replace data, but avoid importing stale remote IDs
            $api_key = $existing[$client]['api_key'] ?? '';
            unset($cfg['assistant_id'], $cfg['vector_store_id']);

            $next = $cfg;
            $next['api_key']      = $api_key; // keep local key
            $next['current_hash'] = hcm_compute_current_hash($next['settings'], $next['files']);
            $next['synced_hash']  = '';

            $existing[$client] = $next;
            $imported++;
        } else {
            // ---- NEW ENTRY
            // Do not import remote IDs for new ones
            unset($cfg['assistant_id'], $cfg['vector_store_id']);

            $next = $cfg;
            $next['api_key']      = '';
            $next['current_hash'] = hcm_compute_current_hash($next['settings'], $next['files']);
            $next['synced_hash']  = '';

            $existing[$client] = $next;
            $imported++;
        }
    }

    update_option('wp_chatbot_clients', $existing);

    if ($imported === 0) {
        return ['status'=>'error', 'message'=>'no valid entries'];
    }
    if (!empty($issues)) {
        return ['status'=>'partial', 'message'=>implode('; ', $issues)];
    }
    return ['status'=>'ok'];
}



// 🔹 Page content 
function wp_chatbot_manage_page_render() {
	



// Handle FULL DELETE (assistant + vector store + OpenAI files + local files + config)
if ( isset($_POST['hcm_full_delete']) && current_user_can('manage_options') ) {
    check_admin_referer('hcm_full_delete_action', 'hcm_full_delete_nonce');

    $client = isset($_POST['client']) ? sanitize_text_field($_POST['client']) : '';
    if ( ! $client ) {
        echo '<div class="notice notice-error"><p>❌ Missing client.</p></div>';
    } else {
        $chatbots = get_option('wp_chatbot_clients', []);
        if ( empty($chatbots[$client]) || !is_array($chatbots[$client]) ) {
            echo '<div class="notice notice-error"><p>❌ Unknown client: ' . esc_html($client) . '</p></div>';
        } else {
            $config = $chatbots[$client];

            // Call the centralized deletion helper (in includes/files-helpers.php)
            $res = hcm_full_delete_chatbot( $client, $config );

            if ( is_wp_error($res) ) {
                echo '<div class="notice notice-error"><p>❌ Full delete failed: ' . esc_html($res->get_error_message()) . '</p></div>';
            } else {
                // Remove from WP option AFTER successful teardown
                unset($chatbots[$client]);
                update_option('wp_chatbot_clients', $chatbots);

                echo '<div class="updated notice"><p>🗑️ <strong>' . esc_html($client) . '</strong> permanently deleted (assistant, vector store, OpenAI files, local files, and config).</p></div>';
            }
        }
    }
}

	
	
	
	
	// Handle delete training file (local + OpenAI)
if ( isset($_POST['hcm_delete_file']) && current_user_can('manage_options') ) {
    check_admin_referer('hcm_delete_file', 'hcm_delete_nonce');

    $client    = isset($_POST['editing_client']) ? sanitize_text_field($_POST['editing_client']) : '';
    $file_name = isset($_POST['file_name'])      ? sanitize_file_name($_POST['file_name'])       : '';

    if (!$client || !$file_name) {
        echo '<div class="notice notice-error"><p>❌ Missing client or file name.</p></div>';
    } else {
        $chatbots = get_option('wp_chatbot_clients', []);
        if ( empty($chatbots[$client]) ) {
            echo '<div class="notice notice-error"><p>❌ Unknown client.</p></div>';
        } else {
            $config   = $chatbots[$client];
            $api_key  = trim($config['api_key'] ?? '');
            $vsid     = $config['vector_store_id'] ?? '';
            $files    = is_array($config['files'] ?? null) ? $config['files'] : [];

            // find file by display_name
            $idx = -1;
            foreach ($files as $i => $meta) {
                if (($meta['display_name'] ?? '') === $file_name) { $idx = $i; break; }
            }

            if ($idx === -1) {
                echo '<div class="notice notice-warning"><p>⚠️ File not found in this client config.</p></div>';
            } else {
                $meta   = $files[$idx];
                $fid    = $meta['openai_file_id'] ?? '';
                $lpath  = $meta['path'] ?? '';

                // 1) Detach from vector store (best-effort)
                if ($api_key && $fid) {
                    $detach = hcm_vector_store_detach_file( $api_key, $vsid, $fid );
                    if ( is_wp_error($detach) ) {
                        echo '<div class="notice notice-warning"><p>⚠️ Couldn’t detach from vector store: '.esc_html($detach->get_error_message()).'</p></div>';
                    }
                }

                // 2) Delete from OpenAI Files (best-effort)
                if ($api_key && $fid) {
                    $del = hcm_openai_delete_file( $api_key, $fid );
                    if ( is_wp_error($del) ) {
                        echo '<div class="notice notice-warning"><p>⚠️ Couldn’t delete from OpenAI Files: '.esc_html($del->get_error_message()).'</p></div>';
                    }
                }

                // 3) Remove local file (optional, but tidy)
                if ( $lpath && file_exists($lpath) ) {
                    @unlink($lpath);
                }

                // 4) Remove from local metadata
                array_splice($files, $idx, 1);
                $config['files'] = $files;

                // 5) Recompute hash (settings + files)
                $settings = $config['settings'] ?? [];
                $config['current_hash'] = hcm_compute_current_hash( $settings, $files );

                // Persist
                $chatbots[$client] = $config;
                update_option('wp_chatbot_clients', $chatbots);

                echo '<div class="notice notice-success"><p>🗑️ Deleted file <strong>'.esc_html($file_name).'</strong>.</p></div>';
            }
        }
    }
}

	
	// Handle Training File upload (local only)
if ( isset($_POST['hcm_upload_file']) && current_user_can('manage_options') ) {
    check_admin_referer('hcm_upload_file', 'hcm_upload_nonce');

    $client = isset($_POST['client_name']) && $_POST['client_name'] !== ''
        ? sanitize_text_field($_POST['client_name'])
        : ( isset($_POST['editing_client']) ? sanitize_text_field($_POST['editing_client']) : '' );

    if ( empty($client) ) {
        echo '<div class="notice notice-error"><p>❌ Please set a Client Name before uploading training files.</p></div>';
    } elseif ( empty($_FILES['hcm_training_file']['name']) ) {
        echo '<div class="notice notice-error"><p>❌ No file selected.</p></div>';
    } else {
        $chatbots = get_option('wp_chatbot_clients', []);
        $config   = isset($chatbots[$client]) ? $chatbots[$client] : ['settings'=>[]];

        // Enforce max 5
        $filesMeta = isset($config['files']) && is_array($config['files']) ? $config['files'] : [];
        if ( count($filesMeta) >= 5 ) {
            echo '<div class="notice notice-warning"><p>ℹ️ Limit reached: 5 training files per client.</p></div>';
        } else {
            // Prepare upload
            list($dir, $url) = hcm_client_upload_dir($client);
            if ( ! file_exists($dir) ) {
                wp_mkdir_p($dir);
            }

            // Restrict types
            add_filter('upload_mimes', function($m) {
                // allow only our small set during this request
                return hcm_allowed_mimes();
            });

            // Route to our client folder
            add_filter('upload_dir', function($paths) use ($dir, $url) {
                $paths['path'] = $dir;
                $paths['url']  = $url;
                $paths['subdir'] = '';
                return $paths;
            });

            $file = $_FILES['hcm_training_file'];
            $overrides = [
                'test_form' => false,
                'mimes'     => hcm_allowed_mimes(),
                'unique_filename_callback' => function($dirp, $name, $ext) {
                    // keep original name where possible; WP will uniquify if needed
                    return $name;
                }
            ];

            $result = wp_handle_upload($file, $overrides);

            // Remove filters so they don't affect other uploads on the page
            remove_all_filters('upload_mimes');
            remove_all_filters('upload_dir');

            if ( isset($result['error']) ) {
                echo '<div class="notice notice-error"><p>❌ Upload failed: ' . esc_html($result['error']) . '</p></div>';
            } else {
                // Build metadata
                $path = $result['file'];
                $urlf = $result['url'];
                $name = basename($path);
                $mime = $result['type'];
                $size = file_exists($path) ? filesize($path) : 0;
                $checksum = (file_exists($path) ? md5_file($path) : '');

                // De-dup by basename: replace existing entry if same name
                $replaced = false;
                foreach ($filesMeta as $i => $meta) {
                    if ( isset($meta['display_name']) && $meta['display_name'] === $name ) {
                        $filesMeta[$i] = [
                            'display_name'   => $name,
                            'path'           => $path,
                            'url'            => $urlf,
                            'mime'           => $mime,
                            'size'           => (int)$size,
                            'checksum'       => $checksum,
                            'uploaded_at'    => current_time('mysql'),
                            'openai_file_id' => isset($meta['openai_file_id']) ? $meta['openai_file_id'] : '',
                            'ingestion'      => isset($meta['ingestion']) ? $meta['ingestion'] : 'local-only-update-assistant',
                        ];
                        $replaced = true;
                        break;
                    }
                }

                if ( ! $replaced ) {
                    $filesMeta[] = [
                        'display_name'   => $name,
                        'path'           => $path,
                        'url'            => $urlf,
                        'mime'           => $mime,
                        'size'           => (int)$size,
                        'checksum'       => $checksum,
                        'uploaded_at'    => current_time('mysql'),
                        'openai_file_id' => '',
                        'ingestion'      => 'local-only-update-assistant', // local; not in vector store yet
                    ];
                }

                // Cap at 5 (drop extras oldest-first if somehow exceeded)
                if ( count($filesMeta) > 5 ) {
                    $filesMeta = array_slice($filesMeta, 0, 5);
                }

                // Save back
                $config['files'] = $filesMeta;

                // Mark Out-of-sync by updating current_hash (settings + files)
$settings     = isset($config['settings']) ? $config['settings'] : [];
$config['current_hash'] = hcm_compute_current_hash( $settings, $filesMeta );


                $chatbots[$client] = $config;
                update_option('wp_chatbot_clients', $chatbots);

                echo '<div class="notice notice-success"><p>✅ File uploaded: ' . esc_html($name) . '</p></div>';
            }
        }
    }
}

	
	
	
	if (isset($_POST['delete_client'])) {
    $delete_client = sanitize_text_field($_POST['delete_client']);
    $clients = get_option('wp_chatbot_clients', []);

    if (isset($clients[$delete_client])) {
        unset($clients[$delete_client]);
        update_option('wp_chatbot_clients', $clients);
        echo '<div class="updated notice"><p>✅ Chatbot "' . esc_html($delete_client) . '" deleted successfully.</p></div>';
    } else {
        echo '<div class="error notice"><p>❌ Chatbot "' . esc_html($delete_client) . '" not found.</p></div>';
    }
}

// Handle Create/Update Assistant (local simulator; no OpenAI calls yet)
if ( isset($_POST['hcm_action']) && current_user_can('manage_options') ) {
    check_admin_referer('hcm_assistant_action', 'hcm_nonce');

    $action   = sanitize_text_field($_POST['hcm_action']);
    $client   = isset($_POST['client']) ? sanitize_text_field($_POST['client']) : '';
    $chatbots = get_option('wp_chatbot_clients', []);
    $config   = isset($chatbots[$client]) ? $chatbots[$client] : null;

    if ( ! $config ) {
        echo '<div class="notice notice-error"><p>❌ Unknown client: <strong>' . esc_html($client) . '</strong></p></div>';
    } else {
        $assistant_id = isset($config['assistant_id']) ? (string)$config['assistant_id'] : '';
        $current_hash = isset($config['current_hash']) ? (string)$config['current_hash'] : '';
        $synced_hash  = isset($config['synced_hash'])  ? (string)$config['synced_hash']  : '';

        if ( $action === 'create_assistant' ) {
    if ( $assistant_id !== '' ) {
        echo '<div class="notice notice-warning"><p>ℹ️ Assistant already exists for <strong>' . esc_html($client) . '</strong> (ID: ' . esc_html($assistant_id) . ').</p></div>';
    } elseif ( $current_hash === '' ) {
        echo '<div class="notice notice-error"><p>❌ Cannot create: missing current_hash. Save settings first.</p></div>';
    } else {
        // Build payload
        $settings     = isset($config['settings']) ? $config['settings'] : [];
        $api_key      = isset($config['api_key']) ? trim($config['api_key']) : '';
        $assistant_nm = isset($settings['name']) && $settings['name'] !== '' ? $settings['name'] : ( isset($settings['title']) ? $settings['title'] : $client );
        $instructions = hcm_build_instructions( $settings, $config['files'] ?? [] );


        if ( empty($api_key) ) {
            echo '<div class="notice notice-error"><p>❌ No API key stored for <strong>' . esc_html($client) . '</strong>.</p></div>';
        } else {
        	
        	
    // >>> SYNC FILES to OpenAI (uploads + attach to vector store)
$sync = hcm_sync_files_to_openai( $client, $config );

if ( is_wp_error($sync) ) {
    echo '<div class="notice notice-error"><p>❌ File sync error: ' . esc_html($sync->get_error_message()) . '</p></div>';
} else {
    // persist config because sync may have updated files/vector_store_id/current_hash
    $chatbots[$client] = $config;
    update_option('wp_chatbot_clients', $chatbots);
}
    	
        	
        	
        	
        	
            // Choose a sensible default model (make this configurable later if you want)
            $model = 'gpt-4o-mini';
$body = [
    'name'         => $assistant_nm,
    'instructions' => $instructions,
    'model'        => $model,
    'tools'        => [ [ 'type' => 'file_search' ] ],
    'tool_resources' => [
        'file_search' => [
            'vector_store_ids' => [ $config['vector_store_id'] ?? '' ]
        ]
    ],
];


            $args = [
                'headers' => [
                    'Authorization' => 'Bearer ' . $api_key,
                    // If your account requires the assistants-v2 beta header, uncomment the next line:
                    'OpenAI-Beta'   => 'assistants=v2',
                    'Content-Type'  => 'application/json',
                ],
                'timeout' => 30,
                'body'    => wp_json_encode( $body ),
            ];

            // Call OpenAI (Assistants create). Keep endpoint isolated for easy changes later.
            $endpoint = 'https://api.openai.com/v1/assistants';
            $resp = wp_remote_post( $endpoint, $args );

            if ( is_wp_error( $resp ) ) {
                echo '<div class="notice notice-error"><p>❌ Network error creating assistant: ' . esc_html( $resp->get_error_message() ) . '</p></div>';
            } else {
                $code = wp_remote_retrieve_response_code( $resp );
                $raw  = wp_remote_retrieve_body( $resp );
                $json = json_decode( $raw, true );

                if ( $code >= 200 && $code < 300 && is_array($json) && isset($json['id']) ) {
                    $new_id = $json['id'];

                    // Persist ID + sync state
                    $config['assistant_id']   = $new_id;
                    $config['synced_hash']    = $current_hash;
                    $config['last_synced_at'] = current_time( 'mysql' );

                    $chatbots[$client] = $config;
                    update_option( 'wp_chatbot_clients', $chatbots );

                    echo '<div class="notice notice-success"><p>✅ Assistant created for <strong>' . esc_html($client) . '</strong> (ID: ' . esc_html($new_id) . ').</p></div>';
                } else {
                    $msg = ( is_array($json) && isset($json['error']['message']) ) ? $json['error']['message'] : $raw;
                    echo '<div class="notice notice-error"><p>❌ OpenAI API error creating assistant: ' . esc_html( $msg ) . '</p></div>';
                }
            }
        }
    }
}


        if ( $action === 'update_assistant' ) {
    if ( $assistant_id === '' ) {
        echo '<div class="notice notice-error"><p>❌ No assistant to update for <strong>' . esc_html($client) . '</strong>. Create one first.</p></div>';
    } elseif ( $current_hash !== '' && $synced_hash !== '' && $current_hash === $synced_hash ) {
        echo '<div class="notice notice-info"><p>ℹ️ <strong>' . esc_html($client) . '</strong> is already up to date.</p></div>';
    } elseif ( $current_hash === '' ) {
        echo '<div class="notice notice-error"><p>❌ Cannot update: missing current_hash. Save settings first.</p></div>';
    } else {
        $settings     = isset($config['settings']) ? $config['settings'] : [];
        $api_key      = isset($config['api_key']) ? trim($config['api_key']) : '';
        $assistant_nm = isset($settings['name']) && $settings['name'] !== '' ? $settings['name'] : ( isset($settings['title']) ? $settings['title'] : $client );
        $instructions = hcm_build_instructions( $settings, $config['files'] ?? [] );


        if ( empty($api_key) ) {
            echo '<div class="notice notice-error"><p>❌ No API key stored for <strong>' . esc_html($client) . '</strong>.</p></div>';
        } else {
        	
        	// >>> SYNC FILES first
$sync = hcm_sync_files_to_openai( $client, $config );
if ( is_wp_error($sync) ) {
    echo '<div class="notice notice-error"><p>❌ File sync error: ' . esc_html($sync->get_error_message()) . '</p></div>';
} else {
    $chatbots[$client] = $config;
    update_option('wp_chatbot_clients', $chatbots);
}

        	
        	
            $body = [
    'name'         => $assistant_nm,
    'instructions' => $instructions,
    'tools'        => [ [ 'type' => 'file_search' ] ],
    'tool_resources' => [
        'file_search' => [
            'vector_store_ids' => [ $config['vector_store_id'] ?? '' ]
        ]
    ],
    // 'model' => 'gpt-4o-mini', // include if changing model
];


            $args = [
                'headers' => [
                    'Authorization' => 'Bearer ' . $api_key,
                    // If your account requires assistants v2 header, uncomment:
                    'OpenAI-Beta'   => 'assistants=v2',
                    'Content-Type'  => 'application/json',
                ],
                'timeout' => 30,
                'body'    => wp_json_encode( $body ),
                'method'  => 'POST', // OpenAI accepts POST to /assistants/{id} for updates
            ];

            $endpoint = 'https://api.openai.com/v1/assistants/' . rawurlencode( $assistant_id );
            $resp = wp_remote_request( $endpoint, $args );

            if ( is_wp_error( $resp ) ) {
                echo '<div class="notice notice-error"><p>❌ Network error updating assistant: ' . esc_html( $resp->get_error_message() ) . '</p></div>';
            } else {
                $code = wp_remote_retrieve_response_code( $resp );
                $raw  = wp_remote_retrieve_body( $resp );
                $json = json_decode( $raw, true );

                if ( $code >= 200 && $code < 300 ) {
                    // Mark synced
                    $config['synced_hash']    = $current_hash;
                    $config['last_synced_at'] = current_time( 'mysql' );

                    $chatbots[$client] = $config;
                    update_option( 'wp_chatbot_clients', $chatbots );

                    echo '<div class="notice notice-success"><p>✅ Assistant updated for <strong>' . esc_html($client) . '</strong>.</p></div>';
                } else {
                    $msg = ( is_array($json) && isset($json['error']['message']) ) ? $json['error']['message'] : $raw;
                    echo '<div class="notice notice-error"><p>❌ OpenAI API error updating assistant: ' . esc_html( $msg ) . '</p></div>';
                }
            }
        }
    }
}


    }
}


// ---- Prefill (determine active client + config used to render the form) ----
// ---- Prefill (determine active client + config used to render the form) ----
$all_chatbots  = get_option('wp_chatbot_clients', []);
$active_client = '';

// Prefer just-saved new name, then editing_client, then ?client=...
if ( ! empty($_POST['client_name']) ) {
    $active_client = sanitize_text_field($_POST['client_name']);
} elseif ( ! empty($_POST['editing_client']) ) {
    $active_client = sanitize_text_field($_POST['editing_client']);
} elseif ( ! empty($_GET['client']) ) {
    $active_client = sanitize_text_field($_GET['client']);
}


$active_config  = isset($all_chatbots[$active_client]) ? $all_chatbots[$active_client] : null;
$S              = $active_config['settings'] ?? [];
$assistant_id_v = $active_config['assistant_id'] ?? '';
$api_key_v      = $active_config['api_key']      ?? '';

	
	
	
    echo '<div class="wrap">';
    echo '<h1>Chatbot HTML Manager</h1>';

// ✅ Handle form submission
if ( isset($_POST['chatbot_manager_submit']) ) {

    // --- Names: old key (existing) and new key (target) ---
    $old_key = isset($_POST['editing_client']) ? sanitize_text_field($_POST['editing_client']) : '';
    $new_key = isset($_POST['client_name'])    ? sanitize_text_field($_POST['client_name'])    : '';

    // Load existing configs once
    $chatbots = get_option('wp_chatbot_clients', []);
    if ( ! is_array($chatbots) ) { $chatbots = []; }

    // Capture previous config for OLD (rename) or NEW (edit-in-place)
    $prev = [];
    if ( $old_key && isset($chatbots[$old_key]) ) {
        $prev = $chatbots[$old_key];
    } elseif ( $new_key && isset($chatbots[$new_key]) ) {
        $prev = $chatbots[$new_key];
    }

    // Core API fields
    $api_key = isset($_POST['api_key']) ? sanitize_text_field($_POST['api_key']) : '';

    // Prefer existing stored ID; fall back to posted only if none stored yet
    $existing_id        = isset($prev['assistant_id']) ? sanitize_text_field($prev['assistant_id']) : '';
    $assistant_id_post  = isset($_POST['assistant_id']) ? sanitize_text_field($_POST['assistant_id']) : '';
    $assistant_id       = $existing_id !== '' ? $existing_id : $assistant_id_post;

    // Existing UI settings
    $avatar           = isset($_POST['avatar'])           ? sanitize_text_field($_POST['avatar'])         : '';
    $title            = isset($_POST['title'])            ? sanitize_text_field($_POST['title'])          : '';
    $name             = isset($_POST['name'])             ? sanitize_text_field($_POST['name'])           : '';
    $placeholder      = isset($_POST['placeholder'])      ? sanitize_text_field($_POST['placeholder'])    : '';
    $bg_color         = isset($_POST['bg_color'])         ? sanitize_hex_color($_POST['bg_color'])        : '';
    $text_color       = isset($_POST['text_color'])       ? sanitize_hex_color($_POST['text_color'])      : '';
    $default_question = isset($_POST['default_question']) ? sanitize_text_field($_POST['default_question']): '';

    // Assistant Knowledge fields
    $business_name     = isset($_POST['business_name'])     ? sanitize_text_field($_POST['business_name'])     : '';
    $promotion         = isset($_POST['promotion'])         ? sanitize_text_field($_POST['promotion'])         : '';
    $promotion_link    = isset($_POST['promotion_link'])    ? esc_url_raw($_POST['promotion_link'])            : '';
    $sales_phone       = isset($_POST['sales_phone'])       ? sanitize_text_field($_POST['sales_phone'])       : '';
    $support_phone     = isset($_POST['support_phone'])     ? sanitize_text_field($_POST['support_phone'])     : '';
    $contact_form_link = isset($_POST['contact_form_link']) ? esc_url_raw($_POST['contact_form_link'])         : '';
    $template_file     = isset($_POST['template_file'])     ? sanitize_text_field(basename($_POST['template_file'])) : '';

    // Build settings to save
    $extended_instructions = isset($_POST['extended_instructions'])
        ? sanitize_textarea_field( wp_unslash($_POST['extended_instructions']) )
        : '';

    $settings = [
        'avatar'            => $avatar,
        'title'             => $title,
        'name'              => $name,
        'placeholder'       => $placeholder,
        'bg_color'          => $bg_color,
        'text_color'        => $text_color,
        'default_question'  => $default_question,
        'business_name'     => $business_name,
        'promotion'         => $promotion,
        'promotion_link'    => $promotion_link,
        'sales_phone'       => $sales_phone,
        'support_phone'     => $support_phone,
        'contact_form_link' => $contact_form_link,
        'template_file'     => $template_file,  // ← only once
        'extended_override' => $extended_instructions,
    ];

    // Start from previous config and overwrite fields we’re updating
    $config = is_array($prev) ? $prev : [];
    $config['api_key']      = $api_key;
    $config['assistant_id'] = $assistant_id;
    $config['settings']     = $settings;

    // Ensure files array is preserved if previously set
    if ( ! isset($config['files']) || ! is_array($config['files']) ) {
        $config['files'] = [];
    }

    // Compute hash from SETTINGS + FILES fingerprint
    $config['current_hash'] = hcm_compute_current_hash( $settings, $config['files'] );

    // If this is a rename, remove the OLD key after we migrate
    if ( $old_key && $old_key !== $new_key && isset($chatbots[$old_key]) ) {
        unset($chatbots[$old_key]);
        // (Optional) consider moving local upload dir here if you want slugs to match names.
    }

    // Save back under the NEW key
    $chatbots[$new_key] = $config;
    update_option('wp_chatbot_clients', $chatbots);

    // Make the new key the active one for re-render
    $active_client = $new_key;

    echo '<div class="updated notice"><p>✅ Chatbot saved for client: <strong>' . esc_html($new_key) . '</strong></p></div>';
}



    // ✅ Form UI
    ?>
    <h2>Create Chatbots</h2>
    <div class="sub-label">1. Complete chatbot form below and <strong>Save Chatbot</strong>.<br>2. Click <strong>Create Assistant</strong> under <strong>Saved Chatbots</strong>. </div>
    <h2>Manage Chatbots</h2>
    <div class="sub-label">1. Click <strong>Edit</strong> under <strong>Saved Chatbots</strong>.<br>2. Edit chatbot form as required and <strong>Save Chatbot</strong>.<br>3. Click <strong>Update Assistant</strong> under <strong>Saved Chatbots</strong>. </div>
    <form method="post" enctype="multipart/form-data">
    <div style="border: 1px gray solid;display:inline-block;padding:10px;margin-top:10px;">
  <table class="form-table">
  <tr>
      <th colspan="2"><h2>Chatbot Style & API</h2></th>
    </tr>
    <tr>
      <th>
        <label for="client_name">Client Name</label>
        <div class="sub-label">A unique reference to identify this chatbot client.</div>
      </th>
      <td>
        <input type="text" name="client_name" required class="regular-text"
               value="<?php echo esc_attr($active_client); ?>" placeholder="JansonsElectric.com"/>
      </td>
    </tr>

    <tr>
      <th>
        <label for="api_key"><a href="https://platform.openai.com/api-keys" target="_blank">OpenAI API Key</a></label>
        <div class="sub-label">OpenAI API Key used to create assistant. Click link above to get key.</div>
      </th>
      <td>
        <input type="text" name="api_key" required class="regular-text"
               value="<?php echo esc_attr($api_key_v); ?>" />
      </td>
    </tr>

    <tr>
      <th>
        <label for="assistant_id"><a href="https://platform.openai.com/assistants/" target="_blank">Assistant ID</a></label>
        <div class="sub-label">OpenAI assistant_id is created when the assistant is created.</div>
      </th>
      <td>
        <input type="text" name="assistant_id" class="regular-text" readonly
               value="<?php echo esc_attr($assistant_id_v); ?>" />
      </td>
    </tr>

    <tr>
      <th>
        <label for="avatar">Avatar Style</label>
        <div class="sub-label">This will display male or female default images for your chatbot.</div>
      </th>
      <td>
        <select name="avatar">
          <option value="default-assistant-image.png" <?php selected($S['avatar'] ?? '', 'default-assistant-image.png'); ?>>Female Assistant</option>
          <option value="male-assistant-image.png"    <?php selected($S['avatar'] ?? '', 'male-assistant-image.png'); ?>>Male Assistant</option>
        </select>
      </td>
    </tr>

    <tr>
      <th>
        <label for="title">Chatbox Title</label>
        <div class="sub-label">Short title displays in top bar of chatbot box. e.g Welcome to "Jansons Electric Support"</div>
      </th>
      <td><input type="text" name="title" class="regular-text" value="<?php echo esc_attr($S['title'] ?? ''); ?>" placeholder="Jansons Electric Support"/></td>
    </tr>

    <tr>
      <th>
        <label for="name">Assistant Name</label>
        <div class="sub-label">Name your chatbot assistant.</div>
      </th>
      <td><input type="text" name="name" class="regular-text" value="<?php echo esc_attr($S['name'] ?? '');  ?>" placeholder="Julian" /></td>
    </tr>

    <tr>
      <th>
        <label for="placeholder">Placeholder</label>
        <div class="sub-label">Prompt in the user input field. i.e. Ask me about electricals.</div>
      </th>
      <td><input type="text" name="placeholder" class="regular-text" value="<?php echo esc_attr($S['placeholder'] ?? ''); ?>" placeholder="Ask me about electricals" /></td>
    </tr>

    <tr>
      <th>
        <label for="bg_color">Background Color</label>
        <div class="sub-label">Avatar and chatbox header & button color. Used to match website styling.</div>
      </th>
      <td><input type="color" name="bg_color" value="<?php echo esc_attr($S['bg_color'] ?? '#0073aa'); ?>" /></td>
    </tr>

    <tr>
      <th>
        <label for="text_color">Text Color</label>
        <div class="sub-label">For text inside background color.</div>
      </th>
      <td><input type="color" name="text_color" value="<?php echo esc_attr($S['text_color'] ?? '#ffffff'); ?>" /></td>
    </tr>

    <tr>
      <th>
        <label for="default_question">Default Question</label>
        <div class="sub-label">Starter question button. i.e. How do I request a call out?</div>
      </th>
      <td><input type="text" name="default_question" class="regular-text" value="<?php echo esc_attr($S['default_question'] ?? ''); ?>" placeholder="How do I request a call out?" /></td>
    </tr>
    
    </table>
    </div>
    <div style="display:block;min-height:5px;"></div>
    <div style="border: 1px gray solid;display:inline-block;padding:10px;">
    <table  class="form-table">
    <!-- Assistant Knowledge -->
    <tr>
      <th colspan="2"><h2>Assistant Core Knowledge & Behaviour</h2></th>
    </tr>



    <!-- Instruction Template -->
    <?php $templates = hcm_get_templates(); $tpl_saved = $S['template_file'] ?? ''; ?>
    <tr>
      <th>
        <label for="template_file">Instruction Template</label>
        <div class="sub-label">Files are read from <code>/wp-content/plugins/html-chatbot-manager/support/</code></div>
      </th>
      <td>
        <select name="template_file">
          <option value="">— Select a template —</option>
          <?php foreach ($templates as $tpl): ?>
            <option value="<?php echo esc_attr($tpl); ?>" <?php selected($tpl_saved, $tpl); ?>>
              <?php echo esc_html($tpl); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </td>
    </tr>
    
 <?php
    // Ensure we never treat an _extended file as the main template
    if (!empty($tpl_saved) && str_ends_with(strtolower($tpl_saved), '_extended.txt')) {
        $tpl_saved = substr($tpl_saved, 0, -13) . '.txt'; // strip "_extended" part
    }

    $extended_prefill = '';
    if (!empty($S['extended_override'])) {
        $extended_prefill = (string)$S['extended_override'];
    } elseif (!empty($tpl_saved)) {
        $extended_prefill = hcm_get_extended_template_contents($tpl_saved);
    }
?>
   

<?php

    // Determine initial textarea value:
    // 1) if saved override exists, use it
    // 2) else load default from matching _extended template
    $extended_prefill = '';
    if (!empty($S['extended_override'])) {
        $extended_prefill = (string)$S['extended_override'];
    } elseif (!empty($tpl_saved)) {
        $extended_prefill = hcm_get_extended_template_contents($tpl_saved);
    }
?>
<tr>
  <th>
    <label for="extended_instructions">Extended Instructions (editable)</label>
    <div class="sub-label">
      This is preloaded from <code>&lt;template&gt;_extended.txt</code>. You can edit it here. Placeholders like <code>*PN*</code> still work.
    </div>
  </th>
  <td>
    <textarea name="extended_instructions" rows="12" class="large-text code"><?php
        echo esc_textarea($extended_prefill);
    ?></textarea>
  </td>
</tr>








    <tr>
      <th>
        <label for="business_name">Business Name</label>
        <div class="sub-label">use placeholder *BN*</div>
      </th>
      <td><input type="text" name="business_name" class="regular-text" value="<?php echo esc_attr($S['business_name'] ?? ''); ?>" placeholder="Healthy Eats Ltd."/></td>
    </tr>

    <tr>
      <th>
        <label for="promotion">Promotion</label>
        <div class="sub-label">use placeholder *PN*</div>
      </th>
      <td><input type="text" name="promotion" class="regular-text" value="<?php echo esc_attr($S['promotion'] ?? ''); ?>" placeholder="50% Off All Main Meals This Week" /></td>
    </tr>

    <tr>
      <th>
        <label for="promotion_link">Promotion Link</label>
        <div class="sub-label">use placeholder *PNLUR*</div>
      </th>
      <td><input type="url" name="promotion_link" class="regular-text" value="<?php echo esc_attr($S['promotion_link'] ?? ''); ?>" placeholder="https://example.com/promo" /></td>
    </tr>

    <tr>
      <th>
        <label for="sales_phone">Sales Phone Number</label>
        <div class="sub-label">use placeholder *SAPN*</div>
      </th>
      <td><input type="text" name="sales_phone" class="regular-text" value="<?php echo esc_attr($S['sales_phone'] ?? ''); ?>" placeholder="0741 577 4054" /></td>
    </tr>

    <tr>
      <th>
        <label for="support_phone">General Support Number</label>
        <div class="sub-label">use placeholder *SUPN*</div>
      </th>
      <td><input type="text" name="support_phone" class="regular-text" value="<?php echo esc_attr($S['support_phone'] ?? ''); ?>" placeholder="703 878 2716"/></td>
    </tr>

    <tr>
      <th>
        <label for="contact_form_link">Contact Form</label>
        <div class="sub-label">use placeholder *CFURL*</div>
      </th>
      <td><input type="url" name="contact_form_link" class="regular-text" value="<?php echo esc_attr($S['contact_form_link'] ?? ''); ?>" placeholder="https://example.com/contact" /></td>
    </tr>
   
      </table>
 </div>
  <?php submit_button('Save Chatbot', 'primary', 'chatbot_manager_submit'); ?>
</form>

<p> <span style="color:white;background-color:green;display inline-block;padding:4px 8px;">Note: <strong>Create Assistant</strong> or <strong>Update Assistant</strong> after saving.</span></p>

<?php
// ===== Place this right under the "Assistant Knowledge" section =====

// Build full instructions preview from MAIN + EXTENDED templates (no training files)
$main_tpl = '';
$ext_raw  = '';

// Load main template file content
if ( ! empty($tpl_saved) ) {
    $main_path = hcm_support_dir() . $tpl_saved;
    if ( is_file($main_path) && is_readable($main_path) ) {
        $main_tpl = file_get_contents($main_path);
    }
}

// Load extended template (either saved override or default *_extended.txt)
if ( ! empty($S['extended_override']) ) {
    $ext_raw = (string) $S['extended_override'];
} elseif ( ! empty($tpl_saved) ) {
    $ext_raw = hcm_get_extended_template_contents($tpl_saved);
}

// Collect up to 5 training file display names (from the active client's config)
$tf = [];
if (!empty($active_config['files']) && is_array($active_config['files'])) {
    foreach ($active_config['files'] as $m) {
        if (!empty($m['display_name'])) {
            $tf[] = (string)$m['display_name'];
            if (count($tf) >= 5) break;
        }
    }
}
// pad to 5
for ($i = count($tf); $i < 5; $i++) { $tf[$i] = ''; }

// Now include TF1..TF5 in the replacements
$replacements = [
    '*NAME*'   => (string)($S['name']              ?? ''),
    '*BN*'     => (string)($S['business_name']     ?? ''),
    '*PN*'     => (string)($S['promotion']         ?? ''),
    '*PNLURL*' => (string)($S['promotion_link']    ?? ''),
    '*SAPN*'   => (string)($S['sales_phone']       ?? ''),
    '*SUPN*'   => (string)($S['support_phone']     ?? ''),
    '*CFURL*'  => (string)($S['contact_form_link'] ?? ''),

    // NEW: training file placeholders
    '*TF1*'    => $tf[0],
    '*TF2*'    => $tf[1],
    '*TF3*'    => $tf[2],
    '*TF4*'    => $tf[3],
    '*TF5*'    => $tf[4],
];

// Normalize line endings and apply replacements
$main_out = $main_tpl !== '' ? strtr(hcm_normalize_eol($main_tpl), $replacements) : '';
$ext_out  = $ext_raw  !== '' ? strtr(hcm_normalize_eol($ext_raw),  $replacements) : '';

// Ensure extended has a header if missing
if ($ext_out !== '') {
    if (strpos(ltrim($ext_out), '##') !== 0) {
        $ext_out = "## Additional Instructions\n" . $ext_out;
    }
}

// Merge (two newlines between sections when both exist)
$preview_txt = trim($main_out . ($main_out && $ext_out ? "\n\n" : '') . $ext_out);
?>

<p style="margin-top:18px;">
  <button type="button" class="button" id="hcm-toggle-instructions">
    👀 View Full Assistant Instructions
  </button>
</p>

<div id="hcm-full-instructions"
     style="display:none; margin-top:10px; padding:12px; border:1px solid #ccc; background:#f9f9f9; white-space:pre-wrap;">
  <?php echo esc_html($preview_txt ?: 'No template selected yet.'); ?>
</div>

<script>
document.addEventListener("DOMContentLoaded", function(){
  const btn = document.getElementById("hcm-toggle-instructions");
  const box = document.getElementById("hcm-full-instructions");
  if (!btn || !box) return;

  btn.addEventListener("click", () => {
    const isHidden = (box.style.display === "none" || box.style.display === "");
    box.style.display = isHidden ? "block" : "none";
    btn.textContent = isHidden ? "🙈 Hide Assistant Instructions" : "👀 View Full Assistant Instructions";
  });
});
</script>


<hr style="margin:30px;margin-left: 50px;border:none; height:3px; background:#7d7d7d; width:300px;">

    <!-- Training Files -->
    
    <div style="border: 1px gray solid;display:inline-block;padding:10px;">
    <h2>Assistant Training & Knowledge Files</h2>
<p class="description">
  Upload up to 5 files max. 20MB (.txt, .pdf, .json). These will become the assistant’s knowledge source.
</p>


<form method="post" enctype="multipart/form-data" style="margin-bottom:12px;">
  <?php wp_nonce_field('hcm_upload_file', 'hcm_upload_nonce'); ?>
  <input type="hidden" name="editing_client" value="<?php echo esc_attr($active_client); ?>">
  <input type="file" name="hcm_training_file" accept=".txt,.pdf,.json" />
  <button class="button" name="hcm_upload_file" value="1">Upload</button>
</form>
</div>
<div id="hcm-file-list">
<?php
  $filesMeta = [];
  if ( $active_client && isset($all_chatbots[$active_client]['files']) && is_array($all_chatbots[$active_client]['files']) ) {
      $filesMeta = $all_chatbots[$active_client]['files'];
  }

  if (!empty($filesMeta)) {
      echo '<ul style="margin:0; padding-left:16px;">';
      foreach ($filesMeta as $meta) {
          $label = esc_html($meta['display_name'] ?? '');
          $sz    = isset($meta['size']) ? (int)$meta['size'] : 0;
          $mime  = esc_html($meta['mime'] ?? '');
          $stat  = esc_html($meta['ingestion'] ?? 'local-only-update-assistant');
          $kb    = $sz ? number_format_i18n($sz / 1024, 1) . ' KB' : '';

          echo '<li style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">'
             . '<strong>' . $label . '</strong>'
             . ($kb ? ' <span class="hcm-subtle">(' . esc_html($kb) . ')</span>' : '')
             . ($mime ? ' <span class="hcm-subtle">' . $mime . '</span>' : '')
             . ' <span class="hcm-badge hcm-badge--gray" title="status">' . $stat . '</span>'
             // IMPORTANT: delete form is its OWN form – not nested inside any other form
             . '<form method="post" style="display:inline;margin-left:8px;">'
             . '<input type="hidden" name="hcm_delete_file" value="1" />'
             . '<input type="hidden" name="editing_client" value="'.esc_attr($active_client).'" />'
             . '<input type="hidden" name="file_name" value="'.esc_attr($meta['display_name'] ?? '').'" />';

          wp_nonce_field('hcm_delete_file', 'hcm_delete_nonce');

          echo submit_button(
                  'Delete', 'delete small', 'submit', false,
                  ['onclick' => "return confirm('Delete ".esc_js($meta['display_name'] ?? '')."? This removes it locally and from OpenAI.');"]
               )
             . '</form>'
             . '</li>';
      }
      echo '</ul>';
  } else {
      echo '<p class="hcm-subtle">No training files uploaded yet.</p>';
  }
?>
</div>

 
<p> <span style="color:white;background-color:green;display inline-block;padding:4px 8px;">Note: <strong>Update Assistant</strong> after uploading or deleting files. </span></p>
<hr style="margin:30px;margin-left: 50px;border:none; height:2px; background:#7d7d7d; width:300px;">
    <?php

    echo '</div>';
    
  // 🔹 Fetch all saved chatbot configs
$chatbots = get_option('wp_chatbot_clients', []);

// Show import status banner if present
if ( isset($_GET['hcm_import']) ) {
    $msg = sanitize_text_field($_GET['hcm_import']);
    if ($msg === 'ok') {
        echo '<div class="notice notice-success"><p>✅ Import complete. Edit all new (added) chatbots and add OpenAI API keys. Click <strong>Save Chatbots</strong> and <strong>Update Assistant. Files are not restored.</strong></p></div>';
    } elseif ($msg === 'partial') {
        echo '<div class="notice notice-warning"><p>⚠️ Import finished with some issues. Check logs/notices.</p></div>';
    } else {
        echo '<div class="notice notice-error"><p>❌ Import failed: ' . esc_html($msg) . '</p></div>';
    }
}

// Backup  (always visible)

echo '<div style="border: 1px gray solid;display:inline-block;padding:10px;">';
echo '<h2>Export/Backup Chatbots (Data-only:No files)</h2>
<p class="description">Download a data-only backup of all chatbot settings. API keys are <strong>not</strong> exported.</p>';

echo '<form method="post" action="' . esc_url( admin_url('admin-post.php') ) . '">';
echo '<input type="hidden" name="action" value="hcm_export_backup">';
wp_nonce_field('hcm_export_backup');
submit_button('Download Chatbot Backup (JSON)', 'secondary', 'submit', false);
echo '</div></form>';

echo '<hr style="margin:30px;margin-left: 50px;border:none; height:2px; background:#7d7d7d; width:300px;">';

echo '<div style="border: 1px gray solid;display:inline-block;padding:10px;">
<h2>Import/Restore Chatbots (Data-only:No files)</h2>
<p class="description">Restore from a JSON backup created by this plugin. API keys and assistant ids are not imported.</p>
<form method="post" action="' . esc_url( admin_url('admin-post.php') ) . '" enctype="multipart/form-data">
  <input type="hidden" name="action" value="hcm_import_backup">
  ' . wp_nonce_field('hcm_import_backup', 'hcm_import_nonce', true, false) . '
  <p>
    <label for="hcm_import_file">Backup JSON file:</label><br>
    <input type="file" name="hcm_import_file" id="hcm_import_file" accept="application/json,.json" required>
  </p>
  <p>
    <label><input type="checkbox" name="overwrite" value="1"> Overwrite existing chatbots with import if they have the same client name.<br> Leave unchecked to merge only new chatbot imports (Do not update chatbots listed below).</label>
  </p>'
  . get_submit_button(
    'Import Chatbot Backup (JSON)',
    'primary',
    'submit',
    false,
    [
        'onclick' => "return confirm('⚠️ WARNING: If you ticked “Overwrite existing chatbots with the same client name”, existing chatbot data will be replaced. This action cannot be undone. Continue?');"
    ]
)

. '</div></form>';


echo '<p> <span style="color:white;background-color:green;display inline-block;padding:4px 8px;">Note: Click <strong>Edit</strong> and add API key to restored chatbots after import. Click <strong>Save Chatbot</strong> and <strong>Create Assistant</strong> to finalize. </span></p>';
echo '<hr style="margin-left: 50px;margin-top:30px;border:none; height:3px; background:#7d7d7d; width:300px;">';

if (!empty($chatbots)) {

 
   
   
    echo '<h2>Saved Chatbots</h2>';
    
    echo '<p> <span style="color:white;background-color:green;display inline-block;padding:4px 8px;">Note: Click <strong>Copy Embed Code</strong> button and paste the short script just before the <strong>"&lt;/body&gt;"</strong> tag on the webpage(s) you want to display your chatbot.</span></p>';
    
    echo '<table class="widefat fixed striped">';
    echo '<thead><tr>
        <th>Client Name</th>
        <th>Assistant ID</th>
        <th>Status</th>
        <th>Actions</th>
      </tr></thead><tbody>';


    foreach ($chatbots as $client_name => $config) {
        $assistant_id = esc_html($config['assistant_id']);
        $safe_client = esc_attr($client_name);
        list($status_label, $status_class) = hcm_compute_status($config);
        $last_synced_at = isset($config['last_synced_at']) ? esc_html($config['last_synced_at']) : '';

         echo "<tr>
        <td><strong>{$safe_client}</strong></td>
        <td>{$assistant_id}</td>
        <td><span class='hcm-badge {$status_class}'>".esc_html($status_label)."</span>".
            ($last_synced_at ? "<span class='hcm-subtle'>(last synced: {$last_synced_at})</span>" : "").
        "</td>
        <td>
          <button type='button' class='button copy-embed' data-client='{$safe_client}'>Copy Embed Code</button>";
          

$edit_url = admin_url('options-general.php?page=wp-chatbot-html-manager&client=' . urlencode($client_name));
?>
<a class="button" href="<?php echo esc_url($edit_url); ?>">Edit</a>

    
    
 <?php
// Compute status once per row (you added hcm_compute_status in Step 2)
list($status_label, $status_class) = hcm_compute_status($config);

// Show "Create Assistant" when Not created
if ($status_label === 'Create Assistant') : ?>
    <form method="post" style="display:inline;">
        <input type="hidden" name="hcm_action" value="create_assistant">
        <input type="hidden" name="client" value="<?php echo esc_attr($client_name); ?>">
        <?php wp_nonce_field('hcm_assistant_action', 'hcm_nonce'); ?>
        <?php submit_button('Create Assistant', 'secondary', 'submit', false); ?>
    </form>
<?php endif; ?>

<?php
// Show "Update Assistant" when Out of sync
if ($status_label === 'Update Assistant') : ?>
    <form method="post" style="display:inline;">
        <input type="hidden" name="hcm_action" value="update_assistant">
        <input type="hidden" name="client" value="<?php echo esc_attr($client_name); ?>">
        <?php wp_nonce_field('hcm_assistant_action', 'hcm_nonce'); ?>
        <?php submit_button('Update Assistant', 'secondary', 'submit', false); ?>
    </form>
<?php endif; ?>
   
    
    
 <form method="post" style="display:inline;">
  <?php wp_nonce_field('hcm_full_delete_action', 'hcm_full_delete_nonce'); ?>
  <input type="hidden" name="hcm_full_delete" value="1">
  <input type="hidden" name="client" value="<?php echo esc_attr($client_name); ?>">
  <?php
    submit_button(
      'Delete',
      'delete',
      'submit',
      false,
      [
        'onclick' => "return confirm('Permanent deletion! — CANNOT be undone. This will remove the assistant, vector store, uploaded files (OpenAI + local), and the saved config for " . esc_js($safe_client) . ". Continue?');"
      ]
    );
  ?>
</form>


   
    
  <?php  
  
  
  
echo "    
</td>

              </tr>";
    }

    echo '</tbody></table>';
} else {
    echo '<p>No chatbots have been saved yet.</p>';
}
  
  ?>
<script>
  // Map of main template => extended contents (server-preloaded)
  const HCM_EXTENDED_MAP = <?php echo wp_json_encode( hcm_get_all_extended_map() ); ?>;
</script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  // Copy Embed
  document.querySelectorAll(".copy-embed").forEach(btn => {
    btn.addEventListener("click", () => {
      const client = btn.dataset.client;
      const embedCode = `<script src="https://<?php echo $_SERVER['HTTP_HOST']; ?>/wp-content/plugins/html-chatbot-manager/assets/chatbot-loader.js" data-client="${client}"></` + `script>`;
      navigator.clipboard.writeText(embedCode).then(() => {
        btn.innerText = "Copied!";
        setTimeout(() => btn.innerText = "Copy Embed Code", 2000);
      });
    });
  });

  // Edit Button
  const allData = <?php echo wp_json_encode(get_option('wp_chatbot_clients', [])); ?>;
  const q = s => document.querySelector(s);
  const setVal = (sel, v) => { const el = q(sel); if (el && v !== undefined && v !== null) el.value = v; };
  
  
    // Auto-load extended textarea when template changes
  const tplSelect = document.querySelector('select[name="template_file"]');
  const extArea   = document.querySelector('textarea[name="extended_instructions"]');
  if (tplSelect && extArea) {
    tplSelect.addEventListener('change', () => {
      const chosen = tplSelect.value || '';
      const next   = (HCM_EXTENDED_MAP && HCM_EXTENDED_MAP[chosen]) ? HCM_EXTENDED_MAP[chosen] : '';
      // If user already typed something, confirm before overwriting
      if (extArea.value.trim() && next.trim() && extArea.value.trim() !== next.trim()) {
        if (!confirm('Replace the current extended instructions with the template default for this file?')) {
          return;
        }
      }
      extArea.value = next;
    });
  }

  
  

  function renderFilesForClient(client) {
    const container = document.getElementById('hcm-file-list');
    if (!container) return;
    const data = allData[client] || {};
    const files = Array.isArray(data.files) ? data.files : [];
    if (!files.length) {
      container.innerHTML = '<p class="hcm-subtle">No training files uploaded yet.</p>';
      return;
    }
    let html = '<ul style="margin:0; padding-left:16px;">';
    files.forEach(meta => {
      const name = (meta.display_name || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const kb   = meta.size ? (meta.size/1024).toFixed(1) + ' KB' : '';
      const mime = meta.mime || '';
      const stat = meta.ingestion || 'local-only-update-assistant';
      html += `<li><strong>${name}</strong>${kb ? ` <span class="hcm-subtle">(${kb})</span>` : ''}${mime ? ` <span class="hcm-subtle">${mime}</span>` : ''} <span class="hcm-badge hcm-badge--gray" title="status">${stat}</span></li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
  }
});
</script>

<?php   
    
}

require_once plugin_dir_path(__FILE__) . 'includes/chatbot-rest-api.php';
?>