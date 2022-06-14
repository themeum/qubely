const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;
class Save extends Component {
	render() {
		const { clientId, attributes } = this.props;
		const { animation, uniqueId, itemToggle, interaction } = attributes;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		const className = `qubely-block-accordion ${interactionClass} qubely-block-${clientId}`;
		return (
			<div className={className} {...animationAttr(animation)} data-item-toggle={itemToggle}>
				<InnerBlocks.Content />
			</div>
		);
	}
}
export default Save;
