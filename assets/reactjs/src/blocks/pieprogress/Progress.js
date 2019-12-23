const {CSSProperties} = wp.element

const defaultProps = {
    isSaveMode: false,
    size: 150,
    circleShrink: 0,
    thickness: 11,
    thicknessBg: 21,
    percent: 55,
    duration: 1000,
    corner: 'round',
    emptyFill: '#eff4f8',
    layout: 'outline',
    fill: {
        color: '#25b5e1',
        openColor: 1,
        type: 'gradient',
        gradient: {
            type: 'linear',
            color1: '#25b5e1',
            color2: '#45dbca',
            direction: '47',
            start: '0',
            stop: '100'
        }
    },
    progressShadow: {
        blur: 3,
        color: 'rgba(0, 0, 0, .2)',
        horizontal: '7',
        inset: '',
        openShadow: false,
        spread: 0,
        vertical: 2,
    },
    circleShadow: {
        blur: 3,
        color: 'rgba(100, 121, 130, .43)',
        horizontal: '2',
        inset: 'inset',
        openShadow: true,
        spread: 0,
        vertical: 2,
    }
}


const Progress = (props) => {
    props = {...defaultProps, ...props}
    const { emptyFill, fill, uniqueId, corner, layout, circleShadow, progressShadow, isSaveMode} = props
    const size = parseInt(props.size)
    const circleShrink = parseInt(props.circleShrink)
    const thickness = parseInt(props.thickness)
    const thicknessBg = parseInt(props.thicknessBg)
    const percent = parseInt(props.percent)
    const duration = isSaveMode ? parseInt(props.duration) : 0


    const progressStyle = {
        transition: '0ms',
        width: size + 'px',
        // height: size + 'px',
    }

    let circleRadiusBg = (size - thicknessBg) * .5
    let circleRadiusFg = (size - thickness) * .5

    if(thickness > thicknessBg) {
        circleRadiusBg -= (thickness - thicknessBg) * .5
    }

    if(thicknessBg > thickness) {
        circleRadiusFg -= (thicknessBg - thickness) * .5
    }

    const circumference = 2 * Math.PI * circleRadiusFg
    const offset = circumference * percent / 100
    const radialPercent = (size /2 * thickness / 100) * .5

    return (
        <div className="qubely-pie-progress" style={progressStyle} role="progressbar">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`${size / 2} ${size / 2} ${size} ${size}`}
                style={{transform: 'rotate(-90deg)', overflow: 'visible'}}>

                {/*progress shadow*/}

                {
                    progressShadow.openShadow === true && (
                        progressShadow.inset !== 'inset' ? (
                            <filter id={`progress-shadow-${uniqueId}`} width="500%" height="500%" x="-250%" y="-250%">
                                <feDropShadow dx={progressShadow.vertical * -1} dy={progressShadow.horizontal} stdDeviation={progressShadow.blur} flood-color={progressShadow.color} flood-opacity="1" />
                            </filter>
                        ) : (
                            <filter id={`progress-shadow-${uniqueId}`} width="500%" height="500%" x="-250%" y="-250%">
                                <feOffset dx={progressShadow.vertical * -1} dy={progressShadow.horizontal} />
                                <feGaussianBlur stdDeviation={progressShadow.blur} />
                                <feComposite operator="out" in="SourceGraphic" result="inverse"/>
                                <feFlood flood-color={progressShadow.color} flood-opacity="1" result="color"/>
                                <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                                <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
                            </filter>
                        )
                    )
                }


                {/*circle shadow*/}

                {
                    circleShadow.openShadow === true && (
                        circleShadow.inset !== 'inset' ? (
                            <filter id={`circle-shadow-${uniqueId}`} width="500%" height="500%" x="-250%" y="-250%">
                                <feDropShadow dx={circleShadow.vertical * -1} dy={circleShadow.horizontal} stdDeviation={circleShadow.blur} flood-color={circleShadow.color} flood-opacity="1" />
                            </filter>
                        ) : (
                            <filter id={`circle-shadow-${uniqueId}`} width="500%" height="500%" x="-250%" y="-250%">
                                <feOffset dx={circleShadow.vertical * -1} dy={circleShadow.horizontal} />
                                <feGaussianBlur stdDeviation={circleShadow.blur} />
                                <feComposite operator="out" in="SourceGraphic" result="inverse"/>
                                <feFlood flood-color={circleShadow.color} flood-opacity="1" result="color"/>
                                <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                                <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
                            </filter>
                        )
                    )
                }
                {
                    fill.type !== 'color' && (
                        fill.gradient.type == 'radial' ? (
                            <radialGradient id={`qgrd-${uniqueId}`} fx="50%" fy="50%" cx="50%" cy="50%" r={`${radialPercent}%`} spreadMethod="reflect">
                                <stop offset={`${fill.gradient.start || 0}%`} stop-color={fill.gradient.color1} />
                                <stop offset={`${fill.gradient.stop || 100}%`} stop-color={fill.gradient.color2} />
                            </radialGradient>
                        ) : (
                            <linearGradient id={`qgrd-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform={`rotate(${fill.gradient.direction - 90 || 0}, .5, .5)`}>
                                <stop offset={`${fill.gradient.start || 0}%`} stop-color={fill.gradient.color1} />
                                <stop offset={`${fill.gradient.stop || 100}%`} stop-color={fill.gradient.color2} />
                            </linearGradient>
                        )
                    )
                }

                {/* Circle / Background */}
                <circle
                    {...(circleShadow.openShadow === true && {filter: `url(#circle-shadow-${uniqueId})`})}
                    cx={size}
                    cy={size}
                    r={circleRadiusBg - circleShrink}
                    stroke={emptyFill}
                    stroke-width={thicknessBg}
                    fill={layout !== 'outline' ? emptyFill : 'none'}
                />

                {/* Progress / Forground */}
                <circle
                    className='qubely-pie-circle-fg'
                    {...(progressShadow.openShadow === true && {filter: `url(#progress-shadow-${uniqueId})`})}
                    cx={size}
                    cy={size}
                    r={circleRadiusFg}
                    stroke-dasharray={circumference}
                    stroke-dashoffset={isSaveMode === true ? circumference : circumference - offset}
                    data-dashoffset={circumference - offset}
                    stroke-width={thickness}
                    stroke-linecap={corner}
                    fill="none"
                    data-transition={`stroke-dashoffset ${isSaveMode === true ? duration : 0}ms linear`}
                    data-transition-duration={isSaveMode === true ? duration : 0}
                    data-percent={percent}
                    stroke={fill.openColor ? (fill.type === 'color' ? fill.color : `url(#qgrd-${uniqueId})`) : defaultProps.fill.color}
                />
            </svg>
        </div>
    );
}

export default Progress;