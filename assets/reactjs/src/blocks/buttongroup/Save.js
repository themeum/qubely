const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { IsInteraction } } = wp.qubelyComponents

class Save extends Component {
	render() {
		const { uniqueId, interaction } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		return (
			<div className={`qubely-block-${uniqueId}`} >
				<div className={`qubely-block-button-group ${interactionClass}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
}
export default Save