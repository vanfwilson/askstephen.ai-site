<?php
/**
 * Plugin Name: AskStephen Dify Chatbot
 * Description: Dify AI Chatbot integration for AskStephen.ai
 * Version: 1.0
 */

// Add Dify chatbot embed code to footer
add_action('wp_footer', 'askstephen_dify_chatbot');

function askstephen_dify_chatbot() {
    // Get current user info if logged in
    $user_id = '';
    $user_name = '';
    $user_avatar = '';

    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        $user_id = 'wp_' . $current_user->ID;
        $user_name = $current_user->display_name;
        $user_avatar = get_avatar_url($current_user->ID);
    }
    ?>
    <script>
        window.difyChatbotConfig = {
            token: 'lPPan3LkF0B5Z5cS',
            baseUrl: 'https://vibe.aiautomationauthority.com',
            inputs: {
                // Custom inputs from Start node
            },
            systemVariables: {
                <?php if ($user_id): ?>
                user_id: '<?php echo esc_js($user_id); ?>',
                <?php endif; ?>
            },
            userVariables: {
                <?php if ($user_avatar): ?>
                avatar_url: '<?php echo esc_js($user_avatar); ?>',
                <?php endif; ?>
                <?php if ($user_name): ?>
                name: '<?php echo esc_js($user_name); ?>',
                <?php endif; ?>
            },
        }
    </script>
    <script
        src="https://vibe.aiautomationauthority.com/embed.min.js"
        id="lPPan3LkF0B5Z5cS"
        defer>
    </script>
    <style>
        /* AskStephen.ai Gold Theme for Dify Chatbot */
        #dify-chatbot-bubble-button {
            background: linear-gradient(135deg, #daa520 0%, #b8860b 100%) !important;
            box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4) !important;
        }
        #dify-chatbot-bubble-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(218, 165, 32, 0.6) !important;
        }
        #dify-chatbot-bubble-window {
            width: 24rem !important;
            height: 40rem !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2) !important;
        }
        /* Mobile responsive */
        @media (max-width: 640px) {
            #dify-chatbot-bubble-window {
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                border-radius: 0 !important;
                bottom: 0 !important;
                right: 0 !important;
            }
        }
    </style>
    <?php
}
