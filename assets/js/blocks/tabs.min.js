document.addEventListener("DOMContentLoaded", function() {
    //TAB BLOCK
    jQuery('.qubely-tab-title').on('click', function (event) {
        var $qubelyTab = jQuery(this).parent();
        var qubelyIndex = $qubelyTab.index();
        if ($qubelyTab.hasClass('qubely-active')) {
            return;
        }
        $qubelyTab.closest('.qubely-tab-nav').find('.qubely-active').removeClass('qubely-active');
        $qubelyTab.addClass('qubely-active');
        $qubelyTab.closest('.qubely-block-tab').find('.qubely-tab-content.qubely-active').removeClass('qubely-active');
        $qubelyTab.closest('.qubely-block-tab').find('.qubely-tab-content').eq(qubelyIndex).addClass('qubely-active')
    });
})