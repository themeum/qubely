const { Component, Fragment } = wp.element;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;
class Save extends Component {
	render() {
		const { uniqueId, counterLimit, counterDuration, postfix, prefix, animation, interaction } =
			this.props.attributes;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-counter ${interactionClass}`}>
					<div className="qubely-block-counter-content">
						{counterLimit > 0 && (
							<Fragment>
								{prefix && <span className="qubely-block-counter-prefix">{prefix}</span>}
								<span
									className="qubely-block-counter-number"
									data-limit={counterLimit}
									data-start={0}
									data-counterDuration={counterDuration}
								>
									{0}
								</span>
								{postfix && <span className="qubely-block-counter-postfix">{postfix}</span>}
							</Fragment>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default Save;
