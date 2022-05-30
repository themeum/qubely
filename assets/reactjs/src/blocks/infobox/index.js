import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
import attributes from "./attributes";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("qubely/infobox", {
	title: __("Info Box", "qubely"),
	description: "Be creatively informative with Qubely Info Box.",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-info-box.svg"} alt={__("Info box Block")} />,
	category: "qubely",
	supports: {
		align: ["center", "wide", "full"],
	},
	keywords: [__("service", "qubely"), __("feature", "qubely"), __("info", "qubely")],
	example: {
		attributes: {},
	},
	attributes,
	edit: Edit,
	save: Save,
});
