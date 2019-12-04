import React from 'react';

const defaultProps = {
    size: 150,
    thickness: 8,
    percent: 20,
    totalDuration: 1200,
    emptyFill: '#dddddd',
    fill: '#007bff'
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
        // transition: `stroke-dashoffset ${duration}ms linear`,
        stroke: fill
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
                />
            </svg>
        </div>
    );
}


export default Progress;


