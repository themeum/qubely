const { __ } = wp.i18n
const { select, dispatch } = wp.data
const { createHigherOrderComponent } = wp.compose
const { Component, Fragment } = wp.element
import './css/contextmenu.scss'
import icons from '../helpers/icons'
const { CssGenerator: { CssGenerator } } = wp.qubelyComponents

const addAttribute = (block) => {
    if (block.attributes && block.attributes.showContextMenu) {
        block.attributes = Object.assign({}, block.attributes, {
            sourceOfCopiedStyle: { type: 'boolean', default: false }
        })
    }
    return block
}


const withContextMenu = createHigherOrderComponent(OriginalComponent => {
    class QubelyWrappedComponent extends Component {

        componentDidMount() {
            const { clientId, attributes: { sourceOfCopiedStyle } } = this.props
            document.addEventListener('mousedown', this.handleonClickOutside)
            let qubelyCopiedStyles = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
            if (sourceOfCopiedStyle && qubelyCopiedStyles) {
                qubelyCopiedStyles.copiedFrom = clientId
                localStorage.setItem('qubelyCopiedStyles', JSON.stringify(qubelyCopiedStyles))
            }
        }

        componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleonClickOutside);
        }
        renderContextMenu = () => {
            const { name, clientId, attributes: { sourceOfCopiedStyle } } = this.props
            let previouslyCopiedStyle = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
            return (
                <div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
                    <div className="qubely-context-menu">
                        <div className="qubely-context-menu-group">
                            <div className="qubely-context-menu-item qubely-context-menu-item-copy" onClick={() => this.copyStyles()} >
                                <div class="qubely-context-menu-item-icon"> <i className="fas fa-copy"></i></div>
                                <div class="qubely-context-menu-item-title">Copy Style</div>
                            </div>
                            <div className={`qubely-context-menu-item qubely-context-menu-item-paste disable-${previouslyCopiedStyle && previouslyCopiedStyle.blockName == name ? sourceOfCopiedStyle : true}`} onClick={() => this.pasteStyle()} aria-disabled={sourceOfCopiedStyle} >
                                <div class="qubely-context-menu-item-icon"> <i className="fas fa-paste"></i></div>
                                <div class="qubely-context-menu-item-title">Paste Style</div>
                            </div>
                        </div>
                        <div className="qubely-context-menu-group">
                            <div className="qubely-context-menu-item qubely-context-menu-item-delete" onClick={() => dispatch('core/block-editor').removeBlock(clientId)} >
                                <div class="qubely-context-menu-item-icon"> <i className="fas fa-trash"></i></div>
                                <div class="qubely-context-menu-item-title">Delete</div>
                                <div class="qubely-context-menu-item-shortcut">⌦</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        handleonClickOutside = (event) => {
            const qubelyContextMenu = this.refs.qubelyContextMenu
            if (qubelyContextMenu && !qubelyContextMenu.contains(event.target)) {
                qubelyContextMenu.style.display = `none`
            }
        }
        handleContextMenu = (event) => {
            event.preventDefault()
            const contextMenu = this.refs.qubelyContextMenu
            const clickX = event.clientX
            const clickY = event.clientY
            const screenW = window.innerWidth
            const screenH = window.innerHeight
            const rootW = contextMenu.offsetWidth
            const rootH = contextMenu.offsetHeight
            const right = (screenW - clickX) > rootW
            const left = !right
            const top = (screenH - clickY) > rootH
            const bottom = !top
            contextMenu.style.display = `block`
            if (right) {
                contextMenu.style.left = `${clickX + 5}px`
            }
            if (left) {
                contextMenu.style.left = `${clickX - rootW - 5}px`
            }
            if (top) {
                contextMenu.style.top = `${clickY + 5}px`
            }
            if (bottom) {
                contextMenu.style.top = `${clickY - rootH - 5}px`
            }
        }

        copyStyles = () => {
            const { setAttributes, clientId, name } = this.props
            const { updateBlockAttributes } = dispatch('core/block-editor')
            let blockDefaultAttributes = JSON.parse(JSON.stringify(wp.blocks.getBlockType(name))).attributes
            let blockAttributes = select('core/block-editor').getBlockAttributes(clientId)
            let newStyles = { copiedStyles: {} }
            Object.keys(blockDefaultAttributes).forEach(key => {
                if (blockDefaultAttributes[key].hasOwnProperty('style')) {
                    newStyles.copiedStyles[key] = JSON.parse(JSON.stringify(blockAttributes[key]))
                } else if (key.toLowerCase() == 'layout' || key.toLowerCase() == 'filltype' || key == 'iconStyle' || key.toLowerCase() == 'buttonfilltype') {
                    newStyles.copiedStyles[key] = JSON.parse(JSON.stringify(blockAttributes[key]))
                }
            })
            newStyles['copiedFrom'] = clientId
            newStyles['blockName'] = name
            let previouslyCopiedStyle = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
            if (previouslyCopiedStyle) {
                let previouslyCopiedFrom = previouslyCopiedStyle.copiedFrom
                select('core/block-editor').getBlock(`${previouslyCopiedFrom}`) && updateBlockAttributes(`${previouslyCopiedFrom}`, { sourceOfCopiedStyle: false })
            }

            setTimeout(() => localStorage.setItem('qubelyCopiedStyles', JSON.stringify(newStyles)), 500)

            const qubelyContextMenu = this.refs.qubelyContextMenu
            qubelyContextMenu.style.display = `none`
            setAttributes({ sourceOfCopiedStyle: true })
        }
        pasteStyle = () => {
            const { setAttributes } = this.props
            let qubelyCopiedStyles = JSON.parse(localStorage.getItem('qubelyCopiedStyles')).copiedStyles
            const qubelyContextMenu = this.refs.qubelyContextMenu
            qubelyContextMenu.style.display = `none`
            setAttributes(qubelyCopiedStyles)
        }

        render() {
            const { isSelected, name, attributes: { uniqueId, showContextMenu, sourceOfCopiedStyle } } = this.props
            let type = name.split("/")[0]
            let blockName = name.split("/")[1]
            if (uniqueId) { CssGenerator(this.props.attributes, blockName, uniqueId) }
            let PluginBlockSettingsMenuItem = wp.editPost.PluginBlockSettingsMenuItem
            let previouslyCopiedStyle = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
            if (type !== 'qubely' || showContextMenu != true) {
                return <OriginalComponent {...this.props} />
            } else {
                return (
                    <Fragment>
                        {
                            isSelected &&
                            <Fragment>
                                <PluginBlockSettingsMenuItem
                                    icon={icons.copy}
                                    label={__(`Copy Style`)}
                                    onClick={() => this.copyStyles()} />
                                {
                                    !(previouslyCopiedStyle && previouslyCopiedStyle.blockName == name ? sourceOfCopiedStyle : true) &&
                                    <PluginBlockSettingsMenuItem
                                        icon={icons.paste}
                                        label={__(`Paste Style`)}
                                        onClick={() => this.pasteStyle()} />
                                }

                            </Fragment>
                        }
                        <div className={`qubely-${blockName}-block`} onContextMenu={event => this.handleContextMenu(event)}   >
                            <OriginalComponent {...this.props} />
                        </div>
                        {this.renderContextMenu()}
                    </Fragment>
                )
            }
        }
    }
    return QubelyWrappedComponent
}, "withInspectorControl");
wp.hooks.addFilter('blocks.registerBlockType', 'qubely/extend', addAttribute, 9)
wp.hooks.addFilter('editor.BlockEdit', 'qubely/contextmenu', withContextMenu, 10)

