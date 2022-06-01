const { Component } = wp.element;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;
class Save extends Component {
	render() {
		const { uniqueId, socialIcons, iconLabel, layout, useDefaultStyle, animation, interaction } =
			this.props.attributes;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div
					className={`qubely-block-social-icons ${interactionClass} qubely-layout-${layout} qubely-style-${
						useDefaultStyle ? "default" : "custom"
					}`}
				>
					<ul className="qubely-ul">
						{socialIcons.map((item, index) => (
							<li
								key={index}
								className={`qubely-li qubely-social-item qubely-social-${item.id}`}
								arealabel={item.label}
							>
								<a href={item.url || "#"} target="_blank" rel="nofollow noopener noreferrer">
									<i className={"qubely-social-icon " + item.icon} />
									{iconLabel && item.label && (
										<span className="qubely-social-label">{item.label}</span>
									)}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
export default Save;
