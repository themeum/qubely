import '../../css/editorinline.scss'
import icons from '../../../helpers/icons'
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element
const { toggleFormat, applyFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { registerFormatType } = wp.richText;
const { ColorPicker, Popover } = wp.components;

function defColors() {
    let val = [];
    const colors = window.globalData.settings;
    val.push(colors.colorPreset1 || qubely_admin.palette[0])
    val.push(colors.colorPreset2 || qubely_admin.palette[1])
    val.push(colors.colorPreset3 || qubely_admin.palette[2])
    val.push(colors.colorPreset4 || qubely_admin.palette[3])
    val.push(colors.colorPreset5 || qubely_admin.palette[4])
    val.push(colors.colorPreset6 || qubely_admin.palette[5])
    return val;
}

function registerFormat() {

    //inline text transform
    registerFormatType('qubely/uppercase', {
        name: 'qubely/uppercase',
        title: __('Uppercase'),
        tagName: 'span',
        className: 'qubely-text-uppercase',
        attributes: {
            style: 'style'
        },
        edit({ isActive, value, onChange }) {
            const onToggle = () => onChange(toggleFormat(value, {
                type: 'qubely/uppercase',
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
                            title={__('Uppercase')}
                            onClick={onToggle}
                            isActive={isActive}
                        />
                    }
                </Fragment>
            );

        },
    })


    //inline color
    registerFormatType('qubely/inlinecolor', {
        title: __('Color'),
        tagName: 'span',
        className: 'qubely-text-has-color',
        attributes: {
            style: 'style',
            data: 'data'
        },
        edit: class ChangeInlineColor extends Component {
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
                let activeColor = this.findCurrentActiveColor(value)
                let isSelected = value.end - value.start > 0 ? true : false
                return (
                    <Fragment>
                        {
                            (isSelected || isActive) &&
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
                                title={__('Color')}
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
                        }
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
                                        {defColors().map(color => <button style={{ color: color }} onClick={() => {
                                            onChange(applyFormat(value, {
                                                type: 'qubely/inlinecolor',
                                                attributes: {
                                                    style: `color: ${color};`,
                                                    data: color
                                                },
                                                startIndex: value.start,
                                                endIndex: value.end
                                            }))
                                        }} />)}
                                    </div>
                            </Popover>
                        }
                    </Fragment>
                );
            }
        }
    })
    //inline background-color
    registerFormatType('qubely/backgroundcolor', {
        title: __('BackgroundColor'),
        tagName: 'span',
        className: 'qubely-text-has-bgcolor',
        attributes: {
            style: 'style',
            data: 'data'
        },
        edit: class ChangeBackgroundColor extends Component {
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
                let isSelected = value.end - value.start > 0 ? true : false
                return (
                    <Fragment>
                        {
                            (isSelected || isActive) &&
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
                                title={__('Background Color')}
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
                        }
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
                                    {defColors().map(color => <button style={{ color: color }} onClick={() => {
                                        onChange(applyFormat(value, {
                                            type: 'qubely/backgroundcolor',
                                            attributes: {
                                                style: `background-color: ${color};`,
                                                data: color
                                            },
                                            startIndex: value.start,
                                            endIndex: value.end
                                        }))
                                    }} />)}
                                </div>

                            </Popover>
                        }
                    </Fragment>
                );
            }
        }
    })

}
registerFormat();
