import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
import attributes from "./attributes";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("qubely/button", {
	title: __("Button"),
	description: __("Create stylish call-to-action buttons with Qubely Buttons."),
	category: "qubely",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-button.svg"} alt={__("Button Block")} />,
	supports: {
		align: ["full", "wide", "center"],
	},
	keywords: [__("link"), __("button")],
	example: {
		attributes: {},
	},
	attributes,
	//   getEditWrapperProps(attributes) {
	//     if (attributes.customClassName != "") {
	//       return {
	//         className: `wp-block block-editor-block-list__block ${attributes.customClassName}`,
	//       };
	//     }
	//   },
	edit: Edit,
	save: Save,
});
