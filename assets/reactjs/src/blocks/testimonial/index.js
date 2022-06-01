import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
import attributes from "./attributes";
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

registerBlockType("qubely/testimonial", {
	title: __("Testimonial", "qubely"),
	description: "Display client feedbacks with Qubely Testimonials.",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-testimonial.svg"} alt={__("Testimonial")} />,
	category: "qubely",
	keywords: [__("testimonial", "qubely"), __("Quote", "qubely"), __("Ratings", "qubely")],
	supports: {
		align: ["center", "wide", "full"],
	},
	example: {
		attributes: {},
	},
	attributes,
	edit: Edit,
	save: Save,
	deprecated: [
		{
			attributes,
			save(props) {
				const {
					attributes: {
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
					},
				} = props;

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
													avatar2x.url != undefined
														? avatar.url + " 1x, " + avatar2x.url + " 2x"
														: ""
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
									<div className="qubely-testimonial-author-designation">
										{testimonialDesignation}
									</div>
								</div>

								{showAvatar && (avatarLayout == "right" || avatarLayout == "bottom") && (
									<Fragment>
										{avatar.url != undefined ? (
											<img
												className="qubely-testimonial-avatar"
												src={avatar.url}
												srcSet={
													avatar2x.url != undefined
														? avatar.url + " 1x, " + avatar2x.url + " 2x"
														: ""
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
									data-qubelyrating={ratings}
									className="qubely-testimonial-ratings"
									onClick={() => this.handlePanelOpenings("Ratings")}
								/>
							)}

							{quoteIcon && layout == 1 && (
								<div className="qubely-testimonial-quote">
									<span className={`qubely-quote-icon ${quoteIcon}`} />
								</div>
							)}

							<div className="qubely-testimonial-content">{testimonialMessage}</div>

							{showRatings && ratings > 0 && layout == 1 && (
								<div
									data-qubelyrating={ratings}
									className="qubely-testimonial-ratings"
									onClick={() => this.handlePanelOpenings("Ratings")}
								/>
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
			},
		},
	],
});
