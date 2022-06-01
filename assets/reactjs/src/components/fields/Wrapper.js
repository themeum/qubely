import "../css/wrapper.scss";
const { Component, Fragment } = wp.element;
class Wrapper extends Component {
	constructor(props) {
		super(props);
		this.state = { cssStyle: {}, positionClass: "" };
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		if (this.props.inline) {
			let node = document.querySelector(`#qubely-field-wrapper`),
				rect = node.getBoundingClientRect();
			const topDiff = window.innerHeight - rect.top;
			const bottomDiff = window.innerHeight - topDiff - 120;
			const wrapperHeight = rect.height - 20;
			let positionClass = "";
			if (topDiff >= wrapperHeight) {
				positionClass = "quebly-position-bottom";
			} else if (bottomDiff >= wrapperHeight) {
				positionClass = "quebly-position-top";
			} else {
				positionClass = "quebly-position-middle";
				this.setState({ cssStyle: { top: `-${rect.height / 2}px` } });
			}
			this.setState({ positionClass });
		}
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	/**
	 *
	 * @param {object} event
	 *
	 * Close PopUp onClickOutside
	 *
	 * If event target is inside the avoidable dom node then Ignore
	 * *
	 * Else close PopUp executing onClickOutside from parent component
	 *
	 */
	handleClickOutside = (event) => {
		const { onClickOutside, domNodetobeAvoided } = this.props;
		const qubelyPopUpWraper = this.refs.qubelyPopUpWraper;
		if (qubelyPopUpWraper && !qubelyPopUpWraper.contains(event.target)) {
			domNodetobeAvoided && !domNodetobeAvoided.contains(event.target) && onClickOutside();
		}
	};
	render() {
		const { cssStyle, positionClass } = this.state;
		const { label, children, inline, customClass } = this.props;
		return (
			<Fragment>
				<div
					ref="qubelyPopUpWraper"
					id="qubely-field-wrapper"
					style={{ ...cssStyle }}
					className={`qubely-field qubely-field-wrapper ${
						inline ? "qubely-field-wrapper-inline" : ""
					} ${customClass} ${positionClass}`}
				>
					{label ? <label className="qubely-field-wrapper-label">{label}</label> : ""}
					<div className="qubely-field-wrapper-content">
						{Array.isArray(children) ? children.map((item) => item) : children}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Wrapper;
