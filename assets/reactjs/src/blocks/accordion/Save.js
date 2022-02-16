const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;
class Save extends Component {
	render() {
		const { animation, uniqueId, itemToggle, interaction } = this.props.attributes;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		const className = `qubely-block-accordion ${interactionClass} qubely-block-${uniqueId}`;
		return (
			<div className={className} {...animationAttr(animation)} data-item-toggle={itemToggle}>
				<InnerBlocks.Content />
			</div>
		);
	}
}
export default Save;
