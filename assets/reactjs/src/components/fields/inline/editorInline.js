const { __ } = wp.i18n;
import '../../css/editorinline.scss'
const { Component, Fragment } = wp.element
const { toggleFormat, applyFormat } = wp.richText;
const { RichTextToolbarButton, RichTextShortcut } = wp.editor;
const { registerFormatType } = wp.richText;
const { ColorPicker } = wp.components;
const { Dropdown } = wp.components

function registerFormat() {
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
                            icon={upperCaseIcon}
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
                let activeColor = this.findCurrentActiveColor(value)
                let isSelected = value.end - value.start > 0 ? true : false
                return (
                    <Fragment>
                        {
                            (isSelected || isActive) &&
                            <RichTextToolbarButton
                                icon={
                                    <Dropdown
                                        className="qubely-richtext-color"
                                        contentClassName="qubely-richtext-color-picker"
                                        position="bottom right"
                                        renderToggle={({ isOpen, onToggle }) => (
                                            <button className="qubely-color-picker-icon-wraper" onClick={() => { value.start !== value.end && onToggle() }} aria-expanded={isOpen} style={{ backgroundColor: isActive && '#555d66', color: isActive && '#fff' }}  >
                                                {inlineColorIcon}
                                                <hr 
                                                    style={{
                                                        color: activeColor ? activeColor : '#000',
                                                        backgroundColor: activeColor ? activeColor : '#000',
                                                        height: 6,
                                                        margin: '0px -1px 3px -1px',
                                                        border: '0px'
                                                    }}
                                                />
                                            </button>
                                        )}
                                        renderContent={() => (
                                            <ColorPicker color={'#de1515'} onChangeComplete={newColor => {
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
                                        )}
                                    />
                                }
                                title={__('Color')}
                                onClick={() => {
                                    if (activeColor == '#fff' || value.start === value.end) {
                                        onChange(toggleFormat(value, {
                                            type: 'qubely/inlinecolor',
                                        }))
                                    }
                                }}
                                isActive={isActive}
                            />
                        }
                    </Fragment>
                );
            }
        }
    })

    registerFormatType('qubely/backgroundcolor', {
        title: __('BackgroundColor'),
        tagName: 'span',
        className: 'qubely-text-has-bgcolor',
        attributes: {
            style: 'style',
            data: 'data'
        },
        edit: class ChangeBackgroundColor extends Component {
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
                const { isActive, value, onChange } = this.props;
                let activeBackgroundColor = this.findCurrentBgActiveColor(value)
                let isSelected = value.end - value.start > 0 ? true : false
                return (
                    <Fragment>
                        {
                            (isSelected || isActive) &&
                            <RichTextToolbarButton
                                icon={
                                    <Dropdown
                                        className="qubely-richtext-background-color"
                                        contentClassName="qubely-richtext-backgroundcolor-picker"
                                        position="bottom right"
                                        renderToggle={({ isOpen, onToggle }) => (
                                            <button className="qubely-color-picker-icon-wraper" onClick={() => { value.start !== value.end && onToggle() }} aria-expanded={isOpen} style={{ paddingTop: '2px', backgroundColor: isActive && '#555d66', color: isActive && '#fff' }} >
                                                {highlighterIcon}
                                                <hr
                                                    style={{
                                                        color: activeBackgroundColor ? activeBackgroundColor : '#000',
                                                        backgroundColor: activeBackgroundColor ? activeBackgroundColor : '#000',
                                                        height: 6,
                                                        margin: '1px -1px 3px -1px',
                                                        border: '0px'
                                                    }}
                                                />
                                            </button>

                                        )}
                                        renderContent={() => (
                                            <ColorPicker color={'#15e0c5'} onChangeComplete={newColor => {
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
                                        )}
                                    />
                                }
                                title={__('Background Color')}
                                onClick={() => {
                                    if (activeBackgroundColor == '#fff' || value.start === value.end) {
                                        onChange(toggleFormat(value, {
                                            type: 'qubely/backgroundcolor',
                                        }))
                                    }
                                }}
                                isActive={isActive}
                            />
                        }
                    </Fragment>
                );
            }
        }
    })

}
registerFormat();

const inlineColorIcon = <svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-editor-textcolor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M13.23 15h1.9L11 4H9L5 15h1.88l1.07-3h4.18zm-1.53-4.54H8.51L10 5.6z"></path></svg>
const highlighterIcon = <svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-admin-customizer" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 20 20"><path d="M18.33 3.57s.27-.8-.31-1.36c-.53-.52-1.22-.24-1.22-.24-.61.3-5.76 3.47-7.67 5.57-.86.96-2.06 3.79-1.09 4.82.92.98 3.96-.17 4.79-1 2.06-2.06 5.21-7.17 5.5-7.79zM1.4 17.65c2.37-1.56 1.46-3.41 3.23-4.64.93-.65 2.22-.62 3.08.29.63.67.8 2.57-.16 3.46-1.57 1.45-4 1.55-6.15.89z"></path></svg>
const upperCaseIcon = <svg viewBox="0 0 20 20" height="25" width="25" xmlns="http://www.w3.org/2000/svg" ><mask id="a" fill="#fff"><path d="m20 20h-20v-20h20z" fill="#fff" fill-rule="evenodd" /></mask><path d="m2 3v2.5h4.16666667v10.5h2.5v-10.5h4.16666663v-2.5zm16 4.5h-7.5v2.5h2.5v6h2.5v-6h2.5z" mask="url(#a)" /></svg>