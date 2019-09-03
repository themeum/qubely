jQuery(document).ready(function ($) {

    if ($('#jsSlider1').length > 0) {
        const counterElement = $('#jsSlider1')
        let indexOfCounterElement = 0
        while (indexOfCounterElement < counterElement.length) {
            let currentElement = counterElement[indexOfCounterElement]

            const { items, autoplay, interval, speed, dots, dot_indicator, nav, responsive } = JSON.parse(currentElement.dataset.options)

            $("#jsSlider1").jsSlider({
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
