<?php
// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('QUBELY_Options')) {

    class QUBELY_Options
    {

        public $settings;

        public function __construct()
        {
            add_action('init', [$this, 'init']);
            add_action('admin_menu', [$this, 'admin_menu']);
        }

        public function init()
        {
            require __DIR__ . '/admin-views/Settings.php';
            $this->settings = new QUBELY_Settings();
        }

        /**
         * Add Menu Page Callback
         *
         * @since 1.0.0
         */
        public function admin_menu()
        {
            $parent_slug = 'qubely-settings';
            $cap         = 'manage_options';

            add_menu_page(
                esc_html__('Qubely', 'qubely'),
                esc_html__('Qubely', 'qubely'),
                $cap,
                $parent_slug,
                [$this->settings, 'markup'],
                QUBELY_DIR_URL . 'assets/img/qubely-logo-white.svg'
            );

            add_submenu_page(
                $parent_slug,
                esc_html__('Qubely Settings', 'qubely'),
                esc_html__('Settings', 'qubely'),
                $cap,
                'qubely-settings',
                [$this->settings, 'markup']
            );

        }
    }
}
