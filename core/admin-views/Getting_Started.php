<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Getting_Started {

    public $posts;
    public $hasPro;

    public function __construct() {
        $this->posts = $this->get_posts();
        $this->hasPro = defined('QUBELY_PRO_FILE');
    }

	/**
     * Fetch changelog
     * @return mixed
     */
    public function get_changelog() {
        require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        $plugin_info = plugins_api( 'plugin_information', array(
            'slug' => 'qubely',
        ) );
        return $plugin_info->sections['changelog'];
    }

    public function get_block_count() {
	    $block = "http://qubely.io/wp-json/wp/v2/block";
	    $block = wp_remote_get($block);
	    $block = wp_remote_retrieve_header($block, 'X-WP-Total');
	    if (is_wp_error($block)) {
	        return 0;
        }
	    return $block;
    }

    public function get_section_count() {
	    $sections = "http://qubely.io/wp-json/wp/v2/sections";
	    $sections = wp_remote_get($sections);
	    $sections = wp_remote_retrieve_header($sections, 'X-WP-Total');
	    if(is_wp_error($sections)) {
	        return 0;
        }
	    return $sections;
    }

    public function get_layout_count() {
	    $layouts = "https://qubely.io/wp-json/restapi/v2/layouts";
	    $layouts = wp_remote_post($layouts);
	    $layouts = wp_remote_retrieve_body($layouts);
	    $layouts = json_decode($layouts);
	    $layouts = array_filter($layouts, function ($item) {
		    return $item->parentID === 0;
	    });
	    if(is_wp_error($layouts) || !is_array($layouts)) {
	        return 0;
        }
	    return count($layouts);
    }

    public function mini_cards() {

        $block = $this->get_block_count();
        $sections = $this->get_section_count();
        $layouts = $this->get_layout_count();

        ?>
            <div class="qubely-gs-card-row qubely-column-3">
                <div class="qubely-gs-card qubely-gs-card-compact">
                    <span class="fab fa-facebook-f"></span>
                    <div class="qubely-gs-card-content">
                        <h6><?php esc_html_e('Starter packs', 'qubely'); ?></h6>
                        <h3><?php echo $layouts; ?></h3>
                    </div>
                </div>

                <div class="qubely-gs-card qubely-gs-card-compact">
                    <span class="fas fa-music"></span>
                    <div class="qubely-gs-card-content">
                        <h6><?php esc_html_e("Readymade Sections", 'qubely'); ?></h6>
                        <h3><?php echo $sections; ?></h3>
                    </div>
                </div>

                <div class="qubely-gs-card qubely-gs-card-compact">
                    <span class="fas fa-music"></span>
                    <div class="qubely-gs-card-content">
                        <h6><?php esc_html_e("Blocks", 'qubely');?></h6>
                        <h3><?php echo $block ?></h3>
                    </div>
                </div>
            </div>
        <?php

    }

    public function get_posts() {
        $endpoint = "http://themeum.com/wp-json/wp/v2/posts?per_page=3&status=publish&orderby=date&categories=1486";
        $response = wp_remote_get($endpoint);
        $response_body = wp_remote_retrieve_body($response);
        $result = json_decode($response_body);
        if (is_wp_error($result) || !is_array($result)) {
	        return null;
        }
        return $result;
    }

    public function social_links() {
        $links = [
            'fab fa-facebook-f' => 'https://fb.com/themeum',
            'fab fa-twitter' => 'https://twitter.com/themeum',
            'fab fa-youtube' => 'https://www.youtube.com/channel/UCeKEfO6qZOtKyAnTt3pj5TA',
            'fab fa-wordpress' => 'https://profiles.wordpress.org/themeum/#content-plugins',
        ];
        ?>
            <div class="qubely-gs-social-links">
                <?php
                    foreach ($links as $key => $value) {
                        ?>
                            <a href="<?php echo $value ?>" target="_blank">
                                <i class="<?php echo $key ?>"></i>
                            </a>
                        <?php
                    }
                ?>
            </div>
        <?php
    }

    /**
     * Markup
     */
    public function markup() {
        $logo = QUBELY_DIR_URL . 'assets/img/admin/qubely-option-logo.jpg';
        ?>
        <div class="wrap">
            <h1 style="display: none">&nbsp;</h1>

            <div class="qubely-getting-started">
                <div class="qubely-gs-card qubely-gs-header" style="background-image: url(<?php echo $logo ?>)">
                    <h2>
                        <?php echo 'Qubely - ' . QUBELY_VERSION ?>
                    </h2>
                    <h3><?php esc_html_e( 'Full-Fledged Gutenburg Toolkit', 'qubely' )?></h3>
                    <div class="qubely-gs-button-group">
                        <a class="qubely-gs-button primary button-lg" href="<?php echo admin_url('post-new.php?post_type=page') ?>"><?php esc_html_e( 'Start creating page', 'qubely' );?></a>
                        <a target="_blank" class="qubely-gs-button link button-lg" href="https://docs.themeum.com/qubely/">
                            <?php esc_html_e( 'Documentation', 'qubely' );?>
                            <span class="fa fa-long-arrow-alt-right"></span>
                        </a>
                    </div>
                </div>
                <div class="qubely-gs-container">
                    <div class="qubely-gs-content">
                        <?php $this->mini_cards(); ?>
                        <div class="qubely-gs-card">
                            <div class="qubely-gs-card-title is-large">
                                <h2><?php printf( __( 'What\'s new in Qubely %s', 'qubely' ), QUBELY_VERSION );?></h2>
                                <button><span class="fas fa-angle-down"></span></button>
                            </div>
                            <div class="qubely-gs-card-content qubely-gs-changelog">
                                <?php echo $this->get_changelog(); ?>
                            </div>
                            <a class="qubely-gs-link" target="_blank" href="https://wordpress.org/plugins/qubely/#developers"><?php esc_html_e('Learn More', 'qubely'); ?> <span class="fas fa-long-arrow-alt-right"></span></a>
						</div>
						<div class="qubely-gs-card">
                            <div class="qubely-gs-card-title is-large">
                                <h2><?php esc_html_e( 'Tips and Tutorials from our Blog', 'qubely' );?></h2>
                                <a href="https://www.themeum.com/category/qubely/" target="_blank"><?php esc_html_e('See all', 'qubely'); ?> <span class="fas fa-long-arrow-alt-right"></span></a>
                            </div>
                            <div class="qubely-gs-card-content ">
								<div class="qubely-gs-card-row qubely-column-3">
									<?php
                                        if(is_array($this->posts) && count($this->posts)) {
                                            foreach ($this->posts as $post) {
                                                $date = gmdate('M d, Y', strtotime($post->date));
                                                $image = $post->qubely_featured_image_url->medium_large[0];
                                                ?>
                                                <div class="qubely-gs-post-card">
                                                    <a target="_blank" href="<?php echo $post->link ?>">
                                                        <img src="<?php echo $image ?>" alt="">
                                                    </a>
                                                    <span><?php echo $date ?></span>
                                                    <a target="_blank" href="<?php echo $post->link ?>"><?php echo $post->title->rendered ?></a>
                                                </div>
                                                <?php
                                            }
                                        }
									?>
								</div>
                            </div>
						</div>
						<div class="qubely-gs-card-row qubely-column-2">
                            <?php
                                $image1 = QUBELY_DIR_URL . 'assets/img/admin/cta-1.png';
                                $image2 = QUBELY_DIR_URL . 'assets/img/admin/cta-2.png';
                            ?>
							<div class="qubely-gs-card qubely-cta-card" style="--card-bg: #D5EAFF;">
                                <img src="<?php echo $image1?>" alt="">
								<div class="qubely-gs-card-title">
                                    <h3><?php esc_html_e('Join our facebook community', 'qubely'); ?></h3>
                                </div>
								<p><?php esc_html_e('Themeum has a rock-solid record of professionalism, regularity, responsiveness, and innovation.', 'qubely'); ?></p>
                                <div class="qubely-gs-card-footer">
								    <a target="_blank" href="https://web.facebook.com/groups/qubely" class="qubely-gs-button primary">Join now</a>
                                </div>
							</div>
							<div class="qubely-gs-card qubely-cta-card" style="--card-bg: #E7E6FE;">
                                <img src="<?php echo $image2?>" alt="">
                                <div class="qubely-gs-card-title">
                                    <h3><?php esc_html_e('Stay in touch with us', 'qubely'); ?></h3>
                                </div>
								<p><?php esc_html_e('Stay in touch via our social media channels to receive the latest announcements and updates.', 'qubely'); ?></p>
                                <div class="qubely-gs-card-footer">
                                    <?php $this->social_links(); ?>
                                </div>
							</div>
						</div>
                    </div>
                    <div class="qubely-gs-sidebar">
                        <?php if(!$this->hasPro) {?>
                            <div class="qubely-gs-card card-gradient">
                                <h2><?php esc_html_e("Enjoy the full power and flexibility of Qubely", 'qubely');?></h2>
                                <a target="_blank" href="https://www.themeum.com/product/qubely/" class="qubely-gs-button white button-block"><?php esc_html_e('Get Qubely Pro', 'qubely'); ?></a>
                            </div>
                        <?php } ?>
						<div class="qubely-gs-card">
                            <div class="qubely-gs-card-title">
                                <h3><?php esc_html_e('Join our facebook community', 'qubely'); ?></h3>
                            </div>
							<p><?php esc_html_e("Themeum has a rock-solid record of professionalism, regularity, responsiveness, and innovation.", 'qubely'); ?></p>
                            <div class="qubely-gs-card-footer">
                                <a target="_blank" href="https://www.themeum.com/support/" class="qubely-gs-button primary button-block"><?php esc_html_e('Get Support', 'qubely'); ?></a>
                            </div>
						</div>
                    </div>
                </div>
            </div>
        </div>

        <?php
}
}
