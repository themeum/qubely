



// CSS Gradient
export const cssGradient = (v, type) => {
    let gradietValue = v.type == 'linear' ? 'linear-gradient(' + v.direction + 'deg, ' : 'radial-gradient( circle at ' + v.radial + ' , '
    gradietValue += v.color1 + ' ' + v.start + '%,' + v.color2 + ' ' + v.stop + '%)'
    if (type == 'object') {
        return { background: gradietValue }
    } else {
        gradietValue = 'background:' + gradietValue + (v.clip ? '-webkit-background-clip: text; -webkit-text-fill-color: transparent;' : '')
        return '{' + gradietValue + '}';
    }
}

// CSS Box Shadow
export const cssBoxShadow = (v) => {
    return '{ box-shadow:' + (v.inset || '') + ' ' + v.horizontal + 'px ' + v.vertical + 'px ' + v.blur + 'px ' + v.spread + 'px ' + v.color + '; }'
}

// CSS Border
export const cssBorder = (v) => {
    v = Object.assign({}, { type: 'solid', width: {}, color: '#e5e5e5' }, v);
    let nonResponsiveCss = `border-color:  ${v.color ? v.color : '#555d66'}; border-style: ${v.type ? v.type : 'solid'};`

    if (typeof (v.global) === 'object' || typeof (v.custom) === 'object') {
        let data = { md: [], sm: [], xs: [] }
        data = v.widthType == 'global' ? _push(_device({ ...v.global, unit: v.unit ? v.unit : 'px' }, 'border-width:{{key}};'), data) :
            _push(_customDevice({ ...v.custom, unit: v.unit ? v.unit : 'px' }, 'border-width:{{key}};'), data)

        data.md.push(nonResponsiveCss)
        data.sm.push(nonResponsiveCss)
        data.xs.push(nonResponsiveCss)
        return { md: data.md, sm: data.sm, xs: data.xs }

    } else {
        let data = ''
        if (v.widthType == 'global') {
            data = `border-width:${v.global}${v.unit ? v.unit : 'px'};${nonResponsiveCss}`
        } else {
            let temp = v.custom ? v.custom.split(" ") : ['0', '0', '0', '0']
            let unit = v.unit ? v.unit : 'px'
            data = `border-width:${temp[0] ? temp[0] : `0`}${unit} ${temp[1] ? temp[1] : `0`}${unit} ${temp[2] ? temp[2] : `0`}${unit} ${temp[3] ? temp[3] : `0`}${unit};${nonResponsiveCss}`
        }
        return '{' + data + '}';
    }
}
// Table Border
export const tableBorder = (v) => {
    const {
        border
    } = v;
    let nonResponsiveCss = 'border-style:hidden;';
    let color = '#E5E7EA';
    if (border.color) {
        color = v.border.color;
    }
    let data = { md: [], sm: [], xs: [] }
    if (border.widthType === 'global') {
        if(border.global.md){
            data.md.push(`box-shadow: 0 0 0 ${border.global.md}${border.unit} ${color};`)
        }
        if(border.global.sm){
            data.sm.push(`box-shadow: 0 0 0 ${border.global.sm}${border.unit} ${color};`)
        }
        if(border.global.xs){
            data.xs.push(`box-shadow: 0 0 0 ${border.global.xs}${border.unit} ${color};`)
        }
    } 

    data.md.push(nonResponsiveCss)
    data.sm.push(nonResponsiveCss)
    data.xs.push(nonResponsiveCss)
    return { md: data.md, sm: data.sm, xs: data.xs }
}

// CSS Typography
export const _device = (val, selector) => {
    let data = {}
    if (val && val.md) { data.md = selector.replace(new RegExp('{{key}}', "g"), val.md + (val.unit || '')) }
    if (val && val.sm) { data.sm = selector.replace(new RegExp('{{key}}', "g"), val.sm + (val.unit || '')) }
    if (val && val.xs) { data.xs = selector.replace(new RegExp('{{key}}', "g"), val.xs + (val.unit || '')) }
    return data;
}
export const _push = (val, data) => {
    if (val.md) { data.md.push(val.md) }
    if (val.sm) { data.sm.push(val.sm) }
    if (val.xs) { data.xs.push(val.xs) }
    return data;
}

const globalTypography = (selectedTypo) => {

    let CSS = '{';
    if (selectedTypo !== 'none') {
        CSS += `font-family:var(--qubely-typo${selectedTypo}-font-family);`;
        CSS += `font-size:var(--qubely-typo${selectedTypo}-font-size);`;
        CSS += `font-weight:var(--qubely-typo${selectedTypo}-font-weight) !important;`;
        CSS += `font-style:var(--qubely-typo${selectedTypo}-font-style) !important;`;
        CSS += `line-height:var(--qubely-typo${selectedTypo}-line-height) !important;`;
        CSS += `letter-spacing:var(--qubely-typo${selectedTypo}-letter-spacing);`;
        CSS += `text-transform:var(--qubely-typo${selectedTypo}-text-transform);`;
    }
    CSS += '}';
    return CSS;

}

export const cssTypography = (v) => {

    const {
        globalSource,
        activeSource,
        family,
        weight,
        transform,

    } = v;

    if (typeof activeSource !== 'undefined' && activeSource === 'global') {
        return globalTypography(globalSource);
    }

    let font = ''
    // if (v.family) {
    //     if (!['Arial', 'Tahoma', 'Verdana', 'Helvetica', 'Times New Roman', 'Trebuchet MS', 'Georgia'].includes(v.family)) {
    //         font = "@import url('https://fonts.googleapis.com/css?family=" + v.family.replace(/\s/g, '+') + ':' + (v.weight || 400) + "');"
    //     }
    // }
    let data = { md: [], sm: [], xs: [] }
    if (v.size) { data = _push(_device(v.size, 'font-size:{{key}}'), data) }
    if (v.height) { data = _push(_device(v.height, 'line-height:{{key}} !important'), data) }
    if (v.spacing) { data = _push(_device(v.spacing, 'letter-spacing:{{key}}'), data) }
    let simple = '{' + (v.family ? "font-family:'" + v.family + "'," + v.type + ";" : '') +
        (v.color ? 'color:' + v.color + ';' : '') +
        (v.style && typeof v.style !== 'object' ? 'font-style:' + v.style + ';' : '') +
        (v.decoration ? 'text-decoration:' + v.decoration + ';' : '');

    if (weight) {
        if (typeof weight === 'string') {
            simple += `font-weight:${weight.slice(0, -1)};`;
            simple += `font-style:italic;`;
        } else {
            simple += `font-weight:${weight};`;
            simple += `font-style:normal;`;
        }
    }

    if (transform) {
        simple += `text-transform:${transform};`;
    }
    simple += '}';
    return { md: data.md, sm: data.sm, xs: data.xs, simple, font };
}


// CSS Dimension
export const cssDimension = (v) => {
    const unit = v.unit ? v.unit : 'px'
    return (v.top || 0) + unit + ' ' + (v.right || 0) + unit + ' ' + (v.bottom || 0) + unit + ' ' + (v.left || 0) + unit
}

// CSS Background
const split_bg = (type, image = {}, imgPosition, imgAttachment, imgRepeat, imgSize, DefaultColor, bgGradient, bgimageSource = 'local', externalImageUrl = {}) => {
    let bgData = (DefaultColor ? 'background-color:' + DefaultColor + ';' : '');
    if (type == 'image') {
        bgData += (bgimageSource === 'local' ? image.hasOwnProperty('url') ? 'background-image:url(' + image.url + ');' : '' : externalImageUrl.hasOwnProperty('url') ? 'background-image:url(' + externalImageUrl.url + ');' : '') + (imgPosition ? 'background-position:' + imgPosition + ';' : '') + (imgAttachment ? 'background-attachment:' + imgAttachment + ';' : '') +
            (imgRepeat ? 'background-repeat:' + imgRepeat + ';' : '') + (imgSize ? 'background-size:' + imgSize + ';' : '')
    }
    else if (type == 'gradient') {
        if (bgGradient && bgGradient.type == 'linear') {
            bgData += 'background-image: linear-gradient(' + bgGradient.direction + 'deg, ' + bgGradient.color1 + ' ' + bgGradient.start + '%,' + bgGradient.color2 + ' ' + bgGradient.stop + '%);'
        } else {
            if (typeof bgGradient.radial === 'undefined') {
                bgGradient.radial = 'center';
            }
            bgData += 'background-image: radial-gradient( circle at ' + bgGradient.radial + ' , ' + bgGradient.color1 + ' ' + bgGradient.start + '%,' + bgGradient.color2 + ' ' + bgGradient.stop + '%);'
        }
    }
    return bgData;
}
export const cssBackground = (v) => {
    let background = '{'
    background += split_bg(v.bgType, v.bgImage, v.bgimgPosition, v.bgimgAttachment, v.bgimgRepeat, v.bgimgSize, v.bgDefaultColor, v.bgGradient, v.bgimageSource, v.externalImageUrl)
    background += '}'
    if (v.bgType == 'video') {
        if (v.bgVideoFallback) {
            if (v.bgVideoFallback.url) {
                background += 'background-image: url(' + v.bgVideoFallback.url + '); background-position: center; background-repeat: no-repeat; background-size: cover;'
            }
        }
    }
    if (background != '{}') { return background }
    return {};
}


// CSS Shape
export const cssShape = (v) => {
    let data = { md: [], sm: [], xs: [] }
    let shape = []
    if (v.color) {
        shape.push(' svg path{fill:' + v.color + ';}');
        shape.push(' svg polygon{fill:' + v.color + ';}')
    }
    if (v.flipShapeDivider) {
        if (v.shapeType === 'top') {
            shape.push(' svg { transform: rotateY(180deg) translateX(50%);}');
        } else {
            shape.push(' svg { transform: rotate(180deg) translate(50%);}');
        }
    }
    if (v.front) { shape.push('{z-index: 99;}') }
    if (v.width) { data = _push(_device(v.width, ' svg {width:{{key}};}'), data) }
    if (v.height) { data = _push(_device(v.height, ' svg {height:{{key}};}'), data) }
    return { data, shape };
}


// CSS ColorAdvanced
export const cssColor = (v) => {
    let data = (v.clip ? '-webkit-background-clip: text; -webkit-text-fill-color: transparent;' : '');
    if (v.type == 'color') {
        if (v.textColor) {
            data += (v.color ? 'color: ' + v.color + ';' : '')
        } else {
            data += (v.color ? 'background-image: none; background-color: ' + v.color + ';' : '')
        }

    } else if (v.type == 'gradient') {
        if (v.gradient && v.gradient.type == 'linear') {
            if (v.textColor) {
                data += 'background : -webkit-linear-gradient(' + v.gradient.direction + 'deg, ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;'
            } else {
                data += 'background-image : linear-gradient(' + v.gradient.direction + 'deg, ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);'
            }
        } else {
            if (v.textColor) {
                data += 'background : radial-gradient(circle at ' + v.gradient.radial + ' , ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;'
            } else {
                data += 'background-image : radial-gradient( circle at ' + v.gradient.radial + ' , ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);'
            }
        }
    }
    return '{' + data + '}';
}


// CSS Spacer
export const cssSpacer = (v) => {
    let data = { md: [], sm: [], xs: [] }
    if (v.spaceTop) { data = _push(_device(v.spaceTop, 'padding-top:{{key}}'), data) }
    if (v.spaceBottom) { data = _push(_device(v.spaceBottom, 'padding-bottom:{{key}}'), data) }
    return { md: data.md, sm: data.sm, xs: data.xs };
}

// CSS Size
export const cssSize = (v) => {
    let data = { md: [], sm: [], xs: [] }
    if (v.paddingX) {
        data = _push(_device(v.paddingX, 'padding-left:{{key}}' + (v.paddingX.unit || '') + ';padding-right:{{key}}'), data)
    }
    if (v.paddingY) {
        data = _push(_device(v.paddingY, 'padding-top:{{key}}' + (v.paddingY.unit || '') + ';padding-bottom:{{key}}'), data)
    }
    return { md: data.md, sm: data.sm, xs: data.xs };
}


// CSS transfrom
export const cssTransform = (v) => {
    let data = { md: [], sm: [], xs: [] }
    if ((v.translateX && v.translateX.md) || (v.translateY && v.translateY.md)) {
        data.md = `transform: translateX({{key}}${(v.translateX && v.translateX.unit ? v.translateX.unit : 'px')}) `.replace(new RegExp('{{key}}', "g"), v.translateX ? v.translateX.md || '0' : '0') + `translateY({{key}}${(v.translateY && v.translateY.unit ? v.translateY.unit : 'px')})`.replace(new RegExp('{{key}}', "g"), v.translateY ? v.translateY.md || '0' : '0')
    }
    if ((v.translateX && v.translateX.sm) || (v.translateY && v.translateY.sm)) {
        data.sm = `transform: translateX({{key}}${(v.translateX && v.translateX.unit ? v.translateX.unit : 'px')}) `.replace(new RegExp('{{key}}', "g"), v.translateX ? v.translateX.sm || '0' : '0') + `translateY({{key}}${(v.translateY && v.translateY.unit ? v.translateY.unit : 'px')})`.replace(new RegExp('{{key}}', "g"), v.translateY ? v.translateY.sm || '0' : '0')
    }
    if ((v.translateX && v.translateX.xs) || (v.translateY && v.translateY.xs)) {
        data.xs = `transform: translateX({{key}}${(v.translateX && v.translateX.unit ? v.translateX.unit : 'px')}) `.replace(new RegExp('{{key}}', "g"), v.translateX ? v.translateX.xs || '0' : '0') + `translateY({{key}}${(v.translateY && v.translateY.unit ? v.translateY.unit : 'px')})`.replace(new RegExp('{{key}}', "g"), v.translateY ? v.translateY.xs || '0' : '0')
    }
    return { md: [data.md], sm: [data.sm], xs: [data.xs] };
}

const _customDevice = (val, selector) => {
    let data = {}
    if (val && val.md) {
        let [cssSyntax, value] = selector.replace(new RegExp('{{key}}', "g"), val.md).split(":")
        let [top, right, bottom, left] = value.split(" ")
        left = left.length > 0 ? left.slice(0, -1) : '0'
        data.md = `${cssSyntax}:${top ? top : '0'}${val.unit} ${right ? right : '0'}${val.unit} ${bottom ? bottom : '0'}${val.unit} ${left ? left : '0'}${val.unit};`
    }
    if (val && val.sm) {
        let [cssSyntax, value] = selector.replace(new RegExp('{{key}}', "g"), val.sm).split(":")
        let [top, right, bottom, left] = value.split(" ")
        left = left.length > 0 ? left.slice(0, -1) : '0'
        data.sm = `${cssSyntax}:${top ? top : '0'}${val.unit} ${right ? right : '0'}${val.unit} ${bottom ? bottom : '0'}${val.unit} ${left ? left : '0'}${val.unit};`
    }
    if (val && val.xs) {
        let [cssSyntax, value] = selector.replace(new RegExp('{{key}}', "g"), val.xs).split(":")
        let [top, right, bottom, left] = value.split(" ")
        left = left.length > 0 ? left.slice(0, -1) : '0'
        data.xs = `${cssSyntax}:${top ? top : '0'}${val.unit} ${right ? right : '0'}${val.unit} ${bottom ? bottom : '0'}${val.unit} ${left ? left : '0'}${val.unit};`
    }
    return data;
}

// CSS cssBorderRadius
export const cssBorderRadius = (v) => {
    if (typeof (v.global) === 'object' || typeof (v.custom) === 'object') {

        let data = { md: [], sm: [], xs: [] }
        data = v.radiusType == 'global' ? _push(_device({ ...v.global, unit: v.unit ? v.unit : 'px' }, 'border-radius:{{key}};'), data) :
            _push(_customDevice({ ...v.custom, unit: v.unit ? v.unit : 'px' }, 'border-radius:{{key}};'), data)

        return { md: data.md, sm: data.sm, xs: data.xs }
    } else {
        let data = ''
        if (v.radiusType == 'global') {
            data = `border-radius:${v.global || '0'}${v.unit ? v.unit : 'px'} `
        } else {
            let temp = v.custom ? v.custom.split(" ") : ['0', '0', '0', '0']
            let unit = v.unit ? v.unit : 'px'
            data = `border-radius:${temp[0] ? temp[0] : `0`}${unit} ${temp[1] ? temp[1] : `0`}${unit} ${temp[2] ? temp[2] : `0`}${unit} ${temp[3] ? temp[3] : `0`}${unit}`
        }
        return '{' + data + '}';
    }

}

// CSS cssPadding
export const cssPadding = (v) => {

    if (typeof (v.global) === 'object' || typeof (v.custom) === 'object') {
        let data = { md: [], sm: [], xs: [] }
        data = v.paddingType == 'global' ? _push(_device({ ...v.global, unit: v.unit ? v.unit : 'px' }, 'padding:{{key}};'), data) :
            _push(_customDevice({ ...v.custom, unit: v.unit ? v.unit : 'px' }, 'padding:{{key}};'), data)

        return { md: data.md, sm: data.sm, xs: data.xs }

    } else {
        let data = ''
        if (v.paddingType == 'global') {
            data = `padding:${v.global}${v.unit ? v.unit : 'px'} `
        } else {
            let temp = v.custom ? v.custom.split(" ") : ['0', '0', '0', '0']
            let unit = v.unit ? v.unit : 'px'
            data = `padding:${temp[0] ? temp[0] : `0`}${unit} ${temp[1] ? temp[1] : `0`}${unit} ${temp[2] ? temp[2] : `0`}${unit} ${temp[3] ? temp[3] : `0`}${unit}`
        }
        return '{' + data + '}';
    }
}

// CSS cssMargin
export const cssMargin = (v) => {

    if (typeof (v.global) === 'object' || typeof (v.custom) === 'object') {
        let data = { md: [], sm: [], xs: [] }
        data = v.marginType == 'global' ? _push(_device({ ...v.global, unit: v.unit ? v.unit : 'px' }, 'margin:{{key}};'), data) :
            _push(_customDevice({ ...v.custom, unit: v.unit ? v.unit : 'px' }, 'margin:{{key}};'), data)

        return { md: data.md, sm: data.sm, xs: data.xs }

    } else {
        let data = ''
        if (v.marginType == 'global') {
            data = `margin:${v.global}${v.unit ? v.unit : 'px'} `
        } else {
            let temp = v.custom ? v.custom.split(" ") : ['0', '0', '0', '0']
            let unit = v.unit ? v.unit : 'px'
            data = `margin:${temp[0] ? temp[0] : `0`}${unit} ${temp[1] ? temp[1] : `0`}${unit} ${temp[2] ? temp[2] : `0`}${unit} ${temp[3] ? temp[3] : `0`}${unit}`
        }
        return '{' + data + '}';
    }

}

// CSS cssRowReverse
export const cssRowReverse = (v) => {
    let data = { md: [], sm: [], xs: [] }
    if (v.values.md) { data.md.push(`flex-direction:row-reverse`) }
    if (v.values.sm) { data.sm.push(`flex-direction:column-reverse`) }
    if (v.values.xs) { data.xs.push(`flex-direction:column-reverse`) }



    return { md: data.md, sm: data.sm, xs: data.xs };
}