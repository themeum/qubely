import './style.scss'
import Edit from './Edit'
import Save from './Save'
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType( 'qubely/progressbar', {
	title: __('Progress Bar'),
	description: 'Showcase stats using progress bars with Qubely Progress Bar.',
	category: 'qubely',
	icon: <img src={qubely_admin.plugin+'assets/img/blocks/block-progressbar.svg'} alt={__('Progress Bar Block')} />,
	supports: {
        align: ['center', 'wide', 'full'],
    },
    keywords: [__('progress'), __('bar'), __('bar progress')],
    example: {
        attributes: {},
    },
	attributes: {
		uniqueId: { type: 'string', default: '' },
		...globalAttributes,  // Global Settings
		spacer: { type: 'object', default:{spaceTop: { md: '10', unit: "px"}, spaceBottom: { md: '10', unit: "px"}}, style: [{ selector: '{{QUBELY}}' }] },
		progress: {type: 'string', default: 50, style: [{ selector: '{{QUBELY}} .qubely-progress-bar {width: {{progress}}%;}' }] },

		// Labels
		title: {type: 'string', default: 'Progress'},
		showTitle: {type: 'boolean', default: true},
		labelTypography: { type:'object', default:{openTypography: 1, size: {md: 16, unit: 'px'}}, style: [{ selector: '{{QUBELY}} .qubely-block-progress-labels' }] },
		labelColor: { type:'string', default:'', style: [{ selector: '{{QUBELY}} .qubely-block-progress-labels {color: {{labelColor}};}' }] },
		labelPosition: {type: 'string', default: 'outside'},
		labelSpacing: { type:'object', default:{md: 10, unit: 'px'}, style: [{ selector: '{{QUBELY}} .qubely-block-progress-labels.qubely-position-outside {margin-bottom: {{labelSpacing}};} {{QUBELY}} .qubely-block-progress-labels.qubely-position-inside {padding-left: {{labelSpacing}}; padding-right: {{labelSpacing}};}' }] },

		// Bar
		barHeight: {type: 'object', default: {md: 30, unit: 'px'}, style: [{ selector: '{{QUBELY}} .qubely-progress {height: {{barHeight}}; line-height: {{barHeight}};}' }] },
		barBackground: {type: 'string', default: '#e9ecef', style: [{ selector: '{{QUBELY}} .qubely-progress {background-color: {{barBackground}};}' }] },
		progressBackground: { type: 'object', default: {openColor: 1, type: 'color', color: '#007bff',gradient: {}}, style: [{ selector: '{{QUBELY}} .qubely-progress-bar' }] },
		striped: {type: 'boolean', default: false},
		borderRadius: {
			type: 'object',
			default: {
				openBorderRadius: 1,
				radiusType: 'global',
				global: {md: 10},
				unit: 'px',

			},
			style: [{selector: '{{QUBELY}} .qubely-progress, {{QUBELY}} .qubely-progress-bar' }]
		},
		showProgress: {type: 'boolean', default: true},
		sourceOfCopiedStyle: { type: 'boolean', default: false }
	},
	edit: Edit,
	save: Save
} );
