const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component, Fragment } = wp.element;
const { PanelBody, SelectControl, Button } = wp.components;
const { InspectorControls, InnerBlocks, RichText } = wp.blockEditor;
const {
	Styles,
	ColorAdvanced,
	Range,
	Typography,
	BoxShadow,
	RadioAdvanced,
	Tabs,
	Tab,
	Color,
	Toggle,
	Padding,
	Border,
	BorderRadius,
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
} = wp.qubelyComponents;
import icons from "../../../helpers/icons";

class AccordionItemBlockEdit extends Component {
	constructor() {
		super(...arguments);
		this.findParentAccordion = this.findParentAccordion.bind(this);
		this.state = { device: "md" };
	}

	findParentAccordion(rootBlock) {
		const { block } = this.props;
		let result = false;
		if (rootBlock.innerBlocks && rootBlock.innerBlocks.length) {
			rootBlock.innerBlocks.forEach((item) => {
				if (!result && item.clientId === block.clientId) {
					result = rootBlock;
				} else if (!result) {
					result = this.findParentAccordion(item);
				}
			});
		}
		return result;
	}

	setGlobalSettings(type, val) {
		const { updateBlockAttributes } = this.props;
		const parentAccordion = this.findParentAccordion(this.props.rootBlock);
		if (parentAccordion.innerBlocks && parentAccordion.innerBlocks.length) {
			parentAccordion.innerBlocks.forEach((item) => {
				updateBlockAttributes(item.clientId, { [type]: val });
			});
		}
	}

	updateRootBlock(type, val) {
		const { updateBlockAttributes } = this.props;
		const parentAccordion = this.findParentAccordion(this.props.rootBlock);
		updateBlockAttributes(parentAccordion.clientId, { [type]: val });
	}

	updateItemNumber(index) {
		const { updateBlockAttributes } = this.props;
		const parentAccordion = this.findParentAccordion(this.props.rootBlock);
		while (index < parentAccordion.innerBlocks.length) {
			updateBlockAttributes(parentAccordion.innerBlocks[index].clientId, {
				itemNumber: parentAccordion.innerBlocks[index].attributes.itemNumber - 1,
			});
			index++;
		}
	}

	_onClickLabel() {
		const { clientId, rootBlock, attributes, setAttributes, updateBlockAttributes } = this.props;
		const parentAccordion = this.findParentAccordion(this.props.rootBlock);
		const { itemToggle } = rootBlock.attributes;
		if (itemToggle) {
			parentAccordion.innerBlocks.forEach((item) => {
				const val = item.clientId != clientId ? false : !attributes.active;
				updateBlockAttributes(item.clientId, { active: val });
			});
		} else {
			setAttributes({ active: !attributes.active });
		}
	}

	render() {
		const { rootBlock, attributes, setAttributes, isSelected, isSelectedBlockInRoot } = this.props;
		const {
			uniqueId,
			className,
			itemNumber,
			defaultText,
			fillType,
			heading,
			panelColor,
			panelColorActive,
			iconColor,
			iconColorActive,
			panelColorActive2,
			panelBg,
			panelBgActive,
			active,
			panelIcon,
			typography,
			bodyBoxShadow,
			spacing,
			spacingBorder,
			spacingBorderColor,
			panelPadding,
			iconSize,
			customIconSize,
			iconPosition,
			borderRadius,
			bodyBg,
			bodyPadding,
			bodyPaddingAlt,
			iconSpacing,
			openFirstItem,
			richSnippet,
			panelBorder,
			panelBorderColorActive,
			panelBorderRadius,
			panelBorderRadiusActive,
			panelBoxShadow,
			panelBoxShadowActive,
			bodyBorder,
		} = attributes;
		const { itemToggle } = rootBlock.attributes;
		const { device } = this.state;

		return (
			<Fragment>
				<InspectorControls>
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("")}>
								<Styles
									value={fillType}
									onChange={(val) => this.setGlobalSettings("fillType", val)}
									options={[
										{ value: "fill", svg: icons.accordion_fill, label: __("Fill") },
										{ value: "nofill", svg: icons.accordion_classic, label: __("Classic") },
									]}
								/>
								<Toggle
									label={__("Toggle")}
									value={itemToggle}
									onChange={(val) => this.updateRootBlock("itemToggle", val)}
								/>
								<Toggle
									label={__("Open First Item")}
									value={openFirstItem}
									onChange={(val) => this.setGlobalSettings("openFirstItem", val)}
								/>
								<Toggle
									label={__("Rich Snippet")}
									value={richSnippet}
									onChange={(val) => this.setGlobalSettings("richSnippet", val)}
								/>
							</PanelBody>

							<PanelBody title={__("Panel")} initialOpen={false}>
								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<Color
											label={__("Color")}
											value={panelColor}
											onChange={(val) => this.setGlobalSettings("panelColor", val)}
										/>
										{fillType == "fill" && (
											<Fragment>
												<ColorAdvanced
													label={__("Background")}
													value={panelBg}
													onChange={(val) => this.setGlobalSettings("panelBg", val)}
												/>
												<Border
													label={__("Border")}
													value={panelBorder}
													onChange={(val) => this.setGlobalSettings("panelBorder", val)}
													unit={["px", "em", "%"]}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
												<BoxShadow
													label={__("Box-Shadow")}
													value={panelBoxShadow}
													onChange={(value) =>
														this.setGlobalSettings("panelBoxShadow", value)
													}
													disableInset
												/>
												<BorderRadius
													label={__("Radius")}
													value={panelBorderRadius}
													onChange={(value) =>
														this.setGlobalSettings("panelBorderRadius", value)
													}
													unit={["px", "em", "%"]}
													max={100}
													min={0}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}
									</Tab>
									<Tab tabTitle={__("Active")}>
										<Color
											label={__("Color")}
											value={fillType == "fill" ? panelColorActive : panelColorActive2}
											onChange={(val) =>
												fillType == "fill"
													? this.setGlobalSettings("panelColorActive", val)
													: this.setGlobalSettings("panelColorActive2", val)
											}
										/>
										{fillType == "fill" && (
											<Fragment>
												<ColorAdvanced
													label={__("Background")}
													value={panelBgActive}
													onChange={(val) => this.setGlobalSettings("panelBgActive", val)}
												/>
												<Color
													label={__("Border Color")}
													value={panelBorderColorActive}
													onChange={(val) =>
														this.setGlobalSettings("panelBorderColorActive", val)
													}
												/>
												<BoxShadow
													label={__("Box-Shadow")}
													value={panelBoxShadowActive}
													onChange={(value) =>
														this.setGlobalSettings("panelBoxShadowActive", value)
													}
													disableInset
												/>
												<BorderRadius
													label={__("Radius")}
													value={panelBorderRadiusActive}
													onChange={(value) =>
														this.setGlobalSettings("panelBorderRadiusActive", value)
													}
													unit={["px", "em", "%"]}
													max={100}
													min={0}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}
									</Tab>
								</Tabs>

								{fillType == "fill" && (
									<Padding
										label={__("Padding")}
										value={panelPadding}
										onChange={(value) => this.setGlobalSettings("panelPadding", value)}
										unit={["px", "em", "%"]}
										max={100}
										min={0}
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}
								<Typography
									label={__("Typography")}
									value={typography}
									onChange={(val) => this.setGlobalSettings("typography", val)}
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody title={__("Panel Icon")} initialOpen={false}>
								<SelectControl
									label="Select Icon"
									value={panelIcon}
									options={[
										{ label: "None", value: "" },
										{ label: "Plus", value: "fa fa-plus" },
										{ label: "Plus Circle", value: "fa fa-plus-circle" },
										{ label: "Plus Square", value: "fa fa-plus-square" },
										{ label: "Arrow Circle Right", value: "fa fa-arrow-circle-right" },
										{ label: "Angle Right", value: "fa fa-angle-right" },
										{ label: "Angle Double Right", value: "fa fa-angle-double-right" },
										{ label: "Chevron Right", value: "fa fa-chevron-right" },
										{ label: "Chevron Rircle Right", value: "fa fa-chevron-circle-right" },
										{ label: "Caret Right", value: "fa fa-caret-right" },
									]}
									onChange={(val) => this.setGlobalSettings("panelIcon", val)}
								/>
								{panelIcon && (
									<Fragment>
										<RadioAdvanced
											label={__("Size")}
											options={[
												{ label: "S", value: "14px", title: __("Small") },
												{ label: "M", value: "22px", title: __("Medium") },
												{ label: "L", value: "30px", title: __("Large") },
												{ icon: "fas fa-cog", value: "custom", title: __("Custom") },
											]}
											value={iconSize}
											onChange={(val) => this.setGlobalSettings("iconSize", val)}
										/>
										{iconSize == "custom" && (
											<Range
												value={customIconSize}
												onChange={(val) => this.setGlobalSettings("customIconSize", val)}
												min={0}
												max={100}
												unit={["px", "em", "%"]}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
										)}
										<RadioAdvanced
											label={__("Position")}
											options={[
												{ label: "Left", value: "left" },
												{ label: "Right", value: "right" },
											]}
											value={iconPosition}
											onChange={(val) => this.setGlobalSettings("iconPosition", val)}
										/>

										<Range
											label={__("Spacing")}
											value={iconSpacing}
											onChange={(val) => this.setGlobalSettings("iconSpacing", val)}
											min={0}
											max={30}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>

										<Tabs>
											<Tab tabTitle={__("Normal")}>
												<Color
													label={__("Icon Color")}
													value={iconColor}
													onChange={(val) => this.setGlobalSettings("iconColor", val)}
												/>
											</Tab>
											<Tab tabTitle={__("Active")}>
												<Color
													label={__("Icon Color")}
													value={iconColorActive}
													onChange={(val) => this.setGlobalSettings("iconColorActive", val)}
												/>
											</Tab>
										</Tabs>
									</Fragment>
								)}
							</PanelBody>

							<PanelBody title={__("Body")} initialOpen={false}>
								<Padding
									label={__("Padding")}
									value={fillType == "fill" ? bodyPadding : bodyPaddingAlt}
									onChange={(value) =>
										this.setGlobalSettings(
											fillType == "fill" ? "bodyPadding" : "bodyPaddingAlt",
											value
										)
									}
									unit={["px", "em", "%"]}
									max={100}
									min={0}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								{fillType == "fill" && (
									<Fragment>
										<ColorAdvanced
											label={__("Background")}
											value={bodyBg}
											onChange={(val) => this.setGlobalSettings("bodyBg", val)}
										/>
										<Border
											label={__("Border")}
											value={bodyBorder}
											onChange={(val) => this.setGlobalSettings("bodyBorder", val)}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<BoxShadow
											label={__("Box-Shadow")}
											value={bodyBoxShadow}
											onChange={(value) => this.setGlobalSettings("bodyBoxShadow", value)}
											disableInset
										/>
										<BorderRadius
											label={__("Radius")}
											value={borderRadius}
											onChange={(value) => this.setGlobalSettings("borderRadius", value)}
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

							<PanelBody title={__("Separator")} initialOpen={false}>
								<Range
									label={__("Spacing")}
									value={spacing}
									onChange={(value) => this.setGlobalSettings("spacing", value)}
									unit={["px", "em", "%"]}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__("Border Width")}
									value={spacingBorder}
									onChange={(value) => this.setGlobalSettings("spacingBorder", value)}
									min={0}
									max={10}
								/>
								<Color
									label={__("Border Color")}
									value={spacingBorderColor}
									onChange={(val) => this.setGlobalSettings("spacingBorderColor", val)}
								/>
							</PanelBody>
						</InspectorTab>
						<InspectorTab key={"advance"} />
					</InspectorTabs>
				</InspectorControls>

				<div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ""}`}>
					<div
						className={`qubely-accordion-item qubely-type-${fillType} ${
							active ? `qubely-accordion-active` : ""
						}`}
					>
						<div
							className={`qubely-accordion-panel ${panelIcon && "qubely-icon-position-" + iconPosition}`}
						>
							<div className="qubely-accordion-panel-handler" onClick={() => this._onClickLabel()}>
								{panelIcon && iconPosition == "left" && (
									<span className={`qubely-accordion-icon ${panelIcon}`} />
								)}
								<RichText
									tagName="div"
									placeholder={__("Accordion label")}
									className="qubely-accordion-panel-handler-label"
									value={heading}
									onChange={(value) => setAttributes({ heading: value })}
									allowedFormats={["bold", "italic", "strikethrough"]}
									keepPlaceholderOnFocus
									onClick={() => this.updateLabel()}
								/>
								{panelIcon && iconPosition == "right" && (
									<span className={`qubely-accordion-icon ${panelIcon}`} />
								)}
							</div>

							{isSelectedBlockInRoot && (
								<Button
									onClick={() => {
										const parentAccordion = this.findParentAccordion(this.props.rootBlock);
										if (parentAccordion && parentAccordion.clientId) {
											this.updateItemNumber(itemNumber);
											this.props.removeBlock(this.props.clientId);
											if (parentAccordion.innerBlocks.length <= 1) {
												this.props.removeBlock(parentAccordion.clientId);
											}
										}
									}}
									className="qubely-accordion-item-remove-button"
								>
									<i className="fa fa-times" />
								</Button>
							)}
						</div>
						<div className="qubely-accordion-body">
							<InnerBlocks
								template={defaultText ? [["core/paragraph", { content: defaultText }]] : ""}
								templateLock={false}
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
		const { getBlockHierarchyRootClientId, getBlock, isBlockSelected, hasSelectedInnerBlock } =
			select("core/block-editor");
		return {
			block: getBlock(clientId),
			isSelectedBlockInRoot: isBlockSelected(clientId) || hasSelectedInnerBlock(clientId, true),
			rootBlock: clientId ? getBlock(getBlockHierarchyRootClientId(clientId)) : null,
		};
	}),
	withDispatch((dispatch) => {
		const { removeBlock, updateBlockAttributes } = dispatch("core/block-editor");
		return {
			removeBlock,
			updateBlockAttributes,
		};
	}),
	withCSSGenerator(),
])(AccordionItemBlockEdit);
