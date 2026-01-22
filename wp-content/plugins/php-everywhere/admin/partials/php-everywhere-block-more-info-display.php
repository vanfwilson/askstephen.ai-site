<?php

/**
 * Provide a more info area view for the block
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
    <h1>PHP Everywhere Block</h1>
    <h2><?php _e('FAQ'); ?></h2>
    <h3><?php _e('Why can\'t I save a page / post that contains the block?'); ?></h3>
    <p><?php _e('You must have permissions to edit posts and pages that contain the PHP Everywhere block. Ask your administrator to grant you the required permissions or edit the page containing the block on their own. You can remove the block at any time to restore the ability to edit the post or page.'); ?></p>
</div>