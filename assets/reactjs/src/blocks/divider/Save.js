import icons from "../divider/icon";
const { Component } = wp.element;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

class Save extends Component {
	render() {
		const { uniqueId, style, animation, interaction } = this.props.attributes;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-divider ${interactionClass}`}>
					{style == "fill" || style == "dot" || style == "dash" ? (
						<div className={`qubely-block-divider-style-${style}`} />
					) : (
						icons[style]
					)}
				</div>
			</div>
		);
	}
}
export default Save;
