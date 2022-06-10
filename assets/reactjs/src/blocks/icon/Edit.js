import InspectorTab from "../../components/InspectorTab";

const { __ } = wp.i18n;
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, Toolbar } = wp.components;
const { InspectorControls, BlockControls } = wp.blockEditor;
const {
	Color,
	IconList,
	Styles,
	ColorAdvanced,
	Range,
	RadioAdvanced,
	Url,
	BoxShadow,
	Alignment,
	Tabs,
	Tab,
	Border,
	BorderRadius,
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	Inline: { InlineToolbar },
	ContextMenu: { ContextMenu, handleContextMenu },
	withCSSGenerator,
	InspectorTabs,
	inspectorTab,
} = wp.qubelyComponents;

import icons from "../../helpers/icons";

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			device: "md",
			spacer: true,
		};
		this.qubelyContextMenu = createRef();
	}

	changeIconStyle = (newStyle) => {
		const {
			setAttributes,
			attributes: { border, iconStyle },
		} = this.props;
		let newBorder = JSON.parse(JSON.stringify(border));
		if (newStyle == "outline") {
			newBorder.widthType = border.widthType ? border.widthType : "global";
			newBorder.global = border.global ? border.global : { md: "1", sm: "1", xs: "1" };
			newBorder.type = border.type ? border.type : "solid";
			newBorder.unit = border.unit ? border.unit : "px";
			newBorder.openBorder = border.openBorder ? border.openBorder : 1;
		}
		if (newStyle == "fill") {
			newBorder.type = iconStyle == "fill" ? border.type : "";
			newBorder.openBorder = iconStyle == "fill" ? border.openBorder : 0;
		}

		setAttributes({ iconStyle: newStyle, border: newBorder });
	};
	render() {
		const {
			clientId,
			isSelected,
			attributes,
			setAttributes,
			attributes: {
				uniqueId,
				className,
				name,
				url,
				alignment,

				iconSize,
				iconSizeCustom,
				iconBorderRadius,
				iconBackgroundSize,
				iconColor,
				iconHoverColor,

				bgColor,
				bgHoverColor,
				border,
				borderHoverColor,
				iconShadow,
				iconHoverShadow,
				iconStyle,

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
			},
		} = this.props;

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title="">
								<Styles
									value={iconStyle}
									columns={3}
									onChange={(val) => this.changeIconStyle(val)}
									options={[
										{ value: "nofill", svg: icons.icon_classic, label: __("Classic") },
										{ value: "fill", svg: icons.icon_fill, label: __("Fill") },
										{ value: "outline", svg: icons.icon_line, label: __("Outline") },
									]}
								/>
								<Alignment
									label={__("Alignment")}
									value={alignment}
									onChange={(val) => setAttributes({ alignment: val })}
									alignmentType="content"
									disableJustify
									responsive
									device={this.state.device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody title={__("Icon")} initialOpen={false}>
								<IconList value={name} onChange={(val) => setAttributes({ name: val })} />
								<RadioAdvanced
									label={__("Icon Size")}
									options={[
										{ label: "S", value: "36px", title: "Small" },
										{ label: "M", value: "64px", title: "Medium" },
										{ label: "L", value: "128px", title: "Large" },
										{ icon: "fas fa-cog", value: "custom", title: "Custom" },
									]}
									value={iconSize}
									onChange={(value) => setAttributes({ iconSize: value })}
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
										device={this.state.device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}
								<Url label={__("Url")} value={url} onChange={(val) => setAttributes({ url: val })} />
								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<Color
											label={__("Color")}
											value={iconColor}
											onChange={(val) => setAttributes({ iconColor: val })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<Color
											label={__("Color")}
											value={iconHoverColor}
											onChange={(val) => setAttributes({ iconHoverColor: val })}
										/>
									</Tab>
								</Tabs>
							</PanelBody>

							{iconStyle != "nofill" && (
								<PanelBody title={__("Background")} initialOpen={false}>
									<Tabs>
										<Tab tabTitle={__("Normal")}>
											{iconStyle == "fill" && (
												<ColorAdvanced
													label={__("Background Color")}
													value={bgColor}
													onChange={(val) => setAttributes({ bgColor: val })}
												/>
											)}
											<Border
												label={__("Border")}
												value={border}
												unit={["px", "em"]}
												responsive
												min={0}
												max={10}
												onChange={(val) => setAttributes({ border: val })}
												device={this.state.device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
										</Tab>
										<Tab tabTitle={__("Hover")}>
											<ColorAdvanced
												label={__("Background Color")}
												value={bgHoverColor}
												onChange={(val) => setAttributes({ bgHoverColor: val })}
											/>
											{border.type && (
												<Color
													label={__("Border Color")}
													value={borderHoverColor}
													onChange={(val) => setAttributes({ borderHoverColor: val })}
												/>
											)}
										</Tab>
									</Tabs>

									<Range
										label={__("Background Size")}
										value={iconBackgroundSize}
										min={0}
										max={200}
										unit={["px", "em", "%"]}
										responsive
										device={this.state.device}
										onDeviceChange={(value) => this.setState({ device: value })}
										onChange={(val) => setAttributes({ iconBackgroundSize: val })}
									/>
									<BorderRadius
										label={__("Border Radius")}
										value={iconBorderRadius}
										min={0}
										max={100}
										unit={["px", "em", "%"]}
										responsive
										device={this.state.device}
										onChange={(val) => setAttributes({ iconBorderRadius: val })}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								</PanelBody>
							)}

							{iconStyle != "nofill" && (
								<PanelBody title={__("Shadow")} initialOpen={false}>
									<Tabs>
										<Tab tabTitle={__("Normal")}>
											<BoxShadow
												label={__("Box-shadow")}
												value={iconShadow}
												onChange={(val) => setAttributes({ iconShadow: val })}
											/>
										</Tab>
										<Tab tabTitle={__("Hover")}>
											<BoxShadow
												label={__("Box-shadow")}
												value={iconHoverShadow}
												onChange={(val) => setAttributes({ iconHoverShadow: val })}
											/>
										</Tab>
									</Tabs>
								</PanelBody>
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
						label={__("Icon Options", "qubely")}
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
						className="qubely-block-icon-wrapper"
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						<div className="qubely-block-icon">
							<i className={name} />
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
