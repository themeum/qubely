import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes }, QubelyButton: { buttonAttributes }, } = wp.qubelyComponents

registerBlockType('qubely/infobox', {
    title: __('Info Box'),
    description: 'Be creatively informative with Qubely Info Box.',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-info-box.svg'} alt={__('Video popup Block')} />,
    category: 'qubely',
    supports: { align: false },
    keywords: [__('service'), __('feature'), __('info')],
    example: {
		attributes: {},
	},
    attributes: {
        uniqueId: { type: 'string', default: '' },
         // Global
         ...globalAttributes,
         ...buttonAttributes,
        layout: { type: 'number', default: 1 },
        alignment: {
            type: 'object', default: { md: 'left' },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box {text-align: {{alignment}};}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 4 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box {text-align: {{alignment}};}'
                }
            ]
        },
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },
        mediaType: { type: 'string', default: 'icon' },
        enableButton: { type: 'boolean', default: false },
        buttonToggleOption: { type: 'boolean', default: true },

        // Icon
        iconName: { type: 'string', default: 'fas fa-rocket' },
        iconSize: {
            type: 'string', default: '36px',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'icon' },
                        { key: 'iconSize', relation: '!=', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media {font-size: {{iconSize}};}'
                }
            ]
        },
        iconSizeCustom: {
            type: 'object', default: { md: 64, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'icon' },
                        { key: 'iconSize', relation: '==', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media {font-size: {{iconSizeCustom}};}'
                }
            ]
        },
        iconColor: {
            type: 'string', default: '#338FEC',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'icon' }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media i {color: {{iconColor}};}'
                }
            ]
        },
        iconHoverColor: {
            type: 'string', default: '#2476CA',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'icon' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-media i {color: {{iconHoverColor}};}'
                }
            ]
        },

        // Image
        image: { type: 'object', default: {} },
        image2x: { type: 'object', default: {} },
        imgAlt: { type: 'string', default: '' },
        imageWidth: {
            type: 'object',
            default: {},
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'image' }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media {width: {{imageWidth}};} {{QUBELY}} .qubely-info-box-media img {width: 100%;} {{QUBELY}} .qubely-info-box-media .qubely-image-placeholder {height: {{imageWidth}}; width: {{imageWidths}};}'
                }
            ]
        },

        // Number
        number: { type: 'number', default: 1 },
        numberColor: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'number' }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-number {color: {{numberColor}};}'
                }
            ]
        },
        numberColorHover: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'number' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-number {color: {{numberColorHover}};}'
                }
            ]
        },
        numberTypography: {
            type: 'object',
            default: {
                openTypography: 1,
                size: {
                    md: 48,
                    unit: 'px'
                }
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'mediaType', relation: '==', value: 'number' }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media'
                }
            ]
        },

        // Media background
        useMediaBg: { type: 'boolean', default: 1 },
        mediaBg: {
            type: 'object', default: { openColor: 1, type: 'color', color: '#D6EBFF' },
            style: [
                {
                    condition: [
                        { key: 'mediaType', relation: '!=', value: 'image' },
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'useMediaBg', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media'
                }
            ]
        },
        mediaBgHover: {
            type: 'object', default: {},
            style: [
                {
                    condition: [
                        { key: 'mediaType', relation: '!=', value: 'image' },
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'useMediaBg', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-media'
                }
            ]
        },
        mediaBackgroundSize: {
            type: 'object', default: { md: '20', unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'mediaType', relation: '!=', value: 'image' },
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'useMediaBg', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media { padding: {{mediaBackgroundSize}};}'
                }
            ]
        },
        mediaBorderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
                global: { md: 5 },
                unit: 'px',

            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'useMediaBg', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media, {{QUBELY}} .qubely-info-box-media img'
                }
            ]
        },

        // Media Border
        mediaBorder: {
            type: 'number', default: 0,
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'useMediaBg', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media'
                }
            ]
        },
        mediaBorderColorHover: {
            type: 'string', default: '#e5e5e5',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'useMediaBg', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-media { border-color: {{mediaBorderColorHover}};}'
                }
            ]
        },

        // Media Shadow
        mediaShadow: {
            type: 'object', default: {},
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media'
                }
            ]
        },
        mediaShadowHover: {
            type: 'object', default: {},
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 4 },
                        { key: 'useMediaShadow', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-media'
                }
            ]
        },

        // Media Spacing
        mediaSpacing: {
            type: 'object', default: { md: 20, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media {margin-bottom: {{mediaSpacing}};}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 2 }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media {margin-right: {{mediaSpacing}};}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 3 }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-media {margin-left: {{mediaSpacing}};}'
                },
            ]
        },

        // Title
        title: {
            type: 'string',
            source: 'html',
            selector: '.qubely-info-box-title',
            default: 'This is an infobox'
        },
        titleLevel: { type: 'number', default: 2 },
        titleTypography: { type: 'object', default: { openTypography: 1, size: { md: 24, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-info-box-title' }] },
        titleColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-info-box-title {color: {{titleColor}};}' }] },
        titleColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-title {color: {{titleColorHover}};}' }] },
        titleSpacing: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-info-box-title-inner {margin-bottom: {{titleSpacing}};}' }] },

        subTitle: { type: 'boolean', default: 0 },
        subTitleLevel: { type: 'number', default: 3 },
        subTitleContent: {
            type: 'string',
            source: 'html',
            selector: '.qubely-info-box-sub-title',
            default: 'Sub Title'
        },
        subTitleTypography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-block-info-box .qubely-info-box-sub-title' }] },
        subTitleColor: {
            type: 'string', default: '#333',
            style: [
                {
                    condition: [
                        { key: 'subTitle', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box .qubely-info-box-sub-title {color: {{subTitleColor}};}'
                },
            ]
        },
        subTitleColorHover: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'subTitle', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-sub-title {color: {{subTitleColorHover}};}'
                },
            ]
        },
        subTitleSpacing: {
            type: 'object', default: { md: 15, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'subTitle', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box .qubely-info-box-sub-title {margin-bottom: {{subTitleSpacing}};}'
                },
            ]
        },

        // Title separator
        separatorStyle: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box .qubely-separator-type-css {border-top-style: {{separatorStyle}};}'
                },
            ]
        },
        separatorPosition: { type: 'string', default: 'top' },
        separatorColor: {
            type: 'string', default: '#5D7FEB',
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box .qubely-separator-type-svg svg .qubely-separator-stroke {stroke: {{separatorColor}};} {{QUBELY}} .qubely-block-info-box svg .qubely-separator-fill {fill: {{separatorColor}};} {{QUBELY}} .qubely-block-info-box .qubely-separator-type-css {border-top-color: {{separatorColor}};}'
                },
            ]
        },
        separatorColorHover: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-separator-type-svg svg .qubely-separator-stroke {stroke: {{separatorColorHover}};} {{QUBELY}} .qubely-block-info-box:hover svg .qubely-separator-fill {fill: {{separatorColorHover}};} {{QUBELY}} .qubely-block-info-box:hover .qubely-separator-type-css {border-top-color: {{separatorColorHover}};}'
                },
            ]
        },
        separatorStroke: {
            type: 'number', default: 3,
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box .qubely-separator-type-svg svg .qubely-separator-stroke {stroke-width: {{separatorStroke}}px;} {{QUBELY}} .qubely-block-info-box .qubely-separator-type-css {border-top-width: {{separatorStroke}}px;}'
                },
            ]
        },
        separatorWidth: {
            type: 'object', default: { md: 60 },
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-info-box .qubely-separator-type-css {width: {{separatorWidth}}px;} {{QUBELY}} .qubely-block-info-box .qubely-separator-type-svg svg {width: {{separatorWidth}}px;}'
                },
            ]
        },
        separatorSpacing: {
            type: 'object', default: { md: 10 },
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'left' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-right: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'right' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-left: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'leftright' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator-before {margin-right: {{separatorSpacing}}px;} {{QUBELY}} .qubely-separator-after {margin-left: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'top' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-bottom: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-top: {{separatorSpacing}}px;}'
                },
            ]
        },

        //Content
        enableContent: { type: 'boolean', default: true },
        content: {
            type: 'string',
            source: 'html',
            selector: '.qubely-info-box-text',
            default: 'Qubely blocks are added to the Gutenberg editor as soon as you install the plugin. You can start using it as any other Gutenberg block.'
        },
        contentTypography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ condition: [{ key: 'enableContent', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-info-box-text' }] },
        contentColor: { type: 'string', default: '', style: [{ condition: [{ key: 'enableContent', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-info-box-text {color: {{contentColor}};}' }] },
        contentColorHover: { type: 'string', default: '', style: [{ condition: [{ key: 'enableContent', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-block-info-box:hover .qubely-info-box-text {color: {{contentColorHover}};}' }] },
        contentPadding: { type: 'object', default: {}, style: [{ condition: [{ key: 'enableContent', relation: '==', value: true }], selector: '{{QUBELY}} .qubely-info-box-body' }] },
        contentSpacing: {
            type: 'object', default: { md: 10, unit: 'px' },
            style: [
                {
                    condition: [{ key: 'enableButton', relation: '==', value: true }, { key: 'enableContent', relation: '==', value: true }],
                    selector: '{{QUBELY}} .qubely-info-box-body .qubely-info-box-text {margin-bottom: {{contentSpacing}};}'
                },
                {
                    condition: [
                        { key: 'enableButton', relation: '==', value: false },
                        { key: 'enableContent', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-info-box-body .qubely-info-box-text {margin-bottom: 0;}'
                },
            ]
        },

        // Body
        bgColor: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-info-box' }] },
        bgColorHover: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-info-box:hover' }] },
        bgPadding: {
            type: 'object',
            default: {
                paddingType: 'global'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-info-box'
                }
            ]
        },
        bgBorderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',

            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-info-box'
                },
            ]
        },
        bgBorder: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-info-box' }] },
        bgBorderColorHover: { type: 'string', default: '#e5e5e5', style: [{ selector: '{{QUBELY}} .qubely-block-info-box:hover { border-color: {{bgBorderColorHover}};}' }] },
        bgShadow: { type: 'object', default: { color: '' }, style: [{ selector: '{{QUBELY}} .qubely-block-info-box' }] },
        bgShadowHover: { type: 'object', default: { color: '' }, style: [{ selector: '{{QUBELY}} .qubely-block-info-box:hover' }] },

        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit: Edit,
    save: Save,
});
