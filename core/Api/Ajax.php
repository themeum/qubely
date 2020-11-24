<?php
/**
 * Handles ajax calls from server
 * 
 * @package Qubely
 */

namespace Qubely\Api;

defined( 'ABSPATH' ) || exit;

/**
 * Ajax class
 */
class Ajax {

     /**
     * Protected $api_base_url
     *
     * @var string
     */
    protected $api_base_url = 'https://qubely.io/wp-json/restapi/v2/';

     /**
     * Protected $qubely_api_request_body
     *
     * @var [type]
     */
    protected $qubely_api_request_body;
    
    /**
     * Protected $qubely_api_request_body_default
     *
     * @var [type]
     */
    protected $qubely_api_request_body_default;

    /**
     * Register
     */
    public function register() {

        $this->qubely_api_request_body_default = array( 'request_from' => 'qubely', );
        $this->qubely_api_request_body         = apply_filters( 'qubely_api_request_body', array() );

        // Get layout and block from Server and Cache
        add_action( 'wp_ajax_qubely_get_sections', array( $this, 'qubely_get_sections' ) );
        add_action( 'wp_ajax_qubely_get_layouts', array( $this, 'qubely_get_layouts' ) );

        add_action( 'wp_ajax_qubely_get_single_layout', array( $this, 'qubely_get_single_layout' ) );
        add_action( 'wp_ajax_qubely_get_single_block', array( $this, 'qubely_get_single_section' ) );

        add_action( 'wp_ajax_qubely_get_saved_block', array( $this, 'qubely_get_saved_block' ) );
        add_action( 'wp_ajax_qubely_delete_saved_block', array( $this, 'qubely_delete_saved_block' ) );

        add_action( 'wp_ajax_qubely_send_form_data', array( $this, 'qubely_send_form_data' ) );
        add_action( 'wp_ajax_nopriv_qubely_send_form_data', array( $this, 'qubely_send_form_data' ) );
    }

    /**
	 * @since 1.0.0-BETA
	 * Get Sections
	 */
	public function qubely_get_sections() {
       $sectionData = array();
       $sectionData = $this->load_blocks_from_server();
       wp_send_json_success( $sectionData );
   }

   /**
	 * @since 1.0.0-BETA
	 * Load Blocks from Server
	 */
	public function load_blocks_from_server() {
		$apiUrl = $this->api_base_url . 'sections';

		$post_args         = array( 'timeout' => 120 );
		$body_param        = array_merge( $this->qubely_api_request_body_default, array( 'request_for' => 'get_all_sections' ) );
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$blockRequest      = wp_remote_post( $apiUrl, array() );
		if ( is_wp_error( $blockRequest ) ) {
			wp_send_json_error( array( 'messages' => $blockRequest->get_error_messages() ) );
		}
		$blockData = json_decode( $blockRequest['body'], true );
		
		return $blockData;
    }
    
    /**
	 * @since 1.0.0-BETA
	 * Get Layouts
	 */
	public function qubely_get_layouts() {
		$layoutData = array();
		$layoutData = $this->load_layouts_from_server();
		wp_send_json_success( $layoutData );
    }
    
    /**
	 * @since 1.0.0-BETA
	 * Load Layouts from Server
	 */
	public function load_layouts_from_server() {
		$apiUrl = $this->api_base_url . 'layouts';

		$post_args         = array( 'timeout' => 120 );
		$body_param        = array_merge( $this->qubely_api_request_body_default, array( 'request_for' => 'get_all_layouts' ) );
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$layoutRequest     = wp_remote_post( $apiUrl, $post_args );
		if ( is_wp_error( $layoutRequest ) ) {
			wp_send_json_error( array( 'messages' => $layoutRequest->get_error_messages() ) );
		}
		$layoutData = json_decode( $layoutRequest['body'], true );
		return $layoutData;
    }
    
    /**
	 * @since 1.0.0
	 * Get single layout
	 */
	public function qubely_get_single_layout() {
		$layout_id  = ( int ) sanitize_text_field( $_REQUEST['layout_id'] );
		$layoutData = $this->load_and_cache_single_layout_from_server( $layout_id );
		wp_send_json_success( $layoutData );
	}

	/**
	 * @since 1.0.0(Stable)
	 * Get single layout
	 */
	public function qubely_get_single_section() {
		$section_id  = ( int ) sanitize_text_field( $_REQUEST['block_id'] );
		$sectionData = $this->load_and_cache_single_section_from_server( $section_id );
		wp_send_json_success( $sectionData );
	}

	/**
	 * @since 1.0.0(Stable)
	 * Get single section
	 */
	public function load_and_cache_single_section_from_server( $section_id = 0 ) {
		if ( ! $section_id ) {
			return false;
		}
		$apiUrl     = $this->api_base_url . 'single-section';
		$post_args  = array( 'timeout' => 120 );
		$body_param = array_merge(
			$this->qubely_api_request_body_default,
			array(
				'request_for' => 'get_single_section',
				'section_id'  => $section_id,
			)
		);
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$sectionRequest    = wp_remote_post( $apiUrl, $post_args );

		if ( is_wp_error( $sectionRequest ) ) {
			wp_send_json_error( array( 'messages' => $sectionRequest->get_error_messages() ) );
		}
		$sectionData = json_decode( $sectionRequest['body'], true );
		return $sectionData;
	}

	/**
	 * @since 1.0.0-BETA
	 * Load single layout and cache it
	 */
	public function load_and_cache_single_layout_from_server( $layout_id = 0 ) {
		if ( ! $layout_id ) {
			return false;
		}
		$apiUrl     = $this->api_base_url . 'single-layout';
		$post_args  = array( 'timeout' => 120 );
		$body_param = array_merge(
			$this->qubely_api_request_body_default,
			array(
				'request_for' => 'get_single_layout',
				'layout_id'   => $layout_id,
			)
		);
		$post_args['body'] = array_merge( $body_param, $this->qubely_api_request_body );
		$layoutRequest     = wp_remote_post( $apiUrl, $post_args );

		if ( is_wp_error( $layoutRequest ) ) {
			wp_send_json_error( array( 'messages' => $layoutRequest->get_error_messages() ) );
		}
		$layoutData = json_decode( $layoutRequest['body'], true );
		return $layoutData;
    }
    
    /**
	 * @since 1.0.0-BETA
	 * Get saved blocks
	 */
	public function qubely_get_saved_block() {
		$args = array(
			'post_type'   => 'wp_block',
			'post_status' => 'publish',
		);
		$r         = wp_parse_args( null, $args );
		$get_posts = new WP_Query();
		$wp_blocks = $get_posts->query( $r );
		wp_send_json_success( $wp_blocks );
	}

	/**
	 * @since 1.0.0-BETA
	 * Delete saved blocks
	 */
	public function qubely_delete_saved_block() {
		$block_id      = (int) sanitize_text_field( $_REQUEST['block_id'] );
		$deleted_block = wp_delete_post( $block_id );
		wp_send_json_success( $deleted_block );
	}

	/**
	 * Ajax for sending form data
	 *
	 * @return boolean|void Return false if failure, echo json on success
	 */
	public function qubely_send_form_data() {
		if ( isset( $_POST['captcha'] ) && $_POST['recaptcha'] == 'true' ) {
			$captcha   = $_POST['captcha'];
			$secretKey = $_POST['recaptcha-secret-key'];
			$verify    = wp_remote_get( "https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$captcha}" );

			if ( ! is_array( $verify ) || ! isset( $verify['body'] ) ) {
				wp_send_json( __( 'Cannot validate captcha', 'qubely' ), 400 );
			}

			$verified = json_decode( $verify['body'] );
			if ( ! $verified->success ) {
				wp_send_json( __( 'Captcha validation error', 'qubely' ), 400 );
			}
		}

		// Settings data.
		$fieldErrorMessage  = ( $_POST['field-error-message'] ) ? base64_decode( $_POST['field-error-message'] ) : '';
		$formSuccessMessage = ( $_POST['form-success-message'] ) ? base64_decode( $_POST['form-success-message'] ) : '';
		$formErrorMessage   = ( $_POST['form-error-message'] ) ? base64_decode( $_POST['form-error-message'] ) : '';
		$emailReceiver      = ( $_POST['email-receiver'] ) ? base64_decode( $_POST['email-receiver'] ) : '';
		$emailHeaders       = ( $_POST['email-headers'] ) ? base64_decode( $_POST['email-headers'] ) : '';
		$emailFrom          = ( $_POST['email-from'] ) ? base64_decode( $_POST['email-from'] ) : '';
		$emailSubject       = ( $_POST['email-subject'] ) ? base64_decode( $_POST['email-subject'] ) : '';
		$emailBody          = ( $_POST['email-body'] ) ? base64_decode( $_POST['email-body'] ) : '';

		$fieldNames     = array();
		$validation     = false;
		$formInputArray = $_POST['qubely-form-input'];
		foreach ( $formInputArray as $key => $value ) {
			if ( preg_match( '/[*]$/', $key ) ) {
				if ( empty( $value ) ) {
					$validation = true;
				}
				$key = str_replace( '*', '', $key );
			}
			$fieldNames[ $key ] = $value;
		}

		if ( $validation || ( isset( $_POST['qubely-form-has-policy'] ) && empty( $_POST['qubely-form-has-policy'] ) ) ) {
			wp_send_json( __( $formErrorMessage, 'qubely' ), 400 );
		}

		$replyToMail = $replyToName = $cc = $bcc = $fromName = $fromEmail = '';
		if ( $emailFrom != '' ) {
			$emailFrom = explode( ':', $emailFrom );
			if ( count( $emailFrom ) > 0 ) {
				$fromName  = isset( $emailFrom[0] ) ? trim( $emailFrom[0] ) : '';
				$fromEmail = isset( $emailFrom[1] ) ? trim( $emailFrom[1] ) : '';
			}
		}

		$emailHeaders = explode( "\n", $emailHeaders );
		foreach ( $emailHeaders as $_header ) {
			$_header = explode( ':', $_header );
			if ( count( $_header ) > 0 ) {
				if ( strtolower( $_header[0] ) == 'reply-to' ) {
					$replyToMail = isset( $_header[1] ) ? trim( $_header[1] ) : '';
				}
				if ( strtolower( $_header[0] ) == 'reply-name' ) {
					$replyToName = isset( $_header[1] ) ? trim( $_header[1] ) : '';
				}
				if ( strtolower( $_header[0] ) == 'cc' ) {
					$cc = isset( $_header[1] ) ? trim( $_header[1] ) : '';
				}
				if ( strtolower( $_header[0] ) == 'bcc' ) {
					$bcc = isset( $_header[1] ) ? trim( $_header[1] ) : '';
				}
			}
		}

		foreach ( $fieldNames as $name => $value ) {
			$value        = is_array( $fieldNames[ $name ] ) ? implode( ', ', $fieldNames[ $name ] ) : $value;
			$emailBody    = str_replace( '{{' . $name . '}}', $value, $emailBody );
			$emailSubject = str_replace( '{{' . $name . '}}', $value, $emailSubject );
			$replyToName  = str_replace( '{{' . $name . '}}', $value, $replyToName );
			$replyToMail  = str_replace( '{{' . $name . '}}', $value, $replyToMail );
			$fromName     = str_replace( '{{' . $name . '}}', $value, $fromName );
			$cc           = str_replace( '{{' . $name . '}}', $value, $cc );
			$bcc          = str_replace( '{{' . $name . '}}', $value, $bcc );
		}

		// Subject Structure.
		$siteName     = isset( $_SERVER['SERVER_NAME'] ) ? $_SERVER['SERVER_NAME'] : '';
		$emailSubject = str_replace( '{{site-name}}', $siteName, $emailSubject );

		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
		$headers[] = 'Reply-To: ' . $replyToName . ' <' . $replyToMail . '>';
		$headers[] = 'Cc: <' . $cc . '>';
		$headers[] = 'Bcc: <' . $bcc . '>';

		// Send E-Mail Now or through error msg.
		try {
			$isMail = wp_mail( $emailReceiver, $emailSubject, $emailBody, $headers );
			if ( $isMail ) {
				$responseData['status'] = 1;
				$responseData['msg']    = __( $formSuccessMessage, 'qubely' );
			} else {
				$responseData['status'] = 0;
				$responseData['msg']    = __( $formErrorMessage, 'qubely' );
			}
			wp_send_json_success( $responseData );
		} catch ( \Exception $e ) {
			$responseData['status'] = 0;
			$responseData['msg']    = $e->getMessage();
			wp_send_json_error( $responseData );
		}
	}
}