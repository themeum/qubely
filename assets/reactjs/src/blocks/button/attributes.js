const {
	gloalSettings: { globalAttributes },
} = wp.qubelyComponents;

const attributes = {
	uniqueId: {
		type: "string",
		default: "",
	},
	// Global
	...globalAttributes,
	buttonGroup: {
		type: "boolean",
		default: false,
	},
	recreateStyles: {
		type: "boolean",
		default: true,
	},
	disableFullWidth: {
		type: "boolean",
		default: false,
		style: [
			{
				condition: [{ key: "disableFullWidth", relation: "==", value: true }],
				selector: "{{QUBELY}}  {width:fit-content;}",
			},
		],
	},
	parentClientId: { type: "string", default: "" },
	spacer: {
		type: "object",
		default: {
			spaceTop: {
				md: "10",
				unit: "px",
			},
			spaceBottom: {
				md: "10",
				unit: "px",
			},
		},
		style: [{ selector: "{{QUBELY}}" }],
	},
	enableAlignment: { type: "boolean", default: true },
	customClassName: { type: "string", default: "" },
	spacer: {
		type: "object",
		default: { spaceTop: { md: "10", unit: "px" }, spaceBottom: { md: "10", unit: "px" } },
		style: [{ selector: "{{QUBELY}}" }],
	},
	textField: { type: "string", default: "" },
	buttonWidthType: {
		type: "string",
		default: "auto",
		style: [
			{
				condition: [{ key: "buttonWidthType", relation: "==", value: "block" }],
				selector:
					"{{QUBELY}} .qubely-block-btn-anchor {display: -webkit-box; display: -ms-flexbox; display: flex;}",
			},
		],
	},
	buttonWidth: {
		type: "object",
		default: {
			md: 260,
			unit: "px",
		},
		style: [
			{
				condition: [
					{ key: "buttonWidthType", relation: "==", value: "fixed" },
					{ key: "disableFullWidth", relation: "==", value: false },
				],
				selector: "{{QUBELY}} .qubely-block-btn-anchor {width: {{buttonWidth}};}",
			},
			{
				condition: [
					{ key: "buttonWidthType", relation: "==", value: "fixed" },
					{ key: "disableFullWidth", relation: "==", value: true },
				],
				selector: "{{QUBELY}}, {{QUBELY}} .qubely-block-btn-anchor {width: {{buttonWidth}};}",
			},
		],
	},
	alignment: {
		type: "object",
		default: { md: "center" },
		style: [
			{
				condition: [{ key: "enableAlignment", relation: "==", value: true }],
				selector: "{{QUBELY}} .qubely-block-btn-wrapper {text-align: {{alignment}};}",
			},
		],
	},
	fillType: { type: "string", default: "fill" },
	url: { type: "object", default: { url: "#" } },
	buttonSize: { type: "string", default: "large" },
	buttonPadding: {
		type: "object",
		default: {
			openPadding: 1,
			paddingType: "global",
			global: { md: 18 },
			unit: "px",
		},
		style: [
			{
				condition: [{ key: "buttonSize", relation: "==", value: "custom" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor",
			},
		],
	},
	typography: {
		type: "object",
		default: {},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-wrapper .qubely-block-btn .qubely-block-btn-anchor " }],
	},
	buttonColor: {
		type: "string",
		default: "#fff",
		style: [
			{
				condition: [{ key: "fillType", relation: "==", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor { color:{{buttonColor}}; }",
			},
		],
	},
	buttonColor2: {
		type: "string",
		default: "var(--qubely-color-1)",
		style: [
			{
				condition: [{ key: "fillType", relation: "!=", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor { color:{{buttonColor2}}; }",
			},
		],
	},
	buttonHoverColor: {
		type: "string",
		default: "#fff",
		style: [
			{
				condition: [{ key: "fillType", relation: "==", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor:hover { color:{{buttonHoverColor}}; }",
			},
		],
	},
	buttonHoverColor2: {
		type: "string",
		default: "#fff",
		style: [
			{
				condition: [{ key: "fillType", relation: "!=", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor:hover { color:{{buttonHoverColor2}}; }",
			},
		],
	},
	bgColor: {
		type: "object",
		default: {
			type: "color",
			openColor: 1,
			color: "var(--qubely-color-1)",
			gradient: {
				color1: "var(--qubely-color-2)",
				color2: "var(--qubely-color-1)",
				direction: 0,
				start: 0,
				stop: 100,
				type: "linear",
			},
		},
		style: [
			{
				condition: [{ key: "fillType", relation: "==", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor",
			},
		],
	},
	bgHoverColor: {
		type: "object",
		default: {
			type: "color",
			openColor: 1,
			color: "var(--qubely-color-2)",
			gradient: {
				color1: "#16d03e",
				color2: "#1f91f3",
				direction: 0,
				start: 0,
				stop: 100,
				type: "linear",
			},
		},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-anchor:before" }],
	},
	buttonBorder: {
		type: "object",
		default: {
			openBorder: 1,
			widthType: "global",
			global: { md: "1" },
			type: "solid",
			color: "var(--qubely-color-1)",
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-btn-anchor",
			},
		],
	},
	borderHoverColor: {
		type: "string",
		default: "var(--qubely-color-2)",
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-btn-anchor:hover {border-color: {{borderHoverColor}};}",
			},
		],
	},
	buttonBorderRadius: {
		type: "object",
		default: {
			openBorderRadius: 1,
			radiusType: "global",
			global: { md: 4 },
			unit: "px",
		},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-anchor" }],
	},
	buttonShadow: {
		type: "object",
		default: {},
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-btn-anchor",
			},
		],
	},
	buttonHoverShadow: {
		type: "object",
		default: {},
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-btn-anchor:hover",
			},
		],
	},
	iconName: { type: "string", default: "" },
	iconPosition: { type: "string", default: "right" },
	iconSize: {
		type: "object",
		default: {},
		style: [
			{
				condition: [{ key: "iconName", relation: "!=", value: "" }],
				selector: "{{QUBELY}} .qubely-btn-icon {font-size: {{iconSize}}}",
			},
		],
	},
	iconGap: {
		type: "object",
		default: { md: 8, unit: "px" },
		style: [
			{
				condition: [
					{ key: "iconName", relation: "!=", value: "" },
					{ key: "iconPosition", relation: "==", value: "left" },
				],
				selector: "{{QUBELY}} .qubely-btn-icon { margin-right: {{iconGap}}; }",
			},
			{
				condition: [
					{ key: "iconName", relation: "!=", value: "" },
					{ key: "iconPosition", relation: "==", value: "right" },
				],
				selector: "{{QUBELY}} .qubely-btn-icon { margin-left: {{iconGap}}; }",
			},
		],
	},
	sourceOfCopiedStyle: { type: "boolean", default: false },
};

export default attributes;
