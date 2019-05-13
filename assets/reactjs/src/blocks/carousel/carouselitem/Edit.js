const { Component } = wp.element
const { InnerBlocks } = wp.editor
// const ALLOWED_BLOCKS = ['qubely/infobox','qubely/testimonial','qubely/row','qubely/pricing']
class Edit extends Component {
    render() {
        return (
            <div>
                <InnerBlocks
                    templateLock={false}
                    // allowedBlocks={ALLOWED_BLOCKS} 
                />
            </div>
        )
    }
}
export default Edit