
const imageComparison = function () {

    const dragCircles = document.querySelectorAll('.comparison-scrollCircle');
    const imageComparisonRoot = document.querySelector('.qubely-block-image-comparison');
    const imageComparisonimages = document.querySelectorAll('.qubely-block-image-comparison img');

    imageComparisonimages.forEach( (eachImg) => {
        eachImg.style.width = imageComparisonRoot.offsetWidth + 'px';
    });

    dragCircles.forEach( (dragCircle) => {

        const container = dragCircle.parentNode;
        const resizeElement = container.querySelector('.resizable-img');

        dragCircle.addEventListener('mousedown', function mouseDownTrigger(event) {
            // prevent right click mousedown event
            if(event.which == 3 || event.which == 2) {
                dragCircle.removeEventListener('mousedown', mouseDownTrigger); return;
            }
            draging(dragCircle);
        });

        function moving() {
            let pageX = event.pageX ? event.pageX : event.touches[0].clientX;
            let containerOffset = container.getBoundingClientRect().left,
                containerWidth = container.offsetWidth,
                movingValue = (pageX  - containerOffset) / (containerWidth / 100);
            if(movingValue < 5) movingValue = 5;
            else if(movingValue > 95) movingValue = 95;
            dragCircle.style.left = movingValue+'%';
            resizeElement.style.width = movingValue+'%';
        }

        function dragRevoveFunc() {
            container.removeEventListener('mousemove', moving);
        }

        function draging(dragCircle) {
            container.addEventListener('mousemove', moving);
            container.addEventListener('mouseup', dragRevoveFunc);
            window.addEventListener('mouseup', dragRevoveFunc);
        }

        //attaching touch event
        dragCircle.addEventListener('touchmove', moving);

    }); // end of dragCircle foreach

};

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
    imageComparison();
} else {
    document.addEventListener('DOMContentLoaded', imageComparison);
}