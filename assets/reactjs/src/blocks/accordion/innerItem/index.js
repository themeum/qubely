import '../style.scss';
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

export const accordionItemSettings = {
    title: __( 'Accordion' ),
    description: 'Display creative collapsible texts with Qubely Accordion.',
    parent: [ 'qubely/accordion' ],
    icon: <img src={qubely_admin.plugin+'assets/img/blocks/block-accordion.svg'} alt={__('Accordion Block')} />,
    category: 'qubely',
    supports: {
        html: false,
        inserter: false,
        reusable: false,
    },
    attributes: {
        uniqueId:{ type: 'string', default: ''},
        itemNumber:{ type: 'number' },
        heading: { type: 'string', default: 'Accordion Item' },
        active: { type: 'boolean', default: false },
        defaultText: { type: 'string', default: '' },
        fillType: { type: 'string', default: 'fill' },
        openFirstItem: { type: 'boolean', default: true },

        // Panel
        panelColor: {
            type:'string',
            default: '#000',
            style: [
                {
                    selector: '{{QUBELY}} .qubely-accordion-panel { color: {{panelColor}}; }'
                }
            ]
        },
        panelColorActive: {
            type:'string',
            default: '#FFF',
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-active .qubely-accordion-panel { color:{{panelColorActive}}; }'
                }
            ]
        },
        panelColorActive2: {
            type:'string',
            default: '#222',
            style: [
                {
                    condition: [
                        { key: 'fillType', relation: '==', value: 'nofill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-active .qubely-accordion-panel { color:{{panelColorActive2}}; }'
                }
            ]
        },
        panelBg: {
            type: 'object',
            default: {
                type: 'color',
                openColor: 1,
                color: '#EEEEEE',
                gradient: {
                    color1: '#EEEEEE',
                    color2: '#e5e5e5',
                    direction: 0,
                    start: 0,
                    stop: 100
                }
            },
            style: [
                {
                    condition:[
                        {key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-panel'
                }
            ]
        },
        panelBgActive: {
            type: 'object',
            default: {
                type: 'color',
                openColor: 1,
                color: '#2476CA',
                gradient: {
                    color1: '#2476CA',
                    color2: '#1A5FA4',
                    direction: 0,
                    start: 0,
                    stop: 100
                }
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-active .qubely-accordion-panel'
                }
            ]
        },
        panelBorder:{
            type: 'object',
            default: {
                borderType: 'global'
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-panel'
                }
            ]
        },
        panelBorderColorActive:{
            type: 'object',
            default: {
                borderType: 'global'
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-active .qubely-accordion-panel {border-color: {{panelBorderColorActive}};}'
                }
            ]
        },
        panelBoxShadow:{
            type: 'object',
            default: {},
            style: [
                {
                    condition:[{ key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{QUBELY}} .qubely-accordion-panel' }
            ]
        },
        panelBoxShadowActive:{
            type: 'object',
            default: {},
            style: [
                {
                    condition:[{ key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{QUBELY}} .qubely-accordion-active .qubely-accordion-panel' }
            ]
        },
        
        typography: {
            type: 'object',
            default: {},
            style: [
                { selector: '{{QUBELY}} .qubely-accordion-panel' }
            ]
        },
        panelPadding:{
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: {
                    md: 15
                },
                unit: 'px'
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-panel'
                }
            ]
        },
        panelBorderRadius:{
            type: 'object',
            default: {
                radiusType: 'global',
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-panel'
                }
            ]
        },
        panelBorderRadiusActive:{
            type: 'object',
            default: {
                radiusType: 'global',
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-active .qubely-accordion-panel'
                }
            ]
        },

        // Body
        bodyBg: {
            type: 'object',
            default: {
                type: 'color',
                openColor: 1,
                color: '#fff',
                gradient: {
                    color1: '#f2f2f2',
                    color2: '#e5e5e5',
                    direction: 0,
                    start: 0,
                    stop: 100
                }
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-body'
                }
            ]
        },
        bodyPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: {
                    md: 15
                },
                unit: 'px'
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-body'
                }
            ]
        },
        bodyPaddingAlt: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'custom',
                custom: {
                    md: '15 0 0 0'
                },
                unit: 'px'
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'nofill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-body'
                }
            ]
        },
        bodyBoxShadow:{ 
            type: 'object',
            default: {},
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-body'
                }
            ]
        },
        
        bodyBorder:{
            type: 'object',
            default: {
                borderType: 'global'
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-body'
                }
            ]
        },
        borderRadius:{
            type: 'object',
            default: {
                radiusType: 'global'
            },
            style: [
                {
                    condition:[
                        { key: 'fillType', relation: '==', value: 'fill' }
                    ],
                    selector: '{{QUBELY}} .qubely-accordion-body'
                }
            ]
        },

        // Panel Icon
        panelIcon: { type: 'string', default: 'fa fa-plus' },
        iconSize: {type: 'string', default: '14px', style: [{ condition:[{ key: 'iconSize', relation: '!=', value: 'custom' }], selector: '{{QUBELY}} .qubely-accordion-panel .qubely-accordion-icon { font-size:{{iconSize}}; }' }] },
        customIconSize: {type: 'string', default: {md: 16, unit: 'px'}, style: [{ condition:[{ key: 'iconSize', relation: '==', value: 'custom' }], selector: '{{QUBELY}} .qubely-accordion-panel .qubely-accordion-icon { font-size:{{customIconSize}}; }' }] },
        iconColor: { type:'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-accordion-panel .qubely-accordion-icon { color:{{iconColor}}; }' }] },
        iconColorActive: { type:'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-accordion-active .qubely-accordion-panel .qubely-accordion-icon { color:{{iconColorActive}}; }' }] },
        iconPosition: {type: 'string', default: 'right'},
        iconSpacing: {type: 'object', default: {md: 10, unit: 'px'}, style: [{ selector: '{{QUBELY}} .qubely-accordion-panel.qubely-icon-position-left .qubely-accordion-icon { margin-right:{{iconSpacing}}; } {{QUBELY}} .qubely-accordion-panel.qubely-icon-position-right .qubely-accordion-icon { margin-left:{{iconSpacing}}; }' }] },

        //Spacing
        spacing: {type: 'object', default: {md: 10, unit: 'px'}, style: [{ selector: '{{QUBELY}} { margin-bottom: calc( {{spacing}} / 2); padding-bottom: calc( {{spacing}} / 2); }' }] },
        spacingBorder: {type: 'string', default: '', style: [{ selector: '{{QUBELY}} { border-bottom: {{spacingBorder}}px solid; }' }] },
        spacingBorderColor: {type: 'string', default: '', style: [{ selector: '{{QUBELY}} { border-bottom-color: {{spacingBorderColor}}; }' }] },
                
    },

    edit: Edit,
    save: Save
};

registerBlockType('qubely/accordion-item', accordionItemSettings);
