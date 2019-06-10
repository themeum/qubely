import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('qubely/buttongroup', {
    title: __('Button Group'),
    description: 'Bunch together a group of useful buttons with Qubely Button Group.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-button-group.svg'} alt={__('Button Block')} />,
    supports: { align: false },
    keywords: [__('button'), __('link'), __('button group')],
    attributes: {
        uniqueId: { type: 'string', default: '' },
        buttons: { type: 'number', default: 2 },
        spacing: {
            type: 'object',
            default: { unit: "px", md: "5" },
            style: [{ selector: '{{QUBELY}} .qubely-block-button-group {margin: 0 -{{spacing}};} {{QUBELY}} .qubely-block-button-group .wp-block.qubely-group-button {margin: 0 {{spacing}};} {{QUBELY}} .qubely-block-button-group >div {margin: 0 calc(14px + {{spacing}});}' }]
        },
        padding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: { md: 0 },
                unit: 'px'
            },
            style: [{ selector: '{{QUBELY}} .qubely-block-button-group' }]
        },
    },
    edit: Edit,
    save: Save,
});