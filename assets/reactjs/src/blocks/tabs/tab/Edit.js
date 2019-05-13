const { Component } = wp.element
const { InnerBlocks } = wp.editor
class Edit extends Component {
    render() {
        return (
            <div>
                <InnerBlocks templateLock={false} />
            </div>
        )
    }
}
export default Edit