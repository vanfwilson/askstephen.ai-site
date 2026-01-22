<?php

/**
 * The Php Everywhere block
 *
 * @link       http://www.alexander-fuchs.net
 * @since      3.0.0
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/admin
 */

/**
 * The Php Everywhere block
 *
 * Contains all PHP related functions of the block.
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/admin
 * @author     Alexander Fuchs <info@alexander-fuchs.net>
 */
class Php_Everywhere_Block {

	/**
	 * The ID of this plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    3.0.0
	 * @param    string    $plugin_name       The name of this plugin.
	 * @param    string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Renders the PHP everywhere block
	 *
	 * @since    3.0.0
	 */
	public function render_block($attributes, $content) {

		ob_start();
		require( plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/php-everywhere-block-public-display.php');
		$var = ob_get_contents();
		ob_end_clean();
		return $var;

	}

	/**
	 * Registers the proper version of this block
	 *
	 * @since    3.0.0
	 */
	public function register() {

		if( $this->is_user_allowed_to_use_block() ) {
			wp_register_script( $this->plugin_name.'-block-editor-js', plugin_dir_url( __FILE__ ) . 'js/php-everywhere-block-admin.js', array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor'), $this->version, false );
		} else {
			wp_register_script( $this->plugin_name.'-block-editor-js', plugin_dir_url( __FILE__ ) . 'js/php-everywhere-block-admin-unauthorized.js', array( 'wp-blocks', 'wp-i18n', 'wp-element'), $this->version, false );
		}

		// Register block
		register_block_type( 'php-everywhere-block/php', array(
			'editor_script' => 'php-everywhere-block-editor-js',
			'render_callback' => array($this, 'render_block'),
			'editor_style'  => 'php-everywhere-block-editor-css'
		) );
	
		if ( function_exists( 'wp_set_script_translations' ) ) {
			/**
			 * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
			 * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
			 * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
			 */
			wp_set_script_translations( 'php-everywhere-block-editor-js', 'php-everywhere' );
		}

	}

	/**
	 * Checks if the block may be used by the current user (if they have permissions)
	 *
	 * @since    3.0.0
	 */
	private function is_user_allowed_to_use_block() {

		$allowedRoles = get_option('php_everywhere_permitted_roles', ['administrator']);
		$user = wp_get_current_user();
		$allowedRolesOfUser = array_intersect( $allowedRoles, (array) $user->roles );
		return ( count($allowedRolesOfUser) !== 0 );

	}

	/**
	 * Filters every post update to see if the user has the permission to modify the php code in the block.
	 * If they don't have permissions  we return True so that WordPress refuses to save the users changes.
	 *
	 * @since    3.0.0
	 */
	public function filter_post_data_for_block( $maybe_empty, $postarr ) {

		$pattern = "/wp\:php-everywhere-block\/php/i";
		// only do something if the block was used
		if( preg_match($pattern, $postarr['post_content']) === 1 ) {
			// check permissions
			if ( ! $this->is_user_allowed_to_use_block() ) {
				return True;
			}
		}

		return $maybe_empty;
	}

	/**
	 * Loads partial to display more info area
	 *
	 * @since    3.0.0
	 */
	public function load_admin_more_info_partial() {

		require( plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/php-everywhere-block-more-info-display.php');

	}
}
