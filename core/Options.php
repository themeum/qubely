<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

if (!class_exists('QUBELY_Options')) {

    class QUBELY_Options
    {

        public $options;
        public $options_attr;
        public $fields;

        public function __construct()
        {
            add_action('admin_menu', array($this, 'admin_menu'));
            add_action('init', array($this, 'save_options'));
            add_action('init', array($this, 'fields'));
            add_action('init', array($this, 'option_setter'));
        }

        public function option_setter() {
            $this->options = (array) maybe_unserialize(get_option('qubely_options'));
            $this->options_attr = $this->options_attr();
        }
        /**
         * Initialize Field class
         */
        public function fields()
        {
            require __DIR__ . '/admin-views/Fields.php';
            $this->fields = new Fields();
        }

        /**
         * Add Menu Page Callback
         *
         * @since 1.0.0
         */
        public function admin_menu()
        {

            $parent_slug = 'qubely-settings';
            $cap = 'manage_options';

            add_menu_page(
                esc_html__('Qubely', 'qubely'),
                esc_html__('Qubely', 'qubely'),
                $cap,
                $parent_slug,
                array($this, 'settings_page'),
                QUBELY_DIR_URL . 'assets/img/qubely-logo-white.svg'
            );

            add_submenu_page(
                $parent_slug,
                esc_html__('Qubely Settings', 'qubely'),
                esc_html__('Settings', 'qubely'),
                $cap,
                'qubely-settings',
                array($this, 'settings_page')
            );

            add_submenu_page(
                $parent_slug,
                esc_html__('Getting Started', 'qubely'),
                esc_html__('Getting Started', 'qubely'),
                $cap,
                'qubely',
                array($this, 'getting_started')
            );
        }

        public function settings_page()
        {
            return $this->options_generator();
        }

        public function save_options() {
            if (
                !isset($_POST['qubely_option_save']) ||
                ! isset($_POST['_wpnonce']) ||
                ! wp_verify_nonce( $_POST['_wpnonce'], 'qubely_option_save' )
            ) return;

            $option = (array) isset($_POST['qubely_options']) ? $_POST['qubely_options'] : array();
            $option = apply_filters('qubely_options_input', $option);
            update_option('qubely_options', $option);
        }

        public function get_option($key = null, $default = false) {
            $options = $this->options;
            if(empty($options) || ! is_array($options) || !$key) {
                return $default;
            }

            if(array_key_exists($key, $options)) {
                return apply_filters($key, $options[$key]);
            }

            return $default;
        }

        public function options_attr() {
            $attr = array(
                'general' => array(
                    'label' => 'General',
                    'fields' => array(
                        'qubely_gmap_api_key' => array(
                            'type' => 'text',
                            'label' => __('Google Map API Keys', 'qubely'),
                            'default' => '',
                            'desc' => __('Enter your Google map api key', 'qubely'),
                            'placeholder' => '',
                            'suffix' => '',
                            'size' => 'regular',
                        ),
                        'qubely_recaptcha_site_key' => array(
                            'type' => 'text',
                            'label' => __('ReCaptcha site key', 'qubely'),
                            'default' => '',
                            'desc' => __('Enter your ReCaptcha site key', 'qubely'),
                            'placeholder' => '',
                            'class' => '',
                            'size' => 'regular',
                        ),
                        'qubely_recaptcha_secret_key' => array(
                            'type' => 'text',
                            'label' => __('ReCaptcha secret key', 'qubely'),
                            'default' => '',
                            'desc' => __('Enter your ReCaptcha secret key', 'qubely'),
                            'placeholder' => '',
                            'suffix' => '',
                            'size' => 'regular',
                        )
                    )
                ),
                'style' => array(),
                'advanced' => array(
                    'label' => 'Advanced',
                    'fields' => array(
                        'css_save_as' => array(
                            'type' => 'select',
                            'label' => __('CSS location', 'qubely'),
                            'default' => '',
                            'desc' => __('Select where you want to save CSS', 'qubely'),
                            'options' => array(
                                'wp_head'   => __('Header', 'qubely'),
                                'filesystem' => __('File System', 'qubely'),
                            ),
                            'suffix' => '',
                            'size' => 'regular',
                        )
                    )
                )
            );

            return apply_filters('qubely_options', $attr);
        }

        public function options_generator()
        {
            ?>
                <div class="wrap">
                    <h1><?php esc_html_e('Qubely Settings', 'qubely'); ?></h1>
                    <div id="qubely-settings-tabs" class="nav-tab-wrapper">
                        <?php
                            $index = 0;
                            foreach ($this->options_attr as $key => $options) {
                                $index++;

                                if(!isset($options['fields']) || !is_array($options['fields'])) continue;
                                $options['label'] = !empty($options['label']) ? $options['label'] : $key;
                                ?>
                                    <a class="nav-tab <?php echo $index === 0 ? 'nav-tab-active' : ''  ?>" href="#<?php echo esc_attr($key) ?>"><?php echo esc_html($options['label']) ?></a>
                                <?php
                            }
                        ?>
                    </div>
                    <form id="qubely-settings-tabs-content" method="POST">
                        <?php wp_nonce_field('qubely_option_save') ?>
                        <?php
                            $index = 0;
                            foreach ($this->options_attr as $key => $options) {
                                $index++;
                                if(!isset($options['fields']) || !is_array($options['fields'])) continue;
                                ?>
                                    <div class="qubely-settings-inner" id="<?php echo esc_attr($key); ?>">
                                        <table class="form-table">
                                            <tbody>
                                                <?php
                                                    foreach ($options['fields'] as $field_key => $field) {
                                                        $field['key'] = $field_key;
                                                        $field['value'] = $this->get_option($field_key, $field['default']);
                                                        Fields::get($field['type'], $field);
                                                    }
                                                ?>
                                            </tbody>
                                        </table>
                                    </div>
                                <?php
                            }
                            submit_button('Save changes', 'primary', 'qubely_option_save');
                        ?>
                    </form>
                </div>
            <?php
        }

        /**
         * Settings page output
         *
         * @since 1.0.0
         */
        public function getting_started()
        {
            return require __DIR__ . '/admin-views/getting-started.php';
        }
    }
}
