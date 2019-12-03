import './style.scss'
import Edit from './Edit'
import Save from './Save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks


registerBlockType('qubely/pieprogress', {
    title: __('Pie Progress'),
    description: 'Simple pie progress demo',
    category: 'qubely',
    icon: 'universal-access-alt',
    example: {},
    attributes: {
        content: {
            source: 'html',
            selector: 'h2'
        }
    },
    edit : Edit,
    save: Save
})
