const defaultProps = {
    size: 150,
    circleSize: 150,
    thickness: 8,
    thicknessBg: 6,
    percent: 20,
    totalDuration: 1200,
    corner: 'unset',
    emptyFill: '#dddddd',
    layout: 'outline',
    fill: {
        color: '#007bff',
        openColor: 0,
        type: 'color',
        gradient: {
            type: 'linear',
            color1: '#16d03e',
            color2: '#1f91f3',
            direction: '0',
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
        color: 'rgba(0, 0, 0, .2)',
        horizontal: '7',
        inset: '',
        openShadow: false,
        spread: 0,
        vertical: 2,
    }
}

const Progress = (props) => {
    props = {...defaultProps, ...props}
    const { emptyFill, fill, uniqueId, corner, layout, circleShadow, progressShadow} = props

    const size = parseInt(props.size)
    const thickness = parseInt(props.thickness)
    const thicknessBg = parseInt(props.thicknessBg)
    const percent = parseInt(props.percent)

    // const totalDuration = parseInt(props.totalDuration)
    // const duration = totalDuration * percent / 100
    const fillStyle = {
        // transition: `stroke-dashoffset ${duration}ms linear`,
    }

    const emptyStyle = {
        stroke: emptyFill,
    }

    const progressStyle = {
        transition: '0ms',
        width: size + 'px',
        height: size + 'px',
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
                                <feDropShadow dx={progressShadow.horizontal} dy={progressShadow.vertical} stdDeviation={progressShadow.blur} flood-color={progressShadow.color} flood-opacity="1" />
                            </filter>
                        ) : (
                            <filter id={`progress-shadow-${uniqueId}`} width="500%" height="500%" x="-250%" y="-250%">
                                <feOffset dx={progressShadow.horizontal} dy={progressShadow.vertical} />
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
                                <feDropShadow dx={circleShadow.horizontal} dy={circleShadow.vertical} stdDeviation={circleShadow.blur} flood-color={circleShadow.color} flood-opacity="1" />
                            </filter>
                        ) : (
                            <filter id={`circle-shadow-${uniqueId}`} width="500%" height="500%" x="-250%" y="-250%">
                                <feOffset dx={circleShadow.horizontal} dy={circleShadow.vertical} />
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
                    r={circleRadiusBg}
                    stroke-width={thicknessBg}
                    style={emptyStyle}
                    fill={layout !== 'outline' ? emptyFill : 'none'}
                />

                {/* Progress / Forground */}

                <circle
                    {...(progressShadow.openShadow === true && {filter: `url(#progress-shadow-${uniqueId})`})}
                    cx={size}
                    cy={size}
                    r={circleRadiusFg}
                    stroke-dasharray={circumference}
                    stroke-dashoffset={circumference - offset}
                    stroke-width={thickness}
                    stroke-linecap={corner}
                    fill="none"
                    style={fillStyle}
                    stroke={fill.type === 'color' ? fill.color : `url(#qgrd-${uniqueId})`}
                />
            </svg>
        </div>
    );
}


export default Progress;


