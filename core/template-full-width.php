<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Qubely Template Full Width
 *
 * @package qubely
 * @since v.1.1.0
 *
 */
global $wp_version;
if ( version_compare( $wp_version, '5.9', '>=' ) && function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) { ?>
	<!doctype html>
		<html <?php language_attributes(); ?>>
		<head>
			<meta charset="<?php bloginfo( 'charset' ); ?>">
			<?php wp_head(); ?>
		</head>
		<body <?php body_class(); ?>>
		<?php wp_body_open(); ?>
			<div class="wp-site-blocks">
			<?php
				$theme      = wp_get_theme();
				$theme_slug = $theme->get( 'TextDomain' );
				echo do_blocks( '<!-- wp:template-part {"slug":"header","theme":"' . esc_attr( $theme_slug ) . '","tagName":"header","className":"site-header"} /-->' );
} else {
	get_header();
}

while ( have_posts() ) : the_post();
	the_content();
endwhile; // End of the loop.

if ( version_compare( $wp_version, '5.9', '>=' ) && function_exists( 'wp_is_block_theme' ) && true === wp_is_block_theme() ) {
	$theme      = wp_get_theme();
	$theme_slug = $theme->get( 'TextDomain' );
	echo do_blocks('<!-- wp:template-part {"slug":"footer","theme":"' . esc_attr( $theme_slug ) . '","tagName":"footer","className":"site-footer"} /-->');
	echo '</div>';
	wp_footer();
	echo '</body>';
	echo '</html>';
} else {
	get_footer();
}