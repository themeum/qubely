import classnames from 'classnames';
import { TableOfContents } from './components';
import Separator from '../../components/fields/Separator';

const { __ } = wp.i18n;
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, TextControl, Toolbar, FormTokenField, CheckboxControl } =
	wp.components;

const { RichText, InspectorControls, BlockControls, BlockAlignmentToolbar } =
	wp.blockEditor;

const {
	Range,
	Toggle,
	Background,
	Border,
	BoxShadow,
	BorderRadius,
	RadioAdvanced,
	Color,
	gloalSettings: {
		globalSettingsPanel,
		animationSettings,
		interactionSettings,
	},
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
			device: 'md',
		};
		this.qubelyContextMenu = createRef();
	}

	componentDidMount() {
		const {
			setAttributes,
			clientId,
			attributes: { uniqueId },
		} = this.props;
		const _client = clientId.substr(0, 6);
		if (!uniqueId) {
			setAttributes({ uniqueId: _client });
		} else if (uniqueId && uniqueId != _client) {
			setAttributes({ uniqueId: _client });
		}
	}

	render() {
		const {
			name,
			clientId,
			attributes,
			setAttributes,
			attributes: {
				uniqueId,
				align,
				className,
				tableType,
				scrollToTop,
				showTitle,
				allowedAnchors,
				title,
				headerLinks,
				animation,
				interaction,
				minimizeBox,
				headingSize,
				headerBg,
				headerColor,
				headerPaddingY,
				headerPaddingX,

				bodyBg,
				bodyFontSize,
				bodyPaddingY,
				bodyPaddingX,
				bodyBorder,
				bodyShadow,
				bodyBorderRadius,
				enableHeaderBorder,
				headerBorderColor,
				headerBorderWidth,
				bodyColor,
				bodyLineHeight,

				collapsibleAlignment,
				collapsibleIcon,
				collapsibleType,
				collapsibleOpen,
				collapsibleClose,
				isCollapsed,

				smoothScroll,
				scrollOffset,
				backToTopIcon,
				btiPosition,
				btiSize,
				btiOffset,
				btiColor,
				btiBg,
				btiRadius,
				indent,
				collapsibleButtonColor,

				//global
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

		const { device } = this.state;

		const classes = classnames(
			`qubely-block-${uniqueId}`,
			"qubely-block-table-of-contents",
			`qubely-align-${align}`
		);

		let defaultTags = {
			h1: false,
			h2: false,
			h3: false,
			h4: false,
			h5: false,
			h6: false,
		};

		const currentIconClass = {};
		switch (collapsibleIcon) {
			case "chevron-cirlce":
				currentIconClass.open = "fas fa-chevron-circle-up";
				currentIconClass.close = "fas fa-chevron-circle-down";
				break;
			case "plus":
				currentIconClass.open = "fas fa-plus";
				currentIconClass.close = "fas fa-minus";
				break;
			case "plus-square":
				currentIconClass.open = "fas fa-plus-square";
				currentIconClass.close = "fas fa-minus-square";
				break;
			default:
				currentIconClass.open = "fas fa-angle-up";
				currentIconClass.close = "fas fa-angle-down";
		}

		return (
			<Fragment>
				<BlockControls>
					{/*<BlockAlignmentToolbar
                        value={align}
                        controls={['left', 'center', 'right']}
                        onChange={value => setAttributes({ align: value })}
                    />*/}
					<Toolbar
						// label={__('Table of Content Options', 'qubely')}
						controls={[
							{
								icon: 'editor-ul',
								title: 'Convert to unordered list',
								onClick: () => setAttributes({ tableType: 'unordered' }),
								className: `qubely-action-change-listype ${
									tableType == 'unordered' ? 'is-active' : ''
								}`,
							},
							{
								icon: 'editor-ol',
								title: 'Convert to ordered list',
								onClick: () => setAttributes({ tableType: 'ordered' }),
								className: `qubely-action-change-listype ${
									tableType == 'ordered' ? 'is-active' : ''
								}`,
							},
						]}
					/>
				</BlockControls>

				<InspectorControls key="inspector">
					<InspectorTabs tabs={['style', 'advance']}>
						<InspectorTab key={'style'}>
							<PanelBody title={__('')} initialOpen={true}>
								<div className="qubely-field ">
									<label>{__('Select headings')}</label>
									<div className="qubely-toc-allowed-headings">
										<CheckboxControl
											label={__('H1')}
											checked={allowedAnchors['h1']}
											onChange={(value) =>
												setAttributes({
													allowedAnchors: { ...allowedAnchors, h1: value },
												})
											}
										/>
										<CheckboxControl
											label={__('H2')}
											checked={allowedAnchors['h2']}
											onChange={(value) =>
												setAttributes({
													allowedAnchors: { ...allowedAnchors, h2: value },
												})
											}
										/>
										<CheckboxControl
											label={__('H3')}
											checked={allowedAnchors['h3']}
											onChange={(value) =>
												setAttributes({
													allowedAnchors: { ...allowedAnchors, h3: value },
												})
											}
										/>
										<CheckboxControl
											label={__('H4')}
											checked={allowedAnchors['h4']}
											onChange={(value) =>
												setAttributes({
													allowedAnchors: { ...allowedAnchors, h4: value },
												})
											}
										/>
										<CheckboxControl
											label={__('H5')}
											checked={allowedAnchors['h5']}
											onChange={(value) =>
												setAttributes({
													allowedAnchors: { ...allowedAnchors, h5: value },
												})
											}
										/>
										<CheckboxControl
											label={__('H6')}
											checked={allowedAnchors['h6']}
											onChange={(value) =>
												setAttributes({
													allowedAnchors: { ...allowedAnchors, h6: value },
												})
											}
										/>
									</div>
								</div>
							</PanelBody>

							<PanelBody title={__('Header')} initialOpen={false}>
								<Color
									label={__('Color')}
									value={headerColor}
									onChange={(headerColor) => setAttributes({ headerColor })}
								/>
								<Color
									label={__('Background')}
									value={headerBg}
									onChange={(headerBg) => setAttributes({ headerBg })}
								/>
								<Range
									label={__('Font Size')}
									value={headingSize}
									onChange={(headingSize) => setAttributes({ headingSize })}
									unit={['px']}
									min={10}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__('Padding X')}
									value={headerPaddingX}
									onChange={(headerPaddingX) =>
										setAttributes({ headerPaddingX })
									}
									unit={['px']}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__('Padding Y')}
									value={headerPaddingY}
									onChange={(headerPaddingY) =>
										setAttributes({ headerPaddingY })
									}
									unit={['px']}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Toggle
									label={__('Border Separator')}
									value={enableHeaderBorder}
									onChange={(enableHeaderBorder) =>
										setAttributes({ enableHeaderBorder })
									}
								/>
								{enableHeaderBorder && (
									<Fragment>
										<Range
											label={__('Border Width')}
											value={headerBorderWidth}
											onChange={(headerBorderWidth) =>
												setAttributes({ headerBorderWidth })
											}
											unit={['px']}
											min={0}
											max={100}
											responsive
											device={device}
											onDeviceChange={(headerBorderWidth) =>
												this.setState({ headerBorderWidth })
											}
										/>
										<Color
											label={__('Border Color')}
											value={headerBorderColor}
											onChange={(headerBorderColor) =>
												setAttributes({ headerBorderColor })
											}
										/>
									</Fragment>
								)}
							</PanelBody>

							<PanelBody title={__('Collapsible')} initialOpen={false}>
								<Toggle
									label={__('Enable Collapsible')}
									value={minimizeBox}
									onChange={(minimizeBox) => setAttributes({ minimizeBox })}
								/>
								{minimizeBox && (
									<Fragment>
										<Color
											label={__('Button Color')}
											value={collapsibleButtonColor}
											onChange={(collapsibleButtonColor) =>
												setAttributes({ collapsibleButtonColor })
											}
										/>
										<RadioAdvanced
											label={__('Alignment')}
											options={[
												{
													icon: 'fas fa-align-justify',
													value: 'qubely-justify-between',
													title: __('Justify'),
												},
												{
													icon: 'fas fa-align-left',
													value: 'qubely-justify-start',
													title: __('Start'),
												},
												{
													icon: 'fas fa-align-center',
													value: 'qubely-justify-center',
													title: __('Center'),
												},
												{
													icon: 'fas fa-align-right',
													value: 'qubely-justify-end',
													title: __('End'),
												},
											]}
											value={collapsibleAlignment}
											onChange={(collapsibleAlignment) =>
												setAttributes({ collapsibleAlignment })
											}
										/>
										<RadioAdvanced
											label={__('Button Type')}
											options={[
												{
													label: __('Text'),
													value: 'text',
													title: __('Text'),
												},
												{
													label: __('Icon'),
													value: 'icon',
													title: __('Icon'),
												},
											]}
											value={collapsibleType}
											onChange={(collapsibleType) =>
												setAttributes({ collapsibleType })
											}
										/>

										{collapsibleType === 'icon' ? (
											<RadioAdvanced
												label={__('Icon')}
												options={[
													{
														icon: 'fas fa-angle-up',
														value: 'angle',
														title: __('Angle'),
													},
													{
														icon: 'fas fa-chevron-circle-up',
														value: 'chevron-cirlce',
														title: __('Chevron Circle'),
													},
													{
														icon: 'fas fa-plus',
														value: 'plus',
														title: __('Plus/Minus'),
													},
													{
														icon: 'fas fa-plus-square',
														value: 'plus-square',
														title: __('Plus/Minus Square'),
													},
												]}
												value={collapsibleIcon}
												onChange={(collapsibleIcon) =>
													setAttributes({ collapsibleIcon })
												}
											/>
										) : (
											<Fragment>
												<TextControl
													label="Open Text"
													value={collapsibleOpen}
													onChange={(collapsibleOpen) =>
														setAttributes({ collapsibleOpen })
													}
												/>
												<TextControl
													label="Close Text"
													value={collapsibleClose}
													onChange={(collapsibleClose) =>
														setAttributes({ collapsibleClose })
													}
												/>
											</Fragment>
										)}
									</Fragment>
								)}
							</PanelBody>

							<PanelBody title={__('Body')} initialOpen={false}>
								<Color
									label={__('Color')}
									value={bodyColor}
									onChange={(bodyColor) => setAttributes({ bodyColor })}
								/>
								<Background
									label={__('Background')}
									sources={['image', 'gradient']}
									value={bodyBg}
									onChange={(bodyBg) => setAttributes({ bodyBg })}
								/>
								<Range
									label={__('Font Size')}
									value={bodyFontSize}
									onChange={(bodyFontSize) => setAttributes({ bodyFontSize })}
									unit={['px']}
									min={10}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__('Line Height')}
									value={bodyLineHeight}
									onChange={(bodyLineHeight) =>
										setAttributes({ bodyLineHeight })
									}
									unit={['px', 'em']}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__('Indent')}
									value={indent}
									onChange={(indent) => setAttributes({ indent })}
									unit={['px']}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__('Padding X')}
									value={bodyPaddingX}
									onChange={(bodyPaddingX) => setAttributes({ bodyPaddingX })}
									unit={['px']}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__('Padding Y')}
									value={bodyPaddingY}
									onChange={(bodyPaddingY) => setAttributes({ bodyPaddingY })}
									unit={['px']}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Border
									label={__('Border')}
									separator
									value={bodyBorder}
									onChange={(value) => setAttributes({ bodyBorder: value })}
									unit={['px', 'em', '%']}
									max={100}
									min={0}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<BoxShadow
									label={__('Box-Shadow')}
									value={bodyShadow}
									onChange={(value) => setAttributes({ bodyShadow: value })}
								/>
								<BorderRadius
									label={__('Radius')}
									separator
									value={bodyBorderRadius}
									onChange={(value) =>
										setAttributes({ bodyBorderRadius: value })
									}
									unit={['px', 'em', '%']}
									max={100}
									min={0}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody title={__('Smooth Scroll')} initialOpen={false}>
								<Toggle
									label={__('Enable Smooth Scroll')}
									value={smoothScroll}
									onChange={(smoothScroll) => setAttributes({ smoothScroll })}
								/>
								{smoothScroll === true && (
									<Range
										label={__('Scroll offset')}
										value={scrollOffset}
										min={0}
										max={100}
										onChange={(scrollOffset) =>
											setAttributes({ scrollOffset })
										}
									/>
								)}

								<Separator />

								<Toggle
									label={__('Enable Back To Top')}
									value={scrollToTop}
									onChange={(value) => setAttributes({ scrollToTop: value })}
								/>

								{scrollToTop !== false && (
									<Fragment>
										<RadioAdvanced
											label={__('Icon')}
											options={[
												{
													icon: 'fas fa-angle-up',
													value: 'fas fa-angle-up',
													title: __('Angle'),
												},
												{
													icon: 'fas fa-angle-double-up',
													value: 'fas fa-angle-double-up',
													title: __('Angle Double'),
												},
												{
													icon: 'fas fa-caret-up',
													value: 'fas fa-caret-up',
													title: __('Caret'),
												},
											]}
											value={backToTopIcon}
											onChange={(backToTopIcon) =>
												setAttributes({ backToTopIcon })
											}
										/>
										<RadioAdvanced
											label={__('Button Position')}
											options={[
												{ label: 'Left', value: 'left', title: __('Left') },
												{ label: 'Right', value: 'right', title: __('Right') },
											]}
											value={btiPosition}
											onChange={(btiPosition) =>
												setAttributes({ btiPosition })
											}
										/>
										<Range
											label={__('Button Offset')}
											value={btiOffset}
											min={0}
											max={250}
											onChange={(btiOffset) => setAttributes({ btiOffset })}
										/>
										<Range
											label={__('Button Size')}
											value={btiSize}
											min={30}
											max={80}
											onChange={(btiSize) => setAttributes({ btiSize })}
										/>
										<Color
											label={__('Button Color')}
											value={btiColor}
											onChange={(btiColor) => setAttributes({ btiColor })}
										/>
										<Color
											label={__('Button Background')}
											value={btiBg}
											onChange={(btiBg) => setAttributes({ btiBg })}
										/>
										<Range
											label={__('Button Radius')}
											value={btiRadius}
											min={0}
											max={100}
											onChange={(btiRadius) => setAttributes({ btiRadius })}
										/>
									</Fragment>
								)}
							</PanelBody>
						</InspectorTab>
						<InspectorTab key={'advance'}>
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
					setAttributes,
				})}
				<div className={classes}>
					<div
						className={classnames([
							'qubely-table-of-contents',
							...(isCollapsed ? ['qubely-toc-collapsed'] : []),
						])}
						onContextMenu={(event) =>
							handleContextMenu(event, this.qubelyContextMenu.current)
						}
					>
						<div
							className={classnames([
								'qubely-table-of-contents-header',
								collapsibleAlignment,
							])}
						>
							{showTitle && (
								<div className="qubely-table-of-contents-heading">
									<RichText
										tagName="div"
										value={__(title, 'qubely')}
										className="title"
										keepPlaceholderOnFocus
										placeholder={__('Add Title')}
										onChange={(newTitle) => setAttributes({ title: newTitle })}
									/>
								</div>
							)}
							{minimizeBox && (
								<div
									className="qubely-table-of-contents-toggle"
									onClick={() => setAttributes({ isCollapsed: !isCollapsed })}
								>
									{isCollapsed === true ? (
										collapsibleType !== 'icon' ? (
											<a href="javascript:;">{collapsibleOpen}</a>
										) : (
											<a
												href="javascript:;"
												className={currentIconClass.close}
											></a>
										)
									) : collapsibleType !== 'icon' ? (
										<a href="javascript:;">{collapsibleClose}</a>
									) : (
										<a
											href="javascript:;"
											className={currentIconClass.open}
										></a>
									)}
								</div>
							)}
						</div>
						<div className="qubely-table-of-contents-body">
							<TableOfContents
								// headers={headerLinks && JSON.parse(headerLinks)}
								headers={
									headerLinks && JSON.parse(headerLinks.replace(/u0022/g, '"'))
								}
								blockProp={this.props}
							/>
						</div>
						{scrollToTop !== false && (
							<a
								href="#"
								className={`qubely-back-to-top-button ${backToTopIcon}`}
							/>
						)}
					</div>
					<div
						ref={this.qubelyContextMenu}
						className={`qubely-context-menu-wraper`}
					>
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
