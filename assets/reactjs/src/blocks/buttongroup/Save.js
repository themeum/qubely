const { Component } = wp.element;
const { InnerBlocks } = wp.editor
class Save extends Component {
	render() {
		const { uniqueId } = this.props.attributes
		return (
			<div className={`qubely-block-${uniqueId}`} >
				<div className={`qubely-block-button-group`}>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
}
export default Save