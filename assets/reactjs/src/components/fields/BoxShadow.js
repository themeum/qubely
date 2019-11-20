const { __ } = wp.i18n
import Color from './Color'
import Toggle from './Toggle'
const { TextControl } = wp.components
const { Component } = wp.element

const defaultData = {
    openShadow: 0,
    inset:'',
    horizontal: 2,
    vertical: 2,
    blur: 3,
    spread: 0,
    color:'rgba(0, 0, 0, .2)'
};

class BoxShadow extends Component {

    // componentWillMount(){
    //     const {value} = this.props
    //     this.props.onChange(Object.assign( {}, defaultData, ( value || {} )));
	// }

    setSettings( type, val ){
        const {value, onChange} = this.props
        onChange( Object.assign( {}, defaultData ,( value || {} ) , {[type]:val||0} ) )
    }

    render(){
        const { value } = this.props;
        return(
            <div className="qubely-field qubely-field-boxshadow">
                <Toggle
                    value={value.openShadow}
                    label={this.props.label}
                    onChange={ val => this.setSettings( 'openShadow', val ) }
                />
                
                { (value.openShadow == 1) &&
                    <div className="qubely-field qubely-d-flex qubely-align-justified">
                        <Color
                            label={__('Color')}
                            value={ value.color || '' }
                            onChange={ val => this.setSettings( 'color', val ) }
                        />
                        <TextControl
                            label={__('X')}
                            type="number"
                            value={value.horizontal}
                            onChange={ val => this.setSettings( 'horizontal', val ) }
                        />
                        <TextControl
                            label={__( 'Y' )}
                            type="number"
                            value={value.vertical} 
                            onChange={ val => this.setSettings( 'vertical', val ) }
                        />
                        <TextControl
                            label={__( 'Blur' )}
                            type="number"
                            value={value.blur} 
                            onChange={ val => this.setSettings( 'blur', val ) }
                        />
                        <TextControl 
                            label={__( 'Spread' )}
                            type="number"
                            value={value.spread} 
                            onChange={ val => this.setSettings( 'spread', val ) }
                        />
                    </div>
                }

                { (value.openShadow == 1 && !this.props.disableInset) &&
                    <Toggle
                        label={ __('Inset') }
                        value={ value.inset ? 1 : 0 }
                        onChange={ val => this.setSettings( 'inset', val ? 'inset': '' ) }
                    />
                }
            </div>
        )
    }
}
export default BoxShadow