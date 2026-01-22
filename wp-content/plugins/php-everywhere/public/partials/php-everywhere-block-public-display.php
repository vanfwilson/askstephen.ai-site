<?php

/**
 * Provide a public-facing view for the php everywhere block
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://www.alexander-fuchs.net
 * @since      3.0.0
 *
 * @package    Php_Everywhere
 * @subpackage Php_Everywhere/public/partials
 */

/**
 * Manages the rendering of the php everywhere block frontend
 *
 * @since    3.0.0
 */
	
//don't give any output in backend
if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
    return '';
}
else{
    if(is_admin()) {
        return '';
    }
}

eval(' ?>'.urldecode(base64_decode($attributes['code'])).'<?php ');
?>