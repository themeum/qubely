import './style.scss'
import Edit from './Edit'
import Save from './Save'
import { attributes } from './attributes';

const { registerBlockType } = wp.blocks
const { __ } = wp.i18n

registerBlockType('qubely/animatedheadline', {
    title: __('Animated Headline'),
    description: '', //@TODO: _QUBELY Description
    category: 'qubely',
    icon: 'dashicons-universal-access',
    keywords: [__('headline'), __('animated'), __('heading'), __('title')],
    example: {
        attributes: {},
    },
    attributes,
    edit: Edit,
    save: Save
})
