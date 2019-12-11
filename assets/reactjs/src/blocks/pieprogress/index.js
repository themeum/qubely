import './style.scss'
import Edit from './Edit'
import Save from './Save'
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

//
// enableHeading,
//     heading,
//     headingColor,
//     headingPosition,
//     headingTypography,
//
//
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
        alignment: {
            type: 'string',
            value: 'flex-start',
            style: [
                {
                    selector: '{{QUBELY}} {align-items: {{alignment}}}'
                }
            ]
        },
        progress: {type: 'string', default: 25 },
        corner: {type: 'string', default: 'unset' },
        enableIcon: {type: 'boolean', default: true },
        iconStyle: {type: 'string', default: 'icon' },
        thickness: {type: 'string', default: 12 },
        thicknessBg: {type: 'string', default: 6 },
        fillColor: { type: 'object', default: {openColor: 1, type: 'color', color: '#007bff', gradient: {}} },
        size: {
            type: 'string',
            default: 250 ,
            style: [
                {
                    selector: '{{QUBELY}} .qubely-progress-parent, {{QUBELY}} .qubely-pie-progress-heading.qubely-outside{width: {{size}}px}'
                }
            ]
        },
        iconText: { type: 'string', default: 'Text Here' },
        background: {type: 'string', default: '#e9ecef' },
        iconName: { type: 'string', default: 'fas fa-rocket' },
        image: { type: 'object', default: {} },
        imageAlt: {type: 'string', default: ''},
        imageSize: {
            type: 'object',
            default: {
                md: '80',
                unit: 'px',
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-progress-inner-text .icon-image:not(.pie-placeholder){ max-width: {{imageSize}} }'
                }
            ]
        },
        iconSize: {
            type: 'string', default: 60,
            style: [
                {
                    condition: [
                        { key: 'iconStyle', relation: '==', value: 'icon' },
                    ],
                    selector: '{{QUBELY}} span.qubely-pie-icon{font-size: {{iconSize}}px }'
                }
            ]
        },
        iconTextColor: {
            type: 'string', default: '#222222',
            style: [
                {
                    condition: [
                        { key: 'iconStyle', relation: '!=', value: 'image' },
                    ],
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
                    condition: [
                        { key: 'enableIcon', relation: '==', value: true },
                        { key: 'iconStyle', relation: '!=', value: 'image' },
                    ],
                    selector: '{{QUBELY}} .qubely-progress-inner-text'
                }
            ]
        },
        enableHeading: {type: 'boolean', default: false},
        heading: {type: 'string', default: '' },
        headingColor: {
            type: 'string',
            default: '#222222',
            style: [
                {
                    selector: '{{QUBELY}} .qubely-pie-progress-heading {color: {{headingColor}} }'
                }
            ]
        },
        headingPosition: {type: 'string', default: 'inside'},
        headingSpacing: {
            type: 'string',
            default: 10,
            style: [
                {
                    selector: '{{QUBELY}} .qubely-pie-progress-heading {margin-top: {{headingSpacing}}px}'
                }
            ]
        },
        headingAlignment: {
            type: 'object',
            default: {},
            style: [
                { selector: '{{QUBELY}} .qubely-pie-progress-heading {text-align: {{headingAlignment}}; }' }
            ],
        },
        headingTypography: {
            type: 'object',
            default: {
                openTypography: 1,
                size: {
                    md: 20,
                    unit: 'px'
                },
                height: {
                    md: 1.1,
                    unit: 'em'
                }
            },
            style: [
                {
                    condition: [
                        {
                            key: 'enableHeading', relation: '==', value: true
                        }
                    ],
                    selector: '{{QUBELY}} .qubely-pie-progress-heading'
                }
            ]
         },
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
