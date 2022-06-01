const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
class Edit extends Component {
	render() {
		return (
			<div className="qubely-tabs-innerblock">
				<InnerBlocks
					templateLock={false}
					templateInsertUpdatesSelection={false}
					renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
				/>
			</div>
		);
	}
}
export default Edit;
