import Progress from './Progress'
const { __ } = wp.i18n

const Save = (props) => {
    const {
        uniqueId,
        progress,
        size,
        thickness,
        background,
        fillColor,layout,
        corner,
        thicknessCalc,
        thicknessBgCalc,
        circleShadow,
        progressShadow,
        circleShrink,
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
        percent: progress,
        thickness: thicknessCalc[layout],
        thicknessBg: thicknessBgCalc[layout],
        emptyFill: background,
        fill: fillColor,
        circleShadow,
        progressShadow,
        circleShrink: ((size - thickness) * .5) * circleShrink / 100
    }
    return (
        <div className={`qubely-block-${uniqueId} qubely-block-pie-progress`}>
            <div className="qubely-progress-parent">
                <Progress {...progressAttr} />
                {enableIcon && (
                    <div className="qubely-progress-inner-text">
                        {iconStyle === 'text' && (
                            <div>{iconText}</div>
                        )}
                        {iconName && (
                            <span className={`qubely-pie-icon ${iconName}`} />
                        )}
                        {iconStyle === 'image' && (
                            <div className={'icon-image ' + (image.url === undefined && 'pie-placeholder')}>
                                {
                                    image.url !== undefined ? (
                                        <img className="qubely-pie-image" src={image.url} alt={imageAlt && imageAlt}/>
                                    ) : (
                                        <span className="qubely-pie-placeholder far fa-image" />
                                    )
                                }
                            </div>
                        )}

                        {(enableHeading && headingPosition === 'inside') && (
                            heading &&  <div className="qubely-pie-progress-heading">
                                {heading}
                            </div>
                        )}

                    </div>
                )}
            </div>

            {(enableHeading && headingPosition === 'outside') && (
                heading &&  <div className="qubely-pie-progress-heading qubely-outside">
                    {heading}
                </div>
            )}
        </div>
    )
}

export default Save
