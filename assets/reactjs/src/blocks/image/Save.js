const { Component } = wp.element;
const { RichText } = wp.editor

class Save extends Component {

    render() {
        const { attributes: { uniqueId, layout, image, imgAlt, animateOnHover, titleVisibleOnHover, subTitleVisibleOnHover, title, titleLevel, subTitle, enableSubTitle, imageCaption, enableCaption, contentAnimation, contentVerticalAlign, contentAlignment, enableFrame, frameAnimateOnHover } } = this.props

        const titleTagName = 'h' + titleLevel;

        return (
            <div className={`qubely-block-${uniqueId}`}>
                <div className={`qubely-block-image qubely-image-layout-${layout}`}>
                    <div className={`qubely-image-media${ (layout == 'blurb' && animateOnHover == 1) ? ' qubely-hover-animation-on' : '' }${ (layout == 'blurb' && animateOnHover == 1) ? ' qubely-hover-animation-type-' + contentAnimation : '' } qubely-vertical-alignment-${contentVerticalAlign} qubely-horizontal-alignment-${contentAlignment}${enableFrame == 1 ? ( (animateOnHover == 1 && frameAnimateOnHover == 1) ? ' qubely-has-frame qubely-frame-animate-on-hover' : ' qubely-has-frame' ) : ''}`}>
                        <figure>
                            <div className="qubely-image-container">
                                
                                {image.url != undefined ?
                                    <img className="qubely-image-image" src={image.url} alt={imgAlt && imgAlt} />
                                    :
                                    <div className="qubely-image-image qubely-image-placeholder"><i className="far fa-image"></i></div>
                                }

                                {layout == 'blurb' &&
                                    <div className="qubely-image-content">
                                        <div className="qubely-image-content-inner">
                                            <RichText.Content
                                                tagName={titleTagName}
                                                className={`qubely-image-title${ (animateOnHover == 1 && enableSubTitle == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' qubely-visible-on-hover-enabled' : ''}${ (animateOnHover == 1 && titleVisibleOnHover == 1) ? ' qubely-visible-on-hover' : ''}`}
                                                value={title} />                                        

                                            {enableSubTitle == 1 &&
                                                <RichText.Content
                                                    tagName='div'
                                                    className={`qubely-image-sub-title${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' qubely-visible-on-hover-enabled' : ''}${ titleVisibleOnHover == 1 ? ' qubely-visible-on-hover' : (animateOnHover == 1 && subTitleVisibleOnHover == 1) ? ' qubely-visible-on-hover' : '' }`}
                                                    value={subTitle} />
                                            }
                                        </div>
                                    </div>
                                }
                            </div>

                            {enableCaption &&
                                <RichText.Content
                                    tagName='figcaption'
                                    className="qubely-image-caption"
                                    value={imageCaption} />
                            }
                        </figure>
                    </div>
                </div>
            </div>
        );
    }
}

export default Save;