const { Component } = wp.element;
const { RichText } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;
class Save extends Component {
	renderTimeline = () => {
		const {
			attributes: {
				timelineContents,
				enableContentBorder,
				headingLevel,
				enableDateTime,
				enableImage,
				connectorIcon,
			},
		} = this.props;

		const titleTagName = "h" + headingLevel;

		return timelineContents.map(({ title, date, description, image }, index) => {
			return (
				<div key={index} className={`qubely-timeline-item qubely-timeline-${index % 2 ? "right" : "left"}`}>
					<div className="qubely-timeline-connector">
						{connectorIcon != "" && <span className={"qubely-timeline-connector-icon " + connectorIcon} />}
					</div>
					<div
						className={`qubely-timeline-content${
							enableContentBorder == 1 ? " qubely-content-has-border" : ""
						}`}
					>
						{enableImage == 1 && image != undefined && image.url != undefined && (
							<div className={`qubely-timeline-image-container`}>
								<img src={image.url} alt={title} />
							</div>
						)}
						<div className="qubely-timeline-description">
							<RichText.Content tagName={titleTagName} className="qubely-timeline-title" value={title} />
							<RichText.Content
								tagName="div"
								className="qubely-timeline-description"
								value={description}
							/>
						</div>
						<span className="qubely-timeline-indicator" />
					</div>
					{enableDateTime == 1 && (
						<div className="qubely-timeline-date-container">
							<RichText.Content tagName="div" className="qubely-timeline-date" value={date} />
						</div>
					)}
				</div>
			);
		});
	};

	render() {
		const {
			attributes: { uniqueId, orientation, animation, interaction },
		} = this.props;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div
					className={`qubely-block-timeline ${interactionClass} qubely-timeline-layout-vertical qubely-timeline-orientation-${orientation}`}
				>
					<div className={`qubely-timeline-items`}>{this.renderTimeline()}</div>
				</div>
			</div>
		);
	}
}

export default Save;
