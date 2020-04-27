var imageComparison = function () {
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
            // prevent right click mouse down
            if(event.which == 3 || event.which == 2) {
                dragCircle.removeEventListener('mousedown', mouseDownTrigger);
                return 0;
            }
            draging(dragCircle);
        });
        let moving = () => {
            let pageX = (event.pageX !== undefined) ? event.pageX : event.changedTouches[0].clientX;
            let containerOffset = container.getBoundingClientRect().left - 40,
                containerWidth = container.offsetWidth,
                movingValue = ( ( pageX - 37 )  - containerOffset ) / (containerWidth / 100);
            if(movingValue < 5)
                movingValue = 5;
            else if(movingValue > 95)
                movingValue = 95;
            dragCircle.style.left = movingValue+'%';
            resizeElement.style.width = movingValue+'%';
        };
        //touch event
        dragCircle.addEventListener('touchmove', () => {
            moving();
        });
        const draging = (dragCircle) => {
            container.addEventListener('mousemove', moving);
            let dragRevoveFunc = (event) => {
                container.removeEventListener('mousemove', moving);
            };
            container.addEventListener('mouseup', dragRevoveFunc);
            window.addEventListener('mouseup', dragRevoveFunc);
        };
    });

};

if (
	document.readyState === 'complete' ||
	(document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
	imageComparison();
} else {
	document.addEventListener('DOMContentLoaded', imageComparison);
}