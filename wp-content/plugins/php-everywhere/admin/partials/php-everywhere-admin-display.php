<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://www.alexander-fuchs.net
 * @since      3.0.0
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/admin/partials
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}
?>

<div class="wrap">
<h1>PHP Everywhere</h1>
<p><?php echo sprintf( __('Thanks for using PHP Everywhere. If you have any questions, feel free to ask <a href="%s">me</a>.<br />I created this plugin because I have not found a Wordpress PHP plugin which is simple to use and provides a good user experience while being able to use PHP or HTML in Posts, Pages or Widgets.'), 'https://www.alexander-fuchs.net/contact/'); ?></p>
<h2><?php _e('Support this plugin, if you enjoy using it 😄☕'); ?></h2>
<p><?php echo sprintf( __('I always appreciate to hear from people who like my work. Feel free to contact me or buy me a cup of <a href="%s" target="_blank">buy me a cup of coffee (Donate)</a>.'), "https://www.alexander-fuchs.net/donate/"); ?></p>
<h2><?php _e('Need helping setting up this plugin?'); ?></h2>
<p><?php echo sprintf( __('I offer custom development and WordPress customizations at affordable rates. Feel free to <a href="%s">contact me</a> if you need any help.'), "https://www.alexander-fuchs.net/contact/"); ?></p>
<h1><?php _e('Settings')?></h1>
<form method="post" name="php_everywhere_settings">
<input type="hidden" name="php_everywhere_settings" value=""/>
<fieldset>
<p><b><?php _e('Who is allowed to use the PHP Everywhere block?')?></b></p>
<?php
    global $wp_roles;

    $all_roles = $wp_roles->roles;
    $editable_roles = apply_filters('editable_roles', $all_roles);
    $filtered_roles = array_filter($editable_roles, function($role) {
        return $role !== 'subscriber';
    }, ARRAY_FILTER_USE_KEY);
    $allowedRoles = get_option('php_everywhere_permitted_roles', ['administrator']);
    foreach ($filtered_roles as $roleKey => $role) {
        $is_checked = in_array($roleKey, $allowedRoles) ? 'checked' : '';
        $is_disabled = ($roleKey === 'administrator') ? 'disabled' : '';
        ?>
        <input type="checkbox" id="option-<?php echo $roleKey; ?>" name="php_everywhere_permitted_roles[]" value="<?php echo $roleKey; ?>" <?php echo $is_checked;?> <?php echo $is_disabled; ?>>
        <label for="option-<?php echo $roleKey; ?>"> <?php echo $role['name']; ?></label><br>
        <?php
    }
?>
<input type="hidden" name="php_everywhere_permitted_roles[]" value="administrator">
</fieldset>
<?php wp_nonce_field( 'update_php_everywhere_settings', 'update_php_everywhere_settings_nonce' ); ?>
<?php submit_button(); ?>
</form>
<h1><?php _e('Upgrade from < 3.0.0')?></h1>
<p><?php _e('Part of software development is deprecating old functions of the software. In version 3.0.0 of this plugin the shortcode and widget functions of this plugin were deprecated (because of serious vulnerabilities in the way they operate). You need to migrate your usecases for them to the provided Gutenberg block.')?></p>
<p><?php _e('The following upgrade wizard will help you to track down all occurences of deprecated features and migrate them to Gutenberg blocks.')?></p>
<form method="get" action="<?php echo get_admin_url(); ?>options-general.php">
<input type="hidden" name="page" value="php-everywhere-upgrade"/>
<?php submit_button( __('Start Upgrade') ); ?>
</form>
<h1><?php _e('Usage')?></h1>
<h3><?php _e('Widgets, Posts & Pages')?></h3>
<p><?php _e('Simply activate the <pre>PHP Everywhere</pre> block & paste your PHP code including the PHP tags like this:
<pre>&lt;?php  echo("Hello, World!"); ?&gt;</pre>
You code may contain HTML elements or have multiple lines.')?></p>
<h4><?php _e('Multiple PHP instances')?></h4>
<p><?php _e('You can have multiple PHP instances by placing multiple PHP Everywhere blocks in your editor')?></p>
<h1><?php _e('Changelog')?></h1>
<p><?php _e('Go to <a href="http://www.alexander-fuchs.net/php-everywhere/" target="_blank">http://www.alexander-fuchs.net/php-everywhere/</a> to view the changelog and more.')?></p>
<h1><?php _e('Like this plugin? Support me :)')?></h1>
<h3><?php _e('On social media')?></h3>
<ul>
<li><a href="https://www.alexander-fuchs.net" target="_blank">alexander-fuchs.net</a></li>
<li><a href="https://www.linkedin.com/in/alexander-fuchs-38b932a1/" target="_blank">LinkedIn</a></li>
</ul>
<h3><?php _e('Donate to this plugin')?></h3>
<p>
<?php echo sprintf( __('I maintain this plugin in my limited free time. I appreciate if you <a href="%s" target="_blank">buy me a coffee (Donate)</a>. :)'), "https://www.alexander-fuchs.net/donate/"); ?></p>
</div>
