import './style.scss'
import Save from './Save'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType('qubely/tabs', {
    title: __('Tabs'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-tabs.svg'} alt={__('Tabs Block')} />,
    description: __('Showcase features in beautiful pre-designed tabs with Qubely Tabs.'),
    supports: { html: false, className: false },
    example: {
        attributes: {
            tabTitles: [
                { title: "Tab 1" },
                { title: "Tab 2" },
                { title: "Tab 3" }
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
                            alignment: {md: "center"}
                        },
                    },
                ],
            }
        ],
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        ...globalAttributes,  // Global Settings
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },
        navAlignment: { type: 'string', default: 'left' },
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

        typography: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title' }] },

        //icons
        iconPosition: { type: 'string', default: 'right' },
        iconSize: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-tab-icon {font-size: {{iconSize}}}' }] },
        iconGap: { type: 'object', default: { md: 8, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-tab-title.qubely-has-icon-left .qubely-tab-icon { margin-right: {{iconGap}}; } {{QUBELY}} .qubely-tab-title.qubely-has-icon-right .qubely-tab-icon  { margin-left: {{iconGap}};} {{QUBELY}} .qubely-tab-title.qubely-has-icon-top .qubely-tab-icon  { margin-bottom: {{iconGap}};}' }] },

        // Size
        navSize: {
            type: 'string', default: '6px 15px',
            style: [
                {
                    condition: [
                        { key: 'navSize', relation: '!=', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title {padding: {{navSize}};}'
                }
            ]
        },
        navPaddingY: {
            type: 'object', default: { md: 10, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'navSize', relation: '==', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title {padding-top: {{navPaddingY}}; padding-bottom: {{navPaddingY}};}'
                }
            ]
        },
        navPaddingX: {
            type: 'object', default: { md: 10, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'navSize', relation: '==', value: 'custom' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title {padding-left: {{navPaddingX}}; padding-right: {{navPaddingX}};}'
                }
            ]
        },

        // Spacing
        navSpacing: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav {margin-left: calc(-{{navSpacing}}/2); margin-right: calc(-{{navSpacing}}/2);} {{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item {margin-left: calc({{navSpacing}}/2); margin-right: calc({{navSpacing}}/2);}' }] },

        //Color
        navColor: { type: 'string', default: '#999999', style: [{ selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title { color:{{navColor}}; }' }] },
        navBg: {
            type: 'string', default: '#F5F5F5',
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '!=', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title {background-color: {{navBg}};}'
                }
            ]
        },
        navColorActive: { type: 'string', default: '#2184F9', style: [{ selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item.qubely-active .qubely-tab-title { color:{{navColorActive}}; }' }] },
        navBgActive: {
            type: 'string', default: '#e5e5e5',
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '!=', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item.qubely-active .qubely-tab-title {background-color : {{navBgActive}};} {{QUBELY}} .qubely-block-tab.qubely-tab-style-tabs .qubely-tab-nav .qubely-tab-item.qubely-active .qubely-tab-title:after {background-color : {{navBgActive}};}'
                }
            ]
        },

        // Nav Border
        navBorder: {
            type: 'object',
            default: {
                widthType: 'global',
                unit: 'px',
            },
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '!=', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title'
                }
            ]
        },
        navBorderActive: {
            type: 'object',
            default: {
                widthType: 'global',
                unit: 'px',
            },
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '!=', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item.qubely-active .qubely-tab-title'
                }
            ]
        },

        // Underline Border
        navUnderlineBorderWidth: {
            type: 'object',
            default: {
                md: 3,
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title {border-bottom: {{navUnderlineBorderWidth}} solid transparent;}'
                }
            ]
        },
        navUnderlineBorderColor: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title { border-bottom-color:{{navUnderlineBorderColor}}; }'
                }
            ]
        },
        navUnderlineBorderColorActive: {
            type: 'string', default: '#2184F9',
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item.qubely-active .qubely-tab-title { border-bottom-color:{{navUnderlineBorderColorActive}}; }'
                }
            ]
        },

        // Radius
        navBorderRadiusTabs: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'custom',
                custom: {
                    md: '4 4 0 0',
                },
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'tabs' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab.qubely-tab-style-tabs .qubely-tab-nav .qubely-tab-item .qubely-tab-title'
                }
            ]
        },

        navBorderRadiusPills: {
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
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'pills' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab.qubely-tab-style-pills .qubely-tab-nav .qubely-tab-item .qubely-tab-title'
                }
            ]
        },

        // Body
        bodyBg: {
            type: 'string', default: '#FFFFFF',
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'tabs' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body {background-color: {{bodyBg}};}'
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
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'tabs' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body'
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
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'tabs' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body'
                }
            ]
        },
        bodyShadow: {
            type: 'object', default: { horizontal: 2, vertical: 2, blur: 3, spread: '0' },
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'tabs' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body'
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
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'tabs' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body'
                }
            ]
        },

        bodySeparatorHeight: {
            type: 'object',
            default: {
                md: 1,
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body {border-top: {{bodySeparatorHeight}} solid transparent;}'
                }
            ]
        },
        bodySeparatorColor: {
            type: 'string', default: '#e5e5e5',
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '==', value: 'underline' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body { border-top-color:{{bodySeparatorColor}}; }'
                }
            ]
        },
        bodyTopSpacing: {
            type: 'object', default: { md: 20, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'tabStyle', relation: '!=', value: 'tabs' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body {padding-top: {{bodyTopSpacing}};}'
                }
            ]
        }
    },
    edit: Edit,
    save: Save
})