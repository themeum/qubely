import Progress from './Progress'
const { RichText } = wp.editor;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.qubelyComponents

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
        heading,
        animation, 
        interaction
    } = props.attributes

    const progressAttr = {
        size,
        layout,
        corner: layout === 'fill' ? 'unset' : corner,
        uniqueId,
        percent: progress
    }
    const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
    return (
        <div className={`qubely-block-${uniqueId} qubely-block-pie-progress ${interactionClass}`} {...animationAttr(animation)}>
            <div className="qubely-progress-parent">
                <Progress {...progressAttr} />
                {enableIcon && (
                    <div className="qubely-progress-inner-text">
                        {iconStyle === 'text' && (
                            <RichText.Content
                                tagName="div"
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
                                tagName="div"
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
