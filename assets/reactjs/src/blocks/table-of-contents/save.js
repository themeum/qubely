import { TableOfContents,TableOfContents2 } from './components';
const { Component } = wp.element;
const { RichText } = wp.blockEditor
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.qubelyComponents;

class Save extends Component {

    render() {
        const {
            uniqueId,
            className,
            headerLinks,
            animation,
            interaction
        } = this.props.attributes

        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`qubely-block-table-of-contents ${interactionClass}`}>
                    <TableOfContents
                        headers={headerLinks && JSON.parse(headerLinks)}
                        blockProp={this.props}
                        frontend
                    />
                </div>
            </div>
        )
    }
}
export default Save