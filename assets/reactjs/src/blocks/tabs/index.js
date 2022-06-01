import "./style.scss";
import Save from "./Save";
import Edit from "./Edit";
import attributes from "./attributes";
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("qubely/tabs", {
	title: __("Tabs"),
	category: "qubely",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-tabs.svg"} alt={__("Tabs Block")} />,
	description: __("Showcase features in beautiful pre-designed tabs with Qubely Tabs."),
	supports: {
		html: false,
		className: false,
		align: ["full", "wide", "center"],
	},
	example: {
		attributes: {
			tabTitles: [{ title: "Tab 1" }, { title: "Tab 2" }, { title: "Tab 3" }],
		},
		innerBlocks: [
			{
				name: "qubely/tab",
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
	attributes,
	edit: Edit,
	save: Save,
});
