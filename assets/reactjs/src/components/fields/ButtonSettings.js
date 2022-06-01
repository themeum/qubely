/* eslint-disable react/react-in-jsx-scope */

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody } = wp.components;

import Alignment from "./Alignment";
import Border from "./Border";
import BorderRadius from "./BorderRadius";
import BoxShadow from "./BoxShadow";
import Color from "./Color";
import IconList from "./IconList";
import Styles from "./Styles";
import Typography from "./Typography";
import Url from "./Url";
import Tabs from "./Tabs";
import Tab from "./Tab";
import InnerPanel from "./InnerPanel";
import Select from "./Select";
import Range from "./Range";
import Toggle from "./Toggle";
import ColorAdvanced from "./ColorAdvanced";
import RadioAdvanced from "./RadioAdvanced";
import Padding from "./Padding";

import icons from "../../helpers/icons";

//attributes

export const buttonAttributes = {
	buttonText: { type: "string", default: "" },
	buttonFillType: { type: "string", default: "fill" },
	buttonTag: { type: "string", default: "a" },
	buttonUrl: { type: "object", default: { url: "#" } },
	buttonSize: { type: "string", default: "medium" },
	recreateStyles: {
		type: "boolean",
		default: true,
	},
	buttonAlignment: {
		type: "object",
		default: { md: "left" },
		style: [
			{
				condition: [{ key: "enableButtonAlignment", relation: "==", value: true }],
				selector: "{{QUBELY}} .qubely-block-btn-wrapper {text-align: {{buttonAlignment}};}",
			},
		],
	},
	buttonWidthType: {
		type: "string",
		default: "auto",
		style: [
			{
				condition: [{ key: "buttonWidthType", relation: "==", value: "block" }],
				selector:
					"{{QUBELY}} .qubely-block-btn-anchor {width:100% !important; display: -webkit-box; display: -ms-flexbox; display: flex;}",
			},
			{
				condition: [{ key: "buttonWidthType", relation: "==", value: "auto" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor {width:auto !important}",
			},
			{
				condition: [{ key: "buttonWidthType", relation: "==", value: "fixed" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor {display:inline-flex}",
			},
		],
	},
	buttonWidth: {
		type: "object",
		default: {
			md: 260,
			unit: "px",
		},
		style: [
			{
				condition: [{ key: "buttonWidthType", relation: "==", value: "fixed" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor {width: {{buttonWidth}};}",
			},
		],
	},
	buttonPadding: {
		type: "object",
		default: {
			openPadding: 1,
			paddingType: "global",
			global: { md: 18 },
			custom: { md: "10 10 10 10" },
			unit: "px",
		},
		style: [
			{
				condition: [{ key: "buttonSize", relation: "==", value: "custom" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor",
			},
		],
	},
	buttonTypography: {
		type: "object",
		default: {},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-anchor" }],
	},
	buttonColor: {
		type: "string",
		default: "#000",
		style: [
			{
				condition: [{ key: "buttonFillType", relation: "==", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor { color:{{buttonColor}}; }",
			},
		],
	},
	buttonColor2: {
		type: "string",
		default: "var(--qubely-color-1)",
		style: [
			{
				condition: [{ key: "buttonFillType", relation: "!=", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor { color:{{buttonColor2}}; }",
			},
		],
	},
	buttonHoverColor: {
		type: "string",
		default: "#fff",
		style: [
			{
				condition: [{ key: "buttonFillType", relation: "==", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor:hover { color:{{buttonHoverColor}}; }",
			},
		],
	},
	buttonHoverColor2: {
		type: "string",
		default: "var(--qubely-color-2)",
		style: [
			{
				condition: [{ key: "buttonFillType", relation: "!=", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor:hover { color:{{buttonHoverColor2}}; }",
			},
		],
	},
	buttonBgColor: {
		type: "object",
		default: {
			type: "color",
			openColor: 1,
			color: "var(--qubely-color-1)",
			gradient: {
				color1: "var(--qubely-color-2)",
				color2: "var(--qubely-color-1)",
				type: "linear",
				direction: 0,
				start: 0,
				stop: 100,
			},
		},
		style: [
			{
				condition: [{ key: "buttonFillType", relation: "==", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor",
			},
		],
	},
	buttonBgHoverColor: {
		type: "object",
		default: {
			type: "color",
			openColor: 1,
			color: "var(--qubely-color-2)",
			gradient: {
				color1: "var(--qubely-color-1)",
				color2: "var(--qubely-color-2)",
				type: "linear",
				direction: 0,
				start: 0,
				stop: 100,
			},
		},
		style: [
			{
				condition: [{ key: "buttonFillType", relation: "==", value: "fill" }],
				selector: "{{QUBELY}} .qubely-block-btn-anchor:before",
			},
		],
	},

	buttonBorder: {
		type: "object",
		default: {
			openBorder: 1,
			widthType: "global",
			global: 1,
			color: "var(--qubely-color-1)",
			type: "solid",
			unit: "px",
		},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-anchor" }],
	},

	buttonBorderHoverColor: {
		type: "string",
		default: "var(--qubely-color-2)",
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-btn-anchor:hover {border-color: {{buttonBorderHoverColor}};}",
			},
		],
	},

	buttonBorderRadius: {
		type: "object",
		default: {
			openBorderRadius: 1,
			radiusType: "global",
			global: {
				md: 4,
			},
			unit: "px",
		},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-anchor" }],
	},
	buttonShadow: {
		type: "object",
		default: {},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-anchor" }],
	},
	buttonHoverShadow: {
		type: "object",
		default: {},
		style: [{ selector: "{{QUBELY}} .qubely-block-btn-anchor:hover" }],
	},
	buttonIconName: { type: "string", default: "" },
	buttonIconPosition: { type: "string", default: "right" },
	buttonIconSize: {
		type: "object",
		default: {},
		style: [
			{
				condition: [{ key: "buttonIconName", relation: "!=", value: "" }],
				selector: "{{QUBELY}} .qubely-btn-icon {font-size: {{buttonIconSize}}}",
			},
		],
	},
	buttonIconGap: {
		type: "object",
		default: { md: 8, unit: "px" },
		style: [
			{
				condition: [
					{ key: "buttonIconName", relation: "!=", value: "" },
					{ key: "buttonIconPosition", relation: "==", value: "left" },
				],
				selector: "{{QUBELY}} .qubely-btn-icon { margin-right: {{buttonIconGap}}; }",
			},
			{
				condition: [
					{ key: "buttonIconName", relation: "!=", value: "" },
					{ key: "buttonIconPosition", relation: "==", value: "right" },
				],
				selector: "{{QUBELY}} .qubely-btn-icon { margin-left: {{buttonIconGap}}; }",
			},
		],
	},
	buttonGap: {
		type: "object",
		default: { md: 8, unit: "px" },
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-btn-wrapper { margin-bottom: {{buttonGap}}; }",
			},
		],
	},
};

export function buttonSettings(
	attributes,
	device,
	setAttributes,
	updateParentState,
	showPostTextTypography,
	initialOpen = false
) {
	const {
		controlledButtonPanel,
		showButtonPanel,
		enableButton,
		recreateStyles,
		buttonToggleOption,
		enablePostButtonText,
		postButtonTextTypography,
		postButtonTextColor,
		postButtonTextHoverColor,
		postButtonTextPaddingBottom,
		postButtonTextPaddingTop,
		enableButtonAlignment,
		buttonAlignment,
		buttonGap,
		buttonWidthType,
		buttonWidth,
		buttonTag,
		buttonFillType,
		buttonSize,
		buttonTypography,
		buttonPadding,
		buttonUrl,
		buttonBorderRadius,
		buttonIconName,
		buttonIconPosition,
		buttonIconSize,
		buttonIconGap,
		buttonBorder,
		buttonBorderHoverColor,
		buttonColor,
		buttonColor2,
		buttonHoverColor,
		buttonHoverColor2,
		buttonBgColor,
		buttonBgHoverColor,
		buttonShadow,
		buttonHoverShadow,
	} = attributes;

	const renderButtonControls = () => {
		return (
			<Fragment>
				<Styles
					value={buttonFillType}
					onChange={(value) => setAttributes("buttonFillType", value)}
					options={[
						{ value: "fill", svg: icons.btn_fill, label: __("Fill") },
						{ value: "outline", svg: icons.btn_outline, label: __("Outline") },
					]}
				/>
				{buttonTag == "a" && (
					<Url label={__("URL")} value={buttonUrl} onChange={(value) => setAttributes("buttonUrl", value)} />
				)}
				{enableButtonAlignment && (
					<Alignment
						label={__("Alignment")}
						value={buttonAlignment}
						onChange={(val) => setAttributes("buttonAlignment", val)}
						disableJustify
						responsive
						device={device}
						onDeviceChange={(value) => updateParentState("device", value)}
					/>
				)}

				<InnerPanel title={__("Size")}>
					<RadioAdvanced
						label={__("Button Size")}
						options={[
							{ label: "S", value: "small", title: "Small" },
							{ label: "M", value: "medium", title: "Medium" },
							{ label: "L", value: "large", title: "Large" },
							{ icon: "fas fa-cog", value: "custom", title: "Custom" },
						]}
						value={buttonSize}
						onChange={(value) => setAttributes("buttonSize", value)}
					/>
					{buttonSize == "custom" && (
						<Padding
							label={__("Padding")}
							value={buttonPadding}
							unit={["px", "em", "%"]}
							max={150}
							min={0}
							responsive
							device={device}
							onChange={(value) => setAttributes("buttonPadding", value)}
							onDeviceChange={(value) => updateParentState("device", value)}
						/>
					)}
					<RadioAdvanced
						label={__("Button Width")}
						options={[
							{ label: __("Auto"), value: "auto", title: __("Auto") },
							{ label: __("Full"), value: "block", title: __("Full") },
							{ label: __("Fixed"), value: "fixed", title: __("Fixed") },
						]}
						value={buttonWidthType}
						onChange={(value) => setAttributes("buttonWidthType", value)}
					/>
					{buttonWidthType == "fixed" && (
						<Range
							label={__("Fixed Width")}
							value={buttonWidth}
							onChange={(value) => setAttributes("buttonWidth", value)}
							unit={["px", "em", "%"]}
							min={30}
							max={800}
							responsive
							device={device}
							onDeviceChange={(value) => updateParentState("device", value)}
						/>
					)}
				</InnerPanel>

				<InnerPanel title={__("Design")} initialOpen={false}>
					<Tabs>
						<Tab tabTitle={__("Normal")}>
							<Color
								label={__("Text Color")}
								value={buttonFillType == "fill" ? buttonColor : buttonColor2}
								onChange={(value) =>
									buttonFillType == "fill"
										? setAttributes("buttonColor", value)
										: setAttributes("buttonColor2", value)
								}
							/>
							{buttonFillType == "fill" && (
								<ColorAdvanced
									label={__("Background")}
									value={buttonBgColor}
									onChange={(value) => setAttributes("buttonBgColor", value)}
								/>
							)}
							<Border
								label={__("Border")}
								separator
								value={buttonBorder}
								min={0}
								max={10}
								onChange={(val) => setAttributes("buttonBorder", val)}
							/>
							<BoxShadow
								label={__("Box-Shadow")}
								value={buttonShadow}
								onChange={(value) => setAttributes("buttonShadow", value)}
							/>
						</Tab>
						<Tab tabTitle={__("Hover")}>
							<Color
								label={__("Text Color")}
								value={buttonFillType == "fill" ? buttonHoverColor : buttonHoverColor2}
								onChange={(value) =>
									buttonFillType == "fill"
										? setAttributes("buttonHoverColor", value)
										: setAttributes("buttonHoverColor2", value)
								}
							/>
							{buttonFillType == "fill" && (
								<ColorAdvanced
									label={__("Background")}
									value={buttonBgHoverColor}
									onChange={(value) => setAttributes("buttonBgHoverColor", value)}
								/>
							)}
							<Color
								label={__("Border Color")}
								value={buttonBorderHoverColor}
								onChange={(value) => setAttributes("buttonBorderHoverColor", value)}
							/>
							<BoxShadow
								label={__("Box-Shadow")}
								value={buttonHoverShadow}
								onChange={(value) => setAttributes("buttonHoverShadow", value)}
							/>
						</Tab>
					</Tabs>

					<BorderRadius
						label={__("Radius")}
						value={buttonBorderRadius}
						onChange={(value) => setAttributes("buttonBorderRadius", value)}
						min={0}
						max={100}
						unit={["px", "em", "%"]}
						responsive
						device={device}
						onDeviceChange={(value) => updateParentState("device", value)}
					/>
					<Range
						label={__("Gap")}
						value={buttonGap}
						min={0}
						max={100}
						responsive
						unit={["px", "em", "%"]}
						onChange={(value) => setAttributes("buttonGap", value)}
						device={device}
						onDeviceChange={(value) => updateParentState("device", value)}
					/>
				</InnerPanel>

				<InnerPanel title={__("Icon")} initialOpen={false}>
					<IconList
						label={__("Icon")}
						value={buttonIconName}
						onChange={(value) => setAttributes("buttonIconName", value)}
					/>
					{buttonIconName && (
						<Fragment>
							<Select
								label={__("Position")}
								options={["left", "right"]}
								value={buttonIconPosition}
								onChange={(value) => setAttributes("buttonIconPosition", value)}
							/>
							<Range
								label={__("Size")}
								value={buttonIconSize}
								onChange={(value) => setAttributes("buttonIconSize", value)}
								unit={["px", "em", "%"]}
								min={5}
								max={48}
								responsive
								device={device}
								onDeviceChange={(value) => updateParentState("device", value)}
							/>
							<Range
								label={__("Gap")}
								value={buttonIconGap}
								onChange={(val) => setAttributes("buttonIconGap", val)}
								unit={["px", "em", "%"]}
								min={0}
								max={64}
								responsive
								device={device}
								onDeviceChange={(value) => updateParentState("device", value)}
							/>
						</Fragment>
					)}
				</InnerPanel>

				<InnerPanel title={__("Typography")} initialOpen={false}>
					<Typography
						value={buttonTypography}
						onChange={(value) => setAttributes("buttonTypography", value)}
						disableLineHeight
						device={device}
						onDeviceChange={(value) => updateParentState("device", value)}
					/>
				</InnerPanel>
			</Fragment>
		);
	};
	return (
		<Fragment>
			{controlledButtonPanel ? (
				<PanelBody
					title={__("Button")}
					opened={showButtonPanel}
					onToggle={() => setAttributes("showButtonPanel", !showButtonPanel)}
				>
					{buttonToggleOption && (
						<Toggle
							label={__("Enable Button")}
							value={enableButton}
							onChange={(val) => setAttributes("enableButton", val)}
						/>
					)}
					{enableButton && renderButtonControls()}
				</PanelBody>
			) : (
				<PanelBody title={__("Button")} initialOpen={initialOpen}>
					{buttonToggleOption && (
						<Toggle
							label={__("Enable Button")}
							value={enableButton}
							onChange={(val) => setAttributes("enableButton", val)}
						/>
					)}
					{enableButton && renderButtonControls()}
				</PanelBody>
			)}

			{typeof enablePostButtonText != "undefined" && (
				<PanelBody title={__("Post Button Text")} initialOpen={false}>
					<Toggle
						value={enablePostButtonText}
						label={__("Show PostButtonText")}
						onChange={(val) => setAttributes("enablePostButtonText", val)}
					/>
					{enablePostButtonText && (
						<Fragment>
							<Tabs>
								<Tab tabTitle={__("Normal")}>
									<Color
										label={__("Color")}
										value={postButtonTextColor}
										onChange={(val) => setAttributes("postButtonTextColor", val)}
									/>
								</Tab>
								<Tab tabTitle={__("Hover")}>
									<Color
										label={__("Color")}
										value={postButtonTextHoverColor}
										onChange={(val) => setAttributes("postButtonTextHoverColor", val)}
									/>
								</Tab>
							</Tabs>
							<Toggle
								value={showPostTextTypography}
								label={__("Typography")}
								onChange={(val) => updateParentState("showPostTextTypography", val)}
							/>
							{showPostTextTypography && (
								<Typography
									value={postButtonTextTypography}
									onChange={(val) => setAttributes("postButtonTextTypography", val)}
									device={device}
									onDeviceChange={(value) => updateParentState("device", value)}
								/>
							)}
							<Range
								min={-50}
								max={200}
								responsive
								value={postButtonTextPaddingTop}
								unit={["px", "em", "%"]}
								label={"Top"}
								onChange={(val) => setAttributes("postButtonTextPaddingTop", val)}
								device={device}
								onDeviceChange={(value) => updateParentState("device", value)}
							/>
							<Range
								min={-50}
								max={200}
								responsive
								value={postButtonTextPaddingBottom}
								unit={["px", "em", "%"]}
								label={"Bottom"}
								onChange={(val) => setAttributes("postButtonTextPaddingBottom", val)}
								device={device}
								onDeviceChange={(value) => updateParentState("device", value)}
							/>
						</Fragment>
					)}
				</PanelBody>
			)}
		</Fragment>
	);
}
