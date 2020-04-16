var imageComparison = function () {
    const dragCircle = document.querySelector('.comparison-scrollCircle');
    
    const img = document.querySelectorAll('.qubely-block-image-comparison img');

    console.log(img);

	dragCircle.addEventListener('mousedown', (event) => {
		const container = event.target.parentNode;
		const resizeElement = container.querySelector('.comparison-resize-img');
		draging(container, dragCircle, resizeElement);
	});

	const draging = (container, dragCircle, resizeElement) => {
		let moving = () => {
            
            let containerOffset = container.getBoundingClientRect().left - 40,//container.offsetLeft,
                containerWidth = container.offsetWidth,
                rect = container.getBoundingClientRect().left - 40,
                movingValue = ( ( event.pageX - 37 )  - containerOffset) / (containerWidth / 100);
            console.log(containerWidth, containerOffset,event.pageX, rect); //return 0;
            if(movingValue < 10)
                movingValue = 10;
            else if(movingValue > 90)
                movingValue = 90;
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
};

if (
	document.readyState === 'complete' ||
	(document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
	imageComparison();
} else {
	document.addEventListener('DOMContentLoaded', imageComparison);
}
