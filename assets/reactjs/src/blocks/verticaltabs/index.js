import './style.scss'
import Save from './Save'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/verticaltabs', {
    title: __('Vertical Tabs'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-tabs.svg'} alt={__('Tabs Block')} />,
    description: __('Showcase features in beautiful pre-designed tabs with Qubely Tabs.'),
    supports: {
        html: false,
        className: false,
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {
            tabTitles: [
                { title: 'Tab 1' },
                { title: 'Tab 2' },
                { title: 'Tab 3' }
            ]
        },
        innerBlocks: [
            {
                name: 'qubely/tab',
                innerBlocks: [
                    {
                        name: 'qubely/heading',
                        attributes: {
                            content: 'Qubely - A Full-fledged Gutenberg Builder',
                            alignment: { md: 'center' }
                        },
                    },
                ],
            }
        ],
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        ...globalAttributes,  // Global Settings
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{QUBELY}}' }] },
        navAlignment: { type: 'string', default: 'left' },
        navTextAlignment: { type: 'string', default: 'left' },
        tabs: { type: 'number', default: 3 },
        tabStyle: { type: 'string', default: 'pills' },

        tabTitles: {
            type: 'array',
            default: [
                { title: 'Tab 1' },
                { title: 'Tab 2' },
                { title: 'Tab 3' }
            ]
        },

        typography: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item-button .qubely-vertical-tab-title' }] },
        textTypography: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-nav-text' }] },
        navSubHeadingTypography: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-nav-sub-heading' }] },

        //icons
        iconPosition: { type: 'string', default: 'left' },
        iconSize: {
            type: 'object',
            default: {},
            style: [{ selector: '{{QUBELY}} .qubely-vertical-tab-icon {font-size: {{iconSize}}}' }]
        },
        iconGap: {
            type: 'object',
            default: {
                md: 10,
                unit: 'px'
            },
            style: [{ selector: '{{QUBELY}} .qubely-vertical-tab-item-button.qubely-has-icon-left .qubely-vertical-tab-icon { margin-right: {{iconGap}}; } {{QUBELY}} .qubely-vertical-tab-item-button.qubely-has-icon-right .qubely-vertical-tab-icon { margin-left: {{iconGap}};}' }]
        },


        navLayout: { type: 'number', default: 1 },
        iconType: { type: 'number', default: 1 },
        // Spacing
        textSpacing: { type: 'object', default: { md: 12, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-nav-text{margin-top: {{textSpacing}}}' }] },
        navSubHeadingSpacing: { type: 'object', default: { md: 12, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-nav-sub-heading{margin-top: {{navSubHeadingSpacing}}}' }] },
        navSpacing: { type: 'object', default: { md: 0.01, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item:not(:last-child){margin-bottom: {{navSpacing}};}' }] },
        navWidth: {
            type: 'object',
            default: {
                md: 250,
                unit: 'px'
            },
            style: [{
                selector: '{{QUBELY}} {--qubely-vertical-tab-nav-width: {{navWidth}};}'
            }]
        },

        navPaddingX: {
            type: 'object',
            default: { md: 30, unit: 'px' },
            style: [
                { selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button{padding-left: {{navPaddingX}}; padding-right: {{navPaddingX}};}' }
            ]
        },
        navPaddingY: {
            type: 'object',
            default: { md: 15, unit: 'px' },
            style: [
                { selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button{padding-top: {{navPaddingY}}; padding-bottom: {{navPaddingY}};}' }
            ]
        },

        //Color
        navColor: { type: 'string', default: '#999999', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button { color:{{navColor}}; }' }] },
        iconColor: { type: 'string', default: '#999999', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-icon { color:{{iconColor}}; }' }] },
        iconColorActive: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active .qubely-vertical-tab-icon { color:{{iconColorActive}}; }' }] },
        iconColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-icon, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active:hover .qubely-vertical-tab-icon { color:{{iconColorHover}}; }' }] },

        navSubHeadingColor: { type: 'string', default: '#999999', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-nav-sub-heading{ color:{{navSubHeadingColor}}; }' }] },
        navSubHeadingColorActive: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active .qubely-vertical-tab-nav-sub-heading{ color:{{navSubHeadingColorActive}}; }' }] },
        navSubHeadingColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-nav-sub-heading, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active:hover .qubely-vertical-tab-nav-sub-heading{ color:{{navSubHeadingColorHover}}; }' }] },

        textColor: { type: 'string', default: '#999999', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-nav-text{ color:{{textColor}}; }' }] },
        textColorActive: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active .qubely-vertical-tab-nav-text{ color:{{textColorActive}}; }' }] },
        TextColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-nav-text, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active:hover .qubely-vertical-tab-nav-text{ color:{{TextColorHover}}; }' }] },


        navBg: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '#f3f3f3',
                gradient: {
                    type: 'linear',
                    color1: '#25b5e1',
                    color2: '#45dbca',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button'
                }
            ]
        },

        navColorActive: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active { color:{{navColorActive}}; }' }] },
        navBorderColorActive: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active { border-color:{{navBorderColorActive}}; }' }] },
        navBorderColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover { border-color:{{navBorderColorHover}}; }' }] },

        navBgActive: {
            type: 'object',
            default: {
                openColor: 0,
                type: 'color',
                color: '#f3f3f3',
                gradient: {
                    type: 'linear',
                    color1: '#45dbca',
                    color2: '#25b5e1',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active'
                }
            ]
        },

        navColorHover: {
            type: 'string',
            default: '',
            style: [{
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover { color:{{navColorActive}}; }'
            }]
        },

        navBgHover: {
            type: 'object',
            default: {
                openColor: 0,
                type: 'color',
                color: '#f3f3f3',
                gradient: {
                    type: 'linear',
                    color1: '#45dbca',
                    color2: '#25b5e1',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active:hover'
                }
            ]
        },

        // Nav Border
        navBorder: {
            type: 'object',
            default: {
                widthType: 'global',
                unit: 'px',
                openBorder: 0,
                type: '',
                global: {
                    md: '1'
                },
                color: '#566372',
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item .qubely-vertical-tab-item-button'
                }
            ]
        },
        // navBorderActive: {
        //     type: 'object',
        //     default: {
        //         widthType: 'global',
        //         unit: 'px',
        //         openBorder: 0,
        //         type: '',
        //         global: {
        //             md: '1'
        //         },
        //         color: '#566372',
        //     },
        //     style: [
        //         {
        //             selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item .qubely-vertical-tab-item-button.qubely-vertical-active'
        //         }
        //     ]
        // },
        // navUnderlineBorderColor: {
        //     type: 'string', default: '',
        //     style: [
        //         {
        //             condition: [
        //                 { key: 'tabStyle', relation: '==', value: 'underline' }
        //             ],
        //             selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item-button .qubely-vertical-tab-title { border-bottom-color:{{navUnderlineBorderColor}}; }'
        //         }
        //     ]
        // },
        // navUnderlineBorderColorActive: {
        //     type: 'string', default: '#2184F9',
        //     style: [
        //         {
        //             condition: [
        //                 { key: 'tabStyle', relation: '==', value: 'underline' }
        //             ],
        //             selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item-button.qubely-vertical-active .qubely-vertical-tab-title { border-bottom-color:{{navUnderlineBorderColorActive}}; }'
        //         }
        //     ]
        // },

        // Radius
        navBorderRadiusTabs: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
                global: {
                    md: 4,
                },
                unit: 'px'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button'
                }
            ]
        },

        // Radius Active
        navBorderRadiusTabsActive: {
            type: 'object',
            default: {
                openBorderRadius: 0,
                radiusType: 'global',
                global: {
                    md: 4,
                },
                unit: 'px'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button'
                }
            ]
        },

        // Radius Hover
        navBorderRadiusTabsHover: {
            type: 'object',
            default: {
                openBorderRadius: 0,
                radiusType: 'global',
                global: {
                    md: 4,
                },
                unit: 'px'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button'
                }
            ]
        },

        navText: { type: 'boolean', default: false },
        navSubHeading: { type: 'boolean', default: false },
        enableIcon: { type: 'boolean', default: false },
        navShadow: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button'
                }
            ]
        },
        navShadowActive: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active'
                }
            ]
        },
        navShadowHover: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button.qubely-vertical-active:hover',
                }
            ]
        },

        // Body
        bodyBg: {
            type: 'string', default: '#FFFFFF',
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {background-color: {{bodyBg}};}'
                }
            ]
        },
        bodyPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: {
                    md: 20
                },
                unit: 'px',
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body'
                }
            ]
        },
        bodyBorder: {
            type: 'object',
            default: {
                borderType: 'global'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body'
                }
            ]
        },
        bodyShadow: {
            type: 'object', default: { horizontal: 2, vertical: 2, blur: 3, spread: '0' },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body'
                }
            ]
        },
        bodyBorderRadius: {
            type: 'object',
            default: {
                radiusType: 'global'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body'
                }
            ]
        },
        bodySpacing: {
            type: 'object', default: { md: 20, unit: 'px' },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {margin-left: {{bodySpacing}};}'
                }
            ]
        }
    },
    edit: Edit,
    save: Save
})