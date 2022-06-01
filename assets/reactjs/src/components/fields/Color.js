import "../css/color.scss";
import classnames from "classnames";

const { __ } = wp.i18n;

const { Component } = wp.element;

const { Tooltip, Dropdown, ColorPicker } = wp.components;

const { createHigherOrderComponent } = wp.compose;

function Color(props) {
	const { value, label, onChange, className, globalColors, disableClear, disableAlpha, disablePalette } = props;

	const classes = classnames("qubely-field", "qubely-d-flex", "qubely-field-color", "qubely-align-center", {
		[className]: className,
	});

	return (
		<div className={classes}>
			{label && <label className="qubely-mb-0">{__(label)}</label>}
			<Dropdown
				position="top center"
				className="qubely-ml-auto"
				renderToggle={({ isOpen, onToggle }) => {
					return (
						<div className="qubely-color-picker-container">
							<button
								className="qubely-color-picker"
								isPrimary
								onClick={onToggle}
								aria-expanded={isOpen}
								style={value ? { backgroundColor: value } : { backgroundColor: "transparent" }}
							/>
						</div>
					);
				}}
				renderContent={() => (
					<span>
						<ColorPicker
							color={value || ""}
							onChangeComplete={(val) => {
								if (val.rgb) {
									onChange(
										val.rgb.a != 1
											? "rgba(" +
													val.rgb.r +
													"," +
													val.rgb.g +
													"," +
													val.rgb.b +
													"," +
													val.rgb.a +
													")"
											: val.hex
									);
								}
							}}
							disableAlpha={disableAlpha ? disableAlpha : false}
						/>
						{!disablePalette && (
							<div className="qubely-rgba-palette">
								{globalColors.map((color, index) => (
									<button
										style={{ color: `var(--qubely-color-${index + 1})` }}
										onClick={() => onChange(`var(--qubely-color-${index + 1})`)}
									/>
								))}
							</div>
						)}
					</span>
				)}
			/>
			{value != "" && !disableClear && (
				<Tooltip text={__("Clear")}>
					<div className="qubely-ml-10">
						<span className="qubely-border-clear" onClick={() => onChange("")} role="button">
							<i className="fas fa-undo" />
						</span>
					</div>
				</Tooltip>
			)}
		</div>
	);
}

function withGLobalColor(initialState = {}) {
	return createHigherOrderComponent((OriginalComponent) => {
		return class WrappedComponent extends Component {
			constructor() {
				super(...arguments);

				this.setState = this.setState.bind(this);

				this.state = initialState;
			}
			componentDidMount() {
				this.getGlobalSettings();
			}
			getGlobalSettings = async () => {
				let qubelyGlobalSettings = await JSON.parse(localStorage.getItem("qubely-global-settings"));
				const { colors } = qubelyGlobalSettings;
				if (typeof colors !== "undefined") {
					this.setState({
						globalColors: colors,
					});
				}
			};

			render() {
				return <OriginalComponent {...this.props} {...this.state} setState={this.setState} />;
			}
		};
	}, "withGLobalColor");
}

export default withGLobalColor()(Color);
