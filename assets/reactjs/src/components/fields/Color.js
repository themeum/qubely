const { __ } = wp.i18n
import '../css/color.scss'
const { Component, Fragment } = wp.element
const { Dropdown, ColorPicker, Tooltip } = wp.components;

const colors = ['#456BED', '#30ac3d', '#fa9200', '#006fbf', '#ff1818', '#941f90'];

class Color extends Component {
    constructor(props) {
        super(props)
        this.state = { current: 'date' }
    }
    render() {
        return (
            <div className={`qubely-field qubely-field-color qubely-d-flex qubely-align-center ${this.props.className ? this.props.className : ''}`}>
                { this.props.label &&
                    <label className="qubely-mb-0">{this.props.label}</label>
                }
                <Dropdown
                    position="top center"
                    className="qubely-ml-auto"
                    renderToggle={({ isOpen, onToggle }) => (
                        <Fragment>
                            <span className="qubely-color-picker-container">
                                <span className="qubely-color-picker" style={{ backgroundColor: this.props.value || '' }} isPrimary onClick={onToggle} aria-expanded={isOpen} />
                            </span>
                        </Fragment>
                    )}
                    renderContent={() => (
                        <span>
                            <ColorPicker color={this.props.value || ''} onChangeComplete={ val => {
                                if( val.rgb ){ this.props.onChange( val.rgb.a != 1 ? 'rgba('+val.rgb.r+','+val.rgb.g+','+val.rgb.b+','+val.rgb.a+')' : val.hex ) }
                             }}/>
                            <div className="qubely-rgba-palette" style={{padding:'0px 0px 15px 15px'}}>
                                {colors.map(
                                    color => <button style={{ color: color }} onClick={() => this.props.onChange(color)}/> 
                                )}
                            </div>
                        </span>
                    )}
                />
                {this.props.value != '' &&
                    <Tooltip text={__('Clear')}>
                        <div className="qubely-ml-10">
                            <a className="qubely-border-clear" href="javascript:;" onClick={() => this.props.onChange('')} role="button"><i className="fas fa-undo"></i></a>
                        </div>
                    </Tooltip>
                }
            </div>
        )
    }
}
export default Color