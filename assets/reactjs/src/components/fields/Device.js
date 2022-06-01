const { __ } = wp.i18n;
const { Component } = wp.element;
const { Tooltip } = wp.components;

class Device extends Component {
	constructor(props) {
		super(props);
		this.state = { current: typeof props.device !== "undefined" && props.device !== "" ? props.device : "md" };
	}
	componentDidMount() {
		if (typeof this.props.device !== "undefined" && this.props.device !== "") {
			window.qubelyDevice = this.props.device;
		}
	}
	setSettings(value) {
		window.qubelyDevice = value;
		this.setState({ current: value });
		this.props.onChange(value);
	}

	render() {
		const { current } = this.state;
		const { device, className, commonResponsiveDevice } = this.props;

		return (
			<div className={`qubely-device ${className ? className : ""}`}>
				<Tooltip text={__("Desktop")}>
					<button
						onClick={() => this.setSettings("md")}
						title={__("Desktop")}
						className={
							"qubely-device-desktop" +
							((commonResponsiveDevice && device == "md") || (!commonResponsiveDevice && current == "md")
								? " active"
								: "")
						}
					/>
				</Tooltip>
				<Tooltip text={__("Tablet")}>
					<button
						onClick={() => this.setSettings("sm")}
						title={__("Tablet")}
						className={
							"qubely-device-tablet" +
							((commonResponsiveDevice && device == "sm") || (!commonResponsiveDevice && current == "sm")
								? " active"
								: "")
						}
					/>
				</Tooltip>
				<Tooltip text={__("Mobile")}>
					<button
						onClick={() => this.setSettings("xs")}
						title={__("Phone")}
						className={
							"qubely-device-mobile" +
							((commonResponsiveDevice && device == "xs") || (!commonResponsiveDevice && current == "xs")
								? " active"
								: "")
						}
					/>
				</Tooltip>
			</div>
		);
	}
}
export default Device;
