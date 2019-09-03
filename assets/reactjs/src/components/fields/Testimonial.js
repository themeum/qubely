const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText, MediaUpload } = wp.editor
class TestimonialEdit extends Component {

    renderName = () => {
        const { updateAtrributes, name, index } = this.props
        return (
            <RichText
                key="editable"
                keepPlaceholderOnFocus
                placeholder={__('Add Name...')}
                formattingControls={['bold', 'italic', 'link', 'strikethrough']}
                onChange={value => updateAtrributes('author', value, index)}
                value={name}
            />
        )
    }
    renderDesignation = () => {
        const { updateAtrributes, designation, index } = this.props
        return (
            <RichText
                key="editable"
                placeholder={__('Add designation...')}
                formattingControls={['bold', 'italic', 'link', 'strikethrough']}
                keepPlaceholderOnFocus
                onChange={value => updateAtrributes('designation', value, index)}
                value={designation}
            />

        )
    }
    renderMessage = () => {
        const { updateAtrributes, message, index } = this.props
        return (
            <RichText
                key="editable"
                placeholder={__('Add Message...')}
                formattingControls={['bold', 'italic', 'link', 'strikethrough']}
                keepPlaceholderOnFocus
                onChange={value => updateAtrributes('message', value, index)}
                value={message}
            />
        )
    }
    renderAvatar = () => {
        const { avatar, avatarAlt, updateAtrributes, index } = this.props
        return (

            <MediaUpload
                onSelect={val => updateAtrributes('avatar', val, index)}
                allowedTypes={['image']}
                multiple={false}
                value={avatar}
                render={({ open }) => (
                    <div className="qubely-single-img">
                        {
                            (avatar && avatar.url) ?
                                <img onClick={open} className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} />
                                :
                                <div onClick={open} className="qubely-image-placeholder qubely-testimonial-avatar" ><i className="far fa-user"></i></div>
                        }
                    </div>
                )}
            />

        )
    }
    renderAuthorInfo = () => {
        const { showAvatar, avatarLayout } = this.props
        return (
            <div className={`qubely-testimonial-author`}>
                <div className={showAvatar ? `qubely-testimonial-avatar-layout-${avatarLayout}` : ``}>
                    {showAvatar && (avatarLayout == 'left' || avatarLayout == 'top') && this.renderAvatar()}

                    <div className="qubely-testimonial-author-info">
                        <div className="qubely-testimonial-author-name" >{this.renderName()}</div>
                        <div className="qubely-testimonial-author-designation" >{this.renderDesignation()}</div>
                    </div>

                    {showAvatar && (avatarLayout == 'right' || avatarLayout == 'bottom') && this.renderAvatar()}
                </div>
            </div>
        )
    }

    render() {
        const { layout, ratings, quoteIcon } = this.props

        return (

            <div>

                { (layout == 1 || layout == 2) && 
                    <div className={`qubely-block-testimonial`}>

                        {layout == 2 && this.renderAuthorInfo()}

                        {ratings > 0 && layout == 2 && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>}

                        {
                            quoteIcon && layout == 1 && <div className="qubely-testimonial-quote" >
                                <span className={`qubely-quote-icon ${quoteIcon}`}></span>
                            </div>
                        }
                        <div className="qubely-testimonial-content" >
                            {this.renderMessage()}
                        </div>
                        {ratings > 0 && layout == 1 && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>}
                        {layout == 1 && this.renderAuthorInfo()}
                        {
                            quoteIcon && layout == 2 &&
                            <div className="qubely-testimonial-quote qubely-position-bottom" >
                                <span className={`qubely-quote-icon ${quoteIcon}`}></span>
                            </div>
                        }
                    </div>
                }



                { layout == 3 && 
                    <div className="qubely-layout-three">
                        <div className={`qubely-block-testimonial`}>
                            <div className="qubely-testimonial-content">
                                {ratings > 0 && layout == 3 && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>}
                                {this.renderMessage()}
                            </div>

                            
                        </div>
                        <span class="dashicons dashicons-arrow-down"></span>

                        {layout == 3 && this.renderAuthorInfo()}
                        
                        

                    </div>
                }




            </div>
        )
    }
}
class TestimonialSave extends Component {

    renderAuthorInfo = () => {
        const { name, designation, showAvatar, avatar, avatarAlt, avatarLayout } = this.props

        return (
            <div className={`qubely-testimonial-author`}>
                <div className={showAvatar ? `qubely-testimonial-avatar-layout-${avatarLayout}` : ``}>
                    {showAvatar && (avatarLayout == 'left' || avatarLayout == 'top') &&
                        <Fragment>
                            {avatar.url != undefined ?
                                <img className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} />
                                :
                                <div className="qubely-image-placeholder qubely-testimonial-avatar"><i className="far fa-user"></i></div>
                            }
                        </Fragment>
                    }

                    <div className="qubely-testimonial-author-info">
                        <div className="qubely-testimonial-author-name"><RichText.Content value={name} /></div>
                        <div className="qubely-testimonial-author-designation"><RichText.Content value={designation} /></div>
                    </div>

                    {showAvatar && (avatarLayout == 'right' || avatarLayout == 'bottom') &&
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
        )
    }
    render() {
        const { layout, message, quoteIcon, ratings } = this.props

        return (
            <div className={`qubely-block-testimonial`}>

                {layout == 2 && this.renderAuthorInfo()}
                {ratings > 0 && layout == 2 && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings}></div>}
                {
                    (quoteIcon && layout == 1) &&
                    <div className="qubely-testimonial-quote">
                        <span className={`qubely-quote-icon ${quoteIcon}`}></span>
                    </div>
                }
                <div className="qubely-testimonial-content"> <RichText.Content value={message} /></div>
                {ratings > 0 && layout == 1 && <div className="qubely-testimonial-ratings" data-qubelyrating={ratings} />}
                {layout == 1 && this.renderAuthorInfo()}

                {
                    (quoteIcon && layout == 2) &&
                    <div className="qubely-testimonial-quote qubely-position-bottom">
                        <span className={`qubely-quote-icon ${quoteIcon}`}></span>
                    </div>
                }

            </div>

        )
    }
}
export { TestimonialEdit, TestimonialSave }