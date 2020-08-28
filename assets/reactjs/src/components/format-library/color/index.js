/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    Fragment,
    Component
} = wp.element;
const {
    toggleFormat,
    applyFormat,
} = wp.richText;
const {
    Popover,
    ColorPicker,
} = wp.components;
const { RichTextToolbarButton } = wp.blockEditor;

/**
 * Internal dependencies
 */
import icons from '../../../helpers/icons';
import '../../css/editorinline.scss';

const name = 'qubely/inlinecolor';
const title = __('Qubely Color');

export const color = {
    name,
    title,
    tagName: 'span',
    className: 'qubely-text-has-color',
    attributes: {
        style: 'style',
        data: 'data'
    },
    edit: class Color extends Component {
        constructor(props) {
            super(props)
            this.state = {
                showColorPicker: false
            }
        }
        findCurrentActiveColor = (value) => {
            let color
            let index = value.start
            if (value.formats[index]) {
                value.formats[index].forEach((format, index) => {
                    if (format.type == 'qubely/inlinecolor') {
                        color = format.attributes.data
                    }
                })
            }
            return color
        }

        render() {

            const { isActive, value, onChange } = this.props
            const { showColorPicker } = this.state
            let activeColor = this.findCurrentActiveColor(value);
            let isSelected = value.end - value.start > 0 ? true : false;
            const defColors = () => {
                let val = qubely_admin.palette;
                let { colors } = JSON.parse(localStorage.getItem('qubely-global-settings'));
                if (typeof colors !== 'undefined') {
                    val = colors
                }
                return val;
            }
            return (
                <Fragment>

                    <RichTextToolbarButton
                        icon={
                            <Fragment>
                                <span
                                    classname="qubely-inline qubely-inline-color"
                                    style={{ marginRight: '4px' }}>
                                    {icons.inlineColorIcon}
                                    <hr
                                        style={{
                                            color: activeColor ? activeColor : '#000',
                                            backgroundColor: activeColor ? activeColor : '#000',
                                            height: 5,
                                            margin: '0px 3px 0px 0px',
                                            border: '0px'
                                        }}
                                    />
                                </span>
                            </Fragment>
                        }
                        title={__('Qubely Color')}
                        onClick={() => {
                            !activeColor && this.setState({ showColorPicker: !showColorPicker })
                            if (activeColor == '#fff' || value.start === value.end) {
                                onChange(toggleFormat(value, {
                                    type: 'qubely/inlinecolor',
                                }))
                            }
                        }}
                        isActive={isActive}
                    />

                    {
                        showColorPicker &&
                        <Popover
                            onClickOutside={() => this.setState({ showColorPicker: false })}
                            noArrow={true}
                        >
                            <ColorPicker
                                color={'#de1515'}
                                onChangeComplete={newColor => {
                                    onChange(applyFormat(value, {
                                        type: 'qubely/inlinecolor',
                                        attributes: {
                                            style: `color: ${newColor.hex};`,
                                            data: newColor.hex
                                        },
                                        startIndex: value.start,
                                        endIndex: value.end
                                    }))
                                }} />
                            <div className="qubely-rgba-palette" style={{ padding: '0px 0px 15px 15px' }}>
                                {
                                    defColors().map((color, index) => (
                                        <button
                                            key={color}
                                            style={{ color: `var(--qubely-color-${index + 1})` }}
                                            onClick={() => {
                                                onChange(applyFormat(value, {
                                                    type: 'qubely/inlinecolor',
                                                    attributes: {
                                                        style: `color: var(--qubely-color-${index + 1});`,
                                                        data: `var(--qubely-color-${index + 1})`
                                                    },
                                                    startIndex: value.start,
                                                    endIndex: value.end
                                                }))
                                            }}
                                        />))
                                }
                            </div>
                        </Popover>
                    }
                </Fragment>
            );
        }
    }
};





