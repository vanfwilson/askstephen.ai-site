<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.alexander-fuchs.net
 * @since      3.0.0
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/admin
 * @author     Alexander Fuchs <info@alexander-fuchs.net>
 */
class Php_Everywhere_Admin {

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
	 * The php_everywhere_block
	 *
	 * @since    3.0.0
	 * @access   private
	 * @var      object
	 */
	private $php_everywhere_block;

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

		$this->php_everywhere_block = new PhP_Everywhere_Block($this->plugin_name, $this->version);

	}

	/**
	 * Returns php_everywhere_block
	 *
	 * @since    3.0.0
	 */
	public function get_php_everywhere_block() {

		return $this->php_everywhere_block;
	
	}

	/**
	 * Register the admin menu.
	 *
	 * @since    3.0.0
	 */
	public function register_admin_menu() {

		add_options_page( __( 'PHP Everywhere'), __( 'PHP Everywhere'), 'manage_options', 'php-everywhere-options', array($this, 'load_admin_partial') );
		add_submenu_page( null,  __( 'PHP Everywhere Block'),  __( 'PHP Everywhere Block'), 'edit_posts', 'php-everywhere-block-more-info', array($this->php_everywhere_block, 'load_admin_more_info_partial') );
		add_submenu_page( null,  __( 'PHP Everywhere Upgrade'),  __( 'PHP Everywhere Upgrade'), 'manage_options', 'php-everywhere-upgrade', array($this, 'load_admin_upgrade_partial') );
	
	}

	/**
	 * Adds a link to the admin menu to plugin's links.
	 *
	 * @since    3.0.0
	 */
	public function add_admin_menu_link_to_plugin( $links ) {

		$url = get_admin_url() . "options-general.php?page=php-everywhere-options";
		$settings_link = '<a href="' . $url . '">' . __('Settings') . '</a>';
		array_unshift( $links, $settings_link );
		return $links;
	
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    3.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style( $this->plugin_name.'-block-editor-css', plugin_dir_url( __FILE__ ) . 'css/php-everywhere-block-admin.css', array( 'wp-edit-blocks' ), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    3.0.0
	 */
	public function enqueue_scripts() {

		//empty for now
	}

	/**
	 * Register the php everywhere block
	 *
	 * @since    3.0.0
	 */
	public function register_php_everywhere_block() {

		if ( ! function_exists( 'register_block_type' ) ) {
			// Gutenberg is not active.
			return;
		}

		$this->php_everywhere_block->register();
	
	}

	/**
	 * Loads partial to display admin area
	 *
	 * @since    3.0.0
	 */
	public function load_admin_partial() {

		if ( !current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		// check if form was submitted and save options
		if(isset($_POST['php_everywhere_settings'] ) && isset($_POST['update_php_everywhere_settings_nonce'] )) {
			// verify that nonce is valid
			if(!wp_verify_nonce( $_POST['update_php_everywhere_settings_nonce'], 'update_php_everywhere_settings' )) {
			   wp_nonce_ays( '' );
			}

			// check user privileges
			if(!current_user_can( 'manage_options' ))  {
				wp_die( __('You do not have sufficient permissions to access this page.') );
			}
			
			if( isset( $_POST['php_everywhere_permitted_roles'] ) )
			{
				$permitted_roles = $_POST['php_everywhere_permitted_roles'];
				// make sure admin is always present
				if ( !in_array( 'administrator', $permitted_roles ) )
				{
					$permitted_roles[] = 'administrator'; 
				}
				error_log(print_r( $permitted_roles, true ));
				update_option('php_everywhere_permitted_roles', $permitted_roles);
			}
		}

		require( plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/php-everywhere-admin-display.php');

	}

	/**
	 * Loads partial to display upgrade wizard
	 *
	 * @since    3.0.0
	 */
	public function load_admin_upgrade_partial() {

		if ( !current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		require( plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/php-everywhere-upgrade-display.php');

	}

	/**
	 * Displays admin notice asking to upgrade after activation
	 *
	 * @since    3.0.0
	 */
	public function display_upgrade_admin_notice() {
		/* Check transient, if available display notice */
		if( get_transient( 'should_display_upgrade_admin_notice' ) ){
			?>
			<div class="updated notice-warning is-dismissible">
				<p><?php _e('Thank you for using PHP Everywhere! If you are upgrading from a older version of this plugin you need to run the upgrade wizard. Version 3.0.0 removed the php_everywhere shortcode and widget. Old PHP code needs to be updated to use the Gutenberg block to continue to work.'); ?></p>
				<form method="get" action="<?php echo get_admin_url(); ?>options-general.php">
					<input type="hidden" name="page" value="php-everywhere-upgrade"/>
					<?php submit_button( __('Upgrade now') ); ?>
				</form>
			</div>
			<?php
			/* Delete transient, only display this notice once. */
			delete_transient( 'should_display_upgrade_admin_notice' );
		}
	}

}
