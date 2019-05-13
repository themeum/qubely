import '../css/range.scss'
import Device from '../Device'
const { Component } = wp.element

class Range extends Component {
    constructor(props) {
        super(props)
        this.state = { current: '', device: 'md' }
    }

    _filterValue(type) {
        const { value, responsive, responsiveGroup } = this.props
        if (type == 'unit') {
            return value ? (value.unit || 'px') : 'px'
        } else {
            return value ? ((responsive || responsiveGroup) ? (value[window.qubelyDevice] || '') : value) : ''
        }
    }

    setSettings(val, type) {
        const { value, onChange, responsive, responsiveGroup, min, max, unit } = this.props
        let final = value || {}
        if (unit && (!final.hasOwnProperty('unit'))) { final.unit = 'px' }
        if (type == 'unit' && (responsive || responsiveGroup)) {
            final = value || {};
            final.unit = val;
        } else {
            final = (responsive || responsiveGroup) ? Object.assign({}, value, { [window.qubelyDevice]: val }) : val
            final = min ? (final < min ? min : final) : (final < 0 ? 0 : final)
            final = max ? (final > max ? max : final) : (final > 1000 ? 1000 : final)
        }
        onChange(final)
        this.setState({ current: final })
    }

    _minMax(type) {
        let unit = this._filterValue('unit')
        return (this.props[type] && this.props[type] != 0) ? (unit == 'em' ? Math.round(this.props[type] / 16) : this.props[type]) : 0
    }

    _steps() {
        let unit = this._filterValue('unit')
        return unit == 'em' ? .001 : (this.props.step || 1)
    }

    updateDevice(updatedDevice) {
        let { value, onChange, device } = this.props
        if (typeof device !== 'undefined') {
            onChange({ ...value, device: updatedDevice })
        }
        this.setState({ device: updatedDevice })
    }

    render() {
        const { unit, label, responsive, device, onDeviceChange } = this.props
        let responsiveDevice = responsive ? device ? device : this.state.device : window.qubelyDevice
        return (
            <div className={'qubely-field-range qubely-field ' + (responsive ? 'qubely-responsive' : '')}>
                {(label || unit || responsive) &&
                    <div className="qubely-d-flex qubely-align-center qubely-mb-10">
                        {label &&
                            <div>
                                <label htmlFor={'input'}>
                                    {label}
                                </label>
                            </div>
                        }

                        {responsive && <Device device={responsiveDevice} commonResponsiveDevice={device} className="qubely-ml-10" onChange={(val) => { device && onDeviceChange ? onDeviceChange(val) : this.updateDevice(val) }} />}

                        {unit &&
                            <div className="qubely-unit-btn-group qubely-ml-auto">
                                {(typeof unit == 'object' ? unit : ['px', 'em', '%']).map((value) => (
                                    <button className={(this.props.value && value == this.props.value.unit) ? 'active' : ''} onClick={() => {
                                        this.setSettings(value, 'unit')
                                        let data = this._filterValue()
                                        if (data) {
                                            if (value == 'em') {
                                                this.setSettings((data / 16).toFixed(3), 'range')
                                            }
                                            if (value == 'px') {
                                                this.setSettings(Math.floor(data * 16), 'range')
                                            }
                                        }
                                    }}>{value}</button>
                                ))}
                            </div>
                        }
                    </div>
                }

                <div className="qubely-field-child">
                    <div className="qubely-input-range">
                        <input
                            type="range"
                            min={this._minMax('min')}
                            max={this._minMax('max')}
                            value={this._filterValue()}
                            step={this._steps()}
                            onChange={e => this.setSettings(this._filterValue() == e.target.value ? '' : e.target.value, 'range')}
                        />
                        <input type="number" step={this._steps()} onChange={v => this.setSettings(v.target.value, 'range')} value={this._filterValue() + (this.props.suffix ? this.props.suffix : '')} {...(this.props.suffix && { disabled: true })} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Range