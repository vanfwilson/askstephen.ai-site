<?php
/**
 * Template & instruction helpers for HTML Chatbot Manager
 *
 * - hcm_get_templates()
 * - hcm_get_extended_template_contents()
 * - hcm_get_all_extended_map()
 * - hcm_build_instructions()
 */

if (!defined('ABSPATH')) exit;

/**
 * Absolute path to the /support templates folder.
 *
 * @return string
 */
if (!function_exists('hcm_support_dir')) {
    function hcm_support_dir(): string {
        // Prefer constant from main plugin; fallback to plugin_dir_path
        if (defined('HCM_PLUGIN_DIR')) {
            return trailingslashit(HCM_PLUGIN_DIR) . 'support/';
        }
        return trailingslashit(plugin_dir_path(__FILE__)) . '../support/';
    }
}

/**
 * Normalize line endings to "\n" for consistent hashing / UI.
 *
 * @param string $text
 * @return string
 */
if (!function_exists('hcm_normalize_eol')) {
    function hcm_normalize_eol(string $text): string {
        return str_replace(["\r\n", "\r"], "\n", $text);
    }
}

/**
 * Return a list of MAIN template basenames (*.txt) in /support,
 * excluding any *_extended.txt files.
 *
 * @return array<int, string>
 */
if (!function_exists('hcm_get_templates')) {
    function hcm_get_templates(): array {
        $dir = hcm_support_dir();
        if (!is_dir($dir)) return [];

        $files = glob($dir . '*.txt');
        if (!$files) return [];

        $mains = array_filter($files, function ($path) {
            $base = basename($path);
            // exclude *_extended.txt
            return (substr($base, -13) !== '_extended.txt');
        });

        $out = array_map('basename', $mains);
        sort($out, SORT_NATURAL | SORT_FLAG_CASE);
        return array_values($out);
    }
}

/**
 * Load the paired extended template contents for a main template.
 * Example: "product_advisor.txt" → loads "product_advisor_extended.txt" if present.
 *
 * @param string $main_tpl_basename  e.g. "product_advisor.txt"
 * @return string  Raw contents or '' if none
 */
if (!function_exists('hcm_get_extended_template_contents')) {
    function hcm_get_extended_template_contents(string $main_tpl_basename): string {
        if ($main_tpl_basename === '') return '';
        $dir  = hcm_support_dir();

        // If someone passed an *_extended.txt by mistake, derive the main's base name.
        if (substr(strtolower($main_tpl_basename), -13) === '_extended.txt') {
            $main_tpl_basename = substr($main_tpl_basename, 0, -13) . '.txt';
        }

        $base     = pathinfo($main_tpl_basename, PATHINFO_FILENAME);
        $extended = $dir . $base . '_extended.txt';

        if (is_file($extended) && is_readable($extended)) {
            $raw = file_get_contents($extended);
            return is_string($raw) ? $raw : '';
        }
        return '';
    }
}

/**
 * Build a map: { main_template_basename => extended_contents }
 * Useful to preload in JS so switching templates is instant.
 *
 * @return array<string, string>
 */
if (!function_exists('hcm_get_all_extended_map')) {
    function hcm_get_all_extended_map(): array {
        $out   = [];
        $mains = hcm_get_templates();
        foreach ($mains as $main) {
            $out[$main] = hcm_get_extended_template_contents($main);
        }
        return $out;
    }
}

/**
 * Build the final assistant instructions from a chosen template + extended section,
 * with placeholder replacement and file-name injection (up to 5).
 *
 * Placeholders supported:
 *  *NAME*, *BN*, *PN*, *PNLURL*, *SAPN*, *SUPN*, *CFURL*, *TF1*..*TF5*
 *
 * @param array $settings  Saved settings (UI + business config)
 * @param array $filesMeta Optional files metadata array
 * @return string Final instruction markdown/text
 */
if (!function_exists('hcm_build_instructions')) {
    function hcm_build_instructions(array $settings, array $filesMeta = []): string {
        $dir  = hcm_support_dir();
        $file = isset($settings['template_file']) ? basename((string)$settings['template_file']) : '';
        // Never treat an *_extended.txt as the main
        if ($file && substr(strtolower($file), -13) === '_extended.txt') {
            $file = substr($file, 0, -13) . '.txt';
        }
        $path = $file ? $dir . $file : '';

        // Values for replacement
        $name   = (string)($settings['name']              ?? '');
        $bn     = (string)($settings['business_name']     ?? '');
        $pn     = (string)($settings['promotion']         ?? '');
        $pnlurl = (string)($settings['promotion_link']    ?? '');
        $sapn   = (string)($settings['sales_phone']       ?? '');
        $supn   = (string)($settings['support_phone']     ?? '');
        $cfurl  = (string)($settings['contact_form_link'] ?? '');

        // Up to 5 training file names
        $tf = [];
        foreach ($filesMeta as $m) {
            if (!empty($m['display_name'])) $tf[] = (string)$m['display_name'];
            if (count($tf) >= 5) break;
        }
        for ($i = count($tf); $i < 5; $i++) { $tf[$i] = ''; }

        $replacements = [
            '*NAME*'   => $name,
            '*BN*'     => $bn,
            '*PN*'     => $pn,
            '*PNLURL*' => $pnlurl,
            '*SAPN*'   => $sapn,
            '*SUPN*'   => $supn,
            '*CFURL*'  => $cfurl,
            '*TF1*'    => $tf[0],
            '*TF2*'    => $tf[1],
            '*TF3*'    => $tf[2],
            '*TF4*'    => $tf[3],
            '*TF5*'    => $tf[4],
        ];

        // MAIN content
        $main_content = '';
        if ($path && is_file($path) && is_readable($path)) {
            $tpl = file_get_contents($path);
            if ($tpl !== false) {
                $main_content = hcm_normalize_eol(strtr($tpl, $replacements));
            }
        }

        // EXTENDED content: prefer saved override, else paired _extended.txt
        $ext_raw = (string)($settings['extended_override'] ?? '');
        if ($ext_raw === '' && $file) {
            $ext_raw = hcm_get_extended_template_contents($file);
        }

        $extended_content = '';
        if ($ext_raw !== '') {
            $extended_content = hcm_normalize_eol(strtr($ext_raw, $replacements));
            // If author forgot a heading, add a simple one
            if (strpos(ltrim($extended_content), '##') !== 0) {
                $extended_content = "## Additional Instructions\n" . $extended_content;
            }
        }

        // Prefer main template when present
        if (trim($main_content) !== '') {
            $merged = rtrim($main_content);
            if (trim($extended_content) !== '') {
                $merged .= "\n\n" . rtrim($extended_content) . "\n";
            }
            return trim($merged);
        }

        // Fallback if no main template exists
        $lines = [];
        if ($name || $bn) $lines[] = "You are {$name}, the assistant for {$bn}.";
        if ($pn)     $lines[] = "Current promotion: {$pn}.";
        if ($pnlurl) $lines[] = "Promotion link: {$pnlurl}.";
        if ($sapn)   $lines[] = "Sales phone: {$sapn}.";
        if ($supn)   $lines[] = "Support phone: {$supn}.";
        if ($cfurl)  $lines[] = "Contact form: {$cfurl}.";
        if (array_filter($tf)) {
            $lines[] = "Training Files:";
            foreach ($tf as $i => $n) {
                if ($n !== '') $lines[] = '  ' . ($i + 1) . ". {$n}";
            }
        }
        if (trim($extended_content) !== '') {
            $lines[] = $extended_content;
        }
        $lines[] = "Be brief, friendly, and helpful.";

        return trim(implode("\n", array_filter($lines)));
    }
}
