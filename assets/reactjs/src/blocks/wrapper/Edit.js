const { __ } = wp.i18n;
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, Toolbar } = wp.components;
const { InspectorControls, BlockControls, InnerBlocks } = wp.blockEditor;
const {
	Tabs,
	Tab,
	Color,
	Border,
	Padding,
	BoxShadow,
	Background,
	BorderRadius,
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	Inline: { InlineToolbar },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
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
			setAttributes,
			isSelected,
			attributes: {
				uniqueId,
				className,
				bgColor,
				bgColorHover,
				bgShadow,
				bgShadowHover,
				bgBorderColorHover,
				padding,
				borderRadius,
				border,

				//animation
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

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("Background")} initialOpen={true}>
								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<Background
											externalImage
											value={bgColor}
											label={__("Background")}
											sources={["image", "gradient"]}
											onChange={(val) => setAttributes({ bgColor: val })}
										/>
										<Padding
											label={__("Padding")}
											value={padding}
											min={0}
											max={300}
											responsive
											device={device}
											unit={["px", "em", "%"]}
											onChange={(val) => setAttributes({ padding: val })}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Border
											label={__("Border")}
											value={border}
											onChange={(val) => setAttributes({ border: val })}
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
											value={borderRadius}
											onChange={(value) => setAttributes({ borderRadius: value })}
											min={0}
											max={100}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<Background
											label={__("Background")}
											sources={["image", "gradient"]}
											value={bgColorHover}
											onChange={(val) => setAttributes({ bgColorHover: val })}
										/>
										{border.openBorder != undefined && border.openBorder == 1 && (
											<Color
												label={__("Border Color")}
												value={bgBorderColorHover}
												onChange={(value) => setAttributes({ bgBorderColorHover: value })}
											/>
										)}
										<BoxShadow
											label={__("Box-Shadow")}
											value={bgShadowHover}
											onChange={(value) => setAttributes({ bgShadowHover: value })}
										/>
									</Tab>
								</Tabs>
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
						label={__("Wrapper Options", "qubely")}
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
						className="qubely-block-wrapper-block"
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						<InnerBlocks templateLock={false} />
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
