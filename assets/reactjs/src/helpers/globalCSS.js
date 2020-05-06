const PATH = '/qubely/v1/global_settings';

async function fetchFromApi() {
    return await wp.apiFetch({ path: PATH })
}

const generateVariables = (value, selector) => {
    let data = {}, unit = 'px';

    if (value.unit) {
        unit = value.unit;
    }
    if (value.md) {
        data.md = selector.replace(new RegExp('{{key}}', "g"), value.md + unit);
    }
    if (value.sm) {
        data.sm = selector.replace(new RegExp('{{key}}', "g"), value.sm + unit);
    }
    if (value.xs) {
        data.xs = selector.replace(new RegExp('{{key}}', "g"), value.xs + unit);
    }
    return data;
}

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
}

const appendTypoVariable = (value, index) => {
    let responsive = '',
        nonResponsiveProps = '',
        data = {
            md: [],
            sm: [],
            xs: []
        };

    if (value.size) {
        data = _appendVariables(generateVariables(value.size, `--qubely-typo${index + 1}-font-size:{{key}};`), data);
    }
    if (value.height) {
        data = _appendVariables(generateVariables(value.height, `--qubely-typo${index + 1}-line-height:{{key}} !important;`), data)
    }
    if (value.spacing) {
        data = _appendVariables(generateVariables(value.spacing, `--qubely-typo${index + 1}-letter-spacing:{{key}};`), data)
    }

    if (data.md.length > 0) {
        responsive += ':root{' + data.md.join('') + '}'
    }
    if (data.sm.length > 0) {
        responsive += '@media (max-width: 1199px) {:root{' + data.sm.join('') + '}}'
    }
    if (data.xs.length > 0) {
        responsive += '@media (max-width: 991px) {:root{' + data.xs.join('') + '}}'
    }

    //non responsive values
    if (value.family) {
        if (!['Arial', 'Tahoma', 'Verdana', 'Helvetica', 'Times New Roman', 'Trebuchet MS', 'Georgia'].includes(value.family)) {
            nonResponsiveProps = "@import url('https://fonts.googleapis.com/css?family=" + value.family.replace(/\s/g, '+') + ':' + (value.weight || 400) + "');";
        }
    }
    nonResponsiveProps += ':root{';
    if (value.family) {
        nonResponsiveProps += `--qubely-typo${index + 1}-font-family:'${value.family}',${value.type};`;
    }
    if (value.weight) {
        nonResponsiveProps += `--qubely-typo${index + 1}-font-weight:${value.weight};`;
    }
    if (value.transform) {
        nonResponsiveProps += `--qubely-typo${index + 1}-text-transform:${value.transform};`;
    }

    nonResponsiveProps += '}';
    let tempCSS = '';
    if (responsive.length > 10) {
        tempCSS += responsive;
    }
    if (nonResponsiveProps.length > 10) {
        tempCSS += ' ' + nonResponsiveProps;
    }
    return tempCSS;
}

export const setGlobalTypo_Variables = (globalTypoes) => {
    let CSS = '';

    globalTypoes.forEach((typo, index) => {
        let value = {};
        if (typo.value) {
            value = typo.value
        }
        if (Object.keys(value).length >= 1) {
            CSS += appendTypoVariable(value, index)
        }
    });

    return CSS;
}


export const injectGlobalCSS = (_CSS, append = false) => {
    let styleSelector = window.document;
    if (styleSelector.getElementById('qubely-global-styles') === null) {
        let cssInline = document.createElement('style');
        cssInline.type = 'text/css';
        cssInline.id = 'qubely-global-styles';
        if (cssInline.styleSheet) {
            cssInline.styleSheet.cssText = _CSS;
        } else {
            cssInline.innerHTML = _CSS;
        }
        styleSelector.getElementsByTagName("head")[0].appendChild(cssInline);
    } else {
        styleSelector.getElementById('qubely-global-styles').innerHTML = _CSS;
    }
}

export const updateGlobalVaribales = async (values) => {
    const {
        colors,
        typography
    } = values;

    let global_CSS = '';
    const setGlobalCSS_Variables = (colors) => {
        let rootCSS = ':root {'
        colors.forEach((color, index) => rootCSS += `--qubely-color-${index + 1}:${color};`);
        rootCSS += '}'
        return rootCSS;
    }

    global_CSS += setGlobalCSS_Variables(colors);
    global_CSS += setGlobalTypo_Variables(typography);

    injectGlobalCSS(global_CSS);
}

export const getGlobalSettings = () => {
    let global_CSS = '';
    return fetchFromApi().then(data => {
        if (data.success) {
            const {
                presets,
                activePreset
            } = data.settings;

            globalData = presets[activePreset];
            let globalColors = ['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B'];

            if (presets[activePreset].colors && presets[activePreset].colors.length > 0) {
                globalColors = presets[activePreset].colors;
            }

            const setGlobalCSS_Variables = (globalColors) => {
                let rootCSS = ':root {'
                globalColors.forEach((color, index) => rootCSS += `--qubely-color-${index + 1}:${color};`);
                rootCSS += '}'
                return rootCSS;
            }

            global_CSS += setGlobalCSS_Variables(globalColors);
            global_CSS += setGlobalTypo_Variables(presets[activePreset].typography);
            return global_CSS;
        }
    });
}