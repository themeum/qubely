
import Save from './Save'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('qubely/carouselitem', {
    title: __('Carousel Item'),
    category: 'qubely',
    parent: ['qubely/carousel'],
    supports: {
        html: false,
        inserter: false,
        reusable: false,
    },
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-tabs.svg'} alt={__('Carousel Item')} />,
    attributes: {
        uniqueId: { type: 'string', default: '' },
        id: { type: 'number', default: 1, },
        customClassName: { type: 'string', default: '' }
    },
    getEditWrapperProps(attributes) {
        const { id, customClassName } = attributes
        return { 'data-carouselitem': id, className: `wp-block editor-block-list__block ${customClassName}${id === 1 ? ' qubely-active' : ''}` }
    },
    edit: Edit,
    save: Save
})