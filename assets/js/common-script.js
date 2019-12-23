jQuery(document).ready(function ($) {
    'use strict';
    // Magnific Popup
    if (typeof $(document).magnificPopup !== 'undefined') {
        $('.qubely-video-popup').magnificPopup({
            type: 'iframe',
            rtl: true,
            mainClass: 'mfp-fade',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false
        });
    }

    // Set Preview CSS
    const cussrent_url = window.location.href;
    if( cussrent_url.includes('preview=true') ) {
        let cssInline = document.createElement('style');
        cssInline.type = 'text/css';
        cssInline.id = 'qubely-block-js-preview';
        cssInline.innerHTML = localStorage.getItem('qubelyCSS');
        window.document.getElementsByTagName("head")[0].appendChild(cssInline);
    }

    if ($('.qubely-block-counter-number').length > 0) {
        const counterElement = $('.qubely-block-counter-number')
        let indexOfCounterElement = 0
        while (indexOfCounterElement < counterElement.length) {
            let currentElement = counterElement[indexOfCounterElement]
            let start = parseInt(currentElement.dataset.start)
            let limit = parseInt(currentElement.dataset.limit)
            let counterDuration = parseInt(currentElement.dataset.counterduration)
            let increment = Math.ceil((limit / counterDuration) * 10)
            if (start < limit) {
                let intervalId = setInterval(function () {
                    let difference = limit - start
                    difference >= increment ? start += increment : difference >= 50 ? start += 50 : start++
                    currentElement.innerText = start
                    if (start >= limit) {
                        clearInterval(intervalId)
                    }
                }, 10);
            }
            indexOfCounterElement++
        }
    }

    //ACCORDION BLOCK
    $('.qubely-block-accordion:not(.qubely-accordion-ready)').each(function () {
        const $accordion = $(this);
        const itemToggle = $accordion.attr('data-item-toggle');
        $accordion.addClass('qubely-accordion-ready');
        $accordion.on('click', '.qubely-accordion-item .qubely-accordion-panel', function (e) {
            e.preventDefault();

            const $selectedItem = $(this).parent('.qubely-accordion-item');
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

    //TAB BLOCK
    $('.qubely-tab-title').on('click', function (event) {
        var $qubelyTab = $(this).parent();
        var qubelyIndex = $qubelyTab.index();
        if ($qubelyTab.hasClass('qubely-active')) {
            return;
        }
        $qubelyTab.closest('.qubely-tab-nav').find('.qubely-active').removeClass('qubely-active');
        $qubelyTab.addClass('qubely-active');
        $qubelyTab.closest('.qubely-block-tab').find('.qubely-tab-content.qubely-active').removeClass('qubely-active');
        $qubelyTab.closest('.qubely-block-tab').find('.qubely-tab-content').eq(qubelyIndex).addClass('qubely-active')
    });

    //Carousel BLOCK
    $('.qubely-carousel-title').on('click', function (event) {
        var $qubelyCarousel = $(this).parent();
        var qubelyCarouselIndex = $qubelyCarousel.index();

        if ($qubelyCarousel.hasClass('qubely-active')) {
            return;
        }
        $qubelyCarousel.closest('.qubely-carousel-nav-wraper').find('.qubely-active').removeClass('qubely-active');
        $qubelyCarousel.addClass('qubely-active');
        $qubelyCarousel.closest('.qubely-block-carousel').find('.qubely-carousel-item.qubely-active').hide().removeClass('qubely-active');
        $qubelyCarousel.closest('.qubely-block-carousel').find('.qubely-carousel-item').eq(qubelyCarouselIndex).fadeIn(400, function () {
            $(this).addClass('qubely-active');
        });

    });
    $('.qubely-carousel-nav').on('click', function (event) {
        let $qubelyCarouselBody = $(this).parent()
        let $qubelyCarouselBlock = $qubelyCarouselBody.closest('.qubely-block-carousel')
        let $nav = $(this);
        let direction = $nav.attr('data-direction');
        let items = $nav.attr('data-items');

        let activeItemlIndex = $('.qubely-carousel-item-indicator.qubely-active').index('.qubely-carousel-item-indicator')
        let nextActiveItem = direction === 'next' ? activeItemlIndex < items - 1 ? activeItemlIndex + 1 : 0 : activeItemlIndex > 0 ? activeItemlIndex - 1 : items - 1

        $qubelyCarouselBlock.find('.qubely-carousel-item.qubely-active').hide().removeClass('qubely-active');
        $qubelyCarouselBlock.find('.qubely-carousel-item-indicator.qubely-active').removeClass('qubely-active');
        $qubelyCarouselBlock.find('.qubely-carousel-item').eq(nextActiveItem).fadeIn(400, function () {
            $(this).addClass('qubely-active');
        });
        $qubelyCarouselBlock.find('.qubely-carousel-item-indicator').eq(nextActiveItem).addClass('qubely-active');
    });


    //GOOGLE MAP BLOCK
    $('.qubely-google-map:not(.qubely-google-map-ready)').each(function () {
        const $mapItem = $(this);
        $mapItem.addClass('qubely-google-maps-ready');
        const apiKey = $mapItem.attr('data-apiKey');
        const apiURL = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=true&libraries=places&key=' + apiKey;

        if (typeof google === 'object' && typeof google.maps === 'object') {
            initQubelyGoogleMap($mapItem);
        } else {
            loadScriptAsync(apiURL).then(() => {
                initQubelyGoogleMap($mapItem);
            });
        }
    });
    //INIT GOOGLE MAP
    function initQubelyGoogleMap($mapItem) {
        let styles = '';
        try {
            styles = JSON.parse($mapItem.attr('data-styles'));
        } catch (e) { }
        const mapOptions = {
            zoom: parseInt($mapItem.attr('data-zoom'), 10),
            zoomControl: 'true' === $mapItem.attr('data-show-zoom-buttons'),
            zoomControlOpt: {
                style: 'DEFAULT',
                position: 'RIGHT_BOTTOM',
            },
            mapTypeControl: 'true' === $mapItem.attr('data-show-map-type-buttons'),
            streetViewControl: 'true' === $mapItem.attr('data-show-street-view-button'),
            fullscreenControl: 'true' === $mapItem.attr('data-show-fullscreen-button'),
            draggable: 'true' === $mapItem.attr('data-option-draggable'),
            styles: styles,
        }
        const map = new google.maps.Map($mapItem[0], mapOptions);
        var request = {
            placeId: $mapItem.attr('data-placeID'),
            fields: ['place_id', 'geometry', 'name', 'formatted_address', 'adr_address', 'website']
        };

        const service = new google.maps.places.PlacesService(map);
        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                }
                let markerOption = { map: map }
                const iconPointer = $mapItem.attr('data-icon-pointer');
                if (iconPointer) markerOption.icon = iconPointer;
                const marker = new google.maps.Marker(markerOption);
                // Set the position of the marker using the place ID and location.
                marker.setPlace({
                    placeId: place.place_id,
                    location: place.geometry.location
                });
                ('true' === $mapItem.attr('data-show-marker')) ? marker.setVisible(true) : marker.setVisible(false);

                const contentString = '<div class="qubely-gmap-marker-window"><div class="qubely-gmap-marker-place">' + place.name + '</div><div class="qubely-gmap-marker-address">' +
                    place.adr_address + '</div>' +
                    '<div class="qubely-gmap-marker-url"><a href="' + place.website + '" target="_blank">' + place.website + '</a></div></div>';

                const infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });
            }
        });
    }


    //FORM BLOCK
    $('.qubely-block-contact-form form.qubely-form:not(.qubely-form-ready)').each(function () {
        const $form = $(this);
        $form.addClass('qubely-form-ready');
        $form.find('input.qubely-form-control').on('keydown', (e) => {
            if (e.which === 13) { e.preventDefault(); return false; };
        });
        checkFormValidation($form, true); //add validation
        const reCaptcha = $form.find('input[name="recaptcha"]').val();
        const reCaptchaSiteKey = $form.find('input[name="recaptcha-site-key"]').val();
        if (reCaptcha == 'true') {
            const apiURL = 'https://www.google.com/recaptcha/api.js?onload=initGoogleReChaptcha&render=explicit';
            loadScriptAsync(apiURL).then(() => {
                window.initGoogleReChaptcha = () => {
                    const qubelyContactForms = document.querySelectorAll('.qubely-block-form form .qubely-google-recaptcha');
                    qubelyContactForms.forEach((form) => {
                        grecaptcha.render(form, {
                            sitekey: reCaptchaSiteKey
                        });
                    });
                };
            });
        }
        //FORM SUBMIT EVENT
        $form.submit((e) => {
            e.preventDefault();
            let formData = $form.serializeArray();
            const isRequired = checkFormValidation($form); //check validation
            if( !isRequired ) {
                formData.push({ name: 'captcha', value: (typeof grecaptcha !== "undefined") ? grecaptcha.getResponse() : undefined });
                jQuery.ajax({
                    url: qubely_urls.ajax + '?action=qubely_send_form_data',
                    type: "POST",
                    data: formData,
                    beforeSend: () => {
                        $form.find('button[type="submit"]').addClass('disable').attr('disabled', true);
                        $form.find(".qubely-form-message").html('<div class="qubely-alert qubely-alert-info">Message sending...</div>');
                    },
                    success: (response) => {
                        $form.find('button[type="submit"]').removeClass('disable').attr('disabled', false);
                        $form.find(".qubely-form-message").html(`<div class="qubely-alert qubely-alert-success">${response.data.msg}</div>`);
                        setTimeout( () => $form.find('.qubely-form-message').html(''), 4000);
                        if( response.data.status == 1 ) $form.trigger("reset");
                    },
                    error: (jqxhr, textStatus, error) => {
                        $form.find('button[type="submit"]').removeClass('disable').attr('disabled', false);
                        $form.find(".qubely-form-message").html(`<div class="qubely-alert qubely-alert-danger">${textStatus} : ${error} - ${jqxhr.responseJSON}</div>`);
                    }
                });
            }
        });
    });

    //FORM VALIDATION
    function checkFormValidation($form) {
        const fieldErrorMessage = atob($form.find('input[name="field-error-message"]').val());
        let onChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        let isRequired = false;
        $form.find(' input[type=text], input[type=email], input[type=radio], input[type=checkbox], textarea, select').each( function () {
            if (onChange === true) {
                $(this).on('change keyup', function () {
                    isRequired = checkFields($(this), fieldErrorMessage);
                    if (isRequired) return false;
                });
            } else {
                isRequired = checkFields($(this), fieldErrorMessage);
                if (isRequired) return false;
            }
        });
        return isRequired;
    }

    function checkFields($field, fieldErrorMessage) {
        let isRequired = false;
        const $parent = $field.parents('.qubely-form-group-inner');
        fieldErrorMessage = `<p class="qubely-form-required-field">${fieldErrorMessage}</p>`;
        const hasNoError = $parent.find("p.qubely-form-required-field").length === 0;

        if (typeof $field.prop('required') !== 'undefined') {
            if( $field.attr('type') === 'email' ) {
                if ( !validateEmail($field.val()) ) {
                    if( hasNoError ) {
                        $parent.append( fieldErrorMessage );
                    }
                    return isRequired = true;
                }
            }
            if ($field.val().length === 0) {
                if( hasNoError ) {
                    $parent.append( fieldErrorMessage );
                }
                isRequired = true;
            }
            if ($field.val().length > 0) {
                $parent.find("p.qubely-form-required-field").remove();
                isRequired = false;
            }
        }
        if ($field.attr('type') === 'radio' || $field.attr('type') === 'checkbox') {
            const parentElem = $field.parent().parent();
            if( parentElem.attr('data-required') == 'true' ) {
                if ( parentElem.find( 'input:checked' ).length === 0 ) {
                    if( hasNoError ) {
                        $parent.append( fieldErrorMessage );
                    }
                    isRequired = true;
                } else {
                    $parent.find("p.qubely-form-required-field").remove();
                    isRequired = false;
                }
            }
        }
        return isRequired;
    }

    function validateEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

});


function loadScriptAsync(src) {
    return new Promise((resolve, reject) => {
        const tag = document.createElement('script');
        tag.src = src;
        tag.async = true;
        tag.onload = () => {
            resolve();
        };
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
}


(function ($) {

    var inviewObjects = {}, viewportSize, viewportOffset,
        d = document, w = window, documentElement = d.documentElement, expando = $.expando, timer;

    $.event.special.inview = {
        add: function (data) {
            inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };
            if (!timer && !$.isEmptyObject(inviewObjects)) {
                timer = setInterval(checkInView, 250);
            }
        },

        remove: function (data) {
            try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch (e) { }
            if ($.isEmptyObject(inviewObjects)) {
                clearInterval(timer);
                timer = null;
            }
        }
    };

    function getViewportSize() {
        var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };
        if (!size.height) {
            mode = d.compatMode;
            if (mode || !$.support.boxModel) { // IE, Gecko
                domObject = mode === 'CSS1Compat' ?
                    documentElement : // Standards
                    d.body; // Quirks
                size = {
                    height: domObject.clientHeight,
                    width: domObject.clientWidth
                };
            }
        }

        return size;
    }

    function getViewportOffset() {
        return {
            top: w.pageYOffset || documentElement.scrollTop || d.body.scrollTop,
            left: w.pageXOffset || documentElement.scrollLeft || d.body.scrollLeft
        };
    }

    function checkInView() {
        var $elements = $(), elementsLength, i = 0;

        $.each(inviewObjects, function (i, inviewObject) {
            var selector = inviewObject.data.selector,
                $element = inviewObject.$element;
            $elements = $elements.add(selector ? $element.find(selector) : $element);
        });

        elementsLength = $elements.length;
        if (elementsLength) {
            viewportSize = viewportSize || getViewportSize();
            viewportOffset = viewportOffset || getViewportOffset();

            for (; i < elementsLength; i++) {
                if (!$.contains(documentElement, $elements[i])) {
                    continue;
                }

                var $element = $($elements[i]),
                    elementSize = { height: $element.height(), width: $element.width() },
                    elementOffset = $element.offset(),
                    inView = $element.data('inview'),
                    visiblePartX,
                    visiblePartY,
                    visiblePartsMerged;

                if (!viewportOffset || !viewportSize) {
                    return;
                }

                if (elementOffset.top + elementSize.height > viewportOffset.top &&
                    elementOffset.top < viewportOffset.top + viewportSize.height &&
                    elementOffset.left + elementSize.width > viewportOffset.left &&
                    elementOffset.left < viewportOffset.left + viewportSize.width) {
                    visiblePartX = (viewportOffset.left > elementOffset.left ?
                        'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
                            'left' : 'both');
                    visiblePartY = (viewportOffset.top > elementOffset.top ?
                        'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
                            'top' : 'both');
                    visiblePartsMerged = visiblePartX + "-" + visiblePartY;
                    if (!inView || inView !== visiblePartsMerged) {
                        $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
                    }
                } else if (inView) {
                    $element.data('inview', false).trigger('inview', [false]);
                }
            }
        }
    }

    $(w).bind("scroll resize scrollstop", function () {
        viewportSize = viewportOffset = null;
    });

    if (!documentElement.addEventListener && documentElement.attachEvent) {
        documentElement.attachEvent("onfocusin", function () {
            viewportOffset = null;
        });
    }


    $(document).on('inview', '[data-qubelyanimation]', function (event, visible, visiblePartX, visiblePartY) {
        var $this = $(this);
        if (visible) {
            let animation = $this.data('qubelyanimation');
            if (animation && typeof animation.name != 'undefined' && animation.openAnimation != 0) {
                setTimeout(() => {
                    $this.css({ opacity: 1 })
                }, parseInt(animation.delay) + 100)
                $this.css({
                    'animation-name': animation.name,
                    'animation-timing-function': animation.curve,
                    'animation-duration': animation.duration + 'ms',
                    'animation-delay': animation.delay + 'ms',
                    'animation-iteration-count': animation.repeat === 'once' ? 1 : 'infinite'
                })
            }
        }
        $this.unbind('inview');
    });


    // Parallax
    var $window = $(window);
    var windowHeight = $window.height();
    $window.resize(function () { windowHeight = $window.height(); });
    $.fn.parallax = function (xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        $this.each(function () { firstTop = $this.offset().top; });
        if (outerHeight) {
            getHeight = function (jqo) { return jqo.outerHeight(true); };
        } else {
            getHeight = function (jqo) { return jqo.height(); };
        }
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;
        function update() {
            var pos = $window.scrollTop();
            $this.each(function () {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }
                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $window.bind('scroll', update).resize(update);
        update();
    };
    if (typeof jQuery.fn.parallax !== 'undefined') {
        $(document).ready(function () {
            $('.qubely-row-parallax').each(function () {
                $(this).parallax("center", 0.4)
            })
        })
    }



    // check if element in viewport
     function isElementInViewport (el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }


    $(document).on('ready', function() {

        $('.qubely-block-pie-progress').each(function () {
            var $that = $(this);
            var circle = $that.find('circle:last-child');
            var pieOffset = circle.data('dashoffset');
            var transition = circle.data('transition');
            var duration = circle.data('transition-duration');
            var progressCount = $that.find('.qubely-pie-counter');
            var number = parseInt(circle.data('percent'));

            if(parseInt(duration) > 0){
                progressCount.html(0);
            }

            var pieEvent = function () {
                if(isElementInViewport($that.find('svg')[0])){
                    circle.css('transition', transition)
                    circle.attr('stroke-dashoffset', pieOffset);
                    if(parseInt(duration) > 0){
                        progressCounter();
                    }
                    window.removeEventListener('scroll', pieEvent, true)
                }
            }

            var progressCounter = function () {
                var current = 0;
                var time = parseInt(duration);
                var interval = Math.ceil(time / number);

                var timer = function() {
                    if(current >= number){
                        intvlId && clearInterval(intvlId)
                    }
                    progressCount.html(current)
                    current++;
                }
                var intvlId = setInterval(timer, interval)
            }

            window.addEventListener('scroll', pieEvent, true);
            pieEvent()
        })

    });





})(jQuery);
