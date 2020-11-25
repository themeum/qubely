<?php
/**
 * Handles loading page templates
 * 
 * @package Qubely
 */

namespace Qubely\Templates;

defined( 'ABSPATH' ) || exit;

/**
 * Template class
 */
class Template {

	/**
	 * Register
	 * @since 1.1.0
	 */
	public function register() {
		//Include Qubely default template without wrapper
		add_filter( 'template_include', array( $this, 'template_include' ) );

		//Add Qubely supported Post type in page template
        $post_types = get_post_types();
		if ( ! empty( $post_types ) ){
			foreach ( $post_types as $post_type ) {
				add_filter( "theme_{$post_type}_templates", array( $this, 'add_qubely_template' ) );
			}
		}
	}

	/**
	 * Template include
	 * 
	 * @param $template
	 * 
	 * @since 1.1.0
	 */
	public function template_include( $template ) {
		if ( is_singular() ) {
			$page_template = get_post_meta( get_the_ID(), '_wp_page_template', true );
			if ( $page_template === 'qubely_full_width' ) {
				$template = QUBELY_DIR_PATH . 'core/Templates/template-full-width.php';
            }
            if ( $page_template === 'qubely_canvas' ) {
				$template = QUBELY_DIR_PATH . 'core/Templates/template-canvas.php';
			}
		}
		return $template;
	}

	/**
	 * Add templates
	 * 
	 * @param $post_templates
	 * 
	 * @since 1.1.0
	 */
	public function add_qubely_template( $post_templates ){
		$post_templates['qubely_full_width'] = __( 'Qubely Full Width', 'qubely' );
		$post_templates['qubely_canvas']     = __( 'Qubely Canvas', 'qubely' );
		return $post_templates;
	}
}
