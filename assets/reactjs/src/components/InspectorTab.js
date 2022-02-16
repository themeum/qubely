const { Fragment } = wp.element;

const InspectorTab = (props) => {
	const { children, isActive, key } = props;
	return (
		<div
			style={{
				display: isActive ? "block" : "none",
			}}
			className="qubely-inspector-tab"
		>
			{Array.isArray(children) ? children.map((item) => item) : children}
		</div>
	);
};

export default InspectorTab;
