<?php

class Settings {

    public $options;
    public $fields;

    public function __construct()
    {
        require __DIR__ . '/Fields.php';
        add_action('init', array($this, 'save_options'));
        add_action('init', array($this, 'option_setter'));
    }

    public function option_setter() {
        $this->options = (array) maybe_unserialize(get_option('qubely_options'));
        $this->fields = $this->fields();
    }

    /**
     * Save options to database
     */
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

    /**
     * @param null $key
     * @param bool $default
     * @return bool|mixed|void
     * Get option by key
     */
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

    public function fields() {
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

    public function markup()
    {
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Qubely Settings', 'qubely'); ?></h1>
            <div id="qubely-settings-tabs" class="nav-tab-wrapper">
                <?php
                $index = 0;
                foreach ($this->fields() as $key => $options) {
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
                foreach ($this->fields() as $key => $options) {
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
}