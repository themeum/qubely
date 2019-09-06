const { Component, Fragment } = wp.element
const { RichText } = wp.editor
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {
  renderAvatar = (avatar, avatarAlt) => {
    return (
      <Fragment>
        {avatar.url != undefined ?
          <img className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} />
          :
          <div className="qubely-image-placeholder qubely-testimonial-avatar"><i className="far fa-user"></i></div>
        }
      </Fragment>
    )
  }
  renderAuthorInfo = (item) => {
    const { attributes: { layout, showAvatar, avatarAlt, avatarLayout } } = this.props
    const { author, designation, avatar } = item

    return (
      <div className={`qubely-testimonial-author`}>

        {(layout === 3 && showAvatar) && this.renderAvatar(avatar, avatarAlt)}

        <div className={showAvatar ? `qubely-testimonial-avatar-layout-${avatarLayout}` : ``}>

          {(layout !== 3 && showAvatar && (avatarLayout == 'left' || avatarLayout == 'top')) && this.renderAvatar(avatar, avatarAlt)}

          <div className="qubely-testimonial-author-info">
            <div className="qubely-testimonial-author-name"><RichText.Content value={author} /></div>
            <div className="qubely-testimonial-author-designation"><RichText.Content value={designation} /></div>
          </div>

          {(layout !== 3 && showAvatar && (avatarLayout == 'right' || avatarLayout == 'bottom')) && this.renderAvatar(avatar, avatarAlt)}
        </div>
      </div>
    )
  }
  renderTestimonial() {
    const { attributes: { carouselItems, layout, quoteIcon } } = this.props

    return (carouselItems.map((item, index) => {
      const { message, ratings } = item
      return (
        <div key={index} className="js-item" >
          <div className={`qubely-tesitmonial-item`}>

            {layout == 2 && this.renderAuthorInfo(item)}
            {
              (quoteIcon && layout == 1) &&
              <div className="qubely-testimonial-quote">
                <span className={`qubely-quote-icon ${quoteIcon}`}></span>
              </div>
            }
            <div className={`qubely-testimonial-carousel-content-wrapper`}>
              {(ratings > 0 && layout !== 1) && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>}
              <div className="qubely-testimonial-content"> <RichText.Content value={message} /></div>
              {(ratings > 0 && layout == 1) && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings} />}
            </div>
            {layout === 3 && <span class="qubely-testimonial-carousel-arrow-down"></span>}
            {layout !== 2 && this.renderAuthorInfo(item)}

            {
              (quoteIcon && layout == 2) &&
              <div className="qubely-testimonial-quote qubely-position-bottom">
                <span className={`qubely-quote-icon ${quoteIcon}`}></span>
              </div>
            }

          </div>
        </div>
      )
    }))
  }

  render() {
    const { attributes: { uniqueId, layout, items, autoPlay, dragable, nav, dots, dotIndicator, interval, speed, animation } } = this.props
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
        <div className={`qubely-block-testimonial-carousel qubely-layout-${layout}`}>
          <div className="js-slider" data-options={options} >
            {this.renderTestimonial()}
          </div>
        </div>
      </div>
    )


  }
}

export default Save