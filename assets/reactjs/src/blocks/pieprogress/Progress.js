const defaultProps = {
    size: 150,
    thickness: 8,
    percent: 20,
    totalDuration: 1200,
    emptyFill: '#dddddd',
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
    }
}

const Progress = (props) => {
    props = {...defaultProps, ...props}
    const { emptyFill, fill, uniqueId} = props

    const size = parseInt(props.size)
    const thickness = parseInt(props.thickness)
    const percent = parseInt(props.percent)
    const totalDuration = parseInt(props.totalDuration)

    const duration = totalDuration * percent / 100
    const circumference = 2 * Math.PI * ((size - thickness) / 2)
    const offset = circumference * percent / 100
    const radialPercent = (size /2 * thickness / 100) * .5

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

    return (
        <div className="qubely-pie-progress" style={progressStyle} role="progressbar">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`${size / 2} ${size / 2} ${size} ${size}`}
                style={{transform: 'rotate(-90deg)'}}>
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
                <circle
                    cx={size}
                    cy={size}
                    r={(size - thickness) / 2}
                    stroke-width={thickness}
                    style={emptyStyle}
                    fill="none"
                />
                <circle
                    cx={size}
                    cy={size}
                    r={(size - thickness) / 2}
                    stroke-dasharray={circumference}
                    stroke-dashoffset={circumference - offset}
                    stroke-width={thickness}
                    stroke-linecap="round"
                    fill="none"
                    style={fillStyle}
                    stroke={fill.type === 'color' ? fill.color : `url(#qgrd-${uniqueId})`}
                />
            </svg>
        </div>
    );
}


export default Progress;


