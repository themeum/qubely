import classnames from "classnames";
const { Component } = wp.element;
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

class Save extends Component {
	render() {
		const {
			uniqueId,
			layout,
			imageType,
			alignmentLayout3,
			image,
			image2x,
			externalImageUrl,
			name,
			designation,
			description,
			useInfoIcon,
			phone,
			email,
			website,
			showSociallinks,
			facebook,
			twitter,
			instagram,
			linkedin,
			youtube,
			github,
			flickr,
			pinterest,
			dribbble,
			behance,
			iconStyle,
			iconUseDefaultStyle,
			enableDesignation,
			enableDescription,
			animation,
			interaction,
		} = this.props.attributes;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";
		const wrapperClasses = classnames(
			{ [`qubely-block-${uniqueId}`]: uniqueId },
			{ ["right-alignment"]: alignmentLayout3 === "right" }
		);
		return (
			<div className={wrapperClasses} {...animationAttr(animation)}>
				<div className={`qubely-block-team ${interactionClass} qubely-team-layout-${layout}`}>
					<div className="qubely-team-image-wrapper">
						{imageType === "local" && image.url != undefined ? (
							<img
								className="qubely-team-image"
								src={image.url}
								srcSet={image2x.url != undefined ? image.url + " 1x, " + image2x.url + " 2x" : ""}
								alt={name}
							/>
						) : imageType === "external" && externalImageUrl.url != undefined ? (
							<img className="qubely-team-image" src={externalImageUrl.url} alt={name} />
						) : (
							<div className="qubely-image-placeholder">
								<i className="far fa-image" />
							</div>
						)}
					</div>
					<div className="qubely-team-content">
						<div className="qubely-team-content-inner">
							<RichText.Content tagName="span" className="qubely-team-name" value={name} />
							{enableDesignation == 1 && (
								<div className="qubely-team-designation-container">
									<RichText.Content
										tagName="span"
										className="qubely-team-designation"
										value={designation}
									/>
								</div>
							)}
							{enableDescription == 1 && (
								<RichText.Content
									tagName="div"
									className="qubely-team-description"
									value={description}
								/>
							)}
							{(phone || email || website) && (
								<div className="qubely-team-information">
									{phone && (
										<div className={`qubely-team-information-phone`}>
											{useInfoIcon && (
												<i className="qubely-info-icon fas fa-phone" aria-label={__("Phone")} />
											)}
											<span>{phone}</span>
										</div>
									)}
									{email && (
										<div className={`qubely-team-information-email`}>
											{useInfoIcon && (
												<i
													className={`qubely-info-icon fas fa-envelope`}
													aria-label={__("Email")}
												/>
											)}
											<span>{email}</span>
										</div>
									)}
									{website && (
										<div className={`qubely-team-information-website`}>
											{useInfoIcon && (
												<i
													className={`qubely-info-icon fas fa-globe`}
													aria-label={__("Website")}
												/>
											)}
											<span>
												<a>{website}</a>
											</span>
										</div>
									)}
								</div>
							)}
							{showSociallinks &&
								(facebook ||
									twitter ||
									instagram ||
									linkedin ||
									youtube ||
									github ||
									flickr ||
									pinterest ||
									dribbble ||
									behance) && (
									<div
										className={`qubely-team-social-links qubely-team-icon-layout-${iconStyle} qubely-team-icon-style-${
											iconUseDefaultStyle == 1 ? "default" : "custom"
										}`}
									>
										{facebook && (
											<a
												href={facebook}
												className="qubely-team-social-facebook"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-facebook" />
											</a>
										)}
										{twitter && (
											<a
												href={twitter}
												className="qubely-team-social-twitter"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-twitter" />
											</a>
										)}
										{instagram && (
											<a
												href={instagram}
												className="qubely-team-social-instagram"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-instagram" />
											</a>
										)}
										{linkedin && (
											<a
												href={linkedin}
												className="qubely-team-social-linkedin"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-linkedin" />
											</a>
										)}
										{youtube && (
											<a
												href={youtube}
												className="qubely-team-social-youtube"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-youtube" />
											</a>
										)}
										{github && (
											<a
												href={github}
												className="qubely-team-social-github"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-github" />
											</a>
										)}
										{flickr && (
											<a
												href={flickr}
												className="qubely-team-social-flickr"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-flickr" />
											</a>
										)}
										{pinterest && (
											<a
												href={pinterest}
												className="qubely-team-social-pinterest"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-pinterest" />
											</a>
										)}
										{dribbble && (
											<a
												href={dribbble}
												className="qubely-team-social-dribbble"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-dribbble" />
											</a>
										)}
										{behance && (
											<a
												href={behance}
												className="qubely-team-social-behance"
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-behance" />
											</a>
										)}
									</div>
								)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Save;
