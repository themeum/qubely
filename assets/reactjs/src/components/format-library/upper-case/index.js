/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    Fragment,
} = wp.element;
const {
    toggleFormat
} = wp.richText;

const { RichTextToolbarButton } = wp.blockEditor;

/**
 * Internal dependencies
 */
import icons from '../../../helpers/icons';
import '../../css/editorinline.scss';

const name = 'qubely/uppercase';
const title = __('Qubely Uppercase');

export const uppercase = {
    name,
    title,
    tagName: 'span',
    className: 'qubely-text-uppercase',
    attributes: {
        style: 'style'
    },
    edit(props) {
        const {
            isActive,
            value,
            onChange,
        } = props;

        const onToggle = () => onChange(toggleFormat(value, {
            type: name,
            attributes: {
                style: 'text-transform: uppercase;',
            }
        }));
        let isSelected = value.end - value.start > 0 ? true : false
        return (
            <Fragment>
                {
                    (isSelected || isActive) &&
                    <RichTextToolbarButton
                        icon={icons.upperCaseIcon}
                        title={__(title)}
                        onClick={onToggle}
                        isActive={isActive}
                    />
                }
            </Fragment>
        );

    }
};





