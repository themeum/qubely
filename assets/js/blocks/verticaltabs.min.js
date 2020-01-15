(function ($) {
    $('.qubely-vertical-tab-item-button').on('click', function (event) {
        var $that = $(this);
        var $currentNav = $that.parent();
        if($currentNav.hasClass('qubely-vertical-active')){
            return;
        };

        var $parentTab = $that.closest('.qubely-block-vertical-tab');
        var $currentNavIndex = $currentNav.index();

        // nav
        $parentTab.find('.qubely-vertical-tab-item').removeClass('qubely-vertical-active');
        $currentNav.addClass('qubely-vertical-active');

        // nav content
        $parentTab.find('.qubely-vertical-tab-nav-text').slideUp(300);
        $that.find('.qubely-vertical-tab-nav-text').slideDown(300);

        // body
        var $currentTabBody = $currentNav.closest('.qubely-vertical-tab-nav').next();
        var $currentVerticalContent = $currentTabBody.find('.qubely-tab-content').eq($currentNavIndex);

        $parentTab.find('.qubely-tab-content').removeClass('qubely-vertical-active').fadeOut(0);
        $currentVerticalContent.addClass('qubely-vertical-active').fadeIn();

    });
})(jQuery);