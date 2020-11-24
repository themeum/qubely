<?php
/**
 * Handles all api callbacks
 * 
 * @package Qubely
 */

namespace Qubely\Api;

use Qubely\Utils\Utils;

defined( 'ABSPATH' ) || exit;

/**
 * Callback class
 */
class Callbacks {

    /**
     * Protected $option_keyword
     *
     * @var string
     */
	protected $option_keyword = 'qubely_global_options';

    /**
     * Author
     *
     * @param [type] $object
     * @return mixed
     */
    public function get_author_info( $object ) {
        $author = ( isset( $object['author'] ) ) ? $object['author'] : '';
    
        $author_data['display_name'] = get_the_author_meta( 'display_name', $author ) ;
        $author_data['author_link']  = get_author_posts_url( $author );
        
        return $author_data;
    }
    
    /**
     * Comment info
     *
     * @param [type] $object
     * @return int|mixed
     */
    public function get_comment_info( $object ) {
        $comments_count = wp_count_comments( $object['id'] );
        return $comments_count->total_comments;
    }
    
    /**
     * Category list
     * 
     * @return mixed
     */
    public function get_category_list( $object ) {
        $taxonomies = get_post_taxonomies( $object['id'] );
        if ( 'post' === get_post_type() ) {
            return get_the_category_list( esc_html__(' '), '', $object['id'] );
        } else {
            if ( ! empty( $taxonomies ) ) {
                return get_the_term_list( $object['id'], $taxonomies[0], ' ' );
            }
        }
    }
    
    /**
     * Featured image
     *
     * @param [type] $object
     * @return object|mixed
     */
    public function get_featured_image_url( $object ) {
    
        $featured_images = array();
        if ( ! isset( $object['featured_media'] ) ) {
            return $featured_images;
        } else {
            $image = wp_get_attachment_image_src( $object['featured_media'], 'full', false );
            if ( is_array( $image ) ) {
                $featured_images['full']      = $image;
                $featured_images['landscape'] = wp_get_attachment_image_src( $object['featured_media'], 'qubely_landscape', false );
                $featured_images['portraits'] = wp_get_attachment_image_src( $object['featured_media'], 'qubely_portrait', false );
                $featured_images['thumbnail'] =  wp_get_attachment_image_src( $object['featured_media'], 'qubely_thumbnail', false );
    
                $image_sizes = Utils::get_all_image_sizes();
                foreach ( $image_sizes as $key => $value ) {
                    $size = $value['value'];
                    $featured_images[$size] = wp_get_attachment_image_src(
                        $object['featured_media'],
                        $size,
                        false
                    );
                }
                return $featured_images;
            }
        }
    }
    
    /**
     * Excerpt
     *
     * @param [type] $object
     * @return string
     */
    public function get_excerpt( $object ) {
        $excerpt = wp_trim_words( get_the_excerpt( $object['id'] ) );
        if ( ! $excerpt ) {
            $excerpt = null;
        }
        return $excerpt;
    }

    /**
     * Add qubely options
     *
     * @param [type] $request
     * @return void
     */
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

    /**
     * Get qubely options
     *
     * @return void
     */
	public function get_qubely_options() {
		$options = get_option( 'qubely_options' );
		wp_send_json_success( $options );
	}

    /**
     * Append qubely css callback
     *
     * @param [type] $request
     * @return void
     */
	public function append_qubely_css_callback( $request ) {
		try {
			global $wp_filesystem;
			if ( ! $wp_filesystem ) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
			}
			$params  = $request->get_params();
			$css     = $params['css'];
			$post_id = ( int ) sanitize_text_field( $params['post_id'] );
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

    /**
     * Qubely get content
     *
     * @param [type] $request
     * 
     * @return void
     */
	public function qubely_get_content( $request ) {
		$params = $request->get_params();
		try {
			if ( isset( $params['postId'] ) ) {
				return array(
					'success' => true,
					'data'    => get_post( $params['postId'] )->post_content,
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
     * 
     * @param [type] $request
     * 
     * @return array
	 */
	public function update_global_option( $request ) {
		try {
			$params = $request->get_params();
			if ( ! isset( $params['settings'] ) ) {
				throw new Exception( 'Settings parameter is missing!' );
			}

			$settings = $params['settings'];

			if ( get_option( $this->option_keyword ) === false ) {
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
			$settings = $settings === false ? json_decode( '{}' ) : json_decode( $settings );
			$palette  = get_theme_support( 'qubely-color-palette' );

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
	public function save_block_css( $request ){
		try {
			global $wp_filesystem;
			if ( ! $wp_filesystem ) {
				require_once ABSPATH . 'wp-admin/includes/file.php';
			}

			$params        = $request->get_params();
			$post_id       = ( int ) sanitize_text_field( $params['post_id'] );
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

				if ( $is_previewing === true ) {
					$filename     = 'qubely-preview.css';
					$jsonfilename = 'qubely-preview.json';
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
				// If fail to save css in directory, then it will show a message to user.
				if ( ! $wp_filesystem->put_contents( $dir . $filename, $import_first ) ) {
					throw new Exception( __( 'CSS can not be saved due to permission!!!', 'qubely' ) );
				}

				// If fail to save css in directory, then it will show a message to user
				if ( ! $wp_filesystem->put_contents( $dir . $jsonfilename, $qubely_block_json ) ) {
					throw new Exception( __( 'JSON can not be saved due to permission!!!', 'qubely' ) );
				}
			} else {
				if ( $is_previewing === false ) {
					delete_post_meta( $post_id, '_qubely_css' );
					delete_post_meta( $post_id, '_qubely_interaction_json' );
					$this->delete_post_resource( $post_id );
				}
			}

			$success_message = 'Qubely preview css file has been updated.';
			// set block meta
			if ( $is_previewing==false ) {
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
	 * Delete post releated data
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
}