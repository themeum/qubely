import "../css/dragdimension.scss";
const { __ } = wp.i18n;
const { Component } = wp.element;
import Device from "./Device";

export default class DragDimension extends Component {
	constructor(props) {
		super(...arguments);
		this.state = {
			defaultValue: { top: 0, bottom: 0, left: 0, right: 0, unit: "px" },
			value: { ...props.value },
			mousePosition: "margin",
			direction: "",
			x: 0,
			y: 0,
			active: false,
			responseDevice: typeof props.responsive === "undefined" ? "md" : window.qubelyDevice,
			units: typeof props.units === "undefined" ? "px" : props.units[0],
			isPopover: null,
		};
	}

	componentDidMount() {
		window.addEventListener("mousemove", this.onDragOverAction.bind(this));
		window.addEventListener("mouseup", this.onDragStopAction.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.onDragOverAction.bind(this));
		window.removeEventListener("mouseup", this.onDragStopAction.bind(this));
	}

	onDragOverAction(event) {
		const { active, x, y, direction, mousePosition, responseDevice, value } = this.state;
		const { responsive, onChange, uniqueId } = this.props;
		if (active === true) {
			event.preventDefault();
			if (typeof uniqueId !== "undefined") {
				$(`.qubely-block-${uniqueId}`).addClass(`${mousePosition}-dragging`);
			}

			const deviceEvent = event;
			let dimension = {};
			if (typeof responsive === "undefined") {
				dimension = value[mousePosition];
			} else {
				dimension =
					typeof value[mousePosition][responseDevice] === "undefined"
						? {}
						: value[mousePosition][responseDevice];
			}

			if (direction === "top") {
				if (typeof dimension.top === "undefined") {
					dimension = { ...dimension, top: 0 };
				}
				dimension.top =
					mousePosition === "padding"
						? dimension.top + (deviceEvent.pageY - y)
						: dimension.top + (y - deviceEvent.pageY);
			}
			if (direction === "bottom") {
				if (typeof dimension.bottom === "undefined") {
					dimension = { ...dimension, bottom: 0 };
				}
				dimension.bottom =
					mousePosition === "padding"
						? dimension.bottom + (y - deviceEvent.pageY)
						: dimension.bottom + (deviceEvent.pageY - y);
			}
			if (direction === "left") {
				if (typeof dimension.left === "undefined") {
					dimension = { ...dimension, left: 0 };
				}
				dimension.left =
					mousePosition === "padding"
						? dimension.left + (deviceEvent.pageX - x)
						: dimension.left + (x - deviceEvent.pageX);
			}
			if (direction === "right") {
				if (typeof dimension.right === "undefined") {
					dimension = { ...dimension, right: 0 };
				}
				dimension.right =
					mousePosition === "padding"
						? dimension.right + (x - deviceEvent.pageX)
						: dimension.right + (deviceEvent.pageX - x);
			}
			// Padding will always positive number
			if (mousePosition === "padding") {
				dimension.top = dimension.top < 0 ? 0 : dimension.top;
				dimension.left = dimension.left < 0 ? 0 : dimension.left;
				dimension.right = dimension.right < 0 ? 0 : dimension.right;
				dimension.bottom = dimension.bottom < 0 ? 0 : dimension.bottom;
			}
			const currentValue =
				typeof responsive === "undefined" ? { ...dimension } : { [responseDevice]: { ...dimension } };
			value[mousePosition] = { ...value[mousePosition], ...currentValue };
			onChange(value);

			this.setState({
				value: { ...value },
				x: deviceEvent.pageX,
				y: deviceEvent.pageY,
				direction: direction,
			});
		}
	}

	onDragStopAction(event) {
		const { mousePosition } = this.state;
		const { uniqueId } = this.props;
		if (typeof uniqueId !== "undefined") {
			$(`.qubely-block-${uniqueId}`).removeClass(`${mousePosition}-dragging`);
		}
		this.setState({ active: false, x: 0, y: 0 });
	}

	onMouseDownAction(direction, event) {
		if (event.button === 0) {
			this.setState({
				active: true,
				x: event.pageX,
				y: event.pageY,
				direction,
			});
		}
	}

	onMouseEnter(position, event) {
		const { active, isPopover } = this.state;
		if (active === false && isPopover === null) {
			this.setState({ mousePosition: position });
		}
	}

	changeUnit(unit, event) {
		const { responseDevice, value } = this.state;
		const { responsive, onChange } = this.props;
		const mousePositions = ["margin", "padding"];
		mousePositions.map((mousePosition) => {
			let dimension = {};
			if (typeof responsive === "undefined") {
				dimension = value[mousePosition];
			} else {
				dimension =
					typeof value[mousePosition][responseDevice] === "undefined"
						? {}
						: value[mousePosition][responseDevice];
			}
			if (typeof dimension.unit === "undefined") {
				dimension = { ...dimension, unit };
			} else {
				dimension.unit = unit;
			}
			const currentValue =
				typeof responsive === "undefined" ? { ...dimension } : { [responseDevice]: { ...dimension } };
			value[mousePosition] = { ...value[mousePosition], ...currentValue };
		});
		onChange(value);
		this.setState({
			value: { ...value },
		});
	}

	onChangeDimension(fieldValue, direction) {
		const { mousePosition, responseDevice, value } = this.state;
		const { responsive, onChange } = this.props;
		let dimension = {};
		if (typeof responsive === "undefined") {
			dimension = value[mousePosition];
		} else {
			dimension =
				typeof value[mousePosition][responseDevice] === "undefined" ? {} : value[mousePosition][responseDevice];
		}

		let targetValue = fieldValue === "" ? 0 : parseInt(fieldValue);

		if (mousePosition === "padding") targetValue = targetValue < 0 ? 0 : targetValue;

		if (direction === "top") {
			if (typeof dimension.top === "undefined") {
				dimension = { ...dimension, top: 0 };
			}
			dimension.top = targetValue;
		}
		if (direction === "bottom") {
			if (typeof dimension.bottom === "undefined") {
				dimension = { ...dimension, bottom: 0 };
			}
			dimension.bottom = targetValue;
		}
		if (direction === "left") {
			if (typeof dimension.left === "undefined") {
				dimension = { ...dimension, left: 0 };
			}
			dimension.left = targetValue;
		}
		if (direction === "right") {
			if (typeof dimension.right === "undefined") {
				dimension = { ...dimension, right: 0 };
			}
			dimension.right = targetValue;
		}
		let unit = typeof dimension.unit === "undefined" ? "px" : dimension.unit;
		dimension = { ...dimension, unit };
		const currentValue =
			typeof responsive === "undefined" ? { ...dimension } : { [responseDevice]: { ...dimension } };
		value[mousePosition] = { ...value[mousePosition], ...currentValue };
		onChange(value);
		this.setState({
			value: { ...value },
		});
	}

	changeInput(type, val, position) {
		return (
			<input
				type="number"
				min={type == "margin" ? -220 : 0}
				max={220}
				step={1}
				value={val}
				onFocus={() => $(`.qubely-block-${this.props.uniqueId}`).addClass(`${type}-input-dragging`)}
				onBlur={() => $(`.qubely-block-${this.props.uniqueId}`).removeClass(`${type}-input-dragging`)}
				onChange={(e) => this.onChangeDimension(e.target.value, position)}
			/>
		);
	}

	render() {
		const {
			responseDevice,
			defaultValue,
			value: { margin, padding },
			units,
			mousePosition,
			direction,
			isPopover,
		} = this.state;
		const { responsive, label, unit } = this.props;
		let activeMargin = typeof responsive === "undefined" ? margin : margin[responseDevice];
		activeMargin = { ...defaultValue, ...activeMargin };
		let activePadding = typeof responsive === "undefined" ? padding : padding[responseDevice];
		activePadding = { ...defaultValue, ...activePadding };

		const isMarginDrag = mousePosition === "margin" ? `qubely-drag-${mousePosition}-${direction}` : "";
		const isPaddingDrag = mousePosition === "padding" ? `qubely-drag-${mousePosition}-${direction}` : "";

		return (
			<div className={"qubely-drag-dimension qubely-field"}>
				<div className="qubely-field qubely-field-border qubely-d-flex qubely-align-center">
					{label && <div>{label}</div>}

					{this.props.responsive && (
						<Device className="qubely-ml-10" onChange={(val) => this.setState({ responseDevice: val })} />
					)}

					{unit && (
						<div className="qubely-unit-btn-group qubely-ml-auto">
							{(typeof unit == "object" ? unit : ["px", "em", "%"]).map((value) => (
								<button
									className={value == activePadding.unit ? "active" : ""}
									onClick={() => this.changeUnit(value)}
								>
									{value}
								</button>
							))}
						</div>
					)}
				</div>

				<div className="qubely-field-child">
					<div className="qubely-drag-dimension-wrap">
						<div className="qubely-dimension-margin-wrap">
							<div
								className={"qubely-dimension-margin " + isMarginDrag}
								data-text={__("margin")}
								onMouseEnter={this.onMouseEnter.bind(this, "margin")}
							>
								<div
									className="dimension-item margin-left"
									onMouseDown={this.onMouseDownAction.bind(this, "left")}
								>
									<span />
									{this.changeInput("margin", activeMargin.left, "left")}
								</div>
								<div
									className="dimension-item margin-top"
									onMouseDown={this.onMouseDownAction.bind(this, "top")}
								>
									<span />
									{this.changeInput("margin", activeMargin.top, "top")}
								</div>
								<div
									className="dimension-item margin-bottom"
									onMouseDown={this.onMouseDownAction.bind(this, "bottom")}
								>
									<span />
									{this.changeInput("margin", activeMargin.bottom, "bottom")}
								</div>
								<div
									className="dimension-item margin-right"
									onMouseDown={this.onMouseDownAction.bind(this, "right")}
								>
									<span />
									{this.changeInput("margin", activeMargin.right, "right")}
								</div>
							</div>
							<div
								className={"qubely-dimension-padding " + isPaddingDrag}
								data-text={__("padding")}
								onMouseEnter={this.onMouseEnter.bind(this, "padding")}
							>
								<div
									className="dimension-item padding-left"
									onMouseDown={this.onMouseDownAction.bind(this, "left")}
								>
									<span />
									{this.changeInput("padding", activePadding.left, "left")}
								</div>
								<div
									className="dimension-item padding-top"
									onMouseDown={this.onMouseDownAction.bind(this, "top")}
								>
									<span />
									{this.changeInput("padding", activePadding.top, "top")}
								</div>
								<div
									className="dimension-item padding-bottom"
									onMouseDown={this.onMouseDownAction.bind(this, "bottom")}
								>
									<span />
									{this.changeInput("padding", activePadding.bottom, "bottom")}
								</div>
								<div
									className="dimension-item padding-right"
									onMouseDown={this.onMouseDownAction.bind(this, "right")}
								>
									<span />
									{this.changeInput("padding", activePadding.right, "right")}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
