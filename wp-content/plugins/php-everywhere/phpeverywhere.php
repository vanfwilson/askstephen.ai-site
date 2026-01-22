<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://www.alexander-fuchs.net
 * @since             3.0.0
 * @package           Php_Everywhere
 *
 * @wordpress-plugin
 * Plugin Name:       PHP Everywhere
 * Plugin URI:        http://www.alexander-fuchs.net/php-everywhere/
 * Description: 	  This plugin enables PHP code in pages, posts and everywhere you can place a Gutenberg block 🔥. Attention: The update to 3.0.0 is a breaking change that removes the [php_everywhere] short code and widget. Run the upgrade wizard from this plugin's settings to help you migrate to Gutenberg blocks.
 * Version: 		  3.0.0
 * Author:            Alexander Fuchs
 * Author URI:        http://www.alexander-fuchs.net
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       php-everywhere
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PHP_EVERYWHERE_VERSION', '3.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class- php-everywhere-activator.php
 */
function activate_php_everywhere() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-php-everywhere-activator.php';
	Php_Everywhere_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class- php-everywhere-deactivator.php
 */
function deactivate_php_everywhere() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-php-everywhere-deactivator.php';
	Php_Everywhere_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_php_everywhere' );
register_deactivation_hook( __FILE__, 'deactivate_php_everywhere' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-php-everywhere.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    3.0.0
 */
function run_php_everywhere() {

	$plugin = new Php_Everywhere();
	$plugin->run();

}
run_php_everywhere();
