const { Component } = wp.element;
const { Tooltip } = wp.components;

class RadioAdvanced extends Component {
	setSettings(val) {
		this.props.onChange(val);
	}

	render() {
		const { value, label, options } = this.props;
		return (
			<div className="qubely-field qubely-field-radio-advanced qubely-d-flex qubely-align-center">
				{label && <span>{label}</span>}
				<div className={`qubely-field-button-list${label && " qubely-ml-auto"}`}>
					{options.map((data, index) => {
						return (
							<Tooltip key={index} text={data.title || data.value}>
								<button
									className={(value == data.value ? "active" : "") + " qubely-button"}
									key={index}
									onClick={() => this.setSettings(data.value)}
								>
									{data.icon ? (
										<i className={data.icon} />
									) : data.svg ? (
										<span className="qubely-option-svg">{data.svg}</span>
									) : (
										data.label
									)}
								</button>
							</Tooltip>
						);
					})}
				</div>
			</div>
		);
	}
}
export default RadioAdvanced;
