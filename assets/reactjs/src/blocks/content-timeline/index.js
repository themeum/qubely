const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

import './style.scss'

import Edit from './Edit'
import Save from './Save'

registerBlockType('qubely/content-timeline', {
	title: __('Content Timeline'),
	icon: 'dashboard',
	category: 'qubely',
	keywords: [
		__('Content Timeline'),
		__('Content'),
		__('Timeline'),
	],
	attributes: {
		uniqueId: { type: 'string', default: '' },

		timelineContents: {
			type: 'Array',
			default: [
				{ title: 'One', date: 'January 1, 2019', description: 'description one' },
				{ title: 'two', date: 'February 1, 2019', description: 'description two' },
				{ title: 'three', date: 'March 1, 2019', description: 'description three' },
				{ title: 'four', date: 'April 1, 2019', description: 'description four' },
				{ title: 'five', date: 'May 1, 2019', description: 'description five' },
			]
		},
		typography: {
			type: 'object',
			default: {},
			style: [
				{ selector: '{{QUBELY}} .qubely-block-content-timeline' }
			]
		},
		timelineItems: { type: 'number', default: 5 },
		showGlobalSettings: { type: 'boolean', default: true }, // Global Settings
		showContextMenu: { type: 'boolean', default: true },
	},
	edit: Edit,
	save: Save
});
