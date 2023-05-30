<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class QUBELY_Getting_Started {

    public $posts;
    public $hasPro;

    public function __construct() {
        $this->hasPro = defined('QUBELY_PRO_FILE');
    }

    public function mini_cards() {

        // @TODO: Fetch data dynamically with one request if possible
	    $block = 39;
	    $sections = 160;
	    $layouts = 44;

        $icon_blocks = QUBELY_DIR_URL . 'assets/img/admin/blocks.svg';
        $icon_sections = QUBELY_DIR_URL . 'assets/img/admin/sections.svg';
        $icon_starter = QUBELY_DIR_URL . 'assets/img/admin/starter-pack.svg';

        ?>
            <div class="qubely-gs-card-row qubely-column-3">
                <a target="_blank" href="https://www.themeum.com/qubely/starter-packs/" class="qubely-gs-card qubely-gs-card-compact">
                    <span>
                        <img src="<?php echo esc_url( $icon_starter ); ?>" alt="">
                    </span>

                    <div class="qubely-gs-card-content">
                        <h6><?php esc_html_e( 'Starter packs', 'qubely' ); ?></h6>
                        <h3 class="qubely-gs-layout-count"><?php echo esc_html( $layouts . '+' ); ?></h3>
                    </div>
                </a>

                <a target="_blank" href="https://www.themeum.com/qubely/sections/" class="qubely-gs-card qubely-gs-card-compact">
                    <span><img src="<?php echo esc_url( $icon_sections ); ?>" alt=""></span>
                    <div class="qubely-gs-card-content">
                        <h6><?php esc_html_e("Readymade Sections", 'qubely'); ?></h6>
                        <h3 class="qubely-gs-section-count"><?php echo esc_html( $sections  . '+' ); ?></h3>
                    </div>
                </a>

                <a target="_blank" href="https://www.themeum.com/qubely/blocks/" class="qubely-gs-card qubely-gs-card-compact">
                    <span><img src="<?php echo esc_url( $icon_blocks ); ?>" alt=""></span>
                    <div class="qubely-gs-card-content">
                        <h6><?php esc_html_e( 'Blocks', 'qubely' ); ?></h6>
                        <h3 class="qubely-gs-block-count"><?php echo esc_html( $block . '+' ); ?></h3>
                    </div>
                </a>
            </div>
        <?php

    }

    public function social_links() {
        $links = [
            'fab fa-facebook-f' => 'https://www.facebook.com/groups/qubely',
            'fab fa-twitter' => 'https://twitter.com/themeum',
            'fab fa-youtube' => 'https://www.youtube.com/themeum',
            'fab fa-wordpress' => 'https://wordpress.org/plugins/qubely/',
        ];
        ?>
            <div class="qubely-gs-social-links">
                <?php
                    foreach ($links as $key => $value) {
                        ?>
                            <a href="<?php echo esc_attr( $value ); ?>" target="_blank">
                                <i class="<?php echo esc_attr( $key ); ?>"></i>
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
        $logo = esc_url( QUBELY_DIR_URL . 'assets/img/admin/qubely-option-logo.jpg' );
        wp_enqueue_style( 'qubely-options' );
        ?>
        <div id="gs-wrapper" class="wrap" style="display: none">
            <h1 style="display: none">&nbsp;</h1>

            <div class="qubely-getting-started">
                <div class="qubely-gs-card qubely-gs-header" style="background-image: url(<?php echo $logo ?>)">
                    <h2>
                        <?php echo esc_html( 'Qubely' ); ?>
                    </h2>
                    <h3><?php esc_html_e( 'Advanced Gutenberg Blocks', 'qubely' ); ?></h3>
                    <div class="qubely-gs-button-group">
                        <a class="qubely-gs-button primary button-lg" href="<?php echo esc_url( admin_url( 'post-new.php?post_type=page' ) ) ?>"><?php esc_html_e( 'Start creating page', 'qubely' ); ?></a>
                        <a target="_blank" class="qubely-gs-button link button-lg" href="https://docs.themeum.com/qubely/">
                            <?php esc_html_e( 'Documentation', 'qubely' );?>
                            <span class="fa fa-long-arrow-alt-right"></span>
                        </a>
                    </div>
                </div>
                <div class="qubely-gs-container">
                    <div class="qubely-gs-content">
                        <?php $this->mini_cards(); ?>
                       <div class="qubely-gs-card-row qubely-column-2">
                            <?php
                                $image1 = QUBELY_DIR_URL . 'assets/img/admin/join-fb.svg';
                                $image2 = QUBELY_DIR_URL . 'assets/img/admin/keep-in-touch.svg';
                            ?>
							<div class="qubely-gs-card qubely-cta-card" style="--card-bg: #D5EAFF;">
                                <img src="<?php echo esc_url( $image1 ); ?>" alt="">
								<div class="qubely-gs-card-title">
                                    <h3><?php esc_html_e( 'Join Our Facebook Community', 'qubely' ); ?></h3>
                                </div>
								<p><?php esc_html_e( 'Do join Qubely\'s official Facebook group to share your experience, thoughts, and ideas.', 'qubely' ); ?></p>
                                <div class="qubely-gs-card-footer">
								    <a target="_blank" href="https://web.facebook.com/groups/qubely" class="qubely-gs-button primary">Join now</a>
                                </div>
							</div>
							<div class="qubely-gs-card qubely-cta-card" style="--card-bg: #E7E6FE;">
                                <img src="<?php echo esc_url( $image2 ); ?>" alt="">
                                <div class="qubely-gs-card-title">
                                    <h3><?php esc_html_e( 'Stay in Touch with Us', 'qubely' ); ?></h3>
                                </div>
								<p><?php esc_html_e( 'Stay in touch via our social media channels to receive the latest announcements and updates.', 'qubely' ); ?></p>
                                <div class="qubely-gs-card-footer">
                                    <?php $this->social_links(); ?>
                                </div>
							</div>
						</div>
                    </div>
                    <div class="qubely-gs-sidebar">
                        <?php if ( ! $this->hasPro ) {?>
                            <div class="qubely-gs-card card-gradient">
                                <h2><?php esc_html_e( "Enjoy the full power and flexibility of Qubely", 'qubely' ); ?></h2>
                                <a target="_blank" href="https://www.themeum.com/product/qubely/" class="qubely-gs-button white button-block"><?php esc_html_e( 'Get Qubely Pro', 'qubely' ); ?></a>
                            </div>
                        <?php } ?>
                        <div class="qubely-gs-card">
                            <div class="qubely-gs-card-title">
                                <h3><?php esc_html_e( 'Rate Your Experience with Qubely', 'qubely' ); ?></h3>
                            </div>
                            <div class="qubely-gs-card-footer">
                                <a target="_blank" href="https://wordpress.org/support/plugin/qubely/reviews/?filter=5" class="qubely-gs-button primary button-block"><?php esc_html_e( 'Leave a Review', 'qubely' ); ?></a>
                            </div>
                        </div>
						<div class="qubely-gs-card">
                            <div class="qubely-gs-card-title">
                                <h3><?php esc_html_e( 'Need Help? We are Here For You!', 'qubely' ); ?></h3>
                            </div>
							<p><?php esc_html_e( "Fix any issues you may face while using Qubely with our expert support professionals.", 'qubely' ); ?></p>
                            <div class="qubely-gs-card-footer">
                                <a target="_blank" href="https://www.themeum.com/contact-us/" class="qubely-gs-button primary button-block"><?php esc_html_e( 'Get Support', 'qubely' ); ?></a>
                            </div>
						</div>
                    </div>
                </div>
            </div>
        </div>

        <?php
}
}
