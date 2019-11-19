const { Component, Fragment } = wp.element;
const { RichText } = wp.blockEditor
const { HelperFunction: { IsInteraction, animationAttr } } = wp.qubelyComponents

class Save extends Component {

    renderImage = () => {
        const { attributes: { image, image2x, imgAlt } } = this.props
        return (
            <Fragment>
                {image.url != undefined ?
                    <Fragment>
                        {image2x.url != undefined ?
                            <img className="qubely-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
                            :
                            <img className="qubely-image-image" src={image.url} alt={imgAlt && imgAlt} />
                        }
                    </Fragment>
                    :
                    <div className="qubely-image-image qubely-image-placeholder"><i className="far fa-image" /></div>
                }
            </Fragment>
        )
    }

    render() {
        const {
            attributes: {
                uniqueId,
                layout,
                imageUrl,
                animateOnHover,
                titleVisibleOnHover,
                subTitleVisibleOnHover,
                title,
                titleLevel,
                subTitle,
                enableSubTitle,
                imageCaption,
                enableCaption,
                contentAnimation,
                contentVerticalAlign,
                contentAlignment,
                enableFrame,
                frameAnimateOnHover,
                interaction,
                animation }
        } = this.props

        const titleTagName = 'h' + titleLevel;
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

        return (
            <div className={`qubely-block-${uniqueId}`}  {...animationAttr(animation)}>
            {/* <div className={`qubely-block-${uniqueId}`}> */}
                <div className={`qubely-block-image ${interactionClass} qubely-image-layout-${layout}`}>
                    <div className={`qubely-image-media${(layout == 'blurb' && animateOnHover == 1) ? ' qubely-hover-animation-on' : ''}${(layout == 'blurb' && animateOnHover == 1) ? ' qubely-hover-animation-type-' + contentAnimation : ''} qubely-vertical-alignment-${contentVerticalAlign} qubely-horizontal-alignment-${contentAlignment}${enableFrame == 1 ? ((animateOnHover == 1 && frameAnimateOnHover == 1) ? ' qubely-has-frame qubely-frame-animate-on-hover' : ' qubely-has-frame') : ''}`}>
                        <figure>
                            <div className="qubely-image-container">
                                {
                                    (imageUrl.url && layout === 'simple') ?
                                        <a href={imageUrl.url ? imageUrl.url : '#'} {...(imageUrl.target && { target: '_blank' })} {...(imageUrl.nofollow ? { rel: 'nofollow noopener noreferrer' } : { ...imageUrl.target && { rel: 'noopener noreferrer' } })}>
                                            {this.renderImage()}
                                        </a>
                                        : this.renderImage()
                                }

                                {layout == 'blurb' &&
                                    <div className="qubely-image-content">
                                        <div className="qubely-image-content-inner">
                                            <RichText.Content
                                                tagName={titleTagName}
                                                className={`qubely-image-title${(animateOnHover == 1 && enableSubTitle == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' qubely-visible-on-hover-enabled' : ''}${(animateOnHover == 1 && titleVisibleOnHover == 1) ? ' qubely-visible-on-hover' : ''}`}
                                                value={title} />

                                            {enableSubTitle == 1 &&
                                                <RichText.Content
                                                    tagName='div'
                                                    className={`qubely-image-sub-title${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' qubely-visible-on-hover-enabled' : ''}${titleVisibleOnHover == 1 ? ' qubely-visible-on-hover' : (animateOnHover == 1 && subTitleVisibleOnHover == 1) ? ' qubely-visible-on-hover' : ''}`}
                                                    value={subTitle} />
                                            }
                                        </div>
                                    </div>
                                }
                            </div>

                            {(layout == 'simple' && enableCaption == 1) &&
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