jQuery(document).ready(function ($) {

    if ($('.qubely-carousel-wrapper').length > 0) {
        const counterElement = $('.qubely-carousel-wrapper')
        let indexOfCounterElement = 0
        while (indexOfCounterElement < counterElement.length) {
            let currentElement = counterElement[indexOfCounterElement]

            const { items, autoplay, interval, speed, dots, dot_indicator, nav, responsive } = JSON.parse(currentElement.dataset.options)

            $(".qubely-carousel-wrapper").qubelyCarousel({
                autoplay: autoplay,
                interval: interval,
                speed: speed,
                margin: 10,
                dots: dots,
                dot_indicator: dot_indicator,
                nav: nav,
                center: false,
                responsive: [...responsive],
                
                onChange: function (item) {
                    // console.log("test: ", item)
                }
            })
            indexOfCounterElement++
        }
    }



});
