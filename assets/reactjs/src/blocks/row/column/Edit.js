
const { __ } = wp.i18n;
const { PanelBody, Toolbar, ResizableBox, IconButton } = wp.components
const { Component, Fragment } = wp.element
const { InnerBlocks, InspectorControls, BlockControls } = wp.blockEditor
const { createBlock } = wp.blocks
const { select, dispatch } = wp.data

const { Background, Border, BorderRadius, BoxShadow, Range, Separator, Dimension, gloalSettings: { globalSettingsPanel, animationSettings }, CssGenerator: { CssGenerator } } = wp.qubelyComponents

$ = jQuery;
class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            colWidth: { md: 0, sm: 0, xs: 0, device: 'md' },
            nextColWidth: { md: 0, sm: 0, xs: 0, device: 'md' },
            prevColWidth: { md: 0, sm: 0, xs: 0, device: 'md' },
            rowWidth: 0,
            absWidth: 0,
            maxResizeWidth: 0,
            maxWidth: 999999999,
            isHover: false,
            resizing: false,
            blockIndex: null,
            responsiveDevice: 'md',
            colWidthMax: 85
        };
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
        this.updateColumnWidthAttribute();
    }

    /**
     * Update css and column width on initial render
     * Collect the nextColumnClientId and prevColumnClientId for better UX
     */
    updateColumnWidthAttribute() {
        const { attributes: { colWidth }, clientId } = this.props
        const { getPreviousBlockClientId, getNextBlockClientId } = select('core/block-editor')
        const currentColumn = $(`#block-${clientId}`)
        const rowWidth = currentColumn.parents('.qubely-backend-row').width()
        const nextBlockId = getNextBlockClientId(clientId)
        const prevBlockId = getPreviousBlockClientId(clientId)
        currentColumn.css({ width: colWidth.md + '%' })
        this.setState({ rowWidth, nextBlockId, prevBlockId, maxResizeWidth: rowWidth, colWidth: { ...colWidth, device: 'md' } })
    }

    /**
     * 
     * @param {object} event 
     * @param {string} direction 
     * @param {dom} elt 
     * On Resize start get the previous|next column width
     * Calculate current column resize box based on row/parent element width
     * 
     * Set resizebox maxWidth by (next|prev+current) colum width 
     */
    onResizeStartEvent(event, direction, elt) {
        let { toggleSelection, clientId, setAttributes } = this.props
        const { rowWidth, nextColWidth, prevColWidth } = this.state
        toggleSelection(false)

        const editorSelector = select('core/block-editor')
        const colWidth = editorSelector.getBlockAttributes(clientId).colWidth
        const nextBlockClientId = editorSelector.getNextBlockClientId(clientId)
        const prevBlockClientId = editorSelector.getPreviousBlockClientId(clientId)


        if (nextBlockClientId !== null) {
            nextColWidth.md = parseFloat(editorSelector.getBlockAttributes(nextBlockClientId).colWidth.md)
        }

        if (prevBlockClientId !== null) {
            prevColWidth.md = parseFloat(editorSelector.getBlockAttributes(prevBlockClientId).colWidth.md)
        }
        let maxResizeWidth = 0
        if (direction === 'right' && nextBlockClientId !== null) {
            let resizeNextColWidth = ((nextColWidth.md / 100) * rowWidth) - 100
            let resizeCurrenColWidth = (colWidth.md / 100) * rowWidth
            maxResizeWidth = resizeNextColWidth + resizeCurrenColWidth
        }
        if (direction === 'left' && prevBlockClientId !== null) {
            let resizePrevColWidth = ((prevColWidth.md / 100) * rowWidth) - 100
            let resizeCurrenColWidth = (colWidth.md / 100) * rowWidth
            maxResizeWidth = resizePrevColWidth + resizeCurrenColWidth
        }
        // Every time select resize hanlder set the width
        setAttributes({ colWidth })
        const clmRect = document.getElementById(`block-${clientId}`).getBoundingClientRect()
        this.setState({ colWidth: colWidth, prevColWidth, nextColWidth, maxResizeWidth, resizing: true, absWidth: clmRect.width })
    }

    /**
     * 
     * @param {object} event 
     * @param {string} direction 
     * @param {dom} elt 
     * @param {string} delta 
     * 
     * Update column and resize box width onResize
     * 
     * If direction is Right then update next and current column width 
     * Calculate column width by (next+current)/100
     * 
     * If directin is left then update prev and current column width
     * Calculate colum width by (prev+current)/100 
     * 
     */
    onResize(event, direction, elt, delta) {
        const { colWidth, nextColWidth, rowWidth, absWidth } = this.state
        const { clientId, setAttributes } = this.props
        const currentcolumnId = $(`#block-${clientId}`)
        const NextColumn = currentcolumnId.next();
        let currentBlockWidth = absWidth + (delta.width);
        let calWidth = (currentBlockWidth / rowWidth) * 100;
        let diff = parseFloat(colWidth.md) - calWidth;

        let nextBlockWidth = 0
        // If direction right then update next and current column
        if (direction === 'right') {
            if (NextColumn.length > 0) {
                nextBlockWidth = parseFloat(nextColWidth.md) + diff;
                if (nextBlockWidth > 10 && calWidth > 10) {
                    nextBlockWidth = Math.abs(nextBlockWidth)
                    NextColumn.css({ width: nextBlockWidth.toFixed(2) + '%' })
                    const editorSelector = select('core/block-editor')
                    const nextBlockClientId = editorSelector.getNextBlockClientId(clientId)
                    if (nextBlockClientId !== null) {
                        const nextBlock = editorSelector.getBlock(nextBlockClientId)
                        nextBlock.attributes.colWidth.md = nextBlockWidth.toFixed(2)
                    }
                }
            }
        }
        currentcolumnId.find('.components-resizable-box__container').css({ width: 'auto' })
        if (nextBlockWidth > 10 && calWidth > 10) {
            currentcolumnId.css({ width: calWidth.toFixed(2) + '%' })
            setAttributes({ colWidth: { ...colWidth, md: calWidth.toFixed(2) } })
        }
    }

    onResizeStop(event, direction, elt, delta) {
        const { toggleSelection } = this.props
        toggleSelection(true);
        this.setState({ resizing: false })
    }

    /**
         * Updates the column count, including necessary revisions to child Column
         *
         * @param {string} updateType operation type 'add' || 'delete'
         */
    updateColumns(updateType) {

        const { clientId } = this.props
        const { getBlockRootClientId, getBlock, getBlocks, getBlockIndex } = select('core/block-editor')
        const { replaceInnerBlocks, updateBlockAttributes } = dispatch('core/block-editor')

        const rootClientId = getBlockRootClientId(clientId)
        const rootBlock = getBlock(rootClientId)
        const selectedBlockIndex = getBlockIndex(clientId, rootClientId)
        const columns = updateType === 'add' ? rootBlock.attributes.columns + 1 : rootBlock.attributes.columns - 1
        const columnFixedWidth = parseFloat((100 / columns).toFixed(3))
        const equalWidth = { ...this.state.colWidth, ...{ md: columnFixedWidth, sm: 100, xs: 100 } }

        let innerBlocks = [...getBlocks(rootClientId)]
        if (updateType === 'delete') {
            innerBlocks.splice(selectedBlockIndex, 1)
        } else {
            innerBlocks.splice(selectedBlockIndex + 1, 0, createBlock('qubely/column', { colWidth: equalWidth }))
        }

        replaceInnerBlocks(rootClientId, innerBlocks, false);

        updateBlockAttributes(rootClientId, Object.assign(rootBlock.attributes, { columns: columns }))

        getBlocks(rootClientId).forEach(block => {
            updateBlockAttributes(block.clientId, Object.assign(block.attributes, { colWidth: { ...equalWidth } }))
            $(`#block-${block.clientId}`).css({ width: equalWidth.md + '%' }) //update next block width
        })
    }


    /**
     * Check current row columns status 
     * Return an object with column attributes and status
     */
    checkColumnStatus() {
        const { clientId } = this.props
        const { getBlockRootClientId, getBlockAttributes, getPreviousBlockClientId, getNextBlockClientId, getBlockIndex, getBlock } = select('core/block-editor')
        const rootClientId = getBlockRootClientId(clientId)
        const rootBlockAttributes = getBlockAttributes(rootClientId)
        const nextBlockId = getNextBlockClientId(clientId)
        const prevBlockId = getPreviousBlockClientId(clientId)
        const blockIndex = getBlockIndex(clientId, rootClientId)

        return { columns: rootBlockAttributes.columns, nextBlockId, prevBlockId, blockIndex }
    }


    _isActiveRow() {
        const rootClientId = select('core/block-editor').getBlockRootClientId(this.props.clientId)
        const selected = select('core/block-editor').getSelectedBlock()
        if (selected && rootClientId && selected.clientId) {
            return rootClientId == selected.clientId ? true : false
        } else {
            return false
        }
    }


    updateColumnWidth(colWidth) {
        const { clientId, setAttributes, attributes } = this.props
        this.setState({ colWidthMax: colWidth.device === 'md' ? 85 : 100, responsiveDevice: colWidth.device })
        if (colWidth.device && colWidth.device !== 'md') {
            setAttributes({ colWidth: { ...colWidth } })
            return;
        }
        if (colWidth.md < 10) {
            return;
        }
        const currentcolumnId = $(`#block-${clientId}`)
        const NextColumn = currentcolumnId.next();
        const PrevColumn = currentcolumnId.prev();
        let calWidth = parseFloat(colWidth.md)
        let different = calWidth - parseFloat(attributes.colWidth.md)
        // If direction right then update next and current column

        const { getPreviousBlockClientId, getNextBlockClientId, getBlock } = select('core/block-editor')
        const { updateBlockAttributes } = dispatch('core/block-editor')
        let nextColumnNewWidth = 0
        if (NextColumn.length > 0) {
            const nextBlockClientId = getNextBlockClientId(clientId)
            if (nextBlockClientId !== null) {
                const nextBlock = getBlock(nextBlockClientId)
                nextColumnNewWidth = { ...nextBlock.attributes.colWidth }
                nextColumnNewWidth.md = parseFloat(nextColumnNewWidth.md) - different
                if (nextColumnNewWidth.md > 10 && calWidth > 10) {
                    NextColumn.css({ width: nextColumnNewWidth.md + '%' })
                    updateBlockAttributes(nextBlockClientId, Object.assign(nextBlock.attributes, { colWidth: { ...nextColumnNewWidth } }))
                }
            }


        } else if (PrevColumn.length > 0) {
            // If direction left then update prev and current column
            const prevBlockClientId = getPreviousBlockClientId(clientId)
            if (prevBlockClientId !== null) {
                const prevBlock = getBlock(prevBlockClientId)
                let prevColumnNewWidth = { ...prevBlock.attributes.colWidth }
                prevColumnNewWidth.md = parseFloat(prevColumnNewWidth.md) - different //calWidth > 0 ? calWidth-parseFloat(prevColWidth.md) : parseFloat(prevColWidth.md)-calWidth
                PrevColumn.css({ width: prevColumnNewWidth.md + '%' })
                updateBlockAttributes(prevBlockClientId, Object.assign(prevBlock.attributes, { colWidth: { ...prevColumnNewWidth } }))
            }
        }
        if (nextColumnNewWidth.md > 10 && calWidth > 10) {
            const newWidth = Math.abs(calWidth)
            currentcolumnId.css({ width: newWidth + '%' })
            setAttributes({ colWidth: { ...colWidth } })
        }

    }

    componentWillReceiveProps(nextProps) {
        document.getElementById("block-" + this.props.clientId).style.alignSelf = nextProps.attributes.position
    }


    render() {
        const {
            attributes: {
                uniqueId,
                colWidth,
                padding,
                margin,
                colBg,
                colBorder,
                colRadius,
                colShadow,
                corner,
                borderRadius,
                //animation
                animation,
                //global
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss
            },
            setAttributes,
            isSelected,
            clientId
        } = this.props
        
        const { rowWidth, resizing, responsiveDevice } = this.state
        const { columns, nextBlockId, blockIndex } = this.checkColumnStatus()

        let resigingClass = 'qubely-column-resizer'
        if (nextBlockId !== null && isSelected) {
            resigingClass += ' is-selected-column'
        }
        if (resizing) {
            resigingClass += ' is-resizing'
        }
        if (uniqueId) { CssGenerator(this.props.attributes, 'column', uniqueId); }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody initialOpen={false} title={__('Dimension')}>
                        <div className={columns === (blockIndex + 1) && responsiveDevice === 'md' ? 'qubely-mb-20 disable-slide' : 'qubely-mb-20'}>
                            <Range label={__('Width')} value={colWidth} onChange={val => this.updateColumnWidth(val)} min={15} max={this.state.colWidthMax} unit={['%']} responsive device={this.state.responsiveDevice} />
                        </div>
                        <Dimension
                            label={__('Padding')}
                            value={padding}
                            onChange={val => setAttributes({ padding: val })}
                            min={0}
                            max={600}
                            unit={['px', 'em', '%']}
                            responsive
                            device={this.state.responsiveDevice}
                            onDeviceChange={value => this.setState({ responsiveDevice: value })}
                        />

                        <Dimension
                            label={__('Margin')}
                            value={margin}
                            onChange={val => setAttributes({ margin: val })}
                            min={-600}
                            max={600}
                            unit={['px', 'em', '%']}
                            responsive
                            device={this.state.responsiveDevice}
                            onDeviceChange={value => this.setState({ responsiveDevice: value })}
                        />
                    </PanelBody>
                    <PanelBody initialOpen={false} title={__('Design')}>
                        <Background label={__('Background')} sources={['image', 'gradient']} value={colBg} onChange={val => setAttributes({ colBg: val })} />
                        <Separator />
                        <Border label={__('Border')} value={colBorder} onChange={val => setAttributes({ colBorder: val })} min={0} max={10} />
                        <Separator />
                        <BoxShadow label={__('Box-Shadow')} value={colShadow} onChange={val => setAttributes({ colShadow: val })} />
                        <Separator />
                        <BorderRadius label={__('Radius')} value={borderRadius} onChange={val => setAttributes({ borderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={this.state.responsiveDevice} onDeviceChange={value => this.setState({ responsiveDevice: value })} />
                    </PanelBody>

                    {animationSettings(uniqueId, animation, setAttributes)}

                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        {columns < 6 &&
                            <IconButton
                                className="components-icon-button components-toolbar__control"
                                label={__('Add Column')}
                                onClick={() => this.updateColumns('add')}
                                icon="plus"
                            />
                        }
                        {columns > 1 &&
                            <IconButton
                                className="components-icon-button components-toolbar__control"
                                label={__('Delete Column')}
                                onClick={() => this.updateColumns('delete')}
                                icon="trash"
                            />
                        }
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                {rowWidth !== 0 &&
                    <ResizableBox
                        className={resigingClass}
                        style={{}}
                        size={{}}
                        maxWidth={this.state.maxWidth}
                        enable={{
                            top: false,
                            right: true,
                            bottom: false,
                            left: false,
                            topRight: false,
                            bottomRight: false,
                            bottomLeft: false,
                            topLeft: false,
                        }}
                        minHeight="10"
                        onResize={(event, direction, elt, delta) => this.onResize(event, direction, elt, delta)}
                        onResizeStop={(event, direction, elt, delta) => this.onResizeStop(event, direction, elt, delta)}
                        onResizeStart={(event, direction, elt) => this.onResizeStartEvent(event, direction, elt)} >

                        <div className={`qubely-column qubely-column-admin qubely-block-${uniqueId}`} data-column-width={this.props.attributes.colWidth.md}>
                            <div className={`qubely-column-inner`}>
                                <InnerBlocks templateLock={false} />
                            </div>
                        </div>
                    </ResizableBox>
                }
            </Fragment>
        )
    }
}

export default Edit;