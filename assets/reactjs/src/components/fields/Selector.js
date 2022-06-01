import "../css/selector.scss";
const { Component } = wp.element;
import Select from "./Select";
import icons from "../../helpers/icons";

class Selector extends Component {
	setSettings(value) {
		this.props.onChange(value.target.getAttribute("data-value"));
	}
	render() {
		const { value } = this.props;
		const defaultVal = this.props.defaultVal || [
			["h1", "Heading 1"],
			["h2", "Heading 2"],
			["h3", "Heading 3"],
			["h4", "Heading 4"],
			["h5", "Heading 5"],
			["h6", "Heading 6"],
			["p", "Paragraph"],
			["span", "span"],
			["div", "div"],
		];
		return (
			<div className="qubely-field-selector qubely-field">
				{this.props.label && <label>{this.props.label}</label>}
				{this.props.dropdown == "yes" ? (
					<Select value={value} options={defaultVal} onChange={(val) => this.setSettings({ val })} />
				) : (
					<div className="qubely-field-child">
						<div className="qubely-selector-button-group">
							{defaultVal.map((data, i) => {
								const [tag, description] = data;
								return (
									<button
										key={i}
										className={"qubely-button" + (tag == value ? " active" : "")}
										onClick={(val) => this.setSettings(val)}
										data-value={tag}
									>
										{icons[tag] && icons[tag]}
										{description}
									</button>
								);
							})}
						</div>
					</div>
				)}
			</div>
		);
	}
}
export default Selector;
