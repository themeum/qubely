const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { withSelect } = wp.data
const { dateI18n, __experimentalGetSettings } = wp.date
const { addQueryArgs } = wp.url
const { RangeControl, PanelBody, Toolbar, Spinner, TextControl, SelectControl } = wp.components;
const { InspectorControls, BlockControls } = wp.blockEditor
const { Range, ButtonGroup, Inline: { InlineToolbar }, Toggle, Dropdown, Select, Separator, ColorAdvanced, Typography, Color, Border, BorderRadius, Padding, BoxShadow, Styles, Tabs, Tab, RadioAdvanced, gloalSettings: { globalSettingsPanel, animationSettings }, CssGenerator: { CssGenerator }, ContextMenu: { ContextMenu, handleContextMenu }, } = wp.qubelyComponents
import icons from '../../helpers/icons'


const CATEGORIES_LIST_QUERY = { per_page: -1 };

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			device: 'md',
			spacer: true,
			categoriesList: [],
		};
	}

	componentDidMount() {
		const { setAttributes, clientId, attributes: { uniqueId } } = this.props
		this.isStillMounted = true;
		this.fetchRequest = wp.apiFetch({
			path: addQueryArgs(`/wp/v2/categories`, CATEGORIES_LIST_QUERY),
		}).then(
			(categoriesList) => {
				if (this.isStillMounted) {
					this.setState({ categoriesList });
				}
			}
		).catch(
			() => {
				if (this.isStillMounted) {
					this.setState({ categoriesList: [] });
				}
			}
		);
		const _client = clientId.substr(0, 6)
		if (!uniqueId) {
			setAttributes({ uniqueId: _client });
		} else if (uniqueId && uniqueId != _client) {
			setAttributes({ uniqueId: _client });
		}
	}
	componentWillUnmount() {
		this.isStillMounted = false;
	}
	truncate(value, limit) {
		if (value.split(' ').length > limit) {
			return value.split(' ').splice(0, limit).join(' ');
		}
		return value;
	}

	renderFeaturedImage = (post) => {
		const { attributes: { layout, style, imgSize, imageAnimation, showCategory, categoryPosition } } = this.props
		return (
			<div className={`${layout === 1 ? 'qubely-post-list-img' : 'qubely-post-grid-img'} qubely-post-img qubely-post-img-${imageAnimation}`}>
				<img className="qubely-post-image" src={post.qubely_featured_image_url && post.qubely_featured_image_url[imgSize][0]} />
				{
					(showCategory == 'badge' && style !== 4) &&
					<div className={`qubely-postgrid-cat-position qubely-postgrid-cat-position-${categoryPosition}`}>
						<span className="qubely-postgrid-category qubely-backend" dangerouslySetInnerHTML={{ __html: post.qubely_category }} />
					</div>
				}
			</div>
		)
	}

	renderCardContent = (post) => {
		const { attributes: { layout, style, readmoreStyle, showCategory, categoryPosition, showTitle, titlePosition, showAuthor, showDates, showComment, showExcerpt, excerptLimit, showReadMore, buttonText, readmoreSize } } = this.props
		let title = <h3 className="qubely-postgrid-title"><a>{post.title.rendered}</a></h3>

		return (
			<div className={`${layout === 1 ? 'qubely-post-list-content' : 'qubely-post-grid-content'}`}>
				{(showCategory === 'default') && <span className="qubely-postgrid-category qubely-backend" dangerouslySetInnerHTML={{ __html: post.qubely_category }} />}

				{
					(showCategory == 'badge' && style === 4) &&
					<div className={`qubely-postgrid-cat-position qubely-postgrid-cat-position-${categoryPosition}`}>
						<span className="qubely-postgrid-category qubely-backend" dangerouslySetInnerHTML={{ __html: post.qubely_category }} />
					</div>
				}

				{showTitle && (titlePosition == true) && title}
				{
					(showAuthor || showDates || showComment) &&
					<div className="qubely-postgrid-meta">
						{showAuthor && <span><i className="fas fa-user"/> {__('By')} <a >{post.qubely_author.display_name}</a></span>}
						{showDates && <span><i className="far fa-calendar-alt"/> {dateI18n(__experimentalGetSettings().formats.date, post.date_gmt)}</span>}
						{showComment && <span><i className="fas fa-comment"/> {(post.qubely_comment ? post.qubely_comment : '0')}</span>}
					</div>
				}
				{showTitle && (titlePosition == false) && title}
				{showExcerpt && <div className="qubely-postgrid-intro" dangerouslySetInnerHTML={{ __html: this.truncate(post.excerpt.rendered, excerptLimit) }} />}
				{showReadMore && <div className="qubely-postgrid-btn-wrapper"><a className={`qubely-postgrid-btn qubely-button-${readmoreStyle} is-${readmoreSize}`}>{buttonText}</a></div>}
			</div>
		)
	}

	render() {
		const {
			setAttributes,
			posts,
			taxonomyList,
			attributes: {
				uniqueId,
				//general
				taxonomy,
				categories,
				tags,
				order,
				orderBy,
				postsToShow,

				//image
				showImages,
				imgSize,
				enableFixedHeight,
				fixedHeight,
				imageRadius,
				imageAnimation,

				//card
				cardBackground,
				cardBorder,
				cardBorderRadius,
				cardPadding,
				cardBoxShadow,
				cardSpace,

				//scart
				stackBg,
				stackWidth,
				stackSpace,
				stackBorderRadius,
				stackPadding,
				stackBoxShadow,

				//readmore link
				readmoreStyle,
				buttonText,
				readmoreSize,
				readmoreCustomSize,
				readmoreTypography,
				readmoreBg,
				readmoreHoverBg,
				readmoreBorder,
				readmoreBorderRadius,
				readmoreBoxShadow,
				readmoreColor,
				readmoreColor2,
				readmoreHoverColor,

				//content
				layout,
				style,
				column,
				showDates,
				showComment,
				showAuthor,
				showCategory,
				categoryPosition,
				showExcerpt,
				excerptLimit,
				showReadMore,
				showTitle,
				titlePosition,

				//separator
				showSeparator,
				separatorColor,
				separatorHeight,
				separatorSpace,

				//typography
				titleTypography,
				metaTypography,
				excerptTypography,
				categoryTypography,

				//colors
				titleColor,
				titleOverlayColor,
				metaColor,
				metaOverlayColor,
				titleHoverColor,
				excerptColor,
				excerptColor2,
				categoryColor,
				categoryColor2,
				categoryHoverColor,
				categoryHoverColor2,
				categoryBackground,
				categoryHoverBackground,
				categoryRadius,
				categoryPadding,
				badgePosition,
				badgePadding,

				//design
				bgColor,
				border,
				borderRadius,
				padding,
				boxShadow,
				contentPosition,
				girdContentPosition,

				//overlay
				overlayBg,
				overlayHoverBg,
				overlayBlend,
				overlayHeight,
				overlaySpace,
				overlayBorderRadius,

				//spacing
				columnGap,
				contentPadding,
				titleSpace,
				categorySpace,
				metaSpace,
				excerptSpace,

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
				globalCss

			}
		} = this.props
		const { device } = this.state

		if (uniqueId) { CssGenerator(this.props.attributes, 'postgrid', uniqueId) }

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title='' initialOpen={true}>
						<Styles
							options={[
								{ value: 1, svg: icons.postgrid_1, label: __('') },
								{ value: 2, svg: icons.postgrid_2, label: __('') },
								{ value: 3, svg: icons.postgrid_3, label: __(''), pro: true },
								{ value: 4, svg: icons.postgrid_4, label: __(''), pro: true },
								{ value: 5, svg: icons.postgrid_5, label: __(''), pro: true },
							]}
							proUpgradation
							value={layout}
							onChange={val => setAttributes({ layout: val })}
						/>
					</PanelBody>

					<PanelBody title={__('Post Design')} initialOpen={true}>
						<Styles columns={4} value={style} onChange={val => setAttributes({ style: val })}
							options={[
								{ value: 1, svg: icons.postgrid_design_1 },
								{ value: 2, svg: layout === 1 ? icons.postgrid_design_3 : icons.postgrid_design_2 },
								{ value: 3, svg: layout === 1 ? icons.postgrid_design_5 : icons.postgrid_design_4 },
								{ value: 4, svg: icons.postgrid_design_6 },
							]}
						/>
						{layout === 2 &&
							<Range label={__('Select Column')} value={column} onChange={(value) => setAttributes({ column: value })} min={1} step={1} max={6} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						}

						{((layout === 1) || ((layout === 2) && ((style === 3) || (style === 4)))) &&
							<ButtonGroup
								label={__('Content Align')}
								options={
									((layout === 2) && (style === 3)) ?
										[[__('Left'), 'left'], [__('Middle'), 'center'], [__('Right'), 'right']]
										:
										[[__('Top'), 'top'], [__('Middle'), 'center'], [__('Bottom'), 'bottom']]
								}
								value={((layout === 2) && (style === 3)) ? contentPosition : girdContentPosition}
								onChange={value => setAttributes(((layout === 2) && (style === 3)) ? { contentPosition: value } : { girdContentPosition: value })}
							/>
						}
						{(((layout === 1) && (style != 3)) || ((layout === 2) && (style != 3))) &&
							<Padding label={__('Content Padding')} value={contentPadding} onChange={val => setAttributes({ contentPadding: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						}
						<Separator />
						{(((layout === 1) && (style === 1)) || ((layout === 2) && (style === 1))) &&
							<Fragment>
								<ColorAdvanced label={__('Background')} value={bgColor} onChange={(value) => setAttributes({ bgColor: value })} />
								<Border label={__('Border')} value={border} onChange={val => setAttributes({ border: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BorderRadius min={0} max={100} responsive device={device} label={__('Corner')} value={borderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ borderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
								<Padding label={__('Padding')} value={padding} onChange={val => setAttributes({ padding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BoxShadow label={__('Box-Shadow')} value={boxShadow} onChange={(value) => setAttributes({ boxShadow: value })} />
							</Fragment>
						}
						{/* card  settings*/}
						{(style === 2) &&
							<Fragment>
								<ColorAdvanced label={__('Card Background')} value={cardBackground} onChange={(value) => setAttributes({ cardBackground: value })} />
								<Border label={__('Card Border')} value={cardBorder} onChange={val => setAttributes({ cardBorder: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BorderRadius min={0} max={100} responsive device={device} label={__('Card Corner')} value={cardBorderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ cardBorderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
								{(layout === 1) &&
									<Range label={__('Card Space')} value={cardSpace} onChange={value => setAttributes({ cardSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}
								<Padding label={__('Card Padding')} value={cardPadding} onChange={val => setAttributes({ cardPadding: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BoxShadow label={__('Card Box Shadow')} value={cardBoxShadow} onChange={(value) => setAttributes({ cardBoxShadow: value })} />
							</Fragment>
						}

						{/* Overlay */}
						{(style === 4) &&
							<Fragment>
								<Range label={__('Overlay Height')} value={overlayHeight} onChange={value => setAttributes({ overlayHeight: value })} unit={['px', 'em', '%']} min={50} max={700} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								{(layout === 1) &&
									<Range label={__('Overlay Space')} value={overlaySpace} onChange={value => setAttributes({ overlaySpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}
								<BorderRadius min={0} max={100} responsive device={device} label={__('Overlay Corner')} value={overlayBorderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ overlayBorderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
								<Tabs>
									<Tab tabTitle={__('Normal')}>
										<ColorAdvanced label={__('Overlay')} value={overlayBg} onChange={(value) => setAttributes({ overlayBg: value })} />
									</Tab>
									<Tab tabTitle={__('Hover')}>
										<ColorAdvanced label={__('Hover Overlay')} value={overlayHoverBg} onChange={(value) => setAttributes({ overlayHoverBg: value })} />
									</Tab>
								</Tabs>
								<Select label={__('Blend Mode')} options={[['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')]]} value={overlayBlend} onChange={val => setAttributes({ overlayBlend: val })} />
							</Fragment>
						}

						{/* Scart */}
						{(style === 3) &&
							<Fragment>
								<ColorAdvanced label={__('Stack Background')} value={stackBg} onChange={(value) => setAttributes({ stackBg: value })} />
								{(layout === 2) &&
									<Range label={__('Stack Size')} value={stackWidth} onChange={value => setAttributes({ stackWidth: value })} unit={['px', 'em', '%']} min={50} max={600} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}
								{(layout === 1) &&
									<Range label={__('Stack Space')} value={stackSpace} onChange={value => setAttributes({ stackSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}
								<BorderRadius min={0} max={100} responsive device={device} label={__('Stack Corner')} value={stackBorderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ stackBorderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
								<Padding label={__('Stack Padding')} value={stackPadding} onChange={val => setAttributes({ stackPadding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<BoxShadow label={__('Stack Box Shadow')} value={stackBoxShadow} onChange={(value) => setAttributes({ stackBoxShadow: value })} />
							</Fragment>
						}

						{/* Separator  */}
						{(layout === 1) && (style === 1) &&
							<Fragment>
								<Separator />
								<Toggle label={__('Enable Separator')} value={showSeparator} onChange={value => setAttributes({ showSeparator: value })} />
							</Fragment>
						}
						{(layout === 1) && (style === 1) && (showSeparator === true) &&
							<Fragment>
								<Color label={__('Separator Color')} value={separatorColor} onChange={value => setAttributes({ separatorColor: value })} />
								<Range label={__('Separator Height')} value={separatorHeight} onChange={value => setAttributes({ separatorHeight: value })} unit={['px', 'em', '%']} min={0} max={30} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Range label={__('Separator Spacing')} value={separatorSpace} onChange={value => setAttributes({ separatorSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
							</Fragment>
						}
					</PanelBody>


					<PanelBody title={__('Query')} initialOpen={false}>
						<ButtonGroup
							label={__('Taxonomy')}
							options={[[__('Categories'), 'categories'], [__('Tags'), 'tags']]}
							value={taxonomy}
							onChange={value => setAttributes({ taxonomy: value })}
						/>
						<Dropdown
							label={taxonomy === 'categories' ? __('Categories') : __('Tags')}
							enableSearch
							defaultOptionsLabel="All"
							options={[{ value: 'all', label: __('All') }, ...taxonomyList]}
							value={taxonomy === 'categories' ? categories : tags}
							onChange={value => setAttributes(taxonomy === 'categories' ? { categories: value.length && value[value.length - 1].label === 'All' ? [] : value } : { tags: value.length && value[value.length - 1].label === 'All' ? [] : value })}
						/>
						<Range label={__('Number of Items')} value={postsToShow} onChange={value => setAttributes({ postsToShow: parseInt(value) })} min={0} max={15} />

						<SelectControl
							label={__("Order By")}
							value={orderBy}
							options={[
								{ label: __('Date'), value: 'date' },
								{ label: __('Title'), value: 'title' },
								{ label: __('Random'), value: 'rand' },
								{ label: __('Menu Order'), value: 'menu_order' },
							]}
							onChange={value => setAttributes({ orderBy: value })}
						/>
						<ButtonGroup
							label={__('Order')}
							options={[[__('Ascending'), 'asc'], [__('Descending'), 'desc',]]}
							value={order}
							onChange={value => setAttributes({ order: value })}
						/>
					</PanelBody>

					{/* Global */}

					<PanelBody title={__('Image Settings')} initialOpen={false}>
						<Toggle label={__('Show Featured Image')} value={showImages} onChange={value => setAttributes({ showImages: value })} />
						<Toggle label={__('Fixed Image Height')} value={enableFixedHeight} onChange={value => setAttributes({ enableFixedHeight: value })} />
						{enableFixedHeight && <Range label={__('')} value={fixedHeight} onChange={value => setAttributes({ fixedHeight: value })} unit={['px', 'em', '%']} min={10} max={600} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />}
						<SelectControl
							label={__("Image Sizes")}
							value={imgSize}
							onChange={(value) => setAttributes({ imgSize: value })}
							options={qubely_admin.image_sizes}
						/>
						<BorderRadius
							min={0}
							max={100}
							responsive
							device={device}
							label={__('Image Corner')}
							value={imageRadius}
							unit={['px', 'em', '%']}
							onChange={value => setAttributes({ imageRadius: value })}
							onDeviceChange={value => this.setState({ device: value })} />

						<Select label={__('Hover Effect')} options={[['none', __('No Animation')], ['slide-top', __('Slide From Top')], ['slide-right', __('Slide From Right')], ['slide-bottom', __('Slide From Bottom')], ['slide-left', __('Slide From Left')], ['zoom-in', __('Zoom In')], ['zoom-out', __('Zoom Out')]]} value={imageAnimation} onChange={val => setAttributes({ imageAnimation: val })} />
					</PanelBody>

					<PanelBody title='Content' initialOpen={false}>
						<Toggle label={__('Show Title')} value={showTitle} onChange={value => setAttributes({ showTitle: value })} />
						<Toggle label={__('Show Excerpt')} value={showExcerpt} onChange={value => setAttributes({ showExcerpt: value })} />
						<RangeControl label={__('Excerpt Limit')} min={1} max={100} step={1} value={excerptLimit} onChange={val => setAttributes({ excerptLimit: val })} />
						<Separator />
						<Toggle label={__('Title Below Meta')} value={titlePosition} onChange={value => setAttributes({ titlePosition: value })} />
						<Toggle label={__('Show date')} value={showDates} onChange={value => setAttributes({ showDates: value })} />
						<Toggle label={__('Show Comment')} value={showComment} onChange={value => setAttributes({ showComment: value })} />
						<Toggle label={__('Show Author')} value={showAuthor} onChange={value => setAttributes({ showAuthor: value })} />
					</PanelBody>

					<PanelBody title={__('Category')} initialOpen={false}>
						<RadioAdvanced
							label={__('Category')}
							options={[
								{ icon: 'fas fa-ban', value: 'none', label: __('None'), },
								{ value: 'default', label: __('Default'), },
								{ value: 'badge', label: __('Badge'), }
							]}
							value={showCategory}
							onChange={val => setAttributes({ showCategory: val })}
						/>
						{showCategory !== 'none' &&
							<Fragment>
								{(layout !== 2 && showCategory == 'badge' && style != 4) &&
									<Select
										label={__("Badge Position")}
										options={[['leftTop', __('Left Top')], ['rightTop', __('Right Top')], ['leftBottom', __('Left Bottom')], ['rightBottom', __('Right Bottom')]]}
										value={categoryPosition}
										onChange={value => setAttributes({ categoryPosition: value })}
									/>
								}
								{(layout === 2 && showCategory == 'badge' && style != 4) &&
									<Fragment>
										<RadioAdvanced
											label={__('Badge Position')}
											options={[
												{ value: 'default', label: __('default'), title: __('Pre-defined') },
												{ icon: 'fas fa-cog', value: 'none', title: __('Advanced') },
											]}
											value={badgePosition}
											onChange={val => setAttributes({ badgePosition: val })}
										/>
										{
											badgePosition === 'default' ?
												<Select
													label={__("")}
													options={[['leftTop', __('Left Top')], ['rightTop', __('Right Top')], ['leftBottom', __('Left Bottom')], ['rightBottom', __('Right Bottom')]]}
													value={categoryPosition}
													onChange={value => setAttributes({ categoryPosition: value })}
												/>
												: <Padding label={__('Advanced')} value={badgePadding} onChange={val => setAttributes({ badgePadding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										}
										<Separator />
									</Fragment>
								}
								<Typography label={__('Typography')} value={categoryTypography} onChange={value => setAttributes({ categoryTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Tabs>
									<Tab tabTitle={__('Normal')}>
										<Color label={__('Category Color')} value={showCategory == 'badge' ? categoryColor2 : categoryColor} onChange={value => setAttributes(showCategory == 'badge' ? { categoryColor2: value } : { categoryColor: value })} />
										{showCategory == 'badge' && <Color label={__('Category Background')} value={categoryBackground} onChange={value => setAttributes({ categoryBackground: value })} />}
									</Tab>
									<Tab tabTitle={__('Hover')}>
										<Color label={__('Category Hover Color')} value={showCategory == 'badge' ? categoryHoverColor2 : categoryHoverColor} onChange={value => setAttributes(showCategory == 'badge' ? { categoryHoverColor2: value } : { categoryHoverColor: value })} />
										{showCategory == 'badge' && <Color label={__('Category Background')} value={categoryHoverBackground} onChange={value => setAttributes({ categoryHoverBackground: value })} />}
									</Tab>
								</Tabs>
								<BorderRadius
									min={0}
									max={100}
									responsive
									device={device}
									label={__('Corner')}
									value={categoryRadius}
									unit={['px', 'em', '%']}
									onChange={value => setAttributes({ categoryRadius: value })}
									onDeviceChange={value => this.setState({ device: value })}
								/>
								{showCategory == 'badge' && <Padding label={__('Padding')} value={categoryPadding} onChange={val => setAttributes({ categoryPadding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />}

							</Fragment>
						}
					</PanelBody>

					<PanelBody title={__('Read More Link')} initialOpen={false}>
						<Toggle label={__('Show Read More Link')} value={showReadMore} onChange={value => setAttributes({ showReadMore: value })} />
						{
							showReadMore &&
							<Fragment>
								<Styles
									options={
										[
											{ value: 'fill', svg: icons.btn_fill, label: __('Fill') },
											{ value: 'outline', svg: icons.btn_outline, label: __('Outline') }
										]}
									value={readmoreStyle}
									onChange={val => setAttributes({ readmoreStyle: val })}
								/>
								<TextControl label={__('Button Text')} value={buttonText} onChange={val => setAttributes({ buttonText: val })} />
								<Typography label={__('Typography')} value={readmoreTypography} onChange={value => setAttributes({ readmoreTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />

								{
									readmoreStyle === 'fill' &&
									<Fragment>
										<RadioAdvanced
											label={__('Button Size')}
											options={[
												{ label: 'S', value: 'small', title: 'Small' },
												{ label: 'M', value: 'medium', title: 'Medium' },
												{ label: 'L', value: 'large', title: 'Large' },
												{ icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
											]}
											value={readmoreSize}
											onChange={(value) => setAttributes({ readmoreSize: value })} />
										{readmoreSize == 'custom' &&
											<Padding
												label={__('Custom Size')}
												value={readmoreCustomSize}
												onChange={(value) => setAttributes({ readmoreCustomSize: value })}
												unit={['px', 'em', '%']}
												max={150}
												min={0}
												responsive
												device={device}
												onDeviceChange={value => this.setState({ device: value })} />
										}


										<Border label={__('Border')} value={readmoreBorder} onChange={val => setAttributes({ readmoreBorder: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										{
											(readmoreBorder.openBorder || readmoreStyle === 'fill') &&
											<BorderRadius
												min={0}
												max={100}
												responsive
												device={device}
												label={__('Corner')}
												value={readmoreBorderRadius}
												unit={['px', 'em', '%']}
												onChange={value => setAttributes({ readmoreBorderRadius: value })}
												onDeviceChange={value => this.setState({ device: value })}
											/>
										}
										<BoxShadow label={__('Box-Shadow')} value={readmoreBoxShadow} onChange={(value) => setAttributes({ readmoreBoxShadow: value })} />
									</Fragment>
								}
								<Tabs>
									<Tab tabTitle={__('Normal')}>
										<Color label={__('Text Color')} value={readmoreStyle === 'fill' ? readmoreColor : readmoreColor2} onChange={value => setAttributes(readmoreStyle === 'fill' ? { readmoreColor: value } : { readmoreColor2: value })} />
										{readmoreStyle === 'fill' && <ColorAdvanced label={__('Background')} value={readmoreBg} onChange={(value) => setAttributes({ readmoreBg: value })} />}
									</Tab>
									<Tab tabTitle={__('Hover')}>
										<Color label={__('Text Color')} value={readmoreHoverColor} onChange={value => setAttributes({ readmoreHoverColor: value })} />
										{readmoreStyle === 'fill' && <ColorAdvanced label={__('Background')} value={readmoreHoverBg} onChange={(value) => setAttributes({ readmoreHoverBg: value })} />}
									</Tab>
								</Tabs>
							</Fragment>
						}
					</PanelBody>

					<PanelBody title={__('Spacing')} initialOpen={false}>
						{(layout === 2) &&
							<Range label={__('Column Gap')} value={columnGap} onChange={value => setAttributes({ columnGap: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						}
						{(showCategory == 'default') &&
							<Range label={__('Category')} value={categorySpace} onChange={value => setAttributes({ categorySpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						}
						<Range label={__('Title')} value={titleSpace} onChange={value => setAttributes({ titleSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Range label={__('Meta')} value={metaSpace} onChange={value => setAttributes({ metaSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Range label={__('Excerpt')} value={excerptSpace} onChange={value => setAttributes({ excerptSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Typography')} initialOpen={false}>
						<Typography label={__('Title')} value={titleTypography} onChange={value => setAttributes({ titleTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Separator />
						<Typography label={__('Meta')} value={metaTypography} onChange={value => setAttributes({ metaTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
						<Separator />
						<Typography label={__('Excerpt')} value={excerptTypography} onChange={value => setAttributes({ excerptTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Colors')} initialOpen={false}>
						<Color label={__('Title')} value={style !== 4 ? titleColor : titleOverlayColor} onChange={value => setAttributes(style !== 4 ? { titleColor: value } : { titleOverlayColor: value })} />
						<Color label={__('Title Hover')} value={titleHoverColor} onChange={value => setAttributes({ titleHoverColor: value })} />
						<Color label={__('Meta')} value={style !== 4 ? metaColor : metaOverlayColor} onChange={value => setAttributes(style !== 4 ? { metaColor: value } : { metaOverlayColor: value })} />
						<Color label={__('Excerpt')} value={style !== 4 ? excerptColor : excerptColor2} onChange={value => setAttributes(style !== 4 ? { excerptColor: value } : { excerptColor2: value })} />
					</PanelBody>
					{animationSettings(uniqueId, animation, setAttributes)}
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
					{
						(posts && posts.length) ?

							<div
								// onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}
								className={`qubely-postgrid-wrapper qubely-postgrid-layout-${layout} ${(layout === 2) ? 'qubely-postgrid-column qubely-postgrid-column-md' + column.md + ' ' + 'qubely-postgrid-column-sm' + column.sm + ' ' + 'qubely-postgrid-column-xs' + column.xs : ''}`}>
								{
									posts && posts.map(post => {
										return (
											<div className={`qubely-postgrid ${layout === 1 ? 'qubely-post-list-view' : 'qubely-post-grid-view'} qubely-postgrid-style-${style}`}>
												<div className={`${layout === 1 ? `qubely-post-list-wrapper qubely-post-list-${((layout === 2) && (style === 3)) ? contentPosition : girdContentPosition}` : `qubely-post-grid-wrapper qubely-post-grid-${((layout === 2) && (style === 3)) ? contentPosition : girdContentPosition}`}`}>
													{showImages && post.qubely_featured_image_url && this.renderFeaturedImage(post)}
													{this.renderCardContent(post)}
												</div>
											</div>
										)
									})
								}

								<div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
									{/* <ContextMenu
										name={name}
										clientId={clientId}
										attributes={attributes}
										setAttributes={setAttributes}
										qubelyContextMenu={this.refs.qubelyContextMenu}
									/> */}
								</div>

							</div>
							:
							<div className="qubely-postgrid-is-loading">
								<Spinner />
							</div>
					}
				</div>
			</Fragment >
		);
	}
}

export default withSelect((select, props) => {
	const { getEntityRecords } = select('core')
	const { attributes: { taxonomy, order, orderBy, categories, tags, postsToShow } } = props

	let allTaxonomy = qubely_admin.all_taxonomy

	let seletedTaxonomy = taxonomy === 'categories' ? 'categories' : 'tags'
	let activeTaxes = taxonomy === 'categories' ? categories : tags

	let query = {
		order: order,
		orderby: orderBy,
		per_page: postsToShow,
		[seletedTaxonomy]: activeTaxes.map(({ value, label }) => value),
	}
	return {
		posts: getEntityRecords('postType', 'post', query),
		taxonomyList: allTaxonomy.post.terms ? allTaxonomy.post.terms[taxonomy === 'categories' ? 'category' : 'post_tag'] ? allTaxonomy.post.terms[taxonomy === 'categories' ? 'category' : 'post_tag'] : [] : [],
	};
})
	(Edit)
