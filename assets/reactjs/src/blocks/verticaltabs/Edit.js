const { __ } = wp.i18n
const { Tooltip, PanelBody, Toolbar, TextareaControl } = wp.components;
const { compose } = wp.compose
const { withSelect, withDispatch } = wp.data
const { Component, Fragment } = wp.element;
const { InnerBlocks, RichText, InspectorControls, BlockControls } = wp.blockEditor
const { Color,ColorAdvanced, IconList, Select, Styles, Typography, Range, RadioAdvanced, gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, Inline: { InlineToolbar }, BoxShadow, Alignment, Tabs, Tab, Separator, Border, Padding, BorderRadius, CssGenerator: { CssGenerator }, Toggle } = wp.qubelyComponents
import icons from '../../helpers/icons';

class Edit extends Component {

	constructor(props) {
		super(props)
		this.state = {
			device: 'md',
			initialRender: true,
			activeTab: 1,
			spacer: true,
			showIconPicker: false,
		}
	}

	componentDidMount() {
		const { setAttributes, clientId, attributes: { uniqueId } } = this.props
		const _client = clientId.substr(0, 6)
		if (!uniqueId) {
			setAttributes({ uniqueId: _client });
		} else if (uniqueId && uniqueId != _client) {
			setAttributes({ uniqueId: _client });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { attributes: { tabs }, clientId, block } = this.props

		if (!this.state.initialRender && prevProps.block.innerBlocks.length < block.innerBlocks.length) {
			let currentTabBlock = $(`#block-${clientId}`)
			let activeTab = $(`#block-${block.innerBlocks[tabs - 1].clientId}`, currentTabBlock)
			$('.qubely-active', currentTabBlock).removeClass('qubely-active')
			activeTab.addClass("qubely-active")
		}
	}

	updateTitles = (value, index) => {
		const { attributes: { tabTitles }, setAttributes } = this.props;
		const modifiedTitles = tabTitles.map((title, thisIndex) => {
			if (index === thisIndex) {
				title = { ...title, ...value }
			}
			return title
		})
		setAttributes({ tabTitles: modifiedTitles })
	}

	_handleTabChange = (e, index) => {
		const {block, clientId} = this.props
		let currentTabBlock = $(`#block-${clientId}`)
		const { showIconPicker } = this.state
		let activeTab = $(`#block-${block.innerBlocks[index].clientId}`, currentTabBlock)
		$('.qubely-vertical-tab-content.qubely-vertical-active', currentTabBlock).removeClass('qubely-vertical-active')
		activeTab.addClass('qubely-vertical-active');
		this.setState({ activeTab: index + 1, initialRender: false, showIconPicker: !showIconPicker })
	}

	renderTabTitles = () => {
		const { tabTitles, iconPosition, navText, navLayout, navSubHeading } = this.props.attributes
		return tabTitles.map((title, index) => {
			const buttonClass = `qubely-vertical-tab-item-button ${title.iconName ? 'qubely-has-icon-' + iconPosition : ''} ${(this.state.activeTab == index + 1) ? 'qubely-vertical-active' : ''}`
			const Icon = () => (title.iconName !== 0 && title.iconName !== undefined && title.iconName.toString().trim() !== '') ? <span className={`qubely-vertical-tab-icon ${title.iconName}`} /> : ''
			return (
				<div class='qubely-vertical-tab-item'>
					<button onClick={(e) => this._handleTabChange(e, index)} className={buttonClass}>
						{
							(navLayout === 2 && iconPosition === 'left') && <Icon />
						}
						<div>
							<h5 className='qubely-vertical-tab-title'>
								{
									( navLayout === 1 && iconPosition === 'left') && <Icon />
								}
								<RichText
									key="editable"
									keepPlaceholderOnFocus
									placeholder={__('Add Tab Title')}
									value={title.title}
									onChange={value => this.updateTitles({ title: value }, index)}
								/>
								{
									( navLayout === 1 && iconPosition === 'right') &&  <Icon />
								}
							</h5>
							{navSubHeading && (
								<RichText
									key="editable"
									tagName="h6"
									className="qubely-vertical-tab-nav-sub-heading"
									keepPlaceholderOnFocus
									placeholder={__('Add Subheading')}
									value={title.navSubHeading}
									onChange={navSubHeading => this.updateTitles({ navSubHeading }, index)}
								/>
							)}
							{navText && (
								<RichText
									style={{display: ((this.state.activeTab === index + 1) ? '' : 'none')}}
									key="editable"
									tagName="p"
									className="qubely-vertical-tab-nav-text"
									keepPlaceholderOnFocus
									placeholder={__('Add Nav Text')}
									value={title.navText}
									onChange={navText => this.updateTitles({ navText }, index)}
								/>
							)}
						</div>
						{
							(navLayout === 2 && iconPosition === 'right') &&  <Icon />
						}
					</button>
					<Tooltip text={__('Delete this tab')}>
						<span className="fas fa-times qubely-action-vertical-tab-remove" onClick={() => this.deleteTab(index)} role="button" tabIndex="0" />
					</Tooltip>
				</div>
			)
		})
	}

	deleteTab = (tabIndex) => {
		const { activeTab } = this.state
		const { attributes: { tabTitles, tabs }, setAttributes, block, removeBlock, updateBlockAttributes, clientId } = this.props;
		const newItems = tabTitles.filter((item, index) => index != tabIndex)
		setAttributes({ tabTitles: newItems, tabs: tabs - 1 })
		let i = tabIndex + 1
		while (i < tabs) {
			updateBlockAttributes(block.innerBlocks[i].clientId, Object.assign(block.innerBlocks[i].attributes, { id: block.innerBlocks[i].attributes.id - 1 }))
			i++
		}

		removeBlock(block.innerBlocks[tabIndex].clientId)

		if (tabIndex + 1 === activeTab) {
			let currentTabBlock = $(`#block-${clientId}`)
			let nextActiveTab = $(`#block-${block.innerBlocks[tabIndex + 1 < tabs ? tabIndex + 1 : tabs >= 2 ? tabIndex - 1 : tabIndex].clientId}`, currentTabBlock)
			$('.qubely-active', currentTabBlock).removeClass('qubely-active')
			nextActiveTab.addClass("qubely-active")
			this.setState({ activeTab: tabIndex == 0 ? 1 : tabIndex + 1 < tabs ? tabIndex + 1 : tabIndex, initialRender: false })
		}
		tabIndex + 1 < activeTab && this.setState({ activeTab: activeTab - 1, initialRender: false })
	}

	newTitles = () => {
		const { attributes: { tabs, tabTitles } } = this.props
		let newTitles = JSON.parse(JSON.stringify(tabTitles));
		newTitles[tabs] = {
			title: __(`Tab ${tabs + 1}`),
			icon: {},
		}
		return newTitles
	}
	render() {
		const {
			uniqueId,
			tabs,
			tabTitles,
			tabStyle,
			navLayout,
			navWidth,
			navSpacing,
			// navSize,
			navPaddingX,
			navPaddingY,
			// navPadding,
			navAlignment,
			typography,
			navColor,
			navColorActive,
			navColorHover,
			navBg,
			navBgHover,
			navBgActive,
			navBorder,
			navBorderActive,
			navBorderRadiusTabs,
			navBorderRadiusTabsActive,
			navBorderRadiusTabsHover,
			navShadow,
			navShadowActive,
			navBorderRadiusPills,
			navUnderlineBorderWidth,
			navSubHeading,
			navSubHeadingTypography,
			navSubHeadingSpacing,
			navText,
			textTypography,
			textSpacing,
			navUnderlineBorderColor,
			navUnderlineBorderColorActive,
			iconSize,
			iconGap,
			iconPosition,
			bodyBg,
			bodyPadding,
			bodyBorder,
			bodyBorderRadius,
			bodySeparatorHeight,
			bodySeparatorColor,
			bodyTopSpacing,
			bodyShadow,

			//animation
			animation,
			//global
            globalZindex,
            enablePosition, 
            selectPosition, 
            positionXaxis, 
            positionYaxis,
			hideTablet,
			hideMobile,
			globalCss,
			interaction
		} = this.props.attributes
		const { name, setAttributes, isSelected } = this.props
		const { activeTab, device } = this.state
		if (uniqueId) { CssGenerator(this.props.attributes, 'verticaltabs', uniqueId); }
		let iterator = [], index = 0
		while (index < tabs) {
			iterator.push(index)
			index++
		}

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('Styles')} initialOpen={true}>
						<Styles value={tabStyle} onChange={val => setAttributes({ tabStyle: val })}
							options={[
								{ value: 'tabs', svg: icons.tab_tabs, label: __('Tabs') },
								{ value: 'pills', svg: icons.tab_pills, label: __('Pills') },
								{ value: 'underline', svg: icons.tab_underline, label: __('Underline') },
							]}
						/>
						<Separator />
						<Range label={__('Menu Width')} value={navWidth} onChange={navWidth => setAttributes({ navWidth })} max={600} min={0} unit={['px', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<RadioAdvanced
							label={__('Type')}
							options={[
								{ label: 'Left', value: 'left', title: 'Left' },
								{ label: 'Right', value: 'right', title: 'Right' },
							]}
							value={navAlignment}
							onChange={(navAlignment) => setAttributes({ navAlignment })} />
					</PanelBody>

					<PanelBody title={__('Tabs Menu')} initialOpen={false}>
						<Tabs>
							<Tab tabTitle={__('Normal')}>
								<ColorAdvanced label={__('Background')} value={navBg} onChange={navBg => setAttributes({ navBg })} />
								<Separator />
								<Color label={__('Color')} value={navColor} onChange={(navColor) => setAttributes({ navColor })} />
								<Range label={__('Padding Y')} value={navPaddingY} onChange={navPaddingY => setAttributes({ navPaddingY })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Range label={__('Padding X')} value={navPaddingX} onChange={navPaddingX => setAttributes({ navPaddingX })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Separator />
								<BorderRadius label={__('Corner')} value={navBorderRadiusTabs} onChange={(navBorderRadiusTabs) => setAttributes({ navBorderRadiusTabs })} min={0} max={100} unit={['px', 'em', '%']} {/*responsive device={device} onDeviceChange={value => this.setState({ device: value })}*/} />
								<Border label={__('Border')} value={navBorder} onChange={(value) => setAttributes({ navBorder: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Range label={__('Gap')} value={navSpacing} onChange={navSpacing => setAttributes({ navSpacing })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BoxShadow label={__('Shadow')} value={navShadow} onChange={navShadow => setAttributes({ navShadow})} />
							</Tab>
							<Tab tabTitle={__('Active')}>
								<ColorAdvanced label={__('Background')} value={navBgActive} onChange={navBgActive => setAttributes({ navBgActive })} />
								<Separator />
								<Color label={__('Color')} value={navColorActive} onChange={(navColorActive) => setAttributes({ navColorActive })} />
								<BorderRadius label={__('Corner')} value={navBorderRadiusTabsActive} onChange={(navBorderRadiusTabsActive) => setAttributes({ navBorderRadiusTabsActive })} min={0} max={100} unit={['px', 'em', '%']} />
								{/*<Border label={__('Border')} value={navBorderActive} onChange={(value) => setAttributes({ navBorderActive: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />*/}
								<BoxShadow label={__('Shadow')} value={navShadowActive} onChange={navShadowActive => setAttributes({ navShadowActive})} />
							</Tab>
							<Tab tabTitle={__('Hover')}>
								<ColorAdvanced label={__('Background')} value={navBgHover} onChange={navBgHover => setAttributes({ navBgHover })} />
								<Separator />
								<Color label={__('Color')} value={navColorHover} onChange={(navColorHover) => setAttributes({ navColorHover })} />
								<BorderRadius label={__('Corner')} value={navBorderRadiusTabsHover} onChange={(navBorderRadiusTabsHover) => setAttributes({ navBorderRadiusTabsHover })} min={0} max={100} unit={['px', 'em', '%']} />
							</Tab>
						</Tabs>
					</PanelBody>

					<PanelBody title={__('Nav')} initialOpen={false}>
						<RadioAdvanced
							label={__('Type')}
							options={[
								{ label: 'Layout 1', value: 1, title: 'Layout 1' },
								{ label: 'Layout 2', value: 2, title: 'Layout 2' },
							]}
							value={navLayout}
							onChange={(navLayout) => setAttributes({ navLayout })} />
						{/*<Tabs>
							<Tab tabTitle={__('Normal')}>
								<Color label={__('Background')} value={navBg} onChange={(value) => setAttributes({ navBg: value })} />
								<Border label={__('Border')} value={navBorder} onChange={(value) => setAttributes({ navBorder: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BoxShadow label={__('Shadow')} value={navShadow} onChange={navShadow => setAttributes({ navShadow})} />
							</Tab>
							<Tab tabTitle={__('Active')}>
								<Color label={__('Background')} value={navBgActive} onChange={(value) => setAttributes({ navBgActive: value })} />
								<Border label={__('Border')} value={navBorderActive} onChange={(value) => setAttributes({ navBorderActive: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BoxShadow label={__('Shadow')} value={navShadowActive} onChange={navShadowActive => setAttributes({ navShadowActive})} />
							</Tab>
						</Tabs>*/}
						<Typography label={__('Typography')} value={typography} onChange={(value) => setAttributes({ typography: value })} disableLineHeight device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>
					<PanelBody title={__('Nav Icon')} initialOpen={false}>
						<IconList
							label={__('Icon')}
							value={tabTitles[activeTab - 1] && tabTitles[activeTab - 1].iconName}
							onChange={(value) => this.updateTitles({ iconName: value }, activeTab - 1)} />
						<Select
							label={__('Icon Position')}
							options={[['left', __('Left')], ['right', __('Right')]]}
							value={iconPosition}
							onChange={(value) => setAttributes({ iconPosition: value })} />
						<Range
							label={__('Icon Size')}
							value={iconSize}
							onChange={(value) => setAttributes({ iconSize: value })}
							unit={['px', 'em', '%']}
							min={5}
							max={48}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />
						<Range
							label={__('Icon Gap')}
							value={iconGap}
							onChange={iconGap => setAttributes({ iconGap })}
							unit={['px', 'em', '%']}
							min={0}
							max={64}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />

					</PanelBody>
					<PanelBody title={__('Nav Content')} initialOpen={false}>
						<Toggle label={__('Enable Sub Heading')} value={navSubHeading} onChange={navSubHeading => setAttributes({ navSubHeading })} />
						{navSubHeading && (
							<Fragment>
								<Range label={__('Gap')} value={navSubHeadingSpacing} onChange={navSubHeadingSpacing => setAttributes({ navSubHeadingSpacing })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Typography label={__('Text Typography')} value={navSubHeadingTypography} onChange={navSubHeadingTypography => setAttributes({ navSubHeadingTypography })} device={device} onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						)}
						<Toggle label={__('Enable Text')} value={navText} onChange={navText => setAttributes({ navText })} />
						{navText && (
							<Fragment>
								<Range label={__('Gap')} value={textSpacing} onChange={textSpacing => setAttributes({ textSpacing })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Typography label={__('Text Typography')} value={textTypography} onChange={textTypography => setAttributes({ textTypography })} device={device} onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						)}
					</PanelBody>
					<PanelBody title={__('Body')} initialOpen={false}>
						{tabStyle == 'tabs' &&
							<Fragment>
								<Color label={__('Background Color')} value={bodyBg} onChange={(value) => setAttributes({ bodyBg: value })} />
								<Padding label={__('Padding')} value={bodyPadding} onChange={(value) => setAttributes({ bodyPadding: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						}
						{tabStyle == 'underline' &&
							<Fragment>
								<Range label={__('Separator Height')} value={bodySeparatorHeight} onChange={(value) => setAttributes({ bodySeparatorHeight: value })} min={0} max={5} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								{bodySeparatorHeight.md > 0 &&
									<Color label={__('Separator Color')} value={bodySeparatorColor} onChange={(value) => setAttributes({ bodySeparatorColor: value })} />
								}
								<Separator />
							</Fragment>
						}
						{tabStyle != 'tabs' &&
							<Range label={__('Spacing')} value={bodyTopSpacing} onChange={(value) => setAttributes({ bodyTopSpacing: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						}

						{tabStyle == 'tabs' &&
							<Fragment>
								<Border label={__('Border')} separator value={bodyBorder} onChange={(value) => setAttributes({ bodyBorder: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BoxShadow label={__('Box-Shadow')} value={bodyShadow} onChange={(value) => setAttributes({ bodyShadow: value })} />
								<BorderRadius label={__('Radius')} separator value={bodyBorderRadius} onChange={(value) => setAttributes({ bodyBorderRadius: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						}
					</PanelBody>
					
					{animationSettings(uniqueId, animation, setAttributes)}

					{interactionSettings(uniqueId, interaction, setAttributes)}

				</InspectorControls>

				<BlockControls>
					<Toolbar>
						<InlineToolbar
							data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
							{...this.props}
							prevState={this.state}
						/>
					</Toolbar>
				</BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

				<div className={`qubely-block-${uniqueId}`}>
					<div className={`qubely-block-vertical-tab qubely-vertical-tab-style-${tabStyle} qubely-alignment-${navAlignment}`}>
						<div className={`qubely-vertical-tab-nav`}>
							{this.renderTabTitles()}
							<Tooltip text={__('Add new tab')}>
								<button className="qubely-add-new-vertical-tab" onClick={() => {
									this.setState({ activeTab: tabs + 1, initialRender: false })
									setAttributes({
										tabs: tabs + 1,
										tabTitles: this.newTitles()
									})
								}} role="button" areaLabel={__('Add new tab')}>
									<i className="fas fa-plus-circle" />
								</button>
							</Tooltip>
						</div>
						<div className={`qubely-vertical-tab-body`}>
							<InnerBlocks
								tagName="div"
								template={iterator.map(tabIndex => ['qubely/verticaltab', { id: tabIndex + 1, customClassName: tabIndex == 0 ? `qubely-vertical-tab-content qubely-vertical-active` : `qubely-vertical-tab-content` }])}
								templateLock="all"
								allowedBlocks={['qubely/verticaltab']} />
						</div>
					</div>
				</div>

			</Fragment>
		)
	}
}
export default compose([
	withSelect((select, ownProps) => {
		const { clientId } = ownProps
		const { getBlock } = select('core/block-editor');
		return {
			block: getBlock(clientId)
		};
	}),
	withDispatch((dispatch) => {
		const { insertBlock, removeBlock, updateBlockAttributes } = dispatch('core/block-editor');
		return {
			insertBlock,
			removeBlock,
			updateBlockAttributes
		};
	}),
])(Edit)
