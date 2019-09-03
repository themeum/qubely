const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, TextControl, ToggleControl, Tooltip, Notice } = wp.components
import {  Range } from '../../components/FieldRender'
const { InspectorControls, InnerBlocks } = wp.editor

import Carousel from './Carousel'

class Edit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	componentDidMount(){
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

    renderTmpls(){
		const { attributes:{slider_items} } = this.props
		return slider_items.map( (item, index) => {
			return ['qubely/carouselitem', { id: index+1, customClassName: `qubely-slider-item`},
				[
					[ 'qubely/heading', { content: `Carousel Title`, alignment: {md:'center'} }],
					[ 'core/image', { url:'https://sppagebuilder.com/addons/image/image1.jpg'}],
				]
			]
        })
	}

	addSliderItem(){
		const { setAttributes, attributes:{ slider_items } } = this.props
		const cloneItems = [...slider_items, slider_items.length+1]
		setAttributes({ slider_items: cloneItems })
	}

	render() {
		const { attributes } = this.props
		const { autoplay, items, slider_items, interval, speed, dots, nav, center  } = attributes
		const options = {
			autoplay,
			items,
			margin: 10,
			speed,
			center,
			dots,
            nav,
			interval,
		};
		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('Carousel Control')}>
						<ToggleControl
							label={__('Autoplay (Not work on editor)')}
							checked={autoplay}
							onChange={(value) => this.changePluginAttribute('autoplay', value)}
						/>

						<ToggleControl
							label={__('Center')}
							checked={center}
							onChange={(value) => this.changePluginAttribute('center', value)}
						/>

						<ToggleControl
							label={__('Dots')}
							checked={dots}
							onChange={(value) => this.changePluginAttribute('dots', value)}
						/>

						<ToggleControl
							label={__('Nav')}
							checked={nav}
							onChange={(value) => this.changePluginAttribute('nav', value)}
						/>

						<Range
                            label={__('Active Items')}
                            value={items}
                            onChange={(value) => this.changePluginAttribute('items', value)}
                            min={1}
							max={20}
							step={1}
                            responsive={true}
                        />

						<Range
                            label={__('Add Interval(ms)')}
                            value={interval}
                            onChange={(value) => this.changePluginAttribute('interval', value)}
                            min={500}
							max={10000}
							step={100}
                        />
						
						<Range
                            label={__('Speed (ms)')}
                            value={speed}
                            onChange={(value) => this.changePluginAttribute('speed', value)}
                            min={300}
							max={10000}
							step={100}
                        />

						{ speed > interval &&  
						<Notice status="warning">
							Interval should be bigger than speed otherwise it will make equal!
						</Notice>
						}

					</PanelBody>
				</InspectorControls>
				<Fragment>
					<Carousel 
						ref="JsSlider" 
						items={slider_items}
						options={options}
					>
						<InnerBlocks
							template={this.renderTmpls()}
							templateLock="all"
							allowedBlocks={['qubely/carouselitem']} 
						/>
					</Carousel>
					<Tooltip text={__('Add new item')}>
						<span className="qubely-action-add-carousel-item"
							onClick={() => this.addSliderItem()} role="button" areaLabel={__('Add new item')}>
							<i class="fas fa-plus-circle qubely-action-add-carousel-item-icon" />
						</span>
					</Tooltip>
				</Fragment>
			</Fragment>
		)
	}
}

export default Edit