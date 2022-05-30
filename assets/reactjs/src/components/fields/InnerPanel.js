import "../css/InnerPanel.scss";
const { Component } = wp.element;
class InnerPanel extends Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}

	render() {
		const { children, onTabChange } = this.props;

		return (
			<div className={`qubely-field qubely-field-inner-panel`}>
				{this.props.title && (
					<div
						className="qubely-field-inner-panel-title"
						onClick={() => this.setState({ show: !this.state.show })}
						role="button"
					>
						<span>{this.props.title}</span>
						<i className={`fas fa-chevron-${this.state.show ? "down" : "right"}`} />
					</div>
				)}
				{this.state.show && (
					<div className="qubely-field-inner-panel-body">
						{Array.isArray(children) ? children.map((item) => item) : children}
					</div>
				)}
			</div>
		);
	}
}
export default InnerPanel;
