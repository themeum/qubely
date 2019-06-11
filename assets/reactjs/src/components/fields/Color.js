const { __ } = wp.i18n
import '../css/color.scss'
const { Component, Fragment } = wp.element
const { Dropdown, ColorPicker, Tooltip } = wp.components;



class Color extends Component {
    constructor(props) {
        super(props)
        this.state = { current: 'date' }
    }
    defColors() {
        let val = [];
        const colors = window.globalData.settings;
        val.push(colors.colorPreset1 || '#062040')
        val.push(colors.colorPreset2 || '#566372')
        val.push(colors.colorPreset3 || '#2084F9')
        val.push(colors.colorPreset4 || '#F3F3F3')
        val.push(colors.colorPreset5 || '#EEEEEE')
        val.push(colors.colorPreset6 || '#FFFFFF')
        return val;
    }

    render() {
        const { label, className, value, disablePalette, disableAlpha, disableClear, onChange } = this.props
        return (
            <div className={`qubely-field qubely-field-color qubely-d-flex qubely-align-center ${className ? className : ''}`}>
                {label && <label className="qubely-mb-0">{label}</label>}
                <Dropdown
                    position="top center"
                    className="qubely-ml-auto"
                    renderToggle={({ isOpen, onToggle }) => (
                        <Fragment>
                            <span className="qubely-color-picker-container">
                                <span className="qubely-color-picker" style={{ backgroundColor: value || '' }} isPrimary onClick={onToggle} aria-expanded={isOpen} />
                            </span>
                        </Fragment>
                    )}
                    renderContent={() => (
                        <span>
                            <ColorPicker color={value || ''}
                                onChangeComplete={val => {
                                    if (val.rgb) { onChange(val.rgb.a != 1 ? 'rgba(' + val.rgb.r + ',' + val.rgb.g + ',' + val.rgb.b + ',' + val.rgb.a + ')' : val.hex) }
                                }}
                                disableAlpha={disableAlpha ? disableAlpha : false} />
                            {!disablePalette &&
                                <div className="qubely-rgba-palette" style={{ padding: '0px 0px 15px 15px' }}>
                                    {this.defColors().map(color => <button style={{ color: color }} onClick={() => onChange(color)} />)}
                                </div>
                            }
                        </span>
                    )}
                />
                {(value != '' && !disableClear) &&
                    <Tooltip text={__('Clear')}>
                        <div className="qubely-ml-10">
                            <span className="qubely-border-clear" onClick={() => onChange('')} role="button"><i className="fas fa-undo"></i></span>
                        </div>
                    </Tooltip>
                }
            </div>
        )
    }
}
export default Color