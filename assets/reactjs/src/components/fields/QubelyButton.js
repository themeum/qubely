const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText } = wp.editor
class QubelyButtonEdit extends Component {
    render() {
        const { buttonIconName, buttonIconPosition, buttonSize, buttonText, onTextChange } = this.props
        return (
            <div className="qubely-block-btn-wrapper">
                <div className={`qubely-block-btn`}>
                    <span className={`qubely-block-btn-anchor is-${buttonSize}`}>
                        {buttonIconName && (buttonIconPosition == 'left') && (<i className={`qubely-btn-icon ${buttonIconName}`} />)}
                        <RichText
                            key="editable"
                            keepPlaceholderOnFocus
                            placeholder={__('Add Text...')}
                            onChange={value => onTextChange(value)}
                            value={buttonText}
                        />
                        {buttonIconName && (buttonIconPosition == 'right') && (<i className={`qubely-btn-icon ${buttonIconName}`} />)}
                    </span>
                </div>
            </div>
        )
    }
}
class QubelyButtonSave extends Component {
    render() {
        const { buttonIconName, buttonIconPosition, buttonSize, buttonText, buttonUrl, buttonTag, buttonId } = this.props
        const buttonHtml = <Fragment>{buttonIconName && (buttonIconPosition == 'left') && (<i className={`qubely-btn-icon ${buttonIconName}`} />)}
            <RichText.Content value={(buttonText == '') ? 'Add Text...' : buttonText} />
            {buttonIconName && (buttonIconPosition == 'right') && (<i className={`qubely-btn-icon ${buttonIconName}`} />)}
        </Fragment>

        return (
            <div className="qubely-block-btn-wrapper">
                <div className={`qubely-block-btn`}>
                    {buttonTag == 'a' ?
                        <a className={`qubely-block-btn-anchor is-${buttonSize}`} {...buttonId ? 'id="' + buttonId + '"' : ''} href={buttonUrl.url ? buttonUrl.url : '#'} {...(buttonUrl.target && { target: '_blank' })} {...(buttonUrl.nofollow ? { rel: 'nofollow noopener noreferrer' } : { ...buttonUrl.target && { rel: 'noopener noreferrer' } })} >
                            {buttonHtml}
                        </a>
                        :
                        <button className={`qubely-block-btn-anchor is-${buttonSize}`} {...buttonId ? 'id="' + buttonId + '"' : ''} type="submit" role="button">
                            {buttonHtml}
                        </button>
                    }
                </div>
            </div>
        )
    }
}

export { QubelyButtonEdit, QubelyButtonSave }