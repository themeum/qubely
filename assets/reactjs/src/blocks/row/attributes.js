const {
	gloalSettings: { globalAttributes },
} = wp.qubelyComponents;

const attributes = {
	uniqueId: {
		type: "string",
		default: "",
	},
	...globalAttributes, // Global Settings
	columns: {
		type: "number",
		default: "",
	},
	childRow: {
		type: "boolean",
		default: false,
	},
	evenColumnHeight: {
		type: "boolean",
		default: false,
		style: [
			{ selector: "{{QUBELY}}.qubely-section .qubely-row .qubely-column>.qubely-column-inner {height: 100%;}" },
		],
	},
	// Dimension
	padding: {
		type: "object",
		default: {
			md: {
				top: 70,
				right: 0,
				bottom: 70,
				left: 0,
			},
			unit: "px",
		},
		style: [{ selector: "{{QUBELY}}.qubely-section {padding: {{padding}};}" }],
	},

	marginTop: {
		type: "object",
		default: { md: 0, unit: "px" },
		style: [{ selector: "{{QUBELY}}.qubely-section{ margin-top:  {{marginTop}}; }" }],
	},
	marginBottom: {
		type: "object",
		default: { md: 0, unit: "px" },
		style: [{ selector: "{{QUBELY}}.qubely-section{ margin-bottom:  {{marginBottom}}; }" }],
	},

	rowGutter: {
		type: "object",
		default: { md: 30, sm: 30, xs: 30, unit: "px" },
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-container {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}" +
					"{{QUBELY}} .qubely-row {margin-left: calc(-{{rowGutter}}/2); margin-right: calc(-{{rowGutter}}/2);}" +
					"{{QUBELY}} .qubely-row > .qubely-column {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}" +
					'{{QUBELY}} .qubely-row * > [data-type="qubely/column"] {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
					".components-resizable-box__container.qubely-column-resizer.is-selected-column > span > .components-resizable-box__handle, " +
					'div[data-type="qubely/row"].is-selected .components-resizable-box__container.qubely-column-resizer > span > .components-resizable-box__handle,' +
					'div[data-type="qubely/row"].is-resizing .components-resizable-box__container.qubely-column-resizer > span > .components-resizable-box__handle {right: calc(-{{rowGutter}}/2);}',
			},
		],
	},

	rowContainerWidth: {
		type: "string",
		default: "boxed",
	},

	rowContainer: {
		type: "number",
		default: 0,
		style: [
			{
				condition: [
					{ key: "align", relation: "==", value: "full" },
					{ key: "rowContainerWidth", relation: "==", value: "boxed" },
					{ key: "rowContainer", relation: "!=", value: 0 },
				],
				selector:
					"@media (min-width: 1200px) {{{QUBELY}} .qubely-container {max-width: {{rowContainer}}px !important;}}",
			},
		],
	},
	position: {
		type: "string",
		default: "",
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-row, {{QUBELY}} .qubely-row .block-editor-block-list__layout {-webkit-box-align: {{position}}; -ms-flex-align: {{position}}; align-items: {{position}}; }",
			},
		],
	},

	// Background
	rowBg: {
		type: "object",
		default: {
			bgimgPosition: "center center",
			bgimgSize: "cover",
			bgimgRepeat: "no-repeat",
			bgDefaultColor: "#f5f5f5",
			bgimageSource: "local",
			externalImageUrl: {},
		},
		style: [{ selector: "{{QUBELY}}.qubely-section" }],
	},
	heightOptions: { type: "string", default: "auto" },
	rowHeight: {
		type: "object",
		default: {},
		style: [
			{
				condition: [{ key: "heightOptions", relation: "==", value: "custom" }],
				selector: "{{QUBELY}} .qubely-row {min-height: {{rowHeight}};}",
			},
		],
	},

	borderRadius: {
		type: "object",
		default: {},
		style: [
			{
				selector:
					"{{QUBELY}}.qubely-section, {{QUBELY}}.qubely-section .qubely-video-bg-wrap, {{QUBELY}}.qubely-section .qubely-row-overlay",
			},
		],
	},

	rowShadow: { type: "object", default: {}, style: [{ selector: "{{QUBELY}}.qubely-section" }] },
	border: {
		type: "object",
		default: {},
		style: [
			{
				selector: "{{QUBELY}}.qubely-section",
			},
		],
	},

	// Overlay
	enableRowOverlay: { type: "boolean", default: false },
	rowOverlay: {
		type: "object",
		default: {},
		style: [
			{
				condition: [{ key: "enableRowOverlay", relation: "==", value: true }],
				selector: "{{QUBELY}} >.qubely-row-overlay",
			},
		],
	},
	rowBlend: {
		type: "string",
		default: "",
		style: [{ selector: "{{QUBELY}} >.qubely-row-overlay { mix-blend-mode: {{rowBlend}}; }" }],
	},
	rowOpacity: {
		type: "number",
		default: ".8",
		style: [{ selector: "{{QUBELY}} >.qubely-row-overlay {opacity: {{rowOpacity}}; }" }],
	},

	// Divider
	shapeTop: {
		type: "object",
		default: {
			openShape: 0,
			color: "#006fbf",
			shapeType: "top",
			width: { unit: "%" },
			height: { unit: "px" },
		},
		style: [{ selector: "{{QUBELY}} .qubely-shape-divider.qubely-top-shape" }],
	},
	shapeBottom: {
		type: "object",
		default: {
			openShape: 0,
			color: "#006fbf",
			shapeType: "bottom",
			width: { unit: "%" },
			height: { unit: "px" },
		},
		style: [{ selector: "{{QUBELY}} .qubely-shape-divider.qubely-bottom-shape" }],
	},

	// Responsive
	hideDesktop: {
		type: "boolean",
		default: false,
		style: [{ selector: "{{QUBELY}}.qubely-section{ display:none; }" }],
	},
	hideTablet: {
		type: "boolean",
		default: false,
		style: [{ selector: "{{QUBELY}}.qubely-section{ display:none; }" }],
	},
	hideMobile: {
		type: "boolean",
		default: false,
		style: [{ selector: "{{QUBELY}}.qubely-section{ display:none; }" }],
	},

	// Advanced Settings
	rowId: { type: "string", default: "" },
	rowZindex: {
		type: "number",
		default: "",
		style: [{ selector: "{{QUBELY}}.qubely-section{z-index:{{rowZindex}};}" }],
	},
	rowReverse: {
		type: "object",
		default: { openRowReverse: false, values: {} },
		style: [
			{
				selector:
					"{{QUBELY}}.qubely-section >.qubely-container >.qubely-row,{{QUBELY}}.qubely-section >.qubely-container-fluid >.qubely-row, {{QUBELY}} >.qubely-container-fluid >.qubely-row > .block-editor-inner-blocks > .block-editor-block-list__layout, {{QUBELY}} >.qubely-container >.qubely-row > .block-editor-inner-blocks > .block-editor-block-list__layout",
			},
		],
	},

	rowCss: { type: "string", default: "", style: [{ selector: "" }] },
};

export default attributes;
