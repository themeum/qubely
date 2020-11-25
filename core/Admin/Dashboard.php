<?php
/**
 * Handles Dashboard screen
 * 
 * @package Qubely
 */

namespace Qubely\Admin;

use Qubely\Admin\Views\Settings;
use Qubely\Admin\Views\Getting_Started;

defined( 'ABSPATH' ) || exit;

/**
 * Dashboard class
 */
class Dashboard {

    /**
     * Public $settings
     * 
     * @var [type]
     */
    public $settings;

    /**
     * Public $getting_started
     *
     * @var [type]
     */
    public $getting_started;

    /**
     * Register
     */
    public function register() {
        add_action( 'init', array( $this, 'init_settings' ) );
        add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
    }

    /**
     * Init settings
     */
    public function init_settings() {
        $this->settings        = new Settings();
        $this->getting_started = new Getting_Started();
    }

    /**
     * Add Menu Page
     *
     * @since 1.0.0
     */
    public function add_admin_menu() {
       
        $parent_slug     = 'qubely-settings';
        $capabilities    = 'manage_options';
        
        add_menu_page(
            esc_html__( 'Qubely', 'qubely' ),
            esc_html__( 'Qubely', 'qubely' ),
            $capabilities,
            $parent_slug,
            array( $this->settings, 'markup' ),
            QUBELY_DIR_URL . 'assets/img/qubely-logo-white.svg'
        );

        add_submenu_page(
            $parent_slug,
            esc_html__( 'Qubely Settings', 'qubely' ),
            esc_html__( 'Settings', 'qubely' ),
            $capabilities,
            'qubely-settings',
            array( $this->settings, 'markup' )
        );

        add_submenu_page(
            $parent_slug,
            esc_html__( 'Getting Started', 'qubely' ),
            esc_html__( 'Getting Started', 'qubely' ),
            $capabilities,
            'qubely',
            array( $this->getting_started, 'markup' )
        );
    }
}
