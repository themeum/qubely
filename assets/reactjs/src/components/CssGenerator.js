import {
    cssSize,
    cssBorderRadius,
    cssGradient,
    cssBorder,
    cssBoxShadow,
    cssTypography,
    cssDimension,
    cssBackground,
    cssShape,
    cssColor,
    cssSpacer,
    cssPadding,
    cssMargin,
    cssRowReverse,
    cssTransform
} from './CssHelper'

// Replace Value
const replaceData = (selector, key, value) => {
    return selector.replace(new RegExp(key, "g"), value)
}

// Object Empty Check
const isEmpty = (obj) => {
    return (typeof obj == 'object' && Object.keys(obj).length != 0) ? true : false
}

// {{QUBELY}} Replace
const replaceWarp = (selector, ID) => {
    return selector.replace(new RegExp('{{QUBELY}}', "g"), '.qubely-block-' + ID)
}

export const objectReplace = (warp, value) => {
    let output = ''
    value.forEach(sel => { output += sel + ';'; })
    return warp + '{' + output + '}';
}


export const objectAppend = (warp, value) => {
    let output = ''
    value.forEach(sel => { output += warp + sel; })
    return output
}

// Plain String/Number Field CSS Replace
export const singleField = (style, blockID, key, value) => {
    value = typeof value != 'object' ? value : objectField(value).data
    if (typeof style == 'string') {
        if (style) {
            if (value) {
                let warpData = replaceWarp(style, blockID)
                if (typeof value == 'boolean') {
                    return [warpData]
                } else {
                    if (warpData.indexOf('{{') == -1 && warpData.indexOf('{') < 0) {
                        return [warpData + value]
                    } else {
                        return [replaceData(warpData, '{{' + key + '}}', value)]
                    }
                }
            } else {
                return []
            }
        } else {
            return [replaceWarp(value, blockID)] // Custom CSS Field
        }
    } else {
        let output = []
        style.forEach(sel => {
            output.push(replaceData(replaceWarp(sel, blockID), '{{' + key + '}}', value))
        });
        return output;
    }
}


// Object Field CSS Replace
const objectField = (data) => {
    if (data.openTypography) {
        return { data: cssTypography(data), action: 'append' }; //Typography
    } else if (data.openBg) {
        return { data: cssBackground(data), action: 'append' }; //Background
    } else if (data.openBorder) {
        return { data: cssBorder(data), action: 'append' }; //Border
    } else if (data.openShadow && data.color) {
        return { data: cssBoxShadow(data), action: 'append' }; //Shadow
    } else if (data.direction) {
        return { data: cssGradient(data, 'return'), action: 'append' }; //Gradient
    } else if (typeof (data.top) != 'undefined' || typeof (data.left) != 'undefined' || typeof (data.right) != 'undefined' || typeof (data.bottom) != 'undefined') {
        return { data: cssDimension(data), action: 'replace' }; //Dimension
    } else if (data.openShape) {
        return { data: cssShape(data), action: 'append' }; //Shape
    } else if (data.openColor) {
        return { data: cssColor(data), action: 'append' }; //Color Advanced
    } else if (data.spaceTop || data.spaceBottom) {
        return { data: cssSpacer(data), action: 'append' }; //Spacer
    } else if (data.selectedSize) {
        return { data: cssSize(data), action: 'append' }; //Size
    } else if (data.openBorderRadius) {
        return { data: cssBorderRadius(data), action: 'append' }; //cssBorderRadius
    } else if (data.openPadding) {
        return { data: cssPadding(data), action: 'append' }; //padding
    } else if (data.openMargin) {
        return { data: cssMargin(data), action: 'append' }; //margin
    } else if (data.openRowReverse) {
        return { data: cssRowReverse(data), action: 'append' }; //column reverse
    } else if (data.openTransfrom) {
        return { data: cssTransform(data), action: 'append' }; //transform 
    } else {
        return { data: '', action: 'append' };
    }
}


const checkDepends = (settings, selectData, key, indexStyle) => {
    let _depends = true
    if (selectData.hasOwnProperty('condition')) {
        selectData.condition.forEach((data) => {
            let previous = _depends
            if (data.relation == '==') {
                if ((typeof data.value == 'string') || (typeof data.value == 'number') || (typeof data.value == 'boolean')) {
                    if (settings[data.key] == data.value) { _depends = true; }
                    else { _depends = false }
                } else {
                    let select = false
                    data.value.forEach(arrData => {
                        if (settings[data.key] == arrData) { select = true; }
                    })
                    if (select) { _depends = true; }
                }
            } else if (data.relation == '!=') {
                if ((typeof data.value == 'string') || (typeof data.value == 'number') || (typeof data.value == 'boolean')) {
                    if (settings[data.key] != data.value) { _depends = true; }
                    else { _depends = false; }
                } else {
                    let select = false
                    data.value.forEach(arrData => {
                        if (settings[data.key] != arrData) { select = true; }
                    })
                    if (select) { _depends = true; }
                }
            }
            if (previous == false) {
                _depends = false
            }
        })
    }

    return _depends;
}


export const CssGenerator = (settings, blockName, blockID, isInline = false) => {
    if (!blockID) return;
    let __CSS = '',
        md = [],
        sm = [],
        xs = [],
        notResponsiveCss = [];

    Object.keys(settings).forEach((key) => {
        const attributes = typeof blockName === 'string' ? wp.blocks.getBlockType('qubely/' + blockName).attributes : blockName
        if (attributes[key] && attributes[key].hasOwnProperty('style')) {

            attributes[key].style.forEach((selectData, indexStyle) => {
                let cssSelecor = selectData.selector
                if (checkDepends(settings, selectData, key, indexStyle)) {
                    if (typeof settings[key] == 'object') {
                        let device = false;
                        let dimension = '';

                        if (settings[key].md) { // Desktop
                            device = true
                            dimension = typeof settings[key].md == 'object' ? objectField(settings[key].md).data : settings[key].md + (settings[key].unit || '')
                            md = md.concat(singleField(cssSelecor, blockID, key, dimension))
                        }
                        if (settings[key].sm) { // Tablet
                            device = true
                            dimension = typeof settings[key].sm == 'object' ? objectField(settings[key].sm).data : settings[key].sm + (settings[key].unit || '')
                            sm = sm.concat(singleField(cssSelecor, blockID, key, dimension))
                        }
                        if (settings[key].xs) { // Phone
                            device = true
                            dimension = typeof settings[key].xs == 'object' ? objectField(settings[key].xs).data : settings[key].xs + (settings[key].unit || '')
                            xs = xs.concat(singleField(cssSelecor, blockID, key, dimension))
                        }

                        if (!device) { // Object Field Type Only
                            const objectCss = objectField(settings[key])
                            const repWarp = replaceWarp(cssSelecor, blockID)
                            if (typeof objectCss.data == 'object') {
                                if (Object.keys(objectCss.data).length != 0) {
                                    if (objectCss.data.background) { notResponsiveCss.push(repWarp + objectCss.data.background) }

                                    // Typography
                                    if (isEmpty(objectCss.data.md)) { md.push(objectReplace(repWarp, objectCss.data.md)) }
                                    if (isEmpty(objectCss.data.sm)) { sm.push(objectReplace(repWarp, objectCss.data.sm)) }
                                    if (isEmpty(objectCss.data.xs)) { xs.push(objectReplace(repWarp, objectCss.data.xs)) }
                                    if (objectCss.data.simple) { notResponsiveCss.push(repWarp + objectCss.data.simple) }
                                    if (objectCss.data.font) { md.unshift(objectCss.data.font) }

                                    if (objectCss.data.shape) {
                                        (objectCss.data.shape).forEach(function (el) { notResponsiveCss.push(repWarp + el) });
                                        if (isEmpty(objectCss.data.data.md)) { md.push(objectAppend(repWarp, objectCss.data.data.md)) }
                                        if (isEmpty(objectCss.data.data.sm)) { sm.push(objectAppend(repWarp, objectCss.data.data.sm)) }
                                        if (isEmpty(objectCss.data.data.xs)) { xs.push(objectAppend(repWarp, objectCss.data.data.xs)) }
                                    }
                                }
                            } else if (objectCss.data && (objectCss.data).indexOf('{{') == -1) {
                                if (objectCss.action == 'append') {
                                    notResponsiveCss.push(repWarp + objectCss.data)
                                } else {
                                    notResponsiveCss.push(singleField(cssSelecor, blockID, key, objectCss.data))
                                }
                            }
                        }
                    } else {
                        if (key == 'hideTablet') {
                            if (isInline) { sm = sm.concat(singleField(cssSelecor, blockID, key, settings[key])) }
                        } else if (key == 'hideMobile') {
                            if (isInline) { xs = xs.concat(singleField(cssSelecor, blockID, key, settings[key])) }
                        } else {
                            if (settings[key]) {
                                notResponsiveCss = notResponsiveCss.concat(singleField(cssSelecor, blockID, key, settings[key]))
                            }
                        }
                    }
                }
            });
        }
    })



    // Join CSS
    if (md.length > 0) { __CSS += md.join('') }
    if (sm.length > 0) { __CSS += '@media (max-width: 1199px) {' + sm.join('') + '}' }
    if (xs.length > 0) { __CSS += '@media (max-width: 991px) {' + xs.join('') + '}' }
    if (notResponsiveCss.length > 0) { __CSS += notResponsiveCss.join('') }

    if (isInline) {
        return __CSS
    }

    // Set CSS
    setStyle(__CSS, blockID)
}


// Set CSS to Head
const setStyle = (styleCss, blockID) => {
    let styleSelector = window.document;
    if (styleSelector.getElementById('qubely-block-' + blockID) === null) {
        let cssInline = document.createElement('style');
        cssInline.type = 'text/css';
        cssInline.id = 'qubely-block-' + blockID;
        if (cssInline.styleSheet) {
            cssInline.styleSheet.cssText = styleCss;
        } else {
            cssInline.innerHTML = styleCss;
        }
        styleSelector.getElementsByTagName("head")[0].appendChild(cssInline);
    } else {
        styleSelector.getElementById('qubely-block-' + blockID).innerHTML = styleCss;
    }
}