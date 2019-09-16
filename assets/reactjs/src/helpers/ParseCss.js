const { select } = wp.data
const { CssGenerator: { CssGenerator } } = wp.qubelyComponents

const endpoint = '/qubely/v1/save_block_css'

const API_fetch = (post_id, block_css) => {
    return wp.apiFetch({
        path: endpoint,
        method: 'POST',
        data: { block_css, post_id }
    }).then(data => data)
}
/**
 * Parse css for stylesheet
 * Create css file for each post. Call api for update css file each time hit save button
 */
let __CSS = ''
function innerBlocks(blocks, type = false) {
    if (type == true) {
        __CSS = ''
        type = false
    }
    blocks.map(row => {
        const { attributes, name } = row
        const blockName = name.split('/')
        if (blockName[0] === 'qubely' && attributes.uniqueId) {
            __CSS += CssGenerator(attributes, blockName[1], attributes.uniqueId, true)
        }
        if (row.innerBlocks && (row.innerBlocks).length > 0) {
            innerBlocks(row.innerBlocks)
        }
    })
    return __CSS
}

const ParseCss = (setDatabase = true) => {
    window.bindCss = true
    const { getBlocks, getCurrentPostId } = select('core/editor')
    let __blocks = '';
    if (typeof window.globalData != 'undefined') {
        __blocks += CssGenerator(window.globalData.settings, 'pagesettings', '8282882', true)
    }
    __blocks += innerBlocks( getBlocks(), true )
    if( __blocks !== '' ){
        localStorage.setItem('qubelyCSS', __blocks)
        if(setDatabase){
            API_fetch(getCurrentPostId(), __blocks).then( data => {} )
        }
    }
    setTimeout(() => {
        window.bindCss = false
    }, 1000)
}

export default ParseCss