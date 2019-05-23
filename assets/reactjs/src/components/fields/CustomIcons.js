const { Component, Fragment } = wp.element

class CustomIcons extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { value, label, icons, onChange } = this.props

        return (
            <div className={`qubely-field qubely-field-icon-list qubely-field-icon-list-custom`}>

                {label && <label>{label}</label>}

                <div className="qubely-icon-list-wrapper">
                    <div className="qubely-icon-list-icons">
                        {icons.map(icon => {
                            return <Fragment>
                                {icon.value != undefined ?
                                    <span
                                        className={value == icon.value ? 'qubely-active' : ''}
                                        onClick={() => { onChange(icon.value) }}>
                                        <span className={icon.name} />
                                    </span>
                                    :
                                    <span
                                        className={value == icon ? 'qubely-active' : ''}
                                        onClick={() => { onChange(icon) }}>
                                        <span className={icon} />
                                    </span>
                                }
                            </Fragment>
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomIcons