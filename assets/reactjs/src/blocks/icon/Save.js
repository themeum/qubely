const { Component } = wp.element;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

class Save extends Component {
	render() {
		const { uniqueId, name, url, animation, interaction } = this.props.attributes;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-icon-wrapper ${interactionClass}`}>
					<div className="qubely-block-icon">
						{url.url ? (
							<a
								className="qubely-icon-block-anchor"
								href={url.url || "#"}
								{...(url.target && { target: "_blank" })}
								{...(url.nofollow && { rel: "nofollow noopener noreferrer" })}
							>
								<i className={name} />
							</a>
						) : (
							<i className={name} />
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default Save;
