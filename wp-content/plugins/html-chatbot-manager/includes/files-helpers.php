<?php
/**
 * File + Sync helpers for HTML Chatbot Manager
 *
 * NOTE:
 * - This file is UI-agnostic (no echo/print). Callers must handle WP_Error.
 * - Requires http-helpers.php and hashing-helpers.php to be loaded first.
 */

if (!defined('ABSPATH')) exit;

/**
 * Return upload dir+url for a client:
 *   /wp-content/uploads/html-chatbot-manager/<client-slug>/
 *
 * @param string $client
 * @return array [ $dir, $url ]
 */
if (!function_exists('hcm_client_upload_dir')) {
    function hcm_client_upload_dir($client) {
        $base = wp_upload_dir(); // ['basedir'=>..., 'baseurl'=>...]
        $slug = sanitize_title($client);
        $dir  = trailingslashit($base['basedir']) . 'html-chatbot-manager/' . $slug . '/';
        $url  = trailingslashit($base['baseurl']) . 'html-chatbot-manager/' . $slug . '/';
        return [$dir, $url];
    }
}

/**
 * Allowed MIME types for training files.
 *
 * @return array ext => mime
 */
if (!function_exists('hcm_allowed_mimes')) {
    function hcm_allowed_mimes() {
        return [
            'txt'  => 'text/plain',
            'pdf'  => 'application/pdf',
            'json' => 'application/json',
        ];
    }
}

/**
 * Recursively remove the local upload directory for a client (if exists).
 *
 * @param string $client
 * @return true|WP_Error
 */
if (!function_exists('hcm_remove_client_upload_tree')) {
    function hcm_remove_client_upload_tree($client) {
        [$dir] = hcm_client_upload_dir($client);
        if (!$dir || !is_dir($dir)) return true;

        try {
            $it = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS),
                RecursiveIteratorIterator::CHILD_FIRST
            );
            foreach ($it as $file) {
                if ($file->isDir()) {
                    @rmdir($file->getPathname());
                } else {
                    @unlink($file->getPathname());
                }
            }
            @rmdir($dir);
            return true;
        } catch (Throwable $e) {
            return new WP_Error('remove_upload_tree_failed', $e->getMessage());
        }
    }
}

/**
 * Sync local training files to OpenAI:
 * - ensure vector store exists
 * - upload any local file lacking openai_file_id
 * - attach missing files to vector store
 * - poll ingestion
 * - update file ingestion statuses in $config['files']
 * - recompute $config['current_hash']
 *
 * @param string $client
 * @param array  $config (by-ref) expects keys: api_key, files[], vector_store_id?, settings?
 * @return true|WP_Error
 */
if (!function_exists('hcm_sync_files_to_openai')) {
    function hcm_sync_files_to_openai($client, &$config) {
        $api_key = isset($config['api_key']) ? trim($config['api_key']) : '';
        if ($api_key === '') {
            return new WP_Error('no_api_key', 'No API key stored for this client.');
        }

        $filesMeta = (isset($config['files']) && is_array($config['files'])) ? $config['files'] : [];

        // 1) Ensure vector store exists
        $vsid = hcm_ensure_vector_store($api_key, $client, $config);
        if (is_wp_error($vsid)) return $vsid;

        // 2) Upload any local file that lacks openai_file_id
        foreach ($filesMeta as $i => $meta) {
            $fid = $meta['openai_file_id'] ?? '';
            if ($fid) continue;

            $path = $meta['path'] ?? '';
            $mime = $meta['mime'] ?? 'application/octet-stream';
            $name = $meta['display_name'] ?? ($path ? basename($path) : '');

            if (!$path || !file_exists($path)) {
                $filesMeta[$i]['ingestion'] = 'upload-failed';
                continue;
            }

            $up = hcm_openai_upload_file($api_key, $path, $mime, $name);
            if (is_wp_error($up)) {
                $filesMeta[$i]['ingestion'] = 'upload-failed';
                continue;
            }

            $fid = $up['id'] ?? '';
            if ($fid) {
                $filesMeta[$i]['openai_file_id'] = $fid;
                $filesMeta[$i]['ingestion']      = 'uploaded';
            } else {
                $filesMeta[$i]['ingestion'] = 'upload-failed';
            }
        }

        // 3) Gather all desired file_ids (old + new) we want attached
        $want_ids = [];
        foreach ($filesMeta as $meta) {
            if (!empty($meta['openai_file_id'])) $want_ids[] = $meta['openai_file_id'];
        }
        $want_ids = array_values(array_unique($want_ids));

        // 4) Determine what’s already attached to vector store
        $existing_in_store = hcm_vector_store_list_files($api_key, $vsid);
        if (is_wp_error($existing_in_store)) {
            // Non-fatal: just try to re-add; treat as empty set
            $existing_in_store = [];
        }
        $existing_set = array_flip($existing_in_store);

        // Compute delta
        $to_add = [];
        foreach ($want_ids as $fid) {
            if (!isset($existing_set[$fid])) $to_add[] = $fid;
        }

        // 5) Attach missing file_ids
        if (!empty($to_add)) {
            $add = hcm_vector_store_add_files($api_key, $vsid, $to_add);
            if (is_wp_error($add)) {
                // Mark those as attach-failed
                foreach ($filesMeta as $i => $meta) {
                    if (in_array(($meta['openai_file_id'] ?? ''), $to_add, true)) {
                        $filesMeta[$i]['ingestion'] = 'attach-failed';
                    }
                }
                // Persist partial state before returning the error
                $config['files']           = $filesMeta;
                $config['vector_store_id'] = $vsid;
                if (isset($config['settings'])) {
                    $config['current_hash'] = hcm_compute_current_hash($config['settings'], $filesMeta);
                }
                return $add;
            }

            // 6) Poll ingestion (coarse)
            $counts = hcm_vector_store_poll($api_key, $vsid, 90);
            if (is_wp_error($counts)) {
                // Mark pending where needed
                foreach ($filesMeta as $i => $meta) {
                    if (in_array(($meta['openai_file_id'] ?? ''), $to_add, true)) {
                        if (empty($filesMeta[$i]['ingestion']) || $filesMeta[$i]['ingestion'] === 'uploaded') {
                            $filesMeta[$i]['ingestion'] = 'ingestion-pending';
                        }
                    }
                }
            } else {
                // Re-list to confirm which ones are now present
                $now_in_store = hcm_vector_store_list_files($api_key, $vsid);
                $now_set = is_wp_error($now_in_store) ? [] : array_flip($now_in_store);
                foreach ($filesMeta as $i => $meta) {
                    $fid = $meta['openai_file_id'] ?? '';
                    if ($fid && isset($now_set[$fid])) {
                        $filesMeta[$i]['ingestion'] = 'indexed';
                    }
                }
            }
        } else {
            // Nothing to add; mark existing as indexed if we can confirm
            if (!empty($existing_in_store)) {
                $existing_set = array_flip($existing_in_store);
                foreach ($filesMeta as $i => $meta) {
                    $fid = $meta['openai_file_id'] ?? '';
                    if ($fid && isset($existing_set[$fid])) {
                        $filesMeta[$i]['ingestion'] = 'indexed';
                    }
                }
            }
        }

        // 7) Persist meta + vector store + current hash
        $config['files']           = $filesMeta;
        $config['vector_store_id'] = $vsid;

        if (isset($config['settings'])) {
            $config['current_hash'] = hcm_compute_current_hash($config['settings'], $filesMeta);
        }

        return true;
    }
}

/**
 * Fully delete a chatbot: OpenAI assistant, vector store and local uploads.
 *
 * @param string $client_name
 * @param array  $config
 * @return true|\WP_Error
 */
if ( ! function_exists('hcm_full_delete_chatbot') ) {
    function hcm_full_delete_chatbot( $client_name, $config ) {

        $api_key = isset($config['api_key']) ? trim($config['api_key']) : '';
        if ( empty($api_key) ) {
            return new \WP_Error( 'no_api_key', 'No API key stored for this chatbot.' );
        }

        // Delete assistant if exists
        if ( !empty($config['assistant_id']) ) {
            $resp = wp_remote_request(
                'https://api.openai.com/v1/assistants/' . rawurlencode( $config['assistant_id'] ),
                [
                    'method'  => 'DELETE',
                    'timeout' => 30,
                    'headers' => [
                        'Authorization' => 'Bearer ' . $api_key,
                        'OpenAI-Beta'   => 'assistants=v2',
                    ],
                ]
            );
            if ( is_wp_error($resp) ) {
                return $resp;
            }
        }

        // Delete vector store if exists
        if ( !empty($config['vector_store_id']) ) {
            $resp = wp_remote_request(
                'https://api.openai.com/v1/vector_stores/' . rawurlencode( $config['vector_store_id'] ),
                [
                    'method'  => 'DELETE',
                    'timeout' => 30,
                    'headers' => [
                        'Authorization' => 'Bearer ' . $api_key,
                        'OpenAI-Beta'   => 'assistants=v2',
                    ],
                ]
            );
            if ( is_wp_error($resp) ) {
                return $resp;
            }
        }

        // Remove local uploaded files
        hcm_remove_client_upload_tree( $client_name );

        return true;
    }
}

