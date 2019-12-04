import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/advancedlist', {
    title: __('Advanced List'),
    description: __('Include stylish lists to display in your site with Qubely Advanced List.'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-advanced-list.svg'} alt={__('Advanced List')} />,
    keywords: [__('Advanced', 'list', 'advanced list', 'Advanced List')],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {
            background: '#fff'
        },
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
          // Global
          ...globalAttributes,
        listType: { type: 'string', default: 'unordered' },
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },
        alignment: { type: 'string', default: 'left', style: [{ selector: '{{QUBELY}} .qubely-block-advanced-list {text-align: {{alignment}};}' }] },
        layout: { type: 'string', default: 'fill' },

        listItems: {
            type: 'array',
            default: ['Create advanced list items', 'Options to choose list design', 'Beautiful interaction transitions']
        },

        bulletStyle: { type: 'object', default: { name: 'check-circle-outline', value: 'far fa-check-circle' }, },
        bulletSize: {
            type: 'string', default: '16px',
            style: [
                {
                    condition:
                        [
                            { key: 'bulletSize', relation: '!=', value: 'custom' },
                            { key: 'listType', relation: '==', value: 'unordered' }
                        ],
                    selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after { font-size: {{bulletSize}};}'
                }
            ]
        },
        bulletSizeCustom: { type: 'object', default: { md: 18, unit: 'px' }, style: [{ condition: [{ key: 'bulletSize', relation: '==', value: 'custom' }, { key: 'listType', relation: '==', value: 'unordered' }], selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after { font-size: {{bulletSizeCustom}};}' }] },
        bulletSpacing: {
            type: 'object', default: { md: 10, unit: 'px' },
            style: [
                {
                    condition:
                        [
                            { key: 'alignment', relation: '==', value: 'left' },
                        ],
                    selector: '{{QUBELY}} .qubely-list li::before { margin-right: {{bulletSpacing}};}'
                },
                {
                    condition:
                        [
                            { key: 'alignment', relation: '==', value: 'center' },
                        ],
                    selector: '{{QUBELY}} .qubely-list li::before { margin-right: {{bulletSpacing}};}'
                },
                {
                    condition:
                        [
                            { key: 'alignment', relation: '==', value: 'right' },
                        ],
                    selector: '{{QUBELY}} .qubely-list li::after { margin-left: {{bulletSpacing}};}'
                }
            ]
        },

        bulletColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after {color: {{bulletColor}};}' }] },
        bulletColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-list li:hover::before, {{QUBELY}} .qubely-list li:hover::after {color: {{bulletColorHover}};}' }] },

        useNumberBg: { type: 'boolean', default: true },
        numberFontSize: { type: 'string', default: '14', style: [{ condition: [{ key: 'listType', relation: '==', value: 'ordered' }], selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after { font-size: {{numberFontSize}}px;}' }] },
        numberBgSize: { type: 'string', default: '5', style: [{ condition: [{ key: 'listType', relation: '==', value: 'ordered' }, { key: 'useNumberBg', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after { padding: {{numberBgSize}}px; }' }] },
        numberBg: { type: 'string', default: '#c2e5ff', style: [{ condition: [{ key: 'listType', relation: '==', value: 'ordered' }, { key: 'useNumberBg', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after { background-color: {{numberBg}};}' }] },
        numberBgHover: { type: 'string', default: '', style: [{ condition: [{ key: 'listType', relation: '==', value: 'ordered' }, { key: 'useNumberBg', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-list li:hover::before, {{QUBELY}} .qubely-list li:hover::after { background-color: {{numberBgHover}};}' }] },
        numberCorner: { type: 'string', default: '50', style: [{ condition: [{ key: 'listType', relation: '==', value: 'ordered' }, { key: 'useNumberBg', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after { border-radius: {{numberCorner}}%;}' }] },

        typography: {
            type: 'object',
            default: { openTypography: 1, size: { md: 16, unit: 'px' } },
            style: [
                { selector: '{{QUBELY}} .qubely-list li' },
                { condition: [{ key: 'listType', relation: '==', value: 'ordered' }], selector: '{{QUBELY}} .qubely-list li::before, {{QUBELY}} .qubely-list li::after ' }
            ]
        },
        color: { type: 'string', default: '#333', style: [{ selector: '{{QUBELY}} .qubely-list li {color: {{color}};}' }] },
        colorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-list li:hover {color: {{colorHover}};}' }] },
        spacing: { type: 'object', default: { md: 5, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-list li:not(:last-child) {margin-bottom: {{spacing}};}' }] },

        backgroundSize: { type: 'object', default: { openPadding: 1, paddingType: 'global', global: { md: '10', unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-list li' }] },

        background: { type: 'string', default: '#f5f5f5', style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-list li {background-color: {{background}};}' }] },
        backgroundHover: { type: 'string', default: '', style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-list li:hover {background-color: {{backgroundHover}};}' }] },

        borderRadius: { type: 'object', default: { openBorderRadius: 1, radiusType: 'global' }, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-list li' }] },
        shadow: { type: 'object', default: { color: '' }, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-list li' }] },
        shadowHover: { type: 'object', default: { color: '' }, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-list li:hover' }] },

        border: {
            type: 'object',
            default: {
                color: "#006fbf",
            },
            style: [{ selector: '{{QUBELY}} .qubely-list li' }]
        },
        borderColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-list li:hover {border-bottom-color: {{borderColorHover}};}' }] },

        sourceOfCopiedStyle: { type: 'boolean', default: false } 
    },
    edit: Edit,
    save: Save,
});
