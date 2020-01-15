document.addEventListener("DOMContentLoaded", function() {
    //ACCORDION BLOCK
    jQuery('.qubely-block-accordion:not(.qubely-accordion-ready)').each(function () {
        const $accordion = jQuery(this);
        const itemToggle = $accordion.attr('data-item-toggle');
        $accordion.addClass('qubely-accordion-ready');
        $accordion.on('click', '.qubely-accordion-item .qubely-accordion-panel', function (e) {
            e.preventDefault();

            const $selectedItem = jQuery(this).parent('.qubely-accordion-item');
            const $selectedItemContent = $selectedItem.find('.qubely-accordion-body');
            const isActive = $selectedItem.hasClass('qubely-accordion-active');

            if (isActive) {
                $selectedItemContent.css('display', 'block').slideUp(150);
                $selectedItem.removeClass('qubely-accordion-active');
            } else {
                $selectedItemContent.css('display', 'none').slideDown(150);
                $selectedItem.addClass('qubely-accordion-active');
            }

            if (itemToggle == 'true') {
                const $collapseItems = $accordion.find('.qubely-accordion-active').not($selectedItem);
                if ($collapseItems.length) {
                    $collapseItems.find('.qubely-accordion-body').css('display', 'block').slideUp(150);
                    $collapseItems.removeClass('qubely-accordion-active');
                }
            }
        });
    });
})