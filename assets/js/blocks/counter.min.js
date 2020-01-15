document.addEventListener("DOMContentLoaded", function() {
    const counterElement = document.querySelectorAll('.qubely-block-counter-number')
    if (counterElement.length > 0) {
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
 });