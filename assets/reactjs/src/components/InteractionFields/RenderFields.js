const { __ } = wp.i18n;
const { Component } = wp.element;
import Range from "../fields/Range";

export default class RenderFields extends Component {
	_onChangeProperties(key, value, parent = "") {
		let { fields } = this.props;
		let newFields = "";
		if (parent === "") {
			newFields = Object.assign({}, fields, { [key]: value });
		} else {
			let parentProps = Object.assign({}, fields[parent], { [key]: parseFloat(value) });
			newFields = Object.assign({}, fields, { [parent]: { ...parentProps } });
		}
		this.props.onChange(newFields);
	}
	render() {
		let {
			fields: { property, range, keyframe, title },
		} = this.props;
		return (
			<div className="qubely-animation-controller-fields">
				<div className="qubely-animation-control-keyframe">
					<Range
						label={__("Timeline/Keyframe")}
						value={parseInt(keyframe)}
						onChange={(value) => this._onChangeProperties("keyframe", value)}
						min={0}
						max={100}
					/>
				</div>
				<div className="qubely-animation-control-property-title"> Action : {title} </div>
				<div className="qubely-animation-control-property-fields">
					{Object.keys(property).map((key, index) => {
						return (
							<Range
								key={index}
								label={__(key)}
								value={parseFloat(property[key])}
								onChange={(value) => this._onChangeProperties(key, value, "property")}
								min={range.min}
								max={range.max}
								step={range.step}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}
