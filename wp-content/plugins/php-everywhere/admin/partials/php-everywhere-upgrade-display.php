<?php

/**
 * Provide a upgrade wizard view for the plugin
 *
 *
 * @link       http://www.alexander-fuchs.net
 * @since      3.0.0
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/admin/partials
 */

// based on original work from the PHP Laravel framework
if (!function_exists('str_contains')) {
    function str_contains($haystack, $needle) {
        return $needle !== '' && mb_strpos($haystack, $needle) !== false;
    }
}

if ( ! defined( 'WPINC' ) ) {
    die;
}
?>

<div class="wrap">
    <h1><?php _e('PHP Everywhere Upgrade'); ?></h1>
    <p><?php _e('This setup wizard will help you to upgrade from a previous version of PHP Everywhere. You will need to replace all widgets and shortcodes with Gutenberg blocks. Use the list below to help you find all affected resources. You can jump directly to the posts pages your PHP code should be at and insert the code into a new block.'); ?></p>
    <h2><?php _e('Posts'); ?></h2>
    <?php
        $all_posts = get_posts( array(
            'numberposts' => -1
        ) );
        $filterd_posts = array_filter($all_posts, function($post) {
            return str_contains( $post->post_content, "[php_everywhere]" );
        });
        if( count($filterd_posts) === 0) {
            ?>
                <p><?php _e("You are all caught up 🎉 Nothing left to do"); ?></p>
            <?php
        } else {
        ?>
        <table class="wp-list-table widefat">
                <thead>
                    <tr>
                        <th scope="col" id="title" class="manage-column column-name column-primary"><?php _e('Title'); ?></th>
                        <th scope="col" id="post_status" class="manage-column column-description"><?php _e('Status'); ?></th>
                        <th scope="col" id="php" class="manage-column column-auto-updates"><?php _e('PHP Code'); ?></th>
                    </tr>
                </thead>
                <tbody id="the-list">
                    <?php
                        foreach ( $filterd_posts as $post ) {
                            ?>
                                <tr>
                                    <td>
                                        <?php echo $post->post_title ?><br><br>
                                        <a href="<?php echo $post->guid; ?>" target="_blank"><?php _e("View"); ?></a>&nbsp;|&nbsp;
                                        <a href="<?php echo get_admin_url(); ?>post.php?post=<?php echo $post->ID ?>&action=edit" target="_blank"><?php _e("Edit"); ?></a>
                                    </td>
                                    <td>
                                        <?php echo $post->post_status ?>
                                    </td>
                                    <td>
                                        <?php echo get_post_meta($post->ID, 'php_everywhere_code', true); ?>
                                    </td>
                                </tr>
                            <?php
                        }
                        ?>
                </tbody>
                    <tfoot>
                        <tr>
                            <th scope="col" id="title" class="manage-column column-name column-primary"><?php _e('Title'); ?></th>
                            <th scope="col" id="post_status" class="manage-column column-description"><?php _e('Status'); ?></th>
                            <th scope="col" id="php" class="manage-column column-auto-updates"><?php _e('PHP Code'); ?></th>
                        </tr>
                    </tfoot>
                </table>
            <?php
        }
    ?>
    <h2><?php _e('Pages'); ?></h2>
    <?php
        $all_pages = get_pages( array(
            'numberposts' => -1
        ) );
        $filterd_pages = array_filter($all_pages, function($post) {
            return str_contains( $post->post_content, "[php_everywhere]" );
        });
        if( count($filterd_pages) === 0) {
            ?>
                <p><?php _e("You are all caught up 🎉 Nothing left to do"); ?></p>
            <?php
        } else {
        ?>
        <table class="wp-list-table widefat">
                <thead>
                    <tr>
                        <th scope="col" id="title" class="manage-column column-name column-primary"><?php _e('Title'); ?></th>
                        <th scope="col" id="post_status" class="manage-column column-description"><?php _e('Status'); ?></th>
                        <th scope="col" id="php" class="manage-column column-auto-updates"><?php _e('PHP Code'); ?></th>
                    </tr>
                </thead>
                <tbody id="the-list">
                    <?php
                        foreach ( $filterd_pages as $post ) {
                            ?>
                                <tr>
                                    <td>
                                        <?php echo $post->post_title ?><br><br>
                                        <a href="<?php echo $post->guid; ?>" target="_blank"><?php _e("View"); ?></a>&nbsp;|&nbsp;
                                        <a href="<?php echo get_admin_url(); ?>post.php?post=<?php echo $post->ID ?>&action=edit" target="_blank"><?php _e("Edit"); ?></a>
                                    </td>
                                    <td>
                                        <?php echo $post->post_status ?>
                                    </td>
                                    <td>
                                        <?php echo get_post_meta($post->ID, 'php_everywhere_code', true); ?>
                                    </td>
                                </tr>
                            <?php
                        }
                        ?>
                </tbody>
                    <tfoot>
                        <tr>
                            <th scope="col" id="title" class="manage-column column-name column-primary"><?php _e('Title'); ?></th>
                            <th scope="col" id="post_status" class="manage-column column-description"><?php _e('Status'); ?></th>
                            <th scope="col" id="php" class="manage-column column-auto-updates"><?php _e('PHP Code'); ?></th>
                        </tr>
                    </tfoot>
                </table>
                <?php
            }
        ?>
    <h2><?php _e('Widgets'); ?></h2>
    <?php
        $widgets = get_option( 'widget_phpeverywherewidget', '');
        if($widgets === '') {
            ?>
                <p><?php _e("You are all caught up 🎉 Nothing left to do"); ?></p>
            <?php
        } else {
        ?>
        <table class="wp-list-table widefat">
            <thead>
                <tr>
                    <th scope="col" id="title" class="manage-column column-name column-primary"><?php _e('Title'); ?></th>
                    <th scope="col" id="php" class="manage-column column-auto-updates"><?php _e('PHP Code'); ?></th>
                </tr>
            </thead>
            <tbody id="the-list">
                <?php
                    foreach ( $widgets as $widget ) {
                        if( !is_array($widget) ) {
                            continue;
                        }
                        ?>
                            <tr>
                                <td>
                                    <?php echo $widget['title'] ?>
                                </td>
                                <td>
                                    <?php echo $widget['content'] ?>
                                </td>
                            </tr>
                        <?php
                    }
            ?>
            </tbody>
                <tfoot>
                    <tr>
                        <th scope="col" id="title" class="manage-column column-name column-primary"><?php _e('Title'); ?></th>
                        <th scope="col" id="php" class="manage-column column-auto-updates"><?php _e('PHP Code'); ?></th>
                    </tr>
                </tfoot>
            </table>
            <?php
        }
    ?>
    <p><?php _e('You can come back to this page any time by navigating to the upgrade section of this plugin\'s settings page'); ?></p>
</div>