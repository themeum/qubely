const { __ } = wp.i18n
const { PanelBody, Toolbar, SelectControl, TextControl } = wp.components
const { compose } = wp.compose
const { select, withSelect, withDispatch } = wp.data
const { Component, Fragment } = wp.element
const { getBlock } = select('core/editor')
const { RichText, InspectorControls, BlockControls } = wp.editor
import { Color, Toggle, Border, Padding, Alignment, Typography, QubelyButtonEdit, Select, ColorAdvanced, Range, RadioAdvanced, Tabs, Tab, Separator, QubelyIconListEdit, BoxShadow, Styles, BorderRadius } from "../../components/FieldRender"
import InlineToolbar from '../../components/fields/inline/InlineToolbar'
import { CssGenerator } from '../../components/CssGenerator'
import '../../components/ListComponent'
import '../../components/ButtonComponent'
import '../../components/GlobalSettings'
import '../../components/ContextMenu'
import icons from '../../helpers/icons'

class Edit extends Component {

	constructor(props) {
		super(props)
		this.state = {
			device: 'md',
			spacer: true,
			openPanelSetting: '',
			showTitleTypography: false,
			showSubTitleTypography: false,
			showpriceTypography: false,
			showDurationTypography: false,
			showBadgeTypography: false,
			showCurrencyWrapper: false,
			showPricingTitleSettings: false,
			openContextMenu: false,
			disablePasteStyle: false,
		}
	}

	componentDidMount() {
		const { setAttributes, clientId, attributes: { uniqueId, sourceOfCopiedStyle } } = this.props
		const _client = clientId.substr(0, 6)
		if (!uniqueId) {
			setAttributes({ uniqueId: _client })
		} else if (uniqueId && uniqueId != _client) {
			setAttributes({ uniqueId: _client })
		}

	}
	renderCurrencyContent = () => {
		const { attributes: { currency, currencyCustom } } = this.props
		return (<span className="qubely-pricing-currency">{currency == 'custom' ? currencyCustom : currency}</span>)
	}
	renderDuration = () => {
		const { attributes: { duration }, setAttributes } = this.props
		return (
			<span className="qubely-pricing-duration">
				<RichText
					value={duration}
					key="editable"
					keepPlaceholderOnFocus
					placeholder={__('Product Validity')}
					className="qubely-product-duration"
					onChange={val => setAttributes({ duration: val })} />
			</span>

		)
	}

	renderPricingButton = () => {
		const {
			setAttributes,
			attributes: { enableButton, buttonFillType, buttonSize, buttonText, buttonIconName, buttonIconPosition, buttonTag, enablePostButtonText, postButtonText }
		} = this.props

		return (
			<div className={`qubely-pricing-button`} onClick={() => this.handlePanelOpenings('Button')}>
				<QubelyButtonEdit
					enableButton={enableButton}
					buttonFillType={buttonFillType}
					buttonSize={buttonSize}
					buttonText={buttonText}
					buttonIconName={buttonIconName}
					buttonIconPosition={buttonIconPosition}
					buttonTag={buttonTag}
					onTextChange={val => setAttributes({ buttonText: val })} />
				{
					enablePostButtonText &&
					<div className="qubely-pricing-postbutton-text">
						<RichText
							value={postButtonText}
							key="editable"
							tagName={'span'}
							keepPlaceholderOnFocus
							placeholder={__('Add Post-Button Text')}
							className="qubely-pricing-post-button-text"
							onChange={val => setAttributes({ postButtonText: val })} />
					</div>
				}
			</div>
		)
	}

	renderPricingTitle = () => {
		const { setAttributes, attributes: { title } } = this.props
		return (
			<Fragment>
				<span className="qubely-pricing-title-wrapper" onClick={() => this.handlePanelOpenings('Title')}>
					<RichText
						value={title}
						key="editable"
						keepPlaceholderOnFocus
						placeholder={__('Add Title...')}
						className="qubely-pricing-title"
						onChange={val => setAttributes({ title: val })} />
				</span>
			</Fragment>
		)
	}

	renderPricingSubTitle = () => {
		const { setAttributes, attributes: { subTitle } } = this.props
		return (
			<div className="qubely-sub-title-wrapper" onClick={() => this.handlePanelOpenings('Sub Title')}>
				<RichText
					value={subTitle}
					key="editable"
					keepPlaceholderOnFocus
					placeholder={__('Add Product Teaser...')}
					className="qubely-sub-title"
					onChange={val => setAttributes({ subTitle: val })} />
			</div>
		)
	}

	renderPricingPrice = () => {
		const { setAttributes, attributes: { currencyPosition, discount, discountPrice, price, enableDuration, durationPosition } } = this.props
		return (
			<div className="qubely-pricing-wrapper" onClick={() => this.handlePanelOpenings('Price')}>
				{currencyPosition == 'before' && this.renderCurrencyContent()}
				<span className="qubely-pricing-price" contenteditable="true" onBlur={(e) => setAttributes({ price: e.target.innerText })}>
					{discount && <strike>{discountPrice}</strike>}
					{price}
				</span>
				{currencyPosition == 'after' && this.renderCurrencyContent()}
				{enableDuration && durationPosition == 'side' && this.renderDuration()}
			</div>
		)
	}

	handlePanelOpenings = (panelName) => {
		const { setAttributes, attributes: { showButtonPanel, showFeaturesPanel } } = this.props
		this.setState({ openPanelSetting: panelName })
		if (panelName == 'Button' || panelName == 'Features') {
			setAttributes(panelName == 'Button' ? { showButtonPanel: true, showFeaturesPanel: false } : { showFeaturesPanel: true, showButtonPanel: false })
		} else if (showButtonPanel || showFeaturesPanel) {
			setAttributes({ showButtonPanel: false, showFeaturesPanel: false })
		}
	}

	handleCardDeletion = () => {
		const { clientId, removeBlock, updateBlockAttributes, rootBlock, rootBlockClientId, rootBlockAttributes, attributes: { id, pricings } } = this.props
		const editorSelector = select('core/editor')
		let updatedRootBlock = getBlock(rootBlockClientId)
		let updatedRootBlockAttributes = editorSelector.getBlockAttributes(rootBlockClientId)

		removeBlock(clientId)
		updateBlockAttributes(rootBlockClientId, Object.assign(updatedRootBlockAttributes, { pricings: updatedRootBlockAttributes.pricings - 1 }))

		let i = 0
		while (i < updatedRootBlock.innerBlocks.length) {
			updateBlockAttributes(updatedRootBlock.innerBlocks[i].clientId,
				Object.assign(updatedRootBlock.innerBlocks[i].attributes,
					{
						id: i >= id ? updatedRootBlock.innerBlocks[i].attributes.id - 1 : updatedRootBlock.innerBlocks[i].attributes.id,
						pricings: updatedRootBlock.innerBlocks[i].attributes.pricings - 1
					}
				)
			)
			i++
		}

	}

	createIterator = () => {
		const { attributes: { pricings } } = this.props
		let iterator = [], index = 0
		while (index < pricings) {
			iterator.push(index)
			index++
		}
		return iterator
	}

	render() {
		const {
			isSelected, clientId, setAttributes,
			attributes: {
				uniqueId, pricings, alignment, titleSpacing, layout,
				// Title 
				title, titleColor, titleTypography,
				//sub title 
				subTitleSpacing, subTitleColor, subTitleTypography,
				// Price
				price, priceColor, priceTypography, discount, discountPrice, discountColor, discountTypography, pricingSpacing,
				// Currency
				currency, currencyCustom, currencyPosition, currencyAlign, currencyColor, currencyTypography,
				// Duration
				enableDuration, duration, durationPosition, durationColor, durationTypography, durationAlign, durationPadding, durationPaddingTop, durationPaddingBottom,
				// Background
				bgColor, bgPadding, bgBorderRadius, bgBorder, bgShadow,
				// features
				enableFeatures, listItems, iconPosition, iconColor, enableListIcons,
				//Header
				headerBg, headerBorder, headerPadding,
				//postButton text
				enablePostButtonText,
				//Badge
				enableBadge, badge, badgeStyle, enableBadgeOverflow, badgeCircleRotation, badgePosition, badgeColor, badgeBg, badgeTypography, badgeRadius, badgeTop, badgeRight, badgeLeft, badgePadding, badgeOverflowPadding, badgeOverflowTop, badgeOverflowLeft, badgeOverflowRight,
			}

		} = this.props

		const { device, openPanelSetting } = this.state
		if (uniqueId) { CssGenerator(this.props.attributes, 'pricing', uniqueId) }

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('')} >
						<Styles value={layout} onChange={val => setAttributes({ layout: val })}
							options={[
								{ value: 1, svg: icons.pricing[1], label: __('Layout 1') },
								{ value: 2, svg: icons.pricing[2], label: __('Layout 2') },
								{ value: 3, svg: icons.pricing[3], label: __('Layout 3') },
								{ value: 4, svg: icons.pricing[4], label: __('Layout 4') },
								{ value: 5, svg: icons.pricing[5], label: __('Layout 5') }
							]}
						/>
						<Toggle
							value={enableFeatures}
							label={__('Show Features')}
							onChange={val => setAttributes({ enableFeatures: val })} />
						<Toggle
							value={enablePostButtonText}
							label={__('Show PostButtonText')}
							onChange={val => setAttributes({ enablePostButtonText: val })} />

						<Alignment
							label={__('Alignment')}
							alignmentType="content"
							value={alignment}
							disableJustify
							onChange={val => setAttributes({ alignment: val })}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Title')} opened={'Title' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Title' ? 'Title' : '')}>
						{title &&
							<Fragment>
								<Color
									label={__('Color')}
									value={titleColor}
									onChange={val => setAttributes({ titleColor: val })} />

								<Range
									label={__('Gap')}
									value={titleSpacing}
									min={0}
									max={100}
									responsive
									device={device}
									unit={['px', 'em', '%']}
									onChange={val => setAttributes({ titleSpacing: val })}
									onDeviceChange={value => this.setState({ device: value })}
								/>

								<Separator />

								<Typography
									value={titleTypography}
									label={__('Typography')}
									onChange={val => setAttributes({ titleTypography: val })}
									device={device}
									onDeviceChange={value => this.setState({ device: value })} />

							</Fragment>
						}
					</PanelBody>

					{(layout == 2 || layout == 3 || layout == 4 || layout == 5) &&
						<PanelBody title={__('Sub Title')} opened={'Sub Title' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Sub Title' ? 'Sub Title' : '')}>
							<Color
								label={__('Color')}
								value={subTitleColor}
								onChange={val => setAttributes({ subTitleColor: val })} />
							<Range
								min={0}
								max={200}
								responsive
								device={device}
								onDeviceChange={value => this.setState({ device: value })}
								value={subTitleSpacing}
								unit={['px', 'em', '%']}
								label={"Gap"}
								onChange={val => setAttributes({ subTitleSpacing: val })} />
							<Separator />
							<Typography
								value={subTitleTypography}
								disableLineHeight
								label={__('Typography')}
								onChange={val => setAttributes({ subTitleTypography: val })}
								device={device}
								onDeviceChange={value => this.setState({ device: value })} />
						</PanelBody>
					}

					<PanelBody title={__('Price')} opened={'Price' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Price' ? 'Price' : '')}>
						<Color
							label={__('Color')}
							value={priceColor}
							onChange={val => setAttributes({ priceColor: val })} />

						<Typography
							label={__('Typography')}
							value={priceTypography}
							onChange={val => setAttributes({ priceTypography: val })}
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />
						<Separator />
						<Toggle
							value={discount}
							label={__('Discount')}
							onChange={val => setAttributes({ discount: val })} />
						{discount &&
							<Fragment>
								<TextControl
									label={__('Original Price')}
									value={discountPrice}
									placeholder={__('Price')}
									onChange={val => setAttributes({ discountPrice: val })} />
								{discountPrice &&
									<Fragment>
										<Color
											label={__('Color')}
											value={discountColor}
											onChange={val => setAttributes({ discountColor: val })} />
										<Typography
											value={discountTypography}
											onChange={val => setAttributes({ discountTypography: val })}
											device={device}
											onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								}
							</Fragment>
						}
						<Separator />
						<Range
							label={__('Gap')}
							value={pricingSpacing}
							min={0}
							max={100}
							responsive
							device={device}
							unit={['px', 'em', '%']}
							onChange={val => setAttributes({ pricingSpacing: val })}
							onDeviceChange={value => this.setState({ device: value })}
						/>
					</PanelBody>

					<PanelBody title={__('Currency')} opened={'Currency' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Currency' ? 'Currency' : '')}>
						<SelectControl
							label={__('Symbol')}
							value={currency}
							options={[
								{ label: __('None'), value: '' },
								{ label: __('$ Dollar'), value: '$' },
								{ label: __('€ Euro'), value: '€' },
								{ label: __('£ Pound Sterling'), value: '£' },
								{ label: __('₣ Franc'), value: '₣' },
								{ label: __('₤ Lira'), value: '₤' },
								{ label: __('ƒ Guilder'), value: 'ƒ' },
								{ label: __('₹ Rupee(Indian)'), value: '₹' },
								{ label: __('฿ Baht'), value: '฿' },
								{ label: __('kr Krona'), value: 'kr' },
								{ label: __('₧ Peseta'), value: '₧' },
								{ label: __('₱ Peso'), value: '₱' },
								{ label: __('₩ Won'), value: '₩' },
								{ label: __('₪ Shekel'), value: '₪' },
								{ label: __('₨ Rupee'), value: '₨' },
								{ label: __('R$ Real'), value: 'R$' },
								{ label: __('₽ Ruble'), value: '₽' },
								{ label: __('¥ Yen/Yuan'), value: '¥' },
								{ label: __('Custom'), value: 'custom' },
							]}
							onChange={val => setAttributes({ currency: val })} />
						{currency == 'custom' &&
							<TextControl
								label={__('Custom Sysmbol')}
								value={currencyCustom}
								placeholder={__('Currency')}
								onChange={val => setAttributes({ currencyCustom: val })} />
						}
						{currency &&
							<Fragment>
								<RadioAdvanced
									label={__('Position')}
									options={[
										{ label: __('Before'), value: 'before', title: __('Before') },
										{ label: __('After'), value: 'after', title: __('After') }
									]}
									value={currencyPosition}
									onChange={val => setAttributes({ currencyPosition: val })} />
								<Range
									min={-100}
									max={100}
									value={currencyAlign}
									label={__('Alignment')}
									onChange={val => setAttributes({ currencyAlign: val })} />
								<Color
									label={__('Color')}
									value={currencyColor}
									onChange={val => setAttributes({ currencyColor: val })} />
								<Separator />
								<Typography
									value={currencyTypography}
									onChange={val => setAttributes({ currencyTypography: val })}
									device={device}
									onDeviceChange={value => this.setState({ device: value })} />

							</Fragment>
						}
					</PanelBody>


					<PanelBody title={__('Duration')} opened={'Duration' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Duration' ? 'Duration' : '')}>
						<Toggle
							value={enableDuration}
							label={__('Enable')}
							onChange={val => setAttributes({ enableDuration: val })}
						/>
						{enableDuration &&
							<Fragment>
								<TextControl
									label={__('Duration')}
									value={duration}
									placeholder={__('Duration')}
									onChange={val => setAttributes({ duration: val })} />

								<RadioAdvanced
									label={__('Position')}
									options={[
										{ label: __('Side'), value: 'side', title: __('Side') },
										{ label: __('Bottom'), value: 'bottom', title: __('Bottom') }
									]}
									value={durationPosition}
									onChange={val => setAttributes({ durationPosition: val })} />

								{durationPosition == 'side' ?
									<Range
										min={-100}
										max={100}
										value={durationAlign}
										label={__('Duration Align')}
										onChange={val => setAttributes({ durationAlign: val })} />
									:
									<Fragment>
										<Padding
											min={0}
											max={100}
											value={durationPadding}
											label={__('Padding')}
											onChange={val => setAttributes({ durationPadding: val })}
											unit={['px', 'em', '%']}
											responsive
											device={device}
											onDeviceChange={value => this.setState({ device: value })}
										/>
									</Fragment>
								}

								<Color
									label={__('Color')}
									value={durationColor}
									onChange={val => setAttributes({ durationColor: val })} />
								<Separator />
								<Typography
									value={durationTypography}
									onChange={val => setAttributes({ durationTypography: val })}
									device={device}
									onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						}
					</PanelBody>

					{layout == 5 &&
						<PanelBody title={__('Header')} opened={'Header' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Header' ? 'Header' : '')}>
							<ColorAdvanced label={__('Background Color')} value={headerBg} onChange={val => setAttributes({ headerBg: val })} />
							<Border
								value={headerBorder}
								label={__('Border')}
								onChange={val => setAttributes({ headerBorder: val })}
								unit={['px', 'em', '%']}
								responsive
								device={device}
								onDeviceChange={value => this.setState({ device: value })}
							/>
							<Padding
								min={30}
								max={100}
								value={headerPadding}
								label={__('Padding')}
								onChange={val => setAttributes({ headerPadding: val })}
								unit={['px', 'em', '%']}
								responsive
								device={device}
								onDeviceChange={value => this.setState({ device: value })}
							/>
						</PanelBody>
					}

					<PanelBody title={__('Background')} initialOpen={false}>
						<ColorAdvanced label={__('Background Color')} value={bgColor} onChange={val => setAttributes({ bgColor: val })} />
						<Border label={__('Border')} value={bgBorder} onChange={val => setAttributes({ bgBorder: val })} min={0} max={10} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<BoxShadow label={__('Box-Shadow')} value={bgShadow} onChange={(value) => setAttributes({ bgShadow: value })} />
						<Padding
							label={__('Padding')}
							value={bgPadding}
							onChange={val => setAttributes({ bgPadding: val })}
							min={0} max={200}
							unit={['px', 'em', '%']}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />
						<BorderRadius label={__('Radius')} value={bgBorderRadius} onChange={(value) => setAttributes({ bgBorderRadius: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Badge')} opened={'Badge' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Badge' ? 'Badge' : '')}>
						<Toggle
							value={enableBadge}
							label={__('Enable')}
							onChange={val => setAttributes({ enableBadge: val })}
						/>

						{enableBadge &&
							<Fragment>
								<Styles value={badgeStyle} onChange={val => setAttributes({ badgeStyle: val })}
									options={[
										{ value: 1, svg: icons.pricing.badge[1], label: __('Style 1') },
										{ value: 2, svg: icons.pricing.badge[2], label: __('Style 2') },
										{ value: 3, svg: icons.pricing.badge[3], label: __('Style 3') },
										{ value: 4, svg: icons.pricing.badge[4], label: __('Style 4') },
										{ value: 5, svg: icons.pricing.badge[5], label: __('Style 5') },
										{ value: 6, svg: icons.pricing.badge[6], label: __('Style 6') },
									]}
								/>

								{ (badgeStyle == 1 || badgeStyle == 2 || badgeStyle == 5 || badgeStyle == 6) &&
									<RadioAdvanced
										label={__('Position')}
										options={[
											{ label: __('Left'), value: 'left', title: __('Left') },
											{ label: __('Right'), value: 'right', title: __('Right') },
										]}
										value={badgePosition}
										onChange={val => setAttributes({ badgePosition: val })}
									/>
								}

								<Color
									label={__('Background color')}
									value={badgeBg}
									onChange={val => setAttributes({ badgeBg: val })}
								/>

								<Color
									label={__('Text color')}
									value={badgeColor}
									onChange={val => setAttributes({ badgeColor: val })}
								/>

								{ badgeStyle == 5 &&
									<BorderRadius
										label={__('Radius')}
										value={badgeRadius}
										onChange={(value) => setAttributes({ badgeRadius: value })}
										min={0}
										max={100}
										unit={['px', 'em', '%']}
										responsive
										device={device}
										onDeviceChange={value => this.setState({ device: value })}
									/>
								}
								<Toggle
									value={enableBadgeOverflow}
									label={__('Overflow')}
									onChange={val => setAttributes({ enableBadgeOverflow: val })} />
								

								<Range
									min={-200}
									max={200}
									value={enableBadgeOverflow ? badgeOverflowTop : badgeTop}
									label={__('Position Top')}
									onChange={val => setAttributes(enableBadgeOverflow ? { badgeOverflowTop: val } : { badgeTop: val })} />
								{badgePosition == 'left' ?
									<Range
										min={-200}
										max={200}
										value={enableBadgeOverflow ? badgeOverflowRight : badgeRight}
										label={__('Right')}
										onChange={val => setAttributes(enableBadgeOverflow ? { badgeOverflowRight: val } : { badgeRight: val })} />
									:
									<Range
										min={-200}
										max={200}
										value={enableBadgeOverflow ? badgeOverflowLeft : badgeLeft}
										label={__('Left')}
										onChange={val => setAttributes(enableBadgeOverflow ? { badgeOverflowLeft: val } : { badgeLeft: val })} />
								}
								<Padding
									label={__('Padding')}
									value={enableBadgeOverflow ? badgeOverflowPadding : badgePadding}
									onChange={val => setAttributes(enableBadgeOverflow ? { badgeOverflowPadding: val } : { badgePadding: val })}
									unit={['px', 'em', '%']}
									max={100}
									min={0}
									responsive
									device={device}
									onDeviceChange={value => this.setState({ device: value })}
								/>
								
								<Typography
									value={badgeTypography}
									disableLineHeight
									onChange={val => setAttributes({ badgeTypography: val })}
									device={device}
									onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						}

					</PanelBody>

				</InspectorControls>

				<BlockControls>
					<Toolbar>
						<InlineToolbar
							data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
							{...this.props}
							prevState={this.state} />

					</Toolbar>
				</BlockControls>

				<div className={`qubely-block-${uniqueId}`} >
					<div className={`qubely-block-pricing`}>
						{enableBadge && <span className={`qubely-pricing-badge qubely-badge-style-${badgeStyle}`} contenteditable="true" onBlur={(e) => setAttributes({ 'badge': e.target.innerText })} onClick={() => this.handlePanelOpenings('Badge')}><span>{badge}</span></span>}
						<div className="qubely-block-pricing-header">
							{this.renderPricingTitle()}

							{(layout == 3 || layout == 4) &&
								this.renderPricingSubTitle()
							}

							{this.renderPricingPrice()}
							{enableDuration && durationPosition == 'bottom' && this.renderDuration()}

							{(layout == 2) &&
								this.renderPricingSubTitle()
							}
						</div>

						{(layout == 4) &&
							this.renderPricingButton()
						}

						{
							enableFeatures &&
							<div ref={this.contextRef} className={`qubely-pricing-features`} onClick={() => this.handlePanelOpenings('Features')}>
								<QubelyIconListEdit
									parentBlock={`qubely-block-${uniqueId}`}
									disableButton={listItems.length > 0 ? true : false}
									buttonText={__('Add New Feature')}
									enableListIcons={enableListIcons}
									listItems={listItems}
									iconColor={iconColor}
									iconPosition={iconPosition}
									listWrapperClassName={`qubely-list icon-position-${iconPosition}`}
									newListItemPlaceHolder={__('Add New Feature')}
									onListItemModification={newValues => setAttributes({ listItems: newValues })}
									onChange={(key, value) => setAttributes({ [key]: value })}
									onIconColorChange={(color, currentListItemIndex) => setAttributes({ iconColor: color })}
								/>
							</div>
						}

						{(layout == 1 || layout == 2 || layout == 3 || layout == 5) &&
							this.renderPricingButton()
						}
					</div>
				</div>
			</Fragment>
		)
	}
}
export default compose([
	withSelect((select, ownProps) => {
		const { clientId } = ownProps
		const { getBlock, getBlockRootClientId, getBlockAttributes } = select('core/editor')
		let block = getBlock(clientId),
			rootBlockClientId = getBlockRootClientId(clientId),
			rootBlock = getBlock(rootBlockClientId),
			rootBlockAttributes = getBlockAttributes(rootBlockClientId)
		return {
			block,
			rootBlock,
			rootBlockClientId,
			rootBlockAttributes
		}
	}),
	withDispatch((dispatch) => {
		const { insertBlock, removeBlock, updateBlockAttributes, toggleSelection } = dispatch('core/editor')
		return {
			insertBlock,
			removeBlock,
			updateBlockAttributes,
			toggleSelection
		}
	}),
])(Edit)
