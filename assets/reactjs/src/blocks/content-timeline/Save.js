const { Component } = wp.element
const { RichText } = wp.editor
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {

  renderTimeline = () => {
    const { attributes: { timelineContents } } = this.props

    return (timelineContents.map(({ title, date, description }, index) => {
      return (
        <div key={index} className={`qubely-content-timeline qubely-timeline-${index % 2 === 0 ? 'right' : 'left'}`} >
          <div className={`qubely-content`}>
            <RichText.Content tagName='div' className="qubely-content-timeline-title" value={title} />
            <RichText.Content tagName='div' className="qubely-content-timeline-description" value={description} />
          </div>
          <RichText.Content tagName='div' className="qubely-content-timeline-date" value={date} />
        </div>
      )
    }))
  }
  render() {
    const { attributes: { uniqueId, animation } } = this.props
    return (
      <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
        <div className={`qubely-block-content-timeline`}>
          {this.renderTimeline()}
          <div class="qubely-timeline__line">
            <div class="qubely-timeline__line__inner"> </div>
          </div>
        </div >
      </div>

    )


  }
}

export default Save