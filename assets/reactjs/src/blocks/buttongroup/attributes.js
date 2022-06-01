const {
	gloalSettings: { globalAttributes },
	HelperFunction: { IsInteraction },
} = wp.qubelyComponents;

const attributes = {
	uniqueId: { type: "string", default: "" },
	...globalAttributes,
	buttons: { type: "number", default: 2 },
	alignment: {
		type: "object",
		default: { md: "flex-start" },
		style: [{ selector: "{{QUBELY}} .qubely-block-button-group {justify-content: {{alignment}}; }" }],
	},
	spacing: {
		type: "object",
		default: {
			unit: "px",
			md: "10",
		},
		style: [
			// { selector: '{{QUBELY}} .qubely-block-button-group {margin: -{{spacing}};} {{QUBELY}} .qubely-block-button-group.qubely-backend .block-editor-block-list__layout > div[data-type="qubely/button"]:not(:nth-last-child(2)), {{QUBELY}} .qubely-block-button-group .wp-block-qubely-button{margin: {{spacing}};}' }
			{
				selector:
					'{{QUBELY}} .qubely-block-button-group {margin-right: -{{spacing}};} {{QUBELY}} .qubely-block-button-group.qubely-backend .block-editor-block-list__layout > div[data-type="qubely/button"]:not(:nth-last-child(2)), {{QUBELY}} .qubely-block-button-group .wp-block-qubely-button:not(:last-child){margin-right: {{spacing}};}',
			},
		],
	},
};
export default attributes;
