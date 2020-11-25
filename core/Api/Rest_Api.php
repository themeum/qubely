<?php
/**
 * Handles all API related stuff
 * 
 * @package Qubely
 */

namespace Qubely\Api;

use Qubely\Utils\Utils;
use Qubely\Api\Callbacks;

defined( 'ABSPATH' ) || exit;

/**
 * Api class
 */
class Rest_Api {

	/**
	 * Public callbacks
	 *
	 * @var [type]
	 */
	public $callbacks;

    /**
     * Register
     */
    public function register() {
		add_action( 'init', array( $this, 'init_callbacks' ) );
        add_action( 'rest_api_init', array( $this, 'register_api_hook' ) );
	}
	
	/**
	 * Init callbacks
	 */
	public function init_callbacks() {
		$this->callbacks = new Callbacks();
	}

    /**
	 * @since 1.0.0-BETA
	 * qubely api routes
	 */
	public function register_api_hook() {

        $post_type = Utils::get_post_types();

        foreach ( $post_type as $key => $value ) {
     
             // Featured image.
             register_rest_field(
                 $value['value'],
                 'qubely_featured_image_url',
                 array(
                     'get_callback'    => array( $this->callbacks, 'get_featured_image_url' ),
                     'update_callback' => null,
                     'schema'          => array(
                         'description' => __('Different sized featured images'),
                         'type' => 'array',
                     ),
                 )
             );
             // Author info.
             register_rest_field(
                 $value['value'],
                 'qubely_author',
                 array(
                     'get_callback'    => array( $this->callbacks, 'get_author_info' ),
                     'update_callback' => null,
                     'schema'          => null,
                 )
             );
     
             // Add comment info.
             register_rest_field(
                 $value['value'],
                 'qubely_comment',
                 array(
                     'get_callback'    => array( $this->callbacks, 'get_comment_info' ),
                     'update_callback' => null,
                     'schema'          => null,
                 )
             );
     
             // Category links.
             register_rest_field(
                 $value['value'],
                 'qubely_category',
                 array(
                     'get_callback'    => array( $this->callbacks, 'get_category_list' ),
                     'update_callback' => null,
                     'schema'          => array(
                         'description' => __('Category list links'),
                         'type'        => 'string',
                     ),
                 )
             );
     
             // Excerpt.
             register_rest_field(
                 $value['value'],
                 'qubely_excerpt',
                 array(
                     'get_callback'    => array( $this->callbacks, 'get_excerpt' ),
                     'update_callback' => null,
                     'schema'          => null,
                 )
             );
        }
     
		// For updating global options.
		register_rest_route(
			'qubely/v1',
			'/global_settings/',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this->callbacks, 'get_global_option' ),
					'permission_callback' => function () {
						return true;
					},
					'args'                => array(),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this->callbacks, 'update_global_option' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
		// For css file save
		register_rest_route(
			'qubely/v1',
			'/save_block_css/',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this->callbacks, 'save_block_css' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
		// Get the Content by ID
		register_rest_route(
			'qubely/v1',
			'/qubely_get_content/',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this->callbacks, 'qubely_get_content' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
		// Append Qubely CSS
		register_rest_route(
			'qubely/v1',
			'/append_qubely_css/',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this->callbacks, 'append_qubely_css_callback' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
        // Get qubely options.
		register_rest_route(
			'qubely/v1',
			'/get_qubely_options',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this->callbacks, 'get_qubely_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
        // Add qubely options
		register_rest_route(
			'qubely/v1',
			'/add_qubely_options',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this->callbacks, 'add_qubely_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
    }
}