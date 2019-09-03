const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

import './style.scss'

import Edit from './Edit'
import Save from './Save'

registerBlockType('qubely/carousel', {
	title: __('carousel'),
	icon: 'dashboard',
	category: 'qubely',
	keywords: [
		__('slide'),
		__('carousel')
	],
	attributes: {
		uniqueId: { type: 'string', default: '' },
		autoplay: {
			type: 'boolean',
			default: false
		},
		center: {
			type: 'boolean',
			default: false
		},
		interval: {
			type: 'number',
			default: 4500
		},
		speed: {
			type: 'number',
			default: 500
		},
		dots: {
			type: 'boolean',
			default: true
		},
		nav: {
			type: 'boolean',
			default: true
		},
		slider_items: {
			type: 'array',
			default: [1,2,3]
		},
		items: { type: 'object', default: { md: '3', sm: '3', xs: '1' } },
	},
	edit: Edit,
	save: Save
});
