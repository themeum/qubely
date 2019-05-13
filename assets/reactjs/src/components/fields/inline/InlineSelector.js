const { Component } = wp.element;
import Selector from '../Selector'
const { Tooltip, Dropdown } = wp.components
const {__} = wp.i18n

class InlineSelector extends Component {
	constructor() {
		super(...arguments);
	}
	render() {
		const { value, defaultVal, onChange } = this.props;
		return (
			<Dropdown className="qubely-toolber-field"
				contentClassName="qubely-selector-popup-toolbar"
				position="bottom right"
				renderToggle={({ isOpen, onToggle }) =>
					<Tooltip text={__('HTML Tag')}>
						<button onClick={onToggle} aria-expanded={isOpen}>
							<i className="fas fa-code"/>
						</button>
					</Tooltip>
				}
				renderContent={() =>
					<div className="qubely-selector-toolber-popup">
						<Selector defaultVal={defaultVal} value={value} onChange={ val => onChange(val)} />
					</div>
				}
			>
			</Dropdown>
		)
	}
}
export default InlineSelector