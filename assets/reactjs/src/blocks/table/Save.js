const { Component, Fragment } = wp.element;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.qubelyComponents
class Save extends Component {
    render() {

        const {
            attributes: {
                uniqueId,
                animation,
                interaction
            }
        } = this.props
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        return (

            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`qubely-block-countdown ${interactionClass}`} >
                    Save Here
                </div>
            </div>
        );
    }
}

export default Save;