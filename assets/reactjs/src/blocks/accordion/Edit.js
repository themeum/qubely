const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { IconButton } = wp.components;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const { createBlock } = wp.blocks;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings } } = wp.qubelyComponents
import { accordionItemSettings } from './innerItem';

class AccordionBlock extends Component {

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            // setAttributes({ uniqueId: _client });
        }
    }

    insertAccordionItem() {
        let newBlockAttributes;
        const { clientId, insertBlock, block } = this.props;
        if (block.innerBlocks && block.innerBlocks.length) {
            const lastBlockAttributes = block.innerBlocks[block.innerBlocks.length - 1].attributes;
            const itemNumber = lastBlockAttributes.itemNumber + 1;
            const heading = accordionItemSettings.heading;
            newBlockAttributes = Object.assign({}, lastBlockAttributes, { itemNumber, heading, active: false, defaultText: '' });
        } else {
            newBlockAttributes = accordionItemSettings;
        }
        insertBlock(createBlock('qubely/accordion-item', newBlockAttributes), undefined, clientId);
    }

    getAccordionTemplate = (attributes) => {
        const result = []
        const defaultItems = attributes.defaultItems
        for (let k = 0; k < defaultItems; k++) {
            const content = 'Create stylish call-to-action buttons with Qubely Buttons. Play around with typography, design, border and more. Add animations and personalize it to engage visitors instantly.';
            result.push(['qubely/accordion-item', { itemNumber: k, defaultText: content }]);
        }
        return result
    }

    render() {

        const { name, attributes, isSelectedBlockInRoot, setAttributes, attributes: { uniqueId, className, animation, enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, interaction } } = this.props;

        return (
            <Fragment>

                <InspectorControls>
                    {animationSettings(uniqueId, animation, setAttributes)}
                    {interactionSettings(uniqueId, interaction, setAttributes)}
                </InspectorControls >

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`qubely-block-accordion qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <InnerBlocks
                        template={this.getAccordionTemplate(attributes)}
                        allowedBlocks={['qubely/accordion-item']}
                    />
                </div>

                {
                    isSelectedBlockInRoot && (
                        <div className="qubely-accordion-add-item" >
                            <IconButton
                                icon={'insert'}
                                onClick={() => {
                                    this.insertAccordionItem();
                                }}
                            >
                                {__('Add Accordion Item')}
                            </IconButton>
                        </div>
                    )
                }
            </Fragment >
        );
    }
}

export default compose([
    withSelect((select, ownProps) => {
        const { clientId } = ownProps;
        const { getBlock, isBlockSelected, hasSelectedInnerBlock } = select('core/block-editor');
        return {
            block: getBlock(clientId),
            isSelectedBlockInRoot: isBlockSelected(clientId) || hasSelectedInnerBlock(clientId, true),
        };
    }),
    withDispatch((dispatch) => {
        const { insertBlock, updateBlockAttributes } = dispatch('core/block-editor');
        return {
            insertBlock,
            updateBlockAttributes
        };
    }),
])(AccordionBlock)
