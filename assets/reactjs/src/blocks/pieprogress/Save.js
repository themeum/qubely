import Progress from './Progress'
const { __ } = wp.i18n
const { RichText } = wp.editor;

const Save = (props) => {
    const {
        uniqueId,
        progress,
        size,
        layout,
        corner,
    } = props.attributes

    const progressAttr = {
        size,
        layout,
        corner: layout === 'fill' ? 'unset' : corner,
        uniqueId,
        percent: progress
    }
    return (
        <div className={`qubely-block-${uniqueId} qubely-block-pie-progress`}>
            <div className="qubely-progress-parent">
                <Progress {...progressAttr} />
            </div>
        </div>
    )
}

export default Save
