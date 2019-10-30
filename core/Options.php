<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

if (!class_exists('QUBELY_Options')) {

    class QUBELY_Options
    {
        // Constructor
        public function __construct()
        {
            add_action('admin_menu', array($this, 'add_admin_menu'));
            add_action('admin_init', array($this, 'register_settings'));
        }

        /**
         * Add Menu Page Callback
         *
         * @since 1.0.0
         */
        public  function add_admin_menu()
        {
            add_menu_page(
                esc_html__('Qubely Options', 'qubely'),
                esc_html__('Qubely Options', 'qubely'),
                'manage_options',
                'qubely-settings',
                array($this, 'create_admin_page'),
                QUBELY_DIR_URL . 'assets/img/qubely-logo-white.svg'
            );
        }

        /**
         * Register a setting and its sanitization callback.
         *
         * @since 1.0.0
         */
        public function register_settings()
        {
            register_setting('qubely_options', 'qubely_options', array($this, 'sanitize'));
        }

        /**
         * Sanitization callback
         *
         * @since 1.0.0
         */
        public  function sanitize($options)
        {
            if ($options) {
                if (!empty($options['css_save_as'])) {
                    $options['css_save_as'] = sanitize_text_field($options['css_save_as']);
                }
            }
            return $options;
        }

        /**
         * Settings page output
         *
         * @since 1.0.0
         */
        public function create_admin_page()
        { ?>
            <div class="wrap">
                <div class="qubely-options-section qubely-mt-20 qubely-mb-30" style="background-image: url(<?php echo QUBELY_DIR_URL . 'assets/img/options-logo.png' ?>)">
                    <div class="qubely-options-section-header">
                        <div class="qubely-header-left">
                            <h2 class="qubely-options-section-title"><?php esc_attr_e('Welcome to Qubely! - Version ', 'qubely');
                                                                        echo QUBELY_VERSION; ?></h2>
                            <h3 class="qubely-options-section-subtitle"><?php esc_attr_e('Full-Fledged Gutenburg Toolkit', 'qubely') ?></h3>
                        </div>
                        <div class="qubely-header-right qubely-option-logo">
                            <img src="<?php echo QUBELY_DIR_URL . 'assets/img/logo.svg' ?>" alt="Logo">
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
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Unlimited Google fonts & system fonts'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Classic & gradient color background'); ?></li>
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
                                settings_fields('qubely_options');
                                $option_data    = get_option('qubely_options');
                                ?>

                                <table class="form-table wpex-custom-admin-login-table">
                                    <tr>
                                        <th scope="row"><?php esc_html_e('CSS Save Method', 'qubely'); ?></th>
                                        <td>
                                            <?php $value = $option_data['css_save_as']; ?>
                                            <select name="qubely_options[css_save_as]">
                                                <?php
                                                $options = array(
                                                    'wp_head'   => __('Header', 'qubely'),
                                                    'filesystem' => __('File System', 'qubely'),
                                                );
                                                foreach ($options as $id => $label) { ?>
                                                    <option value="<?php echo esc_attr($id); ?>" <?php selected($value, $id, true); ?>>
                                                        <?php echo strip_tags($label); ?>
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
            </div>
        <?php }
    }
}
