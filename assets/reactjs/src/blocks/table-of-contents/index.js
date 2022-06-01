import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
import attributes from "./attributes";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("qubely/table-of-contents", {
	title: __("Table of Contents"),
	description: "Organize page/post contents with Qubely Table of Contents",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-toc.svg"} alt={__("Table of Contents Block")} />,
	category: "qubely",
	supports: {},
	keywords: [__("Table of Contents"), __("Table"), __("Contents"), __("Qubely")],
	example: {},
	attributes,
	edit: Edit,
	save: Save,
});
