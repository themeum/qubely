const { Component } = wp.element;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

class Save extends Component {
	renderListItems = () => {
		const {
			attributes: { listItems },
		} = this.props;

		return listItems.map((item, i) => <li key={i}>{item}</li>);
	};
	render() {
		const {
			attributes: { uniqueId, alignment, bulletStyle, listType, animation, interaction },
		} = this.props;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		const ListTag = listType == "ordered" ? "ol" : "ul";
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-advanced-list ${interactionClass} qubely-alignment-${alignment}`}>
					<ListTag
						className={`qubely-list qubely-list-type-${listType} qubely-list-bullet-${bulletStyle.name}`}
					>
						{this.renderListItems()}
					</ListTag>
				</div>
			</div>
		);
	}
}

export default Save;
