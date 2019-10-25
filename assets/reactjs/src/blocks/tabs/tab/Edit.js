const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
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