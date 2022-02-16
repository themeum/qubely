import "./style.scss";
import Edit from "./Edit";
import Save from "./Save";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	gloalSettings: { globalAttributes },
} = wp.qubelyComponents;

registerBlockType("qubely/accordion", {
	title: __("Accordion"),
	description: "Display creative collapsible texts with Qubely Accordion.",
	category: "qubely",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-accordion.svg"} alt={__("Accordion Block")} />,
	keywords: [__("accordion"), __("collapsible"), __("collapse")],
	supports: {
		html: false,
		className: false,
		align: ["center", "wide", "full"],
	},
	example: {
		attributes: {},
		innerBlocks: [
			{
				name: "qubely/accordion-item",
				innerBlocks: [
					{
						name: "qubely/heading",
						attributes: {
							content: "Qubely - A Full-fledged Gutenberg Builder",
							alignment: { md: "center" },
						},
					},
				],
			},
		],
	},
	attributes: {
		uniqueId: { type: "string", default: "" },
		defaultItems: { type: "number", default: 2 },
		itemToggle: { type: "boolean", default: true },
		...globalAttributes,
	},

	edit: Edit,
	save: Save,
});
