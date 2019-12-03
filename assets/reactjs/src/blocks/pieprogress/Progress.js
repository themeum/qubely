import React from 'react';

const defaultProps = {
    size: 150,
    thickness: 8,
    percent: 20,
    totalDuration: 1200,
    emptyFill: '#dddddd',
    fill: 'red'
}

const Progress = (props) => {
    props = {...defaultProps, ...props}
    const { emptyFill, fill} = props

    const size = parseInt(props.size)
    const thickness = parseInt(props.thickness)
    const percent = parseInt(props.percent)
    const totalDuration = parseInt(props.totalDuration)


    const duration = totalDuration * percent / 100
    const circumference = 2 * Math.PI * ((size - thickness) / 2)
    const offset = circumference * percent / 100

    const fillStyle = {
        transitionDuration: duration + 'ms',
        stroke: fill
    }

    const emptyStyle = {
        stroke: emptyFill,
    }

    return (
        <div className="qubely-pie-progress" role="progressbar" style={{width: size + 'px', height: size + 'px'}}>
            <svg
                viewBox={`${size / 2} ${size / 2} ${size} ${size}`}
                style={{transform: 'rotate(-90deg)'}}>
                <circle
                    cx={size}
                    cy={size}
                    r={(size - thickness) / 2}
                    strokeWidth={thickness}
                    style={emptyStyle}
                    fill="none"
                />
                <circle
                    cx={size}
                    cy={size}
                    r={(size - thickness) / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - offset}
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    fill="none"
                    style={fillStyle}
                />
            </svg>
        </div>
    );
}


export default Progress;


