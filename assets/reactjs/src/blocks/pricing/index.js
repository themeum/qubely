import './style.scss'
const { __ } = wp.i18n
import Save from './Save'
import Edit from './Edit'
const { registerBlockType } = wp.blocks

registerBlockType('qubely/pricing', {
    title: __('Pricing'),
    description: 'Showcase Pricing in beautiful pre-designed Pricing Table with Qubely Pricing.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-pricing.svg'} alt={__('Pricing Block')} />,

    keywords: [__('Pricing'), __('Pricing Table')],
    attributes: {
        uniqueId: { type: 'string', default: '' },
        layout: {
            type: 'string',
            default: '1'
        },

        defaultItems: { type: 'number', default: 2 },
        alignment: { type: 'object', default: { md: 'center' }, style: [{ selector: '{{QUBELY}} .qubely-block-pricing {text-align: {{alignment}};}' }] },
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },

        copyStyle: { type: 'boolean', default: false },

        // Title__
        title: { type: 'string', default: 'Basic' },
        titleColor: { type: 'string', default: '#2184F9', style: [{ selector: '{{QUBELY}} .qubely-pricing-title{color: {{titleColor}};}' }] },
        titleTypography: { type: 'object', default: { openTypography: 1, size: { md: 20, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-pricing-title' }] },

        titleSpacing: {
            type: 'object',
            default: {
                md: 0,
                unit: 'px'
            },
            style: [{ selector: '{{QUBELY}} .qubely-pricing-title {margin-bottom: {{titleSpacing}};}' }]
        },

        //Sub Title
        subTitle: { type: 'string', default: 'Best Choice for Individuals' },
        subTitleSpacing: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-sub-title-wrapper {margin-bottom: {{subTitleSpacing}};}'
                }
            ]
        },

        subTitleColor: { type: 'string', default: '#8F8E8E', style: [{ selector: '{{QUBELY}} .qubely-sub-title{color: {{subTitleColor}};}' }] },
        subTitleTypography: { type: 'object', default: { openTypography: 1, size: { md: 20, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-sub-title' }] },

        // Price__
        price: { type: 'string', default: '49' },
        priceAlignment: {
            type: 'string',
            default: 'center',
            style: [
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'left' },
                    ],
                    selector: '{{QUBELY}} .qubely-pricing-wrapper {justify-content: flex-start;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'center' },
                    ],
                    selector: '{{QUBELY}} .qubely-pricing-wrapper {justify-content: center;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'right' },
                    ],
                    selector: '{{QUBELY}} .qubely-pricing-wrapper {justify-content: flex-end;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'left' },
                        { key: 'durationPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{QUBELY}} .qubely-pricing-duration {text-align: left;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'center' },
                        { key: 'durationPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{QUBELY}} .qubely-pricing-duration {text-align: center;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'right' },
                        { key: 'durationPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{QUBELY}} .qubely-pricing-duration {text-align: right;}'
                }
            ]
        },
        priceColor: { type: 'string', default: '#ccc', style: [{ selector: '{{QUBELY}} .qubely-pricing-price{color: {{priceColor}};}' }] },
        priceTypography: { type: 'object', default: { openTypography: 1, height: { md: 70, unit: 'px' }, size: { md: 70, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-pricing-price' }] },
        discount: { type: 'boolean', default: false },
        discountPrice: { type: 'string', default: '69' },
        discountColor: { type: 'string', default: '#ccc', style: [{ selector: '{{QUBELY}} .qubely-pricing-price strike{color: {{discountColor}};}' }] },
        discountTypography: { type: 'object', default: { openTypography: 1, size: { md: 20, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-pricing-price strike' }] },
        pricingSpacing: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style: [{ selector: '{{QUBELY}} .qubely-pricing-wrapper {margin-bottom: {{pricingSpacing}};}' }]
        },

        headerBg: {
            type: 'object',
            default: {},
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing-header'
                }
            ]
        },
        headerBorder: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '#f6f6f6',
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing-header'
                }
            ]
        },
        headerPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: {
                    md: 20
                },
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing-header'
                }
            ]
        },
        headerSpacing: {
            type: 'object',
            default: {
                md: 30,
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing-header {margin-bottom: {{headerSpacing}};}'
                }
            ]
        },

        // Currency__
        currency: { type: 'string', default: '$' },
        currencyCustom: { type: 'string', default: '' },
        currencyPosition: { type: 'string', default: 'before' },
        currencyAlign: { type: 'string', default: '10', style: [{ selector: '{{QUBELY}} .qubely-pricing-currency{ display: inline-block; transform: translateY({{currencyAlign}}px); }' }] },
        currencyColor: { type: 'string', default: '#CACCCE', style: [{ selector: '{{QUBELY}} .qubely-pricing-currency{color: {{currencyColor}}; }' }] },
        currencyTypography: { type: 'object', default: { openTypography: 1, size: { md: 34, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-pricing-currency' }] },

        // Duration__
        enableDuration: { type: 'boolean', default: true },
        duration: { type: 'string', default: '/Month' },
        durationPosition: { type: 'string', default: 'side' },
        durationColor: { type: 'string', default: '#CACCCE', style: [{ selector: '{{QUBELY}} .qubely-pricing-duration{color: {{durationColor}};}' }] },
        durationAlign: { type: 'string', default: '10', style: [{ condition: [{ key: 'durationPosition', relation: '==', value: 'side' }], selector: '{{QUBELY}} .qubely-pricing-duration{transform: translateY({{durationAlign}}px); display: inline-block; }' }, { condition: [{ key: 'durationPosition', relation: '==', value: 'bottom' }], selector: '{{QUBELY}} .qubely-pricing-duration{ display: block; }' }] },
        durationTypography: { type: 'object', default: { openTypography: 1, size: { md: 21, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-pricing-duration' }] },

        durationPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'custom',
                custom:{md:'10 0 10 0'}
            },
            style: [{ condition: [{ key: 'durationPosition', relation: '==', value: 'bottom' }], selector: '{{QUBELY}} .qubely-pricing-duration' }]
        },
        // Badge__
        enableBadge: { type: 'boolean', default: false },
        badge: { type: 'string', default: 'Sale' },
        badgeStyle: {
            type: 'number',
            default: 1,
            style: [
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing {overflow: hidden;}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 2 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing {overflow: hidden;}'
                }
            ]
        },
        badgePosition: {
            type: 'string',
            default: 'left',
            style: [
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 1 },
                        { key: 'badgePosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {left: -73px; transform: rotate(-45deg);}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 1 },
                        { key: 'badgePosition', relation: '==', value: 'right' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {right: -73px; transform: rotate(45deg);}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 2 },
                        { key: 'badgePosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {left: -50px; transform: rotate(-45deg);}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 2 },
                        { key: 'badgePosition', relation: '==', value: 'right' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {right: -50px; transform: rotate(45deg);}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 5 },
                        { key: 'badgePosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {left: 20px;}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 5 },
                        { key: 'badgePosition', relation: '==', value: 'right' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {right: 20px;}'
                },

                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 6 },
                        { key: 'badgePosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {left: 12px;}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 6 },
                        { key: 'badgePosition', relation: '==', value: 'right' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-pricing .qubely-pricing-badge {right: 12px;}'
                },
            ]
        },
        enableBadgeOverflow: {
            type: 'boolean',
            default: true,
            // style: [{
            //     condition: [{ key: 'enableBadgeOverflow', relation: '==', value: true }],
            //     selector: '{{QUBELY}} .qubely-block-pricing{  overflow:hidden;}'
            // },
            // ]
        },
        
        badgeColor: { type: 'string', default: '#FF494A',
        // style: [{ selector: '{{QUBELY}} .qubely-pricing-badge{background-color: {{badgeColor}};}' }]
        },
        badgeTextColor: { type: 'string', default: '#ffffff',
            // style: [{ selector: '{{QUBELY}} .qubely-pricing-badge{color: {{badgeTextColor}};}' }]
        },
        badgeTypography: { type: 'object', default: { openTypography: 1, size: { md: 12, unit: 'px' } },
            // style: [{ selector: '{{QUBELY}} .qubely-pricing-badge' }]
        },
        badgeRadius: {
            type: 'string',
            default: '70',
            // style: [
            //     {
            //         condition: [
            //             { key: 'badgeStyle', relation: '==', value: 'circle' }
            //         ],
            //         selector: '{{QUBELY}} .qubely-pricing-badge{height: {{badgeRadius}}px;width: {{badgeRadius}}px;border-radius:50%}'
            //     }]
        },
        badgeCircleRotation: {
            type: 'string',
            default: '-90',
            // style: [
            //     {
            //         condition: [
            //             { key: 'badgeStyle', relation: '==', value: 'circle' }
            //         ],
            //         selector: '{{QUBELY}} .qubely-pricing-badge{transform: rotate({{badgeCircleRotation}}deg);}'
            //     }]
        },
        badgePadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'custom',
                global: { md: 10 },
                custom: { md: '3 15 3 15' },
                unit: 'px'
            },
            // style: [{
            //     condition: [
            //         { key: 'enableBadgeOverflow', relation: '==', value: false }
            //     ],
            //     selector: '{{QUBELY}} .qubely-pricing-badge'
            // }],
        },
        badgeOverflowPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'custom',
                global: { md: 10 },
                custom: { md: '5 35 5 35' },
                unit: 'px'
            },
            // style: [{
            //     condition: [
            //         { key: 'enableBadgeOverflow', relation: '==', value: true }
            //     ],
            //     selector: '{{QUBELY}} .qubely-pricing-badge'
            // }],
        },

        badgeTop: {
            type: 'string',
            default: '20',
            // style: [{
            //     condition: [
            //         { key: 'enableBadgeOverflow', relation: '==', value: false }
            //     ],
            //     selector: '{{QUBELY}} .qubely-pricing-badge { top: {{badgeTop}}px;}'
            // }]
        },
        badgeRight: {
            type: 'string',
            default: '-5',
            // style: [
            //     {
            //         condition: [
            //             { key: 'badgePosition', relation: '==', value: 'left' },
            //             { key: 'enableBadgeOverflow', relation: '==', value: false }],
            //         selector: '{{QUBELY}} .qubely-pricing-badge { left: {{badgeRight}}px;}'
            //     }]
        },
        badgeLeft: {
            type: 'string',
            default: '-5',
            // style: [
            //     {
            //         condition: [
            //             { key: 'badgePosition', relation: '==', value: 'right' },
            //             { key: 'enableBadgeOverflow', relation: '==', value: false }
            //             ,],
            //         selector: '{{QUBELY}} .qubely-pricing-badge { right: {{badgeLeft}}px;}'
            //     }]
        },

        badgeOverflowTop: {
            type: 'string',
            default: '10',
            // style: [
            //     {
            //         condition: [
            //             { key: 'enableBadgeOverflow', relation: '==', value: true }
            //         ],
            //         selector: '{{QUBELY}} .qubely-pricing-badge { top: {{badgeOverflowTop}}px;}'
            //     }]
        },
        badgeOverflowRight: {
            type: 'string',
            default: '-25',
            // style: [
            //     {
            //         condition: [
            //             { key: 'badgePosition', relation: '==', value: 'left' },
            //             { key: 'enableBadgeOverflow', relation: '==', value: true }
            //         ],
            //         selector: '{{QUBELY}} .qubely-pricing-badge { left: {{badgeOverflowRight}}px;}'
            //     }]
        },
        badgeOverflowLeft: {
            type: 'string',
            default: '-25',
            // style: [
            //     {
            //         condition: [
            //             { key: 'badgePosition', relation: '==', value: 'right' },
            //             { key: 'enableBadgeOverflow', relation: '==', value: true }],
            //         selector: '{{QUBELY}} .qubely-pricing-badge { right: {{badgeOverflowLeft}}px;}'
            //     }]
        },

        // Background
        bgColor: {
            type: 'object',
            default: {},
            style: [{ selector: '{{QUBELY}} .qubely-block-pricing' }]
        },
        bgPadding: {
            type: 'object',
            default: {
                paddingType: 'global'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-pricing'
                }
            ]
        },

        bgBorderRadius: {
            type: 'object',
            default: {
                borderRadiusType: 'global'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-pricing'
                }
            ]
        },

        bgBorder: {
            type: 'object',
            default: {
                borderType: 'global'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-pricing'
                }
            ]
        },
        bgShadow: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-pricing' }] },



        //button
        buttonComponent: { type: 'boolean', default: true },
        buttonGap: {
            type: 'object',
            default: {
                md: 0,
                unit: 'px'
            },
            style: [{ selector: '{{QUBELY}} .qubely-pricing-button {margin-bottom: {{buttonGap}};margin-top: {{buttonGap}};}' }]
        },
        enableButton: { type: 'boolean', default: true },
        controlledButtonPanel: { type: 'boolean', default: true },
        showButtonPanel: { type: 'boolean', default: false },
        buttonText: { type: 'string', default: 'Subscribe Now' },

        buttonPaddingTop: { type: 'object', default: { md: 30, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-pricing-button{ padding-top: {{buttonPaddingTop}};}' }] },
        buttonPaddingBottom: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-pricing-button{ padding-bottom: {{buttonPaddingBottom}};}' }] },

        //postButtonText
        enablePostButtonText: { type: 'boolean', default: false },
        postButtonText: { type: 'string', default: '14 days money back gaurantee' },
        postButtonTextTypography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-pricing-post-button-text' }] },
        postButtonTextColor: {
            type: 'string',
            default: '#696969',
            style: [{
                condition: [
                    { key: 'enablePostButtonText', relation: '==', value: true },
                ],
                selector: '{{QUBELY}} .qubely-pricing-postbutton-text{ color: {{postButtonTextColor}};}'
            }]
        },
        postButtonTextPaddingTop: {
            type: 'object',
            default: { md: 5, unit: 'px' },
            style: [{
                condition: [
                    { key: 'enablePostButtonText', relation: '==', value: true },
                ],
                selector: '{{QUBELY}} .qubely-pricing-postbutton-text{ margin-top: {{postButtonTextPaddingTop}};}'
            }]
        },
        postButtonTextPaddingBottom: {
            type: 'object',
            default: { md: 5, unit: 'px' },
            style: [{
                condition: [
                    { key: 'enablePostButtonText', relation: '==', value: true },
                ],
                selector: '{{QUBELY}} .qubely-pricing-postbutton-text{ margin-bottom: {{postButtonTextPaddingBottom}};}'
            }]
        },


        // features
        enableFeatures: { type: 'boolean', default: true },
        controlledFeaturesPanel: { type: 'boolean', default: true },
        showFeaturesPanel: { type: 'boolean', default: false },
        listItems: {
            type: 'array',
            default: [
                {
                    icon: 'fas fa-check',
                    text: 'Unlimited domain use',
                    customColor: false
                },
                {
                    icon: 'fas fa-check',
                    text: '1 year customer support',
                    customColor: false
                },
                {
                    icon: 'fas fa-times',
                    text: 'Access to all plugins',
                    customColor: '#f00'
                },
                {
                    icon: 'fas fa-check',
                    text: 'Access to all themes',
                    customColor: false
                },
            ]

        },
        clickedListItem: { type: 'number', default: 0 },
        listComponent: { type: 'boolean', default: true },
        listType: { type: 'string', default: 'unordered' },
        bulletStyle: { type: 'string', default: 'check-circle-outline' },
        showGlobalSettings: { type: 'boolean', default: true },
        showContextMenu: { type: 'boolean', default: true },

    },
    edit: Edit,
    save: Save
})