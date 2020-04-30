const { select } = wp.data
const { CssGenerator: { CssGenerator } } = wp.qubelyComponents

const endpoint = '/qubely/v1/save_block_css'

const API_fetch = (post_id, block_css, is_remain, available_blocks) => {
    const json = JSON.stringify(block_css.interaction)
    return wp.apiFetch({
        path: endpoint,
        method: 'POST',
        data: { block_css: block_css.css, interaction: json, post_id, is_remain, available_blocks }
    }).then(data => data)
}

/**
 * Parse css for stylesheet
 * Create css file for each post. Call api for update css file each time hit save button
 */
let __CSS = ''
let interaction = {}

function innerBlocks(blocks, type = false) {
    if (type == true) {
        __CSS = ''
        interaction = {}
        type = false
    }

    blocks.map(row => {
        const { attributes, name } = row
        const blockName = name.split('/')
        if (blockName[0] === 'qubely' && attributes.uniqueId) {
            __CSS += CssGenerator(attributes, blockName[1], attributes.uniqueId, true)
            if (typeof attributes['interaction'] !== 'undefined') {
                const { while_scroll_into_view, mouse_movement } = attributes.interaction

                if (typeof while_scroll_into_view !== 'undefined' && while_scroll_into_view.enable === true) {
                    let { action_list } = while_scroll_into_view
                    action_list = action_list.sort((a, b) => a.keyframe - b.keyframe)
                    const interactionObj = {
                        blockId: attributes.uniqueId,
                        enable_mobile: typeof while_scroll_into_view.enable_mobile === 'undefined' ? false : while_scroll_into_view.enable_mobile,
                        enable_tablet: typeof while_scroll_into_view.enable_tablet === 'undefined' ? false : while_scroll_into_view.enable_tablet,
                        animation: action_list
                    }
                    let origin = {
                        x_offset: typeof while_scroll_into_view.transform_origin_x === 'undefined' ? 'center' : while_scroll_into_view.transform_origin_x,
                        y_offset: typeof while_scroll_into_view.transform_origin_y === 'undefined' ? 'center' : while_scroll_into_view.transform_origin_y,
                    }
                    interactionObj.origin = origin
                    if (typeof interaction.while_scroll_view === 'undefined') {
                        interaction.while_scroll_view = [interactionObj]
                    } else {
                        interaction.while_scroll_view.push(interactionObj)
                    }
                    // blocks_flag.interaction = true
                }
                if (typeof mouse_movement !== 'undefined' && mouse_movement.enable === true) {
                    const interactionObj = {
                        blockId: attributes.uniqueId,
                        enable_mobile: typeof while_scroll_into_view.enable_mobile === 'undefined' ? false : while_scroll_into_view.enable_mobile,
                        enable_tablet: typeof while_scroll_into_view.enable_tablet === 'undefined' ? false : while_scroll_into_view.enable_tablet,
                        animation: mouse_movement,
                    }
                    if (typeof interaction.mouse_movement === 'undefined') {
                        interaction.mouse_movement = [interactionObj]
                    } else {
                        interaction.mouse_movement.push(interactionObj)
                    }
                }
            }
        }

        if (row.innerBlocks && (row.innerBlocks).length > 0) {
            innerBlocks(row.innerBlocks)
        }
    })
    return { css: __CSS, interaction }
}


function isQubelyBlock(blocks) {
    let isQubely = false;
    blocks.forEach(block => {
        if (block.name.indexOf('qubely/') != -1) {
            isQubely = true;
        }
        if (block.innerBlocks && (block.innerBlocks).length > 0 && isQubely != true) {
            block.innerBlocks.forEach(bl => {
                if (bl.name.indexOf('qubely/') != -1) {
                    isQubely = true;
                }
                if (bl.innerBlocks && (bl.innerBlocks).length > 0 && isQubely != true) {
                    bl.innerBlocks.forEach(b => {
                        if (b.name.indexOf('qubely/') != -1) {
                            isQubely = true;
                        }
                    })
                }
            })
        }
    })
    return isQubely;
}


function getData(pId) {
    wp.apiFetch({
        path: 'qubely/v1/qubely_get_content',
        method: 'POST',
        data: { postId: pId }
    }).then(response => {
        if (response.success) {
            const innerBlock = innerBlocks(wp.blocks.parse(response.data), true)
            if (innerBlock.css) {
                wp.apiFetch({
                    path: 'qubely/v1/append_qubely_css',
                    method: 'POST',
                    data: { css: innerBlock.css, post_id: select('core/editor').getCurrentPostId() }
                }).then(res => {
                    if (res.success) {
                        // Save Data
                    }
                })
            }
        }
    })
};


function parseBlock(blocks) {
    blocks.forEach(block => {
        if (block.name.indexOf('core/block') != -1) {
            getData(block.attributes.ref)
        }
        if (block.innerBlocks && (block.innerBlocks).length > 0) {
            parseBlock(block.innerBlocks)
        }
    })
}


/*function setAvailableBlocksMeta(data) {
    wp.apiFetch({
        path: 'qubely/v1/set_qubely_available_blocks_meta',
        method: 'POST',
        data
    })
        .then(response  => {
            console.log(response)
        })
}*/


function availableBlocksMeta(all_blocks) {
    const blocks_flag = {
        available_blocks: [],
        interaction: false,
        animation: false,
        parallax: false
    }
    function recursive_block_map(blocks) {
        if (!blocks.length) {
            return
        }
        blocks.map(block => {
            const { attributes, innerBlocks, name } = block
            blocks_flag.available_blocks.push(name)

            // check if has interaction
            if (blocks_flag.interaction === false && typeof attributes.interaction !== 'undefined') {
                const { while_scroll_into_view, mouse_movement } = attributes.interaction
                if (
                    (typeof while_scroll_into_view !== 'undefined' && while_scroll_into_view.enable === true) ||
                    (typeof mouse_movement !== 'undefined' && mouse_movement.enable === true)
                ) {
                    blocks_flag.interaction = true
                }
            }

            // if has block animation
            if (
                blocks_flag.animation === false &&
                typeof attributes.animation !== 'undefined' &&
                typeof attributes.animation.animation !== 'undefined' &&
                attributes.animation.animation !== ''
            ) {
                blocks_flag.animation = true
            }

            // if has block parallax
            if (blocks_flag.parallax === false && name === 'qubely/row') {
                if (
                    typeof attributes.rowBg !== 'undefined' &&
                    typeof attributes.rowBg.bgimgParallax !== 'undefined' &&
                    attributes.rowBg.bgimgParallax === 'animated'
                ) {
                    blocks_flag.parallax = true
                }
            }

            recursive_block_map(innerBlocks)
        })
    }
    recursive_block_map(all_blocks)
    return blocks_flag
}

const PATH = '/qubely/v1/global_settings';

async function fetchFromApi() {
    return await wp.apiFetch({ path: PATH })
}


const ParseCss = async (setDatabase = true) => {
    window.bindCss = true
    const all_blocks = select('core/block-editor').getBlocks()
    const isRemain = isQubelyBlock(all_blocks)
    const { getCurrentPostId } = select('core/editor')
    let __blocks = { css: '', interaction: {} };

    let globalData;

    const getGlobalSettings = () => {

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
                const setGlobalTypo_Variables = globalTypoes => {
                    let CSS = '';
                    globalTypoes.forEach((value, index) => {
                        if (Object.keys(value).length > 3) {
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
                            CSS += responsive + ' ' + nonResponsiveProps;
                        }
                    });
                    return CSS;
                }

                __blocks.css += setGlobalCSS_Variables(globalColors);
                __blocks.css += setGlobalTypo_Variables(presets[activePreset].typography);

                // __blocks.css += CssGenerator(presets[activePreset].typography, 'global-settings', 'global', true, true, true, presets[activePreset].typography)

            }

        })
    }
    await getGlobalSettings();

    if (typeof window.globalData != 'undefined') {
        __blocks.css += CssGenerator(window.globalData.settings, 'pagesettings', '8282882', true)
    }

    // Inner Blocks
    let parseData = innerBlocks(all_blocks, true)
    __blocks.interaction = parseData.interaction
    __blocks.css += parseData.css

    // reusable Block
    parseBlock(all_blocks);

    localStorage.setItem('qubelyCSS', __blocks)

    // available blocks meta
    const available_blocks = availableBlocksMeta(all_blocks);

    if (setDatabase) {
        API_fetch(getCurrentPostId(), __blocks, isRemain, available_blocks)
    }
    setTimeout(() => {
        window.bindCss = false
    }, 1000)
}

export default ParseCss