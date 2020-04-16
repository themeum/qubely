var imageComparison = function () {
    const dragCircles = document.querySelectorAll('.comparison-scrollCircle');
    const imageComparisonRoot = document.querySelector('.qubely-block-image-comparison');
    const imageComparisonimages = document.querySelectorAll('.qubely-block-image-comparison img');
    imageComparisonimages.forEach( (eachImg) => {
        eachImg.style.width = imageComparisonRoot.offsetWidth + 'px';
    });

    dragCircles.forEach( (dragCircle) => {
        dragCircle.addEventListener('mousedown', (event) => {
            const container = event.target.parentNode;
            const resizeElement = container.querySelector('.comparison-resize-img');
            draging(container, dragCircle, resizeElement);
        });
    
        const draging = (container, dragCircle, resizeElement) => {
            let moving = () => {
                
                let containerOffset = container.getBoundingClientRect().left - 40,
                    containerWidth = container.offsetWidth,
                    rect = container.getBoundingClientRect().left - 40,
                    movingValue = ( ( event.pageX - 37 )  - containerOffset) / (containerWidth / 100);
                if(movingValue < 5)
                    movingValue = 5;
                else if(movingValue > 95)
                    movingValue = 95;
                dragCircle.style.left = movingValue+'%';
                resizeElement.style.width = movingValue+'%';
    
            };
    
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
