const { Fragment, Component } = wp.element
const { RichText} = wp.editor
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {
  render() {
  const { uniqueId, animation, alignment, message, messagePosition, name, designation, avatar, avatarAlt, avatarLayout, quoteIconPosition, quoteIcon, ratings, ratingsPosition } = this.props.attributes

    const testimonialTitle = <RichText.Content tagName="span" value={name} />
    const testimonialDesignation = <RichText.Content tagName="span" value={designation} />
    const testimonialMessage = <RichText.Content tagName="div" value={message} />

    const testimonialRating = <Fragment>
                    { ratings > 0 && (ratingsPosition == 'top') &&
                        <div className="qubely-testimonial-ratings qubely-position-top" data-qubelyrating={ratings}></div>
                    }
                    <div className="qubely-testimonial-content qubely-position-top">{testimonialMessage}</div>
                    { ratings > 0 && (ratingsPosition == 'bottom') &&
                        <div className="qubely-testimonial-ratings qubely-position-bottom" data-qubelyrating={ratings}></div>
                    }
                </Fragment>

    return (
      <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
            <div className={`qubely-block-testimonial qubely-alignment-${alignment} qubely-testimonial-message-${messagePosition}`}>
                { quoteIcon && (quoteIconPosition == 'top') &&
                    <div className="qubely-testimonial-quote qubely-position-top"><span className={`qubely-quote-icon ${quoteIcon}`}></span></div>
                }
                { messagePosition == 'top' && testimonialRating }
                <div className={`qubely-testimonial-author qubely-testimonial-avatar-layout-${avatarLayout}`}>
                    {avatar.url &&
                        <img className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} />
                    }
                    <div className="qubely-testimonial-author-info">
                        <div className="qubely-testimonial-author-name">{testimonialTitle}</div>
                        <div className="qubely-testimonial-author-designation">{testimonialDesignation}</div>
                    </div>
                </div>
                { messagePosition == 'bottom' && testimonialRating }
                { quoteIcon && (quoteIconPosition == 'bottom') &&
                    <div className="qubely-testimonial-quote qubely-position-bottom"><span className={`qubely-quote-icon ${quoteIcon}`}></span></div>
                }
            </div>
		</div>
    )
  }
}

export default Save