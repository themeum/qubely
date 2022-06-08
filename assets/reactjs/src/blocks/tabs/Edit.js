import classnames from "classnames";
import icons from "../../helpers/icons";

const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { Toolbar, Tooltip, PanelBody, RangeControl } = wp.components;

const { compose } = wp.compose;

const { withSelect, withDispatch } = wp.data;

const { Fragment, Component } = wp.element;

const { RichText, InnerBlocks, BlockControls, InspectorControls, MediaUpload } = wp.blockEditor;

const {
	Tab,
	Tabs,
	Color,
	Range,
	Toggle,
	Select,
	Border,
	Styles,
	Padding,
	IconList,
	Margin,
	Separator,
	ButtonGroup,
	BoxShadow,
	Alignment,
	Typography,
	BorderRadius,
	InspectorTab,
	InspectorTabs,
	RadioAdvanced,
	withCSSGenerator,
	ColorAdvanced,
	Inline: { InlineToolbar },
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
} = wp.qubelyComponents;

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spacer: true,
			device: "md",
			activeTab: 1,
			initialRender: true,
			showIconPicker: false,
		};
	}

	updateTitles = (value, index) => {
		const {
			attributes: { tabTitles },
			setAttributes,
		} = this.props;
		const modifiedTitles = tabTitles.map((title, thisIndex) => {
			if (index === thisIndex) {
				title = { ...title, ...value };
			}
			return title;
		});
		setAttributes({ tabTitles: modifiedTitles });
	};

	renderTabTitles = () => {
		const { activeTab, showIconPicker } = this.state;

		const {
			attributes: {
				navType,
				navLayout,
				tabTitles,
				iconPosition,
				autoSwithcing,
				showProgressBar,
				defaultDelay,
				enableImageNavTitle,
				progressbarPosition,
				imageNavTitleAlignment,
				enableImageNavDesciption,
			},
		} = this.props;

		const changeActiveTab = (index) => {
			this.setState({
				initialRender: false,
				activeTab: index + 1,
				showIconPicker: !showIconPicker,
			});
		};

		return tabTitles.map((title, index) => {
			let isActiveTab = false;
			if (activeTab === index + 1) {
				isActiveTab = true;
			}
			const wrapperClasses = classnames("qubely-tab-item", "qubely-backend", { ["qubely-active"]: isActiveTab });
			const titleClasses = classnames("qubely-tab-title", {
				[`qubely-has-icon-${iconPosition}`]: typeof title.iconName !== "undefined",
			});
			return (
				<div key={index} className={wrapperClasses}>
					<div role="button" className={titleClasses} onClick={() => changeActiveTab(index)}>
						{navType === "text" ? (
							<Fragment>
								{title.iconName && (iconPosition == "top" || iconPosition == "left") && (
									<i className={`qubely-tab-icon ${title.iconName}`} />
								)}
								{isActiveTab ? (
									<RichText
										value={title.title}
										keepPlaceholderOnFocus
										placeholder={__("Add Tab Title")}
										onChange={(value) => this.updateTitles({ title: value }, index)}
									/>
								) : (
									<div>{title.title}</div>
								)}
								{title.iconName && iconPosition == "right" && (
									<i className={`qubely-tab-icon ${title.iconName}`} />
								)}
							</Fragment>
						) : (
							<div
								className={`description-type-tab nav-layout-${navLayout} align-${imageNavTitleAlignment}`}
							>
								{navLayout !== "three" && (
									<MediaUpload
										onSelect={(val) => this.updateTitles({ avatar: val }, index)}
										allowedTypes={["image"]}
										multiple={false}
										value={title.avatar}
										render={({ open }) => (
											<Fragment>
												{title.avatar && title.avatar.url ? (
													<img
														onClick={open}
														className="qubely-tab-image"
														src={title.avatar.url}
														alt={title.avatar.alt ? title.avatar.alt : "tab-image"}
													/>
												) : (
													<div className="qubely-image-placeholder qubely-tab-title-avatar">
														<a className="qubely-insert-image" href="#" onClick={open}>
															<svg
																aria-hidden="true"
																role="img"
																focusable="false"
																className="dashicon dashicons-insert"
																xmlns="http://www.w3.org/2000/svg"
																width="20"
																height="20"
																viewBox="0 0 20 20"
															>
																<path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"></path>
															</svg>
														</a>
													</div>
												)}
											</Fragment>
										)}
									/>
								)}
								{(enableImageNavTitle || enableImageNavDesciption) && (
									<div className="qubely-tab-description">
										{enableImageNavTitle && (
											<RichText
												className="image-type-nav-title"
												value={title.title}
												keepPlaceholderOnFocus
												placeholder={__("Add Caption")}
												onChange={(value) => this.updateTitles({ title: value }, index)}
											/>
										)}
										{enableImageNavDesciption && (
											<RichText
												className="image-type-nav-description"
												value={title.description}
												keepPlaceholderOnFocus
												placeholder={__("Add description")}
												onChange={(value) => this.updateTitles({ description: value }, index)}
											/>
										)}
									</div>
								)}
							</div>
						)}
					</div>
					{autoSwithcing && showProgressBar && (
						<div className={`progress ${progressbarPosition}`} style={{ width: "100%" }} />
					)}
					<Tooltip text={__("Delete this tab")}>
						<span className="qubely-action-tab-remove" role="button" onClick={() => this.deleteTab(index)}>
							<i className="fas fa-times" />
						</span>
					</Tooltip>
				</div>
			);
		});
	};

	deleteTab = (tabIndex) => {
		const { activeTab } = this.state;
		const {
			block,
			clientId,
			setAttributes,
			replaceInnerBlocks,
			updateBlockAttributes,
			attributes: { tabs, tabTitles },
		} = this.props;

		const newItems = tabTitles.filter((item, index) => index != tabIndex);
		let i = tabIndex + 1;

		setAttributes({
			tabTitles: newItems,
			tabs: tabs - 1,
		});

		while (i < tabs) {
			updateBlockAttributes(
				block.innerBlocks[i].clientId,
				Object.assign(block.innerBlocks[i].attributes, {
					id: block.innerBlocks[i].attributes.id - 1,
				})
			);
			i++;
		}

		let innerBlocks = JSON.parse(JSON.stringify(block.innerBlocks));
		innerBlocks.splice(tabIndex, 1);

		replaceInnerBlocks(clientId, innerBlocks, false);

		this.setState((state) => {
			let newActiveTab = state.activeTab - 1;
			if (tabIndex + 1 === activeTab) {
				newActiveTab = tabIndex == 0 ? 1 : tabIndex + 1 < tabs ? tabIndex + 1 : tabIndex;
			}
			return {
				activeTab: newActiveTab,
				initialRender: false,
			};
		});
	};

	render() {
		const {
			setAttributes,
			attributes: {
				uniqueId,
				className,
				autoSwithcing,
				delayType,
				defaultDelay,
				showProgressBar,
				progressBarBg,
				progressbarPosition,
				progressbarBottom,
				progressBarHeight,
				progressBarSpacing,
				progressBarRadius,
				reverseContent,
				recreateStyles,

				tabs,
				navType,
				enableImage,
				navImageSize,
				navImageWidth,
				navImageHeight,
				navImageBorder,
				navImageBorderRadius,
				navLayout,
				imageTypeNavSize,
				navImageTypeBorderRadius,
				imageTypeNavBG,
				imageTypeActiveNavBG,
				navBg,
				navSize,
				enableImageNavTitle,
				enableImageNavDesciption,
				imageNavTitleAlignment,
				imageNavTitleColor,
				navImageGap,
				navImageCaptionTypo,
				navImageDescriptionTypo,

				navColor,
				tabStyle,
				tabTitles,
				navSpacing,
				typography,
				navPaddingY,
				navPaddingX,
				navBgActive,
				navShadow,
				navAlignment,
				navColorActive,

				navBorder,
				navBorderActive,
				navBorderRadiusTabs,
				navBorderRadiusPills,
				navUnderlineBorderWidth,
				navUnderlineBorderColor,
				navUnderlineBorderColorActive,

				iconGap,
				iconSize,
				iconPosition,

				bodyBg,
				bodyBorder,
				bodyShadow,
				bodyPadding,
				bodyTopSpacing,
				bodyBorderRadius,
				bodySeparatorColor,
				bodySeparatorHeight,

				//animation
				animation,
				//global
				globalCss,
				hideDesktop,
				hideTablet,
				hideMobile,
				interaction,
				globalZindex,
				positionXaxis,
				positionYaxis,
				enablePosition,
				selectPosition,
			},
		} = this.props;

		const { device, activeTab } = this.state;

		const newTitles = () => {
			let newTitles = JSON.parse(JSON.stringify(tabTitles));
			newTitles[tabs] = {
				title: __(`Tab ${tabs + 1}`),
				icon: {},
			};
			return newTitles;
		};

		const addNewTab = () => {
			const { clientId, block, replaceInnerBlocks } = this.props;
			this.setState({
				activeTab: tabs + 1,
				initialRender: false,
			});
			setAttributes({
				tabs: tabs + 1,
				tabTitles: newTitles(),
			});
			let innerBlocks = JSON.parse(JSON.stringify(block.innerBlocks));
			innerBlocks.push(
				createBlock("qubely/tab", {
					id: innerBlocks.length + 1,
					customClassName: "qubely-active",
				})
			);

			replaceInnerBlocks(clientId, innerBlocks, false);
		};

		const blockWrapperClasses = classnames(
			{ [`qubely-block-${uniqueId}`]: typeof uniqueId !== "undefined" },
			{ [className]: typeof className !== "undefined" }
		);

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("Styles")} initialOpen={true}>
								<Styles
									value={tabStyle}
									onChange={(val) => setAttributes({ tabStyle: val })}
									options={[
										{ value: "tabs", svg: icons.tab_tabs, label: __("Tabs") },
										{ value: "pills", svg: icons.tab_pills, label: __("Pills") },
										{
											...(navType === "text" && {
												value: "underline",
												svg: icons.tab_underline,
												label: __("Underline"),
											}),
										},
									]}
								/>
								<Separator />
								<Toggle
									label={__("Reverse Content")}
									value={reverseContent}
									onChange={(val) =>
										setAttributes({ reverseContent: val, recreateStyles: !recreateStyles })
									}
								/>
								<Alignment
									label={__("Alignment")}
									value={navAlignment}
									alignmentType="content"
									onChange={(val) => setAttributes({ navAlignment: val })}
									disableJustify
								/>
							</PanelBody>
							<PanelBody title={__("Nav")} initialOpen={false}>
								{tabStyle !== "underline" && (
									<ButtonGroup
										label={__("Nav Type")}
										options={[
											[__("Text"), "text"],
											[__("Image"), "image"],
										]}
										value={navType}
										onChange={(value) =>
											setAttributes({ navType: value, recreateStyles: !recreateStyles })
										}
									/>
								)}
								{navType === "text" ? (
									<Fragment>
										<RadioAdvanced
											label={__("Nav Size")}
											options={[
												{ label: "S", value: "4px 12px", title: "Small" },
												{ label: "M", value: "6px 15px", title: "Medium" },
												{ label: "L", value: "10px 20px", title: "Large" },
												{ icon: "fas fa-cog", value: "custom", title: "Custom" },
											]}
											value={navSize}
											onChange={(value) => setAttributes({ navSize: value })}
										/>

										{navSize == "custom" && (
											<Fragment>
												<Range
													label={
														<span className="dashicons dashicons-sort" title="X Spacing" />
													}
													value={navPaddingY}
													onChange={(value) => setAttributes({ navPaddingY: value })}
													unit={["px", "em", "%"]}
													max={100}
													min={0}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
												<Range
													label={
														<span
															className="dashicons dashicons-leftright"
															title="Y Spacing"
														/>
													}
													value={navPaddingX}
													onChange={(value) => setAttributes({ navPaddingX: value })}
													unit={["px", "em", "%"]}
													max={100}
													min={0}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}

										{tabStyle == "tabs" && (
											<Fragment>
												<BorderRadius
													label={__("Radius")}
													value={navBorderRadiusTabs}
													onChange={(value) => setAttributes({ navBorderRadiusTabs: value })}
													min={0}
													max={100}
													unit={["px", "em", "%"]}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}
										{tabStyle == "pills" && (
											<Fragment>
												<BorderRadius
													label={__("Radius")}
													value={navBorderRadiusPills}
													onChange={(value) => setAttributes({ navBorderRadiusPills: value })}
													min={0}
													max={100}
													unit={["px", "em", "%"]}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}
										{tabStyle == "underline" && (
											<Range
												label={__("Underline Height")}
												value={navUnderlineBorderWidth}
												onChange={(value) => setAttributes({ navUnderlineBorderWidth: value })}
												min={1}
												max={10}
												unit={["px", "em", "%"]}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
										)}
										<Tabs>
											<Tab tabTitle={__("Normal")}>
												<Color
													label={__("Color")}
													value={navColor}
													onChange={(value) => setAttributes({ navColor: value })}
												/>
												{tabStyle != "underline" && (
													<Fragment>
														<Color
															label={__("Background")}
															value={navBg}
															onChange={(value) => setAttributes({ navBg: value })}
														/>
														<Border
															label={__("Border")}
															value={navBorder}
															onChange={(value) => setAttributes({ navBorder: value })}
															min={0}
															max={100}
															unit={["px", "em", "%"]}
															responsive
															device={device}
															onDeviceChange={(value) => this.setState({ device: value })}
														/>
													</Fragment>
												)}
												{tabStyle == "underline" && (
													<Fragment>
														<Color
															label={__("Line Color")}
															value={navUnderlineBorderColor}
															onChange={(value) =>
																setAttributes({ navUnderlineBorderColor: value })
															}
														/>
													</Fragment>
												)}
											</Tab>
											<Tab tabTitle={__("Active")}>
												<Color
													label={__("Color")}
													value={navColorActive}
													onChange={(value) => setAttributes({ navColorActive: value })}
												/>
												{tabStyle != "underline" && (
													<Fragment>
														<Color
															label={__("Background")}
															value={navBgActive}
															onChange={(value) => setAttributes({ navBgActive: value })}
														/>
														<Border
															label={__("Border")}
															value={navBorderActive}
															onChange={(value) =>
																setAttributes({ navBorderActive: value })
															}
															min={0}
															max={100}
															unit={["px", "em", "%"]}
															responsive
															device={device}
															onDeviceChange={(value) => this.setState({ device: value })}
														/>
													</Fragment>
												)}
												{tabStyle == "underline" && (
													<Fragment>
														<Color
															label={__("Line Color")}
															value={navUnderlineBorderColorActive}
															onChange={(value) =>
																setAttributes({ navUnderlineBorderColorActive: value })
															}
														/>
													</Fragment>
												)}
											</Tab>
										</Tabs>
										<Typography
											label={__("Typography")}
											value={typography}
											onChange={(value) => setAttributes({ typography: value })}
											disableLineHeight
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								) : (
									<Fragment>
										<Styles
											columns={3}
											value={navLayout}
											onChange={(val) =>
												setAttributes({ navLayout: val, recreateStyles: !recreateStyles })
											}
											options={[
												{ value: "one", svg: icons.infobox_1 },
												{ value: "two", svg: icons.infobox_2 },
												{ value: "three", svg: icons.infobox_4 },
											]}
										/>
										<Range
											label={__("Gap")}
											value={navSpacing}
											onChange={(value) => setAttributes({ navSpacing: value })}
											max={50}
											min={0}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Padding
											label={__("Nav Size")}
											value={imageTypeNavSize}
											onChange={(value) => setAttributes({ imageTypeNavSize: value })}
											unit={["px", "em", "%"]}
											max={100}
											min={0}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<BorderRadius
											label={__("Radius")}
											value={navImageTypeBorderRadius}
											onChange={(value) => setAttributes({ navImageTypeBorderRadius: value })}
											min={0}
											max={100}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>

										{navLayout !== "three" && (
											<Fragment>
												<Separator label={__("Image")} />
												<RadioAdvanced
													label={__("Image Size")}
													options={[
														{ label: "S", value: "64px", title: "Small" },
														{ label: "M", value: "96px", title: "Medium" },
														{ label: "L", value: "120px", title: "Large" },
														{ icon: "fas fa-cog", value: "custom", title: "Custom" },
													]}
													value={navImageSize}
													onChange={(value) =>
														setAttributes({
															navImageSize: value,
															recreateStyles: !recreateStyles,
														})
													}
												/>
												{navImageSize == "custom" && (
													<Fragment>
														<Range
															label={
																<span
																	className="dashicons dashicons-leftright"
																	title="Width"
																/>
															}
															value={navImageWidth}
															onChange={(value) =>
																setAttributes({ navImageWidth: value })
															}
															unit={["px", "em", "%"]}
															max={300}
															min={0}
															responsive
															device={device}
															onDeviceChange={(value) => this.setState({ device: value })}
														/>
														<Range
															label={
																<span
																	className="dashicons dashicons-sort"
																	title="Height"
																/>
															}
															value={navImageHeight}
															onChange={(value) =>
																setAttributes({ navImageHeight: value })
															}
															unit={["px", "em", "%"]}
															max={300}
															min={0}
															responsive
															device={device}
															onDeviceChange={(value) => this.setState({ device: value })}
														/>
													</Fragment>
												)}
												<BorderRadius
													label={__("Image Radius")}
													value={navImageBorderRadius}
													onChange={(value) => setAttributes({ navImageBorderRadius: value })}
													min={0}
													max={100}
													unit={["px", "em", "%"]}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
												<Border
													label={__("Border")}
													value={navImageBorder}
													onChange={(value) => setAttributes({ navImageBorder: value })}
													unit={["px", "em", "%"]}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}

										<Toggle
											label={__("Nav Title")}
											value={enableImageNavTitle}
											onChange={(val) => setAttributes({ enableImageNavTitle: val })}
										/>
										<Toggle
											label={__("Nav Description")}
											value={enableImageNavDesciption}
											onChange={(val) => setAttributes({ enableImageNavDesciption: val })}
										/>
										{(enableImageNavTitle || enableImageNavDesciption) && (
											<Fragment>
												<Alignment
													disableJustify
													label={__("Alignment")}
													value={imageNavTitleAlignment}
													onChange={(val) => setAttributes({ imageNavTitleAlignment: val })}
												/>
												<Color
													label={__("Color")}
													value={imageNavTitleColor}
													onChange={(value) => setAttributes({ imageNavTitleColor: value })}
												/>

												<Range
													label={__("Gap after Image")}
													value={navImageGap}
													onChange={(value) => setAttributes({ navImageGap: value })}
													unit={["px", "em", "%"]}
													max={300}
													min={0}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
												{enableImageNavTitle && (
													<Typography
														label={__("Title Typography")}
														value={navImageCaptionTypo}
														device={device}
														onChange={(value) =>
															setAttributes({ navImageCaptionTypo: value })
														}
														onDeviceChange={(value) => this.setState({ device: value })}
													/>
												)}
												{enableImageNavDesciption && (
													<Typography
														label={__("Description Typography")}
														value={navImageDescriptionTypo}
														device={device}
														onChange={(value) =>
															setAttributes({ navImageDescriptionTypo: value })
														}
														onDeviceChange={(value) => this.setState({ device: value })}
													/>
												)}
											</Fragment>
										)}
										<Tabs>
											<Tab tabTitle={__("Normal")}>
												<ColorAdvanced
													label={__("Background")}
													value={imageTypeNavBG}
													onChange={(imageTypeNavBG) => setAttributes({ imageTypeNavBG })}
												/>
											</Tab>
											<Tab tabTitle={__("Active")}>
												<ColorAdvanced
													label={__("Background")}
													value={imageTypeActiveNavBG}
													onChange={(imageTypeActiveNavBG) =>
														setAttributes({ imageTypeActiveNavBG })
													}
												/>
											</Tab>
										</Tabs>
									</Fragment>
								)}
								{tabStyle !== "underline" && (
									<BoxShadow
										label={__("Box-Shadow")}
										value={navShadow}
										onChange={(value) => setAttributes({ navShadow: value })}
									/>
								)}
							</PanelBody>
							{navType === "text" && (
								<PanelBody title={__("Icon")} initialOpen={false}>
									<IconList
										label={__("Icon")}
										value={tabTitles[activeTab - 1] && tabTitles[activeTab - 1].iconName}
										onChange={(value) => this.updateTitles({ iconName: value }, activeTab - 1)}
									/>
									<Select
										label={__("Icon Position")}
										options={[
											["left", __("Left")],
											["right", __("Right")],
											["top", __("Top")],
										]}
										value={iconPosition}
										onChange={(value) => setAttributes({ iconPosition: value })}
									/>
									<Range
										label={__("Icon Size")}
										value={iconSize}
										onChange={(value) => setAttributes({ iconSize: value })}
										unit={["px", "em", "%"]}
										min={5}
										max={48}
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
									<Range
										label={__("Icon Gap")}
										value={iconGap}
										onChange={(value) => setAttributes({ iconGap: value })}
										unit={["px", "em", "%"]}
										min={0}
										max={64}
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								</PanelBody>
							)}
							<PanelBody title={__("Body")} initialOpen={false}>
								{tabStyle == "tabs" && (
									<Fragment>
										<Color
											label={__("Background Color")}
											value={bodyBg}
											onChange={(value) => setAttributes({ bodyBg: value })}
										/>
										<Padding
											label={__("Padding")}
											value={bodyPadding}
											onChange={(value) => setAttributes({ bodyPadding: value })}
											unit={["px", "em", "%"]}
											max={100}
											min={0}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}
								{tabStyle == "underline" && (
									<Fragment>
										<Range
											label={__("Separator Height")}
											value={bodySeparatorHeight}
											onChange={(value) => setAttributes({ bodySeparatorHeight: value })}
											min={0}
											max={5}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										{bodySeparatorHeight.md > 0 && (
											<Color
												label={__("Separator Color")}
												value={bodySeparatorColor}
												onChange={(value) => setAttributes({ bodySeparatorColor: value })}
											/>
										)}
										<Separator />
									</Fragment>
								)}
								{tabStyle != "tabs" && (
									<Range
										label={__("Spacing")}
										value={bodyTopSpacing}
										onChange={(value) => setAttributes({ bodyTopSpacing: value })}
										unit={["px", "em", "%"]}
										max={100}
										min={0}
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}

								{tabStyle == "tabs" && (
									<Fragment>
										<Border
											label={__("Border")}
											separator
											value={bodyBorder}
											onChange={(value) => setAttributes({ bodyBorder: value })}
											unit={["px", "em", "%"]}
											max={100}
											min={0}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<BoxShadow
											label={__("Box-Shadow")}
											value={bodyShadow}
											onChange={(value) => setAttributes({ bodyShadow: value })}
										/>
										<BorderRadius
											label={__("Radius")}
											separator
											value={bodyBorderRadius}
											onChange={(value) => setAttributes({ bodyBorderRadius: value })}
											unit={["px", "em", "%"]}
											max={100}
											min={0}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}
							</PanelBody>
							<PanelBody title={__("Auto Switching")} initialOpen={false}>
								<Toggle
									label={__("Auto Switch Tabs")}
									value={autoSwithcing}
									onChange={(val) => setAttributes({ autoSwithcing: val })}
								/>
								{autoSwithcing && (
									<Fragment>
										<ButtonGroup
											label={__("Delay Type")}
											options={[
												[__("Common"), "common"],
												[__("Custom"), "custom"],
											]}
											value={delayType}
											onChange={(value) => setAttributes({ delayType: value })}
										/>
										{delayType === "common" ? (
											<RangeControl
												min={2}
												max={200}
												label={__("Delay")}
												value={defaultDelay}
												onChange={(defaultDelay) => setAttributes({ defaultDelay })}
											/>
										) : (
											<Fragment>
												<Separator label={__("Custom Delays")} />
												{tabTitles.map(({ title, delay }, index) => (
													<RangeControl
														min={2}
														max={200}
														label={__(title)}
														value={typeof delay === "undefined" ? defaultDelay : delay}
														onChange={(value) => this.updateTitles({ delay: value }, index)}
													/>
												))}
											</Fragment>
										)}
										<Toggle
											label={__("Show Progress Bar")}
											value={showProgressBar}
											onChange={(val) => setAttributes({ showProgressBar: val })}
										/>
									</Fragment>
								)}
								{showProgressBar && (
									<Fragment>
										<ButtonGroup
											label={__("Progressbar Position")}
											options={[
												[__("Bottom"), "bottom"],
												[__("Top"), "top"],
											]}
											value={progressbarPosition}
											onChange={(value) =>
												setAttributes({
													progressbarPosition: value,
													recreateStyles: !recreateStyles,
												})
											}
										/>
										<Range
											label={__("Position")}
											value={progressbarBottom}
											max={100}
											min={-50}
											onChange={(value) => setAttributes({ progressbarBottom: value })}
										/>
										<ColorAdvanced
											label={__("Progressbar Background")}
											value={progressBarBg}
											onChange={(val) => setAttributes({ progressBarBg: val })}
										/>
										<Range
											label={__("Height")}
											value={progressBarHeight}
											unit={["px", "em", "%"]}
											max={50}
											min={1}
											responsive
											device={device}
											onChange={(value) => setAttributes({ progressBarHeight: value })}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Range
											label={__("Spacing")}
											value={progressBarSpacing}
											unit={["px", "em", "%"]}
											max={50}
											min={0}
											responsive
											device={device}
											onChange={(value) => setAttributes({ progressBarSpacing: value })}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Range
											label={__("Radius")}
											value={progressBarRadius}
											unit={["px", "em", "%"]}
											max={100}
											min={0}
											responsive
											device={device}
											onChange={(value) => setAttributes({ progressBarRadius: value })}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}
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
						label={__("Tabs Options", "qubely")}
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

				<div className={blockWrapperClasses}>
					<div className={`qubely-block-tab qubely-tab-style-${tabStyle} qubely-active-tab-${activeTab}`}>
						<div className={`qubely-tab-nav qubely-alignment-${navAlignment}`}>
							{this.renderTabTitles()}

							<Tooltip text={__("Add new tab")}>
								<span
									role="button"
									areaLabel={__("Add new tab")}
									className="qubely-add-new-tab"
									onClick={() => addNewTab()}
								>
									<i className="fas fa-plus-circle" />
								</span>
							</Tooltip>
						</div>

						<div className={`qubely-tab-body`}>
							<InnerBlocks
								tagName="div"
								templateLock="all"
								allowedBlocks={["qubely/tab"]}
								template={Array(tabs)
									.fill(0)
									.map((_, tabIndex) => [
										"qubely/tab",
										{
											id: tabIndex + 1,
											...(tabIndex === 0 && { customClassName: "qubely-active" }),
										},
									])}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default compose([
	withSelect((select, ownProps) => {
		const { clientId } = ownProps;
		const { getBlock } = select("core/block-editor");
		return {
			block: getBlock(clientId),
		};
	}),
	withDispatch((dispatch) => {
		const { getBlocks, insertBlock, removeBlock, replaceInnerBlocks, updateBlockAttributes } =
			dispatch("core/block-editor");

		return {
			getBlocks,
			insertBlock,
			removeBlock,
			replaceInnerBlocks,
			updateBlockAttributes,
		};
	}),
	withCSSGenerator(),
])(Edit);
