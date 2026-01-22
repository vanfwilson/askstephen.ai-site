<?php

/**
 * Fired during plugin activation
 *
 * @link       http://www.alexander-fuchs.net
 * @since      3.0.0
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      3.0.0
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/includes
 * @author     Alexander Fuchs <info@alexander-fuchs.net>
 */
class Php_Everywhere_Activator {

	/**
	 * Triggers all functions that should run upon activation of the plugin
	 *
	 * @since    3.0.0
	 */
	public static function activate() {
		// Trigger upgrade wizard
		set_transient( 'should_display_upgrade_admin_notice', true, 5 );
	}

}
