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
				//Seperator
				'showSeparator' => array(
					'type' => 'boolean',
					'default' => true
				),

				'separatorColor' => array(
					'type'    => 'string',
					'default' => '#e5e5e5',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'style', 'relation' => '==', 'value' => 1],
							(object) ['key' => 'showSeparator', 'relation' => '==', 'value' => true]
						],
						'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-1:not(:last-child) {border-bottom-color: {{separatorColor}};}'
					]]
				),

				'separatorHeight' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 1,
						'unit' => 'px'
					),
					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'style', 'relation' => '==', 'value' => 1],
								(object) ['key' => 'showSeparator', 'relation' => '==', 'value' => true]
							],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-1:not(:last-child){border-bottom-style: solid;border-bottom-width: {{separatorHeight}};}'
						],
					],
				),

				'separatorSpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 20,
						'unit' => 'px'
					),
					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'style', 'relation' => '==', 'value' => 1],
								(object) ['key' => 'showSeparator', 'relation' => '==', 'value' => true]
							],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-1:not(:last-child){padding-bottom: {{separatorSpace}};margin-bottom: {{separatorSpace}};}'
						],
					],
				),

				//card
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

				//scart
				'stackBg' => array(
					'type' => 'object',
					'default' => (object) [],
					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content'
						],
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-content'
						]
					]
				),
				'stackBorderRadius' => array(
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
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content'
						],
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-content'
						]
					]
				),
				'stackWidth' => array(
					'type' => 'object',
					'default' => (object) array(),

					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-img + .qubely-post-grid-content {width: {{stackWidth}};}'
						]
					]
				),
				'stackSpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 40,
						'unit' => 'px'
					),
					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3:not(:last-child) {margin-bottom: {{stackSpace}};}'
						]
					]

				),
				'stackPadding' => array(
					'type' => 'object',
					'default' => (object) [
						'openPadding' => 1,
						'paddingType' => 'global',
						'unit' => 'px',
						'global' => (object) ['md' => 30],
					],
					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content'
						],
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-wrapper .qubely-post-grid-content'
						]
					]
				),
				'stackBoxShadow' => array(
					'type' => 'object',
					'default' => (object) array(
						'blur' => 28,
						'color' => "rgba(0,0,0,0.15)",
						'horizontal' => 0,
						'inset' => 0,
						'openShadow' => true,
						'spread' => -20,
						'vertical' => 34
					),
					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content'
						],
						(object) [
							'condition' => [
								(object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
								(object) ['key' => 'style', 'relation' => '==', 'value' => 3]
							],
							'selector' => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-content'
						]
					]
				),

				//typography
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

				//image
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

				//readmore link
				'buttonText' => array(
					'type' => 'string',
					'default' => 'Read More'
				),
				'readmoreStyle' => array(
					'type' => 'string',
					'default' => 'fill'
				),
				'readmoreSize' => array(
					'type' => 'string',
					'default' => 'small'
				),
				'readmoreCustomSize' => array(
					'type' => 'object',
					'default' => (object) [
						'openPadding' => 1,
						'paddingType' => 'custom',
						'unit' => 'px',
						'custom' => (object) ['md' => '5 10 5 10'],
					],
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill'],
							(object) ['key' => 'readmoreSize', 'relation' => '==', 'value' => 'custom']
						],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn-wrapper .qubely-postgrid-btn.qubely-button-fill.is-custom'
					]]
				),

				'readmoreTypography' => array(
					'type' => 'object',
					'default' => (object) [
						'openTypography' => 1,
						'family' => "Roboto",
						'type' => "sans-serif",
						'size' => (object) ['md' => 14, 'unit' => 'px'],
					],
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn'
					]]
				),
				'readmoreColor' => array(
					'type'    => 'string',
					'default' => '#fff',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'showReadMore', 'relation' => '==', 'value' => true],
							(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']
						],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid a.qubely-postgrid-btn {color: {{readmoreColor}};}'
					]]

				),
				'readmoreColor2' => array(
					'type'    => 'string',
					'default' => '#2184F9',
					'style' => [(object) [
						'condition' => [
							(object) ['key' => 'showReadMore', 'relation' => '==', 'value' => true],
							(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'outline']
						],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid a.qubely-postgrid-btn {color: {{readmoreColor2}};}'
					]]

				),
				'readmoreHoverColor' => array(
					'type'    => 'string',
					'default' => '',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showReadMore', 'relation' => '==', 'value' => true]],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid a.qubely-postgrid-btn:hover {color: {{readmoreHoverColor}};}'
					]]

				),
				'readmoreBg' => array(
					'type' => 'object',
					'default' => (object) array(
						'openColor' => 1,
						'type' => 'color',
						'color' => '#2184F9',
						'gradient' => (object) [
							'color1' => '#16d03e',
							'color2' => '#1f91f3',
							'direction' => 45,
							'start' => 0,
							'stop' => 100,
							'type' => 'linear'
						],
					),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn'
					]]
				),
				'readmoreHoverBg' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn:hover'
					]]
				),
				'readmoreBorder' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn'
					]]
				),
				'readmoreBorderRadius' => array(
					'type' => 'object',
					'default' => (object) array(
						'unit' => 'px',
						'openBorderRadius' => true,
						'radiusType' => 'global',
						'global' => (object) array(
							'md' => 2,
						),
					),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn'
					]]
				),
				'readmoreBoxShadow' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
						'selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn'
					]]
				),

				//color
				'categoryPadding' => array(
					'type' => 'object',
					'default' => (object) array(
						'unit' => 'px',
						'openPadding' => true,
						'paddingType' => 'custom',
						'custom' => (object) array(
							'md' => '4 8 4 8',
						),
					),
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a'
					]]
				),
				'contentPadding' => array(
					'type' => 'object',
					'default' => (object) array(),
					'style' => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-post-grid-content,{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-post-list-content']]
				),
				'categoryRadius' => array(
					'type' => 'object',
					'default' => (object) array(
						'unit' => 'px',
						'openBorderRadius' => true,
						'radiusType' => 'global',
						'global' => (object) array(
							'md' => 2,
						),
					),
					'style' => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-category a']]
				),
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
				'categoryColor2' => array(
					'type'    => 'string',
					'default' => '#fff',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a {color: {{categoryColor2}};}'
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

				'categoryHoverColor2' => array(
					'type'    => 'string',
					'default' => '#fff',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
						'selector' => '{{QUBELY}} .qubely-postgrid-category a:hover {color: {{categoryHoverColor2}};}'
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

				//design
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

				//overlay
				'overlayBg' => array(
					'type' => 'object',
					'default' => (object) [
						'openColor' => 1,
						'type' => 'color',
						'color' => '#101a3b',
						'gradient' => (object) [
							'color1' => '#071b0b',
							'color2' => '#101a3b',
							'direction' => 45,
							'start' => 0,
							'stop' => 100,
							'type' => 'linear'
						],
					],
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
						'selector' => '{{QUBELY}} .qubely-postgrid-style-4:before'
					]]
				),
				'overlayHoverBg' => array(
					'type' => 'object',
					'default' => (object) [
						'openColor' => 1,
						'type' => 'color',
						'color' => '#4c4e54',
						'gradient' => (object) [
							'color1' => '#4c4e54',
							'color2' => '#071b0b',
							'direction' => 45,
							'start' => 0,
							'stop' => 100,
							'type' => 'linear'
						],
					],
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
						'selector' => '{{QUBELY}} .qubely-postgrid-style-4:hover:before'
					]]
				),
				'overlayBorderRadius' => array(
					'type' => 'object',
					'default' => (object) array(
						'unit' => 'px',
						'openBorderRadius' => true,
						'radiusType' => 'global',
						'global' => (object) array(
							'md' => 20,
						),
					),
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
							'selector' => '{{QUBELY}} .qubely-postgrid-style-4'
						]
					]
				),
				'overlaySpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 30,
						'unit' => 'px'
					),
					'style' => [
						(object) [
							'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
							'selector' => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-4:not(:last-child) {margin-bottom: {{overlaySpace}};}'
						]
					]
				),
				'overlayHeight' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 300,
						'unit' => 'px'
					),
					'style' => [
						(object) [
							'condition' => [
								(object) ['key' => 'style', 'relation' => '==', 'value' => 4]
							],
							'selector' => '{{QUBELY}} .qubely-postgrid-style-4 {height: {{overlayHeight}};}'
						]
					]
				),
				'overlayBlend' => array(
					'type'    => 'string',
					'default' => '',
					'style' => [(object) [
						'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
						'selector' => '{{QUBELY}} .qubely-postgrid.qubely-post-list-view.qubely-postgrid-style-4:before {mix-blend-mode: {{overlayBlend}};}'
					]]
				),

				//Spacing
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
				'postSpace' => array(
					'type' => 'object',
					'default' => (object) array(
						'md' => 10,
						'unit' => 'px'
					),
					// 'style' => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid']]
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

    $html = '<div><h2>Tutor Course List Block</h2></div>';

    return $html;

   // $query = new WP_Query( $args );
}

if ( ! defined( 'QUBELY_PRO_VERSION' ) ) {
	add_action( 'init', 'register_block_qubely_tutor_course_list', 100 );
}
