<?php
if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Menu Rendering Function
 * Adds a menu item for the Chatics settings page in the WordPress admin
 * @since 1.0.0
 */
function chatics_add_admin_menu() {
    add_menu_page(
        __( 'Chatics', 'chatics' ),        // Page title
        __( 'Chatics', 'chatics' ),        // Menu label
        'manage_options',                         // Capability
        'chatics',                            // Menu slug
        'chatics_settings_page',              // Callback function
        'dashicons-format-chat',                  // Icon (WordPress dashicon)
        65                                        // Position (optional)
    );

}
add_action( 'admin_menu', 'chatics_add_admin_menu' );

/**
 * Initialize settings for the Chatics plugin
 * Registers all necessary settings and sections
 * @since 1.0.0
 * @see https://developer.wordpress.org/reference/functions/register_setting/
 * @see https://developer.wordpress.org/plugins/settings/settings-api/
 */

function chatics_settings_init() {
    // Register all settings
    register_setting( 'chatics_group', 'chatics_url', [
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => '',
    ] );

    register_setting( 'chatics_group', 'chatics_enabled', [
        'type' => 'boolean',
        'sanitize_callback' => 'chatics_sanitize_checkbox',
        'default' => false,
    ] );

    register_setting( 'chatics_group', 'chatics_position', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'right',
    ] );

    register_setting( 'chatics_group', 'chatics_title', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => __( 'Chat with us', 'chatics' ),
    ] );

    register_setting( 'chatics_group', 'chatics_color', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#00b894',
    ] );

    register_setting( 'chatics_group', 'chatics_icon_type', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'upload',
    ] );
    register_setting( 'chatics_group', 'chatics_icon_text', [
      'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => __( 'Chat with us', 'chatics' ),
    ] );

    register_setting( 'chatics_group', 'chatics_icon_url', [
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => '',
    ] );

    register_setting( 'chatics_group', 'chatics_zoom', [
        'type' => 'integer',
        'sanitize_callback' => 'absint',
        'default' => 100,
    ] );

   register_setting( 'chatics_group', 'chatics_allowed_days', [
        'type' => 'array',
        'sanitize_callback' => 'chatics_sanitize_days',
        'default' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    ] );

    register_setting( 'chatics_group', 'chatics_start_time', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '00:00',
    ] );

    register_setting( 'chatics_group', 'chatics_end_time', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '23:00',
    ] );

    register_setting( 'chatics_group', 'chatics_header_enabled', [
        'type' => 'boolean',
        'sanitize_callback' => 'chatics_sanitize_checkbox',
        'default' => true,
    ] );

    // Add settings section
    add_settings_section(
        'chatics_main_section',
        __( 'Chatics Settings', 'chatics' ),
        null,
        'chatics'
    );

}
add_action( 'admin_init', 'chatics_settings_init' );

/**
 * Sanitize checkbox values
 * @param mixed $value
 * @return bool
 */
function chatics_sanitize_checkbox( $value ) {
    return (bool) $value;
}

/**
 * Render the settings page
 */
function chatics_settings_page() {
    $url       = esc_url( get_option( 'chatics_url', '' ) );
    $enabled   = get_option( 'chatics_enabled', false );
    $position  = esc_attr( get_option( 'chatics_position', 'right' ) );
    $title     = esc_attr( get_option( 'chatics_title', 'Chat With Us' ) );
    $color     = esc_attr( get_option( 'chatics_color', '#00b894' ) );
    $zoom      = absint( get_option( 'chatics_zoom', 100 ) );
    $icon_type = esc_attr( get_option( 'chatics_icon_type', 'upload' ) );
    $icon_text = esc_attr( get_option( 'chatics_icon_text', '' ) );
    $icon_url  = esc_url( get_option( 'chatics_icon_url', '' ) );
    $header_enabled = get_option( 'chatics_header_enabled', true );

    wp_enqueue_style( 'chatics-admin', CHATICS_URL . 'assets/css/admin.css', [], CHATICS_VERSION );
    wp_enqueue_script( 'chatics-admin', CHATICS_URL . 'assets/js/admin.js', ['jquery'], CHATICS_VERSION, true );
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Chatics Settings', 'chatics' ); ?></h1>
        <form method="post" action="options.php">
            <?php settings_fields( 'chatics_group' ); ?>
            <table class="form-table">
                <tr>
                    <th scope="row"><label for="chatics_url"><?php esc_html_e( 'n8n Webhook URL', 'chatics' ); ?></label></th>
                    <td>
                        <input type="url" id="chatics_url" name="chatics_url" value="<?php echo esc_url($url); ?>" class="regular-text" required>
                        <?php chatics_documentation_box(); ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e( 'Enable Chatbot', 'chatics' ); ?></th>
                    <td><label><input type="checkbox" name="chatics_enabled" value="1" <?php checked( $enabled ); ?>> <?php esc_html_e( 'Enable on site', 'chatics' ); ?></label></td>
                </tr>
                <tr>
                    <th scope="row"><label for="chatics_position"><?php esc_html_e( 'Widget Position', 'chatics' ); ?></label></th>
                    <td>
                        <select id="chatics_position" name="chatics_position">
                            <option value="right" <?php selected( $position, 'right' ); ?>><?php esc_html_e( 'Right', 'chatics' ); ?></option>
                            <option value="left" <?php selected( $position, 'left' ); ?>><?php esc_html_e( 'Left', 'chatics' ); ?></option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="chatics_title"><?php esc_html_e( 'Chat Topbar Title', 'chatics' ); ?></label></th>
                    <td><input type="text" id="chatics_title" name="chatics_title" value="<?php echo esc_attr($title); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="chatics_color"><?php esc_html_e( 'Widget Color', 'chatics' ); ?></label></th>
                    <td><input type="color" id="chatics_color" name="chatics_color" value="<?php echo esc_attr($color); ?>"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="chatics_icon_text"><?php esc_html_e( 'Chat Button Title', 'chatics' ); ?></label></th>
                    <td><input type="text" id="chatics_icon_text" name="chatics_icon_text" value="<?php echo esc_attr($icon_text); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e( 'Icon Type', 'chatics' ); ?></th>
                    <td>
                        <label><input type="radio" name="chatics_icon_type" value="upload" <?php checked( $icon_type, 'upload' ); ?>> <?php esc_html_e( 'Upload SVG/PNG', 'chatics' ); ?></label><br>
                        <input type="hidden" name="chatics_icon_url" id="chatics_icon_url" value="<?php echo esc_attr($icon_url); ?>">
                        <button type="button" class="button" id="chatics_upload_icon"><?php esc_html_e( 'Upload Icon', 'chatics' ); ?></button><br>
                        <div id="chatics_icon_preview" style="margin-top:10px;">
                            <?php if ( $icon_url ) : ?>
                                <img src="<?php echo esc_url($icon_url); ?>" style="max-width:50px;max-height:50px;">
                            <?php endif; ?>
                        </div>
                        <button type="button" class="button button-secondary" id="chatics_remove_icon"><?php esc_html_e( 'Remove Icon', 'chatics' ); ?></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="chatics_zoom"><?php esc_html_e( 'Chat Content Zoom (%)', 'chatics' ); ?></label></th>
                    <td><input type="range" min="50" max="150" id="chatics_zoom" name="chatics_zoom" value="<?php echo esc_attr($zoom); ?>"> <span id="zoom-value"><?php echo esc_html($zoom); ?>%</span></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e( 'Header Settings', 'chatics' ); ?></th>
                    <td>
                        <label><input type="checkbox" name="chatics_header_enabled" value="1" <?php checked( $header_enabled ); ?>> <?php esc_html_e( 'Enable Chat Header', 'chatics' ); ?></label>
                        <p class="description"><?php esc_html_e( 'Show/hide the header bar with title and control buttons.', 'chatics' ); ?></p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e( 'Working Days', 'chatics' ); ?></th>
                    <td>
                        <?php
                        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        $selected_days = get_option( 'chatics_allowed_days', [] );
                        foreach ( $days as $day ) :
                            echo '<label><input type="checkbox" name="chatics_allowed_days[]" value="' . esc_attr( $day ) . '" ' . checked( in_array( $day, $selected_days, true ), true, false ) . '> ' . esc_html( $day ) . '</label>';
                            echo '<br>';
                        endforeach;
                        ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e( 'Working Hours', 'chatics' ); ?></th>
                    <td>
                        <?php esc_html_e( 'From:', 'chatics' ); ?>
                        <input type="time" name="chatics_start_time" value="<?php echo esc_attr( get_option( 'chatics_start_time', '00:00' ) ); ?>">
                        <?php esc_html_e( 'To:', 'chatics' ); ?>
                        <input type="time" name="chatics_end_time" value="<?php echo esc_attr( get_option( 'chatics_end_time', '23:00' ) ); ?>">
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

/**
 * Sanitize days array
 * @param array $value
 * @return array
 */
function chatics_sanitize_days( $value ) {
    if ( ! is_array( $value ) ) {
        return [];
    }
    
    $valid_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return array_intersect( $value, $valid_days );
}

/**
 * Documentation box
 */
function chatics_documentation_box() {
    ?>
    <p>
        <a href="#" id="chatics-doc-toggle" style="text-decoration: none; font-weight: 600; color: #0073aa;">
            ▼ <?php esc_html_e( 'Need help getting your Chat URL?', 'chatics' ); ?>
        </a>
    </p>

    <div id="chatics-doc-box" style="display: none; border-left: 4px solid #1abc9c; background: #f9f9f9; padding: 12px 16px; max-width: 600px;">
        <strong><?php esc_html_e( 'How to get your n8n Chat URL:', 'chatics' ); ?></strong>
        <ol style="margin-top: 8px; padding-left: 20px;">
            <li><?php esc_html_e( 'Create a new workflow in n8n.', 'chatics' ); ?></li>
            <li><?php esc_html_e( 'Add the Chat Trigger node to the canvas.', 'chatics' ); ?></li>
            <li><?php esc_html_e( 'Connect it to your desired chatbot logic (e.g., OpenAI, assistant chain, or automation).', 'chatics' ); ?></li>
            <li><?php esc_html_e( 'In the Chat Trigger node settings:', 'chatics' ); ?>
                <ul style="padding-left: 20px; list-style: circle;">
                    <li><?php esc_html_e( 'Turn on "Make Chat Publicly Available"', 'chatics' ); ?></li>
                    <li><?php esc_html_e( 'Set Mode to "Hosted Chat"', 'chatics' ); ?></li>
                </ul>
            </li>
            <li><?php esc_html_e( 'Save and activate your workflow.', 'chatics' ); ?></li>
            <li><?php esc_html_e( 'Copy the Chat URL shown in the Chat Trigger node.', 'chatics' ); ?></li>
        </ol>
        <p style="margin-top: 10px;">
            <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/" target="_blank" rel="noopener noreferrer">
                📄 <?php esc_html_e( 'n8n Chat Trigger Documentation', 'chatics' ); ?>
            </a>
            &nbsp;&nbsp;
            <a href="https://www.youtube.com/watch?v=xxxxxxxxx" target="_blank" rel="noopener noreferrer">
                ▶️ <?php esc_html_e( 'Video Tutorial', 'chatics' ); ?>
            </a>
        </p>
    </div>
    <?php
}
