import icons from "../../helpers/icons";
import classnames from "classnames";
const { __ } = wp.i18n;
const { Fragment, Component, createRef } = wp.element;

const { PanelBody, Toolbar, Tooltip } = wp.components;

const { RichText, BlockControls, MediaPlaceholder, InspectorControls, MediaUpload } = wp.blockEditor;

const {
	Range,
	RadioAdvanced,
	Color,
	Media,
	Toggle,
	Typography,
	Inline: { InlineToolbar },
	ContextMenu: { ContextMenu, handleContextMenu },
	gloalSettings: { animationSettings, interactionSettings, globalSettingsPanel },
	InspectorTab,
	InspectorTabs,
	withCSSGenerator,
} = wp.qubelyComponents;

const DEFAULT_SIZE_SLUG = "large";
const ALLOWED_MEDIA_TYPES = ["image"];

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: "md",
		};
		this.qubelyContextMenu = createRef();
	}

	componentDidMount() {
		// image width
		const imageComparisonRoot = document.querySelector(".qubely-block-image-comparison");
		const imageComparisonImages = document.querySelectorAll(".qubely-block-image-comparison img");
		imageComparisonImages.forEach((eachImg) => {
			eachImg.style.width = imageComparisonRoot.offsetWidth + "px";
		});
	}

	dragFunc = (event) => {
		const container = event.target.parentNode;
		const resizeElement = container.querySelector(".resizable-img");
		const dragCircle = container.querySelector(".comparison-scrollCircle");
		this.draging(container, dragCircle, resizeElement);
	};

	draging = (container, dragCircle, resizeElement) => {
		let moving = () => {
			let containerOffset = container.getBoundingClientRect().left - 40,
				containerWidth = container.offsetWidth,
				movingValue = (event.pageX - 37 - containerOffset) / (containerWidth / 100);
			if (movingValue < 10) movingValue = 10;
			else if (movingValue > 90) movingValue = 90;
			dragCircle.style.left = movingValue + "%";
			resizeElement.style.width = movingValue + "%";
		};

		container.addEventListener("mousemove", moving);

		let dragRevoveFunc = () => {
			container.removeEventListener("mousemove", moving);
		};

		container.addEventListener("mouseup", dragRevoveFunc);
		window.addEventListener("mouseup", dragRevoveFunc);
	};
	onSelectImage = (media, imageId) => {
		if (!media || !media.url) {
			return;
		}
		this.props.setAttributes(
			imageId === "A"
				? {
						image: media,
				  }
				: {
						image2: media,
				  }
		);
	};
	onUploadError = (message) => {
		const { noticeOperations } = this.props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};
	onSelectURL = (newURL, imageId) => {
		const { image, image2 } = this.props.attributes;
		let currentImage = image;
		if (imageId === "B") {
			currentImage = image2;
		}
		if (newURL !== currentImage.url) {
			currentImage = {
				...currentImage,
				url: newURL,
				id: undefined,
				sizeSlug: DEFAULT_SIZE_SLUG,
			};
		}
		this.props.setAttributes(
			imageId === "A"
				? {
						image: currentImage,
				  }
				: {
						image2: currentImage,
				  }
		);
	};

	render() {
		const {
			name,
			clientId,
			noticeUI,
			attributes,
			setAttributes,
			attributes: {
				uniqueId,
				className,
				imageATitle,
				titleColor,
				typography,
				imageBTitle,
				controlColor,
				disableTitle,
				verticalAlign,
				horizontalOffset,
				verticalOffset,
				image,
				image2x,
				imgAlt,
				image2,
				image2_2x,
				imgAlt2,

				animation,
				globalZindex,
				enablePosition,
				selectPosition,
				positionXaxis,
				positionYaxis,
				hideDesktop,
				hideTablet,
				hideMobile,
				globalCss,
				interaction,
			},
		} = this.props;

		const { device } = this.state;

		const renderPlaceholder = (imageId, title) => {
			let selectedImage = image;
			if (imageId === "B") {
				selectedImage = image2;
			}
			const mediaPreview = !!selectedImage.url && (
				<img
					alt={__("Edit image")}
					title={__("Edit image")}
					className={"edit-image-preview"}
					src={selectedImage.url}
				/>
			);
			return (
				<MediaPlaceholder
					accept="image/*"
					multiple={false}
					notices={noticeUI}
					icon="format-image"
					mediaPreview={mediaPreview}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					onError={() => this.onUploadError()}
					labels={{ title }}
					onSelect={(media) => this.onSelectImage(media, imageId)}
					onSelectURL={(newUrl) => this.onSelectURL(newUrl, imageId)}
					disableMediaButtons={selectedImage.url}
					value={{ id: selectedImage.id, src: selectedImage.src }}
				/>
			);
		};

		const actionButtons = (id, attr) => {
			return (
				<div className="qubely-media-actions">
					<MediaUpload
						value={id}
						onSelect={(selectedImage) => {
							setAttributes({ [attr]: selectedImage });
						}}
						allowedTypes={["image"]}
						render={({ open }) => (
							<Tooltip text={__("Edit")}>
								<button className="qubely-button" aria-label={__("Edit")} onClick={open} role="button">
									<span aria-label={__("Edit")} className="fas fa-pencil-alt fa-fw" />
								</button>
							</Tooltip>
						)}
					/>

					<Tooltip text={__("Remove")}>
						<button
							className="qubely-button"
							aria-label={__("Remove")}
							onClick={() => setAttributes({ [attr]: {} })}
							role="button"
						>
							<span aria-label={__("Close")} className="far fa-trash-alt fa-fw" />
						</button>
					</Tooltip>
				</div>
			);
		};

		let validImageA = false,
			validImageB = false;

		if (image.url || image2x.url) {
			validImageA = true;
		}
		if (image2.url || image2_2x.url) {
			validImageB = true;
		}

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={""} opened={true}>
								<Toggle
									label={__("Enable Text")}
									value={disableTitle}
									onChange={(val) => setAttributes({ disableTitle: val })}
								/>
								{disableTitle && (
									<Fragment>
										<Color
											label={__("Text Color")}
											value={titleColor}
											onChange={(value) => setAttributes({ titleColor: value })}
										/>
										<Typography
											label={__("Typography")}
											value={typography}
											onChange={(value) => setAttributes({ typography: value })}
											disableLineHeight
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<RadioAdvanced
											label={__("Vertical Align")}
											options={[
												{ label: __("Top"), value: "top", title: "top" },
												{ label: __("Bottom"), value: "bottom", title: "Bottom" },
											]}
											value={verticalAlign}
											onChange={(verticalAlign) => setAttributes({ verticalAlign })}
										/>
									</Fragment>
								)}

								<Range
									label={__("Vertical Offset")}
									value={verticalOffset}
									min={0}
									max={100}
									onChange={(value) => setAttributes({ verticalOffset: value })}
									unit={["px", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>

								<Range
									label={__("Horizontal Offset")}
									value={horizontalOffset}
									min={0}
									max={100}
									onChange={(value) => setAttributes({ horizontalOffset: value })}
									unit={["px", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>

								<Color
									label={__("Slider Color")}
									value={controlColor}
									onChange={(value) => setAttributes({ controlColor: value })}
								/>
							</PanelBody>
							<PanelBody title={__("Retina Images")} initialOpen={false}>
								<Media
									panel
									value={image2_2x}
									multiple={false}
									label={__("@2x Image 1 (Left Image)")}
									type={["image"]}
									onChange={(val) => setAttributes({ image2_2x: val })}
								/>
								<Media
									panel
									value={image2x}
									multiple={false}
									label={__("@2x Image 2 (Right Image)")}
									type={["image"]}
									onChange={(val) => setAttributes({ image2x: val })}
								/>
							</PanelBody>
						</InspectorTab>
						<InspectorTab key={"advance"}>
							{animationSettings(uniqueId, animation, setAttributes)}
							{interactionSettings(uniqueId, interaction, setAttributes)}
						</InspectorTab>
					</InspectorTabs>
				</InspectorControls>

				<BlockControls>
					<Toolbar
						className="components-dropdown components-dropdown-menu components-toolbar-group"
						label={__("Image Comparison Options", "qubely")}
					>
						<InlineToolbar
							data={[{ name: "InlineSpacer", key: "spacer", responsive: true, unit: ["px", "em", "%"] }]}
							{...this.props}
							prevState={this.state}
						/>
					</Toolbar>
				</BlockControls>

				{globalSettingsPanel({
					enablePosition,
					selectPosition,
					positionXaxis,
					positionYaxis,
					globalZindex,
					hideDesktop,
					hideTablet,
					hideMobile,
					globalCss,
					setAttributes
				})}

				<div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ""}`}>
					<div
						className={classnames("qubely-block-image-comparison", {
							"has-child-placeholder": !validImageA || !validImageB,
						})}
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						<div
							className={classnames("image-container image-B", {
								["valid-images resizable-img"]: validImageA && validImageB,
								"is-placeholder": !validImageB,
							})}
						>
							{validImageB ? (
								<div className={"image-container-inner"}>
									<img
										className="qubely-image"
										src={image2.url}
										{...(image2_2x.url
											? { srcset: image2.url + " 1x, " + image2_2x.url + " 2x" }
											: {})}
										alt={imgAlt2 && imgAlt2}
									/>
									{disableTitle && (
										<RichText
											value={imageBTitle}
											keepPlaceholderOnFocus
											placeholder={__("Modified")}
											className={
												"comparison-image-text " + "text-vertical-align-" + verticalAlign
											}
											onChange={(value) => setAttributes({ imageBTitle: value })}
										/>
									)}
									{actionButtons(image2.id, "image2")}
								</div>
							) : (
								renderPlaceholder("B", "Image One")
							)}
						</div>

						<div
							className={classnames("image-container image-A", {
								["valid-images"]: validImageA && validImageB,
								"is-placeholder": !validImageA,
							})}
						>
							{validImageA ? (
								<div className={"image-container-inner"}>
									{
										<img
											className="qubely-image"
											src={image.url}
											{...(image2x.url
												? { srcset: image.url + " 1x, " + image2x.url + " 2x" }
												: {})}
											alt={imgAlt && imgAlt}
										/>
									}
									{disableTitle && (
										<RichText
											value={imageATitle}
											keepPlaceholderOnFocus
											placeholder={__("Original")}
											className={
												"comparison-image-text " + "text-vertical-align-" + verticalAlign
											}
											onChange={(value) => setAttributes({ imageATitle: value })}
										/>
									)}
									{actionButtons(image.id, "image")}
								</div>
							) : (
								renderPlaceholder("A", "Image Two")
							)}
						</div>
						{validImageA && validImageB && (
							<span className="comparison-scrollCircle" onMouseDown={(event) => this.dragFunc(event)} />
						)}
					</div>

					<div ref={this.qubelyContextMenu} className={`qubely-context-menu-wraper`}>
						<ContextMenu
							name={name}
							clientId={clientId}
							attributes={attributes}
							setAttributes={setAttributes}
							qubelyContextMenu={this.qubelyContextMenu.current}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default withCSSGenerator()(Edit);
