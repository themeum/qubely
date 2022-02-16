const { Fragment, Component } = wp.element;
const { RichText } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

class Save extends Component {
	render() {
		const {
			uniqueId,
			layout,
			animation,
			message,
			name,
			designation,
			showAvatar,
			avatar,
			avatar2x,
			avatarAlt,
			avatarLayout,
			quoteIcon,
			showRatings,
			ratings,
			interaction,
		} = this.props.attributes;

		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";

		const testimonialTitle = <RichText.Content tagName="span" value={name} />;
		const testimonialDesignation = <RichText.Content tagName="span" value={designation} />;
		const testimonialMessage = <RichText.Content tagName="div" value={message} />;

		const authorInfo = (
			<Fragment>
				<div className={`qubely-testimonial-author`}>
					<div className={showAvatar ? `qubely-testimonial-avatar-layout-${avatarLayout}` : ``}>
						{showAvatar && (avatarLayout == "left" || avatarLayout == "top") && (
							<Fragment>
								{avatar.url != undefined ? (
									<img
										className="qubely-testimonial-avatar"
										src={avatar.url}
										srcSet={
											avatar2x.url != undefined ? avatar.url + " 1x, " + avatar2x.url + " 2x" : ""
										}
										alt={avatarAlt}
									/>
								) : (
									<div className="qubely-image-placeholder qubely-testimonial-avatar">
										<i className="far fa-user" />
									</div>
								)}
							</Fragment>
						)}

						<div className="qubely-testimonial-author-info">
							<div className="qubely-testimonial-author-name">{testimonialTitle}</div>
							<div className="qubely-testimonial-author-designation">{testimonialDesignation}</div>
						</div>

						{showAvatar && (avatarLayout == "right" || avatarLayout == "bottom") && (
							<Fragment>
								{avatar.url != undefined ? (
									<img
										className="qubely-testimonial-avatar"
										src={avatar.url}
										srcSet={
											avatar2x.url != undefined ? avatar.url + " 1x, " + avatar2x.url + " 2x" : ""
										}
										alt={avatarAlt}
									/>
								) : (
									<div className="qubely-image-placeholder qubely-testimonial-avatar">
										<i className="far fa-user" />
									</div>
								)}
							</Fragment>
						)}
					</div>
				</div>
			</Fragment>
		);

		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-testimonial ${interactionClass}`}>
					{layout == 2 && authorInfo}

					{showRatings && ratings > 0 && layout == 2 && (
						<div
							className="qubely-testimonial-ratings"
							style={{ "--qubely-testimonial-rating": `${ratings * 20}%` }}
						></div>
					)}

					{quoteIcon && layout == 1 && (
						<div className="qubely-testimonial-quote">
							<span className={`qubely-quote-icon ${quoteIcon}`} />
						</div>
					)}

					<div className="qubely-testimonial-content">{testimonialMessage}</div>

					{showRatings && ratings > 0 && layout == 1 && (
						<div
							className="qubely-testimonial-ratings"
							style={{ "--qubely-testimonial-rating": `${ratings * 20}%` }}
						></div>
					)}

					{layout == 1 && authorInfo}

					{quoteIcon && layout == 2 && (
						<div className="qubely-testimonial-quote qubely-position-bottom">
							<span className={`qubely-quote-icon ${quoteIcon}`} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Save;
