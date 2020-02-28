import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { InnerBlocks } = wp.blockEditor
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes }, HelperFunction: { IsInteraction } } = wp.qubelyComponents

const attributes = {
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,
    buttons: { type: 'number', default: 2 },
    alignment: {
        type: 'object',
        default: { md: 'flex-start' },
        style: [
            { selector: '{{QUBELY}} .qubely-block-button-group {justify-content: {{alignment}}; }' }
        ],
    },
    spacing: {
        type: 'object',
        default: {
            unit: "px",
            md: "10"
        },
        style: [
            // { selector: '{{QUBELY}} .qubely-block-button-group {margin: -{{spacing}};} {{QUBELY}} .qubely-block-button-group.qubely-backend .block-editor-block-list__layout > div[data-type="qubely/button"]:not(:nth-last-child(2)), {{QUBELY}} .qubely-block-button-group .wp-block-qubely-button{margin: {{spacing}};}' }
            { selector: '{{QUBELY}} .qubely-block-button-group {margin: -{{spacing}};} {{QUBELY}} .qubely-block-button-group.qubely-backend .block-editor-block-list__layout > div[data-type="qubely/button"], {{QUBELY}} .qubely-block-button-group .wp-block-qubely-button{margin: {{spacing}};}' }
        ]
    }
}

registerBlockType('qubely/buttongroup', {
    title: __('Button Group'),
    description: 'Bunch together a group of useful buttons with Qubely Button Group.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-button-group.svg'} alt={__('Button Group Block')} />,
    supports: {
        align: ['center', 'wide', 'full'],
    },
    keywords: [
        __('button'),
        __('buttons'),
        __('link'),
        __('button group')
    ],
    example: {
        attributes: {
            buttons: 2,
            alignment: {
                md: "center"
            },
            spacing: {
                md: "15",
                unit: "px"
            }
        },

    },
    attributes,
    edit: Edit,
    save: Save,
    deprecated: [
        {
            attributes,
            save(props) {
                const {
                    uniqueId,
                    interaction,
                } = props.attributes
                const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
                return (
                    <div className={`qubely-block-${uniqueId}`}>
                        <div className={`qubely-block-button-group ${interactionClass}`}>
                            <InnerBlocks.Content />
                        </div>
                    </div>
                )
            }
        }
    ]
});