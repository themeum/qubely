import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
import { attributes } from "./attributes";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("qubely/imagecomparison", {
	title: __("Image Comparison"),
	description: __("Compare Images with Qubely"),
	category: "qubely",
	icon: (
		<img src={qubely_admin.plugin + "assets/img/blocks/block-imagecomparison.svg"} alt={__("Image Comparison")} />
	),
	keywords: [__("image"), __("image comparison"), __("comparison")],
	supports: {
		align: ["center", "wide", "full"],
	},
	example: {
		attributes: {},
	},
	attributes,
	edit: Edit,
	save: Save,
});
