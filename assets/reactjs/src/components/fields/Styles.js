import '../css/styles.scss'
const { Component } = wp.element

class Styles extends Component {
    setSettings(val){
        this.props.onChange( val )
    }
    render() {
        const { value, options, columns = 2 } = this.props
        return(
            <div className="qubely-field qubely-field-styles">
                { this.props.label &&
                    <label>{this.props.label}</label>
                }
                <div className={`qubely-field-style-list qubely-field-style-columns-${columns}`}>
                    {options.map( data =>
                        (
                            <div onClick={ () => this.setSettings(data.value) } className={ value == data.value && 'qubely-active' } role="button" tabindex="0" aria-label={data.label ? data.label : ''}>
                                {data.icon && <span className="qubely-layout-style qubely-field-style-icon">{data.icon}</span>}
                                {data.svg && <span className="qubely-layout-style qubely-field-style-svg">{data.svg}</span>}
                                {data.img && <span className="qubely-layout-style qubely-field-style-img">{data.img}</span>}
                                {data.label && <span className="qubely-field-style-label">{data.label}</span>}
                            </div>
                        )
                    )}
                </div>
            </div>
        )
    }
}
export default Styles