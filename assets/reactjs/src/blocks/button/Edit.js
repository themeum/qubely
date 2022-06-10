import icons from "../../helpers/icons";
import classnames from "classnames";
const { __ } = wp.i18n;
const { Fragment, Component, createRef } = wp.element;

// const { compose } = wp.compose;

// const {
// withSelect,
// withDispatch
// } = wp.data;

const { PanelBody, Toolbar } = wp.components;

const { RichText, BlockControls, InspectorControls } = wp.blockEditor;

const {
	Url,
	Tab,
	Tabs,
	Color,
	Range,
	Border,
	Select,
	Styles,
	Padding,
	IconList,
	Separator,
	Alignment,
	BoxShadow,
	Typography,
	BorderRadius,
	InspectorTab,
	InspectorTabs,
	RadioAdvanced,
	ColorAdvanced,
	withCSSGenerator,
	InspectorSections,
	Inline: { InlineToolbar },
	gloalSettings: { animationSettings, interactionSettings, globalSettingsPanel },
	ContextMenu: { ContextMenu, handleContextMenu },
} = wp.qubelyComponents;

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			device: "md",
			spacer: true,
		};
		this.qubelyContextMenu = createRef();
	}

	render() {
		const {
			name,
			clientId,
			attributes,
			// removeBlock,
			setAttributes,
			// updateBlockAttributes,
			// buttonGroupAttributes,
			attributes: {
				url,
				iconName,
				recreateStyles,
				fillType,
				uniqueId,
				textField,
				alignment,
				className,
				buttonSize,
				typography,
				buttonWidth,
				// buttonGroup,
				iconPosition,
				buttonPadding,
				// parentClientId,
				buttonWidthType,
				enableAlignment,
				disableFullWidth,
				buttonBorderRadius,
				iconGap,
				bgColor,
				iconSize,
				animation,
				interaction,
				buttonColor,
				bgHoverColor,
				buttonBorder,
				buttonShadow,
				buttonColor2,
				borderHoverColor,
				buttonHoverColor,
				buttonHoverColor2,
				enablePosition,
				selectPosition,
				positionXaxis,
				positionYaxis,
				globalZindex,
				hideDesktop,
				hideTablet,
				hideMobile,
				globalCss,
				buttonHoverShadow,
			},
		} = this.props;

		const { device } = this.state;

		const classNames = classnames({ [`qubely-block-${uniqueId}`]: uniqueId }, className);

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						className="components-dropdown components-dropdown-menu components-toolbar-group"
						label={__("Button Toolbar", "qubely")}
					>
						<InlineToolbar
							data={[
								{
									name: "InlineSpacer",
									key: "spacer",
									responsive: true,
									unit: ["px", "em", "%"],
								},
							]}
							{...this.props}
							prevState={this.state}
						/>
					</Toolbar>
				</BlockControls>

				<InspectorControls key="inspector">
					<InspectorTabs>
						<InspectorTab key="layout">
							<InspectorSections block="button" />
						</InspectorTab>
						<InspectorTab key="style">
							<PanelBody title={__("")} opened={true}>
								<Styles
									value={fillType}
									onChange={(value) => setAttributes({ fillType: value })}
									options={[
										{ value: "fill", svg: icons.btn_fill, label: __("Fill") },
										{
											value: "outline",
											svg: icons.btn_outline,
											label: __("Outline"),
										},
									]}
								/>
								<Separator />
								<Url
									label={__("Button URL")}
									value={url}
									onChange={(value) => setAttributes({ url: value })}
								/>
								{enableAlignment && (
									<Alignment
										responsive
										disableJustify
										device={device}
										value={alignment}
										label={__("Alignment")}
										alignmentType="content"
										onChange={(val) => setAttributes({ alignment: val })}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}
							</PanelBody>

							<PanelBody title={__("Size")} initialOpen={false}>
								<RadioAdvanced
									label={__("Button Size")}
									options={[
										{ label: "S", value: "small", title: "Small" },
										{ label: "M", value: "medium", title: "Medium" },
										{ label: "L", value: "large", title: "Large" },
										{ icon: "fas fa-cog", value: "custom", title: "Custom" },
									]}
									value={buttonSize}
									onChange={(value) => setAttributes({ buttonSize: value })}
								/>
								{buttonSize == "custom" && (
									<Padding
										label={__("Padding")}
										value={buttonPadding}
										onChange={(value) => setAttributes({ buttonPadding: value })}
										unit={["px", "em", "%"]}
										max={150}
										min={0}
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}
								<RadioAdvanced
									label={__("Button Width")}
									options={[
										{ label: __("Auto"), value: "auto", title: __("Auto") },
										...(!disableFullWidth && [
											{ label: __("Full"), value: "block", title: __("Full") },
										]),
										{ label: __("Fixed"), value: "fixed", title: __("Fixed") },
									]}
									value={buttonWidthType}
									onChange={(value) =>
										setAttributes({
											buttonWidthType: value,
											recreateStyles: !recreateStyles,
										})
									}
								/>
								{buttonWidthType == "fixed" && (
									<Range
										label={__("Fixed Width")}
										valInspectorTabue={buttonWidth}
										onChange={(value) => setAttributes({ buttonWidth: value })}
										unit={["px", "em", "%"]}
										min={buttonWidth.unit === "%" ? 5 : 30}
										max={buttonWidth.unit === "%" ? 100 : 800}
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}
							</PanelBody>
							<PanelBody title={__("Design")} initialOpen={false}>
								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<Color
											label={__("Text Color")}
											value={fillType == "fill" ? buttonColor : buttonColor2}
											onChange={(value) =>
												fillType == "fill"
													? setAttributes({ buttonColor: value })
													: setAttributes({ buttonColor2: value })
											}
										/>
										{fillType == "fill" && (
											<ColorAdvanced
												label={__("Background")}
												value={bgColor}
												onChange={(value) => setAttributes({ bgColor: value })}
											/>
										)}
										<Border
											label={__("Border")}
											value={buttonBorder}
											onChange={(val) => setAttributes({ buttonBorder: val })}
											min={0}
											max={10}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<BoxShadow
											label={__("Box-Shadow")}
											value={buttonShadow}
											onChange={(value) => setAttributes({ buttonShadow: value })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<Color
											label={__("Text Color")}
											value={fillType == "fill" ? buttonHoverColor : buttonHoverColor2}
											onChange={(value) =>
												fillType == "fill"
													? setAttributes({ buttonHoverColor: value })
													: setAttributes({ buttonHoverColor2: value })
											}
										/>
										<ColorAdvanced
											label={__("Background")}
											value={bgHoverColor}
											onChange={(value) => setAttributes({ bgHoverColor: value })}
										/>
										<Color
											label={__("Border Color")}
											value={borderHoverColor}
											onChange={(value) => setAttributes({ borderHoverColor: value })}
										/>
										<BoxShadow
											label={__("Box-Shadow")}
											value={buttonHoverShadow}
											onChange={(value) => setAttributes({ buttonHoverShadow: value })}
										/>
									</Tab>
								</Tabs>
								<BorderRadius
									label={__("Radius")}
									value={buttonBorderRadius}
									onChange={(value) => setAttributes({ buttonBorderRadius: value })}
									min={0}
									max={100}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody title={__("Icon")} initialOpen={false}>
								<IconList
									label={__("Icon")}
									value={iconName}
									onChange={(value) => this.props.setAttributes({ iconName: value })}
								/>
								{iconName && (
									<Fragment>
										<Select
											label={__("Position")}
											options={["left", "right"]}
											value={iconPosition}
											onChange={(value) => setAttributes({ iconPosition: value })}
										/>
										<Range
											label={__("Size")}
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
											label={__("Gap")}
											value={iconGap}
											onChange={(val) => setAttributes({ iconGap: val })}
											unit={["px", "em", "%"]}
											min={0}
											max={64}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}
							</PanelBody>
							<PanelBody title={__("Typography")} initialOpen={false}>
								<Typography
									label={__("Typography")}
									value={typography}
									onChange={(value) => setAttributes({ typography: value })}
									disableLineHeight
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>
						</InspectorTab>
						<InspectorTab key="advance">
							{animationSettings(uniqueId, animation, setAttributes)}
							{interactionSettings(uniqueId, interaction, setAttributes)}
						</InspectorTab>
					</InspectorTabs>
				</InspectorControls>

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

				<div className={classNames}>
					<div
						className="qubely-block-btn-wrapper"
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						<div className={`qubely-block-btn`}>
							<div className={`qubely-block-btn-anchor is-${buttonSize}`}>
								{iconName.trim() != "" && iconPosition == "left" && (
									<i className={`qubely-btn-icon ${iconName}`} />
								)}
								<RichText
									tagName="div"
									keepPlaceholderOnFocus
									className="qubely-button-text"
									placeholder={__("Add Text...")}
									value={textField}
									onChange={(value) => setAttributes({ textField: value })}
								/>
								{iconName.trim() != "" && iconPosition == "right" && (
									<i className={`qubely-btn-icon ${iconName}`} />
								)}
							</div>
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
// export default compose([
//   // withSelect((select, ownProps) => {
//   //     const { parentClientId } = ownProps.attributes
//   //     const { getBlockAttributes } = select('core/block-editor');
//   //     return { buttonGroupAttributes: getBlockAttributes(parentClientId) }
//   // }),
//   // withDispatch((dispatch) => {
//   //     const { removeBlock, updateBlockAttributes } = dispatch('core/block-editor');
//   //     return {
//   //         removeBlock,
//   //         updateBlockAttributes
//   //     }
//   // }),
//   withCSSGenerator(),
// ])(Edit);
export default withCSSGenerator()(Edit);
