import './style.scss'
import Edit from './Edit'
import Save from './Save'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/testimonial', {
    title: __('Testimonial'),
    description: 'Display testimonials from clients with Qubely Testimonials.',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-testimonial.svg'} alt={__('Testimonial')} />,
    category: 'qubely',
    keywords: [__('testimonial'), __('Quote')],
    example: {
		attributes: {},
	},
    attributes: {
        uniqueId: { type: 'string', default: '' },
        // Global
        ...globalAttributes,
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },
        alignment: { type: 'object', default: { md: 'center' }, style: [{ selector: '{{QUBELY}} .qubely-block-testimonial {text-align: {{alignment}};}' }] },
        layout: { type: 'number', default: 1 },

        //Name
        name: {
            type: 'string',
            source: 'html',
            selector: '.qubely-testimonial-author-name>span',
            default: 'JOHN DOE'
        },
        nameColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-testimonial-author-name { color:{{nameColor}}; }' }] },
        nameTypo: { type: 'object', default: { openTypography: 1, weight: 700, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-testimonial-author-name' }] },
        nameSpacing: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-testimonial-author-name {margin-bottom: {{nameSpacing}};}' }] },

        //Designation
        designation: {
            type: 'string',
            source: 'html',
            selector: '.qubely-testimonial-author-designation>span',
            default: 'WordPress Developer'
        },
        designationColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-testimonial-author-designation { color:{{designationColor}}; }' }] },
        designationTypo: { type: 'object', default: { openTypography: 1, size: { md: 14, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-testimonial-author-designation' }] },

        //Messsage
        message: {
            type: 'string',
            source: 'html',
            selector: '.qubely-testimonial-content>div',
            default: '“There’s no easier way to add innovative Gutenberg blocks than using Qubely Gutenberg Blocks Toolkit. Instantly raise your website appearance with this stylish new plugin.”'
        },
        messagePosition: { type: 'string', default: 'top' },
        messageTypo: { type: 'object', default: { openTypography: 1, size: { md: 20, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-testimonial-content' }] },
        messageSpacingTop: { type: 'object', default: { md: 0, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-testimonial-content {margin-top: {{messageSpacingTop}};}' }] },
        messageSpacingBottom: { type: 'object', default: { md: 20, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-testimonial-content {margin-bottom: {{messageSpacingBottom}};}' }] },

        //Avatar
        showAvatar: { type: 'boolean', default: true },
        avatar: { type: 'object', default: {} },
        avatar2x: { type: 'object', default: {} },
        avatarLayout: { type: 'string', default: 'left' },
        avatarAlt: { type: 'string', default: '' },
        avatarSize: {
            type: 'string',
            default: '64px',
            style: [
                {
                    condition: [
                        { key: 'avatarSize', relation: '!=', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-testimonial-avatar { width: {{avatarSize}}; height: {{avatarSize}}; font-size: {{avatarSize}}; }'
                }
            ]
        },
        avatarWidth: { type: 'object', default: { md: 120, unit: 'px' }, style: [{ condition: [{ key: 'avatarSize', relation: '==', value: 'custom' }], selector: '{{QUBELY}} .qubely-testimonial-avatar {width: {{avatarWidth}}; font-size: {{avatarWidth}};}' }] },
        avatarHeight: { type: 'object', default: { md: 120, unit: 'px' }, style: [{ condition: [{ key: 'avatarSize', relation: '==', value: 'custom' }], selector: '{{QUBELY}} .qubely-testimonial-avatar {height: {{avatarHeight}};}' }] },
        avatarSpacing: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'avatarLayout', relation: '==', value: 'left' }
                    ],
                    selector: '{{QUBELY}} .qubely-testimonial-avatar {margin-right: {{avatarSpacing}};}'
                },
                {
                    condition: [
                        { key: 'avatarLayout', relation: '==', value: 'right' }
                    ],
                    selector: '{{QUBELY}} .qubely-testimonial-avatar {margin-left: {{avatarSpacing}};}'
                },
                {
                    condition: [
                        { key: 'avatarLayout', relation: '==', value: 'top' }
                    ],
                    selector: '{{QUBELY}} .qubely-testimonial-avatar {margin-bottom: {{avatarSpacing}};}'
                },
                {
                    condition: [
                        { key: 'avatarLayout', relation: '==', value: 'bottom' }
                    ],
                    selector: '{{QUBELY}} .qubely-testimonial-avatar {margin-top: {{avatarSpacing}};}'
                }
            ]
        },
        avatarBorderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
                global: { md: 100 },
                unit: '%'
            },
            style: [
                { selector: '{{QUBELY}} .qubely-testimonial-avatar' }
            ]
        },

        avatarBorder: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-testimonial-avatar' }] },

        //Quote
        quoteIcon: { type: 'string', default: 'fas fa-quote-left' },
        quoteIconPosition: { type: 'string', default: 'top' },
        quoteIconSize: { type: 'object', default: { md: 48, unit: 'px' }, style: [{ condition: [{ key: 'quoteIcon', relation: '!=', value: '' }], selector: '{{QUBELY}} .qubely-quote-icon {font-size: {{quoteIconSize}};}' }] },
        quoteIconColor: { type: 'string', default: '#E2E2E2', style: [{ condition: [{ key: 'quoteIcon', relation: '!=', value: '' }], selector: '{{QUBELY}} .qubely-quote-icon {color: {{quoteIconColor}};}' }] },
        quoteIconSpacing: {
            type: 'object',
            default: {
                md: 20, unit: 'px'
            },
            style: [
                {
                    condition:
                        [
                            { key: 'layout', relation: '==', value: '1' },
                            { key: 'quoteIcon', relation: '!=', value: '' }
                        ],
                    selector: '{{QUBELY}} .qubely-testimonial-quote {margin-bottom: {{quoteIconSpacing}};}'
                },
                {
                    condition:
                        [
                            { key: 'layout', relation: '==', value: '2' },
                            { key: 'quoteIcon', relation: '!=', value: '' }
                        ],
                    selector: '{{QUBELY}} .qubely-testimonial-quote {margin-top: {{quoteIconSpacing}};}'
                }
            ]
        },

        //Ratings
        showRatings: { type: 'boolean', default: true },
        ratings: { type: 'string', default: 4.5 },
        ratingsPosition: { type: 'string', default: 'bottom' },
        ratingsColor: { type: 'string', default: '#FFB800', style: [{ condition: [{ key: 'ratings', relation: '!=', value: '0' }], selector: '{{QUBELY}} .qubely-testimonial-ratings:before {color: {{ratingsColor}};} {{QUBELY}} .qubely-testimonial-ratings {color: {{ratingsColor}};}' }] },
        starsSize: { type: 'object', default: { md: 20, unit: 'px' }, style: [{ condition: [{ key: 'ratings', relation: '!=', value: '0' }], selector: '{{QUBELY}} .qubely-testimonial-ratings {font-size:{{starsSize}};}' }] },
        ratingsSpacing: {
            type: 'object',
            default: {
                md: 30,
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: '1' },
                        { key: 'ratings', relation: '!=', value: '0' }
                    ],
                    selector: '{{QUBELY}} .qubely-testimonial-ratings {margin-bottom: {{ratingsSpacing}};}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: '2' },
                        { key: 'ratings', relation: '!=', value: '0' }
                    ],
                    selector: '{{QUBELY}} .qubely-testimonial-ratings {margin-top: {{ratingsSpacing}};}'
                }
            ]
        },

        // Design
        bgPadding: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-testimonial' }] },
        textColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-testimonial { color:{{textColor}}; }' }] },
        bgColor: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-testimonial' }] },
        bgBorderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
            },
            style: [{ selector: '{{QUBELY}} .qubely-block-testimonial' }]
        },

        border: { type: 'object', default: { openTy: 0, color: '#3373dc', width: { bottom: '1', left: '1', right: '1', top: '1', unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-block-testimonial' }] },
        boxShadow: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-testimonial' }] },
        boxShadowHover: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-testimonial:hover' }] },
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit: Edit,
    save: Save
});
