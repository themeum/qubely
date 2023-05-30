<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class QUBELY_MAIN {


	protected $api_base_url = 'https://qubely.io/wp-json/restapi/v2/';
	protected $qubely_api_request_body;
	protected $qubely_api_request_body_default;

	protected $option_keyword = 'qubely_global_options';

	/**
	 * QUBELY constructor
	 */
	public function __construct() {
		 $this->qubely_api_request_body_default = array(
			 'request_from' => 'qubely',
			// 'request_qubely_version'  => QUBELY_VERSION,
		 );
		 $this->qubely_api_request_body = apply_filters( 'qubely_api_request_body', array() );

		 // Editor Load
		 add_action( 'enqueue_block_editor_assets', array( $this, 'qubely_editor_assets' ) );

		 // Editor Load
		 add_action( 'admin_enqueue_scripts', array( $this, 'qubely_admin_assets' ) );

		 // Block Categories
		 if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
			 add_filter( 'block_categories_all', array( $this, 'qubely_block_categories' ), 1, 2 );
		 } else {
			add_filter( 'block_categories', array( $this, 'qubely_block_categories' ), 1, 2 );
		 }

		 // Add Styles and Scripts
		 add_action( 'wp_enqueue_scripts', array( $this, 'qubely_enqueue_style' ) );

		 add_action( 'wp_enqueue_scripts', array( $this, 'qubely_enqueue_scripts' ) );

		 // Load Inline Scripts
		 add_action( 'admin_head', array( $this, 'qubely_inline_admin_header_scripts' ), 0 );
		 add_action( 'wp_footer', array( $this, 'qubely_inline_footer_scripts' ) );

		 // Add post meta key
		 $this->add_global_settings_post_meta();

		 // Common style

		 $this->enqueue_block_css();

		 add_action( 'rest_api_init', array( $this, 'register_api_hook' ) );
		 add_action( 'delete_post', array( $this, 'before_delete_post' ), 10 );

		 // Get layout and block from Server and Cache
		 add_action( 'wp_ajax_qubely_get_sections', array( $this, 'qubely_get_sections' ) );
		 add_action( 'wp_ajax_qubely_get_layouts', array( $this, 'qubely_get_layouts' ) );

		 add_action( 'wp_ajax_qubely_get_single_layout', array( $this, 'qubely_get_single_layout' ) );
		 add_action( 'wp_ajax_qubely_get_single_block', array( $this, 'qubely_get_single_section' ) );

		 add_action( 'wp_ajax_qubely_get_saved_block', array( $this, 'qubely_get_saved_block' ) );
		 add_action( 'wp_ajax_qubely_delete_saved_block', array( $this, 'qubely_delete_saved_block' ) );

		 add_action( 'wp_ajax_qubely_send_form_data', array( $this, 'qubely_send_form_data' ) );
		 add_action( 'wp_ajax_nopriv_qubely_send_form_data', array( $this, 'qubely_send_form_data' ) );

		 add_action( 'wp_ajax_qubely_add_to_cart', array( $this, 'qubely_add_to_cart' ) );
		 add_action( 'wp_ajax_nopriv_qubely_add_to_cart', array( $this, 'qubely_add_to_cart' ) );
		 // dynamic blocks
		 add_action( 'init', array( $this, 'init_dynamic_blocks' ) );

		 // qubely admin class
		 add_filter( 'admin_body_class', array( $this, 'qubely_editor_bodyclass' ) );

		 add_filter( 'body_class', array( $this, 'add_custom_class' ) );

		 // qubely global container width
		 add_action( 'wp_enqueue_scripts', array( $this, 'qubely_global_container_width' ) );
		 add_action( 'admin_enqueue_scripts', array( $this, 'qubely_global_container_width' ) );

		 add_action( 'qubely_active_theme_preset', array( $this, 'active_theme_preset' ) );

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
	 * Qubely Container Width
	 */
	public function qubely_global_container_width() {
		$default = array(
			'sm' => apply_filters( 'qubely_container_sm', 540 ),
			'md' => apply_filters( 'qubely_container_md', 720 ),
			'lg' => apply_filters( 'qubely_container_lg', 960 ),
			'xl' => apply_filters( 'qubely_container_xl', 1140 ),
		);

		$container = wp_parse_args( apply_filters( 'qubely_container_width', $default ), $default );
		wp_register_script( 'qubely_container_width', '' );
		wp_localize_script( 'qubely_container_width', 'qubely_container_width', $container );
		wp_enqueue_script( 'qubely_container_width' );
	}

	/**
	 * Qubely editor body class
	 * 
	 * @param string|mixed $classes
	 * 
	 * @return string|mixed $classes
	 */
	public function qubely_editor_bodyclass( $classes ) {

		$current_screen = get_current_screen();

		if ( 'post' == $current_screen->base ) {
			$classes .= 'qubely qubely-editor';
		}
		return $classes;
	}

	/**
	 * Add custom classes
	 * 
	 * @param array $classes
	 * 
	 * @return array $classes
	 */
	public function add_custom_class( $classes ) {
		return array_merge( $classes, array( 'qubely qubely-frontend' ) );
	}
	
	/**
	 * Create preview CSS
	 */
	public function create_preview_css() {
		
		global $wp_filesystem;
		if ( ! $wp_filesystem ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		$upload_dir = wp_upload_dir();
		WP_Filesystem( false, $upload_dir['basedir'], true );
		$dir        = trailingslashit( $upload_dir['basedir'] ) . 'qubely/';

		$filename     = "qubely-preview.css";
		$jsonfilename = "qubely-preview.json";

		if ( ! $wp_filesystem->is_dir( $dir ) ) {
			$wp_filesystem->mkdir( $dir );
		}

		if ( ! file_exists( $dir . $filename ) ) {
			if ( ! $wp_filesystem->put_contents( $dir . $filename, '' ) ) {
				throw new Exception( __( 'Preview CSS can not be saved due to permission!!!', 'qubely' ) );
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
	 * Load Editor Styles and Scripts
	 *
	 * @since 1.0.0
	 */
	public function qubely_editor_assets() {
		global $pagenow;

		if ( 'widgets.php' !== $pagenow ) {
			wp_enqueue_script( 'qubely-blocks-js', QUBELY_DIR_URL . 'assets/js/qubely.dev.js', array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), QUBELY_VERSION, true );
		}

		$palette = get_theme_support( 'qubely-color-palette' );
		$palette = array_replace( array( '#062040', '#566372', '#2084F9', '#F3F3F3', '#EEEEEE', '#FFFFFF' ), ( $palette ? $palette[0] : array() ) );

		$options                     = get_option( 'qubely_options' );
		$qubely_gmap_api_key         = isset( $options['qubely_gmap_api_key'] ) ? sanitize_text_field( $options['qubely_gmap_api_key'] ) : '';
		$qubely_recaptcha_site_key   = isset( $options['qubely_recaptcha_site_key'] ) ? sanitize_text_field( $options['qubely_recaptcha_site_key'] ) : '';
		$mc_key                      = isset( $options['mailchimp_api_key'] ) ? sanitize_text_field( $options['mailchimp_api_key'] ) : '';
		$qubely_recaptcha_secret_key = isset( $options['qubely_recaptcha_secret_key'] ) ? sanitize_text_field( $options['qubely_recaptcha_secret_key'] ) : '';
		$enable_global_settings      = isset( $options['import_with_global_settings'] ) ? sanitize_text_field( $options['import_with_global_settings'] ) : false;
		$protocols                   = array( 'http://', 'https://', 'http://www', 'https://www', 'www' );
		wp_localize_script(
			'qubely-blocks-js',
			'qubely_admin',
			array(
				'plugin'                      => QUBELY_DIR_URL,
				'ajax'                        => admin_url( 'admin-ajax.php' ),
				'pro_enable'                  => defined( 'QUBELY_PRO_VERSION' ) ? true : false,
				'shapes'                      => $this->getSvgShapes(),
				'post_type'                   => self::get_post_types(),
				'all_taxonomy'                => $this->get_all_taxonomy(),
				'image_sizes'                 => $this->get_all_image_sizes(),
				'palette'                     => $palette,
				'overwriteTheme'              => true,
				'current_user_id'             => get_current_user_id(),
				'qubely_gmap_api_key'         => $qubely_gmap_api_key,
				'qubely_recaptcha_site_key'   => $qubely_recaptcha_site_key,
				'qubely_recaptcha_secret_key' => $qubely_recaptcha_secret_key,
				'site_url'                    => site_url(),
				'admin_url'                   => admin_url(),
				'actual_url'                  => str_replace( $protocols, '', site_url() ),
				'import_with_global_settings' => $enable_global_settings,
				'publishedPosts'              => wp_count_posts()->publish,
				'mc_key'                      => $mc_key,
				'is_core_active'              => is_plugin_active( 'qubely-core/qubely-core.php' ),
			)
		);
	}

	/**
	 * Load SvgShapes
	 *
	 * @since 1.0.0
	 */
	public function getSvgShapes() {
		$shape_path = QUBELY_DIR_PATH . 'assets/shape';
		$shapes     = glob( $shape_path . '/*.svg' );
		$shapeArray = array();
		if ( count( $shapes ) ) {
			foreach ( $shapes as $shape ) {
				$shapeArray[ str_replace( array( '.svg', $shape_path . '/' ), '', $shape ) ] = file_get_contents( $shape );
			}
		}
		return $shapeArray;
	}

	/**
	 * Load SvgShapes
	 *
	 * @since 1.0.0
	 */
	public function getSvgDivider() {
		$divider_path = QUBELY_DIR_PATH . 'assets/divider';
		$dividers     = glob( $divider_path . '/*.svg' );
		$dividerArray = array();
		if ( count( $dividers ) ) {
			foreach ( $dividers as $divider ) {
				$dividerArray[ str_replace( array( '.svg', $divider_path . '/' ), '', $divider ) ] = file_get_contents( $divider );
			}
		}
		return $dividerArray;
	}

	/**
	 * Parse all blocks
	 * 
	 * 	 * @since 1.6.5
	 */
	public function parse_all_blocks() {
		$blocks;
		if ( is_single() || is_page() || is_404() ) {
			global $post;
			if ( is_object( $post ) && property_exists( $post, 'post_content' ) ) {
				$blocks = parse_blocks( $post->post_content );
			}
		} elseif ( is_archive() || is_home() || is_search() ) {
			global $wp_query;
			foreach ( $wp_query as $post ) {
				if ( is_object( $post ) && property_exists( $post, 'post_content' ) ) {
					$blocks = parse_blocks( $post->post_content );
				}
			}
		}
		return $blocks;
	}

	/**
	 * Load font-awesome CSS
	 * 
	 * 	 * @since 1.6.5
	 */
	public function qubely_load_fontawesome() {
		$option_data = get_option( 'qubely_options' );
		$load_font_awesome = isset( $option_data['load_font_awesome_CSS'] ) ? sanitize_text_field( $option_data['load_font_awesome_CSS'] ) : 'yes';
		if ( $load_font_awesome == 'yes' ) {
			$blocks = $this->parse_all_blocks();
			$contains_qubely_blocks = $this->has_blocks_with_fontawesome( $blocks );
			if ( $contains_qubely_blocks ) {
			}
			wp_enqueue_style( 'qubely-font-awesome', QUBELY_DIR_URL . 'assets/css/font-awesome.min.css', false, QUBELY_VERSION );
		}
	}

	public function colsFromArray( array $array, $keys ) {
		if ( ! is_array( $keys ) ) $keys = [ $keys ];
		return array_map( function ( $el ) use ( $keys ) {
			$o = [];
			foreach( $keys as $key ) {
				//  if(isset($el[$key]))$o[$key] = $el[$key]; //you can do it this way if you don't want to set a default for missing keys.
				$o[ $key ] = isset( $el[ $key ] ) ? $el[ $key ] : false;
			}
			return $o;
		}, $array );
	}

	/**
	 * Get block google fonts
	 */
	public function gather_block_fonts( $blocks,$block_fonts ) {
		$google_fonts = $block_fonts;
		foreach ( $blocks as $key => $block ) {
			if ( strpos( $block['blockName'], 'qubely' ) !== false ) {
				foreach ( $block['attrs'] as $key =>  $att ) {
					if ( gettype( $att ) == 'array' && isset( $att['openTypography'] ) && isset( $att['family'] ) ) {
						if ( isset( $block['attrs'][ $key ]['activeSource'] ) ) {
							if ( $block['attrs'][ $key ]['activeSource'] == 'custom' ) {
								array_push( $google_fonts,$block['attrs'][ $key ]['family'] );
							}
						} else {
							array_push( $google_fonts,$block['attrs'][ $key ]['family'] );
						}
					}
				}
			}
			if ( isset( $block['innerBlocks'] ) && gettype( $block['innerBlocks'] ) == 'array' && count( $block['innerBlocks'] ) > 0 ) {
				$child_fonts = $this->gather_block_fonts( $block['innerBlocks'], $google_fonts );
				if ( count( $child_fonts ) > 0 ) {
					$google_fonts=	array_merge( $google_fonts, $child_fonts );
				}
			}
		}
		return array_unique( $google_fonts );
	}

	/**
	 * Check whether post contains
	 * any qubely blocks
	 * 
	 * @param array $blocks
	 * 
	 * @return bool
	 */
	public function has_qubely_blocks( $blocks ) {
		$is_qubely_block = false;
		foreach ( $blocks as $key => $block ) {
			if ( strpos( $block['blockName'], 'qubely' ) !== false ) {
				$is_qubely_block = true;
			}
			if ( isset( $block['innerBlocks'] ) && gettype( $block['innerBlocks'] ) == 'array' && count( $block['innerBlocks'] ) > 0 ) {
				$is_qubely_block = $this->has_qubely_blocks( $block['innerBlocks'] );
			}
		}
		return $is_qubely_block;
	}

	/**
	 * Check whether post contains
	 * any qubely blocks with Font-awesome
	 * 
	 * @param array $blocks
	 * 
	 * @return bool
	 */
	public function has_blocks_with_fontawesome( $blocks ) {
		$has_fontawesome_block = false;
		$target_blocks = array(
			'qubely/icon',
			'qubely/accordion',
			'qubely/advancedlist',
			'qubely/iconlist',
			'qubely/infobox',
			'qubely/pricing',
			'qubely/socialicons',
			'qubely/tabs',
			'qubely/timeline', 
			'qubely/testimonial',
			'qubely/team',
			'qubely/woocarousel',
			'qubely/testimonialcarousel',
			'qubely/teamcarousel',
			'qubely/table',
			'qubely/postcarousel', 
			'qubely/imagecarousel',
			'qubely/verticaltabs',
			'qubely/form',
			'qubely/button',
			'qubely/buttongroup',
			'qubely/table-of-contents',
			'qubely/videopopup',
			'qubely/pieprogress',
			'qubely/wooproducts',
			'qubely/postgrid',
			'qubely/contactform',
			'core/block',
		);
		foreach ( $blocks as $key => $block ) {
			if ( in_array( $block['blockName'], $target_blocks, true ) ) {
				$has_fontawesome_block = true;
			}
			if ( $has_fontawesome_block == false && isset( $block['innerBlocks'] ) && gettype( $block['innerBlocks'] ) == 'array' && count( $block['innerBlocks'] ) > 0 ) {
				$has_fontawesome_block = $this->has_blocks_with_fontawesome( $block['innerBlocks'] );
			}
		}
		return $has_fontawesome_block;
	}

	/**
	 * Load Google fonts
	 * 
	 * @since 1.6.5
	 */
	public function qubely_load_googlefonts() {
		//Global settings fonts
		$blocks;
		$contains_qubely_blocks = false;
		$block_fonts = [];
		$option_data = get_option( 'qubely_options' );
		$load_google_fonts = isset( $option_data['load_google_fonts'] ) ? sanitize_text_field( $option_data['load_google_fonts'] ) : 'yes';

		if ( $load_google_fonts == 'yes' ) {
			$blocks = $this->parse_all_blocks();
			$contains_qubely_blocks = $this->has_qubely_blocks( $blocks );

			if ( $contains_qubely_blocks ) {
				$block_fonts = $this->gather_block_fonts( $blocks, $block_fonts );
				$global_settings = get_option( $this->option_keyword );
				$global_settings = $global_settings == false ? json_decode( '{}' ) : json_decode( $global_settings );
				$global_settings = json_decode( json_encode( $global_settings ), true );
				$gfonts = '';
				$all_global_fonts = array();
				if ( isset( $global_settings['presets'] ) && isset( $global_settings['presets'][ $global_settings['activePreset'] ] ) && isset( $global_settings['presets'][ $global_settings['activePreset'] ]['typography'] ) ) {
					$all_global_fonts = $this->colsFromArray( array_column( $global_settings['presets'][ $global_settings['activePreset'] ]['typography'], 'value' ), ['family', 'weight'] );
				}
				if ( count( $all_global_fonts ) > 0 ) {
					$global_fonts = array_column( $all_global_fonts, 'family' );

					$all_fonts = array_unique( array_merge( $global_fonts, $block_fonts ) );

					if ( ! empty( $all_fonts ) ) {
						$system = array(
							'Arial',
							'Tahoma',
							'Verdana',
							'Helvetica',
							'Times New Roman',
							'Trebuchet MS',
							'Georgia',
						);

						$gfonts_attr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

						foreach ( $all_fonts as $font ) {
							if ( ! in_array( $font, $system, true ) && ! empty( $font ) ) {
								$gfonts .= str_replace( ' ', '+', trim( $font ) ) . $gfonts_attr . '|';
							}
						}
					}

					if ( ! empty( $gfonts ) ) {
						$query_args = array(
							'family' => $gfonts,
						);

						wp_register_style(
							'qubely-google-fonts',
							add_query_arg( $query_args, '//fonts.googleapis.com/css' ),
							array(),
							QUBELY_VERSION
						);
						wp_enqueue_style( 'qubely-google-fonts' );
					}
				}
			}
		}
	}

	/**
	 * Admin Style & Script
	 *
	 * @since 1.0.0
	 */
	public function qubely_admin_assets() {
		wp_register_script( 'qubely_local_script', '' );
		wp_localize_script(
			'qubely_local_script',
			'qubely_urls',
			array(
				'plugin' => QUBELY_DIR_URL,
				'ajax'   => admin_url( 'admin-ajax.php' ),
				'nonce'  => wp_create_nonce( 'qubely_nonce' ),
			)
		);
		wp_enqueue_script( 'qubely_local_script' );

		#START_REPLACE
		wp_enqueue_style( 'qubely-animated-headline-style', QUBELY_DIR_URL . 'assets/css/qubely.animatedheadline.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-style-min', QUBELY_DIR_URL . 'assets/css/style.min.css', false, QUBELY_VERSION );
		#END_REPLACE

		wp_enqueue_style( 'qubely-font-awesome', QUBELY_DIR_URL . 'assets/css/font-awesome.min.css', false, QUBELY_VERSION );

		wp_enqueue_script( 'qubely-magnific-popup', QUBELY_DIR_URL . 'assets/js/qubely.magnific-popup.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'jquery-animatedHeadline', QUBELY_DIR_URL . 'assets/js/jquery.animatedheadline.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-map', QUBELY_DIR_URL . 'assets/js/blocks/map.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-contactform', QUBELY_DIR_URL . 'assets/js/blocks/contactform.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-common', QUBELY_DIR_URL . 'assets/js/common-script.js', array( 'jquery' ), QUBELY_VERSION, true );

		wp_register_style( 'qubely-options', QUBELY_DIR_URL . 'assets/css/options.css', false, QUBELY_VERSION );
	}

	/**
	 * Get Post Types.
	 *
	 * @since 1.0.9
	 */
	public static function get_post_types() {
		$post_types = get_post_types(
			array(
				'public'       => true,
				'show_in_rest' => true,
			),
			'objects'
		);

		$options = array();

		foreach ( $post_types as $post_type ) {
			if ( 'product' === $post_type->name ) {
				continue;
			}

			if ( 'attachment' === $post_type->name ) {
				continue;
			}

			if ( 'page' === $post_type->name ) {
				continue;
			}

			$options[] = array(
				'value' => $post_type->name,
				'label' => $post_type->label,
			);
		}

		return $options;
	}

	/**
	 * Get all taxonomies.
	 *
	 * @since 1.0.9
	 */
	public static function get_all_taxonomy() {
		$post_types = self::get_post_types();

		$taxonomy_array = array();

		foreach ( $post_types as  $value ) {
			$post_type = $value['value'];

			$taxonomies = get_object_taxonomies( $post_type, 'objects' );
			$data       = array();

			foreach ( $taxonomies as $tax_slug => $tax ) {
				if ( ! $tax->public || ! $tax->show_ui ) {
					continue;
				}

				$data[ $tax_slug ] = $tax;

				$terms = get_terms( $tax_slug );

				$related_tax = array();

				if ( ! empty( $terms ) ) {
					foreach ( $terms as  $term ) {
						$related_tax[] = array(
							'value' => $term->term_id,
							'label' => $term->name,
						);
					}

					$taxonomy_array[ $post_type ]['terms'][ $tax_slug ] = $related_tax;
				}
			}
			$taxonomy_array[ $post_type ]['taxonomy'] = $data;
		}

		return $taxonomy_array;
	}

	/**
	 * Get all image sizes.
	 *
	 * @since 1.0.9
	 */
	public static function get_all_image_sizes() {
		global $_wp_additional_image_sizes;

		$sizes       = get_intermediate_image_sizes();
		$image_sizes = array();

		$image_sizes[] = array(
			'value' => 'full',
			'label' => esc_html__( 'Full', 'qubely' ),
		);

		foreach ( $sizes as $size ) {
			if ( in_array( $size, array( 'thumbnail', 'medium', 'medium_large', 'large' ), true ) ) {
				$image_sizes[] = array(
					'value' => $size,
					'label' => ucwords( trim( str_replace( array( '-', '_' ), array( ' ', ' ' ), $size ) ) ),
				);
			} else {
				$image_sizes[] = array(
					'value' => $size,
					'label' => sprintf(
						'%1$s (%2$sx%3$s)',
						ucwords( trim( str_replace( array( '-', '_' ), array( ' ', ' ' ), $size ) ) ),
						$_wp_additional_image_sizes[ $size ]['width'],
						$_wp_additional_image_sizes[ $size ]['height']
					),
				);
			}
		}
		return $image_sizes;
	}

	/**
	 * Frontend Style & Script
	 *
	 * @since 1.0.0
	 */
	public function qubely_enqueue_style() {
		if ( get_post_meta( get_the_ID(), '_qubely_css', true ) != '' ) {

			/*
			 * @warning: Don't Remove `START_REPLACE` and `START_REPLACE` comments. These comments are required for gulp build
			 */

			#START_REPLACE
			wp_enqueue_style( 'qubely-animated-headline-style', QUBELY_DIR_URL . 'assets/css/qubely.animatedheadline.css', false, QUBELY_VERSION );
			wp_enqueue_style( 'qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION );
			wp_enqueue_style( 'qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION );
			wp_enqueue_style( 'qubely-style-min', QUBELY_DIR_URL . 'assets/css/style.min.css', false, QUBELY_VERSION );
			#END_REPLACE


			$this->qubely_load_fontawesome(); 
			$this->qubely_load_googlefonts(); 
		}
	}

	// Check if a block is in reusable
	public function has_block_in_reusable( $block_name, $id = false ){
		$id = (!$id) ? get_the_ID() : $id;
		if( $id ){
			if ( has_block( 'block', $id ) ){
				// Check reusable blocks
				$content = get_post_field( 'post_content', $id );
				$blocks = parse_blocks( $content );
	
				if ( ! is_array( $blocks ) || empty( $blocks ) ) {
					return false;
				}
	
				foreach ( $blocks as $block ) {
					if ( $block['blockName'] === 'core/block' && ! empty( $block['attrs']['ref'] ) ) {
						if( has_block( $block_name, $block['attrs']['ref'] ) ){
						   return true;
						}
					}
				}
			}
		}
	
		return false;
	}

	public function qubely_enqueue_scripts() {
		wp_register_script( 'qubely_local_script', '' );
		$protocols = array( 'http://', 'https://', 'http://www', 'https://www', 'www' );
		wp_localize_script(
			'qubely_local_script',
			'qubely_urls',
			array(
				'plugin'     => QUBELY_DIR_URL,
				'ajax'       => admin_url( 'admin-ajax.php' ),
				'nonce'      => wp_create_nonce( 'qubely_nonce' ),
				'actual_url' => str_replace( $protocols, '', site_url() ),
			)
		);
		wp_enqueue_script( 'qubely_local_script' );

		$blocks_meta_data = get_post_meta( get_the_ID(), '__qubely_available_blocks', true );
		$blocks_meta_data = maybe_unserialize( $blocks_meta_data );

		/**
		 * register scripts
		 */
		wp_register_script( 'qubely-animated-headline-script', QUBELY_DIR_URL . 'assets/js/jquery.animatedheadline.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_register_script( 'qubely-block-map', QUBELY_DIR_URL . 'assets/js/blocks/map.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_register_script( 'qubely-magnific-popup-script', QUBELY_DIR_URL . 'assets/js/qubely.magnific-popup.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_register_script( 'qubely-block-contactform', QUBELY_DIR_URL . 'assets/js/blocks/contactform.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_register_script( 'qubely-block-image-comparison', QUBELY_DIR_URL . 'assets/js/blocks/image-comparison.js', array(), QUBELY_VERSION, true );
		wp_register_script( 'qubely-block-common', QUBELY_DIR_URL . 'assets/js/common-script.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_register_script( 'qubely-interaction', QUBELY_DIR_URL . 'assets/js/interaction.js', array( 'jquery' ), QUBELY_VERSION, true );


		if ( is_array( $blocks_meta_data ) && count( $blocks_meta_data ) ) {
			$available_blocks = $blocks_meta_data['available_blocks'];
			$has_interaction  = $blocks_meta_data['interaction'];
			$has_animation    = $blocks_meta_data['animation'];
			$has_parallax     = $blocks_meta_data['parallax'];

			if ( has_block( 'qubely/animatedheadline' ) || $this->has_block_in_reusable( 'qubely/animatedheadline' ) ) {
				wp_enqueue_script( 'qubely-animated-headline-script' );
			}
			if ( has_block( 'qubely/map' ) ) {
				wp_enqueue_script( 'qubely-block-map' );
			}
			if ( has_block( 'qubely/videopopup' ) || has_block( 'qubely/gallery' ) || $this->has_block_in_reusable( 'qubely/videopopup' ) || $this->has_block_in_reusable( 'qubely/gallery' ) ) {
				wp_enqueue_script( 'qubely-magnific-popup-script' );
			}
			if ( has_block( 'qubely/contactform' ) || has_block( 'qubely/form' ) || $this->has_block_in_reusable( 'qubely/contactform' ) || $this->has_block_in_reusable( 'qubely/form' ) ) {
				wp_enqueue_script( 'qubely-block-contactform' );
			}
			if ( has_block( 'qubely/imagecomparison' ) || $this->has_block_in_reusable( 'qubely/imagecomparison' ) ) {
				wp_enqueue_script( 'qubely-block-image-comparison' );
			}

			if ( $has_interaction ) {
				wp_enqueue_script( 'qubely-interaction' );
			}

			if (
				$has_interaction ||
				$has_parallax ||
				$has_animation ||
				in_array( 'qubely/accordion', $available_blocks ) ||
				in_array( 'qubely/pieprogress', $available_blocks ) ||
				in_array( 'qubely/counter', $available_blocks ) ||
				in_array( 'qubely/tabs', $available_blocks ) ||
				in_array( 'qubely/table-of-contents', $available_blocks ) ||
				in_array( 'qubely/verticaltabs', $available_blocks ) ||
				in_array( 'qubely/postgrid', $available_blocks ) ||
				$this->has_block_in_reusable( 'qubely/accordion' ) ||
				$this->has_block_in_reusable( 'qubely/pieprogress' ) ||
				$this->has_block_in_reusable( 'qubely/counter' ) ||
				$this->has_block_in_reusable( 'qubely/tabs' ) ||
				$this->has_block_in_reusable( 'qubely/table-of-contents' ) ||
				$this->has_block_in_reusable( 'qubely/verticaltabs' ) ||
				$this->has_block_in_reusable( 'qubely/postgrid' )
			) {
				wp_enqueue_script( 'qubely-block-common' );
			}
		} else {
			$post    = null;
			$wp_post = get_post( $post );
			if ( $wp_post instanceof WP_Post ) {
				$post = $wp_post->post_content;
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/animatedheadline' . ' ' ) ) {
				wp_enqueue_script( 'qubely-animated-headline-script' );
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/map' . ' ' ) ) {
				wp_enqueue_script( 'qubely-block-map' );
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/videopopup' . ' ' ) || false !== strpos( $post, '<!-- wp:' . 'qubely/gallery' . ' ' ) ) {
				wp_enqueue_script( 'qubely-magnific-popup-script' );
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/contactform' . ' ' ) || false !== strpos( $post, '<!-- wp:' . 'qubely/form' . ' ' ) ) {
				wp_enqueue_script( 'qubely-block-contactform' );
			}
			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/imagecomparison' . ' ' ) ) {
				wp_enqueue_script( 'qubely-block-image-comparison' );
			}

			wp_enqueue_script( 'qubely-block-common' );
			wp_enqueue_script( 'qubely-interaction' );
		}
	}

	/**
	 * Load Inline Footer Script
	 *
	 * @since 1.3.0
	 */
	public function qubely_inline_footer_scripts() {       
		global $wp_query;	 
		$is_previewing = $wp_query->is_preview();
		$can_edit = current_user_can( 'edit_posts' );
		if ( $is_previewing || $can_edit ) {
			?>
			<script>
				// Set Preview CSS
				document.addEventListener("DOMContentLoaded", function() {
					const cussrent_url = window.location.href;
					// if (cussrent_url.includes('preview=true')) {
						let cssInline = document.createElement('style');
						cssInline.type = 'text/css';
						cssInline.id = 'qubely-block-js-preview';
						cssInline.innerHTML = JSON.parse( localStorage.getItem('qubelyCSS'));
						window.document.getElementsByTagName("head")[0].appendChild(cssInline);
					// }
				})
			</script>
			<?php
		}
	}

	/**
	 * Load Inline Admin Header Script
	 *
	 * @since 1.3.0
	 */
	public function qubely_inline_admin_header_scripts() {
		?>
		<script>
			function loadScriptAsync(src) {
				return new Promise((resolve, reject) => {
					const tag = document.createElement('script');
					tag.src = src;
					tag.async = true;
					tag.onload = () => {
						resolve();
					};
					const firstScriptTag = document.getElementsByTagName('script')[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				});
			}
		</script>
		<?php
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
	 * @since 1.0.0-BETA
	 * Add post meta
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
	 * @since 1.0.0-BETA
	 * qubely api routes
	 */
	public function register_api_hook() {
		// For update global options
		register_rest_route(
			'qubely/v1',
			'/global_settings/',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_global_option' ),
					'permission_callback' => function () {
						return true;
					},
					'args'                => array(),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_global_option' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
		register_rest_route(
			'qubely/v1',
			'/get_saved_preset/',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'get_saved_preset' ),
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
					'callback'            => array( $this, 'save_block_css' ),
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
					'callback'            => array( $this, 'qubely_get_content' ),
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
					'callback'            => array( $this, 'append_qubely_css_callback' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
		register_rest_route(
			'qubely/v1',
			'/append_reusable_css/',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'append_reusable_css_callback' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);

		register_rest_route(
			'qubely/v1',
			'/get_qubely_options',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_qubely_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);

		register_rest_route(
			'qubely/v1',
			'/add_qubely_options',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'add_qubely_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(),
				),
			)
		);
	}

	public function add_qubely_options( $request ) {
		try {
			$params  = $request->get_params();
			$options = get_option( 'qubely_options' );
			$key     = sanitize_text_field( $params['key'] );
			$value   = sanitize_text_field( $params['value'] );

			if ( empty( $key ) || empty( $value ) ) {
				throw new Exception( 'Key or value cannot be empty!' );
			}

			$options[ $key ] = $value;
			update_option( 'qubely_options', $options );
			wp_send_json_success( $options );

		} catch ( Exception $e ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => $e->getMessage(),
				)
			);
		}
	}

	public function get_qubely_options() {
		$options = get_option( 'qubely_options' );
		wp_send_json_success( $options );
	}

	public function append_qubely_css_callback( $request ) {
		try {
			global $wp_filesystem;
			if ( ! $wp_filesystem ) {
				require_once ABSPATH . 'wp-admin/includes/file.php';
			}
			$params  = $request->get_params();
			$css     = $params['css'];
			$post_id = (int) sanitize_text_field( $params['post_id'] );
			if ( $post_id ) {
				$filename   = "qubely-css-{$post_id}.css";
				$upload_dir = wp_upload_dir();
				$dir        = trailingslashit( $upload_dir['basedir'] ) . 'qubely/';
				if ( file_exists( $dir . $filename ) ) {
					$file = fopen( $dir . $filename, 'a' );
					fwrite( $file, $css );
					fclose( $file );
				}
				$get_data = get_post_meta( $post_id, '_qubely_css', true );
				update_post_meta( $post_id, '_qubely_css', $get_data . $css );

				wp_send_json_success(
					array(
						'success' => true,
						'message' => 'Update done' . $get_data,
					)
				);
			}
		} catch ( Exception $e ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => $e->getMessage(),
				)
			);
		}
	}

	public function append_reusable_css_callback( $request ) {
		try {
			global $wp_filesystem;
			if ( ! $wp_filesystem ) {
				require_once ABSPATH . 'wp-admin/includes/file.php';
			}
			$params  = $request->get_params();
			$css     = $params['css'];

				$filename   = "qubely-preview.css";
				$upload_dir = wp_upload_dir();
				$dir        = trailingslashit( $upload_dir['basedir'] ) . 'qubely/';
				if ( file_exists( $dir . $filename ) ) {
					$file = fopen( $dir . $filename, 'a' );
					fwrite( $file, $css );
					fclose( $file );
				}
				wp_send_json_success(
					array(
						'success' => true,
						'message' => 'appended reusable css in preview file',
					)
				);
			
		} catch ( Exception $e ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => $e->getMessage(),
				)
			);
		}
	}

	public function get_saved_preset( $request ) {
		$params = $request->get_params();
		try {
			if ( isset( $params['postId'] ) ) {
				return array(
					'success'      => true,
					'saved_preset' => get_post_meta( $params['postId'], '__qubely_global_settings', true ),
					'message'      => 'Saved preset Successfully retrieved!!',
				);
			}
		} catch ( Exception $e ) {
			return array(
				'success' => false,
				'message' => $e->getMessage(),
			);
		}
	}

	public function qubely_get_content( $request ) {
		$params = $request->get_params();
		try {
			if ( isset( $params['postId'] ) ) {
				return array(
					'success' => true,
					'data'    => ! empty( $params['postId'] ) ? get_post( $params['postId'] )->post_content : '',
					'message' => 'Get Data Success!!',
				);
			}
		} catch ( Exception $e ) {
			return array(
				'success' => false,
				'message' => $e->getMessage(),
			);
		}
	}

	/**
	 * @since 1.0.0-BETA
	 * Api for update global option fields
	 */
	public function update_global_option( $request ) {
		try {
			$params = $request->get_params();
			if ( ! isset( $params['settings'] ) ) {
				throw new Exception( 'Settings parameter is missing!' );
			}

			$settings = $params['settings'];

			if ( get_option( $this->option_keyword ) == false ) {
				add_option( $this->option_keyword, $settings );
			} else {
				update_option( $this->option_keyword, $settings );
			}

			return array(
				'success' => true,
				'message' => 'Global option updated!',
			);
		} catch ( Exception $e ) {
			return array(
				'success' => false,
				'message' => $e->getMessage(),
			);
		}
	}

	/**
	 * @since 1.0.0-BETA
	 * API For Get Global options
	 */
	public function get_global_option() {
		try {

			$settings = get_option( $this->option_keyword );

			$settings = $settings == false ? json_decode( '{}' ) : json_decode( $settings );

			$palette = get_theme_support( 'qubely-color-palette' );

			if ( $palette ) {
				$palette                = array_replace( array( '#062040', '#566372', '#2084F9', '#F3F3F3', '#EEEEEE', '#FFFFFF' ), ( $palette ? $palette[0] : array() ) );
				$settings->colorPreset1 = $palette[0];
				$settings->colorPreset2 = $palette[1];
				$settings->colorPreset3 = $palette[2];
				$settings->colorPreset4 = $palette[3];
				$settings->colorPreset5 = $palette[4];
				$settings->colorPreset6 = $palette[6];
			}
			return array(
				'success'  => true,
				'settings' => $settings,
			);
		} catch ( Exception $e ) {
			return array(
				'success' => false,
				'message' => $e->getMessage(),
			);
		}
	}

	/**
	 * @since 1.0.0-BETA
	 * Save block css for each post in a css file and enqueue the file to the post page
	 */
	public function save_block_css( $request ) {
		try {
			global $wp_filesystem;
			if ( ! $wp_filesystem ) {
				require_once ABSPATH . 'wp-admin/includes/file.php';
			}

			$params  = $request->get_params();
			$post_id = (int) sanitize_text_field( $params['post_id'] );
			$is_previewing = $params['isPreviewing'];

			if ( $params['is_remain'] ) {
				$qubely_block_css = $params['block_css'];
				$filename         = "qubely-css-{$post_id}.css";

				$qubely_block_json = $params['interaction'];
				$jsonfilename      = "qubely-json-{$post_id}.json";

				$upload_dir = wp_upload_dir();
				$dir        = trailingslashit( $upload_dir['basedir'] ) . 'qubely/';

				// Add Import in first
				$import_first = $this->set_import_url_to_top_css( $qubely_block_css );

				if ( $is_previewing == true ) {
					$filename     = "qubely-preview.css";
					$jsonfilename = "qubely-preview.json";
				} else {
					update_post_meta( $post_id, '_qubely_css', $import_first );
					if ( $qubely_block_json ) {
						update_post_meta( $post_id, '_qubely_interaction_json', $qubely_block_json );
					}
				}

				WP_Filesystem( false, $upload_dir['basedir'], true );

				if ( ! $wp_filesystem->is_dir( $dir ) ) {
					$wp_filesystem->mkdir( $dir );
				}
				// If fail to save css in directory, then it will show a message to user
				if ( ! $wp_filesystem->put_contents( $dir . $filename, $import_first ) ) {
					throw new Exception( __( 'CSS can not be saved due to permission!!!', 'qubely' ) );
				}

				// If fail to save css in directory, then it will show a message to user
				if ( ! $wp_filesystem->put_contents( $dir . $jsonfilename, $qubely_block_json ) ) {
					throw new Exception( __( 'JSON can not be saved due to permission!!!', 'qubely' ) );
				}
			} else {
				if ( $is_previewing == false ) {
					delete_post_meta( $post_id, '_qubely_css' );
					delete_post_meta( $post_id, '_qubely_interaction_json' );
					$this->delete_post_resource( $post_id );
				}
			}

			$success_message = 'Qubely preview css file has been updated.';
			// set block meta
			if ( $is_previewing == false ) {
				update_post_meta( $post_id, '__qubely_available_blocks', serialize( $params['available_blocks'] ) );
				$success_message = 'Qubely block css file has been updated.';
			}
			return array(
				'success' => true,
				'message' => __( $success_message, 'qubely' ),
				'data'    => $params,
			);
		} catch ( Exception $e ) {
			return array(
				'success' => false,
				'message' => $e->getMessage(),
			);
		}
	}

	/**
	 * @since 1.0.2
	 * Set font import to the top of the CSS file
	 */
	public function set_import_url_to_top_css( $get_css = '' ) {
		$css_url            = "@import url('https://fonts.googleapis.com/css?family=";
		$google_font_exists = substr_count( $get_css, $css_url );

		if ( $google_font_exists ) {
			$pattern = sprintf(
				'/%s(.+?)%s/ims',
				preg_quote( $css_url, '/' ),
				preg_quote( "');", '/' )
			);

			if ( preg_match_all( $pattern, $get_css, $matches ) ) {
				$fonts   = $matches[0];
				$get_css = str_replace( $fonts, '', $get_css );
				if ( preg_match_all( '/font-weight[ ]?:[ ]?[\d]{3}[ ]?;/', $get_css, $matche_weight ) ) { // short out font weight
					$weight = array_map(
						function ( $val ) {
							$process = trim( str_replace( array( 'font-weight', ':', ';' ), '', $val ) );
							if ( is_numeric( $process ) ) {
								return $process;
							}
						},
						$matche_weight[0]
					);
					foreach ( $fonts as $key => $val ) {
						$fonts[ $key ] = str_replace( "');", '', $val ) . ':' . implode( ',', $weight ) . "');";
					}
				}

				// Multiple same fonts to single font
				$fonts   = array_unique( $fonts );
				$get_css = implode( '', $fonts ) . $get_css;
			}
		}
		return $get_css;
	}

	/**
	 * @return bool|false|int
	 *
	 * determine if current single page is WP Page Builder Page
	 */
	private function is_qubely_single() {
		$post_id = get_the_ID();

		if ( ! $post_id ) {
			return false;
		}
		return $post_id;
	}

	/**
	 *
	 * determine if wppb editor is open
	 *
	 * @since V.1.0.0
	 * @return bool
	 *
	 * @since v.1.0.0
	 */
	private function is_editor_screen() {
		if ( ! empty( $_GET['action'] ) && $_GET['action'] === 'wppb_editor' ) {
			return true;
		}
		return false;
	}

	/**
	 * Enqueue post style
	 * If css save option fileSystem then enqueue file
	 * Or add inline to the header
	 */
	public function enqueue_block_css() {
		// if(!isset($_GET['preview'])){
		$option_data = get_option( 'qubely_options' );
		$css_save_as = isset( $option_data['css_save_as'] ) ? $option_data['css_save_as'] : 'wp_head';
		if ( $css_save_as == 'filesystem' ) {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_block_css_file' ) );
		} else {
			add_action( 'wp_head', array( $this, 'add_block_inline_css' ), 100 );
		}
		// }
	}

	/**
	 *
	 * Return reference id
	 *
	 * @since 1.2.5
	 * @return bool
	 */
	public function reference_id( $parse_blocks ) {
		$extra_id = array();
		if ( ! empty( $parse_blocks ) ) {
			foreach ( $parse_blocks as $key => $block ) {
				if ( $block['blockName'] == 'core/block' ) {
					$extra_id[] = $block['attrs']['ref'];
				}
				if ( count( $block['innerBlocks'] ) > 0 ) {
					$extra_id = array_merge( $this->reference_id( $block['innerBlocks'] ), $extra_id );
				}
			}
		}
		return $extra_id;
	}

	/**
	 * Enqueue block css file
	 * Check if css path exists and it has current post page
	 * Then enqueue file
	 */
	public function enqueue_block_css_file() {

		$post_id        = $this->is_qubely_single();
		$upload_dir     = wp_get_upload_dir();
		$upload_css_dir = trailingslashit( $upload_dir['basedir'] );

		$css_path       = $upload_css_dir . "qubely/qubely-css-{$post_id}.css";
		$json_path      = $upload_css_dir . "qubely/qubely-json-{$post_id}.json";

		if ( isset( $_GET['preview'] ) && $_GET['preview'] == true ) {
			$css_path  = $upload_css_dir . "qubely/qubely-preview.css";
			$json_path = $upload_css_dir . "qubely/qubely-preview.json";

			/**
			 * enqueue static CSS 
			 * and Scripts
			 */
			$this->add_static_css();

			if ( file_exists( $css_path ) ) {
				$css_dir_url = trailingslashit( $upload_dir['baseurl'] );
				$css_url     = $css_dir_url . "qubely/qubely-preview.css";
				if ( ! $this->is_editor_screen() ) {
					wp_enqueue_style( "qubely-post-preview", $css_url, false, QUBELY_VERSION );
				}

				$blockJson = file_get_contents( $json_path );
				if ( $blockJson != '{}' ) {
					echo '<script type="text/javascript"> var qubelyInteraction = ' . wp_kses_post( $blockJson ) . '</script>';
				}
			}
		} else {
			if ( file_exists( $css_path ) ) {
				$css_dir_url = trailingslashit( $upload_dir['baseurl'] );
				$css_url     = $css_dir_url . "qubely/qubely-css-{$post_id}.css";
				if ( ! $this->is_editor_screen() ) {
					wp_enqueue_style( "qubely-post-{$post_id}", $css_url, false, QUBELY_VERSION );
				}
				$this->add_reusable_css();
			} else {
				wp_register_style( 'qubely-post-data', false );
				wp_enqueue_style( 'qubely-post-data' );
				wp_add_inline_style( 'qubely-post-data', get_post_meta( get_the_ID(), '_qubely_css', true ) );
			}
			if ( ! file_exists( $json_path ) ) {
				$this->print_interaction_json_to_header();
			} else {
				$blockJson = file_get_contents( $json_path );
				if ( $blockJson != '{}' ) {
					echo '<script type="text/javascript"> var qubelyInteraction = ' . wp_kses_post( $blockJson ) . '</script>';
				}
			}
		}
	}

	/**
	 * Add reusable css
	 */
	public function add_reusable_css() {
		$post_id        = $this->is_qubely_single();
		$upload_dir     = wp_get_upload_dir();
		$upload_css_dir = trailingslashit( $upload_dir['basedir'] );
		if ( $post_id ) {
			$content_post = get_post( $post_id );
			if ( isset( $content_post->post_content ) ) {
				$content      = $content_post->post_content;
				$parse_blocks = parse_blocks( $content );
				$css_id       = $this->reference_id( $parse_blocks );
				if ( is_array( $css_id ) ) {
					if ( ! empty( $css_id ) ) {
						$css_id = array_unique( $css_id );
						foreach ( $css_id as $value ) {
							$css = $upload_css_dir . "qubely/qubely-css-{$value}.css";
							if ( file_exists( $upload_css_dir . "qubely/qubely-css-{$value}.css" ) ) {
								wp_enqueue_style( "qubely-post-{$value}", trailingslashit( $upload_dir['baseurl'] ) . "qubely/qubely-css-{$value}.css", false, QUBELY_VERSION );
							}
						}
					}
				}
			}
		}
	}

	/**
	 * on Preview
	 * enqueue static CSS 
	 * and Scripts 
	 */
	public function add_static_css(){
		//CSS

		#START_REPLACE
		wp_enqueue_style( 'qubely-animated-headline-style', QUBELY_DIR_URL . 'assets/css/qubely.animatedheadline.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-style-min', QUBELY_DIR_URL . 'assets/css/style.min.css', false, QUBELY_VERSION );
		#END_REPLACE

		$this->qubely_load_fontawesome();

		//Scripts
		wp_enqueue_script( 'qubely-magnific-popup-script', QUBELY_DIR_URL . 'assets/js/qubely.magnific-popup.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-animated-headline-script', QUBELY_DIR_URL . 'assets/js/jquery.animatedheadline.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-map', QUBELY_DIR_URL . 'assets/js/blocks/map.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-image-comparison', QUBELY_DIR_URL . 'assets/js/blocks/image-comparison.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-contactform', QUBELY_DIR_URL . 'assets/js/blocks/contactform.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-common', QUBELY_DIR_URL . 'assets/js/common-script.js', array( 'jquery' ), QUBELY_VERSION, true );
	}

	/**
	 * Check current post page open and css path exists
	 * Then read the css file content from css path
	 * Then add inline css to the header
	 */
	public function add_block_inline_css() {
		$upload_dir     = wp_get_upload_dir();
		$upload_css_dir = trailingslashit( $upload_dir['basedir'] );
		if ( isset( $_GET['preview'] ) && $_GET['preview'] == true ) {
			$css_path       = $upload_css_dir . "qubely/qubely-preview.css";
			$json_path      = $upload_css_dir . "qubely/qubely-preview.json";

			$this->add_static_css();

			if ( file_exists( $css_path ) ) {
				$blockCss = file_get_contents( $css_path );
				echo '<style type="text/css">' . sanitize_textarea_field( $blockCss ) . '</style>';
			}
			if ( file_exists( $json_path ) ) {
				$blockJson = file_get_contents( $json_path );
				if ( $blockJson != '{}' ) {
					echo '<script type="text/javascript"> var qubelyInteraction = ' . wp_kses_post( $blockJson ) . '</script>';
				}
			} 
		} else {
			$post_id = $this->is_qubely_single();
			if ( $post_id ) {
				$css_path       = $upload_css_dir . "qubely/qubely-css-{$post_id}.css";
				$json_path      = $upload_css_dir . "qubely/qubely-json-{$post_id}.json";
	
				if ( file_exists( $css_path ) ) {
					$blockCss = file_get_contents( $css_path );
					echo '<style type="text/css">' . sanitize_textarea_field( $blockCss ) . '</style>';
				} else {
					echo '<style type="text/css">' . sanitize_textarea_field( get_post_meta( get_the_ID(), '_qubely_css', true ) ) . '</style>';
				}
	
				if ( ! file_exists( $json_path ) ) {
					$this->print_interaction_json_to_header();
				} else {
					$blockJson = file_get_contents( $json_path );
					if ( $blockJson != '{}' ) {
						echo '<script type="text/javascript"> var qubelyInteraction = ' . wp_kses_post( $blockJson ) . '</script>';
					}
				}
			}
			$this->add_reusable_css();
		}
		
	}

	/**
	 * @since 1.2.0
	 * Interaction Add
	 */
	public function print_interaction_json_to_header() {
		$post_id         = get_the_ID();
		$interactionJson = get_post_meta( $post_id, '_qubely_interaction_json', true );
		if ( $interactionJson != '{}' && $interactionJson != '' ) {
			echo '<script type="text/javascript"> var qubelyInteraction = ' . wp_kses_post( $interactionJson ) . '</script>';
		}
	}

	/**
	 * Check if the post has been delete operation
	 */
	public function before_delete_post() {
		// $this->delete_post_resource();
	}

	/**
	 * Delete post related data
	 *
	 * @delete post css file
	 */
	private function delete_post_resource( $post_id = '' ) {
		$post_id = $post_id ? $post_id : $this->is_qubely_single();
		if ( $post_id ) {
			$upload_dir     = wp_get_upload_dir();
			$upload_css_dir = trailingslashit( $upload_dir['basedir'] );
			$css_path       = $upload_css_dir . "qubely/qubely-css-{$post_id}.css";
			$json_path      = $upload_css_dir . "qubely/qubely-json-{$post_id}.json";
			if ( file_exists( $css_path ) ) {
				unlink( $css_path );
			}
			if ( file_exists( $json_path ) ) {
				unlink( $json_path );
			}
		}
	}

	/**
	 * @since 1.0.0-BETA
	 * Get Blocks
	 */
	public function qubely_get_sections() {

		// Verify the request.
		check_ajax_referer( 'qubely_nonce', 'security' );

		// It's good let's do some capability check.
		$user = wp_get_current_user();
		$allowed_roles = array( 'editor', 'administrator', 'author' );
		
		if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
			wp_die( __( 'You don\'t have permission to perform this action', 'qubely' ) );
		}
		
		// Cool, we're almost there, let's check the user authenticity a little bit, shall we!
		if ( ! is_user_logged_in() && $user->ID !== sanitize_text_field( $_REQUEST['user_id'] ) ) {
			wp_die( __( 'You don\'t have proper authorization to perform this action', 'qubely' ) );
		}

		$sectionData = array();
		$sectionData = $this->load_blocks_from_server();

		wp_send_json_success( $sectionData );
	}

	/**
	 * @since 1.0.0-BETA
	 * Load Blocks from Server
	 */
	public function load_blocks_from_server() {
		$apiUrl = $this->api_base_url . 'sections';

		$post_args         = array( 'timeout' => 120 );
		$body_param        = array_merge( $this->qubely_api_request_body_default, array( 'request_for' => 'get_all_sections' ) );
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$blockRequest      = wp_remote_post( $apiUrl, array() );
		if ( is_wp_error( $blockRequest ) ) {
			wp_send_json_error( array( 'messages' => $blockRequest->get_error_messages() ) );
		}
		$blockData = json_decode( $blockRequest['body'], true );

		return $blockData;
	}

	/**
	 * @since 1.0.0-BETA
	 * Get Blocks
	 */
	public function qubely_get_layouts() {

		// Verify the request.
		check_ajax_referer( 'qubely_nonce', 'security' );

		// It's good let's do some capability check.
		$user = wp_get_current_user();
		$allowed_roles = array( 'editor', 'administrator', 'author' );
		
		if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
			wp_die( __( 'You don\'t have permission to perform this action', 'qubely' ) );
		}
		
		// Cool, we're almost there, let's check the user authenticity a little bit, shall we!
		if ( ! is_user_logged_in() && $user->ID !== sanitize_text_field( $_REQUEST['user_id'] ) ) {
			wp_die( __( 'You don\'t have proper authorization to perform this action', 'qubely' ) );
		}

		$layoutData = array();
		$layoutData = $this->load_layouts_from_server();

		wp_send_json_success( $layoutData );
	}

	/**
	 * @since 1.0.0-BETA
	 * Load Blocks from Server
	 */
	public function load_layouts_from_server() {
		$apiUrl = $this->api_base_url . 'layouts';

		$post_args         = array( 'timeout' => 120 );
		$body_param        = array_merge( $this->qubely_api_request_body_default, array( 'request_for' => 'get_all_layouts' ) );
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$layoutRequest     = wp_remote_post( $apiUrl, $post_args );
		if ( is_wp_error( $layoutRequest ) ) {
			wp_send_json_error( array( 'messages' => $layoutRequest->get_error_messages() ) );
		}
		$layoutData = json_decode( $layoutRequest['body'], true );

		return $layoutData;
	}

	/**
	 * @since 1.0.0
	 * Get single layout
	 */
	public function qubely_get_single_layout() {

		// Verify the request.
		check_ajax_referer( 'qubely_nonce', 'security' );

		// It's good let's do some capability check.
		$user = wp_get_current_user();
		$allowed_roles = array( 'editor', 'administrator', 'author' );
		
		if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
			wp_die( __( 'You don\'t have permission to perform this action', 'qubely' ) );
		}
		
		// Cool, we're almost there, let's check the user authenticity a little bit, shall we!
		if ( ! is_user_logged_in() && $user->ID !== sanitize_text_field( $_REQUEST['user_id'] ) ) {
			wp_die( __( 'You don\'t have proper authorization to perform this action', 'qubely' ) );
		}

		$layout_id = isset( $_REQUEST['layout_id'] ) ? (int) sanitize_text_field( $_REQUEST['layout_id'] ) : null;
		if ( $layout_id ) {
			$layoutData = $this->load_and_cache_single_layout_from_server( $layout_id );
			wp_send_json_success( $layoutData );
		} else {
			wp_send_json_error( __( 'No layout id was provided', 'qubely' ) );
		}
	}

	/**
	 * @since 1.0.0(Stable)
	 * Get single layout
	 */
	public function qubely_get_single_section() {

		// Verify the request.
		check_ajax_referer( 'qubely_nonce', 'security' );

		// It's good let's do some capability check.
		$user = wp_get_current_user();
		$allowed_roles = array( 'editor', 'administrator', 'author' );
		
		if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
			wp_die( __( 'You don\'t have permission to perform this action', 'qubely' ) );
		}
		
		// Cool, we're almost there, let's check the user authenticity a little bit, shall we!
		if ( ! is_user_logged_in() && $user->ID !== sanitize_text_field( $_REQUEST['user_id'] ) ) {
			wp_die( __( 'You don\'t have proper authorization to perform this action', 'qubely' ) );
		}

		$section_id = isset( $_REQUEST['block_id'] ) ? (int) sanitize_text_field( $_REQUEST['block_id'] ) : null;
		if ( $section_id ) {
			$sectionData = $this->load_and_cache_single_section_from_server( $section_id );
			wp_send_json_success( $sectionData );
		} else {
			wp_send_json_error( __( 'No section id was provided', 'qubely' ) );
		}
	}

	/**
	 * @since 1.0.0(Stable)
	 * Get single section
	 */
	public function load_and_cache_single_section_from_server( $section_id = 0 ) {
		if ( ! $section_id ) {
			return false;
		}
		$apiUrl = $this->api_base_url . 'single-section';

		$post_args = array( 'timeout' => 120 );

		$body_param        = array_merge(
			$this->qubely_api_request_body_default,
			array(
				'request_for' => 'get_single_section',
				'section_id'  => $section_id,
			)
		);
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$sectionRequest    = wp_remote_post( $apiUrl, $post_args );

		if ( is_wp_error( $sectionRequest ) ) {
			wp_send_json_error( array( 'messages' => $sectionRequest->get_error_messages() ) );
		}

		$sectionData = json_decode( $sectionRequest['body'], true );

		return $sectionData;
	}

	/**
	 * @since 1.0.0-BETA
	 * Load single layout and cache it
	 */
	public function load_and_cache_single_layout_from_server( $layout_id = 0 ) {
		if ( ! $layout_id ) {
			return false;
		}
		$apiUrl = $this->api_base_url . 'single-layout';

		$post_args = array( 'timeout' => 120 );

		$body_param = array_merge(
			$this->qubely_api_request_body_default,
			array(
				'request_for' => 'get_single_layout',
				'layout_id'   => $layout_id,
			)
		);
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$layoutRequest     = wp_remote_post( $apiUrl, $post_args );

		if ( is_wp_error( $layoutRequest ) ) {
			wp_send_json_error( array( 'messages' => $layoutRequest->get_error_messages() ) );
		}

		$layoutData = json_decode( $layoutRequest['body'], true );

		return $layoutData;
	}

	/**
	 * @since 1.0.0-BETA
	 * Get saved blocks
	 */
	public function qubely_get_saved_block() {

		// Verify the request.
		check_ajax_referer( 'qubely_nonce', 'security' );

		// It's good let's do some capability check.
		$user = wp_get_current_user();
		$allowed_roles = array( 'editor', 'administrator', 'author' );
		
		if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
			wp_die( __( 'You don\'t have permission to perform this action', 'qubely' ) );
		}
		
		// Cool, we're almost there, let's check the user authenticity a little bit, shall we!
		if ( ! is_user_logged_in() && $user->ID !== sanitize_text_field( $_REQUEST['user_id'] ) ) {
			wp_die( __( 'You don\'t have proper authorization to perform this action', 'qubely' ) );
		}

		$args      = array(
			'post_type'   => 'wp_block',
			'post_status' => 'publish',
		);
		$r         = wp_parse_args( null, $args );
		$get_posts = new WP_Query();
		$wp_blocks = $get_posts->query( $r );
		wp_send_json_success( $wp_blocks );
	}

	/**
	 * @since 1.0.0-BETA
	 * Delete saved blocks
	 */
	public function qubely_delete_saved_block() {

		// Verify the request.
		check_ajax_referer( 'qubely_nonce', 'security' );

		// It's good let's do some capability check.
		$user = wp_get_current_user();
		$allowed_roles = array( 'editor', 'administrator', 'author' );
		
		if ( ! array_intersect( $allowed_roles, $user->roles ) ) {
			wp_die( __( 'You don\'t have permission to perform this action', 'qubely' ) );
		}
		
		// Cool, we're almost there, let's check the user authenticity a little bit, shall we!
		if ( ! is_user_logged_in() && $user->ID !== sanitize_text_field( $_REQUEST['user_id'] ) ) {
			wp_die( __( 'You don\'t have proper authorization to perform this action', 'qubely' ) );
		}

		// All good, let's proceed.
		$block_id = isset( $_REQUEST['block_id'] ) ? (int) sanitize_text_field( $_REQUEST['block_id'] ) : null;
		$has_post = get_post( $block_id );
		if ( null !== $has_post ) {
			$deleted_block = wp_delete_post( $block_id );
			wp_send_json_success( $deleted_block );
		} else {
			wp_send_json_error( __( 'No post id was provided', 'qubely' ) );
		}
	}

	/**
	 * @param array $input
	 *
	 * @return array
	 *
	 * Sanitize input array
	 */
	public function sanitize_array( $input = array() ) {
		$array = array();

		if ( is_array( $input ) && count( $input ) ) {
			foreach ( $input as $key => $value ) {
				if ( is_array( $value ) ) {
					$array[ $key ] = $this->sanitize_array( $value );
				} else {
					$key           = sanitize_text_field( $key );
					$value         = sanitize_text_field( $value );
					$array[ $key ] = $value;
				}
			}
		}

		return $array;
	}

	/**
	 * @param array $input
	 *
	 * @return array
	 *
	 * Sanitize input array
	 */
	public function sanitize_form_array( $input = array() ) {
		$array = array();

		if ( is_array( $input ) && count( $input ) ) {
			foreach ( $input as $key => $value ) {
				if ( is_array( $value ) ) {
					$array[ $key ] = $this->sanitize_form_array( $value );
				} else {
					$key           = 'email' === $key ? sanitize_email( $key ) : sanitize_text_field( $key );
					$value         = 'email' === $key ? sanitize_email( $value ) : sanitize_text_field( $value );
					$array[ $key ] = $value;
				}
			}
		}

		return $array;
	}

	/**
	 * Ajax for sending form data
	 *
	 * @return boolean,void     Return false if failure, echo json on success
	 */

	public function qubely_send_form_data() {

		// Verify the authenticity of the request.
		check_ajax_referer( 'qubely_nonce', 'security' );

		// All good, let's proceed.
		if ( isset( $_POST['captcha'] ) && $_POST['recaptcha'] == 'true' ) {
			$captcha   = $_POST['captcha'];
			$secretKey = $_POST['recaptcha-secret-key'];
			$verify    = wp_remote_get( "https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$captcha}" );

			if ( ! is_array( $verify ) || ! isset( $verify['body'] ) ) {
				wp_send_json( __( 'Cannot validate captcha', 'qubely' ), 400 );
			}

			$verified = json_decode( $verify['body'] );
			if ( ! $verified->success ) {
				wp_send_json( __( 'Captcha validation error', 'qubely' ), 400 );
			}
		}

		// setting from options.
		$qubely_options = maybe_unserialize( get_option( 'qubely_options' ) );
		$emailFrom      = isset( $qubely_options['form_from_email'] ) ? sanitize_email( $qubely_options['form_from_email'] ) : sanitize_email( get_option( 'admin_email' ) );
		$fromName       = isset( $qubely_options['form_from_name'] ) ? sanitize_text_field( $qubely_options['form_from_name'] ) : sanitize_text_field( get_option( 'blogname' ) );

		$default_receiver = sanitize_email( get_option( 'admin_email' ) );

		// Settings data
		$fieldErrorMessage  = ( $_POST['field-error-message'] ) ? sanitize_text_field( $_POST['field-error-message'] ) : '';
		$formSuccessMessage = ( $_POST['form-success-message'] ) ? sanitize_text_field( $_POST['form-success-message'] ) : '';
		$formErrorMessage   = ( $_POST['form-error-message'] ) ? sanitize_text_field( $_POST['form-error-message'] ) : '';
		$emailReceiver      = ( $_POST['email-receiver'] ) ? sanitize_email( $_POST['email-receiver'] ) : $default_receiver;
		$emailHeaders       = ( $_POST['email-headers'] ) ? sanitize_textarea_field( $_POST['email-headers'] ) : '';
		$emailSubject       = ( $_POST['email-subject'] ) ? sanitize_text_field( $_POST['email-subject'] ) : '';
		$emailBody          = ( $_POST['email-body'] ) ? wp_kses_post( $_POST['email-body'] ) : '';
		
		$fieldNames     = array();
		$validation     = false;
		$formInputArray = $this->sanitize_form_array( $_POST['qubely-form-input'] );

		foreach ( $formInputArray as $key => $value ) {
			if ( preg_match( '/[*]$/', $key ) ) {
				if ( empty( $value ) ) {
					$validation = true;
				}
				$key = str_replace( '*', '', $key );
			}
			$fieldNames[ $key ] = $value;

			$emailReceiver = apply_filters( 'qubely_custom_email_receiver', $value, $emailReceiver );
		}

		if ( $validation || ( isset( $_POST['qubely-form-has-policy'] ) && empty( $_POST['qubely-form-has-policy'] ) ) ) {
			wp_send_json( __( $formErrorMessage, 'qubely' ), 400 );
		}

		$replyToMail = $replyToName = $cc = $bcc = '';

		$emailHeaders = explode( "\n", $emailHeaders );
		foreach ( $emailHeaders as $_header ) {
			$_header = explode( ':', $_header );
			if ( count( $_header ) > 0 ) {
				if ( strtolower( $_header[0] ) == 'reply-to' ) {
					$replyToMail = isset( $_header[1] ) ? sanitize_text_field( $_header[1] ) : '';
				}
				if ( strtolower( $_header[0] ) == 'reply-name' ) {
					$replyToName = isset( $_header[1] ) ? sanitize_text_field( $_header[1] ) : '';
				}
				if ( strtolower( $_header[0] ) == 'cc' ) {
					$cc = isset( $_header[1] ) ? sanitize_text_field( $_header[1] ) : '';
				}
				if ( strtolower( $_header[0] ) == 'bcc' ) {
					$bcc = isset( $_header[1] ) ? sanitize_text_field( $_header[1] ) : '';
				}
			}
		}

		foreach ( $fieldNames as $name => $value ) {
			$value        = is_array( $fieldNames[ $name ] ) ? implode( ', ', $fieldNames[ $name ] ) : $value;
			$emailBody    = str_replace( '{{' . $name . '}}', sanitize_textarea_field( $value ), $emailBody );
			$emailSubject = str_replace( '{{' . $name . '}}', sanitize_text_field( $value ), $emailSubject );
			$replyToName  = str_replace( '{{' . $name . '}}', sanitize_text_field( $value ), $replyToName );
			$replyToMail  = str_replace( '{{' . $name . '}}', sanitize_text_field( $value ), $replyToMail );
			$cc           = str_replace( '{{' . $name . '}}', sanitize_text_field( $value ), $cc );
			$bcc          = str_replace( '{{' . $name . '}}', sanitize_text_field( $value ), $bcc );
		}

		// Subject Structure
		$siteName     = isset( $_SERVER['SERVER_NAME'] ) ? sanitize_text_field( $_SERVER['SERVER_NAME'] ) : '';
		$emailSubject = str_replace( '{{site-name}}', $siteName, $emailSubject );

		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: ' . $fromName . ' <' . $emailFrom . '>';
		$headers[] = 'Reply-To: ' . $replyToName . ' <' . $replyToMail . '>';
		$headers[] = 'Cc: ' . $cc;
		$headers[] = 'Bcc: ' . $bcc;

		// Send E-Mail Now or through error msg.
		try {
			$isMail = wp_mail( $emailFrom, $emailSubject, $emailBody, $headers );
			if ( $isMail ) {
				$responseData['status'] = 1;
				$responseData['msg']    = __( $formSuccessMessage, 'qubely' );
			} else {
				$responseData['status'] = 0;
				$responseData['msg']    = __( $formErrorMessage, 'qubely' );
			}
			wp_send_json_success( $responseData );
		} catch ( \Exception $e ) {
			$responseData['status'] = 0;
			$responseData['msg']    = $e->getMessage();
			wp_send_json_error( $responseData );
		}
	}
	
	/**
	 * Ajax add to cart button 
	 *
	 * @return boolean,void     Return false if failure, echo json on success
	 */
	public function qubely_add_to_cart() {
		$product_id = isset( $_POST['id'] ) ? sanitize_text_field( $_POST['id'] ) : 0;
		try {
			$responseData['status'] = 1;
			WC()->cart->add_to_cart( $product_id, 1 );
			wp_send_json_success( $responseData );
		} catch ( \Exception $e ) {
			$responseData['status'] = 0;
			$responseData['msg']    = $e->getMessage();
			wp_send_json_error( $responseData );
		}
	}

	/**
	 * Custom sanitization function
	 */
	public function custom_sanitization( $element = '' ) {
		$allowed_tags = array(
			'style'  => array(),
			'script' => array(),
		);
		return wp_kses( $element, $allowed_tags );
	}
}
new QUBELY_MAIN();
