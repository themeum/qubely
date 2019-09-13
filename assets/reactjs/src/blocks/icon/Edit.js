const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, Toolbar } = wp.components
const { InspectorControls, BlockControls } = wp.editor
const {
	Color,
	IconList,
	Styles,
	ColorAdvanced,
	Range,
	RadioAdvanced,
	Url,
	BoxShadow,
	Alignment,
	Tabs,
	Tab,
	Border,
	BorderRadius,
	Inline: { InlineToolbar },
	CssGenerator: { CssGenerator }
} = wp.qubelyComponents

import '../../components/GlobalSettings'
import '../../components/ContextMenu'
import icons from '../../helpers/icons'

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = { device: 'md', spacer: true };
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
	changeIconStyle = (newStyle) => {
		const { setAttributes, attributes: { border, iconStyle } } = this.props
		let newBorder = JSON.parse(JSON.stringify(border))
		if (newStyle == 'outline') {
			newBorder.widthType = border.widthType ? border.widthType : 'global'
			newBorder.global = border.global ? border.global : { md: '1', sm: '1', xs: '1' }
			newBorder.type = border.type ? border.type : 'solid'
			newBorder.unit = border.unit ? border.unit : 'px'
			newBorder.openBorder = border.openBorder ? border.openBorder : 1
		}
		if (newStyle == 'fill') {
			newBorder.type = iconStyle == 'fill' ? border.type : ''
			newBorder.openBorder = iconStyle == 'fill' ? border.openBorder : 0
		}

		setAttributes({ iconStyle: newStyle, border: newBorder })
	}
	render() {
		const { uniqueId, name, url, alignment, iconSize, iconSizeCustom, iconBorderRadius, iconBackgroundSize, iconColor, iconHoverColor, bgColor, bgHoverColor, border, borderHoverColor, iconShadow, iconHoverShadow, iconStyle } = this.props.attributes
		const { setAttributes } = this.props

		if (uniqueId) { CssGenerator(this.props.attributes, 'icon', uniqueId); }

		return (
			<Fragment>
				<InspectorControls key="inspector">

					<PanelBody title=''>
						<Styles
							value={iconStyle}
							columns={3}
							onChange={val => this.changeIconStyle(val)}
							options={[
								{ value: 'nofill', svg: icons.icon_classic, label: __('Classic') },
								{ value: 'fill', svg: icons.icon_fill, label: __('Fill') },
								{ value: 'outline', svg: icons.icon_line, label: __('Outline') },
							]}
						/>
						<Alignment
							label={__('Alignment')}
							value={alignment}
							onChange={val => setAttributes({ alignment: val })} alignmentType="content" disableJustify responsive device={this.state.device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

					<PanelBody title={__('Icon')} initialOpen={false}>
						<IconList
							value={name}
							onChange={val => setAttributes({ name: val })} />
						<RadioAdvanced
							label={__('Icon Size')}
							options={[
								{ label: 'S', value: '36px', title: 'Small' },
								{ label: 'M', value: '64px', title: 'Medium' },
								{ label: 'L', value: '128px', title: 'Large' },
								{ icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
							]}
							value={iconSize}
							onChange={(value) => setAttributes({ iconSize: value })} />
						{iconSize == 'custom' &&
							<Range
								label={__('Custom Size')}
								value={iconSizeCustom}
								onChange={val => setAttributes({ iconSizeCustom: val })}
								min={12}
								max={300}
								unit={['px', 'em', '%']}
								responsive
								device={this.state.device}
								onDeviceChange={value => this.setState({ device: value })} />
						}
						<Url
							label={__('Url')}
							value={url}
							onChange={val => setAttributes({ url: val })} />
						<Tabs>
							<Tab tabTitle={__('Normal')}>
								<Color
									label={__('Color')}
									value={iconColor}
									onChange={val => setAttributes({ iconColor: val })} />
							</Tab>
							<Tab tabTitle={__('Hover')}>
								<Color
									label={__('Color')}
									value={iconHoverColor}
									onChange={val => setAttributes({ iconHoverColor: val })} />
							</Tab>
						</Tabs>
					</PanelBody>

					{iconStyle != 'nofill' &&
						<PanelBody title={__('Background')} initialOpen={false}>
							<Tabs>
								<Tab tabTitle={__('Normal')}>
									{iconStyle == 'fill' &&
										<ColorAdvanced
											label={__('Background Color')}
											value={bgColor}
											onChange={val => setAttributes({ bgColor: val })} />
									}
									<Border
										label={__('Border')}
										value={border}
										unit={['px', 'em']}
										responsive
										min={0} max={10}
										onChange={val => setAttributes({ border: val })}
										device={this.state.device}
										onDeviceChange={value => this.setState({ device: value })} />
								</Tab>
								<Tab tabTitle={__('Hover')}>
									<ColorAdvanced
										label={__('Background Color')}
										value={bgHoverColor}
										onChange={val => setAttributes({ bgHoverColor: val })} />
									{
										border.type &&
										<Color
											label={__('Border Color')}
											value={borderHoverColor}
											onChange={val => setAttributes({ borderHoverColor: val })} />
									}

								</Tab>
							</Tabs>

							<Range
								label={__('Background Size')}
								value={iconBackgroundSize}
								min={0}
								max={200}
								unit={['px', 'em', '%']}
								responsive
								device={this.state.device}
								onDeviceChange={value => this.setState({ device: value })}
								onChange={val => setAttributes({ iconBackgroundSize: val })}
							/>
							<BorderRadius
								label={__('Border Radius')}
								value={iconBorderRadius}
								min={0}
								max={100}
								unit={['px', 'em', '%']}
								responsive
								device={this.state.device}
								onChange={val => setAttributes({ iconBorderRadius: val })}
								onDeviceChange={value => this.setState({ device: value })}
							/>
						</PanelBody>
					}

					{iconStyle != 'nofill' &&
						<PanelBody title={__('Shadow')} initialOpen={false}>
							<Tabs>
								<Tab tabTitle={__('Normal')}>
									<BoxShadow
										label={__('Box-shadow')}
										value={iconShadow}
										onChange={val => setAttributes({ iconShadow: val })} />
								</Tab>
								<Tab tabTitle={__('Hover')}>
									<BoxShadow
										label={__('Box-shadow')}
										value={iconHoverShadow}
										onChange={val => setAttributes({ iconHoverShadow: val })} />
								</Tab>
							</Tabs>
						</PanelBody>
					}
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

				<div className={`qubely-block-${uniqueId}`}>
					<div className="qubely-block-icon-wrapper">
						<div className="qubely-block-icon">
							<i className={name} />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Edit;