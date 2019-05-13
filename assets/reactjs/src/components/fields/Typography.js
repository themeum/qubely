const {__} = wp.i18n
import Range from "./Range"
import Select from "./Select"
import Toggle from './Toggle'
const { Component, Fragment } = wp.element
const { Dropdown, Tooltip } = wp.components;
import FontList from "./assets/FontList"

class Typography extends Component {

    _getWeight(){
        const { value } = this.props
        if( value && value.family ){
            return FontList.filter( o => { return o.n == value.family } )[0].v
        }else{
            return [100,200,300,400,500,600,700,800,900];
        }
    }

    setSettings( type, val ){
        let prevValue = this.props.value
        if( type == 'family' && val ){
            val = { [type]:val, type:(FontList.filter( o => { return o.n == val } )[0].f) }
        }else{
            val = {[type]:val}
        }
        this.props.onChange( Object.assign( {}, prevValue , val ) )
    }

    render(){
        const { value, label , device, onDeviceChange} = this.props

        return(
            <div className="qubely-field qubely-field-typography">
                <Toggle
                    value={value.openTypography}
                    label={label || __('Typography')}
                    onChange={ val => this.setSettings( 'openTypography', val ) }
                />
                { (value && (value.openTypography == 1)) &&
                    <Fragment>
                        <Range 
                            label={__( 'Font Size' )}
                            value={value && value.size} 
                            onChange={ val => this.setSettings('size', val) }
                            min={ 8 }
                            max={ 200 }
                            step={ 1 }
                            unit
                            responsive
                            device={device}
                            onDeviceChange={value => onDeviceChange( value )}
                        />

                        <div className="qubely-field-group qubely-65-35">  
                            <Select
                                direction={"left"}
                                label={__('Font Family')}
                                value={ value && value.family }
                                clear
                                search
                                options={ FontList.map( (e) => { return e.n; } ) }
                                onChange={ val => this.setSettings('family', val) }
                            />
                            <Select
                                direction={"right"}
                                label={__('Weight')}
                                value={ value && value.weight }
                                clear
                                options={ this._getWeight() }
                                onChange={ val => this.setSettings('weight', val) }
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
                                <div style={{padding:'15px'}}>
                                    {!this.props.disableLineHeight &&
                                        <Range 
                                            label={ __('Line Height') }
                                            value={ value && value.height }
                                            onChange={ val => this.setSettings('height', val) }
                                            min={ 8 }
                                            max={ 200 }
                                            step={ 1 }
                                            unit
                                            responsive
                                            device={device}
                                            onDeviceChange={value => onDeviceChange( value )}
                                        />
                                    }
                                    <Range
                                        label={ __('Letter Spacing') }
                                        value={ value && value.spacing }
                                        onChange={ val => this.setSettings('spacing', val) }
                                        min={ -10 }
                                        max={ 30 }
                                        step={ 1 }
                                        unit
                                        responsive
                                        device={device}
                                        onDeviceChange={value => onDeviceChange( value )}
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