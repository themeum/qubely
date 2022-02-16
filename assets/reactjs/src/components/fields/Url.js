const { __ } = wp.i18n;
import "../css/url.scss";
const { Component } = wp.element;
const { CheckboxControl, Tooltip } = wp.components;

class Url extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openAdvance: false,
		};
	}

	setSettings(type, value) {
		this.props.onChange(
			Object.assign({}, this.props.value, { [type]: type == "url" ? value : value == 1 ? 0 : 1 })
		);
	}

	render() {
		const { value, label, placeholder, disableAdvanced } = this.props;
		const { openAdvance } = this.state;
		return (
			<div className="qubely-field-url qubely-field">
				{label && <label>{label}</label>}
				<div className="qubely-field-child">
					<div className="qubely-url-input-group">
						<input
							placeholder={placeholder ? placeholder : "https://"}
							type="url"
							value={value.url || ""}
							onChange={(e) => this.setSettings("url", e.target.value)}
						/>
						{disableAdvanced !== true && (
							<Tooltip text={__("Advance Url Settings")}>
								<button
									className={`qubely-button qubely-button-rounded ${openAdvance ? "active" : ""}`}
									onClick={() => this.setState({ openAdvance: !openAdvance })}
								>
									<i className="fas fa-cog" />
								</button>
							</Tooltip>
						)}
					</div>
					{openAdvance && (
						<div className="qubely-url-advance-options">
							<CheckboxControl
								label={__("Open in new window")}
								checked={value.target}
								onChange={(val) => this.setSettings("target", !val)}
							/>
							<CheckboxControl
								label={__("Add Nofollow")}
								checked={value.nofollow}
								onChange={(val) => this.setSettings("nofollow", !val)}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Url;
