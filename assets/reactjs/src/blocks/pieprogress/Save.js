import Progress from './Progress'
const { __ } = wp.i18n

const Save = (props) => {
    const { uniqueId, progress, size, thickness, background, fillColor, } = props.attributes
    const progressAttr = {
        size,
        percent: progress,
        thickness,
        emptyFill: background,
        fill: fillColor
    }
    return (
        <div className={`qubely-block-${uniqueId}`}>
            <Progress {...progressAttr} />
        </div>
    )
}

export default Save
