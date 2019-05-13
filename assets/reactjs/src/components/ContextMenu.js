const { __ } = wp.i18n
const { compose } = wp.compose
const { select, dispatch, withSelect, withDispatch } = wp.data
const { createHigherOrderComponent } = wp.compose
const { Component, Fragment } = wp.element
const { InspectorAdvancedControls, InspectorControls } = wp.editor
const { PanelBody } = wp.components
const { RichText, BlockControls } = wp.editor
import { Typography, Color, Alignment, CustomIcons, Toggle, Select, Styles, Tabs, Tab, Range, Url, BoxShadow, RadioAdvanced, InnerPanel } from './FieldRender'
import './css/contextmenu.scss'
import icons from '../helpers/icons'
import { CssGenerator } from './CssGenerator'

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
        constructor(props) {
            super(props)
            this.state = {
                ctrlPressed: false,
                shiftPressed: false
            }
        }
        componentDidMount() {
            const { clientId, attributes: { sourceOfCopiedStyle } } = this.props
            document.addEventListener('mousedown', this.handleClickOutside)
            if (sourceOfCopiedStyle) {
                let qubelyCopiedStyles = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
                qubelyCopiedStyles.copiedFrom = clientId
                localStorage.setItem('qubelyCopiedStyles', JSON.stringify(qubelyCopiedStyles))
            }
        }

        componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
        renderContextMenu = () => {
            const { clientId, attributes: { sourceOfCopiedStyle } } = this.props
            let qubelyCopiedStyles = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
            return (
                <div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
                    <div className="qubely-context-menu">
                        <div className="qubely-context-menu-group">
                            <div className="qubely-context-menu-item qubely-context-menu-item-copy" onClick={() => this.copyStyles()} >
                                <div class="qubely-context-menu-item-icon"> <i className="fas fa-copy"></i></div>
                                <div class="qubely-context-menu-item-title">Copy Style</div>
                                <div class="qubely-context-menu-item-shortcut">⌘+⇧+C</div>
                            </div>
                            <div className={`qubely-context-menu-item qubely-context-menu-item-paste disable-${sourceOfCopiedStyle}`} onClick={() => this.pasteStyle()} aria-disabled={sourceOfCopiedStyle} >
                                <div class="qubely-context-menu-item-icon"> <i className="fas fa-paste"></i></div>
                                <div class="qubely-context-menu-item-title">Paste Style</div>
                                <div class="qubely-context-menu-item-shortcut">⌘+⇧+V</div>
                            </div>
                        </div>
                        <div className="qubely-context-menu-group">
                            <div className="qubely-context-menu-item qubely-context-menu-item-delete" onClick={() => this.removePricingCard()} >
                                <div class="qubely-context-menu-item-icon"> <i className="fas fa-trash"></i></div>
                                <div class="qubely-context-menu-item-title">Delete</div>
                                <div class="qubely-context-menu-item-shortcut">⌦</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        handleClickOutside = (event) => {
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
            const { setAttributes, clientId, attributes: { id } } = this.props
            const editorSelector = select('core/editor')
            const { updateBlockAttributes } = dispatch('core/editor')
            let copiedAttributes = JSON.parse(JSON.stringify(editorSelector.getBlockAttributes(clientId)))

            delete copiedAttributes.uniqueId
            delete copiedAttributes.sourceOfCopiedStyle
            delete copiedAttributes.title
            delete copiedAttributes.subTitle
            delete copiedAttributes.price
            delete copiedAttributes.blockFeatures
            delete copiedAttributes.id
            delete copiedAttributes.pricingCards
            delete copiedAttributes.enableSubTitle
            delete copiedAttributes.enableDuration
            delete copiedAttributes.enableFeatures
            delete copiedAttributes.enableBadge
            delete copiedAttributes.enablePostButtonText

            let qubelyCopiedStyles = {
                copiedFrom: clientId,
                copiedStyles: copiedAttributes
            }
            let existingCopiedStyle = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
            let clientIdOfCopiedStyle = existingCopiedStyle && existingCopiedStyle.copiedFrom
            existingCopiedStyle && updateBlockAttributes(clientIdOfCopiedStyle, { sourceOfCopiedStyle: false })
            localStorage.setItem('qubelyCopiedStyles', JSON.stringify(qubelyCopiedStyles))
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
        removePricingCard = () => {
            const { clientId } = this.props
            const { removeBlock } = dispatch('core/editor')
            removeBlock(clientId)
        }
        handleKeyDown = (event) => {
            const { ctrlPressed, shiftPressed } = this.state
            if (event.keyCode == 91) {
                this.setState({ ctrlPressed: true })
            } else if (ctrlPressed && event.keyCode == 16) {
                this.setState({ shiftPressed: true })
            } else if (ctrlPressed && shiftPressed && event.keyCode == 67) {
                event.preventDefault()
                this.copyStyles()
            } else if (ctrlPressed && shiftPressed && event.keyCode == 86) {
                event.preventDefault()
                this.pasteStyle()
            }
        }
        handleKeyUp = (event) => {
            event.keyCode == 91 && this.setState({ altPressed: false })
            event.keyCode == 16 && this.setState({ altPressed: false })
        }
        render() {
            const { isSelected, setAttributes, name, attributes: { uniqueId, showContextMenu } } = this.props
            let type = name.split("/")[0]
            let blockName = name.split("/")[1]
            if (uniqueId) { CssGenerator(this.props.attributes, blockName, uniqueId); }
            let PluginBlockSettingsMenuItem = wp.editPost.PluginBlockSettingsMenuItem;
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
                                <PluginBlockSettingsMenuItem
                                    icon={icons.paste}
                                    label={__(`Paste Style`)}
                                    onClick={() => this.pasteStyle()} />
                            </Fragment>
                        }
                        <div className={`qubely-${blockName}-block`}
                            onContextMenu={event => this.handleContextMenu(event)}
                            onKeyDown={event => this.handleKeyDown(event)}
                            onKeyUp={event => this.handleKeyUp(event)}
                        >
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

