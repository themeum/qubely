const { __ } = wp.i18n;
const { AlignmentToolbar, BlockControls, InspectorControls } = wp.blockEditor;
const { Component, Fragment, RawHTML, createRef } = wp.element;
const { PanelBody, SelectControl, FormTokenField, TextControl } = wp.components;
const {
	BorderRadius,
	Color,
	ColorAdvanced,
	ContextMenu: { ContextMenu, handleContextMenu },
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	HeadingToolbar,
	Typography,
	Range,
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
} = wp.qubelyComponents;

const defaultTexts = ["Demo-one", "Demo-two"];

class Edit extends Component {
	constructor(props) {
		super(props);
		this._getAnimationClass = this._getAnimationClass.bind(this);
		this._handleTypeChange = this._handleTypeChange.bind(this);
		this.state = {
			device: "md",
			animationClass: this._getAnimationClass(this.props.attributes.animationType),
		};
		this.qubelyContextMenu = createRef();
	}
	componentDidMount() {
		this.anim = new window.animatedHeading({ heading: $(this.animatedHeading) });
	}

	componentDidUpdate(prevProps, prevState) {
		const { animationType, animatedText, level } = this.props.attributes;
		const { attributes } = prevProps;
		if (
			animationType !== attributes.animationType ||
			animatedText.length !== attributes.animatedText.length ||
			level !== attributes.level
		) {
			if (this.anim) {
				this.anim.destroy();
				delete this.anim;
				setTimeout(() => {
					this.anim = new window.animatedHeading({ heading: $(this.animatedHeading) });
				}, 100);
			}
		}
	}

	_handleTypeChange(val) {
		const {
			attributes: { animatedTextColor },
			setAttributes,
		} = this.props;
		this.setState({ animationClass: this._getAnimationClass(val) });
		setAttributes(
			!(val === "clip" || val === "flip" || val === "fade-in" || val === "loading-bar" || val === "push")
				? { animationType: val, animatedTextColor: { ...animatedTextColor, type: "color" } }
				: { animationType: val }
		);
	}
	_getAnimationClass(value = "") {
		let animationClass = "";
		switch (value) {
			case "blinds":
				animationClass = "letters animation-blinds";
				break;
			case "delete-typing":
				animationClass = "letters type";
				break;
			case "flip":
				animationClass = "text-animation-flip";
				break;
			case "fade-in":
				animationClass = "zoom";
				break;
			case "loading-bar":
				animationClass = "loading-bar";
				break;
			case "scale":
				animationClass = "letters scale";
				break;
			case "push":
				animationClass = "push";
				break;
			case "wave":
				animationClass = "letters animation-wave";
				break;
			default:
				animationClass = "text-clip";
		}

		return animationClass;
	}

	render() {
		const {
			name,
			clientId,
			className,
			attributes,
			setAttributes,
			attributes: {
				uniqueId,
				align,
				level,
				animatedText,
				titleBefore,
				titleAfter,
				animationType,

				typography,
				color,
				barColor,
				animatedTextColor,
				animatedTextBgColor,
				// animatedTextTypography,
				animatedTextPadding,
				animatedTextSpacing,
				textBorderRadius,

				animation,
				interaction,
				enablePosition,
				selectPosition,
				positionXaxis,
				positionYaxis,
				globalZindex,
				hideDesktop,
				hideTablet,
				hideMobile,
				globalCss,
			},
		} = this.props;

		const { device, animationClass } = this.state;
		let gradientTextColor =
			animationType === "clip" ||
			animationType === "flip" ||
			animationType === "fade-in" ||
			animationType === "loading-bar" ||
			animationType === "push";
		const CustomHeadingTag = `h${level}`;

		return (
			<Fragment>
				<InspectorControls>
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("Headline level")} opened={true}>
								<HeadingToolbar
									minLevel={1}
									maxLevel={6}
									selectedLevel={level}
									isCollapsed={false}
									onChange={(newLevel) => setAttributes({ level: newLevel })}
								/>
							</PanelBody>
							<PanelBody title={__("Animated Text")}>
								<TextControl
									label={__("Text Before")}
									value={titleBefore}
									onChange={(titleBefore) => setAttributes({ titleBefore })}
								/>
								<TextControl
									label={__("Text After")}
									value={titleAfter}
									onChange={(titleAfter) => setAttributes({ titleAfter })}
								/>
								<FormTokenField
									label={__("Animated Texts")}
									value={animatedText}
									placeholder={__("Add new text")}
									onChange={(tokens) => setAttributes({ animatedText: tokens })}
								/>
								<SelectControl
									label={__("Animation Type")}
									value={animationType}
									options={[
										{ label: __("Blinds"), value: "blinds" },
										{ label: __("Clip"), value: "clip" },
										{ label: __("Delete Typing"), value: "delete-typing" },
										{ label: __("Flip"), value: "flip" },
										{ label: __("Fade In"), value: "fade-in" },
										{ label: __("Loading Bar"), value: "loading-bar" },
										{ label: __("Scale"), value: "scale" },
										{ label: __("Push"), value: "push" },
										{ label: __("Twist/Wave"), value: "wave" },
									]}
									onChange={(val) => this._handleTypeChange(val)}
								/>
								{animationType === "loading-bar" && (
									<Color
										label={__("Bar Color")}
										value={barColor}
										onChange={(val) => setAttributes({ barColor: val })}
									/>
								)}
								{gradientTextColor ? (
									<ColorAdvanced
										textColor
										label={__("Color")}
										value={animatedTextColor}
										onChange={(val) => setAttributes({ animatedTextColor: val })}
									/>
								) : (
									<Color
										label={__("Color")}
										value={animatedTextColor.color}
										onChange={(val) =>
											setAttributes({ animatedTextColor: { ...animatedTextColor, color: val } })
										}
									/>
								)}
								<ColorAdvanced
									textColor
									label={__("Background")}
									value={animatedTextBgColor}
									onChange={(val) => setAttributes({ animatedTextBgColor: val })}
								/>
								<BorderRadius
									min={0}
									max={100}
									responsive
									device={device}
									label={__("Radius")}
									value={textBorderRadius}
									unit={["px", "em", "%"]}
									onDeviceChange={(value) => this.setState({ device: value })}
									onChange={(val) => setAttributes({ textBorderRadius: val })}
								/>

								<Range
									label={__("Padding X")}
									value={animatedTextPadding}
									onChange={(animatedTextPadding) => setAttributes({ animatedTextPadding })}
									min={0}
									max={100}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>

								<Range
									label={__("Spacing X")}
									value={animatedTextSpacing}
									onChange={(animatedTextSpacing) => setAttributes({ animatedTextSpacing })}
									min={0}
									max={100}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody title={__("Design")} initialOpen={false}>
								<Typography
									device={device}
									value={typography}
									label={__("Typography")}
									onChange={(value) => setAttributes({ typography: value })}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Color
									label={__("Color")}
									value={color}
									onChange={(val) => setAttributes({ color: val })}
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
					<HeadingToolbar
						minLevel={1}
						maxLevel={6}
						selectedLevel={level}
						onChange={(newLevel) => setAttributes({ level: newLevel })}
					/>
					<AlignmentToolbar value={align} onChange={(nextAlign) => setAttributes({ align: nextAlign })} />
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

				<div
					className={`qubely-block-${uniqueId} qubely-block-animated-heading qubely-block-animated-heading-backend ${className}`}
					onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
				>
					<CustomHeadingTag
						className={`animated-heading-text ${animationClass} ${align ? ` has-text-align-${align}` : ""}`}
						ref={(el) => (this.animatedHeading = el)}
					>
						{titleBefore}
						<span className="qubely-animated-text">
							<span className="animated-text-words-wrapper">
								{[...(animatedText.length > 0 ? animatedText : defaultTexts)].map((item, index) => {
									let isVisible = index === 0 ? "is-visible" : "is-hidden";
									let className = `animated-text ${isVisible}`;
									return (
										<span key={index} className={className}>
											{item}
										</span>
									);
								})}
							</span>
						</span>
						{titleAfter}
					</CustomHeadingTag>
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
