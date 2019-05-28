const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { Dropdown, Tooltip } = wp.components
import '../css/typography.scss'
import FontList from "./assets/FontList"
import { Range, Select, Toggle, Wrapper } from '../FieldRender'

class Typography extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFontFamily: false,
            filterText: this.props.value.family ? this.props.value.family : '',
            changeType: '',
        }
    }
    _getWeight() {
        const { value } = this.props
        if (value && value.family) {
            return FontList.filter(o => { return o.n == value.family })[0].v
        } else {
            return [100, 200, 300, 400, 500, 600, 700, 800, 900];
        }
    }

    setSettings(type, val) {
        let prevValue = this.props.value
        if (type == 'family' && val) {
            val = { [type]: val, type: (FontList.filter(o => { return o.n == val })[0].f) }
        } else {
            val = { [type]: val }
        }
        this.props.onChange(Object.assign({}, prevValue, val))
    }
    findArrayIndex = (font) => {
        let index = 0
        let qubelyFonts = JSON.parse(localStorage.getItem('qubelyFonts'))
        while (index < 10) {
            if (qubelyFonts[index].n == font) {
                break
            }
            index++
        }
        return index
    }
    handleTypographyChange(val) {
        this.setSettings('family', val)

        let qubelyFonts = JSON.parse(localStorage.getItem('qubelyFonts'))
        let selectedFont = FontList.filter(font => font.n == val)

        if (qubelyFonts) {
            let oldFont = qubelyFonts.filter(font => font.n == val).length > 0
            if (oldFont) {
                let index = this.findArrayIndex(val)
                qubelyFonts.splice(index, 1)
                qubelyFonts.unshift(...selectedFont)
            } else {
                qubelyFonts.unshift(...selectedFont)
                qubelyFonts.length > 10 && qubelyFonts.pop()
            }

        } else {
            qubelyFonts = [...selectedFont]
        }

        localStorage.setItem('qubelyFonts', JSON.stringify(qubelyFonts))
    }
    render() {
        const { value, label, device, onDeviceChange } = this.props
        let qubelyFonts = JSON.parse(localStorage.getItem('qubelyFonts'))
        let filteredFontList = [], newFontList = FontList
        if (qubelyFonts) {
            filteredFontList = FontList.filter(font => !qubelyFonts.filter(qubelyFont => qubelyFont.n == font.n).length > 0)
            newFontList = [...qubelyFonts, ...filteredFontList]
        }
        // $(document).on('change', '.qubely-font-family', event => {
        //     this.handleTypographyChange(event.target.value)
        // })

        return (
            <div className="qubely-field qubely-field-typography">
                <Toggle
                    value={value.openTypography}
                    label={label || __('Typography')}
                    onChange={val => this.setSettings('openTypography', val)}
                />
                {(value && (value.openTypography == 1)) &&
                    <Fragment>
                        <Range
                            label={__('Font Size')}
                            value={value && value.size}
                            onChange={val => this.setSettings('size', val)}
                            min={8}
                            max={200}
                            step={1}
                            unit
                            responsive
                            device={device}
                            onDeviceChange={value => onDeviceChange(value)}
                        />

                        <div className="qubely-field-group qubely-65-35">
                            {/* <div className="qubely-field-datalist qubely-field">
                                <label>{__('Font Family')}</label>
                                <input type="text" className="qubely-font-family" list="font-family"
                                    // onKeyPress={event => { }}
                                    // onChange={event => { }} 
                                    />

                                <datalist id="font-family">
                                    {newFontList.map(e => { return <option value={e.n} /> })}
                                </datalist>

                            </div> */}

                            <Select
                                direction={"left"}
                                label={__('Font Family')}
                                value={value && value.family}
                                clear
                                search
                                options={newFontList.map((e) => { return e.n; })}
                                onChange={val => this.handleTypographyChange(val)}
                            />
                            <Select
                                direction={"right"}
                                label={__('Weight')}
                                value={value && value.weight}
                                clear
                                options={this._getWeight()}
                                onChange={val => this.setSettings('weight', val)}
                            />
                        </div>

                        <Dropdown
                            className="qubely-field"
                            renderToggle={({ isOpen, onToggle }) => (
                                <div className="qubely-d-flex qubely-align-center">
                                    <label>{__('Advanced Typography')}</label>
                                    <div className="qubely-field-button-list qubely-ml-auto">
                                        <button className={(isOpen == 1 ? 'active' : '') + ' qubely-button qubely-button-rounded'} onClick={onToggle} aria-expanded={isOpen}>
                                            <i className="fas fa-cog" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            renderContent={() => (
                                <div style={{ padding: '15px' }}>
                                    {!this.props.disableLineHeight &&
                                        <Range
                                            label={__('Line Height')}
                                            value={value && value.height}
                                            onChange={val => this.setSettings('height', val)}
                                            min={8}
                                            max={200}
                                            step={1}
                                            unit
                                            responsive
                                            device={device}
                                            onDeviceChange={value => onDeviceChange(value)}
                                        />
                                    }
                                    <Range
                                        label={__('Letter Spacing')}
                                        value={value && value.spacing}
                                        onChange={val => this.setSettings('spacing', val)}
                                        min={-10}
                                        max={30}
                                        step={1}
                                        unit
                                        responsive
                                        device={device}
                                        onDeviceChange={value => onDeviceChange(value)}
                                    />
                                    <div className="qubely-d-flex qubely-align-center">
                                        <div>
                                            {__('Text Transform')}
                                        </div>
                                        <div className="qubely-field-button-list qubely-ml-auto">
                                            {
                                                ['none', 'capitalize', 'uppercase', 'lowercase'].map((data, index) => {
                                                    return (
                                                        <Tooltip text={data.charAt(0).toUpperCase() + data.slice(1)}>
                                                            <button className={(value.transform == data ? 'active' : '') + ' qubely-button'} key={index} onClick={() => this.setSettings('transform', data)}>
                                                                {data == 'none' &&
                                                                    <i class="fas fa-ban" />
                                                                }
                                                                {data == 'capitalize' &&
                                                                    <span>Aa</span>
                                                                }
                                                                {data == 'uppercase' &&
                                                                    <span>AA</span>
                                                                }
                                                                {data == 'lowercase' &&
                                                                    <span>aa</span>
                                                                }
                                                            </button>
                                                        </Tooltip>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </Fragment>
                }
            </div>
        )
    }
}
export default Typography