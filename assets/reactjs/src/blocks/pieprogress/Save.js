import React from 'react'
import Progress from './Progress'
const { __ } = wp.i18n

const Save = (props) => {
    const { uniqueId, progress, size, thickness } = props.attributes
    const progressAttr = {
        size,
        percent: progress,
        uniqueId,
        thickness
    }
    return (
        <Progress {...progressAttr} />
    )
}

export default Save
