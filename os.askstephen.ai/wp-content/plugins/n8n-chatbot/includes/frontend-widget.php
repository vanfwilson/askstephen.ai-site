<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function chatics_render_widget() {
   if ( ! get_option( 'chatics_enabled' ) ) return;

    // Day check
    $allowed_days = get_option( 'chatics_allowed_days', [] );
    $current_day = current_time( 'l' ); // Full day name: Monday, Tuesday...
    // If no days are set, default to all days
    if ( empty( $allowed_days ) ) {
        $allowed_days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    }
    if ( ! in_array( $current_day, $allowed_days, true ) ) return;
    

    // Time check
    
    $start = wp_date( 'H:i', strtotime( get_option( 'chatics_start_time', '00:00' ) ) );
    $end   = wp_date( 'H:i', strtotime( get_option( 'chatics_end_time', '23:00' ) ) );
    $now   = current_time( 'H:i' );

 
    // if ( $now < $start || $now > $end ) return;

    $url       = esc_url( get_option( 'chatics_url', '' ) );
    $title     = esc_html( get_option( 'chatics_title', __( 'Chat with us', 'chatics' ) ) );
    $button_title     = esc_html( get_option( 'chatics_icon_text', __( 'Chat', 'chatics' ) ) );
    $position  = esc_attr( get_option( 'chatics_position', 'right' ) );
    $color     = esc_attr( get_option( 'chatics_color', '#00b894' ) );
    $zoom      = absint( get_option( 'chatics_zoom', 100 ) );
    $icon_url  = esc_url( get_option( 'chatics_icon_url', '' ) );
    $header_enabled = get_option( 'chatics_header_enabled', true );

    if ( empty( $url ) ) return;

    wp_enqueue_style( 'chatics-frontend', CHATICS_URL . 'assets/css/frontend.css', [], CHATICS_VERSION );
    wp_enqueue_script( 'chatics-frontend', CHATICS_URL . 'assets/js/frontend.js', [], CHATICS_VERSION, true );

    ?>
    <div id="chatics-widget" class="chatics-position-<?php echo esc_attr( $position ); ?>">
        <button id="chatics-toggle" style="background-color: <?php echo esc_attr($color); ?>;">
         <?php if ( $icon_url ) : ?>
            <img src="<?php echo esc_url($icon_url); ?>" alt="chat icon" style="width:24px;height:24px;">
        <?php else : ?>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 544C461.4 544 576 436.5 576 304C576 171.5 461.4 64 320 64C178.6 64 64 171.5 64 304C64 358.3 83.2 408.3 115.6 448.5L66.8 540.8C62 549.8 63.5 560.8 70.4 568.3C77.3 575.8 88.2 578.1 97.5 574.1L215.9 523.4C247.7 536.6 282.9 544 320 544zM192 272C209.7 272 224 286.3 224 304C224 321.7 209.7 336 192 336C174.3 336 160 321.7 160 304C160 286.3 174.3 272 192 272zM320 272C337.7 272 352 286.3 352 304C352 321.7 337.7 336 320 336C302.3 336 288 321.7 288 304C288 286.3 302.3 272 320 272zM416 304C416 286.3 430.3 272 448 272C465.7 272 480 286.3 480 304C480 321.7 465.7 336 448 336C430.3 336 416 321.7 416 304z"/></svg>
        <?php endif; ?>

              <span><?php echo esc_html($button_title); ?></span>
        </button>
        
        <!-- Dark overlay for fullscreen -->
        <div id="chatics-overlay"></div>
        
       <div id="chatics-frame-wrapper" style="display:none;">
            <?php if ( $header_enabled ) : ?>
            <div id="chatics-header" style="background-color: <?php echo esc_attr($color); ?>;">
                <span><?php echo esc_html($title); ?></span>
                <div class="chatics-header-buttons">
                    <button id="chatics-fullscreen" title="Full Screen">⛶</button>
                    <button id="chatics-close">&times;</button>
                </div>
            </div>
            <?php endif; ?>
            <iframe src="<?php echo esc_url($url); ?>" style="zoom: <?php echo esc_attr($zoom); ?>%;"></iframe>
        </div>

    </div>
    <?php
}
add_action( 'wp_footer', 'chatics_render_widget' );
