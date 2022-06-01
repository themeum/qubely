import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
import { attributes } from "./attributes";

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType("qubely/animatedheadline", {
	title: __("Animated Headline"),
	description: "Grab the attention of your users with animating texts in headlines",
	category: "qubely",
	icon: (
		<img src={qubely_admin.plugin + "assets/img/blocks/block-animatedheadline.svg"} alt={__("Animated Headline")} />
	),
	keywords: [__("headline"), __("animated"), __("heading"), __("title")],
	example: {
		attributes: {},
	},
	attributes,
	edit: Edit,
	save: Save,
});
