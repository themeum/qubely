/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    Component,
    Fragment,
} = wp.element;
const {
    toggleFormat,
    removeFormat,
    applyFormat,
} = wp.richText;
const {
    Popover,
    Tooltip
} = wp.components;
const { RichTextToolbarButton } = wp.blockEditor;
/**
 * Internal dependencies
 */
import InlineTooltipUI from './inline';

const name = 'qubely/tooltip';
const title = __('Qubely Tooltip');

export const tooltip = {
    name,
    title,
    tagName: 'span',
    className: 'qubely-tooltip',
    attributes: {
        data: 'data-tooltip',
        ariaLabel: 'aria-label',
    },
    edit: class Tooltip extends Component {
        constructor(props) {
            super(props)
            this.state = {
                addingTooltip: false,
                tooltipText: '',
            }
            this.stopAddingTooltip = this.stopAddingTooltip.bind(this);
        }
        stopAddingTooltip() {
            this.setState({ addingTooltip: false });
            this.props.onFocus();
        }
        render() {
            const {
                value,
                isActive,
                onChange,
                activeAttributes
            } = this.props;
            const {
                addingTooltip,
                tooltipText,
            } = this.state;

            return (
                <Fragment>
                    <RichTextToolbarButton
                        icon={'editor-code'}
                        title={__('Qubely Tooltip')}
                        onClick={() => {
                            this.setState({
                                addingTooltip: true
                            });
                        }}
                        isActive={isActive}
                    />

                    {
                        (addingTooltip || isActive) &&
                        <InlineTooltipUI
                            value={value}
                            onChange={onChange}
                            isActive={isActive}
                            activeAttributes={activeAttributes}
                            addingTooltip={addingTooltip}
                            stopAddingTooltip={this.stopAddingTooltip}
                        />
                    }
                </Fragment>
            );
        }
    }
};





