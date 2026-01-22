<?php
namespace Eventin\Blocks\BlockTypes;

use Etn\Core\Event\Event_Model;
use Eventin\Blocks\BlockTypes\AbstractBlock;
use Wpeventin;

/**
 * Event Venue Gutenberg block
 */
class RecurringEvent extends AbstractBlock {
    /**
     * Block name.
     *
     * @var string
     */
    protected $block_name = 'recurring-event';

    /**
     * Include and render the block
     *
     * @param   array  $attributes  Block attributes. Default empty array
     * @param   string  $content     Block content. Default empty string
     * @param   WP_Block  $block       Block instance
     *
     * @return  string Rendered block type output
     */
    protected function render( $attributes, $content, $block ) {
        $container_class = ! empty( $attributes['containerClassName'] ) ? $attributes['containerClassName'] : '';
        $styles = ! empty( $attributes['styles'] ) ? $attributes['styles'] : [];

        if ( $this->is_editor() ) {
            $event_id = ! empty( $attributes['eventId'] ) ? intval( $attributes['eventId'] ) : 0;
        } else if ( 'etn-template' == get_post_type( get_the_ID() ) ) {
            $template = new \Eventin\Template\TemplateModel( get_the_ID() );
            $event_id = $template->get_preview_event_id();
        } else {
            $event_id = get_the_ID();
        }

        $event = new Event_Model( $event_id );

        ob_start();


        ?>
        <?php echo $this->render_frontend_css( $styles, esc_attr( $container_class ) ); ?>
        <?php
        require_once Wpeventin::templates_dir() . 'event/parts/recurring-event.php';
        ?>

        <?php
        
        $data = ob_get_clean();
        
        return $data;
    }
}

