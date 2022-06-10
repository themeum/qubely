import classnames from "classnames";
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { PanelBody } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const {
	Range,
	Alignment,
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
} = wp.qubelyComponents;

const UI_PARTS = {
	hasSelectedUI: false,
};

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: "md",
		};
	}

	render() {
		const {
			block,
			clientId,
			setAttributes,
			updateBlockAttributes,
			attributes: {
				uniqueId,
				className,
				alignment,
				buttons,
				spacing,
				padding,
				interaction,
				//animation
				animation,
				//global
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

		const { getBlockOrder } = wp.data.select("core/block-editor"),
			hasChildBlocks = getBlockOrder(clientId).length > 0,
			classes = classnames({ [`qubely-block-${uniqueId}`]: uniqueId }, className);
		let index = 0;
		while (index < buttons) {
			block.innerBlocks[index] &&
				updateBlockAttributes(
					block.innerBlocks[index].clientId,
					Object.assign(block.innerBlocks[index].attributes, { parentClientId: clientId })
				);
			index++;
		}
		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title="" initialOpen={true}>
								<Alignment
									label={__("Alignment")}
									value={alignment}
									alignmentType="content"
									onChange={(val) => setAttributes({ alignment: val })}
									flex
									disableJustify
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									min={0}
									max={300}
									responsive
									device={device}
									value={spacing}
									unit={["px", "em", "%"]}
									label={__("Spacing")}
									onChange={(value) => setAttributes({ spacing: value })}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>
						</InspectorTab>
						<InspectorTab key={"advance"}>
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

				<div className={classes}>
					<div className={`qubely-block-button-group qubely-backend`}>
						<InnerBlocks
							tagName="div"
							className=""
							template={Array(buttons)
								.fill(0)
								.map(() => [
									"qubely/button",
									{
										buttonGroup: true,
										parentClientId: clientId,
										enableAlignment: false,
										spacer: {
											spaceTop: {
												md: "10",
												unit: "px",
											},
											spaceBottom: {
												md: "10",
												unit: "px",
											},
										},
										customClassName: "qubely-group-button",
										disableFullWidth: true,
									},
								])}
							templateLock={false}
							__experimentalUIParts={UI_PARTS}
							__experimentalMoverDirection="horizontal"
							allowedBlocks={["qubely/button"]}
							renderAppender={hasChildBlocks ? undefined : () => <InnerBlocks.ButtonBlockAppender />}
						/>
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
		const { updateBlockAttributes } = dispatch("core/block-editor");
		return {
			updateBlockAttributes,
		};
	}),
	withCSSGenerator(),
])(Edit);
