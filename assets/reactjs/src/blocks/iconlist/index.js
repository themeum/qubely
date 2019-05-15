import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('qubely/iconlist', {
    title: __('Icon List'),
    description: __('Include attractive icon lists with Qubely Icon List.'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-icon-list.svg'} alt={__('Icon List')} />,
    keywords: [__('icon', 'list', 'icon list')],
    attributes: {
        uniqueId: { type: 'string', default: '' },
        listStyle: { type: 'string', default: 'ordered' },
        ordered: { type: 'boolean', default: false, },
        alignment: {
            type: 'object', default: {md: 'left'},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-icon-list {text-align: {{alignment}};}'
                }
            ]
        },
        
        layout: { type: 'string', default: 'classic' },

        listItems: {
            type: 'array',
            default: [
                {
                    icon: 'far fa-star',
                    text: 'Add beautiful icons and text to this block'
                },
                {
                    icon: 'far fa-heart',
                    text: 'Set icon color for normal and hover state'
                },
                {
                    icon: 'fas fa-check',
                    text: 'Manage space between icon and the text'
                },
                {
                    icon: 'fas fa-burn',
                    text: 'Choose a desired layout from the list'
                },
            ]
        },

        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },


        typography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li' }] },
        iconSize: {
            type: 'string',
            default: '16px',
            style: [
                {
                    condition: [
                        { key: 'iconSize', relation: '!=', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {font-size: {{iconSize}};}'
                }
            ]
        },
        iconSizeCustom: {
            type: 'object', default: { md: 16, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'iconSize', relation: '==', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {font-size: {{iconSizeCustom}};}'
                }
            ]
        },
        iconPosition: { type: 'string', default: 'left' },
        iconSpacing: {
            type: 'object', default: { md: 10, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'iconPosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {margin-right: {{iconSpacing}};}'
                },
                {
                    condition: [
                        { key: 'iconPosition', relation: '==', value: 'right' }
                    ],
                    selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {margin-left: {{iconSpacing}};}'
                }
            ]
        },

        iconColor: { type: 'string', default: '#5D7FEB', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li .qubely-list-item-icon {color: {{iconColor}};}' }] },
        iconHoverColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li:hover .qubely-list-item-icon {color: {{iconHoverColor}};}' }] },


        color: { type: 'string', default: '#333', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li {color: {{color}};}' }] },
        colorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li:hover {color: {{colorHover}};}' }] },
        spacing: { type: 'string', default: '5', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li:not(:last-child) {margin-bottom: {{spacing}}px;}' }] },
        padding: {
            type: 'object',
            default: {
                openPadding:1,
                paddingType:'custom',
                global:{md: '5'},
                custom:{md: '5 10 5 10'},
                unit:'px'
            },
            style: [  { selector: '{{QUBELY}} .qubely-list .qubely-list-li ' }   ]
        },
        background: {
            type: 'string', default: '#f5f5f5',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-list .qubely-list-li {background-color: {{background}};}'
                }
            ]
        },
        backgroundHover: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-list .qubely-list-li:hover {background-color: {{backgroundHover}};}'
                }
            ]
        },

        shadow: { type: 'object', default: { color: '' }, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-list .qubely-list-li' }] },
        shadowHover: { type: 'object', default: { color: '' }, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-list .qubely-list-li:hover' }] },

        border: {
            type: 'object',
            default: {},
            style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li' }]
        },

        borderRadius: {
            type: 'object',
            default: {},
            style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li' }]
        },
        borderColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li:hover {border-bottom-color: {{borderColorHover}};}' }] },

    },
    edit: Edit,
    save: Save,
});
