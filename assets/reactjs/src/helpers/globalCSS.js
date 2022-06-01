const PATH = "/qubely/v1/global_settings";
import { _device, _push } from "../components/CssHelper";
import { DEFAULTPRESETS, DEFAULTBREAKINGPOINTS } from "../plugins/global-settings/constants";
async function fetchFromApi() {
	return await wp.apiFetch({ path: PATH });
}

const generateVariables = (value, selector) => {
	let data = {},
		unit = "px";

	if (value.unit) {
		unit = value.unit;
	}
	if (value.md) {
		data.md = selector.replace(new RegExp("{{key}}", "g"), value.md + unit);
	}
	if (value.sm) {
		data.sm = selector.replace(new RegExp("{{key}}", "g"), value.sm + unit);
	}
	if (value.xs) {
		data.xs = selector.replace(new RegExp("{{key}}", "g"), value.xs + unit);
	}
	return data;
};

const _appendVariables = (val, data) => {
	if (val.md) {
		data.md.push(val.md);
	}
	if (val.sm) {
		data.sm.push(val.sm);
	}
	if (val.xs) {
		data.xs.push(val.xs);
	}
	return data;
};

const addTypo = (value, index) => {
	let responsive = "",
		nonResponsiveProps = "",
		data = {
			md: [],
			sm: [],
			xs: [],
		};

	/*
    if (value.size) {
        data = _appendVariables(generateVariables(value.size, `.typo-name.index-${index + 1}>*{font-size:{{key}} !important;}`), data);
    }
    if (value.height) {
        data = _appendVariables(generateVariables(value.height, `.typo-name.index-${index + 1}>*{line-height:{{key}} !important;}`), data)
    }
    */
	if (value.spacing) {
		data = _appendVariables(
			generateVariables(value.spacing, `.typo-name.index-${index + 1}>*{letter-spacing:{{key}} !important;}`),
			data
		);
	}

	if (data.md.length > 0) {
		responsive += data.md.join(" ");
	}
	if (data.sm.length > 0) {
		responsive += `@media (max-width: 1199px) {${data.sm.join("")}}`;
	}
	if (data.xs.length > 0) {
		responsive += `@media (max-width: 991px) {${data.xs.join("")}}`;
	}

	//non responsive values
	if (value.family) {
		if (
			!["Arial", "Tahoma", "Verdana", "Helvetica", "Times New Roman", "Trebuchet MS", "Georgia"].includes(
				value.family
			)
		) {
			nonResponsiveProps =
				"@import url('https://fonts.googleapis.com/css?family=" +
				value.family.replace(/\s/g, "+") +
				":" +
				(value.weight || 400) +
				"'); ";
		}
	}

	if (value.family) {
		nonResponsiveProps += `.typo-name.index-${index + 1}>*{ font-family:'${value.family}',${value.type};} `;
	}
	if (value.weight) {
		if (typeof value.weight === "string") {
			nonResponsiveProps += `.typo-name.index-${index + 1}>* {font-weight:${value.weight.slice(
				0,
				-1
			)};font-style:italic;} `;
		} else {
			nonResponsiveProps += `.typo-name.index-${index + 1}>* {font-weight:${value.weight};font-style:normal;} `;
		}
	}
	if (value.transform) {
		nonResponsiveProps += `.typo-name.index-${index + 1}>* {text-transform:${value.transform};} `;
	}

	let tempCSS = "";
	if (responsive.length > 10) {
		tempCSS += responsive;
	}
	if (nonResponsiveProps.length > 10) {
		tempCSS += " " + nonResponsiveProps;
	}
	return tempCSS;
};

export const setTypoTitleStyle = (typos) => {
	let __CSS = "";
	typos.forEach((typo, index) => {
		let tempCSS = addTypo(typo.value, index);
		__CSS += tempCSS;
	});
	injectGlobalCSS(__CSS, "qubely-global-panel");
};

const appendTypoVariable = (value, index, type) => {
	let responsive = "",
		nonResponsiveProps = "",
		data = {
			md: [],
			sm: [],
			xs: [],
		};

	if (value.size) {
		data = _appendVariables(generateVariables(value.size, `--qubely-typo${index + 1}-font-size:{{key}};`), data);
	}
	if (value.height) {
		data = _appendVariables(
			generateVariables(value.height, `--qubely-typo${index + 1}-line-height:{{key}};`),
			data
		);
	}
	if (value.spacing) {
		data = _appendVariables(
			generateVariables(value.spacing, `--qubely-typo${index + 1}-letter-spacing:{{key}};`),
			data
		);
	}

	if (data.md.length > 0) {
		responsive += ":root{" + data.md.join("") + "}";
	}
	if (data.sm.length > 0) {
		responsive += "@media (max-width: 1199px) {:root{" + data.sm.join("") + "}}";
	}
	if (data.xs.length > 0) {
		responsive += "@media (max-width: 991px) {:root{" + data.xs.join("") + "}}";
	}

	//non responsive values
	if (type !== "frontend" && value.family) {
		if (
			!["Arial", "Tahoma", "Verdana", "Helvetica", "Times New Roman", "Trebuchet MS", "Georgia"].includes(
				value.family
			)
		) {
			nonResponsiveProps =
				"@import url('https://fonts.googleapis.com/css?family=" +
				value.family.replace(/\s/g, "+") +
				":" +
				(value.weight || 400) +
				"');";
		}
	}
	nonResponsiveProps += ":root{";
	if (value.family) {
		nonResponsiveProps += `--qubely-typo${index + 1}-font-family:'${value.family}',${value.type};`;
	}
	if (value.weight) {
		if (typeof value.weight === "string") {
			nonResponsiveProps += `--qubely-typo${index + 1}-font-weight:${value.weight.slice(0, -1)};`;
			nonResponsiveProps += `--qubely-typo${index + 1}-font-style:italic;`;
		} else {
			nonResponsiveProps += `--qubely-typo${index + 1}-font-weight:${value.weight};`;
			nonResponsiveProps += `--qubely-typo${index + 1}-font-style:normal;`;
		}
	}
	if (value.transform) {
		nonResponsiveProps += `--qubely-typo${index + 1}-text-transform:${value.transform};`;
	}

	nonResponsiveProps += "}";
	let tempCSS = "";
	if (responsive.length > 10) {
		tempCSS += responsive;
	}
	if (nonResponsiveProps.length > 10) {
		tempCSS += " " + nonResponsiveProps;
	}
	return tempCSS;
};

export const setGlobalTypo_Variables = (globalTypoes, type) => {
	let CSS = "";

	globalTypoes.forEach((typo, index) => {
		let value = {};
		if (typo.value) {
			value = typo.value;
		}
		if (Object.keys(value).length >= 1) {
			CSS += appendTypoVariable(value, index, type);
		}
	});

	return CSS;
};
const setBreakingPoints = (breakingPoints) => {
	const { sm, md, lg, xl } = breakingPoints;

	let tempCSS = "";
	if (typeof sm !== "undefined") {
		tempCSS += `@media (min-width: 576px){.qubely-section .qubely-container{max-width: ${sm}px;}}`;
	}
	if (typeof md !== "undefined") {
		tempCSS += `@media (min-width: 768px){.qubely-section .qubely-container{max-width: ${md}px;}}`;
	}
	if (typeof lg !== "undefined") {
		tempCSS += `@media (min-width: 992px){.qubely-section .qubely-container{max-width: ${lg}px;}}`;
	}
	if (typeof xl !== "undefined") {
		tempCSS += `@media (min-width: 1200px){.qubely-section .qubely-container{max-width: ${xl}px;}}`;
	}
	return tempCSS;
};

export const injectGlobalCSS = (_CSS, id = "qubely-global-styles") => {
	let styleSelector = window.document;
	if (styleSelector.getElementById(id) === null) {
		let cssInline = document.createElement("style");
		cssInline.type = "text/css";
		cssInline.id = id;
		if (cssInline.styleSheet) {
			cssInline.styleSheet.cssText = _CSS;
		} else {
			cssInline.innerHTML = _CSS;
		}
		styleSelector.getElementsByTagName("head")[0].appendChild(cssInline);
	} else {
		styleSelector.getElementById(id).innerHTML = _CSS;
	}
};

export const updateGlobalVaribales = async (presetValues, breakingPoints = undefined) => {
	let global_CSS = "";
	const { colors, typography } = presetValues;

	const setGlobalCSS_Variables = (colors) => {
		let rootCSS = ":root {";
		colors.forEach((color, index) => (rootCSS += `--qubely-color-${index + 1}:${color};`));
		rootCSS += "}";
		return rootCSS;
	};
	global_CSS += setGlobalCSS_Variables(colors);
	global_CSS += setGlobalTypo_Variables(typography);

	if (typeof breakingPoints !== "undefined") {
		global_CSS += setBreakingPoints(breakingPoints);
	}
	injectGlobalCSS(global_CSS);
};

export const getGlobalSettings = (type) => {
	let global_CSS = "";
	let { presets, activePreset } = DEFAULTPRESETS;
	let breakingPoints = {
		...DEFAULTBREAKINGPOINTS,
		...(typeof qubely_container_width !== undefined && qubely_container_width),
	};
	return fetchFromApi().then((data) => {
		if (data.success) {
			if (typeof data.settings.presets !== "undefined") {
				presets = data.settings.presets;
			}
			if (typeof data.settings.activePreset !== "undefined") {
				activePreset = data.settings.activePreset;
			}
			globalData = presets[activePreset];

			let globalColors = ["#4A90E2", "#50E3C2", "#000", "#4A4A4A", "#9B9B9B"];
			if (typeof globalData !== "undefined" && globalData.colors && globalData.colors.length > 0) {
				globalColors = globalData.colors;
			}
			const setGlobalCSS_Variables = (globalColors) => {
				let rootCSS = ":root {";
				globalColors.forEach((color, index) => (rootCSS += `--qubely-color-${index + 1}:${color};`));
				rootCSS += "}";
				return rootCSS;
			};
			if (typeof data.settings.breakingPoints !== "undefined") {
				breakingPoints = {
					...breakingPoints,
					...data.settings.breakingPoints,
				};
			}

			global_CSS += setGlobalCSS_Variables(globalColors);
			global_CSS += setGlobalTypo_Variables(globalData.typography, type);
			global_CSS += setBreakingPoints(breakingPoints);
			return global_CSS;
		}
	});
};
