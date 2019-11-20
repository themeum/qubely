
const { __ } = wp.i18n
const { select, dispatch } = wp.data
import '../css/contextmenu.scss'
const { Component } = wp.element

export function handleContextMenu(event, qubelyContextMenu) {
    event.preventDefault()
    const clickX = event.clientX
    const clickY = event.clientY
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const rootW = qubelyContextMenu.offsetWidth
    const rootH = qubelyContextMenu.offsetHeight
    const right = (screenW - clickX) > rootW
    const left = !right
    const top = (screenH - clickY) > rootH
    const bottom = !top
    qubelyContextMenu.style.display = `block`
    if (right) {
        qubelyContextMenu.style.left = `${clickX + 5}px`
    }
    if (left) {
        qubelyContextMenu.style.left = `${clickX - rootW - 5}px`
    }
    if (top) {
        qubelyContextMenu.style.top = `${clickY + 5}px`
    }
    if (bottom) {
        qubelyContextMenu.style.top = `${clickY - rootH - 5}px`
    }
}


export class ContextMenu extends Component {

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

    handleonClickOutside = (event) => {
        const { qubelyContextMenu } = this.props
        if (qubelyContextMenu && !qubelyContextMenu.contains(event.target)) {
            qubelyContextMenu.style.display = `none`
        }
    }
    copyStyles = () => {
        const { setAttributes, clientId, name, qubelyContextMenu } = this.props
        const { updateBlockAttributes } = dispatch('core/block-editor')
        let blockDefaultAttributes = JSON.parse(JSON.stringify(wp.blocks.getBlockType(name))).attributes
        let blockAttributes = select('core/block-editor').getBlockAttributes(clientId)
        let newStyles = { copiedStyles: {} }

        Object.keys(blockDefaultAttributes).forEach(key => {
            if (blockDefaultAttributes[key].hasOwnProperty('style')) {
                newStyles.copiedStyles[key] = JSON.parse(JSON.stringify(blockAttributes[key]))
            } else if (key.toLowerCase() == 'layout' ||key.toLowerCase() == 'style' || key.toLowerCase() == 'filltype' || key == 'iconStyle' || key.toLowerCase() == 'buttonfilltype') {
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

        qubelyContextMenu.style.display = `none`
        setAttributes({ sourceOfCopiedStyle: true })
    }
    pasteStyle = () => {
        const { setAttributes, qubelyContextMenu } = this.props
        let qubelyCopiedStyles = JSON.parse(localStorage.getItem('qubelyCopiedStyles')).copiedStyles
        qubelyContextMenu.style.display = `none`
        setAttributes(qubelyCopiedStyles)
    }

    render() {
        const { name, clientId, attributes: { sourceOfCopiedStyle } } = this.props
        let previouslyCopiedStyle = JSON.parse(localStorage.getItem('qubelyCopiedStyles'))
        return (
            <div className="qubely-context-menu">
                <div className="qubely-context-menu-group">
                    <div className="qubely-context-menu-item qubely-context-menu-item-copy" onClick={() => this.copyStyles()} >
                        <div className={`qubely-context-menu-item-icon`}> <i className="fas fa-copy"/></div>
                        <div className="qubely-context-menu-item-title">{__('Copy Style')}</div>
                    </div>
                    <div className={`qubely-context-menu-item qubely-context-menu-item-paste disable-${previouslyCopiedStyle && previouslyCopiedStyle.blockName == name ? sourceOfCopiedStyle : true}`} onClick={() => this.pasteStyle()} aria-disabled={sourceOfCopiedStyle} >
                        <div className="qubely-context-menu-item-icon"> <i className="fas fa-paste"/></div>
                        <div className="qubely-context-menu-item-title">{__('Paste Style')}</div>
                    </div>
                </div>
                <div className="qubely-context-menu-group">
                    <div className="qubely-context-menu-item qubely-context-menu-item-delete" onClick={() => dispatch('core/block-editor').removeBlock(clientId)} >
                        <div className="qubely-context-menu-item-icon"> <i className="fas fa-trash"/></div>
                        <div className="qubely-context-menu-item-title">{__('Delete')}</div>
                        <div className="qubely-context-menu-item-shortcut">⌦</div>
                    </div>
                </div>
            </div>
        )

    }
}
