const {__} = wp.i18n
const { ColorPicker, Tooltip, Dropdown } = wp.components;
const { Component } = wp.element;

class InlineColor extends Component {
	render() {
		const { value, onChange, qubelyPalatteColors, label } = this.props;
		return (
			<Dropdown
				className="qubely-toolber-field"
				position="top right"
				renderToggle={({ isOpen, onToggle }) => (
					<Tooltip text={__('Text Color')}>
						{
							qubelyPalatteColors && <span className="qubely-inspector-color-picker">
								{label && <span className="qubely-inspector-color-picker-label">{label}</span>}
								<button className="qubely-tooltip-inline-color-picker" style={{ backgroundColor: value || '#9013FE' }} onClick={onToggle} aria-expanded={isOpen}>&nbsp;</button>
							</span>
							||
							<button onClick={onToggle} aria-expanded={isOpen}>
								<i className={"fas fa-palette"} />
							</button>
						}

					</Tooltip>

				)}
				renderContent={() =>
					<div className="qubely-toolber-popup">
						<ColorPicker value={value || '#cccccc'} onChangeComplete={val => {
							if (val.rgb) {
								onChange(val.rgb.a != 1 ? 'rgba(' + val.rgb.r + ',' + val.rgb.g + ',' + val.rgb.b + ',' + val.rgb.a + ')' : val.hex)
							}
						}} />
					</div>
				}
			>
			</Dropdown>
		)
	}
}
export default InlineColor
