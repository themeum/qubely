const { Fragment, Component } = wp.element;
const { RichText } = wp.blockEditor;
import svg from "../heading/separators";
const { QubelyButtonSave } = wp.qubelyComponents;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

class Save extends Component {
	render() {
		const {
			uniqueId,
			layout,
			mediaType,
			titleLevel,
			title,
			separatorStyle,
			separatorPosition,
			enableContent,
			content,
			iconName,
			image,
			image2x,
			imgAlt,
			imageType,
			imageSize,
			externalImageUrl,
			number,
			enableButton,
			animation,
			subTitle,
			subTitleLevel,
			subTitleContent,
			buttonFillType,
			buttonSize,
			buttonText,
			buttonUrl,
			buttonIconName,
			buttonIconPosition,
			useMediaBg,
			interaction,
		} = this.props.attributes;

		const separators = {
			solid: { type: "css", separator: "solid", width: 300, stroke: 10 },
			double: { type: "css", separator: "double", width: 300, stroke: 10 },
			dotted: { type: "css", separator: "dotted", width: 300, stroke: 10 },
			dashed: { type: "css", separator: "dashed", width: 300, stroke: 10 },
			pin: { type: "svg", separator: "pin", svg: svg["pin"], width: 100, stroke: 0 },
			pin_filled: { type: "svg", separator: "pin_filled", svg: svg["pin_filled"], width: 100, stroke: 0 },
			zigzag: { type: "svg", separator: "zigzag", svg: svg["zigzag"], style: "fill", width: 88, stroke: 5 },
			zigzag_large: {
				type: "svg",
				separator: "zigzag_large",
				svg: svg["zigzag_large"],
				style: "fill",
				width: 161,
				stroke: 5,
			},
		};

		const renderSeparators = (
			<Fragment>
				{separatorStyle && (
					<Fragment>
						{separators[separatorStyle].type == "css" && (
							<span className={`qubely-separator-type-css qubely-separator-${separatorStyle}`} />
						)}
						{separators[separatorStyle].type == "svg" && (
							<span className={`qubely-separator-type-svg qubely-separator-${separatorStyle}`}>
								{separators[separatorStyle].svg}
							</span>
						)}
					</Fragment>
				)}
			</Fragment>
		);

		const titleTagName = "h" + titleLevel;
		const subTitleTagName = "h" + subTitleLevel;
		const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";

		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-info-box ${interactionClass} qubely-info-box-layout-${layout}`}>
					{layout != 4 && mediaType && (
						<div className={`qubely-info-box-media${useMediaBg ? " qubely-media-has-bg" : ""}`}>
							{mediaType == "icon" && iconName && <i className={"qubely-info-box-icon " + iconName} />}
							{mediaType == "image" && (
								<Fragment>
									{imageType === "local" && image.url != undefined ? (
										<img
											className="qubely-info-box-image"
											src={image.url}
											srcSet={
												image2x.url != undefined
													? image.url + " 1x, " + image2x.url + " 2x"
													: ""
											}
											alt={imgAlt && imgAlt}
										/>
									) : imageType === "external" && externalImageUrl.url != undefined ? (
										<img
											className="qubely-info-box-image"
											src={externalImageUrl.url}
											alt={imgAlt && imgAlt}
										/>
									) : (
										<div
											className={`qubely-info-box-image qubely-image-placeholder${
												typeof imageSize !== "undefined" ? ` size-${imageSize}` : ""
											}`}
										>
											<i className="far fa-image" />
										</div>
									)}
								</Fragment>
							)}
							{mediaType == "number" && number && (
								<span className="qubely-info-box-number">{number}</span>
							)}
						</div>
					)}

					<div className="qubely-info-box-body">
						<div
							className={`qubely-info-box-title-container ${
								separatorStyle ? "qubely-has-separator" : ""
							} ${separatorPosition ? "qubely-separator-position-" + separatorPosition : ""}`}
						>
							<div className="qubely-info-box-title-inner">
								{separatorStyle &&
								(separatorPosition == "left" ||
									separatorPosition == "top" ||
									separatorPosition == "leftright") ? (
									<div className="qubely-separator qubely-separator-before">{renderSeparators}</div>
								) : (
									""
								)}
								<RichText.Content
									tagName={titleTagName}
									className="qubely-info-box-title"
									value={title}
								/>
								{separatorStyle != "" &&
								(separatorPosition == "right" ||
									separatorPosition == "bottom" ||
									separatorPosition == "leftright") ? (
									<div className="qubely-separator qubely-separator-after">{renderSeparators}</div>
								) : (
									""
								)}
							</div>
							{subTitle == 1 && (
								<div className="qubely-info-box-sub-title-container">
									<RichText.Content
										tagName={subTitleTagName}
										className="qubely-info-box-sub-title"
										value={subTitleContent}
									/>
								</div>
							)}
						</div>

						{enableContent && (
							<div className="qubely-info-box-content">
								<RichText.Content tagName="div" className="qubely-info-box-text" value={content} />
							</div>
						)}
						{enableButton && (
							<QubelyButtonSave
								buttonFillType={buttonFillType}
								buttonSize={buttonSize}
								buttonText={buttonText}
								buttonIconName={buttonIconName}
								buttonIconPosition={buttonIconPosition}
								buttonUrl={buttonUrl}
								buttonTag="a"
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default Save;
