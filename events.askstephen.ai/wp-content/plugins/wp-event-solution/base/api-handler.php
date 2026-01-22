<?php
namespace Etn\Base;

class Api_Handler {

    public $prefix  = '';
    public $param   = '';
    public $args    = [];
    public $request = null;

    /**
     * constructor function for the class
     * 
     * @return void
     */
    public function __construct() {
        $this->config();
        $this->init();
    }

    /**
     * config can be override by child class
     * 
     * @return void
     */
    public function config() {

    }

    /**
     * rest api pattern buildup process
     * 
     * @return void
     */
    public function init() {
        add_action( 'rest_api_init', function () {
            register_rest_route( untrailingslashit( 'eventin/v1/' . $this->prefix ), '/(?P<action>\w+)/' . ltrim( $this->param, '/' ), [
                'methods'             => \WP_REST_Server::ALLMETHODS,
                'callback'            => [$this, 'callback'],
                'permission_callback' => [ $this, 'permision_check' ],
                // all permissions are implemented inside the callback action
            ] );
        } );
    }

    /**
     * callback function after api endpoint fired
     * 
     * @return void
     */
    public function callback( $request ) {
        $this->request = $request;

        $action_class = strtolower( $this->request->get_method() ) . '_' . $this->request['action'];

        if ( method_exists( $this, $action_class ) ) {
            return $this->{$action_class}();
        }

    }

    /**
     * Get permission check
     *
     * @return  bool
     */
    public function permision_check($request) {
        // Verify nonce for all API requests
        $nonce = $request->get_header( 'X-WP-Nonce' );

        if ( empty( $nonce ) ) {
            return false;
        }

        // For administrative actions, also require manage_options capability
        $admin_actions = ['settings'];
        $action = $this->request['action'] ?? '';

        if ( in_array( $action, $admin_actions ) ) {
            return current_user_can( 'manage_options' ) && wp_verify_nonce( $nonce, 'wp_rest' );
        }

        // Verify the nonce
        if ( wp_verify_nonce( $nonce, 'wp_rest' ) ) {
            return true;
        }

        // Nonce is valid - allow access
        return false;
    }

}
