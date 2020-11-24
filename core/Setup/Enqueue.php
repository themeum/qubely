<?php
/**
 * Handles enqueuing all assets and scripts
 * 
 * @package Qubely
 */

namespace Qubely\Setup;

use Qubely\Utils\Utils;

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue class
 */
class Enqueue {

    /**
     * Register
     */
    public function register() {
        // Common style
		$this->enqueue_block_css();
		add_action( 'wp_footer', array( $this, 'qubely_inline_footer_scripts' ) );
		// Add Styles and Scripts
		add_action( 'wp_enqueue_scripts', array( $this, 'qubely_enqueue_style' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'qubely_enqueue_scripts' ) );
		// Editor Load
		add_action( 'admin_enqueue_scripts', array( $this, 'qubely_admin_assets' ) );
        // Editor Load
		add_action( 'enqueue_block_editor_assets', array( $this, 'qubely_editor_assets' ) );
		// Load Inline Scripts
		add_action( 'admin_head', array( $this, 'qubely_inline_admin_header_scripts' ), 0 );
		// qubely global container width
		add_action( 'wp_enqueue_scripts', array( $this, 'qubely_global_container_width' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'qubely_global_container_width' ) );
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
	 * Load Editor Styles and Scripts
	 *
	 * @since 1.0.0
	 */
	public function qubely_editor_assets() {
		wp_enqueue_script( 'qubely-blocks-js', QUBELY_DIR_URL . 'assets/js/qubely.dev.js', array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), QUBELY_VERSION, true );

		$palette = get_theme_support( 'qubely-color-palette' );
		$palette = array_replace( array( '#062040', '#566372', '#2084F9', '#F3F3F3', '#EEEEEE', '#FFFFFF' ), ( $palette ? $palette[0] : array() ) );

		$options                     = get_option( 'qubely_options' );
		$qubely_gmap_api_key         = isset( $options['qubely_gmap_api_key'] ) ? $options['qubely_gmap_api_key'] : '';
		$qubely_recaptcha_site_key   = isset( $options['qubely_recaptcha_site_key'] ) ? $options['qubely_recaptcha_site_key'] : '';
		$mc_key                      = isset( $options['mailchimp_api_key'] ) ? $options['mailchimp_api_key'] : '';
		$qubely_recaptcha_secret_key = isset( $options['qubely_recaptcha_secret_key'] ) ? $options['qubely_recaptcha_secret_key'] : '';
		$enable_global_settings      = isset( $options['import_with_global_settings'] ) ? $options['import_with_global_settings'] : false;
		$protocols                   = array( 'http://', 'https://', 'http://www', 'https://www', 'www' );
		wp_localize_script(
			'qubely-blocks-js',
			'qubely_admin',
			array(
				'plugin'                      => QUBELY_DIR_URL,
				'ajax'                        => admin_url( 'admin-ajax.php' ),
				'pro_enable'                  => defined( 'QUBELY_PRO_VERSION' ) ? true : false,
				'shapes'                      => Utils::get_svg_shapes(),
				'post_type'                   => Utils::get_post_types(),
				'all_taxonomy'                => Utils::get_all_taxonomy(),
				'image_sizes'                 => Utils::get_all_image_sizes(),
				'palette'                     => $palette,
				'overwriteTheme'              => true,
				'qubely_gmap_api_key'         => $qubely_gmap_api_key,
				'qubely_recaptcha_site_key'   => $qubely_recaptcha_site_key,
				'qubely_recaptcha_secret_key' => $qubely_recaptcha_secret_key,
				'site_url'                    => site_url(),
				'admin_url'                   => admin_url(),
				'actual_url'                  => str_replace( $protocols, '', site_url() ),
				'import_with_global_settings' => $enable_global_settings,
                'publishedPosts'              => wp_count_posts()->publish,
                'publishedPosts_count'        => Utils::get_post_count(),
				'mc_key'                      => $mc_key,
			)
		);
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
		wp_enqueue_style( 'qubley-animated-headline-style', QUBELY_DIR_URL . 'assets/css/qubely.animatedheadline.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-style-min', QUBELY_DIR_URL . 'assets/css/style.min.css', false, QUBELY_VERSION );
		#END_REPLACE

		wp_enqueue_style( 'font-awesome', QUBELY_DIR_URL . 'assets/css/font-awesome.min.css', false, QUBELY_VERSION );
		wp_enqueue_script( 'qubely-magnific-popup', QUBELY_DIR_URL . 'assets/js/qubely.magnific-popup.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'jquery-animatedHeadline', QUBELY_DIR_URL . 'assets/js/jquery.animatedheadline.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-map', QUBELY_DIR_URL . 'assets/js/blocks/map.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-contactform', QUBELY_DIR_URL . 'assets/js/blocks/contactform.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-common', QUBELY_DIR_URL . 'assets/js/common-script.js', array( 'jquery' ), QUBELY_VERSION, true );

		wp_register_style( 'qubely-options', QUBELY_DIR_URL . 'assets/css/options.css', false, QUBELY_VERSION );
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
			wp_enqueue_style( 'qubley-animated-headline-style', QUBELY_DIR_URL . 'assets/css/qubely.animatedheadline.css', false, QUBELY_VERSION );
			wp_enqueue_style( 'qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION );
			wp_enqueue_style( 'qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION );
			wp_enqueue_style( 'qubely-style-min', QUBELY_DIR_URL . 'assets/css/style.min.css', false, QUBELY_VERSION );
			#END_REPLACE

			wp_enqueue_style( 'qubely-font-awesome', QUBELY_DIR_URL . 'assets/css/font-awesome.min.css', false, QUBELY_VERSION );
		}
	}

	public function qubely_enqueue_scripts() {
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

		$blocks_meta_data = get_post_meta( get_the_ID(), '__qubely_available_blocks', true );
		$blocks_meta_data = unserialize( $blocks_meta_data );

		if ( is_array( $blocks_meta_data ) && count( $blocks_meta_data ) ) {
			$available_blocks = $blocks_meta_data['available_blocks'];
			$has_interaction  = $blocks_meta_data['interaction'];
			$has_animation    = $blocks_meta_data['animation'];
			$has_parallax     = $blocks_meta_data['parallax'];

			if ( in_array( 'qubely/animatedheadline', $available_blocks ) ) {
				wp_enqueue_script( 'qubley-animated-headline-script', QUBELY_DIR_URL . 'assets/js/jquery.animatedheadline.js', array( 'jquery' ), QUBELY_VERSION, true );
			}

			if ( in_array( 'qubely/map', $available_blocks ) ) {
				wp_enqueue_script( 'qubely-block-map', QUBELY_DIR_URL . 'assets/js/blocks/map.js', array( 'jquery' ), QUBELY_VERSION, true );
			}

			if ( in_array( 'qubely/videopopup', $available_blocks ) || in_array( 'qubely/gallery', $available_blocks ) ) {
				wp_enqueue_script( 'qubely-magnific-popup-script', QUBELY_DIR_URL . 'assets/js/qubely.magnific-popup.js', array( 'jquery' ), QUBELY_VERSION );
			}

			if ( in_array( 'qubely/contactform', $available_blocks ) || in_array( 'qubely/form', $available_blocks ) ) {
				wp_enqueue_script( 'qubely-block-contactform', QUBELY_DIR_URL . 'assets/js/blocks/contactform.js', array( 'jquery' ), QUBELY_VERSION );
			}

			if ( in_array( 'qubely/imagecomparison', $available_blocks ) ) {
				wp_enqueue_script( 'qubely-block-image-comparison', QUBELY_DIR_URL . 'assets/js/blocks/image-comparison.js', array(), QUBELY_VERSION );
			}

			if ( $has_interaction ) {
				wp_enqueue_script( 'qubely-interaction', QUBELY_DIR_URL . 'assets/js/interaction.js', array( 'jquery' ), QUBELY_VERSION, true );
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
				in_array( 'qubely/postgrid', $available_blocks )
			) {
				wp_enqueue_script( 'qubely-block-common', QUBELY_DIR_URL . 'assets/js/common-script.js', array( 'jquery' ), QUBELY_VERSION, true );
			}
		} else {
			$post    = null;
			$wp_post = get_post( $post );
			if ( $wp_post instanceof WP_Post ) {
				$post = $wp_post->post_content;
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/animatedheadline' . ' ' ) ) {
				wp_enqueue_script( 'qubley-animated-headline-script', QUBELY_DIR_URL . 'assets/js/jquery.animatedheadline.js', array( 'jquery' ), QUBELY_VERSION, true );
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/map' . ' ' ) ) {
				wp_enqueue_script( 'qubely-block-map', QUBELY_DIR_URL . 'assets/js/blocks/map.js', array( 'jquery' ), QUBELY_VERSION, true );
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/videopopup' . ' ' ) || false !== strpos( $post, '<!-- wp:' . 'qubely/gallery' . ' ' ) ) {
				wp_enqueue_script( 'qubely-magnific-popup-script', QUBELY_DIR_URL . 'assets/js/qubely.magnific-popup.js', array( 'jquery' ), QUBELY_VERSION );
			}

			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/contactform' . ' ' ) || false !== strpos( $post, '<!-- wp:' . 'qubely/form' . ' ' ) ) {
				wp_enqueue_script( 'qubely-block-contactform', QUBELY_DIR_URL . 'assets/js/blocks/contactform.js', array( 'jquery' ), QUBELY_VERSION );
			}
			if ( false !== strpos( $post, '<!-- wp:' . 'qubely/imagecomparison' . ' ' ) ) {
				wp_enqueue_script( 'qubely-block-image-comparison', QUBELY_DIR_URL . 'assets/js/blocks/image-comparison.js', array(), QUBELY_VERSION );
			}

			wp_enqueue_script( 'qubely-block-common', QUBELY_DIR_URL . 'assets/js/common-script.js', array( 'jquery' ), QUBELY_VERSION, true );
			wp_enqueue_script( 'qubely-interaction', QUBELY_DIR_URL . 'assets/js/interaction.js', array( 'jquery' ), QUBELY_VERSION, true );
		}
	}

	/**
	 * Load Inline Footer Script
	 *
	 * @since 1.3.0
	 */
	public function qubely_inline_footer_scripts() {        ?>
		<script>
			// Set Preview CSS
			document.addEventListener("DOMContentLoaded", function() {
				const cussrent_url = window.location.href;
				if (cussrent_url.includes('preview=true')) {
					let cssInline = document.createElement('style');
					cssInline.type = 'text/css';
					cssInline.id = 'qubely-block-js-preview';
					cssInline.innerHTML =JSON.parse( localStorage.getItem('qubelyCSS'));
					window.document.getElementsByTagName("head")[0].appendChild(cssInline);
				}
			})
		</script>
		<?php
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
	 * Enqueue post style
	 * If css save option fileSystem then enqueue file
	 * Or add inline to the header
	 */
	public function enqueue_block_css() {
		$option_data = get_option( 'qubely_options' );
		$css_save_as = isset( $option_data['css_save_as'] ) ? $option_data['css_save_as'] : 'wp_head';
		if ( $css_save_as == 'filesystem' ) {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_block_css_file' ) );
		} else {
			add_action( 'wp_head', array( $this, 'add_block_inline_css' ), 100 );
		}
	}

	/**
	 * Enqueue block css file
	 * Check if css path exists and it has current post page
	 * Then enqueue file
	 */
	public function enqueue_block_css_file() {

		$post_id        = is_qubely_single();
		$upload_dir     = wp_get_upload_dir();
		$upload_css_dir = trailingslashit( $upload_dir['basedir'] );

		$css_path       = $upload_css_dir . 'qubely/qubely-css-{$post_id}.css';
		$json_path      = $upload_css_dir . 'qubely/qubely-json-{$post_id}.json';

		if ( isset( $_GET['preview'] ) && $_GET['preview'] === true ) {
			$css_path  = $upload_css_dir . 'qubely/qubely-preview.css';
			$json_path = $upload_css_dir . 'qubely/qubely-preview.json';

			/**
			 * equeue static CSS 
			 * and Scripts
			 */
			$this->add_static_css();

			if ( file_exists( $css_path ) ) {
				$css_dir_url = trailingslashit( $upload_dir['baseurl'] );
				$css_url     = $css_dir_url . "qubely/qubely-preview.css";
				if ( ! is_editor_screen() ) {
					wp_enqueue_style( "qubely-post-preview", $css_url, false, QUBELY_VERSION );
				}

				$blockJson = file_get_contents( $json_path );
				if ( $blockJson != '{}' ) {
					echo '<script type="text/javascript"> var qubelyInteraction = ' . $blockJson . '</script>';
				}
			}
		} else {
			if ( file_exists( $css_path ) ) {
				$css_dir_url = trailingslashit( $upload_dir['baseurl'] );
				$css_url     = $css_dir_url . "qubely/qubely-css-{$post_id}.css";
				if ( ! is_editor_screen() ) {
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
					echo '<script type="text/javascript"> var qubelyInteraction = ' . $blockJson . '</script>';
				}
			}
		}
	}

    /**
     * Add reusable css
     *
     * @return void
     */
	public function add_reusable_css() {
		$post_id        = is_qubely_single();
		$upload_dir     = wp_get_upload_dir();
		$upload_css_dir = trailingslashit( $upload_dir['basedir'] );
		if ( $post_id ) {
			$content_post = get_post( $post_id );
			if ( isset( $content_post->post_content ) ) {
				$content      = $content_post->post_content;
				$parse_blocks = parse_blocks( $content );
				$css_id       = reference_id( $parse_blocks );
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
		wp_enqueue_style( 'qubley-animated-headline-style', QUBELY_DIR_URL . 'assets/css/qubely.animatedheadline.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION );
		wp_enqueue_style( 'qubely-style-min', QUBELY_DIR_URL . 'assets/css/style.min.css', false, QUBELY_VERSION );
		#END_REPLACE
		wp_enqueue_style( 'font-awesome', QUBELY_DIR_URL . 'assets/css/font-awesome.min.css', false, QUBELY_VERSION );
		
		//Scripts
		wp_enqueue_script( 'qubely-magnific-popup', QUBELY_DIR_URL . 'assets/js/qubely.magnific-popup.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'jquery-animatedHeadline', QUBELY_DIR_URL . 'assets/js/jquery.animatedheadline.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-map', QUBELY_DIR_URL . 'assets/js/blocks/map.js', array( 'jquery' ), QUBELY_VERSION, true );
		wp_enqueue_script( 'qubely-block-img-comparison', QUBELY_DIR_URL . 'assets/js/blocks/image-comparison.js', array( 'jquery' ), QUBELY_VERSION, true );
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
		if ( isset($_GET['preview'] ) && $_GET['preview'] === true ) {
			$css_path  = $upload_css_dir . 'qubely/qubely-preview.css';
			$json_path = $upload_css_dir . 'qubely/qubely-preview.json';

			$this->add_static_css();

			if ( file_exists( $css_path ) ) {
				$blockCss = file_get_contents( $css_path );
				echo '<style type="text/css">' . $blockCss . '</style>';
			}
			if ( file_exists( $json_path ) ) {
				$blockJson = file_get_contents( $json_path );
				if ( $blockJson != '{}' ) {
					echo '<script type="text/javascript"> var qubelyInteraction = ' . $blockJson . '</script>';
				}
			} 
		} else {
			$post_id = is_qubely_single();
			if ( $post_id ) {
				$css_path  = $upload_css_dir . "qubely/qubely-css-{$post_id}.css";
				$json_path = $upload_css_dir . "qubely/qubely-json-{$post_id}.json";
	
				if ( file_exists( $css_path ) ) {
					$blockCss = file_get_contents( $css_path );
					echo '<style type="text/css">' . $blockCss . '</style>';
				} else {
					echo '<style type="text/css">' . get_post_meta( get_the_ID(), '_qubely_css', true ) . '</style>';
				}
	
				if ( ! file_exists( $json_path ) ) {
					$this->print_interaction_json_to_header();
				} else {
					$blockJson = file_get_contents( $json_path );
					if ( $blockJson != '{}' ) {
						echo '<script type="text/javascript"> var qubelyInteraction = ' . $blockJson . '</script>';
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
			echo '<script type="text/javascript"> var qubelyInteraction = ' . $interactionJson . '</script>';
		}
	}
}