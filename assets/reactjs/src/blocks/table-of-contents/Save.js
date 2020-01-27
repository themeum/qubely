import classnames from 'classnames';
import { TableOfContents } from './components';
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
            align,
            showTitle,
            scrollToTop,
            title,
            headerLinks,
            animation,
            interaction
        } = this.props.attributes

        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

        const classes = classnames(
            `qubely-block-${uniqueId}`,
            'qubely-block-table-of-contents',
            `qubely-align-${align}`,
        );
        return (
            <div className={classes} {...animationAttr(animation)}>
                <div className={`qubely-table-of-contents ${interactionClass}`} data-scroll={scrollToTop}>
                    {
                        showTitle &&
                        <RichText.Content
                            className='title'
                            value={title}
                        />
                    }
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