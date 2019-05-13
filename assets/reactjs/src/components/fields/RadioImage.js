import '../css/radioimage.scss'
const { Button, Tooltip } = wp.components
const { Component } = wp.element

class RadioImage extends Component {

    setSettings(val){
        this.props.onChange( val )
    }

    render() {
        const { value, options } = this.props
        return(
            <div className="qubely-field qubely-field-radioimage">
                { this.props.label &&
                    <label>{this.props.label}</label>
                }
                <div className="qubely-radioimage-parent">
                    {options.map( data =>
                        (
                            <Button
                                isDefault
                                isPrimary={ value == data.value ? true : false }
                                onClick={ () => this.setSettings(data.value) }>
                                {data.icon ? data.icon : data.label}
                            </Button>
                        )
                    )}
                </div>
            </div>
        )
    }
}
export default RadioImage