import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
import attributes from "./attributes";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("qubely/advancedlist", {
	title: __("Advanced List"),
	description: __("Include stylish lists to display in your site with Qubely Advanced List."),
	category: "qubely",
	icon: (
		<img
			src={qubely_admin.plugin + "assets/img/blocks/block-advanced-list.svg"}
			alt={__("Advanced List")}
			className="qubely-block-icon small"
		/>
	),
	keywords: [
		__("Advanced", "qubely"),
		__("list", "qubely"),
		__("advanced list", "qubely"),
		__("Advanced List", "qubely"),
	],
	supports: {
		align: ["center", "wide", "full"],
	},
	example: {
		attributes: {
			background: "#fff",
		},
	},
	attributes,
	edit: Edit,
	save: Save,
});
