const { __ } = wp.i18n
const { Component } = wp.element
const { Toolbar } = wp.components
import icons from '../../../helpers/icons';
const defaultOptions = [['h1', 'Heading 1'], ['h2', 'Heading 2'], ['h3', 'Heading 3'], ['h4', 'Heading 4'], ['h5', 'Heading 5'], ['h6', 'Heading 6'], ['p', 'Paragraph'], ['span', 'span'], ['div', 'div']]

class InlineSelector extends Component {
    headingController = (newSelector) => {
        const { selector, setAttributes } = this.props
        const [tag, description] = newSelector
        return [{
            icon: icons[tag],
            title: sprintf(__(description)),
            isActive: tag === selector,
            onClick: () => setAttributes({ selector: tag }),
            subscript: String(tag),
        }];
    };
    render() {
        const { selector, options } = this.props
        return (
            <Toolbar
                isCollapsed={true}
                icon={icons[selector]}
                label={__('Change Heading')}
                controls={(options || defaultOptions).map(newSelector => this.headingController(newSelector))}
            />
        )
    }
}
export default InlineSelector