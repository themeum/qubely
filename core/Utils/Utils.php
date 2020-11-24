<?php
/**
 * Handles utility stuff
 * 
 * @package Qubely
 */

namespace Qubely\Utils;

defined( 'ABSPATH' ) || exit;

/**
 * Utils class
 */
class Utils {

    /**
	 * Load SvgShapes
	 *
	 * @since 1.0.0
	 */
	public static function get_svg_shapes() {
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
	public function get_svg_divider() {
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
	 * Get post count.
	 *
	 * @since 1.6.1
	 */
	public static function get_post_count() {
		$post_types       = self::get_post_types();
		$post_count_array = array();

		foreach ( $post_types as $value ) {
			$post_type                      = $value['value'];
			$post_count_array[ $post_type ] = wp_count_posts( $post_type )->publish;
		}
		return $post_count_array;
	}

	/**
	 * Get all taxonomies.
	 *
	 * @since 1.0.9
	 */
	public static function get_all_taxonomy() {
		$post_types     = self::get_post_types();
		$taxonomy_array = array();

		foreach ( $post_types as $value ) {
			$post_type  = $value['value'];
			$taxonomies = get_object_taxonomies( $post_type, 'objects' );
			$data       = array();

			foreach ( $taxonomies as $tax_slug => $tax ) {
				if ( ! $tax->public || ! $tax->show_ui ) {
					continue;
				}
				$data[ $tax_slug ] = $tax;
				$terms             = get_terms( $tax_slug );
				$related_tax       = array();

				if ( ! empty( $terms ) ) {
					foreach ( $terms as $term ) {
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
}