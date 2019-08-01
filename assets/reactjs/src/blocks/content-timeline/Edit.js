const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody } = wp.components
const { InspectorControls, RichText } = wp.editor
import { CssGenerator } from '../../components/CssGenerator'
// import icons from '../../helpers/icons'
import { Media, RadioAdvanced, Range, Color, Typography, Toggle, Separator, ColorAdvanced, Border, BorderRadius, BoxShadow, Styles, Alignment, Padding, Tabs, Tab, Carousel, TestimonialEdit } from '../../components/FieldRender'


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
			let updatedAttributes = key === 'add' ? [...timelineContents, { title: 'new', date: 'January 1, 2019', description: 'new description' }] : timelineContents.slice(0, timelineItems - 1)
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

	renderTimeline = () => {
		const { attributes: { timelineContents } } = this.props
		return (timelineContents.map(({ title, date, description }, index) => {
			return (
				<div key={index} className={`qubely-content-timeline qubely-timeline-${index % 2 ? 'left' : 'right'}`} >
					<div className={`qubely-content`}>
						<RichText
							placeholder={__('Add title')}
							className="qubely-content-timeline-title"
							value={title}
							onChange={value => this.updateTimelineContent('title', value, index)}
							keepPlaceholderOnFocus
						/>
						<RichText
							placeholder={__('Add description')}
							className="qubely-content-timeline-description"
							value={description}
							onChange={value => this.updateTimelineContent('description', value, index)}
							keepPlaceholderOnFocus
						/>
					</div>

					<RichText
						placeholder={__('Add Date')}
						className="qubely-content-timeline-date"
						value={date}
						onChange={value => this.updateTimelineContent('date', value, index)}
						keepPlaceholderOnFocus
					/>
				</div>
			)
		}))
	}


	render() {
		const { setAttributes, attributes: { uniqueId, timelineItems, typography, timelineContents } } = this.props
		const { device } = this.state
		if (uniqueId) { CssGenerator(this.props.attributes, 'content-timeline', uniqueId) }
		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('Timeline Settings')}>
						<Range
							min={2}
							max={10}
							label={__('Number of Items')}
							value={timelineItems}
							onChange={value => this.updateTimelineContent(value > timelineItems ? 'add' : 'delete')}
						/>
						<Typography label={__('Typography')} value={typography} onChange={val => setAttributes({ typography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
					</PanelBody>

				</InspectorControls>
				<div className={`qubely-block-${uniqueId}`}>
					<div className={`qubely-block-content-timeline`}>
						{this.renderTimeline()}
						<div class="qubely-timeline__line" >
							<div class="qubely-timeline__line__inner" > </div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default Edit
