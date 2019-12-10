import './style.scss'
import Edit from './Edit'
import Save from './Save'
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks


registerBlockType('qubely/pieprogress', {
    title: __('Pie Progress'),
    description: '',
    category: 'qubely',
    icon: 'universal-access-alt',
    keywords: [__('progress'), __('bar'), __('bar progress')],
    example: {
        attributes: {},
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        layout: { type: 'string', default: 'outline' },
        progress: {type: 'string', default: 25 },
        corner: {type: 'string', default: 'unset' },
        enableIcon: {type: 'boolean', default: true },
        iconStyle: {type: 'string', default: 'text' },
        thickness: {type: 'string', default: 12 },
        thicknessBg: {type: 'string', default: 6 },
        size: {type: 'string', default: 150 },
        iconText: { type: 'string', default: 'Text Here' },
        background: {type: 'string', default: '#e9ecef' },
        iconName: { type: 'string', default: 'fas fa-rocket' },
        iconSize: {
            type: 'string', default: 20,
            style: [
                {
                    selector: '{{QUBELY}} span{font-size: {{iconSize}}px }'
                }
            ]
        },
        iconTextColor: {
            type: 'string', default: '#000000',
            style: [
                {
                    selector: '{{QUBELY}} .qubely-progress-inner-text {color: {{iconTextColor}}}'
                }
            ]
        },
        iconTypography: {
            type: 'object',
            default: {
                openTypography: 1,
                size: {
                    md: 16,
                    unit: 'px'
                },
                height: {
                    md: 1.1,
                    unit: 'em'
                }
            },
            style: [
                {
                    // condition: [
                    //     { key: 'layout', relation: '!=', value: 4 },
                    //     { key: 'mediaType', relation: '==', value: 'number' }
                    // ],
                    selector: '{{QUBELY}} .qubely-progress-inner-text'
                }
            ]
        },
        fillColor: { type: 'object', default: {openColor: 1, type: 'color', color: '#007bff', gradient: {}} },
        spacer: { type: 'object', default:{spaceTop: { md: '10', unit: 'px'}, spaceBottom: { md: '10', unit: 'px'}}, style: [{ selector: '{{QUBELY}}' }] },
        ...globalAttributes,
        content: {
            source: 'html',
            selector: 'h2'
        },
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit : Edit,
    save: Save
})
