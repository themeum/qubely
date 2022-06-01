const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
import "../css/interaction.scss";
import Toggle from "./Toggle";
import Range from "./Range";
import ButtonGroup from "./ButtonGroup";
import Timeline from "../InteractionFields/Timeline";
import { defaultInteraction } from "../InteractionFields/InteractionData";
import { MouseTilt } from "../InteractionFields/InteractionParser";
import { _equal } from "../HelperFunction";
import deepCopy from "deep-copy";

class Interaction extends Component {
	constructor() {
		super();
		this.state = {
			liveMouseTilt: false,
			isTransformOrigin: false,
		};
	}

	componentWillMount() {
		this.props.onChange(Object.assign({}, deepCopy(defaultInteraction), this.props.value || {}));
	}

	componentWillUnmount() {
		const block = $(`.qubely-block-${this.props.uniqueId}`);
		if (block.hasClass("qubely-block-interaction")) {
			block.removeClass("qubely-block-interaction").removeAttr("style");
		}
		if (this.v) {
			this.v.destroy();
			delete this.v;
		}
	}

	_saveAttributes(parentKey = "", key, val) {
		const { value, uniqueId } = this.props;
		value[parentKey][key] = val;
		const data = Object.assign({}, this.props.value, value);
		this.props.onChange(data);

		if (parentKey === "mouse_movement") {
			const { mouse_movement } = value;
			if (typeof mouse_movement.enable !== "undefined") {
				if (mouse_movement.enable === false) {
					if (this.v) {
						this.v.destroy();
						delete this.v;
					}
					if (this.state.liveMouseTilt) {
						this.setState({ liveMouseTilt: false });
					}
				}
				if (mouse_movement.enable && this.state.liveMouseTilt) {
					setTimeout(() => {
						let block = document.getElementsByClassName(`qubely-block-${uniqueId}`);
						if (block.length > 0) {
							block = block[0];
							this.updateTiltAnimate(mouse_movement, block);
						}
					}, 500);
				}
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		let {
			value: { while_scroll_into_view, mouse_movement },
			uniqueId,
		} = nextProps;
		if (typeof while_scroll_into_view.enable !== "undefined" && while_scroll_into_view.enable === false) {
			const block = $(`.qubely-block-${uniqueId}`);
			if (block.hasClass("qubely-block-interaction")) {
				block.removeClass("qubely-block-interaction").removeAttr("style");
			}
		}
	}

	updateTiltAnimate(mouse_movement, blockElement) {
		let opt = {
			speed: parseFloat(mouse_movement.mouse_tilt_speed) * 100,
			max: parseFloat(mouse_movement.mouse_tilt_max),
			reverse: mouse_movement.mouse_tilt_direction === "opposite",
		};
		if (!this.v) {
			this.v = new MouseTilt(blockElement, opt);
		} else {
			this.v.destroy();
			this.v = new MouseTilt(blockElement, opt);
		}
	}

	enableTiltAnimation() {
		let {
			value: { mouse_movement },
			uniqueId,
		} = this.props;
		let { liveMouseTilt } = this.state;
		if (liveMouseTilt === false) {
			setTimeout(() => {
				let block = document.getElementsByClassName(`qubely-block-${uniqueId}`);
				if (block.length > 0) {
					block = block[0];
					this.updateTiltAnimate(mouse_movement, block);
				}
			}, 500);
		} else {
			if (this.v) {
				this.v.destroy();
				delete this.v;
			}
		}
		this.setState({ liveMouseTilt: !liveMouseTilt });
	}

	selectAction(action) {
		const extract = { blur: true, opacity: true };
		let { isTransformOrigin } = this.state;
		isTransformOrigin = extract[action.name] ? false : true;
		this.setState({ isTransformOrigin });
	}

	render() {
		const { value } = this.props;
		const { while_scroll_into_view, mouse_movement } = value;
		let transform_origin = { x_offset: "center", y_offset: "center" };
		if (typeof while_scroll_into_view !== "undefined") {
			transform_origin.x_offset =
				typeof while_scroll_into_view.transform_origin_x === "undefined"
					? "center"
					: while_scroll_into_view.transform_origin_x;
			transform_origin.y_offset =
				typeof while_scroll_into_view.transform_origin_y === "undefined"
					? "center"
					: while_scroll_into_view.transform_origin_y;
		}
		return (
			<Fragment>
				{typeof while_scroll_into_view !== "undefined" && (
					<div className="qubely-interaction-view qubely-fields  qubely-field-alt">
						<div className="sppb-interaction-view-body">
							{!qubely_admin.pro_enable ? (
								<div className="qubely-field-pro-upgrade">
									<div className="qubely-logo">
										<img
											src={qubely_admin.plugin + "assets/img/qubely-logo.svg"}
											alt={__("Qubely")}
										/>
									</div>
									<div className="qubely-upgrade-message">
										<span className="qubely-upgrade-message-title">{__("Upgrade to Pro")}</span>
										<span className="qubely-upgrade-message-description">
											{__(
												"Get all features of post grid at your disposal by upgrading to pro version"
											)}
										</span>
									</div>
									<a
										className="qubely-upgrade-button"
										href={"https://www.themeum.com/product/qubely"}
										target="_blank"
									>
										{__("Upgrade Now")}
									</a>
								</div>
							) : (
								<Fragment>
									<Toggle
										label={__("Enable")}
										value={while_scroll_into_view.enable}
										onChange={() =>
											this._saveAttributes(
												"while_scroll_into_view",
												"enable",
												!while_scroll_into_view.enable
											)
										}
									/>
									{while_scroll_into_view.enable && (
										<Fragment>
											<Timeline
												uniqueId={this.props.uniqueId}
												onChange={(actionList) =>
													this._saveAttributes(
														"while_scroll_into_view",
														"action_list",
														actionList
													)
												}
												selectAction={this.selectAction.bind(this)}
												actionList={while_scroll_into_view.action_list}
												enable={while_scroll_into_view.enable}
												transformOrigin={transform_origin}
											/>
											{this.state.isTransformOrigin && (
												<div className="qubley-flex-d qubley-interaction-transform-origin">
													<div className="qubley-interaction-transform-origin-label">
														<label> {__("Transform Origin")} </label>
													</div>
													<ButtonGroup
														label={__("X-Axis")}
														options={[
															[__("Left"), "left"],
															[__("Middle"), "center"],
															[__("Right"), "right"],
														]}
														value={transform_origin.x_offset}
														onChange={(value) =>
															this._saveAttributes(
																"while_scroll_into_view",
																"transform_origin_x",
																value
															)
														}
													/>

													<ButtonGroup
														label={__("Y-Axis")}
														options={[
															[__("Top"), "top"],
															[__("Middle"), "center"],
															[__("Bottom"), "bottom"],
														]}
														value={transform_origin.y_offset}
														onChange={(value) =>
															this._saveAttributes(
																"while_scroll_into_view",
																"transform_origin_y",
																value
															)
														}
													/>
												</div>
											)}
											<Toggle
												label={__("Enable Tablet")}
												value={while_scroll_into_view.enable_tablet}
												onChange={() =>
													this._saveAttributes(
														"while_scroll_into_view",
														"enable_tablet",
														!while_scroll_into_view.enable_tablet
													)
												}
											/>
											<Toggle
												label={__("Enable Mobile")}
												value={while_scroll_into_view.enable_mobile}
												onChange={() =>
													this._saveAttributes(
														"while_scroll_into_view",
														"enable_mobile",
														!while_scroll_into_view.enable_mobile
													)
												}
											/>
										</Fragment>
									)}
								</Fragment>
							)}
						</div>
					</div>
				)}
				<hr />
				{typeof mouse_movement !== "undefined" && (
					<div className="sp-pagebuilder-list-view">
						<div className="sppb-interaction-view-body">
							<Toggle
								label={__("Enable Mouse Movement")}
								value={mouse_movement.enable}
								onChange={() =>
									this._saveAttributes("mouse_movement", "enable", !mouse_movement.enable)
								}
							/>
							{mouse_movement.enable && (
								<Fragment>
									<ButtonGroup
										label={__("Direction")}
										options={[
											[__("Direct"), "direct"],
											[__("Opposite"), "opposite"],
										]}
										value={mouse_movement.mouse_tilt_direction}
										onChange={(value) =>
											this._saveAttributes("mouse_movement", "mouse_tilt_direction", value)
										}
									/>

									<Range
										label={__("Speed")}
										value={parseFloat(mouse_movement.mouse_tilt_speed)}
										onChange={(value) =>
											this._saveAttributes("mouse_movement", "mouse_tilt_speed", value)
										}
										min={1}
										max={10}
										step={0.5}
									/>
									<Range
										label={__("Maximum")}
										value={parseFloat(mouse_movement.mouse_tilt_max)}
										onChange={(value) =>
											this._saveAttributes("mouse_movement", "mouse_tilt_max", value)
										}
										min={5}
										max={75}
										step={5}
									/>

									<Toggle
										label={__("Enable Tablet")}
										value={mouse_movement.enable_tablet}
										onChange={() =>
											this._saveAttributes(
												"mouse_movement",
												"enable_tablet",
												!mouse_movement.enable_tablet
											)
										}
									/>

									<Toggle
										label={__("Enable Mobile")}
										value={mouse_movement.enable_mobile}
										onChange={() =>
											this._saveAttributes(
												"mouse_movement",
												"enable_mobile",
												!mouse_movement.enable_mobile
											)
										}
									/>

									<button
										onClick={() => this.enableTiltAnimation()}
										className="components-button is-button is-default is-primary is-large"
									>
										{" "}
										{this.state.liveMouseTilt ? "Stop" : "Live"}{" "}
									</button>
								</Fragment>
							)}
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}

export default Interaction;
