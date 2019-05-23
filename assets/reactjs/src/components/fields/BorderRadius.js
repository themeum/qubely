const { __ } = wp.i18n
import Range from './Range'
import Device from '../Device'
import icons from '../../helpers/icons';
const { Component, Fragment } = wp.element
const { Tooltip } = wp.components
class BorderRadius extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            defaultUnit: 'px',
            defaultRadiusType: 'global'
        }
    }

    setBorderRadius = (type, newValue) => {
        const { onChange, value, unit, responsive, device, responsiveGroup } = this.props
        const { defaultUnit, defaultRadiusType } = this.state
        let responsiveDevice = responsive ? device ? device : this.state.device : window.qubelyDevice
        const [topLeft, topRight, bottomRight, bottomLeft] = responsive || responsiveGroup ? value.custom && value.custom[responsiveDevice] ? value.custom[responsiveDevice].split(" ") : ['', '', '', ''] : value.custom ? value.custom.split(" ") : ['', '', '', '']

        let newBorderRadius = JSON.parse(JSON.stringify(value))
        let tempRadius = type === 'global' ? `${newValue}` : `${type == 'topLeft' ? `${newValue}` : `${topLeft}`} ${type == 'topRight' ? `${newValue}` : `${topRight}`} ${type == 'bottomRight' ? `${newValue}` : `${bottomRight}`} ${type == 'bottomLeft' ? `${newValue}` : `${bottomLeft}`}`
        if (type === 'global') {
            (responsive || responsiveGroup) ? newBorderRadius.global ? newBorderRadius.global[responsiveDevice] = tempRadius : newBorderRadius.global = { [responsiveDevice]: tempRadius }
                :
                newBorderRadius.global = tempRadius
        } else {
            (responsive || responsiveGroup) ? newBorderRadius.custom ? newBorderRadius.custom[responsiveDevice] = tempRadius : newBorderRadius.custom = { [responsiveDevice]: tempRadius }
                :
                newBorderRadius.custom = tempRadius
        }
        unit && value.unit ? newBorderRadius.unit = value.unit : newBorderRadius.unit = defaultUnit
        newBorderRadius.radiusType = value.radiusType ? value.radiusType : defaultRadiusType
        newBorderRadius.openBorderRadius = value.openBorderRadius ? value.openBorderRadius : 1
        onChange(newBorderRadius)
    }

    updateRadiusType = (newType) => {
        const { onChange, value } = this.props
        let newBorderRadius = JSON.parse(JSON.stringify(value))
        newBorderRadius.radiusType = newType
        onChange(newBorderRadius)
    }

    updateUnit = (newUnit) => {
        const { onChange, value } = this.props
        let newBorderRadius = JSON.parse(JSON.stringify(value))
        newBorderRadius.unit = newUnit
        newBorderRadius.radiusType = value.radiusType ? value.radiusType : this.state.defaultRadiusType
        newBorderRadius.openBorderRadius = value.openBorderRadius ? value.openBorderRadius : 1
        onChange(newBorderRadius)
    }

    render() {
        const { value, label, min, max, responsive, device, onDeviceChange, unit } = this.props
        const { defaultUnit, defaultRadiusType } = this.state
        let responsiveDevice = responsive ? device ? device : this.state.device : window.qubelyDevice
        const values = responsive ? value.custom && value.custom[responsiveDevice] ? value.custom[responsiveDevice].split(" ") : ['', '', '', ''] : value.custom ? value.custom.split(" ") : ['', '', '', '']
        const global = responsive ? value.global && value.global[responsiveDevice] ? value.global[responsiveDevice] : ''
            :
            value.global ? value.global : ''
        let iterator = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft']

        return (
            <div className={"qubely-field qubely-field-border-radius " + (responsive ? 'qubely-responsive' : '')}>

                {unit &&
                    <div className="qubely-unit-btn-group qubely-d-block qubely-text-right">
                        {(typeof unit == 'object' ? unit : ['px', 'em', '%']).map(unitName => (
                            <button className={(value.unit ? unitName == value.unit : unitName == defaultUnit) ? 'active' : ''}
                                onClick={() => this.updateUnit(unitName)}>
                                {unitName}</button>
                        ))}
                    </div>
                }

                <div className="qubely-d-flex qubely-align-center qubely-mb-10">
                    <label htmlFor={'input'}>   {label ? label : __('Radius')}  </label>

                    {responsive && <Device device={responsiveDevice} commonResponsiveDevice={device} className="qubely-ml-10" onChange={val => { device ? onDeviceChange(val) : this.setState({ device: val }) }} />}

                    <div className="qubely-field-button-list qubely-ml-auto">
                        {
                            [['global', __('Global')], ['custom', __('Custom')]].map((data, index) => {
                                return (
                                    <Tooltip text={data[1]}>
                                        <button className={((value.radiusType ? value.radiusType == data[0] : defaultRadiusType == data[0]) ? 'active' : '') + ' qubely-button'} key={index} onClick={() => this.updateRadiusType(data[0])}>
                                            { data[0] == 'global' ? icons.radius_global : icons.radius_custom }
                                        </button>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>
                </div>


                {(!value.radiusType || value.radiusType == 'global') &&
                    <div className="qubely-d-flex qubely-align-center qubely-field">
                        <div className="qubely-w-100">
                            <Range
                                value={global || ''}
                                onChange={val => this.setBorderRadius('global', val)}
                                min={min}
                                max={max}
                                step={1}
                            />
                        </div>
                    </div>
                }

                {value.radiusType == 'custom' &&
                    <Fragment>
                        {
                            iterator.map((item, index) => {
                                return (
                                    <div className="qubely-d-flex qubely-align-center qubely-field">
                                        <div className="qubely-mr-15">
                                            {icons.borderRadius[item]}
                                        </div>
                                        <div className="qubely-w-100">
                                            <Range
                                                value={values[index] || ''}
                                                onChange={val => this.setBorderRadius(iterator[index], val)}
                                                min={min}
                                                max={max}
                                                step={1}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Fragment>
                }
            </div>
        )
    }
}
export default BorderRadius 