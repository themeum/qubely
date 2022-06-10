const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor;
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, TextControl, Toolbar } = wp.components;
const {
	Counter,
	Range,
	Alignment,
	Typography,
	Color,
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	Inline: { InlineToolbar },
	ContextMenu: { ContextMenu, handleContextMenu },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
} = wp.qubelyComponents;

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: "md",
			spacer: true,
		};
		this.qubelyContextMenu = createRef();
	}
	componentDidMount() {
		const { setAttributes, clientId, attributes: { uniqueId } } = this.props
		const _client = clientId.substr(0, 6)
		if (!uniqueId) {
			setAttributes({ uniqueId: _client });
		} 
	}
	render() {
		const {
			name,
			clientId,
			attributes,
			isSelected,
			setAttributes,
			attributes: {
				uniqueId,
				className,
				alignment,
				counterLimit,
				counterDuration,
				counterTypo,
				counterColor,
				postfix,
				prefix,
				prepostTypo,
				prepostSpacing,
				prepostColor,
				interaction,
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
			},
		} = this.props;
		const { device } = this.state;

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("Counter Settings")}>
								<TextControl
									label={__("Counter Limit")}
									type="number"
									value={counterLimit}
									onChange={(value) => {
										setAttributes({ counterLimit: value });
									}}
								/>
								{counterLimit > 0 && (
									<Fragment>
										<TextControl
											label={__("Counter Duration")}
											type="number"
											value={counterDuration}
											onChange={(value) => {
												setAttributes({ counterDuration: value });
											}}
										/>
										<Alignment
											label={__("Alignment")}
											alignmentType="content"
											value={alignment}
											onChange={(val) => setAttributes({ alignment: val })}
											disableJustify
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}
							</PanelBody>

							{counterLimit > 0 && (
								<PanelBody title={__("Counter")} initialOpen={false}>
									<Fragment>
										<Typography
											label={__("Typography")}
											value={counterTypo}
											onChange={(value) => setAttributes({ counterTypo: value })}
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>

										<Color
											label={__("Color")}
											value={counterColor}
											onChange={(val) => setAttributes({ counterColor: val })}
										/>
									</Fragment>
								</PanelBody>
							)}

							{counterLimit > 0 && (
								<PanelBody title={__("Prefix & Postfix")} initialOpen={false}>
									<TextControl
										label={__("Prefix")}
										value={prefix}
										placeholder={__("Example: $")}
										onChange={(value) => setAttributes({ prefix: value })}
									/>
									<TextControl
										label={__("Postfix")}
										value={postfix}
										placeholder={__("Example: +")}
										onChange={(value) => setAttributes({ postfix: value })}
									/>
									{(prefix || postfix) && (
										<Fragment>
											<Typography
												label={__("Typography")}
												value={prepostTypo}
												onChange={(value) => setAttributes({ prepostTypo: value })}
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
											<Range
												label={__("Spacing")}
												value={prepostSpacing}
												min={0}
												max={50}
												unit={["px", "em", "%"]}
												onChange={(value) => setAttributes({ prepostSpacing: value })}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
											<Color
												label={__("Color")}
												value={prepostColor}
												onChange={(val) => setAttributes({ prepostColor: val })}
											/>
										</Fragment>
									)}
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
						label={__("Counter Options", "qubely")}
					>
						<InlineToolbar
							data={[{ name: "InlineSpacer", key: "spacer", responsive: true }]}
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
						className="qubely-block-counter"
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						{counterLimit <= 0 && <div>Please enter counter number</div>}
						{counterDuration <= 0 && <div>Please enter counter Duration</div>}
						<div className="qubely-block-counter-content">
							{counterLimit > 0 && counterDuration > 0 && (
								<Fragment>
									{prefix && <span className="qubely-block-counter-prefix">{prefix}</span>}
									<span className="qubely-block-counter-number">
										<Counter number={counterLimit} counterDuration={counterDuration} />
									</span>
									{postfix && <span className="qubely-block-counter-postfix">{postfix}</span>}
								</Fragment>
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
