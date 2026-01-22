<?php
/**
 * Neve functions.php file
 *
 * Author:          Andrei Baicus <andrei@themeisle.com>
 * Created on:      17/08/2018
 *
 * @package Neve
 */

define( 'NEVE_VERSION', '4.0.1' );
define( 'NEVE_INC_DIR', trailingslashit( get_template_directory() ) . 'inc/' );
define( 'NEVE_ASSETS_URL', trailingslashit( get_template_directory_uri() ) . 'assets/' );
define( 'NEVE_MAIN_DIR', get_template_directory() . '/' );
define( 'NEVE_BASENAME', basename( NEVE_MAIN_DIR ) );
define( 'NEVE_PLUGINS_DIR', plugin_dir_path( dirname( __DIR__ ) ) . 'plugins/' );

if ( ! defined( 'NEVE_DEBUG' ) ) {
	define( 'NEVE_DEBUG', false );
}
define( 'NEVE_NEW_DYNAMIC_STYLE', true );
/**
 * Buffer which holds errors during theme inititalization.
 *
 * @var WP_Error $_neve_bootstrap_errors
 */
global $_neve_bootstrap_errors;

$_neve_bootstrap_errors = new WP_Error();

if ( version_compare( PHP_VERSION, '7.0' ) < 0 ) {
	$_neve_bootstrap_errors->add(
		'minimum_php_version',
		sprintf(
		/* translators: %s message to upgrade PHP to the latest version */
			__( "Hey, we've noticed that you're running an outdated version of PHP which is no longer supported. Make sure your site is fast and secure, by %1\$s. Neve's minimal requirement is PHP%2\$s.", 'neve' ),
			sprintf(
			/* translators: %s message to upgrade PHP to the latest version */
				'<a href="https://wordpress.org/support/upgrade-php/">%s</a>',
				__( 'upgrading PHP to the latest version', 'neve' )
			),
			'7.0'
		)
	);
}
/**
 * A list of files to check for existance before bootstraping.
 *
 * @var array Files to check for existance.
 */

$_files_to_check = defined( 'NEVE_IGNORE_SOURCE_CHECK' ) ? [] : [
	NEVE_MAIN_DIR . 'vendor/autoload.php',
	NEVE_MAIN_DIR . 'style-main-new.css',
	NEVE_MAIN_DIR . 'assets/js/build/modern/frontend.js',
	NEVE_MAIN_DIR . 'assets/apps/dashboard/build/dashboard.js',
	NEVE_MAIN_DIR . 'assets/apps/customizer-controls/build/controls.js',
];
foreach ( $_files_to_check as $_file_to_check ) {
	if ( ! is_file( $_file_to_check ) ) {
		$_neve_bootstrap_errors->add(
			'build_missing',
			sprintf(
			/* translators: %s: commands to run the theme */
				__( 'You appear to be running the Neve theme from source code. Please finish installation by running %s.', 'neve' ), // phpcs:ignore WordPress.Security.EscapeOutput
				'<code>composer install --no-dev &amp;&amp; yarn install --frozen-lockfile &amp;&amp; yarn run build</code>'
			)
		);
		break;
	}
}
/**
 * Adds notice bootstraping errors.
 *
 * @internal
 * @global WP_Error $_neve_bootstrap_errors
 */
function _neve_bootstrap_errors() {
	global $_neve_bootstrap_errors;
	printf( '<div class="notice notice-error"><p>%1$s</p></div>', $_neve_bootstrap_errors->get_error_message() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

if ( $_neve_bootstrap_errors->has_errors() ) {
	/**
	 * Add notice for PHP upgrade.
	 */
	add_filter( 'template_include', '__return_null', 99 );
	switch_theme( WP_DEFAULT_THEME );
	unset( $_GET['activated'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	add_action( 'admin_notices', '_neve_bootstrap_errors' );

	return;
}

/**
 * Themeisle SDK filter.
 *
 * @param array $products products array.
 *
 * @return array
 */
function neve_filter_sdk( $products ) {
	$products[] = get_template_directory() . '/style.css';

	return $products;
}

add_filter( 'themeisle_sdk_products', 'neve_filter_sdk' );
add_filter(
	'themeisle_sdk_compatibilities/' . NEVE_BASENAME,
	function ( $compatibilities ) {

		$compatibilities['NevePro'] = [
			'basefile'  => defined( 'NEVE_PRO_BASEFILE' ) ? NEVE_PRO_BASEFILE : '',
			'required'  => '2.9',
			'tested_up' => '3.0',
		];

		return $compatibilities;
	}
);
require_once 'globals/migrations.php';
require_once 'globals/utilities.php';
require_once 'globals/hooks.php';
require_once 'globals/sanitize-functions.php';
require_once get_template_directory() . '/start.php';

/**
 * If the new widget editor is available,
 * we re-assign the widgets to hfg_footer
 */
if ( neve_is_new_widget_editor() ) {
	/**
	 * Re-assign the widgets to hfg_footer
	 *
	 * @param array  $section_args The section arguments.
	 * @param string $section_id The section ID.
	 * @param string $sidebar_id The sidebar ID.
	 *
	 * @return mixed
	 */
	function neve_customizer_custom_widget_areas( $section_args, $section_id, $sidebar_id ) {
		if ( strpos( $section_id, 'widgets-footer' ) ) {
			$section_args['panel'] = 'hfg_footer';
		}

		return $section_args;
	}

	add_filter( 'customizer_widgets_section_args', 'neve_customizer_custom_widget_areas', 10, 3 );
}

require_once get_template_directory() . '/header-footer-grid/loader.php';

add_filter(
	'neve_welcome_metadata',
	function() {
		return [
			'is_enabled' => ! defined( 'NEVE_PRO_VERSION' ),
			'pro_name'   => 'Neve Pro Addon',
			'logo'       => get_template_directory_uri() . '/assets/img/dashboard/logo.svg',
			'cta_link'   => tsdk_translate_link( tsdk_utmify( 'https://themeisle.com/themes/neve/upgrade/?discount=LOYALUSER582&dvalue=50', 'neve-welcome', 'notice' ), 'query' ),
		];
	}
);

add_filter( 'themeisle_sdk_enable_telemetry', '__return_true' );

/**
 * Enqueue AskStephen.ai custom styles and scripts
 */
function askstephen_enqueue_assets() {
	// Enqueue Tailwind CSS
	wp_enqueue_style(
		'tailwind-css',
		'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
		array(),
		'2.2.19'
	);

	// Enqueue AOS (Animate On Scroll) library
	wp_enqueue_style(
		'aos-css',
		'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
		array(),
		'2.3.4'
	);

	// Enqueue custom CSS
	wp_enqueue_style(
		'askstephen-global-css',
		get_template_directory_uri() . '/assets/css/askstephen-global.css',
		array( 'tailwind-css', 'aos-css' ),
		'1.2.0'
	);

	// Enqueue dark mode toggle script
	wp_enqueue_script(
		'askstephen-toggle-theme',
		get_template_directory_uri() . '/assets/js/toggletheme.js',
		array(),
		'1.0.0',
		true
	);

	// Enqueue AOS JavaScript
	wp_enqueue_script(
		'aos-js',
		'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js',
		array(),
		'2.3.4',
		true
	);

	// Enqueue micro-animations script
	wp_enqueue_script(
		'askstephen-animations',
		get_template_directory_uri() . '/assets/js/animations.js',
		array( 'aos-js' ),
		'1.0.0',
		true
	);

	// Enqueue Font Awesome for icons
	wp_enqueue_script(
		'font-awesome-kit',
		'https://kit.fontawesome.com/a076d05399.js',
		array(),
		'6.0.0',
		false
	);
}

add_action( 'wp_enqueue_scripts', 'askstephen_enqueue_assets' );

/**
 * Add custom branded footer section before Neve footer
 */
function askstephen_custom_footer_branding() {
    ?>
    <div style="background: #0f1829; padding: 50px 24px 30px; color: rgba(255,255,255,0.8);">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 40px;">
            <div style="display: flex; flex-wrap: wrap; gap: 60px; justify-content: space-between; align-items: flex-start;">
                <!-- Brand Column -->
                <div style="max-width: 300px;">
                    <img src="https://askstephen.ai/wp-content/uploads/2026/01/finalaskstephenailogo.png" alt="AskStephen.ai" style="max-width: 160px; margin-bottom: 12px; display: block;">
                    <img src="https://askstephen.ai/wp-content/uploads/2026/01/pick-one-logo.jpg" alt="Pick One Strategy" style="max-width: 130px; margin-bottom: 16px; display: block; border-radius: 8px;">
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.4rem; font-weight: 700; color: #fff; margin-bottom: 10px;">Pick One Strategy</p>
                    <p style="color: #e8c547; margin-bottom: 8px;">More Peace. More Profit.</p>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">All you need to do is Ask Stephen and Pick One Strategy.</p>
                </div>

                <!-- Products Column -->
                <div>
                    <p style="color: #fff; font-weight: 700; margin-bottom: 16px; font-size: 1rem;">Products</p>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 10px;"><a href="https://askstephen.ai/shop" style="color: rgba(255,255,255,0.6); text-decoration: none;">Book &amp; Workbook</a></li>
                        <li style="margin-bottom: 10px;"><a href="/lp-course/" style="color: rgba(255,255,255,0.6); text-decoration: none;">Pick One Course</a></li>
                        <li style="margin-bottom: 10px;"><a href="/lp-consulting/" style="color: rgba(255,255,255,0.6); text-decoration: none;">Intro Consulting</a></li>
                        <li style="margin-bottom: 10px;"><a href="https://askstephen.ai/mastermind/" style="color: rgba(255,255,255,0.6); text-decoration: none;">Mastermind</a></li>
                    </ul>
                </div>

                <!-- Legal Column -->
                <div>
                    <p style="color: #fff; font-weight: 700; margin-bottom: 16px; font-size: 1rem;">Legal</p>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 10px;"><a href="https://askstephen.ai/privacy/" style="color: rgba(255,255,255,0.6); text-decoration: none;">Privacy Policy</a></li>
                        <li style="margin-bottom: 10px;"><a href="https://askstephen.ai/terms/" style="color: rgba(255,255,255,0.6); text-decoration: none;">Terms &amp; Conditions</a></li>
                        <li style="margin-bottom: 10px;"><a href="https://askstephen.ai/refund" style="color: rgba(255,255,255,0.6); text-decoration: none;">Refund Policy</a></li>
                        <li style="margin-bottom: 10px;"><a href="https://askstephen.ai/contact" style="color: rgba(255,255,255,0.6); text-decoration: none;">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Newsletter Column -->
                <div style="max-width: 280px;">
                    <p style="color: #fff; font-weight: 700; margin-bottom: 16px; font-size: 1rem;">Stay Connected</p>
                    <p style="color: rgba(255,255,255,0.6); margin-bottom: 16px; font-size: 0.9rem;">Get weekly insights on business clarity.</p>
                    <form action="https://askstephen.ai/newsletter/" method="POST" style="display: flex; gap: 8px;">
                        <input type="email" name="email" placeholder="Your email" required style="flex: 1; padding: 10px 14px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; background: rgba(255,255,255,0.05); color: #fff; font-size: 0.9rem;">
                        <button type="submit" style="padding: 10px 16px; background: #c9a227; color: #1a2744; border: none; border-radius: 4px; font-weight: 700; cursor: pointer;">Join</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div style="max-width: 1200px; margin: 40px auto 0; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; font-size: 0.85rem; color: rgba(255,255,255,0.5);">
            <p>&copy; 2026 Pick One Strategy. All rights reserved.</p>
            <p>Questions? Email <a href="mailto:hello@askstephen.ai" style="color: #e8c547; text-decoration: none;">hello@askstephen.ai</a></p>
        </div>
    </div>
    <?php
}
add_action( 'neve_before_footer_hook', 'askstephen_custom_footer_branding' );
