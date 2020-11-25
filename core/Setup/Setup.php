<?php
/**
 * Handles initial plugin setup
 * 
 * @package Qubely
 */

namespace Qubely\Setup;

use Qubely\Utils\Utils;

defined( 'ABSPATH' ) || exit;

/**
 * Setup class
 */
class Setup {

    /**
     * Protected $option_keyword
     *
     * @var string
     */
	protected $option_keyword = 'qubely_global_options';

    /**
     * Register
     */
    public function register() {
        $this->add_global_settings_post_meta();
        // dynamic blocks.
        add_action( 'init', array( $this, 'init_dynamic_blocks' ) );
        add_action( 'init', array( $this, 'qubely_resigter_rest_order_by_fields' ) );
        // qubely admin class
		add_filter( 'body_class', array( $this, 'add_custom_class' ) );
		add_filter( 'admin_body_class', array( $this, 'qubely_editor_bodyclass' ) );
        add_action( 'qubely_active_theme_preset', array( $this, 'active_theme_preset' ) );
        add_action( 'after_setup_theme', array( $this, 'qubely_blog_posts_image_sizes' ) );
        // Block Categories.
        add_filter( 'block_categories', array( $this, 'qubely_block_categories' ), 1, 2 );
        
    }

    /**
     * Order by 
     */
    public function qubely_resigter_rest_order_by_fields() {
        $post_types = Utils::get_post_types();

        foreach ( $post_types as $key => $type ) {
            add_filter( "rest_{$type['value']}_collection_params", 'qubely_blocks_add_orderby', 10, 1 );
        }
    }

    /**
     * Image size
     *
     * @return void
     */
    public function qubely_blog_posts_image_sizes() {
        add_image_size( 'qubely_landscape', 1200, 750, true );
        add_image_size( 'qubely_portrait', 540, 320, true );
        add_image_size( 'qubely_thumbnail', 140, 100, true );
    }

    /**
	 * Theme preset activation hook
	 */
	public function active_theme_preset() {
		$settings               = json_decode( get_option( $this->option_keyword ) );
		$settings->activePreset = 'theme';
		$settings               = json_encode( $settings );
		update_option( $this->option_keyword, $settings );
    }
    
    /**
	 * Create preview CSS
	 */
	public function create_preview_css() {
		
		global $wp_filesystem;
		if ( ! $wp_filesystem ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		$upload_dir   = wp_upload_dir();
		WP_Filesystem( false, $upload_dir['basedir'], true );
		$dir          = trailingslashit( $upload_dir['basedir'] ) . 'qubely/';
		$filename     = 'qubely-preview.css';
		$jsonfilename = 'qubely-preview.json';

		if ( !$wp_filesystem->is_dir( $dir ) ) {
			$wp_filesystem->mkdir( $dir );
		}

		if ( ! file_exists( $dir . $filename ) ) {
			if ( ! $wp_filesystem->put_contents( $dir . $filename, '' ) ) {
				throw new Exception( __( 'Prevriew CSS can not be saved due to permission!!!', 'qubely' ) );
			}
		}
		if ( ! file_exists( $dir . $jsonfilename ) ) {
			if ( ! $wp_filesystem->put_contents( $dir . $jsonfilename, '{}' ) ) {
				throw new Exception( __( 'Preview JSON can not be saved due to permission!!!', 'qubely' ) );
			}
		}
	}
	
	/**
	 * Init dynamic blocks frontend
	 */
	public function init_dynamic_blocks() {
		require_once QUBELY_DIR_PATH . 'core/blocks/postgrid.php';
		$this->create_preview_css();
   }

   	/**
     * Add post meta
     * 
	 * @since 1.0.0-BETA
	 */
	public function add_global_settings_post_meta() {
		register_meta(
			'post',
			'qubely_global_settings',
			array(
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			)
		);

		// @since 1.2.0
		register_meta(
			'post',
			'qubely_interactions',
			array(
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			)
		);
    }
    
    /**
	 * Block Category Add
	 *
	 * @since 1.0.0
	 */
	public function qubely_block_categories( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'qubely',
					'title' => __( 'Qubely', 'qubely' ),
				),
			),
			$categories
		);
    }
    
    /**
     * Editor body class
     *
     * @param [type] $classes
     * 
     * @return string
     */
	public function qubely_editor_bodyclass( $classes ) {

		$current_screen = get_current_screen();

		if ( 'post' === $current_screen->base ) {
			$classes .= 'qubely qubely-editor';
		}
		return $classes;
	}

    /**
     * Add custom class
     *
     * @param [type] $classes
     * 
     * @return array
     */
	public function add_custom_class( $classes ) {
		return array_merge( $classes, array( 'qubely qubely-frontend' ) );
	}
}
