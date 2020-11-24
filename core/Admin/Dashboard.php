<?php
/**
 * Handles Dashboard screen
 * 
 * @package Qubely
 */

namespace Qubely\Admin;

use Qubely\Admin\Views\Getting_Started;

defined( 'ABSPATH' ) || exit;

/**
 * Dashboard class
 */
class Dashboard {

    /**
     * Register
     */
    public function register() {
        add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
    }

    /**
     * Add Menu Page
     *
     * @since 1.0.0
     */
    public function add_admin_menu() {
       
        $parent_slug     = 'qubely-settings';
        $capabilities    = 'manage_options';
        $getting_started = new Getting_Started();

        add_menu_page(
            esc_html__( 'Qubely', 'qubely' ),
            esc_html__( 'Qubely', 'qubely' ),
            $capabilities,
            $parent_slug,
            array( $this, 'markup' ),
            QUBELY_DIR_URL . 'assets/img/qubely-logo-white.svg'
        );

        add_submenu_page(
            $parent_slug,
            esc_html__( 'Qubely Settings', 'qubely' ),
            esc_html__( 'Settings', 'qubely' ),
            $capabilities,
            'qubely-settings',
            array( $this, 'markup' )
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('Getting Started', 'qubely'),
            esc_html__('Getting Started', 'qubely'),
            $capabilities,
            'qubely',
            array($getting_started, 'markup')
        );
    }

    /**
     * Markup
     */
    public function markup() {
        echo '<div class="wrap"><div id="qubely-dashboard">Dashboard</div></div>';
    }
}