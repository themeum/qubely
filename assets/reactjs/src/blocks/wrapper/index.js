import './style.scss'
const { __ } = wp.i18n
import Edit from './Edit'
import Save from './Save';
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/wrapper', {
    title: __('Block Wrapper'),
    description: 'Make Blocks more attractive with Block Wraper.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-wrapper.svg'} alt={__('Icon Block')} />,
    supports: {
        align: ['center', 'wide', 'full'],
        html: false
    },
    keywords: [__('Block'), __('Block Wrapper'), __('Wrapper')],
    example: {
        attributes: {},
        innerBlocks: [
            {
                name: 'qubely/icon',
                attributes: {
                    iconStyle: "fill",
                    name: "fas fa-rocket"
                },
            },
        ],

    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        // Global
        ...globalAttributes,
        spacer: { type: 'object', default: { spaceTop: { md: '0', unit: "px" }, spaceBottom: { md: '0', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },

        bgColor: { type: 'object', default: { openColor: 1, type: "color", color: "#f5f5f5" }, style: [{ selector: '{{QUBELY}} .qubely-block-wrapper-block' }] },
        bgColorHover: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-wrapper-block:hover' }] },

        padding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: { md: '30' },
                custom: { md: '30 30 30 30' },
                unit: 'px'
            },
            style: [{ selector: '{{QUBELY}} .qubely-block-wrapper-block ' }]
        },
        borderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
                global: { md: 4 },
                unit: 'px'
            },
            style: [
                { selector: '{{QUBELY}} .qubely-block-wrapper-block' }
            ]
        },
        border: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-wrapper-block' }] },
        bgBorderColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-wrapper-block:hover {border-color: {{bgBorderColorHover}};}' }] },

        bgShadow: { type: 'object', default: { openShadow: 1, horizontal: 1, vertical: 1, blur: 2, color: 'rgba(0, 0, 0, .2)', spread: 0 }, style: [{ selector: '{{QUBELY}} .qubely-block-wrapper-block' }] },
        bgShadowHover: { type: 'object', default: { color: '' }, style: [{ selector: '{{QUBELY}} .qubely-block-wrapper-block:hover' }] },
    },
    edit: Edit,
    save: Save,
});

