<?php
/**
 * Hashing & status helpers for HTML Chatbot Manager
 *
 * Centralised utilities to detect changes in chatbot settings/files
 * and report whether an assistant is in sync.
 */

if (!defined('ABSPATH')) exit;

/**
 * Recursively sort arrays by key so hashing is stable.
 *
 * @param mixed $value
 * @return mixed
 */
if (!function_exists('hcm_normalize_for_hash')) {
    function hcm_normalize_for_hash($value) {
        if (is_array($value)) {
            foreach ($value as $k => $v) {
                $value[$k] = hcm_normalize_for_hash($v);
            }
            ksort($value);
        }
        return $value;
    }
}

/**
 * Build a deterministic fingerprint of files for hashing.
 *
 * Uses only stable identity/content fields so transient states
 * (e.g. 'ingestion') don't churn the hash.
 *
 * Canonical keys:
 *   - n : display name (string)
 *   - c : checksum (string, when available)
 *   - s : size in bytes (int)
 *
 * Fallbacks:
 *   - if checksum missing, fallback to openai_file_id or empty string
 *
 * @param array $filesMeta
 * @return array Canonical, sorted structure used in hashing.
 */
if (!function_exists('hcm_files_fingerprint')) {
    function hcm_files_fingerprint(array $filesMeta) {
        $out = [];
        foreach ($filesMeta as $f) {
            $name     = isset($f['display_name']) ? (string)$f['display_name'] : '';
            $checksum = '';
            if (!empty($f['checksum'])) {
                $checksum = (string)$f['checksum'];
            } elseif (!empty($f['openai_file_id'])) {
                // fallback if checksum not tracked for some legacy entries
                $checksum = (string)$f['openai_file_id'];
            }
            $size = isset($f['size']) ? (int)$f['size'] : 0;

            $out[] = [
                'n' => $name,
                'c' => $checksum,
                's' => $size,
            ];
        }

        // Stable order by file name
        usort($out, function($a, $b) {
            return strcmp($a['n'], $b['n']);
        });

        return $out;
    }
}

/**
 * Compute a fingerprint hash for the chatbot configuration.
 *
 * Stable across key order and file list ordering. Ignores ephemeral fields.
 *
 * @param array $settings  - Associative array of chatbot settings (UI + knowledge fields)
 * @param array $filesMeta - Array of training files metadata
 * @return string          - MD5 hash
 */
if (!function_exists('hcm_compute_current_hash')) {
    function hcm_compute_current_hash(array $settings, array $filesMeta = []) {
        $payload = [
            'settings' => hcm_normalize_for_hash($settings),
            'files'    => hcm_files_fingerprint($filesMeta),
        ];
        return md5( wp_json_encode($payload) );
    }
}

/**
 * Determine the assistant sync status label and CSS badge class.
 *
 * @param array $config - The saved chatbot config array
 * @return array        - [ 'label', 'css_class' ]
 */
if (!function_exists('hcm_compute_status')) {
    function hcm_compute_status($config) {
        $assistant_id = isset($config['assistant_id']) ? (string)$config['assistant_id'] : '';
        $current_hash = isset($config['current_hash']) ? (string)$config['current_hash'] : '';
        $synced_hash  = isset($config['synced_hash'])  ? (string)$config['synced_hash']  : '';

        // match your UI where you show "Create Assistant"
        if ($assistant_id === '') {
            return ['Create Assistant', 'hcm-badge--gray'];
        }

        // Legacy configs or never synced → treat as out of sync once
        if ($synced_hash === '') {
            return ['Update Assistant', 'hcm-badge--amber'];
        }

        if ($current_hash !== '' && $current_hash === $synced_hash) {
            return ['Up to date', 'hcm-badge--green'];
        }

        return ['Update Assistant', 'hcm-badge--amber'];
    }
}
