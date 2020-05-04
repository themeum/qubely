<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

if (!class_exists('QUBELY_Options')) {

    class QUBELY_Options
    {

        public $settings;

        public function __construct()
        {
            require __DIR__ . '/admin-views/Settings.php';
            $this->settings = new Settings();
            add_action('admin_menu', array($this, 'admin_menu'));
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

        /**
         * Render Settings Page
         */
        public function settings_page()
        {
            return $this->settings->markup();
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
