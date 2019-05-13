const { Component } = wp.element
const { InnerBlocks } = wp.editor
class Save extends Component {
    render() {
        const { attributes: { id } } = this.props
        return (
            <div className={`qubely-tab-content ${(id == 1) ? 'qubely-active' : ''}`}>
                <InnerBlocks.Content />
            </div>
        )
    }
}
export default Save