import './style.scss'
import Edit from './Edit'
import Save from './Save'
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks


registerBlockType('qubely/pieprogress', {
    title: __('Pie Progress'),
    description: 'Simple pie progress demo',
    category: 'qubely',
    icon: 'universal-access-alt',
    keywords: [__('progress'), __('bar'), __('bar progress')],
    example: {
        attributes: {},
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        progress: {type: 'string', default: 25 },
        thickness: {type: 'string', default: 12 },
        size: {type: 'string', default: 150 },
        background: {type: 'string', default: '#e9ecef' },
        fillColor: {type: 'string', default: '#007bff' },
        // fillColor: { type: 'object', default: {openColor: 1, type: 'color', color: '#007bff', gradient: {}} },
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
