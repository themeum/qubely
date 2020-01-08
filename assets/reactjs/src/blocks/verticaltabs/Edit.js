const { __ } = wp.i18n
const { Tooltip, PanelBody, Toolbar, TextControl } = wp.components;
const { compose } = wp.compose
const { withSelect, withDispatch } = wp.data
const { Component, Fragment } = wp.element;
const { InnerBlocks, RichText, InspectorControls, BlockControls } = wp.blockEditor
const { Color,ColorAdvanced,Media, IconList, Styles, Typography, Range, RadioAdvanced, gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, Inline: { InlineToolbar }, BoxShadow, Alignment, Tabs, Tab, Separator, Border, Padding, BorderRadius, CssGenerator: { CssGenerator }, Toggle } = wp.qubelyComponents
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
			$('.qubely-vertical-active', currentTabBlock).removeClass('qubely-vertical-active');
			activeTab.addClass('qubely-vertical-active');
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
		$('.qubely-vertical-hidden', currentTabBlock).removeClass('qubely-vertical-hidden');
		$('.qubely-vertical-tab-content', currentTabBlock).removeClass('qubely-vertical-active').fadeOut(0);
		activeTab.addClass('qubely-vertical-active').fadeIn();
		this.setState({ activeTab: index + 1, initialRender: false, showIconPicker: !showIconPicker })
	}

	renderTabTitles = () => {
		const { tabTitles, iconPosition, navText, navLayout, navSubHeading, iconType, enableIcon, navTextAlignment } = this.props.attributes
		return tabTitles.map((title, index) => {
			const buttonClass = `qubely-vertical-tab-item-button ${enableIcon ? 'qubely-has-icon-' + iconPosition : ''}`
			const hasIcon = title.iconName !== 0 && title.iconName !== undefined && title.iconName.toString().trim() !== ''
			const IconImage = () => {
				return <div className={'qubely-icon-image qubely-vertical-tab-icon ' + ((title.image !== undefined && title.image.url) ? '' : 'qubely-vertical-placeholder')}>
					{
						title.image !== undefined && title.image.url ? (
							<img
								className="qubely-vertical-tab-image"
								src={title.image.url}
								alt={title.imageAlt && title.imageAlt}
								srcSet={title.image2x !== undefined && title.image2x.url ? title.image.url + ' 1x, ' + title.image2x.url + ' 2x' : ''}
							/>
						) : (
							<span className="far fa-image"/>
						)
					}
				</div>
			}
			const IconFont = () => hasIcon ? <span className={`qubely-vertical-tab-icon ${title.iconName}`} /> : ''
			const Icon = () => enableIcon ? (iconType === 1 ? <IconFont /> : <IconImage />) : ''
			return (
				<div class={`qubely-vertical-tab-item ${(this.state.activeTab == index + 1) ? 'qubely-vertical-active' : ''}`}>
					<div onClick={(e) => this._handleTabChange(e, index)} className={buttonClass}>
						{
							(navLayout === 2 && iconPosition === 'left') && <Icon />
						}
						<div className={`qubely-vertical-tab-item-content ${navTextAlignment === 'right' ? 'qubely-text-right' : ''}`}>
							<h5 className='qubely-vertical-tab-title'>
								{
									( navLayout === 1 && iconPosition === 'left') && <Icon />
								}
								<RichText
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
					</div>
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
			$('.qubely-vertical-active', currentTabBlock).removeClass('qubely-vertical-active')
			nextActiveTab.addClass('qubely-vertical-active')
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
			tabVerticalAlign,
			iconType,
			enableIcon,
			navWidth,
			navSpacing,
			navSpacing3,
			// navSize,
			navPaddingX,
			navPaddingY,
			// navPadding,
			navAlignment,
			navTextAlignment,
			typography,
			navColor,
			navColor3,
			navColorActive,
			navColorActive3,
			navColorHover,
			navColorHover3,
			navBg,
			navBg2,
			navBg3,
			navBgHover,
			navBgHover2,
			navBgHover3,
			navBgActive,
			navBgActive2,
			navBgActive3,
			navBorder,
			navBorder2,
			navBorder3,
			navBorderColorActive,
			navBorderColorActive2,
			navBorderColorActive3,
			navBorderColorHover,
			navBorderColorHover2,
			navBorderColorHover3,
			navBorderRadiusTabs,
			navBorderRadiusTabsActive,
			navBorderRadiusTabsHover,
			navShadow,
			navShadowActive,
			navShadowHover,
			navShadow2,
			navShadowActive2,
			navShadowHover2,

			enableArrow,
			arrowHeight,
			arrowWidth,
			arrowColor,
			arrowColorHover,

			navSubHeading,
			navSubHeadingTypography,
			navSubHeadingSpacing,
			navSubHeadingColor,
			navSubHeadingColorActive,
			navSubHeadingColorHover,

			navText,
			textTypography,
			textSpacing,
			iconSize,
			iconGap,
			iconPosition,
			iconColor,
			iconColor2,
			iconColor3,
			iconColorActive,
			iconColorActive2,
			iconColorActive3,
			iconColorHover,
			iconColorHover2,
			iconColorHover3,

			textColor,
			// textColorActive,
			textColorHover,

			bodyBg,
			bodyBg2,
			bodyBg3,
			bodyColor,
			bodyColor2,
			bodyColor3,
			bodyPadding,
			bodyBorder,
			bodyShadow,
			bodyBorderRadius,
			// bodySeparatorHeight,
			// bodySeparatorColor,
			bodySpacing,
			bodySpacing2,
			bodySpacing3,

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
								{ value: 'layout1', svg: icons.verticaltabs_1, label: __('Layout 1') },
								{ value: 'layout2', svg: icons.verticaltabs_2, label: __('Layout 2') },
								{ value: 'layout3', svg: icons.verticaltabs_3, label: __('Layout 3') },
							]}
						/>
						<Separator />
						<Range label={__('Menu Width')} value={navWidth} onChange={navWidth => setAttributes({ navWidth })} max={600} min={30} />
						<RadioAdvanced
							label={__('Type')}
							options={[
								{ label: 'Left', value: 'left', title: 'Left' },
								{ label: 'Right', value: 'right', title: 'Right' },
							]}
							value={navAlignment}
							onChange={(navAlignment) => setAttributes({ navAlignment })} />
						<RadioAdvanced
							label={__('Vertical Alignmet')}
							options={[
								{ label: <span style={{padding: '0 5px', transform: 'rotate(90deg)'}} className='fas fa-outdent'/>, value: 'flex-start', title: 'Top' },
								{ label: <span style={{padding: '0 5px', transform: 'rotate(90deg)'}} className='fas fa-align-center'/>, value: 'center', title: 'Center' },
								{ label: <span style={{padding: '0 5px', transform: 'rotate(90deg)'}} className='fas fa-indent'/>, value: 'flex-end', title: 'Bottom' },
							]}
							value={tabVerticalAlign}
							onChange={(tabVerticalAlign) => setAttributes({ tabVerticalAlign })} />
					</PanelBody>

					<PanelBody title={__('Tabs Menu')} initialOpen={false}>
						<Tabs>
							<Tab tabTitle={__('Normal')}>
								<ColorAdvanced 
									label = {__('Background')} 
									value = { tabStyle === 'layout1' ? navBg : (tabStyle === 'layout2' ? navBg2 : navBg3) } 
									onChange = { value => setAttributes(tabStyle === 'layout1' ? {navBg: value} : (tabStyle === 'layout2' ? {navBg2: value} : {navBg3: value}))} 
								/>
								<Separator />
								<Range label={__('Padding Y')} value={navPaddingY} onChange={navPaddingY => setAttributes({ navPaddingY })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Range label={__('Padding X')} value={navPaddingX} onChange={navPaddingX => setAttributes({ navPaddingX })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Separator />
								<Range 
									label={__('Gap / Spacing')} 
									value={tabStyle === 'layout3' ? navSpacing3 : navSpacing} 
									onChange={value => setAttributes(tabStyle === 'layout3' ? {navSpacing3: value} : {navSpacing: value})} 
									max={100} min={0} unit={['px', 'em', '%']} 
									responsive device={device} 
									onDeviceChange={value => this.setState({ device: value })} 
								/>
								<BorderRadius label={__('Corner')} value={navBorderRadiusTabs} onChange={(navBorderRadiusTabs) => setAttributes({ navBorderRadiusTabs })} min={0} max={100} unit={['px', 'em', '%']}/> 
								<Border 
									label={__('Border')} 
									value={tabStyle === 'layout1' ? navBorder : (tabStyle === 'layout2' ? navBorder2 : navBorder3 )} 
									onChange={value => setAttributes(tabStyle === 'layout1' ? {navBorder: value} : (tabStyle === 'layout2' ? {navBorder2: value} : {navBorder3: value} ))} 
									min={0} max={100} 
									onDeviceChange={value => this.setState({ device: value })}
									unit={['px', 'em', '%']} responsive device={device}
								/>
								<BoxShadow label={__('Shadow')} value={navShadow} onChange={navShadow => setAttributes({ navShadow})} />
								<BoxShadow label={__('Shadow 2')} value={navShadow2} onChange={navShadow2 => setAttributes({ navShadow2})} />

								<Toggle label={__('Enable Arrow')} value={enableArrow} onChange={enableArrow => setAttributes({ enableArrow })} />
								{enableArrow && (
									<Fragment>
										<Range label={__('Arrow Height')} value={arrowHeight} onChange={arrowHeight => setAttributes({ arrowHeight })} max={90} min={10} />
										<Range label={__('Arrow Width')} value={arrowWidth} onChange={arrowWidth => setAttributes({ arrowWidth })} max={90} min={10} />
										<Color 
											label={__('Arrow Color')} 
											value={arrowColor} 
											onChange = { arrowColor => setAttributes({arrowColor})}
										/>
									</Fragment>
								)}
								
							</Tab>
							<Tab tabTitle={__('Active')}>
								<ColorAdvanced 
									label={__('Background')} 
									value = {tabStyle === 'layout1' ? navBgActive : (tabStyle === 'layout2' ? navBgActive2 : navBgActive3)}
									onChange = { value => setAttributes(tabStyle === 'layout1' ? {navBgActive: value} : (tabStyle === 'layout2' ? {navBgActive2: value} : {navBgActive3: value}))}
								/>
								<Separator />
								<Color 
									label={__('Border Color')} 
									value={tabStyle === 'layout1' ? navBorderColorActive : (tabStyle === 'layout2' ? navBorderColorActive2 : navBorderColorActive3)} 
									onChange = { value => setAttributes(tabStyle === 'layout1' ? {navBorderColorActive: value} : (tabStyle === 'layout2' ? {navBorderColorActive2: value} : {navBorderColorActive3: value}))}
								/>
								<BorderRadius label={__('Corner')} value={navBorderRadiusTabsActive} onChange={(navBorderRadiusTabsActive) => setAttributes({ navBorderRadiusTabsActive })} min={0} max={100} unit={['px', 'em', '%']} />
								<BoxShadow label={__('Shadow')} value={navShadowActive} onChange={navShadowActive => setAttributes({ navShadowActive})} />
								<BoxShadow label={__('Shadow 2')} value={navShadowActive2} onChange={navShadowActive2 => setAttributes({ navShadowActive2})} />
							</Tab>
							<Tab tabTitle={__('Hover')}>
								<ColorAdvanced 
									label={__('Background')} 
									value = {tabStyle === 'layout1' ? navBgHover : (tabStyle === 'layout2' ? navBgHover2 : navBgHover3)}
									onChange = { value => setAttributes(tabStyle === 'layout1' ? {navBgHover: value} : (tabStyle === 'layout2' ? {navBgHover2: value} : {navBgHover3: value}))}
								/>
								<Separator />
								<Color 
									label={__('Border Color')} 
									value={tabStyle === 'layout1' ? navBorderColorHover : (tabStyle === 'layout2' ? navBorderColorHover2 : navBorderColorHover3)} 
									onChange = { value => setAttributes(tabStyle === 'layout1' ? {navBorderColorHover: value} : (tabStyle === 'layout2' ? {navBorderColorHover2: value} : {navBorderColorHover3: value}))}
								/>
								<BorderRadius label={__('Corner')} value={navBorderRadiusTabsHover} onChange={(navBorderRadiusTabsHover) => setAttributes({ navBorderRadiusTabsHover })} min={0} max={100} unit={['px', 'em', '%']} />
								<BoxShadow label={__('Shadow')} value={navShadowHover} onChange={navShadowHover => setAttributes({ navShadowHover})} />
								<BoxShadow label={__('Shadow 2')} value={navShadowHover2} onChange={navShadowHover2 => setAttributes({ navShadowHover2})} />
								<Color 
									label={__('Arrow Color')} 
									value={arrowColorHover} 
									onChange = { arrowColorHover => setAttributes({arrowColorHover})}
								/>
							</Tab>
						</Tabs>
					</PanelBody>

					<PanelBody title={__('Text Label')} initialOpen={false}>
						<Tabs>
							<Tab tabTitle={__('Normal')}>
								<Color 
									label={__('Color')} 
									value={tabStyle === 'layout3' ? navColor3 : navColor } 
									onChange={(value) => setAttributes(tabStyle === 'layout3' ? {navColor3: value} : {navColor: value})} 
								/>
								<RadioAdvanced
									label={__('Alignment')}
									options={[
										{ label: <span style={{padding: '0 5px'}} className='fas fa-align-left'/>, value: 'left', title: 'Left' },
										{ label: <span style={{padding: '0 5px'}} className='fas fa-align-right'/>, value: 'right', title: 'Right' },
									]}
									value={navTextAlignment}
									onChange={(navTextAlignment) => setAttributes({ navTextAlignment })} />
								<Typography label={__('Typography')} value={typography} onChange={(value) => setAttributes({ typography: value })} disableLineHeight device={device} onDeviceChange={value => this.setState({ device: value })} />
							</Tab>
							<Tab tabTitle={__('Active')}>
								<Color 
									label={__('Color')} 
									value={tabStyle === 'layout3' ? navColorActive3 : navColorActive } 
									onChange={(value) => setAttributes(tabStyle === 'layout3' ? {navColorActive3: value} : {navColorActive: value})} 
								/>
							</Tab>
							<Tab tabTitle={__('Hover')}>
								<Color 
									label={__('Color')} 
									value={tabStyle === 'layout3' ? navColorHover3 : navColorHover } 
									onChange={(value) => setAttributes(tabStyle === 'layout3' ? {navColorHover3: value} : {navColorHover: value})} 
								/>
							</Tab>
						</Tabs>
					</PanelBody>

					<PanelBody title={__('Nav Icon')} initialOpen={false}>
						<Toggle label={__('Enable Icon')} value={enableIcon} onChange={enableIcon => setAttributes({ enableIcon })} />
						{
							enableIcon === true && (
								<Fragment>
									<RadioAdvanced
										label={__('Type')}
										options={[
											{ label: 'Icon', value: 1, title: 'Icon' },
											{ label: 'Image', value: 2, title: 'Image' },
										]}
										value={iconType}
										onChange={iconType => setAttributes({ iconType })} />
									<RadioAdvanced
										label={__('Icon Style')}
										options={[
											{ label: 'Inline', value: 1, title: 'Inline' },
											{ label: 'Outline', value: 2, title: 'Outline' },
										]}
										value={navLayout}
										onChange={navLayout => setAttributes({ navLayout })} />

									{
										iconType === 2 ? (
											<Fragment>
												<Media
													label={__('Image')}
													multiple={false}
													type={['image']}
													panel
													value={tabTitles[activeTab - 1] && tabTitles[activeTab - 1].image}
													onChange={image => this.updateTitles({ image }, activeTab -1)} />
												<Media
													panel
													value={tabTitles[activeTab - 1] && tabTitles[activeTab - 1].image2x}
													multiple={false}
													type={['image']}
													label={__('Retina Image')}
													onChange={image2x => this.updateTitles({ image2x }, activeTab -1)} />

												{(tabTitles[activeTab - 1].image && tabTitles[activeTab - 1].image.url !== undefined) && (
													<TextControl label={__('Alt Text')} value={tabTitles[activeTab - 1] && tabTitles[activeTab - 1].imageAlt} onChange={imageAlt => this.updateTitles({ imageAlt }, activeTab -1)} />
												)}

											</Fragment>
										) : (
											<Fragment>
												<IconList
													disableToggle
													label={__('Icon')}
													value={tabTitles[activeTab - 1] && tabTitles[activeTab - 1].iconName}
													onChange={(value) => this.updateTitles({ iconName: value }, activeTab - 1)} />
												<Tabs>
													<Tab tabTitle={__('Normal')}>
														<Color label={__('Color')} 
														value={tabStyle === 'layout1' ? iconColor : (tabStyle === 'layout2' ? iconColor2 : iconColor3 )} 
														onChange={value => setAttributes(tabStyle === 'layout1' ? {iconColor: value} : (tabStyle === 'layout2' ? {iconColor2: value} : {iconColor3: value} ))} 
													/>
													</Tab>
													<Tab tabTitle={__('Active')}>
														<Color 
															label={__('Color')} 
															value={tabStyle === 'layout1' ? iconColorActive : (tabStyle === 'layout2' ? iconColorActive2 : iconColorActive3 )} 
															onChange={value => setAttributes(tabStyle === 'layout1' ? {iconColorActive: value} : (tabStyle === 'layout2' ? {iconColorActive2: value} : {iconColorActive3: value} ))} 
														/>
													</Tab>
													<Tab tabTitle={__('Hover')}>
														<Color label={__('Color')} 
															value={tabStyle === 'layout1' ? iconColorHover : (tabStyle === 'layout2' ? iconColorHover2 : iconColorHover3 )} 
															onChange={value => setAttributes(tabStyle === 'layout1' ? {iconColorHover: value} : (tabStyle === 'layout2' ? {iconColorHover2: value} : {iconColorHover3: value} ))} 
														/>
													</Tab>
												</Tabs>
											</Fragment>
										)
									}
									<RadioAdvanced
										label={iconType === 2 ? __('Image Position') : __('Icon Position')}
										options={[
											{ label: 'Left', value: 'left', title: 'Left' },
											{ label: 'Right', value: 'right', title: 'Right' },
										]}
										value={iconPosition}
										onChange={iconPosition => setAttributes({ iconPosition })} />
									<Range
										label={iconType === 2 ? __('Image Size') : __('Icon Size')}
										value={iconSize}
										onChange={(value) => setAttributes({ iconSize: value })}
										unit={['px', 'em', '%']}
										min={5}
										max={48}
										responsive
										device={device}
										onDeviceChange={value => this.setState({ device: value })} />
									<Range
										label={iconType === 2 ? __('Image Gap') : __('Icon Gap')}
										value={iconGap}
										onChange={iconGap => setAttributes({ iconGap })}
										unit={['px', 'em', '%']}
										min={0}
										max={64}
										responsive
										device={device}
										onDeviceChange={value => this.setState({ device: value })} />
								</Fragment>
							)
						}
					</PanelBody>
					<PanelBody title={__('Sub Heading')} initialOpen={false}>
						<Toggle label={__('Enable Sub Heading')} value={navSubHeading} onChange={navSubHeading => setAttributes({ navSubHeading })} />
						{navSubHeading && (
							<Tabs>
								<Tab tabTitle={__('Normal')}>
									<Color label={__('Color')} value={navSubHeadingColor} onChange={(navSubHeadingColor) => setAttributes({ navSubHeadingColor })} />
									<Range label={__('Gap')} value={navSubHeadingSpacing} onChange={navSubHeadingSpacing => setAttributes({ navSubHeadingSpacing })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									<Typography label={__('Text Typography')} value={navSubHeadingTypography} onChange={navSubHeadingTypography => setAttributes({ navSubHeadingTypography })} device={device} onDeviceChange={value => this.setState({ device: value })} />
								</Tab>
								<Tab tabTitle={__('Active')}>
									<Color label={__('Color')} value={navSubHeadingColorActive} onChange={(navSubHeadingColorActive) => setAttributes({ navSubHeadingColorActive })} />
								</Tab>
								<Tab tabTitle={__('Hover')}>
									<Color label={__('Color')} value={navSubHeadingColorHover} onChange={(navSubHeadingColorHover) => setAttributes({ navSubHeadingColorHover })} />
								</Tab>
							</Tabs>
						)}
					</PanelBody>
					<PanelBody title={__('Accordion')} initialOpen={false}>
						<Toggle label={__('Enable Accordion')} value={navText} onChange={navText => setAttributes({ navText })} />
						{navText && (
							<Tabs>
								<Tab tabTitle={__('Normal')}>
									<Color label={__('Color')} value={textColor} onChange={(textColor) => setAttributes({ textColor })} />
									<Range label={__('Gap')} value={textSpacing} onChange={textSpacing => setAttributes({ textSpacing })} max={100} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									<Typography label={__('Text Typography')} value={textTypography} onChange={textTypography => setAttributes({ textTypography })} device={device} onDeviceChange={value => this.setState({ device: value })} />
								</Tab>
								{/* <Tab tabTitle={__('Active')}>
									<Color label={__('Color')} value={textColorActive} onChange={(textColorActive) => setAttributes({ textColorActive })} />
								</Tab> */}
								<Tab tabTitle={__('Hover')}>
									<Color label={__('Color')} value={textColorHover} onChange={(textColorHover) => setAttributes({ textColorHover })} />
								</Tab>
							</Tabs>
						)}
					</PanelBody>
					<PanelBody title={__('Tab Body')} initialOpen={false}>
						<Color 
							label={__('Color')} 
							value = { tabStyle === 'layout1' ? bodyColor : (tabStyle === 'layout2' ? bodyColor2 : bodyColor3) } 
							onChange = { value => setAttributes(tabStyle === 'layout1' ? {bodyColor: value} : (tabStyle === 'layout2' ? {bodyColor2: value} : {bodyColor3: value}))} 
						/>
						<Color 
							label={__('Background Color')} 
							value = { tabStyle === 'layout1' ? bodyBg : (tabStyle === 'layout2' ? bodyBg2 : bodyBg3) } 
							onChange = { value => setAttributes(tabStyle === 'layout1' ? {bodyBg: value} : (tabStyle === 'layout2' ? {bodyBg2: value} : {bodyBg3: value}))} 
						/>
						<Padding label={__('Padding')} value={bodyPadding} onChange={(value) => setAttributes({ bodyPadding: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Range 
							label={__('Spacing')} 
							value = { tabStyle === 'layout1' ? bodySpacing : (tabStyle === 'layout2' ? bodySpacing2 : bodySpacing3) } 
							onChange = { value => setAttributes(tabStyle === 'layout1' ? {bodySpacing: value} : (tabStyle === 'layout2' ? {bodySpacing2: value} : {bodySpacing3: value}))}  
							unit={['px', 'em', '%']} max={100} min={0} responsive device={device} 
						/>
						<Border label={__('Border')} separator value={bodyBorder} onChange={(value) => setAttributes({ bodyBorder: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<BoxShadow label={__('Box-Shadow')} value={bodyShadow} onChange={(value) => setAttributes({ bodyShadow: value })} />
						<BorderRadius label={__('Radius')} separator value={bodyBorderRadius} onChange={(value) => setAttributes({ bodyBorderRadius: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />

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
					<div className={`qubely-block-vertical-tab qubely-vertical-tab-style-${tabStyle} qubely-alignment-${navAlignment} ${enableArrow === true ? 'qubely-block-has-arrow' : ''}`}>
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
						<div className='qubely-vertical-tab-body'>
							<InnerBlocks
								tagName="div"
								template={iterator.map(tabIndex => {
									return [
										'qubely/verticaltab',
										{
											id: tabIndex + 1,
											customClassName: tabIndex === 0 ? 'qubely-vertical-tab-content qubely-vertical-active' : 'qubely-vertical-tab-content qubely-vertical-hidden',
										}
									]
								})}
								templateLock="all"
								allowedBlocks={['qubely/verticaltab']}
							/>
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
