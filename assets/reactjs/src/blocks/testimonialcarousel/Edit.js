const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody } = wp.components
const { InspectorControls, RichText, MediaUpload } = wp.editor
import { CssGenerator } from '../../components/CssGenerator'
import icons from '../../helpers/icons'
import {
	Media,
	RadioAdvanced,
	Range,
	Color,
	Typography,
	Toggle,
	Separator,
	ColorAdvanced,
	Border,
	BorderRadius,
	BoxShadow,
	Styles,
	Alignment,
	Padding,
	Tabs,
	Tab,
	Carousel,
	ButtonGroup
} from '../../components/FieldRender'


class Edit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			device: 'md',
			spacer: true,
			openPanelSetting: ''
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

	changePluginAttribute = (key, value) => {
		this.setState({
			key: key,
			value: value
		})
		this.props.setAttributes({ [key]: value })
	}

	updateAtrributes = (name, value, index) => {
		const { setAttributes, attributes: { carouselItems } } = this.props
		let updatedAttributes = carouselItems.map((data, itemIndex) => {
			if (index === itemIndex) {
				return { ...data, [name]: value }
			} else {
				return data
			}
		})
		setAttributes({ carouselItems: updatedAttributes })
	}

	renderName = (name, index) => {
		return (
			<RichText
				key="editable"
				keepPlaceholderOnFocus
				placeholder={__('Add Name...')}
				formattingControls={['bold', 'italic', 'link', 'strikethrough']}
				onChange={value => this.updateAtrributes('author', value, index)}
				value={name}
			/>
		)
	}
	renderDesignation = (designation, index) => {
		return (
			<RichText
				key="editable"
				placeholder={__('Add designation...')}
				formattingControls={['bold', 'italic', 'link', 'strikethrough']}
				keepPlaceholderOnFocus
				onChange={value => this.updateAtrributes('designation', value, index)}
				value={designation}
			/>
		)
	}
	renderAvatar = (avatar, index) => {
		const { attributes: { avatarAlt } } = this.props
		return (
			<MediaUpload
				onSelect={val => this.updateAtrributes('avatar', val, index)}
				allowedTypes={['image']}
				multiple={false}
				value={avatar}
				render={({ open }) => (
					<div className="qubely-single-img">
						{
							(avatar && avatar.url) ?
								<img onClick={open} className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} />
								:
								<div onClick={open} className="qubely-image-placeholder qubely-testimonial-avatar" ><i className="far fa-user"></i></div>
						}
					</div>
				)}
			/>

		)
	}
	renderMessage = (message, index) => {
		return (
			<RichText
				key="editable"
				placeholder={__('Add Message...')}
				formattingControls={['bold', 'italic', 'link', 'strikethrough']}
				keepPlaceholderOnFocus
				onChange={value => this.updateAtrributes('message', value, index)}
				value={message}
			/>
		)
	}
	renderAuthorInfo = (item, index) => {
		const { attributes: { layout, showAvatar, avatarLayout } } = this.props
		const { author, designation, avatar } = item
		return (
			<div className={`qubely-testimonial-author`}>
				{(layout === 3 && showAvatar) && this.renderAvatar(avatar, index)}

				<div className={showAvatar ? `qubely-testimonial-avatar-layout-${avatarLayout}` : ``}>
					{(layout !== 3 && showAvatar && (avatarLayout == 'left' || avatarLayout == 'top')) && this.renderAvatar(avatar, index)}

					<div className="qubely-testimonial-author-info">
						<div className="qubely-testimonial-author-name" >{this.renderName(author, index)}</div>
						<div className="qubely-testimonial-author-designation" >{this.renderDesignation(designation, index)}</div>
					</div>

					{(layout !== 3 && showAvatar && (avatarLayout == 'right' || avatarLayout == 'bottom')) && this.renderAvatar(avatar, index)}
				</div>
			</div>
		)
	}

	renderTestimonials = () => {
		const { attributes: { layout, showRatings, carouselItems, quoteIcon, ratings } } = this.props


		return (
			carouselItems.map((item, index) => {
				const { message } = item

				return (
					<div key={index} className="js-item" >
						<div className={`qubely-tesitmonial-item layout-${layout}`}>

							{layout === 2 && this.renderAuthorInfo(item, index)}

							{
								(quoteIcon && layout === 1) && <div className="qubely-testimonial-quote" >
									<span className={`qubely-quote-icon ${quoteIcon}`}></span>
								</div>
							}

							{/* showRatings,ratings */}
							<div className={`qubely-testimonial-carousel-content-wrapper`}>
								{	
									( showRatings && ratings > 0 && layout !== 1 ) && 
									<div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>
								}

								<div className="qubely-testimonial-content" >
									{this.renderMessage(message, index)}
								</div>
								{(showRatings && ratings > 0 && layout == 1) && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>}
							</div>
							{layout !== 2 && this.renderAuthorInfo(item, index)}
							{
								(quoteIcon && layout == 2) &&
								<div className="qubely-testimonial-quote qubely-position-bottom" >
									<span className={`qubely-quote-icon ${quoteIcon}`}></span>
								</div>
							}
						</div>
					</div>
				)
			})
		)

	}


	render() {
		const { setAttributes, attributes: {
			uniqueId, items, autoPlay, interval, speed, dots, nav, carouselItems, dragable,
			layout, messageSpacingTop, messageSpacingBottom, nameColor, alignment, designationColor,
			showAvatar, avatar, avatarAlt, avatarBorderRadius, avatarSize, avatarWidth, avatarHeight,
			avatarBorder, avatarSpacing, avatarLayout, quoteIconColor, quoteIconSize, quoteIconSpacing,
			nameTypo, nameSpacing, messageTypo, designationTypo, starsSize, ratingsColor, quoteIcon, ratings, showRatings,
			ratingsSpacing, bgPadding, textColor, bgColor, bgBorderRadius, border, boxShadow, boxShadowHover,

			sliderNumber, itemPerSlides, sliderItemsSpace,
			infiniteLoop, centeredSlider, activeFade,
			// arrow 
			arrowStyle, arrowPosition,
			cornerRadius, arrowSize,
			arrowColor, arrowShapeColor, arrowBorderColor,
			arrowHoverColor, arrowShapeHoverColor, arrowBorderHoverColor,
			// Dot
			dotSize, dotColor, dotBorderColor, dotActiveColor, dotBorderActiveColor, horizontalScroll

		} } = this.props
		const { device } = this.state
		const options = {
			autoplay: false,
			items: items,
			sliderNumber: sliderNumber,
			margin: 10,
			center: false,
			dots: dots,
			dot_indicator: true,
			nav: nav,
			arrowStyle: arrowStyle,
			arrowPosition: arrowPosition,
			speed: speed,
			interval: interval,
			responsive: [
				{
					viewport: 1170,
					items: items.md
				},
				{
					viewport: 980,
					items: items.sm
				},
				{
					viewport: 580,
					items: items.xs
				}
			],
		};

		if (uniqueId) { CssGenerator(this.props.attributes, 'testimonialcarousel', uniqueId) }

		return (
			<Fragment>
				<InspectorControls key="inspector">
					{/* Testimonial Layout */}
					<PanelBody title="Testimonial Layout" initialOpen={false}>
						<Styles value={layout} onChange={val => setAttributes({ layout: val })}
							options={[
								{ value: 1, svg: icons.testimonial_1, label: __('Layout 1') },
								{ value: 2, svg: icons.testimonial_2, label: __('Layout 2') },
								{ value: 3, svg: icons.testimonial_2, label: __('Layout 3') }
							]}
						/>
						<Alignment
							label={__('Alignment')}
							value={alignment}
							alignmentType="content"
							onChange={val => setAttributes({ alignment: val })}
							alignmentType="content" disableJustify responsive device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<Range
							label={__('Number of slides')}
							value={sliderNumber}
							onChange={(value) => setAttributes({ sliderNumber: value })}
							min={1}
							max={20}
							device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<Range
							label={__('Items per Slides')}
							value={itemPerSlides} onChange={(value) => setAttributes({ itemPerSlides: value })}
							min={1}
							device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<Range
							label={__('Space Between Each items')}
							value={sliderItemsSpace} onChange={(value) => setAttributes({ sliderItemsSpace: value })}
							min={1}
							max={80}
							device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<Range label={__('Columns')}
							value={items}
							onChange={(value) => setAttributes({ items: value })}
							min={1}
							max={carouselItems.length - 1}
							responsive device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
					</PanelBody>
					{/* End */}

					{/* Carousel Settings */}
					<PanelBody title={__('Carousel Settings')} initialOpen={false}>
						<Toggle label={__('Autoplay')} value={autoPlay} onChange={value => setAttributes({ autoPlay: value })} />
						{autoPlay &&
							<Fragment>
								<Range label={__('Speed (ms)')} value={speed} onChange={value => setAttributes({ speed: parseInt(value) })} min={500} max={5000} />
								<Range label={__('Interval (ms)')} value={interval} onChange={value => setAttributes({ interval: parseInt(value) })} min={500} max={5000} />
							</Fragment>
						}
						<Toggle label={__('Infinite Loop')} value={infiniteLoop} onChange={value => setAttributes({ infiniteLoop: value })} />
						<Toggle label={__('Centered Slides')} value={centeredSlider} onChange={value => setAttributes({ centeredSlider: value })} />
						<Toggle label={__('Fade Deactivated Items')} value={activeFade} onChange={value => setAttributes({ activeFade: value })} />
						<Toggle label={__('Draggable')} value={dragable} onChange={value => setAttributes({ dragable: value })} />
					</PanelBody>
					{/* End */}

					{/* Slider Settings */}
					<PanelBody title={__('Slider Settings')} initialOpen={false}>
						<Toggle label={__('Show Arrow Navigation')} value={nav} onChange={value => setAttributes({ nav: value })} />
						<ButtonGroup
							label={__('Arrow Style')}
							options={[[<span className="dashicons dashicons-arrow-right-alt"></span>, 'arrowright'], [<span className="dashicons dashicons-arrow-right-alt2"></span>, 'arrowright2']]}
							value={arrowStyle}
							onChange={value => setAttributes({ arrowStyle: value })}
						/>
						<Range
							label={__('Horizontal Scroll')}
							value={horizontalScroll} onChange={(value) => setAttributes({ horizontalScroll: value })}
							min={1}
							max={100}
							device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<ButtonGroup
							label={__('Vertical Position')}
							options={[[__('Center'), 'center'], [__('Buttom'), 'buttom']]}
							value={arrowPosition}
							onChange={value => setAttributes({ arrowPosition: value })}
						/>
						<Range
							label={__('Arrow Size')}
							value={arrowSize} onChange={(value) => setAttributes({ arrowSize: value })}
							min={1}
							max={65}
							device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<Range
							label={__('Corner Radius')}
							value={cornerRadius} onChange={(value) => setAttributes({ cornerRadius: value })}
							min={1}
							max={100}
							device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<Tabs>
							<Tab tabTitle={__('Normal')}>
								<Color label={__('Arrow Color')} value={arrowColor} onChange={(value) => setAttributes({ arrowColor: value })} />
								<ColorAdvanced label={__('Shape Color')} value={arrowShapeColor} onChange={val => setAttributes({ arrowShapeColor: val })} />
								<Border label={__('Border')} value={arrowBorderColor} onChange={val => setAttributes({ arrowBorderColor: val })} />
							</Tab>
							<Tab tabTitle={__('Hover')}>
								<Color label={__('Arrow Hover Color')} value={arrowHoverColor} onChange={(value) => setAttributes({ arrowHoverColor: value })} />
								<ColorAdvanced label={__('Shape Hover Color')} value={arrowShapeHoverColor} onChange={val => setAttributes({ arrowShapeHoverColor: val })} />
								<Border label={__('Border Hover Color')} value={arrowBorderHoverColor} onChange={val => setAttributes({ arrowBorderHoverColor: val })} />
							</Tab>
						</Tabs>

						<Toggle label={__('Show Dot Navigation')} value={dots} onChange={value => setAttributes({ dots: value })} />

						<Range 
							label={__('Dot Size')}
							value={dotSize} onChange={(value) => setAttributes({ dotSize: value })}
							min={1}
							max={100}
							device={device}
							onDeviceChange={value => this.setState({ device: value })}
						/>
						<Tabs>
							<Tab tabTitle={__('Normal')}>
								<ColorAdvanced label={__('Dot Color')} value={dotColor} onChange={val => setAttributes({ dotColor: val })} />
								<Border label={__('Border Color')} value={dotBorderColor} onChange={value => setAttributes({ dotBorderColor: value })} />
							</Tab>
							<Tab tabTitle={__('Active')}>
								<ColorAdvanced label={__('Dot Active Color')} value={dotActiveColor} onChange={val => setAttributes({ dotActiveColor: val })} />
								<Border label={__('Border Active Color')} value={dotBorderActiveColor} onChange={value => setAttributes({ dotBorderActiveColor: value })} />
							</Tab>
						</Tabs>
					</PanelBody>

					<PanelBody title={__('Message')} initialOpen={false}>
						<Range
							label={__('Top Spacing')}
							value={messageSpacingTop} onChange={(value) => setAttributes({ messageSpacingTop: value })}
							unit={['px', 'em', '%']} max={300}
							min={0}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />
						<Range
							label={__('Bottom Spacing')}
							value={messageSpacingBottom} onChange={(value) => setAttributes({ messageSpacingBottom: value })}
							unit={['px', 'em', '%']} max={300}
							min={0}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />
						<Typography
							label={__('Typography')}
							value={messageTypo}
							onChange={(value) => setAttributes({ messageTypo: value })}
							device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Name')} initialOpen={false}>
						<Range
							label={__('Spacing')}
							value={nameSpacing} onChange={(value) => setAttributes({ nameSpacing: value })}
							unit={['px', 'em', '%']} max={300}
							min={0}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />
						<Color
							label={__('Color')}
							value={nameColor} onChange={(value) => setAttributes({ nameColor: value })}
						/>
						<Typography
							label={__('Typography')}
							value={nameTypo}
							onChange={(value) => setAttributes({ nameTypo: value })}
							device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Designation')} initialOpen={false}>
						<Color
							label={__('Color')}
							value={designationColor} onChange={(value) => setAttributes({ designationColor: value })}
						/>
						<Typography
							label={__('Typography')}
							value={designationTypo}
							onChange={(value) => setAttributes({ designationTypo: value })}
							device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Avatar')} initialOpen={false}>
						<Toggle label={__('Show Avatar')} value={showAvatar} onChange={val => setAttributes({ showAvatar: val })} />
						{showAvatar && 
							<Fragment>

								{layout != 3 && 
									<Fragment>
										<Styles label={__('Avatar Layout')} value={avatarLayout} onChange={val => setAttributes({ avatarLayout: val })}
											options={[
												{ value: 'left', svg: icons.avatar_left, label: __('Left') },
												{ value: 'right', svg: icons.avatar_right, label: __('Right') },
												{ value: 'top', svg: icons.avatar_top, label: __('Top') },
												{ value: 'bottom', svg: icons.avatar_bottom, label: __('Bottom') },
											]}
										/>
										<Separator />
									</Fragment>
								}

								<RadioAdvanced
									label={__('Avatar Size')}
									options={[
										{ label: 'S', value: '48px', title: 'Small' },
										{ label: 'M', value: '64px', title: 'Medium' },
										{ label: 'L', value: '96px', title: 'Large' },
										{ icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
									]}
									value={avatarSize}
									onChange={(value) => setAttributes({ avatarSize: value })}
								/>
								{avatarSize == 'custom' &&
									<Fragment>
										<Range
											label={<span className="dashicons dashicons-leftright" title="Width" />}
											value={avatarWidth}
											onChange={(value) => setAttributes({ avatarWidth: value })}
											unit={['px', 'em', '%']}
											max={300}
											min={0}
											responsive
											device={device}
											onDeviceChange={value => this.setState({ device: value })}
										/>
										<Range
											label={<span className="dashicons dashicons-sort" title="Height" />}
											value={avatarHeight}
											onChange={(value) => setAttributes({ avatarHeight: value })}
											unit={['px', 'em', '%']}
											max={300}
											min={0}
											responsive
											device={device}
											onDeviceChange={value => this.setState({ device: value })}
										/>
									</Fragment>
								}
								<Fragment>
									<BorderRadius
										label={__('Radius')}
										value={avatarBorderRadius} onChange={(value) => setAttributes({ avatarBorderRadius: value })}
										min={0}
										max={100}
										unit={['px', 'em', '%']}
										responsive
										device={device}
										onDeviceChange={value => this.setState({ device: value })} />
									<Border
										label={__('Border')}
										value={avatarBorder}
										onChange={(value) => setAttributes({ avatarBorder: value })}
										unit={['px', 'em', '%']}
										responsive
										device={device}
										onDeviceChange={value => this.setState({ device: value })}
									/>
									<Range
										label={__('Spacing')}
										value={avatarSpacing}
										onChange={(value) => setAttributes({ avatarSpacing: value })}
										min={0}
										max={200}
										unit={['px', 'em', '%']}
										responsive
										device={device}
										onDeviceChange={value => this.setState({ device: value })} />
								</Fragment>
							</Fragment>
						}

					</PanelBody>

					<PanelBody title={__('Quote Icon')} initialOpen={false}>
						<RadioAdvanced
							label={__('Icon')}
							options={[
								{ icon: 'fas fa-ban', value: '' },
								{ icon: 'fas fa-quote-left', value: 'fas fa-quote-left' }
							]}
							value={quoteIcon}
							onChange={val => setAttributes({ quoteIcon: val })} />
						{quoteIcon &&
							<Fragment>
								<Color
									label={__('Color')}
									value={quoteIconColor} onChange={(value) => setAttributes({ quoteIconColor: value })} />
								<Range
									label={__('Size')}
									value={quoteIconSize} onChange={(value) => setAttributes({ quoteIconSize: value })}
									min={10}
									max={150}
									unit={['px', 'em', '%']}
									responsive
									device={device}
									onDeviceChange={value => this.setState({ device: value })}
								/>
								<Range
									label={__('Spacing')}
									value={quoteIconSpacing} onChange={(value) => setAttributes({ quoteIconSpacing: value })}
									min={0}
									max={100}
									unit={['px', 'em', '%']}
									responsive
									device={device}
									onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						}
					</PanelBody>

					<PanelBody title={__('Ratings')} initialOpen={false}>
						<Toggle label={__('Show Ratings')} value={showRatings} onChange={val => setAttributes({ showRatings: val })} />

						{showRatings &&
							<Fragment>
								<Range label={__('Ratings')} value={ratings} onChange={(value) => setAttributes({ ratings: value })} min={0} max={5} step={.5} />
								{ (ratings != 0) &&
									<Fragment>
										<Color
											label={__('Color')}
											value={ratingsColor}
											onChange={(value) => setAttributes({ ratingsColor: value })} />
										<Range
											label={__('Stars Size')}
											value={starsSize} onChange={(value) => setAttributes({ starsSize: value })}
											unit={['px', 'em', '%']}
											min={10}
											max={48}
											responsive
											device={device}
											onDeviceChange={value => this.setState({ device: value })} />
										<Range
											label={__('Spacing')}
											value={ratingsSpacing} onChange={(value) => setAttributes({ ratingsSpacing: value })}
											unit={['px', 'em', '%']}
											min={0}
											max={200}
											responsive
											device={device}
											onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								}
							</Fragment>
						}
					</PanelBody>

					<PanelBody title={__('Design')} initialOpen={false}>
						<Color
							label={__('Text Color')}
							value={textColor}
							onChange={val => setAttributes({ textColor: val })} />

						<Color
							label={__('Background')}
							value={bgColor}
							onChange={val => setAttributes({ bgColor: val })} />
						<Separator />
						<Border
							label={__('Border')}
							value={border}
							onChange={val => setAttributes({ border: val })} />
						<Padding
							label={__('Padding')}
							value={bgPadding} onChange={(value) => setAttributes({ bgPadding: value })}
							unit={['px', 'em', '%']}
							min={0}
							max={100}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />

						<BorderRadius
							label={__('Border Radius')}
							value={bgBorderRadius}
							onChange={val => setAttributes({ bgBorderRadius: val })}
							min={0}
							max={100}
							unit={['px', 'em', '%']}
							responsive
							device={device}
							onDeviceChange={value => this.setState({ device: value })} />

						<Tabs>
							<Tab tabTitle={__('Normal')}>
								<BoxShadow
									label={__('Box Shadow')}
									value={boxShadow} onChange={val => setAttributes({ boxShadow: val })}
								/>
							</Tab>
							<Tab tabTitle={__('Hover')}>
								<BoxShadow
									label={__('Box Shadow')}
									value={boxShadowHover} onChange={val => setAttributes({ boxShadowHover: val })}
								/>
							</Tab>
						</Tabs>
					</PanelBody>
				</InspectorControls>
				{/* Siderbar End */}

				<div className={`qubely-block-${uniqueId}`}>
					<div className={`qubely-block-testimonial-carousel qubely-layout-${layout}`}>
						<Carousel ref="JsSlider" options={options} 	>
							{this.renderTestimonials()}
						</Carousel>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default Edit