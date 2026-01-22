<?php
/**
 * Ensure shortcodes are processed in the content
 */

// Process shortcodes in the_content
add_filter('the_content', 'askstephen_process_shortcodes', 5);

function askstephen_process_shortcodes($content) {
    // Process shortcodes that might be in raw HTML blocks
    if (strpos($content, '[fluentform') !== false) {
        $content = do_shortcode($content);
    }
    return $content;
}
