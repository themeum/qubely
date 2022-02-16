const { __ } = wp.i18n;
import "../css/animation.scss";
const { Component, Fragment } = wp.element;
import Range from "./Range";
import Select from "./Select";

const defaultData = {
	animation: "",
	name: "fadeCenter",
	repeat: "once",
	direction: "center",
	duration: 1000,
	delay: 0,
	curve: "ease-in-out",
};

class Animation extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			isAnimate: false,
		};
	}
	componentWillMount() {
		this.props.onChange(Object.assign({}, defaultData, this.props.value || {}));
	}

	setSettings(type, val) {
		const openAnimation = val == "" ? { openAnimation: 0 } : { openAnimation: 1 };
		let data = Object.assign(
			{},
			this.props.value,
			openAnimation,
			type == "animation" ? { [type]: val, direction: this._valueChange(val, "change") } : { [type]: val }
		);
		data.name = data.animation + data.direction;
		this.props.onChange(data);
	}

	_valueChange(value, type) {
		let returnData =
			value == "rotate"
				? ["DownLeft", "DownRight", "UpLeft", "UpRight"]
				: value == "slide" || value == "flip" || value == "fold"
				? ["Right", "Left", "Up", "Down"]
				: ["Center", "Right", "Left", "Up", "Down"];
		if (type == "data") {
			return returnData;
		} else {
			return returnData[0];
		}
	}

	doAnimate() {
		const { value, uniqueId } = this.props;
		if (typeof uniqueId !== "undefined") {
			const { isAnimate } = this.state;
			const blockId = $(`.qubely-block-${uniqueId}`);
			if (isAnimate && value.repeat !== "once") {
				blockId.css({ "animation-name": "" });
			} else {
				blockId.css({ "animation-name": "" });
				const cssObject = {
					"animation-name": value.name,
					"animation-timing-function": value.curve,
					"animation-duration": value.duration + "ms",
					"animation-delay": value.delay + "ms",
					"animation-iteration-count": value.repeat === "once" ? 1 : "infinite",
				};
				if (typeof this.timer !== "undefined" && this.timer > 0) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(() => {
					blockId.css(cssObject);
				}, 300);
			}
			this.setState({ isAnimate: !isAnimate });
		}
	}

	render() {
		const { value, label, uniqueId } = this.props;
		const isActive = value && value.openAnimation === 1 ? true : false;

		return (
			<div className="qubely-fields qubely-animation qubely-field-alt">
				<Select
					clear
					label={label ? label : ""}
					noValue={"None"}
					value={value.animation || ""}
					options={[
						["fade", __("Fade")],
						["slide", __("Slide")],
						["bounce", __("Bounce")],
						["zoom", __("Zoom")],
						["flip", __("Flip")],
						["fold", __("Fold")],
						["rotate", "Rotate"],
					]}
					onChange={(val) => this.setSettings("animation", val)}
				/>

				{isActive && (
					<Fragment>
						<Select
							label={__("Direction")}
							value={value.direction || "center"}
							options={this._valueChange(value.animation, "data")}
							onChange={(val) => this.setSettings("direction", val)}
						/>
						<Select
							label={__("Repeat")}
							value={value.repeat || "once"}
							options={[
								["once", __("Once")],
								["loop", __("Loop")],
							]}
							onChange={(val) => this.setSettings("repeat", val)}
						/>
						<Range
							label={__("Duration")}
							min={0}
							max={2000}
							value={value.duration || 1000}
							onChange={(val) => this.setSettings("duration", val)}
						/>
						<Range
							label={__("Delay")}
							min={0}
							max={3000}
							value={value.delay || 0}
							onChange={(val) => this.setSettings("delay", val)}
						/>
						{value && value.animation != "bounce" && value.animation != "zoom" && (
							<Select
								label={__("Curve")}
								value={value.curve || "ease-in-out"}
								options={["ease-in-out", "ease", "ease-in", "ease-out", "linear"]}
								onChange={(val) => this.setSettings("curve", val)}
							/>
						)}
						{typeof uniqueId !== "undefined" && (
							<button
								onClick={() => this.doAnimate()}
								className="components-button is-button is-default is-primary is-large"
							>
								{" "}
								{this.state.isAnimate && value.repeat === "loop" ? "Stop" : "Animate"}{" "}
							</button>
						)}
					</Fragment>
				)}
			</div>
		);
	}
}
export default Animation;
