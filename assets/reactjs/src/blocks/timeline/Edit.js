const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, Tooltip, Toolbar } = wp.components
const { InspectorControls, RichText, BlockControls, MediaUpload } = wp.blockEditor
const { IconList, Inline: { InlineToolbar }, RadioAdvanced, Range, Color, Typography, Toggle, Separator, Border, BorderRadius, BoxShadow, Alignment, Padding, Headings, gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, CssGenerator: { CssGenerator } } = wp.qubelyComponents

class Edit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			device: 'md',
			spacer: true,
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

	updateTimelineContent = (key, value, index) => {
		const { setAttributes, attributes: { timelineItems, timelineContents } } = this.props
		if (key === 'add' || key === 'delete') {
			let updatedAttributes = key === 'add' ? [...timelineContents, { title: 'Timeline Block', date: 'January 1, 2021', description: 'Include detailed timelines for your products, company, etc with Qubely Timeline.' }] : timelineContents.slice(0, timelineItems - 1)
			setAttributes({
				timelineContents: updatedAttributes,
				timelineItems: key === 'add' ? timelineItems + 1 : timelineItems - 1
			})
		} else {
			let updatedAttributes = timelineContents.map((data, itemIndex) => {
				if (index === itemIndex) {
					return { ...data, [key]: value }
				} else {
					return data
				}
			})
			setAttributes({ timelineContents: updatedAttributes })
		}

	}

	removeItem = (index) => {
		const { setAttributes, attributes: { timelineContents, timelineItems } } = this.props
		let newTimelineContents = JSON.parse(JSON.stringify(timelineContents))
		newTimelineContents.splice(index, 1)
		setAttributes({ timelineContents: newTimelineContents, timelineItems: timelineItems - 1 })
	}

	renderTimeline = () => {
		const { attributes: { timelineContents, enableContentBorder, headingLevel, enableDateTime, enableImage, connectorIcon } } = this.props
		const titleTagName = 'h' + headingLevel;
		return (timelineContents.map(({ title, date, description, image }, index) => {

			return (
				<div key={index} className={`qubely-timeline-item qubely-timeline-${index % 2 ? 'right' : 'left'}`}>
					<div className="qubely-timeline-connector">
						{connectorIcon != '' &&
							<span className={'qubely-timeline-connector-icon ' + connectorIcon} />
						}
					</div>
					<div className={`qubely-timeline-content${enableContentBorder == 1 ? ' qubely-content-has-border' : ''}`}>

						{enableImage == 1 &&
							<div className={`qubely-timeline-image-container${(image != undefined && image.url != undefined) ? '' : ' qubely-empty-image'}`}>
								<MediaUpload
									onSelect={value => this.updateTimelineContent('image', value, index)}
									allowedTypes={['image']}
									multiple={false}
									value={image}
									render={({ open }) => (
										<Fragment>
											{(image != undefined && image.url != undefined) ?
												<div className="qubely-timeline-content-image-editor">
													<img src={image.url} alt={__('image')} />
													<div className="qubely-media-actions qubely-field-button-list">
														<Tooltip text={__('Edit')}>
															<button className="qubely-button" aria-label={__('Edit')} onClick={open} role="button">
																<span aria-label={__('Edit')} className="fas fa-pencil-alt fa-fw"/>
															</button>
														</Tooltip>
														<Tooltip text={__('Remove')}>
															<button className="qubely-button" aria-label={__('Remove')} onClick={() => this.updateTimelineContent('image', '', index)} role="button">
																<span aria-label={__('Close')} className="far fa-trash-alt fa-fw"/>
															</button>
														</Tooltip>
													</div>
												</div>
												:
												<a className="qubely-insert-image" href="#" onClick={open}>
													<svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-insert" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"></path></svg>
													<span>{__('Insert')}</span>
												</a>
											}
										</Fragment>
									)}
								/>
							</div>
						}

						<div className="qubely-timeline-description">
							<RichText
								placeholder={__('Add title')}
								tagName={titleTagName}
								className="qubely-timeline-title"
								value={title}
								onChange={value => this.updateTimelineContent('title', value, index)}
								keepPlaceholderOnFocus
							/>
							<RichText
								placeholder={__('Add description')}
								tagName='div'
								className="qubely-timeline-description"
								value={description}
								onChange={value => this.updateTimelineContent('description', value, index)}
								keepPlaceholderOnFocus
							/>
						</div>

						<Tooltip text={__('Delete this item')}>
							<span className="qubely-action-timeline-remove" role="button" onClick={() => this.removeItem(index)}>
								<i className="fas fa-times"/>
							</span>
						</Tooltip>

					</div>
					{enableDateTime == 1 &&
						<div className="qubely-timeline-date-container">
							<RichText
								placeholder={__('Add Date')}
								tagName='div'
								className="qubely-timeline-date"
								value={date}
								onChange={value => this.updateTimelineContent('date', value, index)}
								keepPlaceholderOnFocus
							/>
						</div>
					}
				</div>
			)
		}))
	}

	render() {
		const {
			name,
			isSelected,
			setAttributes,
			attributes: {
				uniqueId,
				className,
				timelineItems,

				orientation,
				horizontalSpacing,
				verticalSpacing,

				headingLevel,
				headingTypography,
				headingColor,
				headingSpacing,

				contentBg,
				contentColor,
				contentTypography,
				enableContentBorder,
				contentBorderWidth,
				contentBorderColor,
				contentPadding,
				contentBorderRadius,
				contentBoxShadow,

				enableDateTime,
				enableDateTimeTypography,
				enableDateTimeColor,

				enableImage,
				imagePosition,
				imageBorderRadius,
				imageSpacing,

				connectorSize,
				connectorColor,
				connectorBorder,
				connectorBoxShadow,
				connectorBorderRadius,
				connectorIcon,
				connectorIconSize,
				connectorIconColor,
				connectorBarWidth,
				connectorBarColor,

				//animation
				animation,
                globalZindex,
                enablePosition, 
                selectPosition, 
                positionXaxis, 
                positionYaxis,
				hideTablet,
				hideMobile,
				globalCss,
				interaction
			} } = this.props

		const { device } = this.state

		if (uniqueId) { CssGenerator(this.props.attributes, 'timeline', uniqueId) }

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('Timeline Settings')}>
						<Range
							min={2}
							max={100}
							label={__('Number of Items')}
							value={timelineItems}
							onChange={value => this.updateTimelineContent(value > timelineItems ? 'add' : 'delete')}
						/>
						<Alignment label={__('Orientation')} value={orientation} onChange={val => setAttributes({ orientation: val })} alignmentType="content" disableJustify />
					</PanelBody>

					<PanelBody title={__('Spacing')} initialOpen={false}>
						<Range label={__('Horizontal Spacing')} value={horizontalSpacing} onChange={val => setAttributes({ horizontalSpacing: val })} min={0} max={100} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Range label={__('Vertical Spacing')} value={verticalSpacing} onChange={val => setAttributes({ verticalSpacing: val })} min={0} max={100} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Content')} initialOpen={false}>
						<Color label={__('Background Color')} value={contentBg} onChange={(value) => setAttributes({ contentBg: value })} />
						<Toggle label={__('Enable Border')} value={enableContentBorder} onChange={val => setAttributes({ enableContentBorder: val })} />
						{enableContentBorder == 1 &&
							<Fragment>
								<Range label={__('Border Width')} value={contentBorderWidth} onChange={val => setAttributes({ contentBorderWidth: val })} min={1} max={5} responsive device={device} unit={['px']} onDeviceChange={value => this.setState({ device: value })} />
								<Color label={__('Border Color')} value={contentBorderColor} onChange={(value) => setAttributes({ contentBorderColor: value })} />
								<Separator />
							</Fragment>
						}
						<BorderRadius label={__('Radius')} value={contentBorderRadius} onChange={val => setAttributes({ contentBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Padding label={__('Padding')} value={contentPadding} onChange={val => setAttributes({ contentPadding: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<BoxShadow label={__('Box-Shadow')} value={contentBoxShadow} onChange={val => setAttributes({ contentBoxShadow: val })} disableInset />
						<Separator />
						<Headings label={__('Heading Tag')} selectedLevel={headingLevel} onChange={(value) => setAttributes({ headingLevel: value })} />
						<Typography label={__('Heading Typography')} value={headingTypography} onChange={val => setAttributes({ headingTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Color label={__('Heading Color')} value={headingColor} onChange={(value) => setAttributes({ headingColor: value })} />
						<Range label={__('Heading Spacing')} value={headingSpacing} onChange={val => setAttributes({ headingSpacing: val })} min={0} max={100} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Separator />
						<Color label={__('Content Color')} value={contentColor} onChange={(value) => setAttributes({ contentColor: value })} />
						<Typography label={__('Content Typography')} value={contentTypography} onChange={val => setAttributes({ contentTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Separator />
						<Toggle label={__('Enable Date/Time')} value={enableDateTime} onChange={val => setAttributes({ enableDateTime: val })} />
						{enableDateTime == 1 &&
							<Fragment>
								<Typography label={__('Date/Time Typography')} value={enableDateTimeTypography} onChange={val => setAttributes({ enableDateTimeTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Color label={__('Date/Time Color')} value={enableDateTimeColor} onChange={(value) => setAttributes({ enableDateTimeColor: value })} />
							</Fragment>
						}
					</PanelBody>

					<PanelBody title={__('Image')} initialOpen={false}>
						<Toggle label={__('Enable')} value={enableImage} onChange={val => setAttributes({ enableImage: val })} />
						{enableImage == 1 &&
							<Fragment>
								<RadioAdvanced label={__('Position')} value={imagePosition} onChange={(value) => setAttributes({ imagePosition: value })}
									options={[
										{ label: __('Before'), value: 'before', title: __('Before') },
										{ label: __('After'), value: 'after', title: __('After') }
									]}
								/>
								<BorderRadius label={__('Radius')} value={imageBorderRadius} onChange={val => setAttributes({ imageBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Range label={__('Spacing')} value={imageSpacing} onChange={val => setAttributes({ imageSpacing: val })} min={0} max={100} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						}
					</PanelBody>

					<PanelBody title={__('Connector')} initialOpen={false}>
						<Color label={__('Color')} value={connectorColor} onChange={(value) => setAttributes({ connectorColor: value })} />
						<Range label={__('Size')} value={connectorSize} onChange={val => setAttributes({ connectorSize: val })} min={16} max={64} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Border label={__('Border')} value={connectorBorder} onChange={val => setAttributes({ connectorBorder: val })} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<BoxShadow label={__('Box-Shadow')} value={connectorBoxShadow} onChange={val => setAttributes({ connectorBoxShadow: val })} disableInset />
						<BorderRadius label={__('Radius')} value={connectorBorderRadius} onChange={val => setAttributes({ connectorBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Separator />
						<IconList label={__('Icon')} value={connectorIcon} onChange={val => setAttributes({ connectorIcon: val })} />
						<Range label={__('Icon Size')} value={connectorIconSize} onChange={val => setAttributes({ connectorIconSize: val })} min={16} max={64} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Color label={__('Icon Color')} value={connectorIconColor} onChange={(value) => setAttributes({ connectorIconColor: value })} />
						<Separator />
						<Range label={__('Bar Width')} value={connectorBarWidth} onChange={val => setAttributes({ connectorBarWidth: val })} min={2} max={20} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Color label={__('Bar Color')} value={connectorBarColor} onChange={(value) => setAttributes({ connectorBarColor: value })} />
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

				<div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
					<div className={`qubely-block-timeline qubely-timeline-layout-vertical qubely-timeline-orientation-${orientation}`}>
						<div className={`qubely-timeline-items`}>
							{this.renderTimeline()}
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default Edit
