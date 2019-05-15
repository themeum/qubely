const { Fragment, Component } = wp.element
const { RichText} = wp.editor
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {
  render() {
  const { uniqueId, layout, animation, message, name, designation, avatar, avatarAlt, avatarLayout, quoteIcon, ratings } = this.props.attributes

    const testimonialTitle = <RichText.Content tagName="span" value={name} />
    const testimonialDesignation = <RichText.Content tagName="span" value={designation} />
    const testimonialMessage = <RichText.Content tagName="div" value={message} />

    const authorInfo = <Fragment>
        <div className={`qubely-testimonial-author`}>
            <div className={`qubely-testimonial-avatar-layout-${avatarLayout}`}>
                {(avatarLayout == 'left' || avatarLayout == 'top') &&
                    <Fragment>
                        {avatar.url != undefined ?
                            <img className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} />
                            :
                            <div className="qubely-image-placeholder qubely-testimonial-avatar"><i className="far fa-user"></i></div>
                        }
                    </Fragment>
                }
                
                <div className="qubely-testimonial-author-info">
                    <div className="qubely-testimonial-author-name">{testimonialTitle}</div>
                    <div className="qubely-testimonial-author-designation">{testimonialDesignation}</div>
                </div>

                {(avatarLayout == 'right' || avatarLayout == 'bottom') &&
                    <Fragment>
                        {avatar.url != undefined ?
                            <img className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} />
                            :
                            <div className="qubely-image-placeholder qubely-testimonial-avatar"><i className="far fa-user"></i></div>
                        }
                    </Fragment>
                }
            </div>
        </div>
    </Fragment>

    return (
      <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
            <div className={`qubely-block-testimonial`}>
            
                { layout == 2 && authorInfo }

                {ratings > 0 && (layout == 2) &&
                    <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>
                }

                { (quoteIcon && (layout == 1)) &&
                    <div className="qubely-testimonial-quote">
                        <span className={`qubely-quote-icon ${quoteIcon}`}></span>
                    </div>
                }

                <div className="qubely-testimonial-content">
                    {testimonialMessage}
                </div>

                {ratings > 0 && (layout == 1) &&
                    <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>
                }

                { layout == 1 && authorInfo }

                { (quoteIcon && (layout == 2)) &&
                    <div className="qubely-testimonial-quote qubely-position-bottom">
                        <span className={`qubely-quote-icon ${quoteIcon}`}></span>
                    </div>
                }
                
            </div>
		</div>
    )
  }
}

export default Save