const { __ } = wp.i18n
import '../css/color.scss'
const { Component, Fragment } = wp.element
const { Dropdown, ColorPicker, Tooltip } = wp.components;



class Color extends Component {
    constructor(props) {
        super(props)
        this.state = { current: 'date' }
    }
    defColors(){
        let val = [];
        const colors = window.globalData.settings;
        val.push( colors.colorPreset1 || '#456BED' )
        val.push( colors.colorPreset2 || '#30ac3d' )
        val.push( colors.colorPreset3 || '#fa9200' )
        val.push( colors.colorPreset4 || '#006fbf' )
        val.push( colors.colorPreset5 || '#ff1818' )
        val.push( colors.colorPreset6 || '#941f90' )
        return val;
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
                            { !this.props.disablePalette &&
                                <div className="qubely-rgba-palette" style={{padding:'0px 0px 15px 15px'}}>
                                    {this.defColors().map(
                                        color => <button style={{ color: color }} onClick={() => this.props.onChange(color)}/> 
                                    )}
                                </div>
                            }
                        </span>
                    )}
                />
                {( this.props.value != '' && !this.props.disableClear ) &&
                    <Tooltip text={__('Clear')}>
                        <div className="qubely-ml-10">
                            <span className="qubely-border-clear" onClick={() => this.props.onChange('')} role="button"><i className="fas fa-undo"></i></span>
                        </div>
                    </Tooltip>
                }
            </div>
        )
    }
}
export default Color