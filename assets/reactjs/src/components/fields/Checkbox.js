import '../css/checkbox.scss'
const { Component } = wp.element

class Checkbox extends Component {

    getValues(val){
        const { value, multiple } = this.props
        if( !value ){ return false }
        if( Object.keys(value).length === 0 && value.constructor === Object ){ return false }
        return multiple ? ( value.includes( val.value ) ? true : false ) : ( value == val.value ? true : false )
    }

    setSettings(val){
        const { value,multiple,onChange } = this.props
        val = val.target.value
        if( multiple ){
            let selects = value || []
            if( selects.includes( val ) ){
                selects.splice(selects.indexOf( val ),1);
            }else{
                selects.push(val)
            }
            onChange(selects.slice(0))
        }else{
            onChange(val)
        }
    }

    render(){
        const { options,label } = this.props
        return(
            <div className="qubely-field-checkbox qubely-field">
                { label &&
                    <label>{label}</label>
                }
                { options &&
                    options.map( (val, index) => {
                        return (
                            <span>
                                <input
                                    id={index}
                                    type="checkbox"
                                    checked={ this.getValues(val) }
                                    value={val.value}
                                    onChange={ (val) => this.setSettings(val) }/>
                                <label htmlFor={index}>{val.label||val.value}</label>
                            </span>
                        )
                    } )
                }
            </div>
        )
    }
}

export default Checkbox;
