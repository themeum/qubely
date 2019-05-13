( function( $, window, document, undefined ) {
	'use strict';

	$( '.qubely-block-button-toggle' ).on( 'click', function( event ) {
		event.preventDefault();
		var $this = $(this);
		var $block = $this.closest('.qubely-options-block');
		$.ajax({
            url : qubely_option.ajax,
            type : 'post',
            data : {
                action : 'qubely_blocks_toggle',
                block: $this.data( 'block-slug' ),
			},
			beforeSend: function() {
				$block.addClass('qubely-loading');
			},
            success: function(response) {
				var data = $.parseJSON(response);
				if(data.enabled) {
					$block.removeClass('qubely-block-inactive').addClass('qubely-block-active');
				} else {
					$block.removeClass('qubely-block-active').addClass('qubely-block-inactive');
				}
				$block.removeClass('qubely-loading');
            }
		});
	});

}( jQuery, window, document ) );