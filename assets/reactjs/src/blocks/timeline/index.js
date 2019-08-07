const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

import './style.scss'

import Edit from './Edit'
import Save from './Save'

registerBlockType('qubely/timeline', {
	title: __('Timeline'),
	icon: 'dashboard',
	category: 'qubely',
	keywords: [
		__('Timeline'),
		__('Content'),
		__('Timeline'),
	],
	attributes: {
		uniqueId: { type: 'string', default: '' },

		timelineContents: {
			type: 'Array',
			default: [
				{ title: 'Qubely Blocks', date: 'January 1, 2019', description: 'So strongly and metaphysically did I conceive of my situation then, that while earnestly watching his motions, I seemed distinctly to perceive that my.' },
				{ title: 'two', date: 'February 1, 2019', description: 'description two' },
				{ title: 'three', date: 'March 1, 2019', description: 'description three' },
				{ title: 'four', date: 'April 1, 2019', description: 'description four' },
				{ title: 'five', date: 'May 1, 2019', description: 'description five' },
			]
		},
		orientation: {
			type: 'string',
			default: 'center'
		},
		
		horizontalSpacing: {
			type: 'object',
			default: {
				md: 70,
				unit: 'px'
			},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-left {padding-right: {{horizontalSpacing}};}{{QUBELY}} .qubely-timeline-right {padding-left: {{horizontalSpacing}};}'
				}
			]
		},
		
		verticalSpacing: {
			type: 'object',
			default: {
				md: 100,
				unit: 'px'
			},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-item:not(:last-child) {margin-bottom: {{verticalSpacing}};}'
				}
			]
		},

		// Content
		enableContentBorder: {
			type: 'boolean',
			default: false
		},

		contentBorderWidth: {
			type: 'object',
			default: {
				md: 1,
				unit: 'px'
			},
			style: [
                {
					condition: [
                        { key: 'enableContentBorder', relation: '==', value: true }
                    ],
					selector: '{{QUBELY}} .qubely-timeline-content {border-style: solid; border-width: {{contentBorderWidth}};}' +
						'{{QUBELY}} .qubely-timeline-left .qubely-timeline-content.qubely-content-has-border:after {top: calc(20px - {{contentBorderWidth}}); border-width: calc(15px + {{contentBorderWidth}}); right: calc(-15px*2 - {{contentBorderWidth}}*2);}' +
						'{{QUBELY}} .qubely-timeline-right .qubely-timeline-content.qubely-content-has-border:after {top: calc(20px - {{contentBorderWidth}}); border-width: calc(15px + {{contentBorderWidth}}); left: calc(-15px*2 - {{contentBorderWidth}}*2);}'
                }
			]
		},
		contentBorderColor: {
			type: 'string',
			default: '#F6F7FB',
			style: [
                {
					condition: [
                        { key: 'enableContentBorder', relation: '==', value: true }
                    ],
					selector: '{{QUBELY}} .qubely-timeline-content {border-color: {{contentBorderColor}};}'+
						'{{QUBELY}} .qubely-timeline-left .qubely-timeline-content.qubely-content-has-border:after {border-color: transparent transparent transparent {{contentBorderColor}};}' +
						'{{QUBELY}} .qubely-timeline-right .qubely-timeline-content.qubely-content-has-border:after {border-color: transparent {{contentBorderColor}} transparent transparent;}'
                }
			]
		},

		contentBg: {
            type: 'string',
            default: '#F9F9F9',
            style: [
                {
					selector: '{{QUBELY}} .qubely-timeline-content {background-color: {{contentBg}};}' +
						'{{QUBELY}} .qubely-timeline-left .qubely-timeline-content:before {border-color: transparent transparent transparent {{contentBg}};}' +
						'{{QUBELY}} .qubely-timeline-right .qubely-timeline-content:before {border-color: transparent {{contentBg}} transparent transparent;}'
				}
            ]
		},

		contentPadding: {
			type: 'object',
			default: {
				openPadding: 1,
				paddingType: 'global',
				unit: 'px',
				global: {
					md: 30
				}
			},
			style: [
                {
                    selector: '{{QUBELY}} .qubely-timeline-content'
                }
            ]
		},

		contentBorderRadius: {
			type: 'object',
			default: {},
			style: [
                {
                    selector: '{{QUBELY}} .qubely-timeline-content'
                }
            ]
		},

		contentBoxShadow: {
			type: 'object',
			default: {
				openShadow: true,
				vertical: 3,
				horizontal: 0,
				blur: 6,
				spread:	0,
				color: 'rgba(0,0,0,0.1)',
			},
			style: [
                {
                    selector: '{{QUBELY}} .qubely-timeline-content'
                }
            ]
		},

		// Heading
		headingLevel: {
			type: 'number',
			default: 4,
		},

		headingTypography: {
			type: 'object',
			default: {},
			style: [
				{ selector: '{{QUBELY}} .qubely-timeline-title' }
			]
		},

		headingColor: {
			type: 'string',
			default: '',
			style: [
				{ selector: '{{QUBELY}} .qubely-timeline-title {color: {{headingColor}};}' }
			]
		},

		headingSpacing: {
			type: 'object',
			default: {
				md: 10,
				unit: 'px'
			},
			style: [
				{ selector: '{{QUBELY}} .qubely-timeline-title {margin: 0 0 {{headingSpacing}} 0;}' }
			]
		},

		// Content
		contentColor: {
			type: 'string',
			default: '',
			style: [
                {
                    selector: '{{QUBELY}} .qubely-timeline-description {color: {{contentColor}};}'
                }
            ]
		},

		contentTypography: {
			type: 'object',
			default: {},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-description'
				}
			]
		},

		// Date Time
		enableDateTime: {
			type: 'boolean',
			default: true
		},

		enableDateTimeTypography: {
			type: 'object',
			default: {},
			style: [
				{
					condition: [
                        { key: 'enableDateTime', relation: '==', value: true }
                    ],
					selector: '{{QUBELY}} .qubely-timeline-date'
				}
			]
		},

		enableDateTimeColor: {
			type: 'string',
			default: '',
			style: [
                {
					condition: [
                        { key: 'enableDateTime', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-timeline-date {color: {{enableDateTimeColor}};}'
                }
            ]
		},

		enableImage: {
			type: 'boolean',
			default: false,
		},
		
		imagePosition: {
			type: 'string',
			default: 'before',
			style: [
                {
					condition: [
                        { key: 'enableImage', relation: '==', value: true },
                        { key: 'imagePosition', relation: '==', value: 'after' },
                    ],
                    selector: '{{QUBELY}} .qubely-timeline-content {display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: reverse; -ms-flex-direction: column-reverse; flex-direction: column-reverse;}'
                }
            ]
		},

		imageHeight: {
			type: 'object',
			default: {},
			style: [
                {
					condition: [
                        { key: 'enableImage', relation: '==', value: true },
                    ],
                    selector: '{{QUBELY}} .qubely-timeline-image-container img {height: {{imageHeight}};}'
                }
            ]
		},
		
		imageBorderRadius: {
			type: 'object',
			default: {},
			style: [
                {
					condition: [
                        { key: 'enableImage', relation: '==', value: true },
                    ],
                    selector: '{{QUBELY}} .qubely-timeline-image-container img'
                }
            ]
		},

		imageSpacing: {
			type: 'object',
			default: {
				md: 20,
				unit: 'px'
			},
			style: [
				{
					condition: [
						{ key: 'enableImage', relation: '==', value: true },
						{ key: 'imagePosition', relation: '==', value: 'before' },
                    ],
                    selector: '{{QUBELY}} .qubely-timeline-image-container {margin-bottom: {{imageSpacing}};}'
                },
                {
					condition: [
						{ key: 'enableImage', relation: '==', value: true },
						{ key: 'imagePosition', relation: '==', value: 'after' },
                    ],
                    selector: '{{QUBELY}} .qubely-timeline-image-container {margin-top: {{imageSpacing}};}'
                }
            ]
		},

		// Connector
		connectorSize: {
			type: 'object',
			default: {
				md: 48,
				unit: 'px'
			},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-connector {width: {{connectorSize}}; height: {{connectorSize}};}' +
						'{{QUBELY}} .qubely-timeline-left .qubely-timeline-connector {right: calc(-{{connectorSize}}/2);}' +
						'{{QUBELY}} .qubely-timeline-right .qubely-timeline-connector {left: calc(-{{connectorSize}}/2);}'
                }
			]
		},

		connectorColor: {
			type: 'string',
			default: '#2184F9',
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-connector {background-color: {{connectorColor}};}'
                }
			]
		},

		connectorBorder: {
			type: 'object',
			default: {},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-connector'
                }
			]
		},

		connectorBorderRadius: {
			type: 'object',
			default: {
				openBorderRadius: 1,
				radiusType: 'global',
				global: {
					md: 50
				},
				unit: 'px',
			},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-connector'
                }
			]
		},

		connectorIcon: {
			type: 'string',
			default: 'far fa-calendar-times'
		},
		
		connectorIconSize: {
			type: 'object',
			default: {
				md: 18,
				unit: 'px'
			},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-connector-icon {font-size: {{connectorIconSize}};}'
                }
			]
		},

		connectorIconColor: {
			type: 'string',
			default: '#fff',
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-connector-icon {color: {{connectorIconColor}};}'
                }
			]
		},

		// Bar
		connectorBarWidth: {
			type: 'object',
			default: {
				md: 6,
				unit: 'px'
			},
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-items:after {width: {{connectorBarWidth}};}'
                }
			]
		},

		connectorBarColor: {
			type: 'string',
			default: '#D2D2D2',
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-items:after {background-color: {{connectorBarColor}};}'
                }
			]
		},

		//
		timelineItems: { type: 'number', default: 5 },
		showGlobalSettings: { type: 'boolean', default: true }, // Global Settings
		showContextMenu: { type: 'boolean', default: true },
	},
	edit: Edit,
	save: Save
});
