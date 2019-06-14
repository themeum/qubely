import '../css/dimension.scss'
import Device from "../Device";
const { Component, Fragment } = wp.element

class Dimension extends Component {
    constructor(props) {
        super(props);
        this.state = { lock: false, current: this._filterValue() }
    }

    _filterValue(val) {
        const { value, responsive } = this.props
        if (typeof value == 'object' && Object.keys(value).length > 0) {
            if (val) {
                return responsive ? (value[window.qubelyDevice] ? value[window.qubelyDevice][val] || '' : '') : value[val]
            } else {
                return responsive ? value[window.qubelyDevice] || '' : value
            }
        } else {
            return ''
        }
    }

    setSettings(action, position) {
        const { responsive, value, onChange } = this.props
        let data = (this.state.lock && position != 'unit') ? { 'top': action, 'right': action, 'bottom': action, 'left': action } : { [position]: action }
        data = Object.assign({}, responsive ? value[window.qubelyDevice] || {} : value, data)
        const final = Object.assign({}, value, responsive ? { [window.qubelyDevice]: data } : data)
        final.unit = data.unit || 'px'
        onChange(final)
        this.setState({ current: final })
    }

    render() {
        const { unit, label, responsive, device, onDeviceChange } = this.props;
        let responsiveDevice = responsive ? device ? device : this.state.device : window.qubelyDevice;

        return (
            <div className={'qubely-field-dimension qubely-field ' + (responsive ? 'qubely-responsive' : '')}>
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
                                    this.setSettings(value, 'unit');
                                }}>{value}</button>
                            ))}
                        </div>
                    }
                </div>
                <div className="qubely-field-child">
                    <div className={"qubely-dimension-input-group" + (!this.props.noLock ? ' hasLock' : '')}>
                        {['top', 'right', 'bottom', 'left'].map((val, index) => (<span><input type='number' value={this._filterValue(val)} onChange={(v) => this.setSettings(v.target.value, val)} /><span>{this.props.dataLabel ? this.props.dataLabel[index] : val}</span></span>))}
                        {!this.props.noLock &&
                            <button className={(this.state.lock ? 'active ' : '') + 'qubely-button'} onClick={() => this.setState({ lock: !this.state.lock })}>
                                {this.state.lock ? <span className={'fas fa-lock'} /> : <span className={'fas fa-unlock'} />}
                            </button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Dimension;