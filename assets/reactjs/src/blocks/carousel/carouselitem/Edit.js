const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element
const { InnerBlocks } = wp.editor

class Edit extends Component {
    constructor(){
        super()
        this.state = {
            activeItem: false
        }
    }

    onDeleteItem(event){
    let { rootBlock, block, clientId, updateBlockAttributes, removeBlock } = this.props
        const selectedBlockIndex = this.props.getIndex(clientId, rootBlock.clientId)
        let innerBlocks = rootBlock.innerBlocks
        innerBlocks.splice(selectedBlockIndex, 1)
        let slider_items = [...rootBlock.attributes.slider_items]
        slider_items.splice(selectedBlockIndex, 1)
        updateBlockAttributes(rootBlock.clientId, Object.assign(rootBlock.attributes, { slider_items: slider_items }))
        removeBlock(block.clientId);
        if( slider_items.length === 0 ){
            removeBlock(rootBlock.clientId)
        }
    }

    render() {
        return (
            <div 
                className="qubely-slider-item-edit-mode" 
                onMouseEnter={() => this.setState({ activeItem: true })}
                onMouseLeave={() => this.setState({ activeItem: false })}
            >
                {this.state.activeItem && <span onClick={this.onDeleteItem.bind(this)} className="qubely-delete-slider-item"><i className="fas fa-trash"></i></span> }
                <InnerBlocks
                    templateLock={false}
                />
            </div>
        )
    }
}

export default compose([
    withSelect((select, ownProps) => {
        const { clientId } = ownProps;
        const { getBlockHierarchyRootClientId, getBlock } = select('core/editor');
        const { getBlockIndex } = select('core/block-editor')
        return {
            block: getBlock(clientId),
            getIndex: (clientId, rootClientId) => getBlockIndex(clientId, rootClientId),
            rootBlock: clientId ? getBlock(getBlockHierarchyRootClientId(clientId)) : null,
        };
    }),
    withDispatch((dispatch) => {
        const { removeBlock, replaceInnerBlocks, updateBlockAttributes } = dispatch('core/block-editor');
        return {
            removeBlock,
            replaceInnerBlocks,
            updateBlockAttributes
        };
    }),
])(Edit)