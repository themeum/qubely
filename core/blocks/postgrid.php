<?php

/**
 * Registers the `qubely/postgrid` block on server.
 *
 * @since 1.1.0
 */

class QubelyPostGrid
{
    public $name;
    public $attributes;
    public $attribute_proto;
    public function __construct()
    {
        $this->name = 'qubely/postgrid';
        $this->set_attribute_proto();
        add_action('init', [$this, 'register_block_type'], 100);
    }

    public function register_block_type()
    {
        if (function_exists('register_block_type')) {
            register_block_type($this->name, [
                'attributes'      => $this->attribute_proto,
                'render_callback' => [$this, 'render_callback'],
            ]);
        };
    }

    /**
     * Callback renderer
     * @param $attributes
     * @return string
     */
    public function render_callback($attributes)
    {
        $this->attributes = $attributes;
        return $this->postgrid_markup();
    }

    /**
     * Layout attributes isset or not
     * @return number/string/array/false
     */
    public function isset_attr($attr, $default)
    {
        return isset($this->attributes[$attr]) ? $this->attributes[$attr] : $default;
    }

    /**
     * Layout Attributes
     * @return array
     */
    public function get_layout_attributes($key)
    {
        $arr = [
            "layout"              => $this->isset_attr('layout', 3),
            "uniqueId"            => $this->isset_attr('uniqueId',''),
            "className"           => $this->isset_attr('className',''),
            "style"               => $this->isset_attr('style','3'),
            "column"              => $this->isset_attr('column','3'),
            "number"              => $this->isset_attr('postsToShow','3'),
            "limit"               => $this->isset_attr('excerptLimit','3'),
            "showCategory"        => $this->isset_attr('showCategory','default'),
            "categoryPosition"    => $this->isset_attr('categoryPosition','leftTop'),
            "contentPosition"     => $this->isset_attr('contentPosition','center'),
            "girdContentPosition" => $this->isset_attr('girdContentPosition','center'),
            "showTitle"           => $this->isset_attr('showTitle',1),
            "showAuthor"          => $this->isset_attr('showAuthor',1),
            "showDates"           => $this->isset_attr('showDates',1),
            "showComment"         => $this->isset_attr('showComment',1),
            "showExcerpt"         => $this->isset_attr('showExcerpt',1),
            "showReadMore"        => $this->isset_attr('showReadMore',1),
            "titlePosition"       => $this->isset_attr('titlePosition',1),
            "buttonText"          => $this->isset_attr('buttonText', 'Read More'),
            "readmoreSize"        => $this->isset_attr('readmoreSize','small'),
            "readmoreStyle"       => $this->isset_attr('readmoreStyle','fill'),
            "showImages"          => $this->isset_attr('showImages',1),
            "imgSize"             => $this->isset_attr('imgSize','large'),
            "showBadge"           => $this->isset_attr('showBadge',1),
            "order"               => $this->isset_attr('order','DESC'),
            "imageAnimation"      => $this->isset_attr('imageAnimation',''),
            "orderBy"             => $this->isset_attr('orderBy','date'),
            "categories"          => $this->attributes['categories'],
            "tags"                => $this->attributes['tags'],
            "taxonomy"            => $this->attributes['taxonomy'],
            "animation"           => isset($this->attributes['animation']) ? (count((array) $this->attributes['animation']) > 0 && $this->attributes['animation']['animation'] ? 'data-qubelyanimation="' . htmlspecialchars(json_encode($this->attributes['animation']), ENT_QUOTES, 'UTF-8') . '"' : '') : '',
        ];
        return $arr[$key];
    }

    /**
     * Layout One Markup
     * @return string
     */
    public function layout_one_markup($id, $src, $image, $title, $category, $meta, $btn, $excerpt)
    {
        $layout              = $this->get_layout_attributes('layout');
        $style               = $this->get_layout_attributes('style');
        $contentPosition     = $this->get_layout_attributes('contentPosition');
        $girdContentPosition = $this->get_layout_attributes('girdContentPosition');
        $showImages          = $this->get_layout_attributes('showImages');
        $category            = $this->get_layout_attributes('category');
        $showCategory        = $this->get_layout_attributes('showCategory');
        $categoryPosition    = $this->get_layout_attributes('categoryPosition');
        $image               = $this->get_layout_attributes('image');
        $imageAnimation      = $this->get_layout_attributes('imageAnimation');
        $showTitle           = $this->get_layout_attributes('showTitle');
        $titlePosition       = $this->get_layout_attributes('titlePosition');
        $showAuthor          = $this->get_layout_attributes('showAuthor');
        $showDates           = $this->get_layout_attributes('showDates');
        $showComment         = $this->get_layout_attributes('showComment');
        $showExcerpt         = $this->get_layout_attributes('showExcerpt');
        $meta                = $this->get_layout_attributes('meta');
        $showReadMore        = $this->get_layout_attributes('showReadMore');
        ob_start();
        ?>
        <div class="qubely-postgrid qubely-post-list-view qubely-postgrid-style-<?php echo esc_attr($style); ?>">
            <div class="qubely-post-list-wrapper qubely-post-list-<?php echo esc_attr(($layout == 2 && $style === 3) ? $contentPosition : $girdContentPosition); ?>">
                <?php if (($showImages == 1) && has_post_thumbnail()) {
            		if ($showCategory == 'badge' && $style == 4) { ?>
                        <div class="qubely-postgrid-cat-position qubely-postgrid-cat-position-<?php echo esc_attr($categoryPosition); ?>">
                            <?php echo $category; ?>
                        </div>
                    <?php } ?>
                    <div class="qubely-post-list-img qubely-post-img qubely-post-img-<?php echo esc_attr($imageAnimation); ?>">
                        <a href="<?php echo esc_url(get_the_content()); ?>">
                            <?php echo $image; ?>
                        </a>
                        <?php if ($showCategory == 'badge' && $style != 4) {?>
                            <div class="qubely-postgrid-cat-position qubely-postgrid-cat-position-<?php echo esc_attr($categoryPosition); ?>">
                                <?php echo $category; ?>
                            </div>
                        <?php }?>
                    </div>
                <?php } ?>
                <div class="qubely-post-list-content">
                    <?php
					if ($showCategory == 'default') {
						echo $category;
					}
					if (($showTitle == 1) && ($titlePosition == 1)) {
						echo $title;
					}
					if (($showAuthor == 1) || ($showDates == 1) || ($showComment == 1)) {?>
                        <div class="qubely-postgrid-meta">
                            <?php echo $meta; ?>
                        </div>
                    <?php }
					if (($showTitle === 1) || ($titlePosition == 0)) {
						echo $title;
					}
					if ($showExcerpt == 1) {
						echo $excerpt;
					}
					if ($showReadMore == 1) {
						echo $btn;
					}
					?>
                </div> <!-- qubely-post-list-content -->
            </div> <!-- >qubely-post-list-wrap -->
        </div>  <!-- qubely-postgrid -->
        <?php
		return ob_get_clean();
    }

    /**
     * Layout Two Markup
     * @return string
     */
    public function layout_two_markup($id, $src, $image, $title, $category, $meta, $btn, $excerpt)
    {
        $layout              = $this->get_layout_attributes('layout');
        $style               = $this->get_layout_attributes('style');
        $contentPosition     = $this->get_layout_attributes('contentPosition');
        $girdContentPosition = $this->get_layout_attributes('girdContentPosition');
        $showImages          = $this->get_layout_attributes('showImages');
        $category            = $this->get_layout_attributes('category');
        $showCategory        = $this->get_layout_attributes('showCategory');
        $categoryPosition    = $this->get_layout_attributes('categoryPosition');
        $image               = $this->get_layout_attributes('image');
        $animation           = $this->get_layout_attributes('animation');
        $showTitle           = $this->get_layout_attributes('showTitle');
        $titlePosition       = $this->get_layout_attributes('titlePosition');
        $showAuthor          = $this->get_layout_attributes('showAuthor');
        $showDates           = $this->get_layout_attributes('showDates');
        $showComment         = $this->get_layout_attributes('showComment');
        $showExcerpt         = $this->get_layout_attributes('showExcerpt');
        $meta                = $this->get_layout_attributes('meta');
        $showReadMore        = $this->get_layout_attributes('showReadMore');
        ob_start();
        ?>
        <div class="qubely-postgrid qubely-post-grid-view qubely-postgrid-style-<?php echo esc_attr($this->get_layout_attributes()['style']); ?>">
            <div class="qubely-post-grid-wrapper qubely-post-grid-<?php echo esc_attr(($layout == 2 && $style === 3) ? $contentPosition : $girdContentPosition); ?>">
                <?php if (($showImages == 1) && has_post_thumbnail()) {?>
                    <div class="qubely-post-grid-img qubely-post-img qubely-post-img-<?php esc_attr($animation);?>">
                        <a href="<?php echo esc_url(get_the_permalink()); ?>">
                            <?php echo $image; ?>
                        </a>
                        <?php if ($showCategory == 'badge' && $style != 4) {?>
                            <div class="qubely-postgrid-cat-position qubely-postgrid-cat-position-<?php echo esc_attr($categoryPosition); ?>">
                                <?php echo $category; ?>
                            </div>
                        <?php }?>
                    </div>
                <?php }?>
                <div class="qubely-post-grid-content">
                    <?php if ($showCategory == 'default') {
                        echo $category;
                    }
                    if ($showCategory == 'badge' && $style == 4) {?>
                        <div class="qubely-postgrid-cat-position qubely-postgrid-cat-position-<?php echo esc_attr($categoryPosition); ?>">
                            <?php echo $category; ?>
                        </div>
                    <?php }
                    if (($showTitle == 1) && ($titlePosition == 1)) {
                        echo $title;
                    }
                    if (($showAuthor == 1) || ($showDates == 1) || ($showComment == 1)) {?>
                        <div class="qubely-postgrid-meta">
                            <?php echo $meta; ?>
                        </div>
                    <?php }
                    if (($showTitle === 1) || ($titlePosition == 0)) {
                        echo $title;
                    }
                    if ($showExcerpt == 1) {
                        echo $excerpt;
                    }
                    if ($showReadMore == 1) {
                        echo $btn;
                    }
                    ?>
                </div> <!-- qubely-post-grid-content -->
            </div> <!-- qubely-post-list-wrap -->
        </div> <!-- qubely-post-list-wrap -->
        <?php
		return ob_get_clean();
    }

    /**
     * get excerpt
     * @return string
     */
    public function get_excerpt()
    {
        $limit = $this->get_layout_attributes('limit');
        if(!function_exists('qubely_excerpt_max_charlength')) :
            function qubely_excerpt_max_charlength($limit) {
                $excerpt = get_the_excerpt();
                if(str_word_count($excerpt, 0) > $limit) {
                    $words = str_word_count($excerpt, 2);
                    $pos = array_keys($words);
                    $text = substr($excerpt, 0, $pos[$limit]);
                    return $text;
                }
                return  $excerpt;
            }
        endif;
    }

    /**
     * get meta
     * @return string
     */
    public function get_meta()
    {
        $showAuthor = $this->get_layout_attributes('showAuthor');
        $showDates = $this->get_layout_attributes('showDates');
        $showComment = $this->get_layout_attributes('showComment');
        ob_start();
        if ($showAuthor == 1) { ?>
            <span>
                <i class="fas fa-user"></i>
                <?php
                    __('By ', 'qubely'); echo get_the_author_link();
                ?>
            </span>
        <?php } else { ''; }
        if($showDates == 1) { ?>
            <span>
                <i class="far fa-calendar-alt"></i>
                <?php echo get_the_date(); ?>
            </span>
        <?php } else { ''; }
        if($showComment == 1) { ?>
            <span>
                <i class="fas fa-comment"></i>
                <?php echo get_comments_number('0', '1', '%'); ?>
            </span>
        <?php } else { ''; }
        return ob_get_clean();
    }

    /**
     * get animation
     * @return string
     */
    public function get_animation()
    {
        if (isset($this->attributes['interaction'])) {
            if (!empty((array) $this->attributes['interaction'])) {
                if (isset($this->attributes['interaction']['while_scroll_into_view'])) {
                    if ($this->attributes['interaction']['while_scroll_into_view']['enable']) {
                        $interaction = 'qubley-block-interaction';
                    }
                }
                if (isset($this->attributes['interaction']['mouse_movement'])) {
                    if ($this->attributes['interaction']['mouse_movement']['enable']) {
                        $interaction = 'qubley-block-interaction';
                    }
                }
            }
        }
    }

    /**
     * Postgird markup
     */
    public function postgrid_markup()
    {
        $layout        = $this->get_layout_attributes('layout');
        $uniqueId      = $this->get_layout_attributes('uniqueId');
        $order         = $this->get_layout_attributes('order');
        $orderBy       = $this->get_layout_attributes('orderBy');
        $limit         = $this->get_layout_attributes('limit');
        $interaction   = $this->get_layout_attributes('interaction');
        $showAuthor    = $this->get_layout_attributes('showAuthor');
        $showDates     = $this->get_layout_attributes('showDates');
        $showComment   = $this->get_layout_attributes('showComment');
        $readmoreStyle = $this->get_layout_attributes('readmoreStyle');
        $readmoreSize  = $this->get_layout_attributes('readmoreSize');
        $buttonText    = $this->get_layout_attributes('buttonText');
        $categories    = $this->get_layout_attributes('categories');
        $tags          = $this->get_layout_attributes('tags');
        $column        = $this->get_layout_attributes('column');
        $imgSize       = $this->get_layout_attributes('imgSize');
        $number        = $this->get_layout_attributes('number');

        $animation = $this->get_animation();

        $args = [
            'post_type'      => 'post',
            'posts_per_page' => esc_attr(),
            'order'          => esc_attr($order),
            'orderby'        => esc_attr($orderBy),
            'status'         => 'publish',
        ];

        $active_taxonomy_array = $this->attributes['taxonomy'] == 'categories' ? $categories : $tags;
        $active_taxonomy_name = $this->attributes['taxonomy'] == 'categories' ? 'category__in' : 'tag__in';

        if (is_array($active_taxonomy_array) && count($active_taxonomy_array) > 0) {
            $args[$active_taxonomy_name] = array_column($active_taxonomy_array, 'value');
        }

        $query = new WP_Query($args);

        # The Loop.
        //excerpt;
        $this->get_excerpt();

        //column
        if ($layout == 2) {
            $col = (' qubely-postgrid-column qubely-postgrid-column-md' . $column['md'] . ' qubely-postgrid-column-sm' . $column['sm'] . ' qubely-postgrid-column-xs' . $column['xs']);
        } else {
            $col = "";
        }
        $class = 'wp-block-qubely-postgrid qubely-block-' . $uniqueId;
        if (isset($this->attributes['align'])) {
            $class .= ' align' . $this->attributes['align'];
        }
        if (isset($this->attributes['className'])) {
            $class .= $this->attributes['className'];
        }

        if ($query->have_posts()) {
            ob_start()?>
            <div class="<?php echo $class; ?>">
                <div class="qubely-post~grid-wrapper <?php echo $interaction; ?> qubely-postgrid-layout-<?php echo esc_attr($layout); ?>">
                    <?php
                    while ($query->have_posts()) {
                        $query->the_post();
                        $id = get_post_thumbnail_id();
                        $src = wp_get_attachment_image_src($id, $imgSize);
                        $image = '<img class="qubely-post-image" src="' . esc_url($src[0]) . '" alt="' . get_the_title() . '"/>';
                        $title = '<h3 class="qubely-postgrid-title"><a href="' . esc_url(get_the_permalink()) . '">' . get_the_title() . '</a></h3>';
                        $category = '<span class="qubely-postgrid-category">' . get_the_category_list(' ') . '</span>';
                        $meta = $this->get_meta();
                        $btn = '<div class="qubely-postgrid-btn-wrapper"><a class="qubely-postgrid-btn qubely-button-' . esc_attr($readmoreStyle) . ' is-' . esc_attr($readmoreSize) . '" href="' . esc_url(get_the_permalink()) . '">' . esc_attr($buttonText) . '</a></div>';
                        $excerpt = '<div class="qubely-postgrid-intro">' . qubely_excerpt_max_charlength(esc_attr($limit)) . '</div>';

                        if ($layout == 1) {
                            echo $this->layout_one_markup($id, $src, $image, $title, $category, $meta, $btn, $excerpt);
                        }

                        if ($layout == 2) {
                            echo $this->layout_two_markup($id, $src, $image, $title, $category, $meta, $btn, $excerpt);
                        }

                    } # end of if($query->have_posts())
                    ?>
                </div>
            </div>
        <?php } # end of if($query->have_posts())
    } # end of postgrid_markup function

    /**
     * Set default attributes
     * @return array
     */
    public function set_attribute_proto()
    {
        $this->attribute_proto = [
            'uniqueId'                => [
                'type'    => 'string',
                'default' => '',
            ],
            //general
            'postType'                => [
                'type'    => 'string',
                'default' => 'Posts',
            ],
            'taxonomy'                => [
                'type'    => 'string',
                'default' => 'categories',
            ],
            'categories'              => [
                'type'    => 'array',
                'default' => [],
                'items'   => [
                    'type' => 'object',
                ],
            ],
            'tags'                    => [
                'type'    => 'array',
                'default' => [],
                'items'   => [
                    'type' => 'object',
                ],
            ],
            'order'                   => [
                'type'    => 'string',
                'default' => 'desc',
            ],
            'orderBy'                 => [
                'type'    => 'string',
                'default' => 'date',
            ],
            //layout
            'layout'                  => [
                'type'    => 'number',
                'default' => 1,
            ],
            'style'                   => [
                'type'    => 'number',
                'default' => 1,
            ],
            'column'                  => [
                'type'    => 'object',
                'default' => ['md' => 3, 'sm' => 2, 'xs' => 1],
            ],

            //content
            'showTitle'               => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'titlePosition'           => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'showCategory'            => [
                'type'    => 'string',
                'default' => 'default',
            ],
            'categoryPosition'        => [
                'type'    => 'string',
                'default' => 'leftTop',
            ],
            'badgePosition'           => [
                'type'    => 'string',
                'default' => 'default',
            ],
            'badgePadding'            => [
                'type'    => 'object',
                'default' => (object) [
                    'paddingType' => 'custom',
                    'unit'        => 'px',
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
                            (object) ['key' => 'style', 'relation' => '!=', 'value' => 4],
                            (object) ['key' => 'badgePosition', 'relation' => '!=', 'value' => 'default'],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-post-grid-wrapper .qubely-postgrid-cat-position',
                    ],
                ],
            ],
            'showDates'               => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'showComment'             => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'showAuthor'              => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'showExcerpt'             => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'excerptLimit'            => [
                'type'    => 'number',
                'default' => 20,
            ],
            'showReadMore'            => [
                'type'    => 'boolean',
                'default' => false,
            ],
            'verticalAlignment'       => [
                'type'    => 'string',
                'default' => 'center',
            ],
            'items'                   => [
                'type'    => 'number',
                'default' => 2,
            ],
            'excerptCharLength'       => [
                'type'    => 'number',
                'default' => 45,
            ],
            'postsToShow'             => [
                'type'    => 'number',
                'default' => 4,
            ],
            'excerptLength'           => [
                'type'    => 'number',
                'default' => 55,
            ],

            //Seperator
            'showSeparator'           => [
                'type'    => 'boolean',
                'default' => true,
            ],

            'separatorColor'          => [
                'type'    => 'string',
                'default' => '#e5e5e5',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'style', 'relation' => '==', 'value' => 1],
                        (object) ['key' => 'showSeparator', 'relation' => '==', 'value' => true],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-1:not(:last-child) {border-bottom-color: {{separatorColor}};}',
                ]],
            ],

            'separatorHeight'         => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 1,
                    'unit' => 'px',
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 1],
                            (object) ['key' => 'showSeparator', 'relation' => '==', 'value' => true],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-1:not(:last-child){border-bottom-style: solid;border-bottom-width: {{separatorHeight}};}',
                    ],
                ],
            ],

            'separatorSpace'          => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 20,
                    'unit' => 'px',
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 1],
                            (object) ['key' => 'showSeparator', 'relation' => '==', 'value' => true],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-1:not(:last-child){padding-bottom: {{separatorSpace}};margin-bottom: {{separatorSpace}};}',
                    ],
                ],
            ],

            //card
            'cardBackground'          => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-style-2',
                    ],
                ]
            ],
            'cardBorder'              => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'      => 'px',
                    'widthType' => 'global',
                    'global'    => (object) [
                        'md' => '1',
                    ],
                ],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-style-2',
                    ],
                ],
            ],
            'cardBorderRadius'        => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'             => 'px',
                    'openBorderRadius' => true,
                    'radiusType'       => 'global',
                    'global'           => (object) [
                        'md' => 10,
                    ],
                ],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-style-2',
                    ],
                ],
            ],
            'cardSpace'               => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 25,
                    'unit' => 'px',
                ],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-2:not(:last-child) {margin-bottom: {{cardSpace}};}',
                    ],
                ],
            ],
            'cardPadding'             => [
                'type'    => 'object',
                'default' => (object) [
                    'openPadding' => 1,
                    'paddingType' => 'global',
                    'unit'        => 'px',
                    'global'      => (object) ['md' => 25],
                ],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-style-2',
                    ],
                ],
            ],
            'cardBoxShadow'           => [
                'type'    => 'object',
                'default' => (object) [
                    'blur'       => 8,
                    'color'      => "rgba(0,0,0,0.10)",
                    'horizontal' => 0,
                    'inset'      => 0,
                    'openShadow' => true,
                    'spread'     => 0,
                    'vertical'   => 4,
                ],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 2]],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-style-2',
                    ],
                ],
            ],

            //scart
            'stackBg'                 => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content',
                    ],
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-content',
                    ],
                ]
            ],
            'stackBorderRadius'       => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'             => 'px',
                    'openBorderRadius' => true,
                    'radiusType'       => 'global',
                    'global'           => (object) [
                        'md' => 10,
                    ],
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content',
                    ],
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-content',
                    ],
                ],
            ],
            'stackWidth'              => [
                'type'    => 'object',
                'default' => (object) [],

                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-img + .qubely-post-grid-content {width: {{stackWidth}};}',
                    ],
                ],
            ],
            'stackSpace'              => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 40,
                    'unit' => 'px',
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3:not(:last-child) {margin-bottom: {{stackSpace}};}',
                    ],
                ],

            ],
            'stackPadding'            => [
                'type'    => 'object',
                'default' => (object) [
                    'openPadding' => 1,
                    'paddingType' => 'global',
                    'unit'        => 'px',
                    'global'      => (object) ['md' => 30],
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content',
                    ],
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-wrapper .qubely-post-grid-content',
                    ],
                ],
            ],
            'stackBoxShadow'          => [
                'type'    => 'object',
                'default' => (object) [
                    'blur'       => 28,
                    'color'      => "rgba(0,0,0,0.15)",
                    'horizontal' => 0,
                    'inset'      => 0,
                    'openShadow' => true,
                    'spread'     => -20,
                    'vertical'   => 34,
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 1],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-3 .qubely-post-list-wrapper .qubely-post-list-content',
                    ],
                    (object) [
                        'condition' => [
                            (object) ['key' => 'layout', 'relation' => '==', 'value' => 2],
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 3],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-post-grid-view.qubely-postgrid-style-3 .qubely-post-grid-content',
                    ],
                ],
            ],

            //typography
            'titleTypography'         => [
                'type'    => 'object',
                'default' => (object) [
                    'openTypography' => 1,
                    'family'         => "Roboto",
                    'type'           => "sans-serif",
                    'size'           => (object) ['md' => 32, 'unit' => 'px'],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-title',
                ]],
            ],
            'metaTypography'          => [
                'type'      => 'object',
                'default'   => (object) [
                    'openTypography' => 1,
                    'family'         => "Roboto",
                    'type'           => "sans-serif",
                    'size'           => (object) ['md' => 12, 'unit' => 'px'],
                ],
                'condition' => [
                    (object) ['key' => 'showAuthor', 'relation' => '==', 'value' => true],
                    (object) ['key' => 'showDates', 'relation' => '==', 'value' => true],
                    (object) ['key' => 'showComment', 'relation' => '==', 'value' => true],
                ],
                'style'     => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-meta']],
            ],
            'excerptTypography'       => [
                'type'    => 'object',
                'default' => (object) [
                    'openTypography' => 1,
                    'family'         => "Roboto",
                    'type'           => "sans-serif",
                    'size'           => (object) ['md' => 16, 'unit' => 'px'],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showExcerpt', 'relation' => '==', 'value' => true]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-intro, {{QUBELY}} .qubely-postgrid-intro p',
                ]],
            ],
            'categoryTypography'      => [
                'type'    => 'object',
                'default' => (object) [
                    'openTypography' => 1,
                    'family'         => "Roboto",
                    'type'           => "sans-serif",
                    'size'           => (object) ['md' => 12, 'unit' => 'px'], 'spacing' => (object) ['md' => 1.1, 'unit' => 'px'], 'transform' => 'uppercase',
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '!=', 'value' => 'none']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a',
                ]],
            ],

            //image
            'showImages'              => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'enableFixedHeight'       => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'fixedHeight'             => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) ['selector' => '{{QUBELY}} .qubely-post-image{object-fit: cover;height: {{fixedHeight}};}']],
            ],
            'imgSize'                 => [
                'type'    => 'string',
                'default' => 'large',
            ],
            'imageRadius'             => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'             => 'px',
                    'openBorderRadius' => true,
                    'radiusType'       => 'global',
                    'global'           => (object) [
                        'md' => 10,
                    ],
                ],
                'style'   => [(object) ['selector' => '{{QUBELY}} .qubely-post-img']],
            ],
            'imageAnimation'          => [
                'type'    => 'string',
                'default' => 'zoom-out',
            ],

            //readmore link
            'buttonText'              => [
                'type'    => 'string',
                'default' => 'Read More',
            ],
            'readmoreStyle'           => [
                'type'    => 'string',
                'default' => 'fill',
            ],
            'readmoreSize'            => [
                'type'    => 'string',
                'default' => 'small',
            ],
            'readmoreCustomSize'      => [
                'type'    => 'object',
                'default' => (object) [
                    'openPadding' => 1,
                    'paddingType' => 'custom',
                    'unit'        => 'px',
                    'custom'      => (object) ['md' => '5 10 5 10'],
                ],
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill'],
                        (object) ['key' => 'readmoreSize', 'relation' => '==', 'value' => 'custom'],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn-wrapper .qubely-postgrid-btn.qubely-button-fill.is-custom',
                ]],
            ],

            'readmoreTypography'      => [
                'type'    => 'object',
                'default' => (object) [
                    'openTypography' => 1,
                    'family'         => "Roboto",
                    'type'           => "sans-serif",
                    'size'           => (object) ['md' => 14, 'unit' => 'px'],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn',
                ]],
            ],
            'readmoreColor'           => [
                'type'    => 'string',
                'default' => '#fff',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'showReadMore', 'relation' => '==', 'value' => true],
                        (object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill'],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid a.qubely-postgrid-btn {color: {{readmoreColor}};}',
                ]],

            ],
            'readmoreColor2'          => [
                'type'    => 'string',
                'default' => '#2184F9',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'showReadMore', 'relation' => '==', 'value' => true],
                        (object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'outline'],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid a.qubely-postgrid-btn {color: {{readmoreColor2}};}',
                ]],

            ],
            'readmoreHoverColor'      => [
                'type'    => 'string',
                'default' => '',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showReadMore', 'relation' => '==', 'value' => true]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid a.qubely-postgrid-btn:hover {color: {{readmoreHoverColor}};}',
                ]],

            ],
            'readmoreBg'              => [
                'type'    => 'object',
                'default' => (object) [
                    'openColor' => 1,
                    'type'      => 'color',
                    'color'     => '#2184F9',
                    'gradient'  => (object) [
                        'color1'    => '#16d03e',
                        'color2'    => '#1f91f3',
                        'direction' => 45,
                        'start'     => 0,
                        'stop'      => 100,
                        'type'      => 'linear',
                    ],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn',
                ]],
            ],
            'readmoreHoverBg'         => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn:hover',
                ]],
            ],
            'readmoreBorder'          => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn',
                ]],
            ],
            'readmoreBorderRadius'    => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'             => 'px',
                    'openBorderRadius' => true,
                    'radiusType'       => 'global',
                    'global'           => (object) [
                        'md' => 2,
                    ],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn',
                ]],
            ],
            'readmoreBoxShadow'       => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'readmoreStyle', 'relation' => '==', 'value' => 'fill']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-postgrid-btn',
                ]],
            ],

            //color
            'categoryPadding'         => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'        => 'px',
                    'openPadding' => true,
                    'paddingType' => 'custom',
                    'custom'      => (object) [
                        'md' => '4 8 4 8',
                    ],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a',
                ]],
            ],
            'contentPadding'          => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-post-grid-content,{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-post-list-content']],
            ],
            'categoryRadius'          => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'             => 'px',
                    'openBorderRadius' => true,
                    'radiusType'       => 'global',
                    'global'           => (object) [
                        'md' => 2,
                    ],
                ],
                'style'   => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-category a']],
            ],
            'titleColor'              => [
                'type'    => 'string',
                'default' => '#1b1b1b',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'style', 'relation' => '!=', 'value' => 4],
                        (object) ['key' => 'showTitle', 'relation' => '==', 'value' => true],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-title a {color: {{titleColor}};}',
                ]],
            ],
            'titleOverlayColor'       => [
                'type'    => 'string',
                'default' => '#fff',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'style', 'relation' => '==', 'value' => 4],
                        (object) ['key' => 'showTitle', 'relation' => '==', 'value' => true],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-title a {color: {{titleOverlayColor}};}',
                ]],
            ],
            'titleHoverColor'         => [
                'type'    => 'string',
                'default' => '#FF0096',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showTitle', 'relation' => '==', 'value' => true]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-title a:hover {color: {{titleHoverColor}};}',
                ]],
            ],
            'categoryColor'           => [
                'type'    => 'string',
                'default' => '#FF0096',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'default']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a {color: {{categoryColor}};}',
                ]],
            ],
            'categoryColor2'          => [
                'type'    => 'string',
                'default' => '#fff',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a {color: {{categoryColor2}};}',
                ]],
            ],
            'categoryHoverColor'      => [
                'type'    => 'string',
                'default' => '#FF0096',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'default']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a:hover {color: {{categoryHoverColor}};}',
                ]],
            ],
            'categoryBackground'      => [
                'type'    => 'string',
                'default' => '#FF0096',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a {background: {{categoryBackground}};}',
                ]],
            ],
            'categoryHoverBackground' => [
                'type'    => 'string',
                'default' => '#e00e89',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a:hover {background: {{categoryHoverBackground}};}',
                ]],
            ],

            'categoryHoverColor2'     => [
                'type'    => 'string',
                'default' => '#fff',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'badge']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category a:hover {color: {{categoryHoverColor2}};}',
                ]],
            ],
            'metaColor'               => [
                'type'    => 'string',
                'default' => '#9B9B9B',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'style', 'relation' => '!=', 'value' => 4],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-meta a {color: {{metaColor}};} {{QUBELY}} .qubely-postgrid-meta {color: {{metaColor}};} {{QUBELY}} .qubely-postgrid-meta span:before {background: {{metaColor}};}',
                ]],
            ],
            'metaOverlayColor'        => [
                'type'    => 'string',
                'default' => '#fff',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'style', 'relation' => '==', 'value' => 4],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-meta a {color: {{metaOverlayColor}};} {{QUBELY}} .qubely-postgrid-meta {color: {{metaOverlayColor}};} {{QUBELY}} .qubely-postgrid-meta span:before {background: {{metaOverlayColor}};}',
                ]],
            ],
            'excerptColor'            => [
                'type'    => 'string',
                'default' => '#9B9B9B',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'style', 'relation' => '!=', 'value' => 4],
                        (object) ['key' => 'showExcerpt', 'relation' => '==', 'value' => true],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-intro {color: {{excerptColor}};}',
                ]],
            ],
            'excerptColor2'           => [
                'type'    => 'string',
                'default' => '#fff',
                'style'   => [(object) [
                    'condition' => [
                        (object) ['key' => 'style', 'relation' => '==', 'value' => 4],
                        (object) ['key' => 'showExcerpt', 'relation' => '==', 'value' => true],
                    ],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-intro {color: {{excerptColor2}};}',
                ]],
            ],

            //design
            'spacer'                  => [
                'type'    => 'object',
                'default' => (object) [
                    'spaceTop'    => (object) ['md' => '10', 'unit' => "px"],
                    'spaceBottom' => (object) ['md' => '10', 'unit' => "px"],
                ],
                'style'   => [(object) ['selector' => '{{QUBELY}}']],
            ],
            'contentPosition'         => [
                'type'    => 'string',
                'default' => 'center',
            ],
            'girdContentPosition'     => [
                'type'    => 'string',
                'default' => 'center',
            ],
            'color'                   => [
                'type'    => 'string',
                'default' => '',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid .qubely-post-list-content {color: {{color}};}',
                ]],
            ],
            'bgColor'                 => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper',
                ]],
            ],
            'border'                  => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper',
                ]],
            ],
            'borderRadius'            => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper',
                ]],
            ],
            'padding'                 => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper',
                ]],
            ],
            'boxShadow'               => [
                'type'    => 'object',
                'default' => (object) [],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 1]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-wrapper',
                ]],
            ],

            //overlay
            'overlayBg'               => [
                'type'    => 'object',
                'default' => (object) [
                    'openColor' => 1,
                    'type'      => 'color',
                    'color'     => '#101a3b',
                    'gradient'  => (object) [
                        'color1'    => '#071b0b',
                        'color2'    => '#101a3b',
                        'direction' => 45,
                        'start'     => 0,
                        'stop'      => 100,
                        'type'      => 'linear',
                    ],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-style-4:before',
                ]],
            ],
            'overlayHoverBg'          => [
                'type'    => 'object',
                'default' => (object) [
                    'openColor' => 1,
                    'type'      => 'color',
                    'color'     => '#4c4e54',
                    'gradient'  => (object) [
                        'color1'    => '#4c4e54',
                        'color2'    => '#071b0b',
                        'direction' => 45,
                        'start'     => 0,
                        'stop'      => 100,
                        'type'      => 'linear',
                    ],
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-style-4:hover:before',
                ]],
            ],
            'overlayBorderRadius'     => [
                'type'    => 'object',
                'default' => (object) [
                    'unit'             => 'px',
                    'openBorderRadius' => true,
                    'radiusType'       => 'global',
                    'global'           => (object) [
                        'md' => 20,
                    ],
                ],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-style-4',
                    ],
                ],
            ],
            'overlaySpace'            => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 30,
                    'unit' => 'px',
                ],
                'style'   => [
                    (object) [
                        'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
                        'selector'  => '{{QUBELY}} .qubely-post-list-view.qubely-postgrid-style-4:not(:last-child) {margin-bottom: {{overlaySpace}};}',
                    ],
                ],
            ],
            'overlayHeight'           => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 300,
                    'unit' => 'px',
                ],
                'style'   => [
                    (object) [
                        'condition' => [
                            (object) ['key' => 'style', 'relation' => '==', 'value' => 4],
                        ],
                        'selector'  => '{{QUBELY}} .qubely-postgrid-style-4 {height: {{overlayHeight}};}',
                    ],
                ],
            ],
            'overlayBlend'            => [
                'type'    => 'string',
                'default' => '',
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'style', 'relation' => '==', 'value' => 4]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid.qubely-post-list-view.qubely-postgrid-style-4:before {mix-blend-mode: {{overlayBlend}};}',
                ]],
            ],
            //Spacing
            'columnGap'               => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 30,
                    'unit' => 'px',
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'layout', 'relation' => '==', 'value' => 2]],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-column {grid-column-gap: {{columnGap}};}, {{QUBELY}} .qubely-postgrid-column {grid-row-gap: {{columnGap}};}',
                ]],
            ],
            'titleSpace'              => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 10,
                    'unit' => 'px',
                ],
                'style'   => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-title {padding-bottom: {{titleSpace}};}']],
            ],
            'categorySpace'           => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 5,
                    'unit' => 'px',
                ],
                'style'   => [(object) [
                    'condition' => [(object) ['key' => 'showCategory', 'relation' => '==', 'value' => 'default']],
                    'selector'  => '{{QUBELY}} .qubely-postgrid-category {display:inline-block;padding-bottom: {{categorySpace}};}',
                ]],
            ],
            'metaSpace'               => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 10,
                    'unit' => 'px',
                ],
                'style'   => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-meta {padding-bottom: {{metaSpace}};}']],
            ],
            'excerptSpace'            => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 10,
                    'unit' => 'px',
                ],
                'style'   => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-intro {padding-bottom: {{excerptSpace}};}']],
            ],
            'postSpace'               => [
                'type'    => 'object',
                'default' => (object) [
                    'md'   => 10,
                    'unit' => 'px',
                ],
                // 'style' => [(object) ['selector' => '{{QUBELY}} .qubely-postgrid-wrapper .qubely-postgrid']]
            ],
            'interaction'             => [
                'type'    => 'object',
                'default' => (object) [],
            ],
            'animation'               => [
                'type'    => 'object',
                'default' => (object) [],
            ],
            'globalZindex'            => [
                'type'    => 'string',
                'default' => '0',
                'style'   => [(object) ['selector' => '{{QUBELY}} {z-index:{{globalZindex}};}']],
            ],
            'hideTablet'              => [
                'type'    => 'boolean',
                'default' => false,
                'style'   => [(object) ['selector' => '{{QUBELY}}{display:none;}']],
            ],
            'hideMobile'              => [
                'type'    => 'boolean',
                'default' => false,
                'style'   => [(object) ['selector' => '{{QUBELY}}{display:none;}']],
            ],
            'globalCss'               => [
                'type'    => 'string',
                'default' => '',
                'style'   => [(object) ['selector' => '']],
            ],
            // 'showContextMenu' => array(
            //     'type' => 'boolean',
            //     'default' => true
            // ),
        ];
    }

}

if (!defined('QUBELY_PRO_VERSION')) {
    new QubelyPostGrid();
}
