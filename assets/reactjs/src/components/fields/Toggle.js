import "../css/toggle.scss";
import Device from "./Device";
const { Component, Fragment } = wp.element;
const { ToggleControl } = wp.components;

class Toggle extends Component {
	constructor(props) {
		super(props);
		this.state = { current: this._filterValue() };
	}

	_filterValue() {
		return this.props.value
			? this.props.responsive
				? this.props.value[window.qubelyDevice] || ""
				: this.props.value
			: "";
	}

	setSettings(val) {
		const { value, responsive, onChange } = this.props;
		let final = responsive ? Object.assign({}, value, { [window.qubelyDevice]: val }) : val;
		onChange(final);
		this.setState({ current: val });
	}

	render() {
		const { label, customClassName, responsive, device, onDeviceChange } = this.props;
		return (
			<div
				className={
					"qubely-field-toggle qubely-field" +
					(this.props.responsive ? " qubely-responsive" : "") +
					(customClassName ? ` ${customClassName}` : "")
				}
			>
				<label>
					{label && label}
					{responsive && (
						<Fragment>
							{device ? (
								<Device
									device={device}
									commonResponsiveDevice={device}
									className="qubely-ml-10"
									onChange={(val) => onDeviceChange(val)}
								/>
							) : (
								<Device onChange={(val) => this.setState({ current: val })} />
							)}
						</Fragment>
					)}
				</label>
				<ToggleControl checked={this._filterValue()} onChange={(val) => this.setSettings(val)} />
			</div>
		);
	}
}
export default Toggle;
