import Save from "./Save";
import Edit from "./Edit";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("qubely/tab", {
	title: __("Tab"),
	category: "qubely",
	parent: ["qubely/tabs"],
	supports: {
		html: false,
		inserter: false,
		reusable: false,
	},
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-tabs.svg"} alt={__("Tabs Block")} />,
	attributes: {
		uniqueId: {
			type: "string",
			default: "",
		},
		id: {
			type: "number",
			default: 1,
		},
		customClassName: {
			type: "string",
			default: "",
		},
	},
	getEditWrapperProps(attributes) {
		return {
			"data-tab": attributes.id,
			className: `wp-block editor-block-list__block block-editor-block-list__block qubely-tab-content`,
		};
	},
	edit: Edit,
	save: Save,
});
