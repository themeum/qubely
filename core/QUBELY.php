<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class QUBELY
{

	protected $api_base_url = 'http://qubely.io/wp-json/restapi/v2/';
	protected $qubely_api_request_body;
	protected $qubely_api_request_body_default;

	protected $option_keyword = 'qubely_global_options';

	/**
	 * QUBELY constructor
	 */
	public function __construct()
	{
		$this->qubely_api_request_body_default = array(
			'request_from'  => 'qubely'
			//'request_qubely_version'  => QUBELY_VERSION,
		);
		$this->qubely_api_request_body = apply_filters('qubely_api_request_body', array());

		// Editor Load
		add_action('enqueue_block_editor_assets', array($this, 'qubely_editor_assets'));

		// Editor Load
		add_action('admin_enqueue_scripts', array($this, 'qubely_admin_assets'));

		// Block Categories
		add_filter('block_categories', array($this, 'qubely_block_categories'), 1, 2);

		// Add Styles and Scripts
		add_action('wp_enqueue_scripts', array($this, 'qubely_enqueue_style'));

		// Add post meta key 
		$this->add_global_settings_post_meta();

		// Common style 

		$this->enqueue_block_css();

		add_action('rest_api_init', array($this, 'register_api_hook'));
		add_action('delete_post', array($this, 'before_delete_post'), 10);

		//Get layout and block from Server and Cache
		add_action('wp_ajax_qubely_get_sections', array($this, 'qubely_get_sections'));
		add_action('wp_ajax_qubely_get_layouts', array($this, 'qubely_get_layouts'));

		add_action('wp_ajax_qubely_get_single_layout', array($this, 'qubely_get_single_layout'));
		add_action('wp_ajax_qubely_get_single_block', array($this, 'qubely_get_single_section'));

		add_action('wp_ajax_qubely_get_saved_block', array($this, 'qubely_get_saved_block'));
		add_action('wp_ajax_qubely_delete_saved_block', array($this, 'qubely_delete_saved_block'));

		add_action('wp_ajax_qubely_send_form_data', array($this, 'qubely_send_form_data'));

		// dynamic blocks
		add_action('init', array($this, 'init_dynamic_blocks'));
	}

	/**
	 * Init dynamic blocks frontend
	 */
	public function init_dynamic_blocks()
	{
		require_once QUBELY_DIR_PATH . 'core/blocks/postgrid.php';
	}

	/**
	 * Load Editor Styles and Scripts
	 * @since 1.0.0
	 */
	public function qubely_editor_assets()
	{
		wp_enqueue_script('qubely-blocks-js', QUBELY_DIR_URL . 'assets/js/qubely.dev.js', array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), QUBELY_VERSION, true);

		$palette = get_theme_support( 'qubely-color-palette' );
		$palette = array_replace( array('#062040','#566372','#2084F9','#F3F3F3','#EEEEEE','#FFFFFF'), ($palette ? $palette[0] : array()) );
		wp_localize_script('qubely-blocks-js', 'qubely_admin', array(
			'plugin' => QUBELY_DIR_URL,
            'ajax' => admin_url('admin-ajax.php'),
            'pro_enable' => defined('QUBELY_PRO_VERSION') ? true : false,
			'shapes' => $this->getSvgShapes(),
			'all_taxonomy' => $this->get_all_taxonomy(),
			'image_sizes'  => $this->get_all_image_sizes(),
			'palette' => $palette
		));
	}

	/**
	 * Load SvgShapes
	 * @since 1.0.0
	 */
	public function getSvgShapes()
	{
		$shape_path = QUBELY_DIR_PATH . 'assets/shape';
		$shapes = glob($shape_path . '/*.svg');
		$shapeArray = array();
		if (count($shapes)) {
			foreach ($shapes as $shape) {
				$shapeArray[str_replace(array('.svg', $shape_path . '/'), '', $shape)] = file_get_contents($shape);
			}
		}
		return $shapeArray;
	}


	/**
	 * Load SvgShapes
	 * @since 1.0.0
	 */
	public function getSvgDivider()
	{
		$divider_path = QUBELY_DIR_PATH . 'assets/divider';
		$dividers = glob($divider_path . '/*.svg');
		$dividerArray = array();
		if (count($dividers)) {
			foreach ($dividers as $divider) {
				$dividerArray[str_replace(array('.svg', $divider_path . '/'), '', $divider)] = file_get_contents($divider);
			}
		}
		return $dividerArray;
	}


	/**
	 * Admin Style & Script
	 * @since 1.0.0
	 */
	public function qubely_admin_assets()
	{
		wp_enqueue_style('qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION);
		wp_enqueue_style('font-awesome', QUBELY_DIR_URL . 'assets/css/font-awesome.min.css', false, QUBELY_VERSION);
		wp_enqueue_style('qubely-options', QUBELY_DIR_URL . 'assets/css/options.css', false, QUBELY_VERSION);
		wp_enqueue_script('qubely-magnific-popup', QUBELY_DIR_URL . 'assets/js/jquery.magnific-popup.min.js', array('jquery'), QUBELY_VERSION, true);
		wp_enqueue_style('qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION);
	}


	/**
	 * Get Post Types.
	 *
	 * @since 1.0.9
	 */
	public static function get_post_types()
	{

		$post_types = get_post_types(
			array(
				'public'       => true,
				'show_in_rest' => true,
			),
			'objects'
		);

		$options = array();

		foreach ($post_types as $post_type) {
			if ('product' === $post_type->name) {
				continue;
			}

			$options[] = array(
				'value' => $post_type->name,
				'label' => $post_type->label,
			);
		}

		return $options;
	}

	/**
	 * Get all taxonomies.
	 *
	 * @since 1.0.9
	 */
	public static function get_all_taxonomy()
	{

		$post_types = self::get_post_types();

		$taxonomy_array = array();

		foreach ($post_types as  $value) {
			$post_type = $value['value'];

			$taxonomies = get_object_taxonomies($post_type, 'objects');
			$data       = array();

			foreach ($taxonomies as $tax_slug => $tax) {
				if (!$tax->public || !$tax->show_ui) {
					continue;
				}

				$data[$tax_slug] = $tax;

				$terms = get_terms($tax_slug);

				$related_tax = array();

				if (!empty($terms)) {
					foreach ($terms as  $term) {
						$related_tax[] = array(
							'value'   => $term->term_id,
							'label' => $term->name,
						);
					}

					$taxonomy_array[$post_type]['terms'][$tax_slug] = $related_tax;
				}
			}
			$taxonomy_array[$post_type]['taxonomy'] = $data;
		}

		return  $taxonomy_array;
	}
	/**
	 * Get all image sizes.
	 *
	 * @since 1.0.9
	 */
	public static function get_all_image_sizes()
	{

		global $_wp_additional_image_sizes;

		$sizes       = get_intermediate_image_sizes();
		$image_sizes = array();

		$image_sizes[] = array(
			'value' => 'full',
			'label' => esc_html__('Full', 'qubely'),
		);

		foreach ($sizes as $size) {
			if (in_array($size, array('thumbnail', 'medium', 'medium_large', 'large'), true)) {
				$image_sizes[] = array(
					'value' => $size,
					'label' => ucwords(trim(str_replace(array('-', '_'), array(' ', ' '), $size))),
				);
			} else {
				$image_sizes[] = array(
					'value' => $size,
					'label' => sprintf(
						'%1$s (%2$sx%3$s)',
						ucwords(trim(str_replace(array('-', '_'), array(' ', ' '), $size))),
						$_wp_additional_image_sizes[$size]['width'],
						$_wp_additional_image_sizes[$size]['height']
					),
				);
			}
		}
		return $image_sizes;
	}


	/**
	 * Frontend Style & Script
	 * @since 1.0.0
	 */
	public function qubely_enqueue_style()
	{
		if(get_post_meta(get_the_ID(), '_qubely_css', true) != '') {
			wp_enqueue_style('qubely-animation', QUBELY_DIR_URL . 'assets/css/animation.css', false, QUBELY_VERSION);
			wp_enqueue_style('qubely-font-awesome', QUBELY_DIR_URL . 'assets/css/font-awesome.min.css', false, QUBELY_VERSION);
			wp_enqueue_style('qubely-style-min', QUBELY_DIR_URL . 'assets/css/style.min.css', false, QUBELY_VERSION);
			wp_enqueue_script('qubely-magnific-popup-script', QUBELY_DIR_URL . 'assets/js/jquery.magnific-popup.min.js', array('jquery'), QUBELY_VERSION);
			wp_enqueue_style('qubely-magnific-popup-style', QUBELY_DIR_URL . 'assets/css/magnific-popup.css', false, QUBELY_VERSION);
			wp_enqueue_script('qubely-interaction', QUBELY_DIR_URL .'assets/js/interaction.js', array('jquery'), QUBELY_VERSION, true );
			wp_enqueue_script('common-script', QUBELY_DIR_URL . 'assets/js/common-script.js', array('jquery'), QUBELY_VERSION);
			wp_localize_script('common-script', 'qubely_urls', array(
				'plugin' => QUBELY_DIR_URL,
				'ajax' => admin_url('admin-ajax.php')
			));
		}
	}

	/**
	 * Block Category Add
	 * @since 1.0.0
	 */
	public function qubely_block_categories($categories, $post)
	{
		return array_merge(
			array(
				array(
					'slug' => 'qubely',
					'title' => __('Qubely', 'qubely'),
				)
			),
			$categories
		);
	}


	/**
	 * @since 1.0.0-BETA
	 * Add post meta
	 */
	public function add_global_settings_post_meta()
	{
		register_meta('post', 'qubely_global_settings', [
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string'
		]);

		// @since 1.2.0
		register_meta('post', 'qubely_interactions', [
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string'
		]);
	}


	/**
	 * @since 1.0.0-BETA
	 * qubely api routes
	 */
	public function register_api_hook()
	{
		// For update global options
		register_rest_route(
			'qubely/v1',
			'/global_settings/',
			array(
				array(
					'methods'  => 'GET',
					'callback' => array($this, 'get_global_option')
				),
				array(
					'methods'  => 'POST',
					'callback' => array($this, 'update_global_option'),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
					'args' => array()
				)
			)
		);
		// For css file save
		register_rest_route(
			'qubely/v1',
			'/save_block_css/',
			array(
				array(
					'methods'  => 'POST',
					'callback' => array($this, 'save_block_css'),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
					'args' => array()
				)
			)
		);
	}

	/**
	 * @since 1.0.0-BETA
	 * Api for update global option fields
	 */
	public function update_global_option($request)
	{

		try {
			$params = $request->get_params();
			if (!isset($params['settings']))
				throw new Exception("Settings parameter is missing!");

			$settings = $params['settings'];

			if (get_option($this->option_keyword) == false) {
				add_option($this->option_keyword, $settings);
			} else {
				update_option($this->option_keyword, $settings);
			}

			return ['success' => true, 'message' => "Global option updated!"];
		} catch (Exception $e) {
			return ['success' => false, 'message' => $e->getMessage()];
		}
	}

	/**
	 * @since 1.0.0-BETA
	 * API For Get Global options
	 */
	public function get_global_option()
	{
		try {

			$settings = get_option($this->option_keyword);

			$settings = $settings == false ? json_decode('{}') : json_decode($settings);

			$palette = get_theme_support( 'qubely-color-palette' );
			
			if ($palette) {
				$palette = array_replace( array('#062040','#566372','#2084F9','#F3F3F3','#EEEEEE','#FFFFFF'), ($palette ? $palette[0] : array()) );
				$settings->colorPreset1 = $palette[0];
				$settings->colorPreset2 = $palette[1];
				$settings->colorPreset3 = $palette[2];
				$settings->colorPreset4 = $palette[3];
				$settings->colorPreset5 = $palette[4];
				$settings->colorPreset6 = $palette[6];
			}
			return ['success' => true, 'settings' => $settings];
		} catch (Exception $e) {
			return ['success' => false, 'message' => $e->getMessage()];
		}
	}

	/**
	 * @since 1.0.0-BETA
	 * Save block css for each post in a css file and enqueue the file to the post page
	 */
	public function  save_block_css($request)
	{
		try {
			global $wp_filesystem;
			if (!$wp_filesystem) {
				require_once(ABSPATH . 'wp-admin/includes/file.php');
			}

			$params = $request->get_params();
			$post_id = (int) sanitize_text_field($params['post_id']);

			if( $params['is_remain'] ) {
				$qubely_block_css = $params['block_css'];
				$filename = "qubely-css-{$post_id}.css";
	
				$qubely_block_json = $params['interaction'];
				$jsonfilename = "qubely-json-{$post_id}.json";
	
				$upload_dir = wp_upload_dir();
				$dir = trailingslashit($upload_dir['basedir']) . 'qubely/';
	
				// Add Import in first
				$import_first = $this->set_import_url_to_top_css($qubely_block_css);
	
				//development
				update_post_meta($post_id, '_qubely_css', $import_first);
				if( $qubely_block_json ){
					update_post_meta($post_id,'_qubely_interaction_json',$qubely_block_json);
				}
	
				WP_Filesystem(false, $upload_dir['basedir'], true);
	
				if (!$wp_filesystem->is_dir($dir)) {
					$wp_filesystem->mkdir($dir);
				}
				//If fail to save css in directory, then it will show a message to user
				if (!$wp_filesystem->put_contents($dir . $filename, $import_first)) {
					throw new Exception(__('CSS can not be saved due to permission!!!', 'qubely'));
				}
	
				//If fail to save css in directory, then it will show a message to user
				if ( ! $wp_filesystem->put_contents( $dir . $jsonfilename, $qubely_block_json ) ) {
					throw new Exception(__('JSON can not be saved due to permission!!!', 'qubely')); 
				}
	
				return ['success' => true, 'message' => __('Qubely block css file has been updated.', 'qubely')];
			} else {
				delete_post_meta($post_id, '_qubely_css');
				delete_post_meta($post_id, '_qubely_interaction_json');
				$this->delete_post_resource($post_id);
			}
		} catch (Exception $e) {
			return ['success' => false, 'message' => $e->getMessage()];
		}
	}


	/**
	 * @since 1.0.2
	 * Set font import to the top of the CSS file
	 */
	public function set_import_url_to_top_css($get_css = ''){
		$css_url = "@import url('https://fonts.googleapis.com/css?family=";
		$google_font_exists = substr_count($get_css, $css_url);

		if ($google_font_exists){
			$pattern = sprintf(
				'/%s(.+?)%s/ims',
				preg_quote($css_url, '/'), preg_quote("');", '/')
			);

			if (preg_match_all($pattern, $get_css, $matches)) {
				$fonts = $matches[0];
				$get_css = str_replace($fonts, '', $get_css);
				if( preg_match_all( '/font-weight[ ]?:[ ]?[\d]{3}[ ]?;/' , $get_css, $matche_weight ) ){ // short out font weight
					$weight = array_map( function($val){
						$process = trim( str_replace( array( 'font-weight',':',';' ) , '', $val ) );
						if( is_numeric( $process ) ){
							return $process;
						}
					}, $matche_weight[0] );
					foreach ( $fonts as $key => $val ) {
						$fonts[$key] = str_replace( "');",'', $val ).':'.implode( ',',$weight )."');";
					}
				}

				//Multiple same fonts to single font
				$fonts = array_unique($fonts);
				$get_css = implode('', $fonts).$get_css;
			}
		}
		return $get_css;
	}


	/**
	 * @return bool|false|int
	 *
	 * determine if current single page is WP Page Builder Page
	 */
	private function is_qubely_single()
	{
		$post_id = get_the_ID();

		if (!$post_id) {
			return false;
		}
		return $post_id;
	}

	/**
	 *
	 * determine if wppb editor is open
	 *
	 * @since V.1.0.0
	 * @return bool
	 *
	 * @since v.1.0.0
	 */
	private function is_editor_screen()
	{
		if (!empty($_GET['action']) &&  $_GET['action'] === 'wppb_editor') {
			return true;
		}
		return false;
	}


	/**
	 * Enqueue post style 
	 * If css save option fileSystem then enqueue file 
	 * Or add inline to the header
	 */
	public function enqueue_block_css()
	{
		// if(!isset($_GET['preview'])){
			$option_data = get_option('qubely_options');
			$css_save_as = isset($option_data['css_save_as']) ? $option_data['css_save_as'] : 'wp_head';
			if ($css_save_as == 'filesystem') {
			 	add_action('wp_enqueue_scripts', array($this, 'enqueue_block_css_file'));
			} else {
				add_action('wp_head', array($this, 'add_block_inline_css'), 100);
			}
		// }
	}

	/**
	 * Enqueue block css file 
	 * Check if css path exists and it has current post page
	 * Then enqueue file
	 */
	public function enqueue_block_css_file()
	{
		$post_id 		= $this->is_qubely_single();
		$upload_dir     = wp_get_upload_dir();
		$upload_css_dir = trailingslashit($upload_dir['basedir']);
		$css_path       = $upload_css_dir . "qubely/qubely-css-{$post_id}.css";
		if (file_exists($css_path)) {
			$css_dir_url = trailingslashit($upload_dir['baseurl']);
			$css_url     = $css_dir_url . "qubely/qubely-css-{$post_id}.css";
			if (!$this->is_editor_screen()) {
				wp_enqueue_style("qubely-post-{$post_id}", $css_url, false, QUBELY_VERSION);
			}
		} else {
			wp_register_style('qubely-post-data', false);
			wp_enqueue_style('qubely-post-data');
			wp_add_inline_style('qubely-post-data', get_post_meta(get_the_ID(), '_qubely_css', true));
		}
	}

	/**
	 * Check current post page open and css path exists 
	 * Then read the css file content from css path 
	 * Then add inline css to the header
	 */
	public function add_block_inline_css()
	{
		$post_id = $this->is_qubely_single();
		
		if ($post_id) {
			$upload_dir     = wp_get_upload_dir();
			$upload_css_dir = trailingslashit($upload_dir['basedir']);
			$css_path       = $upload_css_dir . "qubely/qubely-css-{$post_id}.css";
			$json_path       = $upload_css_dir . "qubely/qubely-json-{$post_id}.json";

			if (file_exists($css_path)) {
				$blockCss = file_get_contents($css_path);
				echo '<style type="text/css">' . $blockCss . '</style>';
			} else {
				echo '<style type="text/css">' . get_post_meta(get_the_ID(), '_qubely_css', true) . '</style>';
			}

			if ( !file_exists( $json_path ) ) {
				$this->print_interaction_json_to_header();
			}else{
				$blockJson = file_get_contents($json_path);
				if( $blockJson != "{}" ){
					echo '<script type="text/javascript"> var qubelyInteraction = '.$blockJson.'</script>';
				}
			}
		}
	}

	/**
	 * @since 1.2.0
	 * Interaction Add
	 */
	public function print_interaction_json_to_header(){
		$post_id = get_the_ID();
		$interactionJson = get_post_meta($post_id, '_qubely_interaction_json', true);
		if( $interactionJson != '{}' && $interactionJson != '' ){
			echo '<script type="text/javascript"> var qubelyInteraction = '.$interactionJson.'</script>';
		}
	}

	/**
	 * Check if the post has been delete operation
	 */
	public function before_delete_post()
	{
		// $this->delete_post_resource();
	}
	/**
	 * Delete post releated data 
	 * @delete post css file
	 */
	private function delete_post_resource( $post_id = '' )
	{
		$post_id = $post_id ? $post_id : $this->is_qubely_single();
		if ($post_id) {
			$upload_dir     = wp_get_upload_dir();
			$upload_css_dir = trailingslashit($upload_dir['basedir']);
			$css_path       = $upload_css_dir . "qubely/qubely-css-{$post_id}.css";
			$json_path      = $upload_css_dir . "qubely/qubely-json-{$post_id}.json";
			if (file_exists($css_path)) {
				unlink($css_path);
			}
			if (file_exists($json_path)) {
				unlink($json_path);
			}
		}
	}

	/**
	 * @since 1.0.0-BETA
	 * Get Blocks
	 */
	public function qubely_get_sections()
	{
		// $cachedBlockFile = "qubely-blocks.json";
		// $cache_time = ( 60*60*24*7 ); //cached for 7 days

		$sectionData = array();

		// $upload_dir = wp_upload_dir();
		// $dir = trailingslashit( $upload_dir[ 'basedir' ] ) . 'qubely/cache/';
		// $file_path_name = $dir . $cachedBlockFile;

		/* if ( file_exists( $file_path_name ) && ( filemtime( $file_path_name ) + $cache_time ) > time() ) {
			$getBlocksFromCached = file_get_contents( $file_path_name );
			$sectionData = json_decode( $getBlocksFromCached, true );
			$cached_at = 'Last cached: '.human_time_diff( filemtime($file_path_name), current_time( 'timestamp') ). ' ago';

			wp_send_json( array( 'success' => true, 'cached_at' => $cached_at,  'data' => $sectionData ) );
		} else { */
		$sectionData = $this->load_blocks_from_server();
		//}

		wp_send_json_success($sectionData);
	}

	/**
	 * @since 1.0.0-BETA
	 * Load Blocks from Server
	 */
	public function load_blocks_from_server()
	{

		$apiUrl = $this->api_base_url . 'sections';

		$post_args = array('timeout' => 120);
		$body_param = array_merge($this->qubely_api_request_body_default, array('request_for' => 'get_all_sections'));
		$post_args['body'] = array_merge($body_param, $this->qubely_api_request_body);
		$blockRequest = wp_remote_post($apiUrl, array());
		if (is_wp_error($blockRequest)) {
			wp_send_json_error(array('messages' => $blockRequest->get_error_messages()));
		}
		$blockData = json_decode($blockRequest['body'], true);
		/* $cachedBlockFile = "qubely-blocks.json";
		$upload_dir = wp_upload_dir();
		$dir = trailingslashit( $upload_dir[ 'basedir' ] ) . 'qubely/cache/';
		$file_path_name = $dir . $cachedBlockFile;
		if ( ! file_exists( $dir ) ) {
			mkdir( $dir, 0777, true );
		}
		file_put_contents( $file_path_name,  json_encode( $blockData ) ); // Put template content to cached directory
		 */
		return $blockData;
	}

	/**
	 * @since 1.0.0-BETA
	 * Get Blocks
	 */
	public function qubely_get_layouts()
	{
		// $cachedLayoutFile = "qubely-layouts.json";
		// $cache_time = ( 60*60*24*7 ); //cached for 7 days

		$layoutData = array();

		// $upload_dir = wp_upload_dir();
		// $dir = trailingslashit( $upload_dir[ 'basedir' ] ) . 'qubely/cache/';
		// $file_path_name = $dir . $cachedLayoutFile;

		/* if ( file_exists( $file_path_name ) && ( filemtime( $file_path_name ) + $cache_time ) > time() ) {
			$getLayoutFromCached = file_get_contents($file_path_name);
			$layoutData = json_decode($getLayoutFromCached, true);
			$cached_at = 'Last cached: '.human_time_diff( filemtime( $file_path_name ), current_time( 'timestamp' ) ). ' ago';

			wp_send_json( array( 'success' => true, 'cached_at' => $cached_at,  'data' => $layoutData ) );
		} else { */
		$layoutData = $this->load_layouts_from_server();
		//}

		wp_send_json_success($layoutData);
	}

	/**
	 * @since 1.0.0-BETA
	 * Load Blocks from Server
	 */
	public function load_layouts_from_server()
	{

		$apiUrl = $this->api_base_url . 'layouts';

		$post_args = array('timeout' => 120);
		$body_param = array_merge($this->qubely_api_request_body_default, array('request_for' => 'get_all_layouts'));
		$post_args['body'] = array_merge($body_param, $this->qubely_api_request_body);
		$layoutRequest = wp_remote_post($apiUrl, $post_args);
		if (is_wp_error($layoutRequest)) {
			wp_send_json_error(array('messages' => $layoutRequest->get_error_messages()));
		}
		$layoutData = json_decode($layoutRequest['body'], true);
		/* $cachedLayoutFile = "qubely-layouts.json";
		$upload_dir = wp_upload_dir();
		$dir = trailingslashit( $upload_dir[ 'basedir' ] ) . 'qubely/cache/';
		$file_path_name = $dir . $cachedLayoutFile;
		if ( ! file_exists( $dir ) ) {
			mkdir( $dir, 0777, true );
		}
		file_put_contents( $file_path_name,  json_encode( $layoutData ) ); // Put template content to cached directory
		 */
		return $layoutData;
	}


	/**
	 * @since 1.0.0
	 * Get single layout
	 */
	public function qubely_get_single_layout()
	{
		$layout_id = (int) sanitize_text_field($_REQUEST['layout_id']);

		// $cache_time = ( 60*60*24*7 ); //cached for 7 days
		// $cachedSingleLayoutFile = "qubely-single-layout-{$layout_id}.json";
		// $upload_dir = wp_upload_dir();
		// $dir = trailingslashit( $upload_dir['basedir'] ) . 'qubely/cache/layouts/';
		// $file_path_name = $dir . $cachedSingleLayoutFile;
		// Checking if exists file and cache validity true
		/* if ( file_exists( $file_path_name ) && ( filemtime( $file_path_name ) + $cache_time ) > time() ) {
			$getSingleLayoutFromCached = file_get_contents( $file_path_name );
			$layoutData = json_decode( $getSingleLayoutFromCached, true );
		} else { */
		$layoutData = $this->load_and_cache_single_layout_from_server($layout_id);
		//}
		wp_send_json_success($layoutData);
	}

	/**
	 * @since 1.0.0(Stable)
	 * Get single layout
	 */
	public function qubely_get_single_section()
	{
		$section_id = (int) sanitize_text_field($_REQUEST['block_id']);
		$sectionData = $this->load_and_cache_single_section_from_server($section_id);
		wp_send_json_success($sectionData);
	}

	/**
	 * @since 1.0.0(Stable)
	 * Get single section
	 */
	public function load_and_cache_single_section_from_server($section_id = 0)
	{
		if (!$section_id) {
			return false;
		}
		$apiUrl = $this->api_base_url . 'single-section';

		$post_args = array('timeout' => 120);

		$body_param = array_merge(
			$this->qubely_api_request_body_default,
			array('request_for' => 'get_single_section', 'section_id' => $section_id)
		);
		$post_args['body'] = array_merge($body_param, $this->qubely_api_request_body);
		$sectionRequest = wp_remote_post($apiUrl, $post_args);

		if (is_wp_error($sectionRequest)) {
			wp_send_json_error(array('messages' => $sectionRequest->get_error_messages()));
		}

		$sectionData = json_decode($sectionRequest['body'], true);

		return $sectionData;
	}


	/**
	 * @since 1.0.0-BETA
	 * Load single layout and cache it
	 */
	public function load_and_cache_single_layout_from_server($layout_id = 0)
	{
		if (!$layout_id) {
			return false;
		}
		$apiUrl = $this->api_base_url . 'single-layout';

		$post_args = array('timeout' => 120);

		$body_param = array_merge(
			$this->qubely_api_request_body_default,
			array('request_for' => 'get_single_layout', 'layout_id' => $layout_id)
		);
		$post_args['body'] = array_merge($body_param, $this->qubely_api_request_body);
		$layoutRequest = wp_remote_post($apiUrl, $post_args);

		if (is_wp_error($layoutRequest)) {
			wp_send_json_error(array('messages' => $layoutRequest->get_error_messages()));
		}

		$layoutData = json_decode($layoutRequest['body'], true);
		/* $cachedLayoutFile = "qubely-single-layout-{$layout_id}.json";
		$upload_dir = wp_upload_dir();
		$dir = trailingslashit( $upload_dir[ 'basedir' ] ) . 'qubely/cache/layouts/';
		$file_path_name = $dir . $cachedLayoutFile;
		if ( ! file_exists( $dir ) ) {
			mkdir( $dir, 0777, true );
		}
		file_put_contents( $file_path_name,  json_encode( $layoutData ) );  */

		return $layoutData;
	}

	/**
	 * @since 1.0.0-BETA
	 * Get saved blocks
	 */
	public function qubely_get_saved_block()
	{
		$args = array(
			'post_type' => 'wp_block',
			'post_status' => 'publish'
		);
		$r = wp_parse_args(null, $args);
		$get_posts = new WP_Query;
		$wp_blocks = $get_posts->query($r);
		wp_send_json_success($wp_blocks);
	}

	/**
	 * @since 1.0.0-BETA
	 * Delete saved blocks
	 */
	public function qubely_delete_saved_block()
	{
		$block_id = (int) sanitize_text_field($_REQUEST['block_id']);
		$deleted_block = wp_delete_post($block_id);
		wp_send_json_success($deleted_block);
	}


	/**
	 * Ajax for sending form data
	 * @return boolean,void     Return false if failure, echo json on success
	 */
	public function qubely_send_form_data()
	{
		if (isset($_POST['captcha']) && $_POST['recaptcha'] == 'true') {
			$captcha = $_POST['captcha'];
			$secretKey = $_POST['recaptcha-secret-key'];
			$verify = wp_remote_get("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$captcha}");

			if (!is_array($verify) || !isset($verify['body'])) {
				wp_send_json(__('Cannot validate captcha', 'qubely'), 400);
			}

			$verified = json_decode($verify['body']);
			if (!$verified->success) {
				wp_send_json(__('Captcha validation error', 'qubely'), 400);
			}
		}

		//Settings data
		$fieldErrorMessage = ($_POST['field-error-message']) ? base64_decode($_POST['field-error-message']) : '';
		$formSuccessMessage = ($_POST['form-success-message']) ? base64_decode($_POST['form-success-message']) : '';
		$formErrorMessage = ($_POST['form-error-message']) ? base64_decode($_POST['form-error-message']) : '';
		$emailReceiver = ($_POST['email-receiver']) ? base64_decode($_POST['email-receiver']) : '';
		$emailHeaders = ($_POST['email-headers']) ? base64_decode($_POST['email-headers']) : '';
		$emailFrom = ($_POST['email-from']) ? base64_decode($_POST['email-from']) : '';
		$emailSubject = ($_POST['email-subject']) ? base64_decode($_POST['email-subject']) : '';
		$emailBody = ($_POST['email-body']) ? base64_decode($_POST['email-body']) : '';

		$fieldNames = [];
		$validation = false;
		$formInputArray = $_POST['qubely-form-input'];
		foreach ($formInputArray as $key => $value) {
			if (preg_match("/[*]$/", $key)) {
				if (empty($value)) {
					$validation = true;
				}
				$key = str_replace('*', '', $key);
			}
			$fieldNames[$key] = $value;
		}

		if ($validation || (isset($_POST['qubely-form-has-policy']) && empty($_POST['qubely-form-has-policy']))) {
			wp_send_json(__($formErrorMessage, 'qubely'), 400);
		}

		$replyToMail = $replyToName = $cc = $bcc = $fromName = $fromEmail = '';
		if ($emailFrom != '') {
			$emailFrom = explode(':', $emailFrom);
			if (count($emailFrom) > 0) {
				$fromName =  isset($emailFrom[0]) ?  trim($emailFrom[0]) : '';
				$fromEmail =  isset($emailFrom[1]) ?  trim($emailFrom[1]) : '';
			}
		}

		$emailHeaders = explode("\n", $emailHeaders);
		foreach ($emailHeaders as $_header) {
			$_header = explode(':', $_header);
			if (count($_header) > 0) {
				if (strtolower($_header[0]) == 'reply-to')
					$replyToMail =  isset($_header[1]) ?  trim($_header[1]) : '';
				if (strtolower($_header[0])  == 'reply-name')
					$replyToName =  isset($_header[1]) ?  trim($_header[1]) : '';
				if (strtolower($_header[0]) == 'cc')
					$cc =  isset($_header[1]) ?  trim($_header[1]) : '';
				if (strtolower($_header[0]) == 'bcc')
					$bcc =  isset($_header[1]) ?  trim($_header[1]) : '';
			}
		}

		foreach ($fieldNames as $name => $value) {
			$value = is_array($fieldNames[$name]) ? implode(', ', $fieldNames[$name]) : $value;
			$emailBody = str_replace("{{" . $name . "}}", $value, $emailBody);
			$emailSubject = str_replace("{{" . $name . "}}", $value, $emailSubject);
			$replyToName = str_replace("{{" . $name . "}}", $value, $replyToName);
			$replyToMail = str_replace("{{" . $name . "}}", $value, $replyToMail);
			$fromName = str_replace("{{" . $name . "}}", $value, $fromName);
			$cc = str_replace("{{" . $name . "}}", $value, $cc);
			$bcc = str_replace("{{" . $name . "}}", $value, $bcc);
		}

		// Subject Structure
		$siteName = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : '';
		$emailSubject = str_replace("{{site-name}}", $siteName, $emailSubject);

		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
		$headers[] = 'Reply-To: ' . $replyToName . ' <' . $replyToMail . '>';
		$headers[] = 'Cc: <' . $cc . '>';
		$headers[] = 'Bcc: <' . $bcc . '>';

		//Send E-Mail Now or through error msg
		try {
			$isMail = wp_mail($emailReceiver, $emailSubject, $emailBody, $headers);
			if ($isMail) {
				$responseData['status'] = 1;
				$responseData['msg'] = __($formSuccessMessage, 'qubely');
			} else {
				$responseData['status'] = 0;
				$responseData['msg'] = __($formErrorMessage, 'qubely');
			}
			wp_send_json_success($responseData);
		} catch (\Exception $e) {
			$responseData['status'] = 0;
			$responseData['msg'] = $e->getMessage();
			wp_send_json_error($responseData);
		}
	}
}
new QUBELY();
