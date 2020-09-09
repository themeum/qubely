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

const name = 'qubely/backgroundcolor';
const title = __('Qubely Background');

export const backgroundColor = {
    name,
    title,
    tagName: 'span',
    className: 'qubely-text-has-bgcolor',
    attributes: {
        style: 'style',
        data: 'data'
    },
    edit: class BackgroundColor extends Component {
        constructor(props) {
            super(props)
            this.state = {
                showColorPicker: false
            }
        }
        findCurrentBgActiveColor = (value) => {
            let color
            let index = value.start
            if (value.formats[index]) {
                value.formats[index].forEach((format, index) => {
                    if (format.type == 'qubely/backgroundcolor') {
                        color = format.attributes.data
                    }
                })
            }
            return color
        }

        render() {
            const { isActive, value, onChange } = this.props
            const { showColorPicker } = this.state
            let activeBackgroundColor = this.findCurrentBgActiveColor(value)
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
                                    style={{ marginRight: '4px' }}
                                >
                                    {icons.highlighterIcon}
                                    <hr
                                        style={{
                                            color: activeBackgroundColor ? activeBackgroundColor : '#000',
                                            backgroundColor: activeBackgroundColor ? activeBackgroundColor : '#000',
                                            height: 5,
                                            margin: '0px 3px 0px 0px',
                                            border: '0px'
                                        }}
                                    />
                                </span>
                            </Fragment>

                        }
                        title={title}
                        onClick={() => {
                            !activeBackgroundColor && this.setState({ showColorPicker: !showColorPicker })
                            if (activeBackgroundColor == '#fff' || value.start === value.end) {
                                onChange(toggleFormat(value, {
                                    type: 'qubely/backgroundcolor',
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
                                color={'#15e0c5'}
                                onChangeComplete={newColor => {
                                    onChange(applyFormat(value, {
                                        type: 'qubely/backgroundcolor',
                                        attributes: {
                                            style: `background-color: ${newColor.hex};`,
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
                                                    type: 'qubely/backgroundcolor',
                                                    attributes: {
                                                        style: `background-color: var(--qubely-color-${index + 1});`,
                                                        data: `var(--qubely-color-${index + 1})`
                                                    },
                                                    startIndex: value.start,
                                                    endIndex: value.end
                                                }))
                                            }}
                                        />
                                    ))
                                }
                            </div>

                        </Popover>
                    }
                </Fragment>
            );
        }
    }
};





