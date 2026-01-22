<?php
/**
 * Plugin Name: Chatics
 * Description: A customizable chatbot widget that connects your WordPress site to n8n workflows.
 * Version: 1.0.1
 * Author: aethonic
 * Author URI: https://aethonic.com
 * License: GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: chatics
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

define( 'CHATICS_PATH', plugin_dir_path( __FILE__ ) );
define( 'CHATICS_URL', plugin_dir_url( __FILE__ ) );
define( 'CHATICS_VERSION', '1.0.1' );

// Admin Settings
if ( is_admin() ) {
    require_once CHATICS_PATH . 'includes/admin-settings.php';
}

// Frontend Widget
require_once CHATICS_PATH . 'includes/frontend-widget.php';
