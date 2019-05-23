import Device from '../Device'
const { Component, Fragment } = wp.element

class Number extends Component {
    constructor(props) {
        super(props)
        this.state = { current: this._filterValue() }
    }

    _filterValue(type) {
        const { value, responsive, responsiveGroup } = this.props
        if (type == 'unit') {
            return value ? (value.unit || this.props.unit[0]) : this.props.unit[0]
        } else {
            return value ? ((responsive || responsiveGroup) ? (value[window.qubelyDevice] || '') : value) : ''
        }
    }

    setSettings(val, type) {
        const { value, onChange, responsive, responsiveGroup, min, max, unit } = this.props
        let final = value || {}
        if (unit && (!final.hasOwnProperty('unit'))) { final.unit = unit[0] }
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

    render() {
        const { label, unit, responsive, responsiveGroup, device, onDeviceChange } = this.props
        return (
            <div className={'qubely-field-number qubely-field ' + ((responsive || responsiveGroup) ? 'qubely-responsive' : '')}>
                <label>
                    {label && label}
                    {
                        responsive &&
                        <Fragment>
                            {
                                device ?
                                    <Device device={device} commonResponsiveDevice={device} className="qubely-ml-10" onChange={(val) => onDeviceChange(val)} />
                                    :
                                    <Device onChange={(val) => this.setState({ current: val })} />
                            }
                        </Fragment>
                    }

                    {unit &&
                        <div className="qubely-unit-btn-group">
                            {unit.map((value) => (
                                <button className={(this.props.value && value == this.props.value.unit) ? 'active' : ''} onClick={() => this.setSettings(value, 'unit')}>{value}</button>
                            ))}
                        </div>
                    }
                </label>
                <div className="qubely-field-child">
                    <input
                        type="number"
                        min={this.props.min || 0}
                        max={this.props.max || 1000}
                        value={this._filterValue()}
                        onChange={e => this.setSettings(this._filterValue() == e.target.value ? '' : e.target.value)}
                        placeholder={this.props.placeholder}
                    />

                </div>
            </div>
        )
    }
}
export default Number