<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists('QUBELY_Options')){

	class QUBELY_Options {
		// Constructor
		public function __construct() {
			add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
			add_action( 'admin_init', array( $this, 'register_settings' ) );
		}

		/**
		 * Add Menu Page Callback
		 *
		 * @since 1.0.0
		 */
		public static function add_admin_menu() {
			add_menu_page(
				esc_html__( 'Qubely Options', 'qubely' ),
				esc_html__( 'Qubely Options', 'qubely' ),
				'manage_options',
				'qubely-settings',
				array( self::class, 'create_admin_page' ),
				QUBELY_DIR_URL.'assets/img/qubely-logo-white.svg'
			);
		}

		/**
		 * Register a setting and its sanitization callback.
		 *
		 * @since 1.0.0
		 */
		public static function register_settings() {
			register_setting( 'qubely_options', 'qubely_options', array( self::class, 'sanitize' ) );
		}

		/**
		 * Sanitization callback
		 *
		 * @since 1.0.0
		 */
		public static function sanitize( $options ) {
			if ( $options ) {
				if ( ! empty( $options['css_save_as'] ) ) {
					$options['css_save_as'] = sanitize_text_field( $options['css_save_as'] );
				}
			}
			return $options;
		}

		/**
		 * Settings page output
		 *
		 * @since 1.0.0
		 */
		public static function create_admin_page() { ?>
            <div class="wrap">
                <div class="qubely-options-section qubely-mt-20 qubely-mb-30" style="background-image: url(<?php echo QUBELY_DIR_URL.'assets/img/options-logo.png' ?>)">
                    <div class="qubely-options-section-header">
                        <div class="qubely-header-left">
                            <h2 class="qubely-options-section-title"><?php esc_attr_e('Welcome to Qubely! - Version ', 'qubely'); echo QUBELY_VERSION; ?></h2>
                            <h3 class="qubely-options-section-subtitle"><?php esc_attr_e('Full-Fledged Gutenburg Toolkit', 'qubely') ?></h3>
                        </div>
                        <div class="qubely-header-right qubely-option-logo">
                            <img src="<?php echo QUBELY_DIR_URL.'assets/img/logo.svg' ?>" alt="Logo">
                        </div>
                    </div>

                    <h4 class="qubely-options-section-title">
                        <?php esc_attr_e('Qubely Core Features', 'qubely') ?>
                        <img src="<?php echo  QUBELY_DIR_URL . 'assets/img/admin/thumbs-up@1x.png'; ?>" srcset="<?php echo  QUBELY_DIR_URL . 'assets/img/admin/thumbs-up@1x.png'; ?> 1x, <?php echo  QUBELY_DIR_URL . 'assets/img/admin/thumbs-up@2x.png'; ?> 2x" alt="<?php echo esc_attr('Features'); ?>">
                    </h4>
                    <div class="qubely-row qubely-columns-2">
                        <div>
                            <ul class="qubely-options-features">
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Predefined sections'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Modern layout packs'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Highly customizable row columns'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Row video background & blend mode'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Drag column resizing'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Shape divider/builder'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Device specific responsive controls'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Unlimited Google web fonts & system fonts'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Classic & gradient color and background'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Built-in animation'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Box-shadow'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Font Awesome 5 Icons and line icons'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Custom CSS'); ?></li>
                            </ul>
                            <div class="qubely-mb-30">
                                <a href="https://www.themeum.com/docs/qubely-introduction/" target="_blank" class="button button-large button-primary"><?php esc_attr_e('Documentation'); ?></a>
                            </div>

                            <hr class="qubely-mb-30" />
                            <h3>Settings</h3>
                            <form method="post" action="options.php">
                                <?php
                                settings_fields( 'qubely_options' );
                                $option_data    = get_option( 'qubely_options' );
                                ?>

                                <table class="form-table wpex-custom-admin-login-table">
                                    <tr>
                                        <th scope="row"><?php esc_html_e( 'CSS Save Method', 'qubely' ); ?></th>
                                        <td>
                                            <?php $value = $option_data['css_save_as']; ?>
                                            <select name="qubely_options[css_save_as]">
                                                <?php
                                                $options = array(
                                                    'wp_head'   => __( 'Header','qubely' ),
                                                    'filesystem' => __( 'File System','qubely' ),
                                                );
                                                foreach ( $options as $id => $label ) { ?>
                                                    <option value="<?php echo esc_attr( $id ); ?>" <?php selected( $value, $id, true ); ?>>
                                                        <?php echo strip_tags( $label ); ?>
                                                    </option>
                                                <?php } ?>
                                            </select>
                                            <p class="description"> <?php _e('Select where you want to save CSS.', 'qubely'); ?></p>

                                            <?php submit_button(); ?>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>

                        <div>
                            <div class="qubely-embed-responsive">
                                <iframe class="qubely-embed-responsive-item" src="https://www.youtube.com/embed/oLFeWSS9HhU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="qubely-options-section">
                    <h3 class="qubely-options-section-title">
                        <?php esc_attr_e('Enable / Disable Blocks', 'qubely') ?>
                        <img src="<?php echo  QUBELY_DIR_URL . 'assets/img/admin/pointer@1x.png'; ?>" srcset="<?php echo  QUBELY_DIR_URL . 'assets/img/admin/pointer@1x.png'; ?> 1x, <?php echo  QUBELY_DIR_URL . 'assets/img/admin/pointer@2x.png'; ?> 2x" alt="<?php echo esc_attr('Pointer'); ?>">
                    </h3>
                    <div class="qubely-options-block-list">
                        <?php
                        $blocks = self::blocks_array();
                        $unregistered_blocks = get_option( 'qubely_unregistered_blocks', array() );
                        if ( ! is_array( $unregistered_blocks ) ) {
                            $unregistered_blocks = array();
                        }
                        foreach ( $blocks as $block_key => $block ) {
                            if ( in_array( $block['slug'], $unregistered_blocks ) ) {
                                $enabled_class = 'qubely-block-inactive';
                            } else {
                                $enabled_class = 'qubely-block-active';
                            }
                            echo '<div class="qubely-options-block-item">';
                            echo '<div class="qubely-options-block ' . esc_attr( $enabled_class ) . '">';
                            echo '<img src="' . esc_url( $block['image'] ) . '" alt="'. esc_html( $block['name'] ) .'">';
                            echo '<h3>' . esc_html( $block['name'] ) . '</h3>';
                            echo '<p>' . wp_kses_post( $block['desc'] ) . '</p>';
                            echo '<div class="qubely-options-block-toggle"><span>Enable</span><a class="qubely-block-button-toggle" data-block-slug="' . esc_attr( $block['slug'] ) . '" href="#"></a><span>Disable</span></div>';
                            echo '</div>';
                            echo '</div>';
                        }
                        ?>
                    </div>
                </div>
            </div>
        <?php }
        
        public static function blocks_array() {
            $blocks = array (
                'qubely/accordion'   => array (
                    'slug'  => 'qubely/accordion',
                    'name'  => __( 'Accordion', 'qubely' ),
                    'desc'  => __( 'Display creative collapsible texts with Qubely Accordion.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-accordion.svg',

                ),
                'qubely/advancedlist'   => array (
                    'slug'  => 'qubely/advancedlist',
                    'name'  => __( 'Advanced List', 'qubely' ),
                    'desc'  => __( 'Create stylist list items using this block.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-advanced-list.svg',
                ),
                'qubely/text'   => array (
                    'slug'  => 'qubely/text',
                    'name'  => __( 'Advanced Text', 'qubely' ),
                    'desc'  => __( 'Apply texts and tweak designs with Qubely Advanced Text.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-text.svg',
                ),
                'qubely/wrapper'   => array (
                    'slug'  => 'qubely/wrapper',
                    'name'  => __( 'Block Wrapper', 'qubely' ),
                    'desc'  => __( 'Place icons of various preset styles with Qubely icons.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-wrapper.svg',
                ),
                'qubely/button'   => array (
                    'slug'  => 'qubely/button',
                    'name'  => __( 'Button', 'qubely' ),
                    'desc'  => __( 'Create stylish call-to-action buttons with Qubely Buttons.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-button.svg',
                ),
                'qubely/buttongroup'   => array (
                    'slug'  => 'qubely/buttongroup',
                    'name'  => __( 'Button Group', 'qubely' ),
                    'desc'  => __( 'Bunch together a group of useful buttons with Qubely Button Group.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-button-group.svg',
                ),
                'qubely/contactform'   => array (
                    'slug'  => 'qubely/contactform',
                    'name'  => __( 'Contact Form', 'qubely' ),
                    'desc'  => __( 'Display creative collapsible texts with Qubely Accordion.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-contact-form.svg',
                ),
                'qubely/counter'   => array (
                    'slug'  => 'qubely/counter',
                    'name'  => __( 'Counter', 'qubely' ),
                    'desc'  => __( 'Set counters in your pages and posts with Qubely Counter.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-counter.svg',
                ),
                'qubely/divider'   => array (
                    'slug'  => 'qubely/divider',
                    'name'  => __( 'Divider', 'qubely' ),
                    'desc'  => __( 'Use beautiful pre-designed dividers with Qubely Divider.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-divider.svg',
                ),
                'qubely/heading'   => array (
                    'slug'  => 'qubely/heading',
                    'name'  => __( 'Heading', 'qubely' ),
                    'desc'  => __( 'Make headlines/titles that attract users with Qubely Heading.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-heading.svg',
                ),
                'qubely/icon'   => array (
                    'slug'  => 'qubely/icon',
                    'name'  => __( 'Icon', 'qubely' ),
                    'desc'  => __( 'Place icons of various preset styles with Qubely icons.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-icon.svg',
                ),
                'qubely/iconlist'   => array (
                    'slug'  => 'qubely/iconlist',
                    'name'  => __( 'Icon List', 'qubely' ),
                    'desc'  => __( 'Qubely advanced list block.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-icon-list.svg',
                ),
                'qubely/infobox'   => array (
                    'slug'  => 'qubely/infobox',
                    'name'  => __( 'Info Box', 'qubely' ),
                    'desc'  => __( 'Be creatively informative with Qubely Info Box.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-info-box.svg',
                ),
                'qubely/map'   => array (
                    'slug'  => 'qubely/map',
                    'name'  => __( 'Google Map', 'qubely' ),
                    'desc'  => __( 'Embed Google Maps easily with Qubely Google Maps.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-map.svg',
                ),
                'qubely/pricing'   => array (
                    'slug'  => 'qubely/pricing',
                    'name'  => __( 'Pricing', 'qubely' ),
                    'desc'  => __( 'Showcase Pricing in beautiful pre-designed Pricing Table with Qubely Pricing.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-pricing.svg',
                ),
                'qubely/progressbar'   => array (
                    'slug'  => 'qubely/progressbar',
                    'name'  => __( 'Progress Bar', 'qubely' ),
                    'desc'  => __( 'Showcase stats using progress bars with Qubely Progress Bar.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-progressbar.svg',
                ),
                'qubely/row'   => array (
                    'slug'  => 'qubely/row',
                    'name'  => __( 'Row', 'qubely' ),
                    'desc'  => __( 'Include unique row and column layouts with Qubely Row.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-row.svg',
                ),
                'qubely/socialicons'   => array (
                    'slug'  => 'qubely/socialicons',
                    'name'  => __( 'Social Icons', 'qubely' ),
                    'desc'  => __( 'Add all your social media profiles in one place with Qubely Social Icons.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-social-icons.svg',
                ),
                'qubely/tabs'   => array (
                    'slug'  => 'qubely/tabs',
                    'name'  => __( 'Tabs', 'qubely' ),
                    'desc'  => __( 'Showcase features in beautiful pre-designed tabs with Qubely Tabs.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-tabs.svg',
                ),
                'qubely/team'   => array (
                    'slug'  => 'qubely/team',
                    'name'  => __( 'Team', 'qubely' ),
                    'desc'  => __( 'Display team member with social profiles.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-team.svg',
                ),
                'qubely/testimonial'   => array (
                    'slug'  => 'qubely/testimonial',
                    'name'  => __( 'Testimonial', 'qubely' ),
                    'desc'  => __( 'Display testimonials from clients with Qubely Testimonials.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-testimonial.svg',
                ),
                'qubely/videopopup'   => array (
                    'slug'  => 'qubely/videopopup',
                    'name'  => __( 'Video Popup', 'qubely' ),
                    'desc'  => __( 'Engage your audience with videos with Qubely Video Popup.', 'qubely' ),
				    'image' => QUBELY_DIR_URL . 'assets/img/blocks/block-videopopup.svg',
                ),
            
            );
            return apply_filters( 'qubely_blocks_enable_disable_array', $blocks );
        }
	}
}