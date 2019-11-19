import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/image', {
    title: __('Image'),
    description: __('Insert images and beautify them with Qubely Image Block.'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-image.svg'} alt={__('Image')} />,
    keywords: [__('image', 'advanced image', 'fancy image'), 'image overlay'],
    example: {
		attributes: {
            image: { url: 'https://builder.themeum.com/wp-content/uploads/2019/02/video-popup-bg.jpg' },
            enableCaption: true,
            imageCaption: __( 'Make headlines/titles that attract users with Qubely Heading.', 'qubely' ),
		},
	},
    attributes: {

        uniqueId: {
            type: 'string',
            default: ''
        },
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

        alignment: {
            type: 'object',
            default: {
                md: 'left'
            },
            style: [{
                selector: '{{QUBELY}} .qubely-block-image {text-align: {{alignment}};}'
            }]
        },

        animateOnHover: {
            type: 'boolean',
            default: true
        },

        layout: {
            type: 'string',
            default: 'simple'
        },
        imgSize: {
            type: 'string',
            default: 'full'
        },

        image: {
            type: 'object',
            default: {}
        },

        image2x: {
            type: 'object',
            default: {}
        },
		imageUrl: { type: 'object', default: {} },
        imageSize: {
            type: 'string',
            default: 'auto',
            style: [{
                condition: [
                    { key: 'imageSize', relation: '!=', value: 'auto' },
                    { key: 'imageSize', relation: '!=', value: 'custom' },
                ],
                selector: '{{QUBELY}} .qubely-image-image {width: {{imageSize}};}'
            }]
        },

        imageSizeCustom: {
            type: 'object',
            default: {
                md: 300,
                unit: 'px'
            },
            style: [{
                condition: [
                    { key: 'imageSize', relation: '==', value: 'custom' },
                ],
                selector: '{{QUBELY}} .qubely-image-image {width: {{imageSizeCustom}};}'
            }]
        },

        imgAlt: {
            type: 'string',
            default: ''
        },

        imageOpacity: {
            type: 'number',
            default: 1,
            style: [{
                selector: '{{QUBELY}} .qubely-image-image {opacity: {{imageOpacity}};}'
            }]
        },

        imageBorderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 0,
                radiusType: 'global',
                global: {},
                unit: 'px',

            },
            style: [{
                selector: '{{QUBELY}} .qubely-image-container'
            }]
        },

        imageBoxShadow: {
            type: 'object',
            default: {},
            style: [{
                selector: '{{QUBELY}} .qubely-image-container'
            }]
        },

        imageBoxShadowHover: {
            type: 'object',
            default: {},
            style: [{
                selector: '{{QUBELY}} .qubely-image-media:hover .qubely-image-container'
            }]
        },

        // Caption
        enableCaption: {
            type: 'boolean',
            default: false,
        },

        imageCaption: {
            type: 'string',
            default: 'Image Caption'
        },

        captionTypography: {
            type: 'object',
            default: {
                openTypography: 1,
                size: {
                    md: 16,
                    unit: 'px'
                }
            },
            style: [{
                condition: [
                    { key: 'layout', relation: '==', value: 'simple' },
                    { key: 'enableCaption', relation: '==', value: 1 }
                ],
                selector: '{{QUBELY}} .qubely-image-caption'
            }]
        },
        captionColor: {
            type: 'string',
            default: '#566372',
            style: [{
                condition: [
                    { key: 'layout', relation: '==', value: 'simple' },
                    { key: 'enableCaption', relation: '==', value: 1 }
                ],
                selector: '{{QUBELY}} .qubely-image-caption {color: {{captionColor}};}'
            }]
        },

        captionSpacing: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style: [{
                selector: '{{QUBELY}} .qubely-image-caption {margin-top: {{captionSpacing}};}'
            }]
        },

        // Title
        title: {
            type: 'string',
            default: 'Image Block'
        },
        titleLevel: {
            type: 'number',
            default: 3
        },
        titleTypography: {
            type: 'object',
            default: {
                openTypography: 1,
                size: {
                    md: 38,
                    unit: 'px'
                }
            },
            style: [{
                selector: '{{QUBELY}} .qubely-image-title'
            }]
        },
        titleColor: {
            type: 'string',
            default: '#FFF',
            style: [{
                selector: '{{QUBELY}} .qubely-image-title {color: {{titleColor}};}'
            }]
        },

        titleVisibleOnHover: {
            type: 'boolean',
            default: false,
        },

        // Sub Title
        enableSubTitle: {
            type: 'boolean',
            default: true,
        },
        subTitle: {
            type: 'string',
            default: 'Insert images and beautify them with Qubely Image Block.'
        },
        subTitleTypography: {
            type: 'object',
            default: {
                openTypography: 1,
                size: {
                    md: 21,
                    unit: 'px'
                }
            },
            style: [{
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableSubTitle', relation: '==', value: 1 }
                ],
                selector: '{{QUBELY}} .qubely-image-sub-title'
            }]
        },
        subTitleColor: {
            type: 'string',
            default: '#FFF',
            style: [{
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableSubTitle', relation: '==', value: 1 }
                ],
                selector: '{{QUBELY}} .qubely-image-sub-title {color: {{subTitleColor}};}'
            }]
        },
        subTitleSpacing: {
            type: 'object',
            default: {
                md: 10,
                unit: 'px'
            },
            style: [{
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableSubTitle', relation: '==', value: 1 }
                ],
                selector: '{{QUBELY}} .qubely-image-sub-title {margin-top: {{subTitleSpacing}};}'
            }]
        },

        subTitleVisibleOnHover: {
            type: 'boolean',
            default: false,
        },

        // Overlay
        enableOverlay: {
            type: 'boolean',
            default: true,
        },

        overlayBg: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'gradient',
                color: 'rgba(6, 80, 183, 0.7)',
                gradient: {
                    color1: 'rgba(6, 80, 183, 0.7)',
                    color2: 'rgba(96, 10, 255, 0.7)',
                    direction: 45,
                    start: 0,
                    stop: 100,
                    type: 'linear'
                },
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'enableOverlay', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-image-container:before'
                }
            ]
        },

        overlayHoverBg: {
            type: 'object',
            default: {
                type: 'gradient',
                openColor: 1,
                color: 'rgba(6, 80, 183, 0.85)',
                gradient: {
                    color1: 'rgba(6, 80, 183, 0.85)',
                    color2: 'rgba(96, 10, 255, 0.85)',
                    direction: 45,
                    start: 0,
                    stop: 100,
                    type: 'linear'
                }
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'enableOverlay', relation: '==', value: true },
                        { key: 'animateOnHover', relation: '==', value: true },
                    ],
                    selector: '{{QUBELY}} .qubely-image-container:after'
                }
            ]
        },

        overlayBlend: {
            type: 'string',
            default: '',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'enableOverlay', relation: '==', value: true },
                        { key: 'overlayBlend', relation: '!=', value: 'normal' }
                    ],
                    selector: '{{QUBELY}} .qubely-image-container:before {mix-blend-mode: {{overlayBlend}};} {{QUBELY}} .qubely-image-container:after {mix-blend-mode: {{overlayBlend}};}'
                }
            ]
        },

        // Content
        contentAnimation: {
            type: 'string',
            default: 'zoom-out'
        },

        contentPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: {
                    md: 30,
                },
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                    ],
                    selector: '{{QUBELY}} .qubely-image-content'
                }
            ]
        },

        contentVerticalAlign: {
            type: 'string',
            default: 'center',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'contentVerticalAlign', relation: '==', value: 'top' }
                    ],
                    selector: '{{QUBELY}} .qubely-image-content {-webkit-box-align: start; -ms-flex-align: start; -ms-grid-row-align: flex-start; align-items: flex-start;}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'contentVerticalAlign', relation: '==', value: 'center' }
                    ],
                    selector: '{{QUBELY}} .qubely-image-content {-webkit-box-align: center; -ms-flex-align: center; -ms-grid-row-align: center; align-items: center;}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'contentVerticalAlign', relation: '==', value: 'bottom' }
                    ],
                    selector: '{{QUBELY}} .qubely-image-content {-webkit-box-align: end; -ms-flex-align: end; -ms-grid-row-align: flex-end; align-items: flex-end;}'
                }
            ]
        },

        contentAlignment: {
            type: 'string',
            default: 'center',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'contentAlignment', relation: '==', value: 'left' }
                    ],
                    selector: '{{QUBELY}} .qubely-image-content {-webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start; text-align: left;}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'contentAlignment', relation: '==', value: 'center' }
                    ],
                    selector: '{{QUBELY}} .qubely-image-content {-webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; text-align: center;}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'contentAlignment', relation: '==', value: 'right' }
                    ],
                    selector: '{{QUBELY}} .qubely-image-content {-webkit-box-pack: end; -ms-flex-pack: end; justify-content: flex-end; text-align: right;}'
                }
            ]
        },

        // Frame
        enableFrame: {
            type: 'boolean',
            default: false
        },

        frameMargin: {
            type: 'object',
            default: {
                openMargin: 1,
                marginType: 'global',
                global: { md: 30 },
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'enableFrame', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-has-frame figure:after'
                }
            ]
        },
        frameBorder: {
            type: 'object',
            default: {
                openBorder: 1,
                widthType: "global",
                global: {
                    md: 5
                },
                type: 'solid',
                color: '#FFF'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'enableFrame', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-has-frame figure:after'
                }
            ]
        },

        frameBorderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 0,
                radiusType: 'global',
                global: {},
                unit: 'px',

            },
            style: [{
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableFrame', relation: '==', value: true }
                ],
                selector: '{{QUBELY}} .qubely-has-frame figure::after'
            }]
        },

        frameSendToBack: {
            type: 'boolean',
            default: false,
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 'blurb' },
                        { key: 'enableFrame', relation: '==', value: true },
                        { key: 'frameSendToBack', relation: '==', value: true },
                    ],
                    selector: '{{QUBELY}} .qubely-has-frame figure::after {z-index: -1;}'
                }
            ]
        },

        frameAnimateOnHover: {
            type: 'boolean',
            default: false
        }
    },
    edit: Edit,
    save: Save,
});