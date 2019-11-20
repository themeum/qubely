const {__} = wp.i18n
const { Component, Fragment } = wp.element
import Gradient from './Gradient'
const { Tooltip } = wp.components
import Color from "./Color"

const defaultData = {
    openColor: 0,
    type: 'color',
    color: '#006fbf',
    gradient: {},
};

class ColorAdvanced extends Component {
    
    // componentWillMount(){
    //     const { value } = this.props
    //     this.props.onChange( Object.assign( {}, defaultData,(this.props.clip?{clip:true}:{}), ( value || {} ) ));
	// }

    setSettings( val, type ){
        const { value, onChange } = this.props
        onChange( Object.assign( {}, defaultData, ( value || {} ), { openColor: 1 }, { [type]: val } ) );
    }

    render(){
        const { value } = this.props;
        return (
            <div className="qubely-field-color-advanced qubely-field">
                <div className="qubely-mb-20 qubely-d-flex qubely-align-center">
                    { this.props.label &&
                        <span>{this.props.label}</span>
                    }
                    <div className="qubely-field-button-list qubely-ml-auto">
                        {
                            ['color', 'gradient'].map((data, index) => {
                                return (
                                    <button className={( (value && (value.type == data && value.openColor)) ? 'active' : '') + ' qubely-button'} onClick={ ()=>this.setSettings( data, 'type' ) }>
                                        {data == 'color' &&
                                            <Tooltip text={ __( 'Color' )  }>
                                                <svg width="17" height="18" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg"><path d="M.964 15.047c0 1.091.835 1.983 1.856 1.983 1.021 0 1.856-.892 1.856-1.983 0-1.091-1.856-3.966-1.856-3.966s-1.856 2.875-1.856 3.966zm14.909-7.84l-4.362-4.371c-.291-.292-.639-.489-1.009-.593l.683-.683c.234-.235.233-.611.001-.843-.234-.234-.609-.231-.842.002l-2.831 2.836-.03.033-3.613 3.619c-.906.908-.905 2.378 0 3.284l4.362 4.371c.906.908 2.373.907 3.278 0l4.362-4.371c.906-.908.905-2.378 0-3.284zm-11.494 1.664c0-.289.111-.579.332-.801l4.362-4.37c.442-.443 1.156-.443 1.599 0l4.362 4.37c.221.222.332.511.332.801h-10.986z" className="qubely-svg-fill" fill-rule="nonzero"/></svg>
                                            </Tooltip>
                                        }
                                        {data == 'gradient' &&
                                            <Tooltip text={ __( 'Gradient' )  }>
                                                <svg width="18" height="15" viewBox="0 0 18 15" xmlns="http://www.w3.org/2000/svg"><g transform="translate(.735 .263)" fill="none"><rect className="qubely-svg-stroke" x=".5" y=".5" width="16.072" height="13.474" rx="1"/><path className="qubely-svg-fill" d="M.836.763l15.759 13.158h-15.759z"/></g></svg>
                                            </Tooltip>
                                        }
                                    </button>
                                )
                            })
                        }
                    </div>
                    {(value && (value.openColor && value.type) != '') &&
                        <div className="qubely-ml-10">
                            <Tooltip text={ __( 'Clear' )  }>
                                <span className="qubely-border-clear" onClick={() => this.setSettings( value.openColor?0:1, 'openColor' ) } role="button"><i className="fas fa-undo"/></span>
                            </Tooltip>
                        </div>
                    }
                </div>

                { (value && value.openColor == 1) &&
                    <Fragment>
                        { ( value.type === "color" ) &&
                            <Color
                                label={__('Fill Color')}
                                disableClear
                                value={ value.color || '#16d03e' }
                                onChange={ val => this.setSettings( val, 'color' ) }
                            />
                        }
                        { ( value.type === "gradient" ) &&
                            <Gradient
                                inline
                                label={__('Gradient')}
                                value={ value.gradient||'' }
                                onChange={ val => this.setSettings( val, 'gradient' )}
                            />
                        }
                    </Fragment>
                }
            </div>
        )
    }
}
export default ColorAdvanced