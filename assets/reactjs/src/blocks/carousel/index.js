import './style.scss'
import Save from './Save'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('qubely/carousel', {
    title: __('Carousel'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-testimonial.svg'} alt={__('Testimonial Carousel')} />,
    description: __('Beautify your weibsite with wonderful qubely carousel'),
    attributes: {
        uniqueId: { type: 'string', default: '' },
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },
        // navAlignment: { type: 'string', default: 'center' },
        items: { type: 'number', default: 3 },
        showNavigations: { type: 'boolean', default: true },
        autoPlay: { type: 'boolean', default: false },
        autoPlaySpeed: { type: 'string', default: "500" },
        arrowSize: {
            type: 'object', default: { md: 30, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'showNavigations', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-carousel-nav {font-size: {{arrowSize}};}'
                }
            ]
        },
        // showGlobalSettings: { type: 'boolean', default: true },
    },
    edit: Edit,
    save: Save
})