<?php
/**
 * Adds different helper functions
 * 
 * @package Qubely
 */

defined( 'ABSPATH' ) || exit;

/**
 * Determine if current single page is WP Page Builder Page
 * 
 * @return bool|false|int
 */
function is_qubely_single() {
    $post_id = get_the_ID();

    if ( ! $post_id ) {
        return false;
    }
    return $post_id;
}

/**
 * Determine if wppb editor is open
 *
 * @since V.1.0.0
 * @return bool
 *
 * @since v.1.0.0
 */
function is_editor_screen() {
    if ( ! empty( $_GET['action'] ) && $_GET['action'] === 'wppb_editor' ) {
        return true;
    }
    return false;
}

/**
 *
 * Return reference id
 *
 * @since 1.2.5
 * @return bool
 */
function reference_id( $parse_blocks ) {
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
 * Add orderby
 *
 * @param [type] $params
 * 
 * @return string|mixed
 */
function qubely_blocks_add_orderby( $params ) {

	$params['orderby']['enum'][] = 'rand';
	$params['orderby']['enum'][] = 'menu_order';

	return $params;
}

/**
 * Set font import to the top of the CSS file
 * 
 * @since 1.0.2
 */
function set_import_url_to_top_css( $get_css = '' ) {
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