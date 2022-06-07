const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import Edit from "./Edit";
import Save from "./Save";
const {
	gloalSettings: { globalAttributes },
} = wp.qubelyComponents;

registerBlockType("qubely/column", {
	title: __("Column"),
	description: "Add flexibly resizable and customizable columns in your site.",
	category: "qubely",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-column.svg"} alt={__("Column Block")} />,
	parent: ["qubely/row"],
	supports: { inserter: false, reusable: false, html: false },
	attributes: {
		uniqueId: { type: "string", default: "" },
		...globalAttributes, // Global Settings
		// Dimension
		colWidth: {
			type: "object",
			default: { md: 50, sm: 50, xs: 100, unit: "%", device: "md" },
			style: [
				{
					selector:
						"{{QUBELY}}.qubely-column-front {flex:{{colWidth}};} {{QUBELY}}.qubely-column-front {max-width:{{colWidth}};}",
				},
			],
		},
		padding: {
			type: "object",
			default: {
				md: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				},
				unit: "px",
			},
			style: [{ selector: "{{QUBELY}} > .qubely-column-inner {padding: {{padding}};}" }],
		},

		margin: {
			type: "object",
			default: {
				md: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				},
				unit: "px",
			},
			style: [{ selector: "{{QUBELY}} > .qubely-column-inner {margin: {{margin}};}" }],
		},

		// Style
		colBg: { type: "object", default: {}, style: [{ selector: "{{QUBELY}} > .qubely-column-inner" }] },
		colBorder: { type: "object", default: {}, style: [{ selector: "{{QUBELY}} > .qubely-column-inner" }] },
		colShadow: { type: "object", default: {}, style: [{ selector: "{{QUBELY}} > .qubely-column-inner" }] },

		borderRadius: { type: "object", default: {}, style: [{ selector: "{{QUBELY}} > .qubely-column-inner" }] },

		// Responsive
		hideDesktop: { type: "boolean", default: false, style: [{ selector: "{{QUBELY}}{display:none;}" }] },
		hideTablet: { type: "boolean", default: false, style: [{ selector: "{{QUBELY}}{display:none;}" }] },
		hideMobile: { type: "boolean", default: false, style: [{ selector: "{{QUBELY}}{display:none;}" }] },

		// Advanced Settings
		colZindex: {
			type: "number",
			default: "",
			style: [{ selector: "{{QUBELY}} > .qubely-column-inner{z-index:{{colZindex}};}" }],
		},
		colCss: { type: "string", default: "", style: [{ selector: "" }] },
	},
	edit: Edit,
	save: Save,
});
