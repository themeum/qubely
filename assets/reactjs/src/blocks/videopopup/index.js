import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/videopopup', {
	title: __('Video Popup'),
	description: 'Engage your audience with videos with Qubely Video Popup.',
	icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-videopopup.svg'} alt={__('Video popup Block')} />,
	category: 'qubely',
	supports: { align: false },
    keywords: [__('video'), __('popup'), __('video popup')],
    example: {
        attributes: {},
    },
	attributes: {
		uniqueId: { type: 'string', default: '' },
		// Global
		...globalAttributes,
		layout: { type: 'string', default: 'fill' },
		alignment: { type: 'string', default: 'center' },
		spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },
		videoSource: { type: 'string', default: 'external' },
		bgVideo: { type: 'object', default: {} },
		url: { type: 'string', default: 'https://www.youtube.com/watch?v=HY3sut8LTSw' },
		height: { type: 'object', default: { md: 500, unit: 'px' }, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-block-videopopup-wrapper{ height:{{height}};}' }] },
		background: { type: 'object', default: { bgType: 'image', openBg: 1, bgimgSize: 'cover', bgimgPosition: 'center center', bgImage: { url: 'https://builder.themeum.com/wp-content/uploads/2019/02/video-popup-bg.jpg' } }, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-block-videopopup-wrapper' }] },
		isRipple: { type: 'boolean', default: true },

		// Icon
		icon: { type: 'string', default: 'fas fa-play' },
		iconColor: { type: 'string', default: '#FFFFFF', style: [{ selector: '{{QUBELY}} .qubely-btn-icon{ color:{{iconColor}}; }' }] },
		iconHoverColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-btn-icon:hover{ color:{{iconHoverColor}}; }' }] },
		iconSize: { type: 'string', default: 'medium' },
		iconSizeCustom: { type: 'object', default: { md: 110, unit: 'px' }, style: [{ condition: [{ key: 'iconSize', relation: '==', value: 'custom' }], selector: '{{QUBELY}} .qubely-block-videopopup .qubely-btn-icon{ width:{{iconSizeCustom}}; height: {{iconSizeCustom}}; font-size:calc({{iconSizeCustom}} - ({{iconSizeCustom}}/1.7)); }' }] },
		iconBorderRadius: {
			type: 'object',
			default: {
				openBorderRadius: 1,
				radiusType: 'global',
				global: { md: 50 },
				unit: '%'
			},
			style: [
				{
					selector: '{{QUBELY}} .qubely-block-videopopup .qubely-video-popup .qubely-btn-icon, {{QUBELY}} .qubely-block-videopopup .qubely-video-popup .qubely-btn-icon .qubely-ripple'
				}
			]
		},

		iconBgColor: {
			type: 'string',
			default: '#2476CA',
			style: [
				{
					selector: '{{QUBELY}} .qubely-block-videopopup .qubely-video-popup .qubely-btn-icon{ background-color:{{iconBgColor}}; }'
				}
			]
		},
		iconHoverBgColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-videopopup .qubely-video-popup .qubely-btn-icon:hover{ background-color:{{iconHoverBgColor}}; }' }] },

		border: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-btn-icon' }] },
		hoverBorder: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-btn-icon:hover' }] },

		borderRadius: {
			type: 'object',
			default: {
				openBorderRadius: 1,
				radiusType: 'global'
			},
			style: [
				{
					condition: [{ key: 'layout', relation: '==', value: 'fill' }],
					selector: '{{QUBELY}} .qubely-block-videopopup-wrapper, {{QUBELY}} .qubely-block-videopopup-overlay'
				}
			]
		},

		shadow: { type: 'object', default: {}, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-block-videopopup-wrapper' }] },
		shadowHover: { type: 'object', default: {}, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }], selector: '{{QUBELY}} .qubely-block-videopopup-wrapper:hover' }] },
		prefix: { type: 'string', default: '' },
		postfix: { type: 'string', default: '' },
		prePostColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-videopopup-wrapper .qubely-block-videopopup span {color: {{prePostColor}};}' }] },
		prePostHoverColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-videopopup-wrapper:hover .qubely-block-videopopup span {color: {{prePostHoverColor}};}' }] },
		typography: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-videopopup span' }] },
		textGap: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-video-popup-prefix{ margin-right:{{textGap}};} {{QUBELY}} .qubely-video-popup-postfix{ margin-left:{{textGap}};}' }] },

		// overlay
		enableBackgroundOverlay: { type: 'boolean', default: true },
		overlayBackground: {
			type: 'object',
			default: {
				openBg: 1,
				bgDefaultColor: '#000'
			},
			style: [
				{
					condition: [
						{ key: 'layout', relation: '==', value: 'fill' },
						{ key: 'enableBackgroundOverlay', relation: '==', value: true },
					],
					selector: '{{QUBELY}} .qubely-block-videopopup-overlay'
				}
			]
		},
		overlayOpacity: {
			type: 'number',
			default: .5,
			style: [
				{
					condition: [
						{ key: 'layout', relation: '==', value: 'fill' },
						{ key: 'enableBackgroundOverlay', relation: '==', value: true },
					],
					selector: '{{QUBELY}} .qubely-block-videopopup-overlay{opacity: {{overlayOpacity}}; }'
				}
			]
		},
		overlayHoverOpacity: {
			type: 'number',
			default: .6,
			style: [
				{
					condition: [
						{ key: 'layout', relation: '==', value: 'fill' },
						{ key: 'enableBackgroundOverlay', relation: '==', value: true },
					],
					selector: '{{QUBELY}} .qubely-block-videopopup-wrapper:hover .qubely-block-videopopup-overlay{opacity: {{overlayHoverOpacity}}; }'
				}
			]
		},
		overlayBlend: {
			type: 'string',
			default: '',
			style: [
				{
					condition: [
						{ key: 'layout', relation: '==', value: 'fill' },
						{ key: 'enableBackgroundOverlay', relation: '==', value: true },
					],
					selector: '{{QUBELY}} .qubely-block-videopopup-overlay{ mix-blend-mode:{{overlayBlend}}; }'
				}
			]
		},
		sourceOfCopiedStyle: { type: 'boolean', default: false }
	},
	edit: Edit,
	save: Save,
});
