const { __ } = wp.i18n;
const {
	gloalSettings: { globalAttributes },
} = wp.qubelyComponents;

const attributes = {
	uniqueId: {
		type: "string",
		default: "",
	},
	showTitle: {
		type: "boolean",
		default: true,
	},
	allowedAnchors: {
		type: "object",
		default: {
			h1: true,
			h2: true,
			h3: true,
			h4: true,
			h5: true,
			h6: true,
		},
	},
	scrollToTop: {
		type: "boolean",
		default: true,
	},
	title: {
		type: "string",
		default: "Table of Contents",
	},
	align: {
		type: "string",
		default: "left",
	},
	tableType: {
		type: "string",
		default: "ordered",
	},
	minimizeBox: { type: "boolean", default: false },

	headerBg: {
		type: "string",
		default: "#F7FCFF",
		style: [{ selector: "{{QUBELY}} .qubely-table-of-contents-header { background-color: {{headerBg}} }" }],
	},

	headerColor: {
		type: "string",
		default: "#222222",
		style: [{ selector: "{{QUBELY}} .qubely-table-of-contents-header { color: {{headerColor}} }" }],
	},

	collapsibleButtonColor: {
		type: "string",
		default: "#222222",
		style: [{ selector: "{{QUBELY}} .qubely-table-of-contents-header a { color: {{collapsibleButtonColor}} }" }],
	},

	bodyColor: {
		type: "string",
		default: "#222222",
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-table-of-contents-body, {{QUBELY}} .qubely-table-of-contents-body a { color: {{bodyColor}} }",
			},
		],
	},

	headingSize: {
		type: "object",
		default: {
			md: 22,
			unit: "px",
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-table-of-contents-header{font-size: {{headingSize}}}",
			},
		],
	},

	bodyLineHeight: {
		type: "object",
		default: {
			md: 2,
			unit: "em",
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-table-of-contents-body{line-height: {{bodyLineHeight}}}",
			},
		],
	},

	bodyFontSize: {
		type: "object",
		default: {
			md: 18,
			unit: "px",
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-table-of-contents-body{font-size: {{bodyFontSize}}}",
			},
		],
	},
	headerPaddingX: {
		type: "object",
		default: {
			md: 20,
			unit: "px",
		},
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-table-of-contents-header{padding-left: {{headerPaddingX}}; padding-right: {{headerPaddingX}}}",
			},
		],
	},
	headerPaddingY: {
		type: "object",
		default: {
			md: 15,
			unit: "px",
		},
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-table-of-contents-header{padding-top: {{headerPaddingY}}; padding-bottom: {{headerPaddingY}}}",
			},
		],
	},
	enableHeaderBorder: { type: "boolean", default: true },
	headerBorderWidth: {
		type: "object",
		default: {
			md: 1,
			unit: "px",
		},
		style: [
			{
				condition: [
					{
						key: "enableHeaderBorder",
						relation: "==",
						value: true,
					},
				],
				selector: "{{QUBELY}} .qubely-table-of-contents-header{ border-bottom: {{headerBorderWidth}} solid}",
			},
		],
	},
	headerBorderColor: {
		type: "string",
		default: "#EFEFEF",
		style: [
			{
				condition: [
					{
						key: "enableHeaderBorder",
						relation: "==",
						value: true,
					},
				],
				selector: "{{QUBELY}} .qubely-table-of-contents-header{ border-bottom-color: {{headerBorderColor}}}",
			},
		],
	},
	bodyBg: {
		type: "object",
		default: {
			openColor: 1,
			type: "color",
			color: "#ffffff",
		},
		style: [{ selector: "{{QUBELY}} .qubely-table-of-contents" }],
	},
	bodyPaddingX: {
		type: "object",
		default: {
			md: 20,
			unit: "px",
		},
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-table-of-contents-body{padding-left: {{bodyPaddingX}}; padding-right: {{bodyPaddingX}}}",
			},
		],
	},
	bodyPaddingY: {
		type: "object",
		default: {
			md: 10,
			unit: "px",
		},
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-table-of-contents-body{padding-top: {{bodyPaddingY}}; padding-bottom: {{bodyPaddingY}}}",
			},
		],
	},
	bodyBorder: {
		type: "object",
		default: {
			borderType: "global",
			widthType: "global",
			openBorder: 1,
			type: "solid",
			unit: "px",
			color: "#EFEFEF",
			global: {
				md: 1,
			},
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-table-of-contents",
			},
		],
	},
	bodyShadow: {
		type: "object",
		default: {
			openShadow: 1,
			inset: "",
			horizontal: 0,
			vertical: 32,
			blur: 54,
			spread: -20,
			color: "rgba(0, 0, 0, .2)",
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-table-of-contents",
			},
		],
	},
	bodyBorderRadius: {
		type: "object",
		default: {
			radiusType: "global",
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-table-of-contents",
			},
		],
	},
	headerLinks: {
		type: "string",
		default: "",
	},

	collapsibleAlignment: {
		type: "string",
		default: "qubely-justify-between",
	},

	collapsibleType: {
		type: "string",
		default: "text",
	},

	collapsibleOpen: {
		type: "string",
		default: __("[Show]"),
	},

	collapsibleClose: {
		type: "string",
		default: __("[Hide]"),
	},

	collapsibleIcon: {
		type: "string",
		default: "angle",
	},

	isCollapsed: {
		type: "boolean",
		default: false,
	},

	smoothScroll: {
		type: "boolean",
		default: true,
	},

	scrollOffset: {
		type: "number",
		default: 20,
	},

	backToTopIcon: {
		type: "string",
		default: "fas fa-angle-up",
	},

	btiPosition: {
		type: "string",
		default: "right",
		style: [
			{
				condition: [
					{
						key: "btiPosition",
						relation: "==",
						value: "right",
					},
				],
				selector: "{{QUBELY}} .qubely-back-to-top-button {left: auto; right: 30px}",
			},
			{
				condition: [
					{
						key: "btiPosition",
						relation: "==",
						value: "left",
					},
				],
				selector: "{{QUBELY}} .qubely-back-to-top-button {right: auto; left: 30px}",
			},
		],
	},

	btiOffset: {
		type: "number",
		default: 30,
		style: [
			{
				selector: "{{QUBELY}} .qubely-back-to-top-button{bottom: {{btiOffset}}px}",
			},
		],
	},

	btiColor: {
		type: "string",
		default: "#ffffff",
		style: [
			{
				selector: "{{QUBELY}} .qubely-back-to-top-button{color: {{btiColor}}}",
			},
		],
	},

	btiBg: {
		type: "string",
		default: "#222222",
		style: [
			{
				selector: "{{QUBELY}} .qubely-back-to-top-button{background: {{btiBg}}}",
			},
		],
	},
	btiRadius: {
		type: "number",
		default: 4,
		style: [
			{
				selector: "{{QUBELY}} .qubely-back-to-top-button{border-radius: {{btiRadius}}px}",
			},
		],
	},
	indent: {
		type: "object",
		default: {
			md: 35,
			unit: "px",
		},
		style: [
			{
				selector: "{{QUBELY}} .ordered-list ol, " + "{{QUBELY}} .unordered-list ul{margin-left: {{indent}}}",
			},
		],
	},
	btiSize: {
		type: "number",
		default: 35,
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-back-to-top-button{height: {{btiSize}}px; width: {{btiSize}}px; line-height: {{btiSize}}px}",
			},
		],
	},

	// Global
	...globalAttributes,
};
export default attributes;
