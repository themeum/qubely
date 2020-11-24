<?php
/**
 * Handles initialization of classes
 * 
 * @package Qubely
 */

namespace Qubely;

defined( 'ABSPATH' ) || exit;

/**
 * Init class
 */
final class Init {

    /**
	 * Store all the classes inside an array
	 *
	 * @return array Full list of classes
	 */
	public static function get_services() {
		return array(
			Api\Ajax::class,
			Api\Rest_Api::class,
			Setup\Setup::class,
			Setup\Enqueue::class,
            Admin\Dashboard::class,
		);
	}

	/**
	 * Loop through the classes, initialize them, and call the register() method if it exists
	 *
	 * @return void
	 */
	public static function register_services() {
		foreach ( self::get_services() as $class ) {
			$service = self::instantiate( $class );
			if ( method_exists( $service, 'register' ) ) {
				$service->register();
			}
		}
	}

	/**
	 * Initialize the class
	 *
	 * @param  class $class   class from the services array.
	 * @return class instance   new instance of the class
	 */
	private static function instantiate( $class ) {
		return new $class();
	}
}