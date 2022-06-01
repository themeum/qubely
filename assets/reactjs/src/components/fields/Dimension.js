import "../css/dimension.scss";
import Device from "./Device";
const { Component } = wp.element;

class Dimension extends Component {
	constructor(props) {
		super(props);
		this.state = { lock: false, current: this._filterValue() };
	}

	_filterValue(val) {
		const { value, responsive } = this.props;
		if (typeof value == "object" && Object.keys(value).length > 0) {
			if (val) {
				return responsive
					? value[window.qubelyDevice]
						? value[window.qubelyDevice][val] || ""
						: ""
					: value[val];
			} else {
				return responsive ? value[window.qubelyDevice] || "" : value;
			}
		} else {
			return "";
		}
	}

	setSettings(action, position) {
		const { responsive, value, onChange, max, min } = this.props;
		let newVal = action;
		if (typeof min != undefined) {
			newVal = action < min ? min : newVal;
		}
		if (max) {
			newVal = action > max ? max : newVal;
		}
		let data =
			this.state.lock && position != "unit"
				? { top: newVal, right: newVal, bottom: newVal, left: newVal }
				: { [position]: newVal };
		data = Object.assign({}, responsive ? value[window.qubelyDevice] || {} : value, data);
		const final = Object.assign({}, value, responsive ? { [window.qubelyDevice]: data } : data);
		final.unit = data.unit || "px";
		onChange(final);
		this.setState({ current: final });
	}

	render() {
		const { unit, label, responsive, device, onDeviceChange, clientId, min, max } = this.props;
		let responsiveDevice = responsive ? (device ? device : this.state.device) : window.qubelyDevice;

		return (
			<div className={"qubely-field-dimension qubely-field " + (responsive ? "qubely-responsive" : "")}>
				<div className="qubely-d-flex qubely-align-center qubely-mb-10">
					{label && (
						<div>
							<label htmlFor={"input"}>{label}</label>
						</div>
					)}

					{responsive && (
						<Device
							device={responsiveDevice}
							commonResponsiveDevice={device}
							className="qubely-ml-10"
							onChange={(val) => {
								onDeviceChange(val);
							}}
						/>
					)}

					{unit && (
						<div className="qubely-unit-btn-group qubely-ml-auto">
							{(typeof unit == "object" ? unit : ["px", "em", "%"]).map((value) => (
								<button
									className={this.props.value && value == this.props.value.unit ? "active" : ""}
									onClick={() => {
										this.setSettings(value, "unit");
									}}
								>
									{value}
								</button>
							))}
						</div>
					)}
				</div>
				<div className="qubely-field-child">
					<div className={"qubely-dimension-input-group" + (!this.props.noLock ? " hasLock" : "")}>
						{["top", "right", "bottom", "left"].map((val, index) => (
							<span>
								<input
									type="number"
									{...(typeof min != undefined ? { min } : "")}
									{...(max ? { max } : "")}
									value={this._filterValue(val)}
									onChange={(v) => {
										this.setSettings(v.target.value, val);
										if (clientId) {
											$("#block-" + clientId + " .qubely-section").addClass("active");
										}
									}}
									onBlur={(v) => {
										if (clientId) {
											$("#block-" + clientId + " .qubely-section").removeClass("active");
										}
									}}
								/>
								<span>{this.props.dataLabel ? this.props.dataLabel[index] : val}</span>
							</span>
						))}
						{!this.props.noLock && (
							<button
								className={(this.state.lock ? "active " : "") + "qubely-button"}
								onClick={() => this.setState({ lock: !this.state.lock })}
							>
								{this.state.lock ? (
									<span className={"fas fa-lock"} />
								) : (
									<span className={"fas fa-unlock"} />
								)}
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default Dimension;
