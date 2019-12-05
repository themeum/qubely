import './style.scss'
import Edit from './Edit'
import Save from './Save'

const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents


registerBlockType( 'qubely/animatedheadline', {
    title: __('Animated Headline'),
    description: '', //@TODO: _QUBELY Description
    category: 'qubely',
    icon: 'dashicons-universal-access',
    keywords: [__('headline'), __('animated'), __('heading'), __('title')],
    example: {
        attributes: {},
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        ...globalAttributes,  // Global Settings
        spacer: { type: 'object', default:{spaceTop: { md: '10', unit: 'px'}, spaceBottom: { md: '10', unit: 'px'}}, style: [{ selector: '{{QUBELY}}' }] },
        animatedText: { type: 'object', default: ['Apple', 'Banana', 'Orange'] },
        titleBefore: {
            type: 'string',
            default: __('Before Text')
        },
        titleAfter: {
            type: 'string',
            default: __('After Text')
        }
    },
    edit: Edit,
    save: Save
})
