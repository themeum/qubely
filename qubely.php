<?php
/*
 * Plugin Name:       Qubely - Advanced Gutenberg Blocks
 * Plugin URI:        https://www.themeum.com/
 * Description:       The one and only Gutenberg block plugin you will ever need.
 * Version: 		  1.6.2
 * Author:            Themeum.com
 * Author URI:        https://www.themeum.com/
 * Text Domain:       qubely
 * Requires at least: 5.0
 * Tested up to: 	  5.3
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * 
 * @package Qubely
 */

defined('ABSPATH') || exit;

// Language Load.
add_action( 'init', 'qubely_language_load' );

function qubely_language_load() {
    load_plugin_textdomain( 'qubely', false,  basename( dirname( __FILE__ ) ) . '/languages/' );
}

// Load autoloader.
if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
    require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

// Plugin constants.
define( 'QUBELY_LICENSE', 'free' );
define( 'QUBELY_VERSION', '1.6.2' );
define( 'QUBELY_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'QUBELY_DIR_PATH', plugin_dir_path( __FILE__ ) );

// Activation hook.
register_activation_hook( __FILE__, 'qubely_option_data' );

/**
 * Initial option data
 *
 * @return void
 */
function qubely_option_data() {
    $option_data = array(
        'css_save_as' => 'wp_head'
    );

    if ( ! get_option( 'qubely_options' ) ) {
        update_option( 'qubely_options', $option_data );
    }
}

// Version Check & Include Core
if ( ! version_compare( PHP_VERSION, '5.4', '>=' ) ) {
    add_action( 'admin_notices', 'qubely_php_error_notice' ); // PHP Version Check
} elseif ( ! version_compare( get_bloginfo( 'version' ), '4.5', '>=' ) ) {
    add_action( 'admin_notices', 'qubely_wordpress_error_notice' ); // WordPress Version Check
} else {
    if ( class_exists( 'Qubely\\Init' ) ) {
        Qubely\Init::register_services();
    }
}

/**
 * PHP error notice
 *
 * @return void
 */
function qubely_php_error_notice() {
    $message      = sprintf( esc_html__( 'QUBELY Blocks requires PHP version %s or more.', 'qubely' ), '5.4' );
    $html_message = sprintf( '<div class="notice notice-error is-dismissible">%s</div>', wpautop( $message ) );
    echo wp_kses_post( $html_message );
}

/**
 * WordPress error notice
 *
 * @return void
 */
function qubely_wordpress_error_notice() {
    $message      = sprintf( esc_html__( 'QUBELY Blocks requires WordPress version %s or more.', 'qubely' ), '4.7' );
    $html_message = sprintf( '<div class="notice notice-error is-dismissible">%s</div>', wpautop( $message ) );
    echo wp_kses_post( $html_message );
}
