<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Getting_Started {

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
                        <a class="qubely-gs-button link button-lg" href="#"><?php esc_html_e( 'Documentation', 'qubely' );?> <span class="fa fa-long-arrow-alt-right"></span></a>
                    </div>
                </div>
                <div class="qubely-gs-container">
                    <div class="qubely-gs-content">
                        <div class="qubely-gs-card-row qubely-column-3">
                            <div class="qubely-gs-card qubely-gs-card-compact">
                                <span class="fas fa-music"></span>
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
                            <div class="qubely-gs-card-title">
                                <h2><?php printf( __( 'What\'s new in Qubely %s', 'qubely' ), QUBELY_VERSION );?></h2>
                                <button><span class="fas fa-angle-down"></span></button>
                            </div>
                            <div class="qubely-gs-card-content qubely-gs-changelog">
                                <?php echo $this->get_changelog(); ?>
                            </div>
                            <a class="qubely-gs-link" href="#">Learn More <span class="fas fa-long-arrow-alt-right"></span></a>
						</div>
						<div class="qubely-gs-card">
                            <div class="qubely-gs-card-title">
                                <h2><?php esc_html_e( 'Tips and Tutorials from our Blog', 'qubely' );?></h2>
                                <a href="#">See all <span class="fas fa-long-arrow-alt-right"></span></a>
                            </div>
                            <div class="qubely-gs-card-content ">
								<div class="qubely-gs-card-row qubely-column-3">
									<div class="qubely-gs-post-card">
										<img src="https://i.picsum.photos/id/1013/536/354.jpg" alt="">
										<span>April 15, 2020</span>
										<p>How to Create Influential Testimonials on WordPress with Gutenberg</p>
									</div>
									<div class="qubely-gs-post-card">
										<img src="https://i.picsum.photos/id/1013/536/354.jpg" alt="">
										<span>April 15, 2020</span>
										<p>How to Create Influential Testimonials on WordPress with Gutenberg</p>
									</div>
									<div class="qubely-gs-post-card">
										<img src="https://i.picsum.photos/id/1013/536/354.jpg" alt="">
										<span>April 15, 2020</span>
										<p>How to Create Influential Testimonials on WordPress with Gutenberg</p>
									</div>
								</div>
                            </div>
						</div>
						<div class="qubely-gs-card-row qubely-column-2">
							<div class="qubely-gs-card">
								<h3>Join our facebook community</h3>
								<p>Themeum has a rock-solid record of professionalism, regularity, responsiveness, and innovation.</p>
								<a href="#" class="qubely-gs-button primary">Join now</a>
							</div>
							<div class="qubely-gs-card">
								<h3>Join our facebook community</h3>
								<p>Themeum has a rock-solid record of professionalism, regularity, responsiveness, and innovation.</p>
								<ul class="socil-links">
									<li><a href="#" class="fab fa-facebook"></a></li>
									<li><a href="#" class="fab fa-facebook"></a></li>
									<li><a href="#" class="fab fa-facebook"></a></li>
									<li><a href="#" class="fab fa-facebook"></a></li>
								</ul>
							</div>
						</div>
                    </div>
                    <div class="qubely-gs-sidebar">
                        <div class="qubely-gs-card card-gradient">
                            <h2>Enjoy the full power and flexibility of Qubely</h2>
                            <a href="#" class="qubely-gs-button white button-block">Get Qubely Pro</a>
						</div>
						<div class="qubely-gs-card">
							<h2>Need help? We’re here for you!</h2>
							<p>Themeum has a rock-solid record of professionalism, regularity, responsiveness, and innovation.</p>
                            <a href="#" class="qubely-gs-button primary button-block">Get Support</a>
						</div>
                    </div>
                </div>
            </div>
        </div>

        <?php
}
}
