const { Component } = wp.element;
const { InnerBlocks, RichText } = wp.editor;
const { HelperFunction: { animationAttr } } = wp.qubelyComponents
class Save extends Component {
    render() {
        const { uniqueId, itemNumber, heading, panelIcon, iconPosition, fillType, animation, openFirstItem } = this.props.attributes;
        const className = `qubely-accordion-item qubely-type-${fillType} ${openFirstItem && itemNumber == 0 && 'qubely-accordion-active'}`;
        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={className}>
                    <div className={`qubely-accordion-panel ${panelIcon && 'qubely-icon-position-' + iconPosition}`}>
                        <span className="qubely-accordion-panel-handler" role="button">
                            {(panelIcon && iconPosition == 'left') && <span className={`qubely-accordion-icon ${panelIcon}`} />}
                            <RichText.Content tagName="span" className="qubely-accordion-panel-handler-label" value={heading} />
                            {(panelIcon && iconPosition == 'right') && <span className={`qubely-accordion-icon ${panelIcon}`} />}
                        </span>
                    </div>
                    <div className="qubely-accordion-body" style={openFirstItem && itemNumber == 0 && 'display: block;'}>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        );
    }
}
export default Save