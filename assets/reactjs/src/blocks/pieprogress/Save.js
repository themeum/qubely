import Progress from './Progress'
const { __ } = wp.i18n
const { RichText } = wp.editor;

const Save = (props) => {
    const {
        uniqueId,
        progress,
        size,
        layout,
        corner,
        enableIcon,
        iconStyle,
        iconText,
        iconName,
        image,
        imageAlt,
        enableHeading,
        headingPosition,
        heading
    } = props.attributes

    const progressAttr = {
        size,
        layout,
        corner: layout === 'fill' ? 'unset' : corner,
        uniqueId,
        percent: progress
    }

    return (
        <div className={`qubely-block-${uniqueId} qubely-block-pie-progress`}>
            <div className="qubely-progress-parent">
                <Progress {...progressAttr} />
                {enableIcon && (
                    <div className="qubely-progress-inner-text">
                        {iconStyle === 'text' && (
                            <RichText.Content
                                value={iconText}
                            />
                        )}
                        {iconStyle === 'icon' && (
                            <span className={`qubely-pie-icon ${iconName}`} />
                        )}
                        {iconStyle === 'image' && (
                            <div className={'icon-image ' + (image.url === undefined && 'pie-placeholder')}>
                                {
                                    image.url !== undefined ? (
                                        <img className="qubely-pie-image" src={image.url} alt={imageAlt && imageAlt} />
                                    ) : (
                                            <span className="qubely-pie-placeholder far fa-image" />
                                        )
                                }
                            </div>
                        )}

                        {(enableHeading && headingPosition === 'inside') && (
                            <RichText.Content
                                value={heading}
                                className="qubely-pie-progress-heading"
                            />
                        )}
                    </div>
                )}
            </div>


            {(enableHeading && headingPosition === 'outside') && (
                <RichText.Content
                    value={heading}
                    className="qubely-pie-progress-heading qubely-outside"
                />
            )}
        </div>
    )
}

export default Save
