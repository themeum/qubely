const { __ } = wp.i18n
const { Tooltip, PanelBody, Toolbar, TextControl } = wp.components;
const { compose } = wp.compose
const { withSelect, withDispatch } = wp.data
const { Component, Fragment } = wp.element;
const { InnerBlocks, InspectorControls } = wp.editor
import { Toggle, Range } from "../../components/FieldRender"
import { CssGenerator } from '../../components/CssGenerator'
class Edit extends Component {

	constructor(props) {
		super(props)
		let iterator = [], index = 0
		while (index < this.props.attributes.items) {
			iterator.push(index)
			index++
		}

		this.state = {
			initialRender: true,
			activeCarouselItem: 1,
			spacer: true,
			iterator: iterator
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
		const { attributes: { items }, clientId, block } = this.props

		if (!this.state.initialRender && prevProps.block.innerBlocks.length < block.innerBlocks.length) {
			let currentBlock = $(`#block-${clientId}`)
			let activeCarouselBlock = $(`#block-${block.innerBlocks[items - 1].clientId}`, currentBlock)
			$('.qubely-active', currentBlock).removeClass('qubely-active')
			activeCarouselBlock.addClass("qubely-active")
		}
	}


	createIterator = () => {
		const { attributes: { items } } = this.props
		let iterator = [], index = 0
		while (index < items) {
			iterator.push(index)
			index++
		}
		return iterator
	}
	renderCarouselNav = () => {
		const { attributes: { }, block, clientId } = this.props
		let currentBlock = $(`#block-${clientId}`)
		const { activeCarouselItem } = this.state
		let iterator = this.createIterator()
		return iterator.map((title, index) =>
			<span className={`qubely-carousel-item-indicator ${(activeCarouselItem == index + 1) ? 'qubely-active' : ''}`}>
				<span class={`qubely-carousel-title`} onClick={() => {
					let activeCarouselBlock = $(`#block-${block.innerBlocks[index].clientId}`, currentBlock)
					$('.qubely-carousel-item.qubely-active', currentBlock).removeClass('qubely-active')
					activeCarouselBlock.addClass("qubely-active")
					this.setState({ activeCarouselItem: index + 1, initialRender: false })
				}}
					role="button"
				>
					<Tooltip text={__(`item ${index + 1}`)}>
						<span className="dashicons dashicons-minus"></span>
					</Tooltip>

				</span>
			</span>
		)
	}

	deleteItem = (carouselIndex) => {
		const { activeCarouselItem, iterator } = this.state
		const { attributes: { items }, setAttributes, block, removeBlock, updateBlockAttributes, clientId } = this.props;
		let i = carouselIndex + 1
		while (i < items) {
			updateBlockAttributes(block.innerBlocks[i].clientId, Object.assign(block.innerBlocks[i].attributes, { id: block.innerBlocks[i].attributes.id - 1 }))
			i++
		}

		removeBlock(block.innerBlocks[carouselIndex].clientId)

		if (carouselIndex + 1 === activeCarouselItem) {
			let currentBlock = $(`#block-${clientId}`)
			let nextActiveItemBlock = $(`#block-${block.innerBlocks[carouselIndex + 1 < items ? carouselIndex + 1 : items >= 2 ? carouselIndex - 1 : carouselIndex].clientId}`, currentBlock)
			$('.qubely-active', currentBlock).removeClass('qubely-active')
			nextActiveItemBlock.addClass("qubely-active")
			this.setState({ activeCarouselItem: carouselIndex == 0 ? 1 : carouselIndex + 1 < items ? carouselIndex + 1 : carouselIndex, initialRender: false })
		}
		carouselIndex + 1 < activeCarouselItem && this.setState({ activeCarouselItem: activeCarouselItem - 1, initialRender: false })
		setAttributes({ items: items - 1 })
	}

	handleNavigation = (direction) => {
		const { activeCarouselItem } = this.state
		const { block, clientId, attributes: { items } } = this.props
		let temp = direction == 'next' ? activeCarouselItem < items ? activeCarouselItem : 0 : activeCarouselItem > 1 ? activeCarouselItem - 2 : items - 1
		let currentBlock = $(`#block-${clientId}`)
		let nextActiveItem = $(`#block-${block.innerBlocks[temp].clientId}`, currentBlock)
		$('.qubely-carousel-item.qubely-active', currentBlock).removeClass('qubely-active')
		nextActiveItem.addClass("qubely-active")
		this.setState({ activeCarouselItem: temp + 1, initialRender: false, })
	}
	render() {
		const { setAttributes, attributes: { uniqueId, items, navAlignment, showNavigations, arrowSize, autoPlay, autoPlaySpeed } } = this.props
		if (uniqueId) { CssGenerator(this.props.attributes, 'carousel', uniqueId) }
		let iterator = this.createIterator()
		const { activeCarouselItem } = this.state
		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('Carousel Settings')} initialOpen={true}>
						<Toggle label={__('Show Navigations')} value={showNavigations} onChange={value => setAttributes({ showNavigations: value })} />
						{
							showNavigations && <Range
								label={__('Arrow Size')}
								value={arrowSize}
								unit={['px', 'em', '%']} 
								onChange={value => setAttributes({ arrowSize: value })}
								min={15}
								max={100}
								responsive
							/>
						}
						<Toggle label={__('Autoplay')} value={autoPlay} onChange={value => setAttributes({ autoPlay: value })} />
						{
							autoPlay && <Range
								label={__('Autoplay Speed')}
								value={autoPlaySpeed}
								onChange={value => setAttributes({ autoPlaySpeed: value })}
								min={500}
								max={1500}
							/>
						}

					</PanelBody>
				</InspectorControls>
				<div className={`qubely-block-${uniqueId}`}>
					<div className={`qubely-block-carousel`}>
						<Tooltip text={__('Delete this item')}>
							<span className="qubely-action-remove-carousel-item" onClick={() => this.deleteItem(activeCarouselItem - 1)} role="button">
								<i class="fas fa-times" />
							</span>
						</Tooltip>

						<div className={`qubely-carousel-body`}>
							{showNavigations && <span onClick={() => this.handleNavigation('previous')} className="dashicons dashicons-arrow-left-alt2 qubely-carousel-nav"></span>}
							<InnerBlocks
								tagName="div"
								template={iterator.map(carouselIndex => ['qubely/carouselitem', { id: carouselIndex + 1, customClassName: `qubely-carousel-item` }])}
								templateLock="all"
								allowedBlocks={['qubely/carouselitem']} />
							{showNavigations && <span onClick={() => this.handleNavigation('next')} className="dashicons dashicons-arrow-right-alt2 qubely-carousel-nav"></span>}
						</div>

						<div className={`qubely-carousel-nav-wraper`}>
							{this.renderCarouselNav()}
							<Tooltip text={__('Add new item')}>
								<span className="qubely-action-add-carousel-item"
									onClick={() => {
										this.setState({ activeCarouselItem: items + 1, initialRender: false })
										setAttributes({ items: items + 1 })
									}} role="button" areaLabel={__('Add new item')}>
									<i class="fas fa-plus-circle qubely-action-add-carousel-item-icon" />
								</span>
							</Tooltip>
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
		const { getBlock } = select('core/editor');
		return {
			block: getBlock(clientId)
		};
	}),
	withDispatch((dispatch) => {
		const { insertBlock, removeBlock, updateBlockAttributes } = dispatch('core/editor');
		return {
			insertBlock,
			removeBlock,
			updateBlockAttributes
		};
	}),
])(Edit)
