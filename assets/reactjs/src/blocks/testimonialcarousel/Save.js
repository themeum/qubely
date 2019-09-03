const { Component } = wp.element
import { TestimonialSave } from '../../components/FieldRender'
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {

  renderItem() {
    const { attributes: { carouselItems, layout, showAvatar, avatarLayout, avatarAlt, quoteIcon } } = this.props

    return (carouselItems.map((item, index) => {
      const { author, designation, message, ratings, avatar } = item
      return (
        <div key={index} className="js-item" >
          <TestimonialSave
            layout={layout}
            name={author}
            ratings={ratings}
            quoteIcon={quoteIcon}
            designation={designation}
            message={message}
            showAvatar={showAvatar}
            avatarLayout={avatarLayout}
            avatar={avatar}
            avatarAlt={avatarAlt}
          />
        </div>
      )
    }))
  }

  render() {
    const { attributes: { uniqueId, items, autoPlay, dragable, nav, dots, dotIndicator, interval, speed, animation } } = this.props
    let options = JSON.stringify({
      autoplay: autoPlay,
      items: items,
      margin: 10,
      center: false,
      dots: dots,
      dot_indicator: dotIndicator,
      nav: nav,
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
    }
    )
    return (
      <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
        <div className="js-slider" id="jsSlider1" data-options={options} >
          {this.renderItem()}
        </div>
      </div>
    )


  }
}

export default Save