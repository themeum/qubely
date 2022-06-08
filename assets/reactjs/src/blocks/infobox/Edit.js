const { __ } = wp.i18n;
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, SelectControl, TextControl, Toolbar } = wp.components;
const { RichText, InspectorControls, BlockControls } = wp.blockEditor;
const {
	QubelyButtonEdit,
	ButtonGroup,
	Url,
	Media,
	Tabs,
	Tab,
	Range,
	BoxShadow,
	ContextMenu: { ContextMenu, handleContextMenu },
	RadioAdvanced,
	Typography,
	Toggle,
	Styles,
	Alignment,
	IconList,
	ColorAdvanced,
	Color,
	Headings,
	Border,
	BorderRadius,
	Padding,
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	Inline: { InlineToolbar },
	QubelyButton: { buttonSettings },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
} = wp.qubelyComponents;
import icons from "../../helpers/icons";
import svg from "../heading/separators";
class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: "md",
			selector: true,
			spacer: true,
			openPanelSetting: "",
		};
		this.qubelyContextMenu = createRef();
	}

	handlePanelOpenings = (panelName) => {
		this.setState({ ...this.state, openPanelSetting: panelName });
	};

	render() {
		const {
			uniqueId,
			className,
			layout,
			recreateStyles,
			mediaType,
			alignment,
			titleLevel,
			title,
			titleTypography,
			titleColor,
			titleColorHover,
			titleSpacing,

			subTitle,
			subTitleLevel,
			subTitleContent,
			subTitleTypography,
			subTitleColor,
			subTitleColorHover,
			subTitleSpacing,

			separatorStyle,
			separatorColor,
			separatorColorHover,
			separatorStroke,
			separatorPosition,
			separatorWidth,
			separatorSpacing,

			//content
			enableContent,
			content,
			contentTypography,
			contentColor,
			contentColorHover,
			contentPadding,
			contentSpacing,

			iconName,
			iconSize,
			iconSizeCustom,
			iconColor,
			iconHoverColor,
			useMediaBg,
			mediaBg,
			mediaBgHover,
			mediaBorderRadius,
			mediaBackgroundSize,
			mediaBorder,
			mediaBorderColorHover,
			mediaShadow,
			mediaShadowHover,
			mediaSpacing,

			image,
			image2x,
			imgAlt,
			imageType,
			imageSize,
			imageWidth,
			imageHeight,
			imageCustomHeight,
			externalImageUrl,

			number,
			numberColor,
			numberColorHover,
			numberTypography,

			bgColor,
			bgColorHover,
			bgBorder,
			bgBorderColorHover,
			bgPadding,
			bgBorderRadius,
			bgShadow,
			bgShadowHover,
			enableButton,

			// Button
			buttonSize,
			buttonFillType,
			buttonText,
			buttonIconName,
			buttonIconPosition,
			buttonUrl,

			animation,
			enablePosition,
			selectPosition,
			positionXaxis,
			positionYaxis,
			globalZindex,
			hideDesktop,
			hideTablet,
			hideMobile,
			globalCss,
			interaction,
		} = this.props.attributes;

		const { name, clientId, attributes, isSelected, setAttributes } = this.props;
		const { openPanelSetting, device } = this.state;
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

		const titleTagName = "h" + titleLevel;
		const subTitleTagName = "h" + subTitleLevel;

		const renderSeparators = (
			<Fragment>
				{separatorStyle && (
					<Fragment>
						{separators[separatorStyle].type == "css" && (
							<span className={`qubely-separator-type-css qubely-separator-${separatorStyle}`}></span>
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

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("Layout")} initialOpen={true}>
								<Styles
									value={layout}
									onChange={(val) => setAttributes({ layout: val })}
									options={[
										{ value: 1, svg: icons.infobox_1, label: __("Layout 1") },
										{ value: 2, svg: icons.infobox_2, label: __("Layout 2") },
										{ value: 3, svg: icons.infobox_3, label: __("Layout 3") },
										{ value: 4, svg: icons.infobox_4, label: __("Layout 4") },
									]}
								/>
								{(layout == 1 || layout == 4) && (
									<Alignment
										label={__("Alignment")}
										value={alignment}
										alignmentType="content"
										onChange={(val) => setAttributes({ alignment: val })}
										disableJustify
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}
							</PanelBody>

							{layout != 4 && (
								<PanelBody
									title={__("Media")}
									opened={"Media" === openPanelSetting}
									onToggle={() =>
										this.handlePanelOpenings(openPanelSetting !== "Media" ? "Media" : "")
									}
								>
									<RadioAdvanced
										label={__("Type")}
										value={mediaType}
										options={[
											{ label: __("Icon"), value: "icon", title: __("Icon") },
											{ label: __("Image"), value: "image", title: __("Image") },
											{ label: __("Number"), value: "number", title: __("Number") },
										]}
										onChange={(val) =>
											setAttributes({ mediaType: val, recreateStyles: !recreateStyles })
										}
									/>
									{mediaType && (
										<Fragment>
											{mediaType == "icon" && (
												<Fragment>
													<IconList
														label={__("Icon")}
														value={iconName}
														onChange={(val) => setAttributes({ iconName: val })}
														disableToggle
													/>
													<RadioAdvanced
														label={__("Icon Size")}
														value={iconSize}
														onChange={(value) => setAttributes({ iconSize: value })}
														options={[
															{ label: "S", value: "36px", title: "Small" },
															{ label: "M", value: "64px", title: "Medium" },
															{ label: "L", value: "128px", title: "Large" },
															{ icon: "fas fa-cog", value: "custom", title: "Custom" },
														]}
													/>
													{iconSize == "custom" && (
														<Range
															label={__("Custom Size")}
															value={iconSizeCustom}
															onChange={(val) => setAttributes({ iconSizeCustom: val })}
															min={12}
															max={300}
															unit={["px", "em", "%"]}
															responsive
															device={device}
															onDeviceChange={(value) => this.setState({ device: value })}
														/>
													)}
												</Fragment>
											)}

											{mediaType == "image" && (
												<Fragment>
													<ButtonGroup
														label={__("Image Type")}
														options={[
															[__("Local"), "local"],
															[__("External"), "external"],
														]}
														value={imageType}
														onChange={(value) => setAttributes({ imageType: value })}
													/>
													{imageType === "local" ? (
														<Fragment>
															<Media
																label={__("Image")}
																multiple={false}
																type={["image"]}
																panel={true}
																value={image}
																onChange={(val) => setAttributes({ image: val })}
															/>
															<Media
																label={__("Retina Image")}
																multiple={false}
																type={["image"]}
																panel={true}
																value={image2x}
																onChange={(val) => setAttributes({ image2x: val })}
															/>
														</Fragment>
													) : (
														<Url
															label={__("Image Source")}
															disableAdvanced
															value={externalImageUrl}
															onChange={(newUrl) =>
																setAttributes({ externalImageUrl: newUrl })
															}
														/>
													)}
													<TextControl
														label={__("Alt Text")}
														value={imgAlt}
														onChange={(val) => setAttributes({ imgAlt: val })}
													/>

													<RadioAdvanced
														label={__("Size")}
														value={imageSize}
														onChange={(value) =>
															setAttributes({
																imageSize: value,
																recreateStyles: !recreateStyles,
															})
														}
														options={[
															{ label: __("Auto"), value: "auto", title: __("Auto") },
															{ label: __("S"), value: "100px", title: __("Small") },
															{ label: __("M"), value: "300px", title: __("Medium") },
															{ label: __("L"), value: "500px", title: __("Large") },
															{
																icon: "fas fa-cog",
																value: "custom",
																title: __("Custom"),
															},
														]}
													/>
													{imageSize == "custom" && (
														<Fragment>
															<Range
																label={__("Image Width")}
																value={imageWidth}
																onChange={(val) => setAttributes({ imageWidth: val })}
																min={0}
																max={2000}
																unit={["px", "em", "%"]}
																responsive
																device={device}
																onDeviceChange={(value) =>
																	this.setState({ device: value })
																}
															/>
														</Fragment>
													)}
													<RadioAdvanced
														label={__("Image Height")}
														value={imageHeight}
														onChange={(value) =>
															setAttributes({
																imageHeight: value,
																recreateStyles: !recreateStyles,
															})
														}
														options={[
															{ label: __("Auto"), value: "auto", title: __("Auto") },
															{
																label: __("Custom"),
																value: "custom",
																title: __("Custom"),
															},
														]}
													/>
													{imageHeight == "custom" && (
														<Fragment>
															<Range
																label={__("Custom Height")}
																value={imageCustomHeight}
																onChange={(val) =>
																	setAttributes({ imageCustomHeight: val })
																}
																min={10}
																max={1920}
																responsive
																unit={["px", "em", "%"]}
																device={device}
																onDeviceChange={(value) =>
																	this.setState({ device: value })
																}
															/>
														</Fragment>
													)}
												</Fragment>
											)}

											{mediaType == "number" && (
												<Fragment>
													<TextControl
														label={__("Number")}
														type="number"
														value={number}
														onChange={(val) => setAttributes({ number: parseInt(val) })}
													/>
													<Typography
														value={numberTypography}
														onChange={(value) => setAttributes({ numberTypography: value })}
														disableLineHeight
														device={device}
														onDeviceChange={(value) => this.setState({ device: value })}
													/>
												</Fragment>
											)}

											{mediaType != "image" && (
												<Fragment>
													<Toggle
														label={__("Use Background")}
														value={useMediaBg}
														onChange={(val) => setAttributes({ useMediaBg: val })}
													/>
													{useMediaBg == 1 && (
														<Range
															label={__("Background Size")}
															value={mediaBackgroundSize}
															onChange={(val) =>
																setAttributes({ mediaBackgroundSize: val })
															}
															min={0}
															max={200}
															unit={["px", "em", "%"]}
															responsive
															device={device}
															onDeviceChange={(value) => this.setState({ device: value })}
														/>
													)}
													<Tabs>
														<Tab tabTitle={__("Normal")}>
															{mediaType == "icon" && (
																<Color
																	label={__("Color")}
																	value={iconColor}
																	onChange={(val) =>
																		setAttributes({ iconColor: val })
																	}
																/>
															)}
															{mediaType == "number" && (
																<Color
																	label={__("Color")}
																	value={numberColor}
																	onChange={(value) =>
																		setAttributes({ numberColor: value })
																	}
																/>
															)}
															{useMediaBg == 1 && (
																<Fragment>
																	<ColorAdvanced
																		label={__("Background Color")}
																		value={mediaBg}
																		onChange={(val) =>
																			setAttributes({ mediaBg: val })
																		}
																	/>
																	<Border
																		label={__("Border")}
																		value={mediaBorder}
																		onChange={(val) =>
																			setAttributes({ mediaBorder: val })
																		}
																		min={0}
																		max={10}
																		unit={["px", "em", "%"]}
																		responsive
																		device={device}
																		onDeviceChange={(value) =>
																			this.setState({ device: value })
																		}
																	/>
																	<BoxShadow
																		label={__("Box-Shadow")}
																		value={mediaShadow}
																		onChange={(value) =>
																			setAttributes({ mediaShadow: value })
																		}
																	/>
																</Fragment>
															)}
														</Tab>
														<Tab tabTitle={__("Hover")}>
															{mediaType == "icon" && (
																<Color
																	label={__("Color")}
																	value={iconHoverColor}
																	onChange={(val) =>
																		setAttributes({ iconHoverColor: val })
																	}
																/>
															)}
															{mediaType == "number" && (
																<Color
																	label={__("Color")}
																	value={numberColorHover}
																	onChange={(value) =>
																		setAttributes({ numberColorHover: value })
																	}
																/>
															)}
															{useMediaBg == 1 && (
																<Fragment>
																	<ColorAdvanced
																		label={__("Background Color")}
																		value={mediaBgHover}
																		onChange={(val) =>
																			setAttributes({ mediaBgHover: val })
																		}
																	/>
																	<Color
																		label={__("Border Color")}
																		value={mediaBorderColorHover}
																		onChange={(value) =>
																			setAttributes({
																				mediaBorderColorHover: value,
																			})
																		}
																	/>
																	<BoxShadow
																		label={__("Box-Shadow")}
																		value={mediaShadowHover}
																		onChange={(value) =>
																			setAttributes({ mediaShadowHover: value })
																		}
																	/>
																</Fragment>
															)}
														</Tab>
													</Tabs>
												</Fragment>
											)}

											<BorderRadius
												label={__("Radius")}
												value={mediaBorderRadius}
												onChange={(val) => setAttributes({ mediaBorderRadius: val })}
												min={0}
												max={100}
												unit={["px", "em", "%"]}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
											<Range
												label={__("Spacing")}
												value={mediaSpacing}
												onChange={(val) => setAttributes({ mediaSpacing: val })}
												min={0}
												max={200}
												unit={["px", "em", "%"]}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
										</Fragment>
									)}
								</PanelBody>
							)}

							<PanelBody
								title={__("Title")}
								opened={"Title" === openPanelSetting}
								onToggle={() => this.handlePanelOpenings(openPanelSetting !== "Title" ? "Title" : "")}
							>
								<Headings
									label={__("Title Tag")}
									selectedLevel={titleLevel}
									onChange={(value) => setAttributes({ titleLevel: value })}
								/>
								<Typography
									label={__("Typography")}
									value={titleTypography}
									onChange={(value) => setAttributes({ titleTypography: value })}
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={
										<span>
											Spacing <span className="dashicons dashicons-sort" title="Y Spacing" />
										</span>
									}
									value={titleSpacing}
									onChange={(val) => setAttributes({ titleSpacing: val })}
									min={0}
									max={200}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<Color
											label={__("Color")}
											value={titleColor}
											onChange={(value) => setAttributes({ titleColor: value })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<Color
											label={__("Color")}
											value={titleColorHover}
											onChange={(value) => setAttributes({ titleColorHover: value })}
										/>
									</Tab>
								</Tabs>

								<SelectControl
									label={__("Separator")}
									value={separatorStyle}
									options={[
										{ label: "--Select--", value: "" },
										{ label: "Line", value: "solid" },
										{ label: "Line Doubled", value: "double" },
										{ label: "Dashed", value: "dashed" },
										{ label: "Dotted", value: "dotted" },
										{ label: "Pin", value: "pin" },
										{ label: "Pin Filled", value: "pin_filled" },
										{ label: "Zigzag", value: "zigzag" },
										{ label: "Zigzag Large", value: "zigzag_large" },
									]}
									onChange={(val) => setAttributes({ separatorStyle: val })}
								/>
								{separatorStyle && (
									<Fragment>
										<Tabs>
											<Tab tabTitle={__("Normal")}>
												<Color
													label={__("Separator Color")}
													value={separatorColor}
													onChange={(val) => setAttributes({ separatorColor: val })}
												/>
											</Tab>
											<Tab tabTitle={__("Hover")}>
												<Color
													label={__("Separator Color")}
													value={separatorColorHover}
													onChange={(val) => setAttributes({ separatorColorHover: val })}
												/>
											</Tab>
										</Tabs>
										{separatorStyle != "pin" && separatorStyle != "pin_filled" && (
											<Range
												label={__("Stroke")}
												value={separatorStroke}
												onChange={(val) => setAttributes({ separatorStroke: val })}
												min={1}
												max={separators[separatorStyle].stroke}
											/>
										)}
										<Range
											label={__("Width")}
											value={separatorWidth}
											onChange={(val) => setAttributes({ separatorWidth: val })}
											min={20}
											max={separators[separatorStyle].width}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Range
											label={__("Spacing")}
											value={separatorSpacing}
											onChange={(val) => setAttributes({ separatorSpacing: val })}
											min={0}
											max={100}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<SelectControl
											label="Position"
											value={separatorPosition}
											options={[
												{ label: "Top", value: "top" },
												{ label: "Bottom", value: "bottom" },
												{ label: "Left", value: "left" },
												{ label: "Right", value: "right" },
												{ label: "Left & Right", value: "leftright" },
											]}
											onChange={(val) => setAttributes({ separatorPosition: val })}
										/>
									</Fragment>
								)}
							</PanelBody>

							<PanelBody
								title={__("Sub Title")}
								opened={"Sub Title" === openPanelSetting}
								onToggle={() =>
									this.handlePanelOpenings(openPanelSetting !== "Sub Title" ? "Sub Title" : "")
								}
							>
								<Toggle
									label={__("Enable")}
									value={subTitle}
									onChange={(val) => setAttributes({ subTitle: val })}
								/>
								{subTitle == 1 && (
									<Fragment>
										<Headings
											label={__("Sub Title Tag")}
											selectedLevel={subTitleLevel}
											onChange={(value) => setAttributes({ subTitleLevel: value })}
										/>
										<Typography
											label={__("Typography")}
											value={subTitleTypography}
											onChange={(val) => setAttributes({ subTitleTypography: val })}
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Tabs>
											<Tab tabTitle={__("Normal")}>
												<Color
													label={__("Color")}
													value={subTitleColor}
													onChange={(val) => setAttributes({ subTitleColor: val })}
												/>
											</Tab>
											<Tab tabTitle={__("Hover")}>
												<Color
													label={__("Color")}
													value={subTitleColorHover}
													onChange={(val) => setAttributes({ subTitleColorHover: val })}
												/>
											</Tab>
										</Tabs>
										<Range
											label={__("Spacing")}
											value={subTitleSpacing}
											onChange={(value) => setAttributes({ subTitleSpacing: value })}
											unit={["px", "em", "%"]}
											min={0}
											max={100}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}
							</PanelBody>

							<PanelBody
								title={__("Content")}
								opened={"Content" === openPanelSetting}
								onToggle={() =>
									this.handlePanelOpenings(openPanelSetting !== "Content" ? "Content" : "")
								}
							>
								<Toggle
									label={__("Show Content")}
									value={enableContent}
									onChange={(val) => setAttributes({ enableContent: val })}
								/>
								{enableContent && (
									<Fragment>
										<Typography
											label={__("Typography")}
											value={contentTypography}
											onChange={(value) => setAttributes({ contentTypography: value })}
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Tabs>
											<Tab tabTitle={__("Normal")}>
												<Color
													label={__("Color")}
													value={contentColor}
													onChange={(value) => setAttributes({ contentColor: value })}
												/>
											</Tab>
											<Tab tabTitle={__("Hover")}>
												<Color
													label={__("Color")}
													value={contentColorHover}
													onChange={(value) => setAttributes({ contentColorHover: value })}
												/>
											</Tab>
										</Tabs>
										<Padding
											label={__("Padding")}
											value={contentPadding}
											onChange={(val) => setAttributes({ contentPadding: val })}
											min={0}
											max={200}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										{enableButton && (
											<Range
												label={__("Spacing")}
												value={contentSpacing}
												onChange={(value) => setAttributes({ contentSpacing: value })}
												unit={["px", "em", "%"]}
												min={0}
												max={100}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
										)}
									</Fragment>
								)}
							</PanelBody>

							<PanelBody title={__("Background")} initialOpen={false}>
								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<ColorAdvanced
											label={__("Background Color")}
											value={bgColor}
											onChange={(val) => setAttributes({ bgColor: val })}
										/>
										<Padding
											label={__("Padding")}
											value={bgPadding}
											onChange={(val) => setAttributes({ bgPadding: val })}
											min={0}
											max={200}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Border
											label={__("Border")}
											value={bgBorder}
											onChange={(val) => setAttributes({ bgBorder: val })}
											min={0}
											max={10}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<BoxShadow
											label={__("Box-Shadow")}
											value={bgShadow}
											onChange={(value) => setAttributes({ bgShadow: value })}
										/>
										<BorderRadius
											label={__("Radius")}
											value={bgBorderRadius}
											onChange={(value) => setAttributes({ bgBorderRadius: value })}
											min={0}
											max={100}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<ColorAdvanced
											label={__("Background Color")}
											value={bgColorHover}
											onChange={(val) => setAttributes({ bgColorHover: val })}
										/>
										<BoxShadow
											label={__("Box-Shadow")}
											value={bgShadowHover}
											onChange={(value) => setAttributes({ bgShadowHover: value })}
										/>
										<Color
											label={__("Border Color")}
											value={bgBorderColorHover}
											onChange={(value) => setAttributes({ bgBorderColorHover: value })}
										/>
									</Tab>
								</Tabs>
							</PanelBody>
							{buttonSettings(
								this.props.attributes,
								device,
								(key, value) => {
									setAttributes({ [key]: value });
								},
								(key, value) => {
									this.setState({ [key]: value });
								}
							)}
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
						label={__("Infobox Options", "qubely")}
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
						className={`qubely-block-info-box qubely-info-box-layout-${layout}`}
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						{layout != 4 && mediaType && (
							<div
								className={`qubely-info-box-media${
									useMediaBg && mediaType !== "image" ? " qubely-media-has-bg" : ""
								}`}
								onClick={() => this.handlePanelOpenings("Media")}
							>
								{mediaType == "icon" && iconName && (
									<i className={"qubely-info-box-icon " + iconName} />
								)}
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
										<div className="qubely-separator qubely-separator-before">
											{renderSeparators}
										</div>
									) : (
										""
									)}
									<div onClick={() => this.handlePanelOpenings("Title")}>
										<RichText
											key="editable"
											tagName={titleTagName}
											className="qubely-info-box-title"
											keepPlaceholderOnFocus
											placeholder={__("Add Text...")}
											onChange={(value) => setAttributes({ title: value })}
											value={title}
										/>
									</div>
									{separatorStyle != "" &&
									(separatorPosition == "right" ||
										separatorPosition == "bottom" ||
										separatorPosition == "leftright") ? (
										<div className="qubely-separator qubely-separator-after">
											{renderSeparators}
										</div>
									) : (
										""
									)}
								</div>

								{subTitle == 1 && (
									<div
										className="qubely-info-box-sub-title-container"
										onClick={() => this.handlePanelOpenings("Sub Title")}
									>
										<RichText
											key="editable"
											tagName={subTitleTagName}
											className="qubely-info-box-sub-title"
											keepPlaceholderOnFocus
											placeholder={__("Add Text...")}
											onChange={(value) => setAttributes({ subTitleContent: value })}
											value={subTitleContent}
										/>
									</div>
								)}
							</div>

							{enableContent && (
								<div
									className="qubely-info-box-content"
									onClick={() => this.handlePanelOpenings("Content")}
								>
									<RichText
										key="editable"
										tagName="div"
										className="qubely-info-box-text"
										keepPlaceholderOnFocus
										placeholder={__("Add Text...")}
										onChange={(value) => setAttributes({ content: value })}
										value={content}
									/>
								</div>
							)}
							{enableButton && (
								<QubelyButtonEdit
									enableButton={enableButton}
									buttonFillType={buttonFillType}
									buttonSize={buttonSize}
									buttonText={buttonText}
									buttonIconName={buttonIconName}
									buttonIconPosition={buttonIconPosition}
									buttonUrl={buttonUrl}
									onTextChange={(value) => setAttributes({ buttonText: value })}
								/>
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
				</div>
			</Fragment>
		);
	}
}
export default withCSSGenerator()(Edit);
