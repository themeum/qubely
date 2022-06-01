import classnames from "classnames";
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
class Save extends Component {
	render() {
		const {
			attributes: { id },
		} = this.props;

		const wrapperClasses = classnames("qubely-tab-content", { ["qubely-active"]: id == 1 });
		return (
			<div className={wrapperClasses}>
				<InnerBlocks.Content />
			</div>
		);
	}
}
export default Save;
