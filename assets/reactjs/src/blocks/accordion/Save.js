const { Component } = wp.element;
const { InnerBlocks } = wp.editor;
const { HelperFunction: { animationAttr } } = wp.qubelyComponents
class Save extends Component {
    render() {
        const { animation, uniqueId, itemToggle } = this.props.attributes;
        const className = `qubely-block-accordion qubely-block-${uniqueId}`;
        return (
            <div className={ className } {...animationAttr(animation)} data-item-toggle={itemToggle}>
                <InnerBlocks.Content />
            </div>
        );
    }
}
export default Save;