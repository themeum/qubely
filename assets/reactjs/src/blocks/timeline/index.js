const { __ } = wp.i18n
import './style.scss'
import Edit from './Edit'
import Save from './Save'
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/timeline', {
	title: __('Timeline'),
	category: 'qubely',
	description: 'Showcase detailed timelines/roadmaps with Qubely Timeline.',
	icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-timeline.svg'} alt={__('Timeline')} />,
	supports: { 
		align: ['center', 'wide', 'full'],
	},
	keywords: [
		__('Timeline'),
		__('Content'),
		__('Roadmap'),
    ],
    example: {
        attributes: {
            timelineItems: 1,
            orientation:'left',
            enableDateTime:false,
            verticalSpacing: {
                md: 50,
                unit:'px'
            },
            timelineContents: [
                {
                    description: __( 'Make headlines/titles that attract users with Qubely Heading.', 'qubely' )
                },
                {
                    description: __( 'Make headlines/title', 'qubely' )
                }
            ]
        },
    },
	attributes: {
		uniqueId: { type: 'string', default: '' },
		// Global
		...globalAttributes,
		spacer: {
			type: 'object',
			default: {
				spaceTop: {
					md: '10',
					unit: "px"
				},
				spaceBottom: {
					md: '10',
					unit: "px"
				}
			},
			style: [
				{ selector: '{{QUBELY}}' }
			]
		},

		timelineContents: {
			type: 'Array',
			default: [
				{ title: 'Qubely Blocks', date: 'January 1, 2019', description: 'Qubely offers a rich collection of highly customizable dedicated Gutenberg blocks.' },
				{ title: 'Pre-made Sections', date: 'February 1, 2019', description: 'Qubely has a rich library of ready sections that can be imported and used as blocks on the Gutenberg editor.' },
				{ title: 'Rich Blocks Collection', date: 'March 1, 2019', description: 'Get a rich collection of blocks that are highly customizable and easy to use even for the beginners.' },
				{ title: 'Layout Packs', date: 'April 1, 2019', description: 'Qubely gives you many beautiful template layouts completely free of cost. These can also be customized and styled your way.' },
				{ title: 'Smart Layout Builder', date: 'May 1, 2019', description: 'Its row-column structure lets you take 1 to as many as 6 columns in a single row.' },
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
					condition: [
						{ key: 'orientation', relation: '==', value: 'center' }
					],
					selector: '@media (max-width: 767px) { {{QUBELY}} .qubely-timeline-item {padding-left: {{horizontalSpacing}};}}' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-left {padding-right: {{horizontalSpacing}};} }' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-left .qubely-timeline-date-container {padding-left: {{horizontalSpacing}};} }' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-right {padding-left: {{horizontalSpacing}};} }' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-right .qubely-timeline-date-container {padding-right: {{horizontalSpacing}};} }'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'left' }
					],
					selector: '{{QUBELY}} .qubely-timeline-item {padding-left: {{horizontalSpacing}};} ' +
						'{{QUBELY}} .qubely-timeline-date-container {padding-left: {{horizontalSpacing}};}'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'right' }
					],
					selector: '{{QUBELY}} .qubely-timeline-item {padding-right: {{horizontalSpacing}};} ' +
						'{{QUBELY}} .qubely-timeline-date-container {padding-right: {{horizontalSpacing}};}'
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
					selector: '{{QUBELY}} .qubely-timeline-item:not(:last-child) {margin-bottom: {{verticalSpacing}};} '
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
					selector: '{{QUBELY}} .qubely-timeline-content {border-style: solid; border-width: {{contentBorderWidth}};}'
				},
				{
					condition: [
						{ key: 'enableContentBorder', relation: '==', value: true },
						{ key: 'orientation', relation: '==', value: 'center' }
					],
					selector: '@media (max-width: 767px) { {{QUBELY}} .qubely-timeline-content.qubely-content-has-border:after {border-width: calc(15px + {{contentBorderWidth}}); left: calc(-15px*2 - {{contentBorderWidth}}*2 - {{contentBorderWidth}}/2);} }' + // Phone
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-left .qubely-timeline-content.qubely-content-has-border:after {border-width: calc(15px + {{contentBorderWidth}}); right: calc(-15px*2 - {{contentBorderWidth}}*2 - {{contentBorderWidth}}/2);} }' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-right .qubely-timeline-content.qubely-content-has-border:after {border-width: calc(15px + {{contentBorderWidth}}); left: calc(-15px*2 - {{contentBorderWidth}}*2 - {{contentBorderWidth}}/2);} }'
				},
				{
					condition: [
						{ key: 'enableContentBorder', relation: '==', value: true },
						{ key: 'orientation', relation: '==', value: 'left' }
					],
					selector: '{{QUBELY}} .qubely-timeline-content.qubely-content-has-border:after {border-width: calc(15px + {{contentBorderWidth}}); left: calc(-15px*2 - {{contentBorderWidth}}*2 - {{contentBorderWidth}}/2);}'
				},
				{
					condition: [
						{ key: 'enableContentBorder', relation: '==', value: true },
						{ key: 'orientation', relation: '==', value: 'right' }
					],
					selector: '{{QUBELY}} .qubely-timeline-content.qubely-content-has-border:after {border-width: calc(15px + {{contentBorderWidth}}); right: calc(-15px*2 - {{contentBorderWidth}}*2 - {{contentBorderWidth}}/2);}'
				}
			]
		},

		contentBorderColor: {
			type: 'string',
			default: '#F6F7FB',
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-content {border-color: {{contentBorderColor}};}'
				},
				{
					condition: [
						{ key: 'enableContentBorder', relation: '==', value: true },
						{ key: 'orientation', relation: '==', value: 'center' }
					],
					selector: '@media (max-width: 767px) { {{QUBELY}} .qubely-timeline-content.qubely-content-has-border:after {border-color: transparent {{contentBorderColor}} transparent transparent;} }' + // Phone
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-left .qubely-timeline-content.qubely-content-has-border:after {border-color: transparent transparent transparent {{contentBorderColor}};}' +
						'{{QUBELY}} .qubely-timeline-right .qubely-timeline-content.qubely-content-has-border:after {border-color: transparent {{contentBorderColor}} transparent transparent;} }'
				},
				{
					condition: [
						{ key: 'enableContentBorder', relation: '==', value: true },
						{ key: 'orientation', relation: '==', value: 'left' }
					],
					selector: '{{QUBELY}} .qubely-timeline-content.qubely-content-has-border:after {border-color: transparent {{contentBorderColor}} transparent transparent;}'
				},
				{
					condition: [
						{ key: 'enableContentBorder', relation: '==', value: true },
						{ key: 'orientation', relation: '==', value: 'right' }
					],
					selector: '{{QUBELY}} .qubely-timeline-content.qubely-content-has-border:after {border-color: transparent transparent transparent {{contentBorderColor}};}'
				}
			]
		},

		contentBg: {
			type: 'string',
			default: '#F9F9F9',
			style: [
				{
					selector: '{{QUBELY}} .qubely-timeline-content {background-color: {{contentBg}};}'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'center' }
					],
					selector: '@media (max-width: 767px) { {{QUBELY}} .qubely-timeline-content:before {border-color: transparent {{contentBg}} transparent transparent;} }' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-left .qubely-timeline-content:before {border-color: transparent transparent transparent {{contentBg}};} }' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-right .qubely-timeline-content:before {border-color: transparent {{contentBg}} transparent transparent;} }'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'left' }
					],
					selector: '{{QUBELY}} .qubely-timeline-content:before {border-color: transparent {{contentBg}} transparent transparent;}'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'right' }
					],
					selector: '{{QUBELY}} .qubely-timeline-content:before {border-color: transparent transparent transparent {{contentBg}};}'
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
			default: {
				openBorderRadius: 1,
				radiusType: 'global',
				global: {
					md: 5
				},
				unit: 'px'
			},
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
				spread: 0,
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
				{
					selector: '{{QUBELY}} .qubely-block-timeline .qubely-timeline-items .qubely-timeline-item .qubely-timeline-content .qubely-timeline-description .qubely-timeline-title'
				}
			]
		},

		headingColor: {
			type: 'string',
			default: '',
			style: [
				{ selector: '{{QUBELY}} .qubely-block-timeline .qubely-timeline-items .qubely-timeline-item .qubely-timeline-content .qubely-timeline-description .qubely-timeline-title {color: {{headingColor}};}' }
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
					selector: '{{QUBELY}} .qubely-timeline-connector {width: {{connectorSize}}; height: {{connectorSize}};}'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'center' }
					],
					selector: '@media (max-width: 767px) { {{QUBELY}} .qubely-timeline-connector {left: calc(-{{connectorSize}}/2);margin-top: calc(-{{connectorSize}}/2);} }' + // Phone
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-left .qubely-timeline-connector {right: calc(-{{connectorSize}}/2);} }' +
						'@media (min-width: 768px) { {{QUBELY}} .qubely-timeline-right .qubely-timeline-connector {left: calc(-{{connectorSize}}/2);} }'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'left' }
					],
					selector: '{{QUBELY}} .qubely-timeline-connector {left: calc(-{{connectorSize}}/2); margin-top: calc(-{{connectorSize}}/2)}'
				},
				{
					condition: [
						{ key: 'orientation', relation: '==', value: 'right' }
					],
					selector: '{{QUBELY}} .qubely-timeline-connector {right: calc(-{{connectorSize}}/2); margin-top: calc(-{{connectorSize}}/2)}'
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

		connectorBoxShadow: {
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
					selector: '{{QUBELY}} .qubely-block-timeline:after {width: {{connectorBarWidth}};}'
				}
			]
		},

		connectorBarColor: {
			type: 'string',
			default: '#D2D2D2',
			style: [
				{
					selector: '{{QUBELY}} .qubely-block-timeline:after {background-color: {{connectorBarColor}};}'
				}
			]
		},

		//
		timelineItems: { type: 'number', default: 5 },
		sourceOfCopiedStyle: { type: 'boolean', default: false },
	},
	edit: Edit,
	save: Save
});
