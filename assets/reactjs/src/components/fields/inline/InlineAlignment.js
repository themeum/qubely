const {__} = wp.i18n
const { Component } = wp.element;
import Alignment from '../Alignment'
const {Tooltip, Dropdown} = wp.components

class InlineAlignment extends Component {
	render() {
		const { value, onChange, disableJustify } = this.props;
		
		return (
			<Dropdown
				className="qubely-toolber-field"
				position="top right"
				renderToggle={({ isOpen, onToggle }) => (
					<Tooltip text={__('Alignment')}>
						<button onClick={ onToggle } aria-expanded={ isOpen }>
							<i className="fas fa-align-justify"></i>
						</button>
					</Tooltip>
				)}
				renderContent={() =>
					<div className="qubely-toolber-popup">
						<Alignment responsive={this.props.responsive} {...(disableJustify&&{disableJustify})} value={value} onChange={ val => onChange( val ) }/>
					</div>
				}
			>
			</Dropdown>
		)
	}
}
export default InlineAlignment