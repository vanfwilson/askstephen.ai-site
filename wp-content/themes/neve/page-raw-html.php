<?php
/**
 * Template Name: Raw HTML Content
 * Description: Display page content as raw HTML without wpautop filter
 *
 * @package Neve
 */

get_header();
?>

<div class="neve-main">
	<?php do_action( 'neve_before_content', 'single-page' ); ?>

	<div class="neve-content-wrap nv-content-wrap entry-content">
		<?php
		// Display content without wpautop filter but process blocks and shortcodes
		if ( have_posts() ) {
			while ( have_posts() ) {
				the_post();
				$content = get_post()->post_content;
				// Process block content FIRST (renders shortcode blocks)
				$content = do_blocks( $content );
				// Then process any shortcodes
				$content = do_shortcode( $content );
				echo $content;
			}
		}
		?>
	</div>

	<?php do_action( 'neve_after_content', 'single-page' ); ?>
</div>

<?php get_footer(); ?>
