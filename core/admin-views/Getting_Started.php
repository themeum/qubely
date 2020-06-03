<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Getting_Started {

    public $posts;

    public function __construct() {
        $this->posts = $this->get_posts();
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

    public function get_posts() {
        $endpoint = "http://themeum.com/wp-json/wp/v2/posts?per_page=3&status=publish&orderby=date";
        $response = wp_remote_get($endpoint);
        $response_body = wp_remote_retrieve_body($response);
        $result = json_decode($response_body);
        if (is_wp_error($result) || !is_array($result)) {
	        return null;
        }
        return $result;
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
                        <a class="qubely-gs-button primary button-lg" href="#"><?php esc_html_e( 'Start creating page', 'qubely' );?></a>
                        <a class="qubely-gs-button link button-lg" href="#">
                            <?php esc_html_e( 'Documentation', 'qubely' );?>
                            <span class="fa fa-long-arrow-alt-right"></span>
                        </a>
                    </div>
                </div>
                <div class="qubely-gs-container">
                    <div class="qubely-gs-content">
                        <div class="qubely-gs-card-row qubely-column-3">
                            <div class="qubely-gs-card qubely-gs-card-compact">
                                <span class="fab fa-facebook-f"></span>
                                <div class="qubely-gs-card-content">
                                    <h6>Starter packs</h6>
                                    <h3>10</h3>
                                </div>
                            </div>

                            <div class="qubely-gs-card qubely-gs-card-compact">
                                <span class="fas fa-music"></span>
                                <div class="qubely-gs-card-content">
                                    <h6>Readymade Sections</h6>
                                    <h3>150+</h3>
                                </div>
                            </div>

                            <div class="qubely-gs-card qubely-gs-card-compact">
                                <span class="fas fa-music"></span>
                                <div class="qubely-gs-card-content">
                                    <h6>Blocks</h6>
                                    <h3>39+</h3>
                                </div>
                            </div>
                        </div>
                        <div class="qubely-gs-card">
                            <div class="qubely-gs-card-title is-large">
                                <h2><?php printf( __( 'What\'s new in Qubely %s', 'qubely' ), QUBELY_VERSION );?></h2>
                                <button><span class="fas fa-angle-down"></span></button>
                            </div>
                            <div class="qubely-gs-card-content qubely-gs-changelog">
                                <?php echo $this->get_changelog(); ?>
                            </div>
                            <a class="qubely-gs-link" href="#">Learn More <span class="fas fa-long-arrow-alt-right"></span></a>
						</div>
						<div class="qubely-gs-card">
                            <div class="qubely-gs-card-title is-large">
                                <h2><?php esc_html_e( 'Tips and Tutorials from our Blog', 'qubely' );?></h2>
                                <a href="#">See all <span class="fas fa-long-arrow-alt-right"></span></a>
                            </div>
                            <div class="qubely-gs-card-content ">
								<div class="qubely-gs-card-row qubely-column-3">
									<?php
                                        if(is_array($this->posts) && count($this->posts)) {
                                            foreach ($this->posts as $post) {
                                                $date = explode('T', $post->date)[0];
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
                                    <h3>Join our facebook community</h3>
                                </div>
								<p>Themeum has a rock-solid record of professionalism, regularity, responsiveness, and innovation.</p>
                                <div class="qubely-gs-card-footer">
								    <a href="#" class="qubely-gs-button primary">Join now</a>
                                </div>
							</div>
							<div class="qubely-gs-card qubely-cta-card" style="--card-bg: #E7E6FE;">
                                <img src="<?php echo $image2?>" alt="">
                                <div class="qubely-gs-card-title">
                                    <h3>Stay in touch with us</h3>
                                </div>
								<p>Stay in touch via our social media channels to receive the latest announcements and updates.</p>
                                <div class="qubely-gs-card-footer">
                                    <div class="qubely-gs-social-links">
                                        <a href="#">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-twitter"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                    </div>
                                </div>
							</div>
						</div>
                    </div>
                    <div class="qubely-gs-sidebar">
                        <div class="qubely-gs-card card-gradient">
                            <h2>Enjoy the full power and flexibility of Qubely</h2>
                            <a href="#" class="qubely-gs-button white button-block">Get Qubely Pro</a>
						</div>
						<div class="qubely-gs-card">
                            <div class="qubely-gs-card-title">
                                <h3>Join our facebook community</h3>
                            </div>
							<p>Themeum has a rock-solid record of professionalism, regularity, responsiveness, and innovation.</p>
                            <div class="qubely-gs-card-footer">
                                <a href="#" class="qubely-gs-button primary button-block">Get Support</a>
                            </div>
						</div>
                    </div>
                </div>
            </div>
        </div>

        <?php
}
}
