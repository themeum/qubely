<?php
/**
 * Handles registering `qubely/tutor-course-list block on server`
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register`qubely/tutor-course-list` block.
 *
 * @since 1.7.0
 */
function register_block_qubely_tutor_course_list() {
	// Check if the register function exists.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		'qubely/tutor-course-list',
		array(
			'attributes' => array(
				'uniqueId'     => array(
					'type'    => 'string',
					'default' => '',
				),
                
				//general
				'taxonomyType' => array(
					'type'    => 'string',
					'default' => 'course-category',
				),
				'courseCategories' => array(
					'type'    => 'array',
					'default' => array(),
					'items'   => array(
						'type' => 'object'
                    ),
				),
				'order' => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type'    => 'string',
					'default' => 'date',
				),

				//layout
				'layout' => array(
					'type' => 'string',
					'default' => 'classic'
				),
				'column' => array(
					'type' => 'number',
					'default' => 3
				),

				//content
				'showTitle' => array(
					'type' => 'boolean',
					'default' => true
				),
				'showCategory' => array(
					'type' => 'boolean',
					'default' => true,
				),
				'showAuthor' => array(
					'type' => 'boolean',
					'default' => true
				),
				'coursesToShow' => array(
					'type' => 'number',
					'default' => 6,
				),
				//pagination
				'enablePagination' => array(
					'type' => 'boolean',
					'default' => true
				),
				'page' => array(
					'type' => 'number',
					'default' => 1,
				),
				'paginationTypography' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *'
					]]
				),
				'pagesColor' => array(
					'type' => 'string',
					'default' => '',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *{color: {{pagesColor}};}'
					]]
				),
				'pagesHoverColor' => array(
					'type' => 'string',
					'default' => 'center',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > a:hover, ' .
							'{{QUBELY}} .qubely-tutor-course-list-pagination > button:hover{color: {{pagesHoverColor}};}'
					]]
				),
				'pagesActiveColor' => array(
					'type' => 'string',
					'default' => 'center',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *.current{color: {{pagesActiveColor}};}'
					]]
				),

				'pagesbgColor' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *'
					]]
				),
				'pagesbgHoverColor' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination a:hover, ' .
							'{{QUBELY}} .qubely-tutor-course-list-pagination button:hover'
					]]
				),
				'pagesbgActiveColor' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > .current'
					]]
				),

				'pagesBorder' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *'
					]]
				),
				'pagesHoverBorder' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > a:hover, ' .
							'{{QUBELY}} .qubely-tutor-course-list-pagination > button:hover'
					]]
				),
				'pagesActiveBorder' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *.current '
					]]
				),
				'pagesShadow' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *'
					]]
				),
				'pagesHoverShadow' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > a:hover, ' .
							'{{QUBELY}} .qubely-tutor-course-list-pagination > button:hover'
					]]
				),
				'pagesActiveShadow' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *.current'
					]]
				),
				'pagesBorderRadius' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *'
					]]
				),
				'pagePadding' => array(
					'type' => 'object',
					'default' => (object) [
						'openPadding' => 1,
						'paddingType' => 'custom',
						'custom' => [
							'md' => '0 20 0 20',
						],
						'unit' => 'px'
					],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *'
					]]
				),
				'pageMargin' => array(
					'type' => 'object',
					'default' => (object) [
						'openMargin' => 1,
						'marginType' => 'custom',
						'custom' => [
							'md' => '20 7 12 7',
						],
						'unit' => 'px'
					],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'enablePagination', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-tutor-course-list-pagination > *'
					]]
				),

				//Card
				'cardBackground' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
							'selector' => '{{QUBELY}} .qubely-postgrid-style-2'
						]
					]
				),
				'cardBorder' => array(
					'type' => 'object',
					'default' => (object) array(
						'unit' => 'px',
						'widthType' => 'global',
						'global' => (object) array(
							'md' => '1',
						),
					),
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
							'selector' => '{{QUBELY}} .qubely-postgrid-style-2'
						]
					]
				),
				'cardBorderRadius' => array(
					'type' => 'object',
					'default' => (object) array(
						'unit' => 'px',
						'openBorderRadius' => true,
						'radiusType' => 'global',
						'global' => (object) array(
							'md' => 10,
						),
					),
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
							'selector' => '{{QUBELY}} .qubely-postgrid-style-2'
						]
					]
				),
				'cardSpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 25,
						'unit' => 'px'
					),
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-2:not(:last-child) {margin-bottom: {{cardSpace}};}'
						]
					]
				),
				'cardPadding' => array(
					'type' => 'object',
					'default' => (object) [
						'openPadding' => 1,
						'paddingType' => 'global',
						'unit' => 'px',
						'global' => (object) ['md' => 25],
					],
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
							'selector' => '{{QUBELY}} .qubely-postgrid-style-2'
						]
					]
				),
				'cardBoxShadow' => array(
					'type' => 'object',
					'default' => (object) array(
						'blur' => 8,
						'color' => "rgba(0,0,0,0.10)",
						'horizontal' => 0,
						'inset' => 0,
						'openShadow' => true,
						'spread' => 0,
						'vertical' => 4
					),
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
							'selector' => '{{QUBELY}} .qubely-postgrid-style-2'
						]
					]
				),

				// Typography
				'titleTypography' => array(
					'type' => 'object',
					'default' => (object) [
						'openTypography' => 1,
						'family' => "Roboto",
						'type' => "sans-serif",
						'size' => (object) ['md' => 32, 'unit' => 'px'],
					],
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]],
						'selector' => '{{QUBELY}} .qubely-postgrid-title'
					]]
				),
				'metaTypography' => array(
					'type' => 'object',
					'default' => (object) [
						'openTypography' => 1,
						'family' => "Roboto",
						'type' => "sans-serif",
						'size' => (object) ['md' => 12, 'unit' => 'px'],
					],
					'condition' => [
						(object) ['key' => 'showAuthor', 'relation' => '==', 'value' => true],
						(object) ['key' => 'showDates', 'relation' => '==', 'value' => true],
						(object) ['key' => 'showComment', 'relation' => '==', 'value' => true]
					],
					'style' => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-meta']]
				),
				'categoryTypography' => array(
					'type' => 'object',
					'default' => (object) [
						'openTypography' => 1,
						'family' => "Roboto",
						'type' => "sans-serif",
						'size' => (object) ['md' => 12, 'unit' => 'px'], 'spacing' => (object) ['md' => 1.1, 'unit' => 'px'], 'transform' => 'uppercase'
					],
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '!=', 'value' => 'none']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a'
					]]
				),

				//Image
				'showImages' => array(
					'type' => 'boolean',
					'default' => true
				),
				'enableFixedHeight' => array(
					'type' => 'boolean',
					'default' => true
				),
				'fixedHeight' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) ['selector' => '{{QUBELY}} .qubely-post-image{object-fit: cover;height: {{fixedHeight}};}']]
				),
				'imgSize' => array(
					'type'    => 'string',
					'default' => 'large',
				),
				'imageRadius' => array(
					'type' => 'object',
					'default' => (object) array(
						'unit' => 'px',
						'openBorderRadius' => true,
						'radiusType' => 'global',
						'global' => (object) array(
							'md' => 10,
						),
					),
					'style' => [(object) ['selector' => '{{QUBELY}} .qubely-post-img']]
				),
				'imageAnimation' => array(
					'type' => 'string',
					'default' => 'zoom-out'
				),

				//Add to cart
				'buttonText' => array(
					'type' => 'string',
					'default' => 'Read More'
				),
				
				// Color
				'titleColor' => array(
					'type'    => 'string',
					'default' => '#1b1b1b',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'style', 'relation' => '!=', 'value' => 4],
							(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-postgrid-title a {color: {{titleColor}};}'
					]]
				),
				'titleOverlayColor' => array(
					'type'    => 'string',
					'default' => '#fff',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'style', 'relation' => '==', 'value' => 4],
							(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-postgrid-title a {color: {{titleOverlayColor}};}'
					]]
				),
				'titleHoverColor' => array(
					'type'    => 'string',
					'default' => '#FF0096',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]],
						'selector' => '{{QUBELY}} .qubely-postgrid-title a:hover {color: {{titleHoverColor}};}'
					]]
				),
				'categoryColor' => array(
					'type'    => 'string',
					'default' => '#FF0096',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'default']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a {color: {{categoryColor}};}'
					]]
				),
				'categoryHoverColor' => array(
					'type'    => 'string',
					'default' => '#FF0096',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'default']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a:hover {color: {{categoryHoverColor}};}'
					]]
				),
				'categoryBackground' => array(
					'type'    => 'string',
					'default' => '#FF0096',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a {background: {{categoryBackground}};}'
					]]
				),
				'categoryHoverBackground' => array(
					'type'    => 'string',
					'default' => '#e00e89',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a:hover {background: {{categoryHoverBackground}};}'
					]]
				),
				'metaColor' => array(
					'type'    => 'string',
					'default' => '#9B9B9B',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'style', 'relation' => '!=', 'value' => 4]
						],
						'selector' => '{{QUBELY}} .qubely-postgrid-meta a {color: {{metaColor}};} {{QUBELY}} .qubely-postgrid-meta {color: {{metaColor}};} {{QUBELY}} .qubely-postgrid-meta span:before {background: {{metaColor}};}'
					]]
				),
				'metaOverlayColor' => array(
					'type'    => 'string',
					'default' => '#fff',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'style', 'relation' => '==', 'value' => 4]
						],
						'selector' => '{{QUBELY}} .qubely-postgrid-meta a {color: {{metaOverlayColor}};} {{QUBELY}} .qubely-postgrid-meta {color: {{metaOverlayColor}};} {{QUBELY}} .qubely-postgrid-meta span:before {background: {{metaOverlayColor}};}'
					]]
				),

				// Design
				'spacer' => 	array(
					'type' => 'object',
					'default' => (object) array(
						'spaceTop' => (object) ['md' => '10', 	'unit' => "px"],
						'spaceBottom' => (object) ['md' => '10', 'unit' => "px"],
					),
					'style' => [(object) ['selector' => '{{QUBELY}}']]
				),
				'color' => array(
					'type'    => 'string',
					'default' => '',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-post-list-content {color: {{color}};}'
					]]
				),
				'bgColor' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper'
					]]
				),
				'border' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper'
					]]
				),
				'borderRadius' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper'
					]]
				),
				'padding' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper'
					]]
				),
				'boxShadow' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper'
					]]
				),

				// Spacing
				'columnGap' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 30,
						'unit' => 'px'
					),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'layout', 'relation' => '==', 'value' => 2]],
						'selector' => '{{QUBELY}} .qubely-postgrid-column {grid-column-gap: {{columnGap}};}, {{QUBELY}} .qubely-postgrid-column {grid-row-gap: {{columnGap}};}'
					]]
				),
				'titleSpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 10,
						'unit' => 'px'
					),
					'style' => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-title {padding-bottom: {{titleSpace}};}']]
				),
				'categorySpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 5,
						'unit' => 'px'
					),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'default']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category {display:inline-block;padding-bottom: {{categorySpace}};}'
					]]
				),
				'metaSpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 10,
						'unit' => 'px'
					),
					'style' => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-meta {padding-bottom: {{metaSpace}};}']]
				),
				'globalZindex' => array(
					'type' => 'string',
					'default' => '0',
					'style' => [(object) ['selector' => '{{QUBELY}} {z-index:{{globalZindex}};}']]
				),
				'hideTablet' => array(
					'type' => 'boolean',
					'default' => false,
					'style' => [(object) ['selector' => '{{QUBELY}}{display:none;}']]
				),
				'hideMobile' => array(
					'type' => 'boolean',
					'default' => false,
					'style' => [(object) ['selector' => '{{QUBELY}}{display:none;}']]
				),
				'globalCss' => array(
					'type' => 'string',
					'default' => '',
					'style' => [(object) ['selector' => '']]
                ),
			),
			'render_callback' => 'render_block_qubely_tutor_course_list'
		)
	);
}

/**
 * Pagination Bar
 */
function tutor_pagination_bar( $max_pages, $current_page ) {
	if ( $max_pages > 1 ) {
		$big = 9999999;
		return paginate_links( array(
			'base'      => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format'    => '?paged=%#%',
			'current'   => $current_page,
			'total'     => $max_pages,
			'prev_text' => sprintf( __( '%1$s Prev', 'qubely' ), "<span class='fas fa-angle-left'></span>" ),
			'next_text' => sprintf( __( 'Next %1$s', 'qubely' ), "<span class='fas fa-angle-right'></span>" ),
		));
	}
}

/**
 * Render callback
 */
function render_block_qubely_tutor_course_list( $att ) {

    // Get settings from editor
    $layout 	  = isset( $att['layout'] ) ? sanitize_text_field( $att['layout'] ) : 'classic';
	$uniqueId 	  = isset( $att['uniqueId'] ) ? sanitize_text_field( $att['uniqueId'] ) : '';
	$className 	  = isset( $att['className'] ) ? sanitize_text_field( $att['className'] ) : '';
	$column 	  = isset( $att['column'] ) ? absint( $att['column'] ) : 3;
	$numbers 	  = isset( $att['coursesToShow'] ) ? absint( $att['coursesToShow'] ) : 3;
	$showCategory = isset( $att['showCategory'] ) ? rest_sanitize_boolean( $att['showCategory'] ) : true;
	$showTitle 	  = isset( $att['showTitle'] ) ? rest_sanitize_boolean( $att['showTitle'] ) : true;
	$showAuthor   = isset( $att['showAuthor'] ) ? rest_sanitize_boolean( $att['showAuthor'] ) : true;
	$buttonText   = isset( $att['buttonText'] ) ? sanitize_text_field( $att['buttonText'] ) : 'Read More';
	$showImages   = isset( $att['showImages'] ) ? rest_sanitize_boolean( $att['showImages'] ) : true;
	$imgSize 	  = isset( $att['imgSize'] ) ? sanitize_text_field( $att['imgSize'] ) : 'large';
	$order 		  = isset( $att['order'] ) ? sanitize_text_field( $att['order'] ) : 'DESC';
	$orderBy 	  = isset( $att['orderBy'] ) ? sanitize_text_field( $att['orderBy'] ) : 'date';
	$taxonomyType = isset( $att['taxonomyType'] ) ? sanitize_text_field( $att['taxonomyType'] ) : 'course-category';

    // Query arguements.
    $paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;

    $args = array(
        'post_type'      => tutor()->course_post_type,
        'post_status'    => 'publish',
        'posts_per_page' => 6,
        'paged'          => $paged,
        'tax_query'      => array(
            'relation' => 'AND',
        )
    );

	$query = new WP_Query( $args );
?>
<?php if ( $query->have_posts() ) : ?>
	<?php do_action('tutor_qubely/before/course_list'); ?>
	<!-- .qubely-tutor-course-grid -->
	<section class="qubely-tutor-course-grid">
		<?php while ( $query->have_posts() ) :
			$query->the_post(); ?>
		<!-- .qubely-tutor-course-card -->
		<div class="qubely-tutor-course-card">
			<div class="qubely-tutor-course-card-header">
				<a href="<?php the_permalink(); ?>">
				<?php if ( has_post_thumbnail( get_the_ID() ) ) : ?>
					<img src="<?php the_post_thumbnail_url( 'full' ); ?>" alt="<?php the_title(); ?>" loading="lazy" />
				<?php endif; ?>
				</a>
				<div class="course-card-header-meta">
					<?php 
						$course_id     = get_the_ID();
                        $is_wishlisted = tutor_utils()->is_wishlisted( $course_id );
                        $has_wish_list = '';
                        if ( $is_wishlisted ) {
                            $has_wish_list = 'has-wish-listed';
                        }

                        $action_class = '';
                        if ( is_user_logged_in() ) {
                        	$action_class = apply_filters( 'tutor_wishlist_btn_class', 'tutor-course-wishlist-btn' );
                        } else {
                            $action_class = apply_filters( 'tutor_popup_login_class', 'cart-required-login' );
                        }
						?>
					<span class="level"><?php echo get_tutor_course_level(); ?></span>
					<span class="wishlist"><a href="javascript:;" class="tutor-icon-fav-line <?php echo $action_class; ?> <?php echo $has_wish_list; ?>" data-course-id="<?php echo $course_id; ?>"></a></span>
				</div>
			</div>
			<!-- end /.qubely-tutor-course-card-header -->
			<div class="qubely-tutor-course-card-body">
				<div class="course-card-rating">
					<?php
						$course_rating = tutor_utils()->get_course_rating();
						tutor_utils()->star_rating_generator( $course_rating->rating_avg );
					?>
					<span class="count">
					<?php
						if ( $course_rating->rating_avg > 0 ) {
							echo apply_filters( 'tutor_course_rating_average', $course_rating->rating_avg );
							echo ' (' . apply_filters( 'tutor_course_rating_count', $course_rating->rating_count ) . ')';
						}
					?>
					</span>
				</div>
				<div class="course-card-title">
					<h4>
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</h4>
				</div>
				<div class="course-card-meta">
					<?php
						$course_duration = get_tutor_course_duration_context();
						$course_students = tutor_utils()->count_enrolled_users_by_course();
					?>
					<div class="enrolled"><i class="tutor-icon-user"></i><span><?php echo $course_students; ?></span></div>
					<div class="duration"><i class="tutor-icon-clock"></i> <span><?php echo $course_duration; ?></span></div>
				</div>
				<div class="course-card-aut-cat">
					<?php 
						$profile_url   = tutor_utils()->profile_url( get_the_author_meta( 'ID' ) );
						$author_avatar = tutor_utils()->get_tutor_avatar( get_the_author_meta( 'ID' ) );
					?>
					<div class="avatar">
						<a href="<?php echo $profile_url; ?>">
							<?php echo $author_avatar; ?>
						</a>
					</div>
					<div class="author">
						<span><?php esc_html_e( 'by', 'qubely' ); ?></span>
						<a href="<?php echo $profile_url; ?>"><?php echo get_the_author(); ?></a>
					</div>
					<div class="category">
						<?php 
							$course_categories = get_tutor_course_categories();
							if ( ! empty( $course_categories ) && is_array( $course_categories ) && count( $course_categories ) ) : ?>
								<span><?php esc_html_e( 'In', 'qubely' ) ?></span>
							<?php
								foreach ( $course_categories as $course_category ) {
									$category_name = $course_category->name;
									$category_link = get_term_link( $course_category->term_id );
									echo "<a href='$category_link'>$category_name </a>";
								}
							endif;
						?>
					</div>
				</div>
			</div>
			<!-- end /.qubely-tutor-course-card-body -->
			<div class="qubely-tutor-course-card-footer">
				<?php tutor_course_loop_price(); ?>
			</div>
			<!-- end /.qubely-tutor-course-card-footer -->
		</div>
		<!-- end /.qubely-tutor-course-card -->
	<?php endwhile; ?>
</section>
<!-- end /.qubely-tutor-course-grid -->
<?php endif;
wp_reset_postdata();
}

if ( ! defined( 'QUBELY_PRO_VERSION' ) && class_exists( '\TUTOR\Utils' ) ) {
	add_action( 'init', 'register_block_qubely_tutor_course_list', 100 );
}
