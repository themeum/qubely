<?php
/*
 * Plugin Name:       Qubely Blocks - Full-fledged Gutenberg Toolkit
 * Plugin URI:        https://www.themeum.com/
 * Description:       The one and only Gutenberg block plugin you will ever need.
 * Version: 		  1.0.0
 * Author:            Themeum.com
 * Author URI:        https://themeum.com/
 * Text Domain:       qubely
 * Requires at least: 5.0
 * Tested up to: 	  5.2
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Language Load
add_action( 'init', 'qubely_language_load');
function qubely_language_load(){
    load_plugin_textdomain( 'qubely', false,  basename(dirname(__FILE__)).'/languages/' );
}

// Define Version
define('QUBELY_VERSION', '1.0.0');

// Define License
define('QUBELY_LICENSE', 'free');

// Define Dir URL
define('QUBELY_DIR_URL', plugin_dir_url(__FILE__));

// Define Physical Path
define('QUBELY_DIR_PATH', plugin_dir_path(__FILE__));

// Include Require File
require_once QUBELY_DIR_PATH.'core/initial-setup.php'; // Initial Setup Data

/**
 * Add qubely admin options page
 */
require_once QUBELY_DIR_PATH.'core/Options.php';   // Loading QUBELY Blocks Main Files

if (class_exists('QUBELY_Options')){
    new QUBELY_Options();
}

// Version Check & Include Core
if ( ! version_compare( PHP_VERSION, '5.4', '>=' ) ) {
    add_action('admin_notices', array('QUBELY_Initial_Setup', 'php_error_notice')); // PHP Version Check
} elseif ( ! version_compare( get_bloginfo( 'version' ), '4.5', '>=' ) ) {
    add_action('admin_notices', array('QUBELY_Initial_Setup', 'wordpress_error_notice')); // WordPress Version Check
} else {
    require_once QUBELY_DIR_PATH.'core/QUBELY.php';   // Loading QUBELY Blocks Main Files
}