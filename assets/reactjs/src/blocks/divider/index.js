import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType ( 'qubely/divider', {
    title: __( 'Divider' ),
    description: 'Use beautiful pre-designed dividers with Qubely Divider.',
	icon: <img src={qubely_admin.plugin+'assets/img/blocks/block-divider.svg'} alt={__('Divider Block')}/>,
    category: 'qubely',
    keywords: [ __( 'Divider' ), __( 'Separator' ) ],
    example: {
        attributes: {},
    },
    attributes: {
        uniqueId:{ type: 'string', default: '' }, 
        ...globalAttributes,
		spacer: { type: 'object', default:{spaceTop: { md: '10', unit: "px"}, spaceBottom: { md: '10', unit: "px"}}, style: [{ selector: '{{QUBELY}}' }] },
        style: { type: 'string', default: 'slash' },
		color: { type: 'string', default: '#252525', style: [{ selector: '{{QUBELY}} .qubely-block-divider > div { border-top-color: {{color}}; } {{QUBELY}} .qubely-block-divider path { fill: {{color}}; } {{QUBELY}} .qubely-block-divider circle { stroke: {{color}}; }  {{QUBELY}} .qubely-block-divider ellipse { stroke: {{color}}; fill: {{color}}; }' }] },
		height: { type: 'object', default: {md: '2', unit: 'px'}, style: [{ selector: '{{QUBELY}} .qubely-block-divider > div { border-top-width: {{height}};}' }] }, 
		width: { type: 'object', default: {md: '280', unit: 'px'}, style: [{ selector: '{{QUBELY}} .qubely-block-divider > div { width: {{width}};} {{QUBELY}} .qubely-block-divider svg { width: {{width}};}' }] },
		alignment: { type: 'object', default: {md: 'center'}, style: [{ selector: '{{QUBELY}} .qubely-block-divider {text-align: {{alignment}};}' }]},
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit: Edit,
    save: Save,
});
