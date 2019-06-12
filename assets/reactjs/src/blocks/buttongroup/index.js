import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('qubely/buttongroup', {
    title: __('Button Group'),
    description: 'Bunch together a group of useful buttons with Qubely Button Group.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-button-group.svg'} alt={__('Button Group Block')} />,
    supports: { align: false },
    keywords: [__('button'), __('link'), __('button group')],
    attributes: {
        uniqueId: { type: 'string', default: '' },
        buttons: { type: 'number', default: 2 },
        alignment: {
            type: 'string', default: 'left',
            style: [
                {
                    condition: [{ key: 'alignment', relation: '==', value: 'center' }],
                    selector: '{{QUBELY}} .qubely-block-button-group {justify-content: center;}'
                },
                {
                    condition: [{ key: 'alignment', relation: '==', value: 'right' }],
                    selector: '{{QUBELY}} .qubely-block-button-group {justify-content: flex-end;}'
                }
            ]
        },
        spacing: {
            type: 'object',
            default: { unit: "px", md: "5" },
            style: [{ selector: '{{QUBELY}} .qubely-block-button-group {margin: 0 -{{spacing}};} {{QUBELY}} .qubely-block-button-group .wp-block.qubely-group-button {margin: 0 {{spacing}};} {{QUBELY}} .qubely-block-button-group >div {margin: 0 calc(14px + {{spacing}});}' }]
        },
        showGlobalSettings: { type: 'boolean', default: true },  // Global Settings
    },
    edit: Edit,
    save: Save,
});