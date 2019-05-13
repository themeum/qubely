const { Component } = wp.element;
const {Tooltip, Dropdown} = wp.components
const {__} = wp.i18n
import Typography from '../Typography'

class InlineTypography extends Component {
    render() {
        let { value,onChange } = this.props

        return (
            <Dropdown
                className="qubely-toolber-field"
                position="top right"
                renderToggle={({ isOpen, onToggle }) => (
                    <Tooltip text={__('Alignment')}>
                        <button onClick={ () => { onToggle(); onChange( Object.assign( {}, value, {openTypography:1} ) ); } } aria-expanded={ isOpen }>
                            <i className="fas fa-font"></i>
                        </button>
                    </Tooltip>
                )}
                renderContent={() =>
                    <div className="qubely-toolber-popup qubley-typography-popup">
                        <Typography inline value={ value } onChange={ val => onChange( val ) } />
                    </div>
                }
            >
            </Dropdown>
        )
    }
}
export default InlineTypography