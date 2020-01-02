const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
class Save extends Component {
    render() {
        const { attributes: { id } } = this.props
        return (
            <div className={`qubely-tab-content ${(id === 1) ? 'qubely-vertical-active' : ''}`} {...(id !== 1) && {style: 'display: none'}}>
                <InnerBlocks.Content />
            </div>
        )
    }
}
export default Save