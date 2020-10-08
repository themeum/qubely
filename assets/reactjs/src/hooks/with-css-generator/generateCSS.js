import {
    cssSize,
    cssBorderRadius,
    cssGradient,
    cssBorder,
    tableBorder,
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
} from './cssHelpers';

// Replace Value
const replaceData = (selector, key, value) => {
    return selector.replace(new RegExp(key, "g"), value)
}

// Object Empty Check
const isEmpty = (obj) => {
    return (typeof obj == 'object' && Object.keys(obj).length != 0) ? true : false
}

export const objectReplace = (warp, value) => {
    let output = ''
    value.forEach(sel => { output += sel + ';'; })
    return warp + '{' + output + '}';
}


export const objectAppend = (warp, value) => {
    let output = '';
    value.forEach(sel => { output += warp + sel; })
    return output;
}

// Plain String/Number Field CSS Replace
export const singleField = (style, key, value) => {
    value = typeof value != 'object' ? value : objectField(value).data
    if (typeof style == 'string') {
        if (style) {
            if (value) {
                let warpData = style
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
            return [value] // Custom CSS Field
        }
    } else {
        let output = [];

        if (style) {
            style.forEach(sel => {
                output.push(replaceData(sel, '{{' + key + '}}', value));
            });
        }
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
    } else if (data.tableBorder) {
        return { data: tableBorder(data), action: 'append' }; //Table Border
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


const checkDepends = (settings, selectData, key) => {
    let _depends = true
    if (selectData.hasOwnProperty('condition')) {
        selectData.condition.forEach((data) => {
            let previous = _depends
            if ((data.relation == '==') || (data.relation == '===')) {
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
            } else if ((data.relation == '!=') || (data.relation == '!==')) {
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


const handleObjects = (settings, key, cssSelector, updateStyle, isInline, sendBack) => {

    let device = false;
    let dimension = '';
    let temp = [], nonResponsiveCSS = [];

    if (settings[key].md) { // Desktop
        device = true;

        if (typeof settings[key].md === 'object') {
            dimension = objectField(settings[key].md).data
        } else {
            dimension = settings[key].md + (settings[key].unit || '')
        }

        temp.push({ md: singleField(cssSelector, key, dimension) })
    }
    if (settings[key].sm) { // Tablet
        device = true;

        if (typeof settings[key].sm == 'object') {
            dimension = objectField(settings[key].sm).data
        } else {
            dimension = settings[key].sm + (settings[key].unit || '')
        }

        temp.push({ sm: singleField(cssSelector, key, dimension) })

    }
    if (settings[key].xs) { // Phone
        device = true;

        if (typeof settings[key].xs == 'object') {
            dimension = objectField(settings[key].xs).data
        } else {
            dimension = settings[key].xs + (settings[key].unit || '')
        }

        temp.push({ xs: singleField(cssSelector, key, dimension) })
    }

    if (!device) {

        const objectCss = objectField(settings[key]);
        if (typeof objectCss.data == 'object') {

            if (Object.keys(objectCss.data).length != 0) {

                if (objectCss.data.background) {
                    nonResponsiveCSS.push(cssSelector + objectCss.data.background);
                }

                if (isEmpty(objectCss.data.md)) {
                    temp.push({ md: objectReplace(cssSelector, objectCss.data.md) })
                }
                if (isEmpty(objectCss.data.sm)) {
                    temp.push({ sm: objectReplace(cssSelector, objectCss.data.sm) })
                }
                if (isEmpty(objectCss.data.xs)) {
                    temp.push({ xs: objectReplace(cssSelector, objectCss.data.xs) })
                }
                if (objectCss.data.simple) {
                    nonResponsiveCSS.push(cssSelector + objectCss.data.simple);
                }
                if (objectCss.data.font) {
                    nonResponsiveCSS.push(objectCss.data.font);
                }
                if (objectCss.data.shape) {
                    (objectCss.data.shape).forEach(
                        function (el) {
                            nonResponsiveCSS.push(cssSelector + el);
                        });
                    if (isEmpty(objectCss.data.data.md)) {
                        temp.push(objectAppend(cssSelector, objectCss.data.data.md))
                    }
                    if (isEmpty(objectCss.data.data.sm)) {
                        temp.push(objectAppend(cssSelector, objectCss.data.data.sm))
                    }
                    if (isEmpty(objectCss.data.data.xs)) {
                        temp.push(objectAppend(cssSelector, objectCss.data.data.xs))
                    }
                }
            }
        } else if (objectCss.data && (objectCss.data).indexOf('{{') == -1) {
            if (objectCss.action == 'append') {
                nonResponsiveCSS.push(cssSelector + objectCss.data);
            } else {
                updateStyle(key, undefined, singleField(cssSelector, key, objectCss.data))
                nonResponsiveCSS.push(singleField(cssSelector, key, objectCss.data));
            }
        }
    }

    temp.nonResponsiveCSS = nonResponsiveCSS;
    if (sendBack) {
        return (key, 'Object', temp);
    }
    updateStyle(key, 'Object', temp);
}

const handleNonObjects = (settings, key, cssSelector, updateStyle, isInline, sendBack) => {
    let temp = [];
    if (key == 'hideTablet' && isInline) {
        temp.push({ sm: singleField(cssSelector, key, settings[key]) });
        !sendBack && updateStyle(key, 'Object', temp);
    } else if (key == 'hideMobile' && isInline) {
        temp.push({ xs: singleField(cssSelector, key, settings[key]) });
        !sendBack && updateStyle(key, 'Object', temp);
    } else if (typeof settings[key] !== 'undefined') {
        !sendBack && updateStyle(key, undefined, singleField(cssSelector, key, settings[key]));
    }
    if (sendBack && temp.length > 0) {
        return temp;
    } else if (sendBack && typeof settings[key] !== 'undefined') {
        return singleField(cssSelector, key, settings[key]);
    }
}

export const generateCSS = (blockAttributes, settings, updateStyle, isInline = false) => {

    let responsiveCSS = {}, nonResponsiveCSS = {};

    Object.keys(settings).forEach((key) => {
        if (blockAttributes[key] && blockAttributes[key].hasOwnProperty('style')) {
            blockAttributes[key].style.forEach(selectData => {
                let cssSelector = selectData.selector;
                if (checkDepends(settings, selectData, key)) {
                    if (typeof settings[key] == 'object') {
                        responsiveCSS[key] = handleObjects(settings, key, cssSelector, updateStyle, isInline, true);
                    } else {
                        nonResponsiveCSS[key] = handleNonObjects(settings, key, cssSelector, updateStyle, isInline, true);
                    }
                }
            });
        }
    });
    const response = {
        responsiveCSS: responsiveCSS,
        nonResponsiveCSS: nonResponsiveCSS
    }
    updateStyle(response);
}



export const updateCSS = (blockAttributes, settings, updateStyle, key, isInline = false) => {
    if (blockAttributes[key] && blockAttributes[key].hasOwnProperty('style')) {
        blockAttributes[key].style.forEach(selectData => {
            let cssSelector = selectData.selector;
            if (checkDepends(settings, selectData, key)) {
                if (typeof settings[key] == 'object') {
                    handleObjects(settings, key, cssSelector, updateStyle, isInline, false)
                } else {
                    handleNonObjects(settings, key, cssSelector, updateStyle, isInline, false)
                }
            }
        });
    }
}
