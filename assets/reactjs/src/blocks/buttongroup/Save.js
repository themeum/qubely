const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { IsInteraction, animationAttr } } = wp.qubelyComponents

class Save extends Component {
	render() {
		const { uniqueId, interaction, animation } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-button-group ${interactionClass}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
}
export default Save