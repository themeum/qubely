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
        tabVerticalAlign: {
            type: 'string',
            default: 'flex-start' ,
            style: [{
                selector: '{{QUBELY}} .qubely-block-vertical-tab {align-items: {{tabVerticalAlign}}}'
            }]
        },
        tabs: { type: 'number', default: 3 },
        tabStyle: { type: 'string', default: 'layout1' },

        tabTitles: {
            type: 'array',
            default: [
                { title: 'Automatic Night Modes', iconName: 'fab fa-facebook' },
                { title: 'Incident impact', iconName: 'fab fa-twitter' },
                { title: 'Powers Matters', iconName: 'fab fa-linkedin' }

            ]
        },

        typography: { 
            type: 'object', 
            default: {}, 
            style: [{ 
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item-button .qubely-vertical-tab-title' 
            }] 
        },
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
        navSpacing: { 
            type: 'object', 
            default: { md: 8, unit: 'px' }, 
            style: [{
                condition: [{ key: 'tabStyle', relation: '!=', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item:not(:last-child){margin-bottom: {{navSpacing}};}' 
            }] 
        }, 
        navSpacing3: {
            type: 'object',
            default: {
                md: 0,
                unit: 'px'
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item:not(:last-child){margin-bottom: {{navSpacing3}};}'
            }]
        },
        
        navWidth: {
            type: 'number',
            default: 260,
            style: [{
                selector: '{{QUBELY}} {--qubely-vertical-tab-nav-width: {{navWidth}}px;}'
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
            default: { md: 18, unit: 'px' },
            style: [
                { selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button{padding-top: {{navPaddingY}}; padding-bottom: {{navPaddingY}};}' }
            ]
        },

        arrowWidth: {
            type: 'string',
            default: 30,
            style: [
                { selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item::after{border-left-width: calc({{arrowWidth}}px / 2); border-right-width: calc({{arrowWidth}}px / 2) } ' }
            ]
        },

        arrowHeight: {
            type: 'string',
            default: 20,
            style: [
                { selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item::after{border-top-width: calc({{arrowHeight}}px / 2); border-bottom-width: calc({{arrowHeight}}px / 2) } ' }
            ]
        },

        arrowColor: { 
            type: 'string', 
            default: '#2084F9', 
            style: [
                { 
                    condition: [{key: 'navAlignment', relation: '==', value: 'left'}],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item::after{border-left-color: {{arrowColor}}}' 
                },
                { 
                    condition: [{key: 'navAlignment', relation: '==', value: 'right'}],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item::after{border-right-color: {{arrowColor}}}' 
                }
            ] 
        },

        arrowColorHover: { 
            type: 'string', 
            default: '', 
            style: [{ 
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item:hover::after{border-left-color: {{arrowColor}}}' 
            }] 
        },

        //Color
        navColor: { 
            type: 'string', 
            default: '#999999', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '!=', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button,{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-title { color:{{navColor}}; }' 
            }] 
        },
        navColor3: {
            type: 'string',
            default: '#ffffff',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button,{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-title { color:{{navColor3}}; }'
            }]
        },

        navColorActive: {
            type: 'string',
            default: '#3979FF',
            style: [{
                condition: [{ key: 'tabStyle', relation: '!=', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button .qubely-vertical-tab-title, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button { color:{{navColorActive}}; }'
            }]
        },

        navColorActive3: {
            type: 'string',
            default: '#ffffff',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button .qubely-vertical-tab-title, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button { color:{{navColorActive3}}; }'
            }]
        },

        iconColor: { 
            type: 'string', 
            default: '#999999', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-icon { color:{{iconColor}}; }' 
            }] 
        },
        iconColor2: { 
            type: 'string', 
            default: '#999999', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-icon { color:{{iconColor2}}; }' 
            }] 
        },
        iconColor3: { 
            type: 'string', 
            default: '#ffffff', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-icon { color:{{iconColor3}}; }' 
            }] 
        },

        iconColorActive: { 
            type: 'string', 
            default: '#2184F9', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button .qubely-vertical-tab-icon { color:{{iconColorActive}}; }' 
            }]
        },
        iconColorActive2: { 
            type: 'string', 
            default: '#2184F9', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button .qubely-vertical-tab-icon { color:{{iconColorActive2}}; }' 
            }]
        },
        iconColorActive3: { 
            type: 'string', 
            default: '', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button .qubely-vertical-tab-icon { color:{{iconColorActive3}}; }' 
            }]
        },
        

        iconColorHover: { 
            type: 'string', 
            default: '', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-icon, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-icon { color:{{iconColorHover}}; }' 
            }]
        },
        iconColorHover2: { 
            type: 'string', 
            default: '', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-icon, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-icon { color:{{iconColorHover2}}; }' 
            }]
        },
        iconColorHover3: { 
            type: 'string', 
            default: '', 
            style: [{ 
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-icon, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-icon { color:{{iconColorHover3}}; }' 
            }]
        },

        navSubHeadingColor: { type: 'string', default: '#999999', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-nav-sub-heading{ color:{{navSubHeadingColor}}; }' }] },
        navSubHeadingColorActive: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button .qubely-vertical-tab-nav-sub-heading{ color:{{navSubHeadingColorActive}}; }' }] },
        navSubHeadingColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-nav-sub-heading, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-nav-sub-heading{ color:{{navSubHeadingColorHover}}; }' }] },

        textColor: { 
            type: 'string', 
            default: '#999999', 
            style: [{ 
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button .qubely-vertical-tab-nav-text{ color:{{textColor}}; }' 
            }] 
        },
        // textColorActive: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button .qubely-vertical-tab-nav-text{ color:{{textColorActive}}; }' }] },
        textColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-nav-text, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-nav-text{ color:{{textColorHover}}; }' }] },

        bodyBg2: {
            type: 'string',
            default: '#f7f7f7',
            style: [{
                condition: [{key: 'tabStyle', relation: '==', value: 'layout2'}],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {background-color: {{bodyBg2}};}'
            }]
        },

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
                    condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item'
                }
            ]
        },

        navBg2: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '',
                gradient: {
                    type: 'linear',
                    color1: '#25b5e1',
                    color2: '#45dbca',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item'
            }]
        },

        navBg3: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '#5A13FE',
                gradient: {
                    type: 'linear',
                    color1: '#25b5e1',
                    color2: '#45dbca',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item'
            }]
        },

        navBgActive: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '#EBF1FF',
                gradient: {
                    type: 'linear',
                    color1: '#45dbca',
                    color2: '#25b5e1',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button'
            }]
        },

        navBgActive2: {
            type: 'object',
            default: {
                openColor: 0,
                type: 'color',
                color: '',
                gradient: {
                    type: 'linear',
                    color1: '#45dbca',
                    color2: '#25b5e1',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button'
            }]
        },

        navBgActive3: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '#3902B8',
                gradient: {
                    type: 'linear',
                    color1: '#45dbca',
                    color2: '#25b5e1',
                    direction: '47',
                    start: '0',
                    stop: '100'
                }
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button'
            }]
        },


        navColorHover: {
            type: 'string',
            default: '',
            style: [{
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover, '
                        + '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover,'
                        + '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-title,'
                        + '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover .qubely-vertical-tab-title { color:{{navColorHover}}; }'
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
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item .qubely-vertical-tab-item-button:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover'
                }
            ]
        },

        // Nav Border
        navBorder: {
            type: 'object',
            default: {
                widthType: 'custom',
                unit: 'px',
                openBorder: 1,
                type: 'solid',
                color: 'transparent',
                custom: {
                    md: '0 3 0 0'
                },
            },
            style: [
                {
                    condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item .qubely-vertical-tab-item-button'
                }
            ]
        },

        navBorder2: {
            type: 'object',
            default: {
                widthType: 'custom',
                unit: 'px',
                openBorder: 1,
                type: 'solid',
                color: 'transparent',
                custom: {
                    md: '0 0 2 0'
                },
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item .qubely-vertical-tab-item-button'
            }]
        },

        navBorder3: {
            type: 'object',
            default: {
                widthType: 'custom',
                unit: 'px',
                openBorder: 1,
                type: 'solid',
                color: 'transparent',
                custom: {
                    md: '0 0 0 3'
                },
            },
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item .qubely-vertical-tab-item-button'
            }]
        },

        navBorderColorActive: {
            type: 'string',
            default: '#2084f9',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button { border-color:{{navBorderColorActive}}; }'
            }]
        },
        navBorderColorActive2: {
            type: 'string',
            default: '#222222',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button { border-color:{{navBorderColorActive2}}; }'
            }]
        },
        navBorderColorActive3: {
            type: 'string',
            default: '#50E3C2',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button { border-color:{{navBorderColorActive3}}; }'
            }]
        },

        navBorderColorHover: {
            type: 'string',
            default: '',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout1' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover { border-color:{{navBorderColorHover}}; }'
            }]
        },
        navBorderColorHover2: {
            type: 'string',
            default: '',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout2' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover { border-color:{{navBorderColorHover2}}; }'
            }]
        },
        navBorderColorHover3: {
            type: 'string',
            default: '',
            style: [{
                condition: [{ key: 'tabStyle', relation: '==', value: 'layout3' }],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover { border-color:{{navBorderColorHover3}}; }'
            }]
        },

        // Radius
        navBorderRadiusTabs: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
                global: {
                    md: 0,
                },
                unit: 'px'
            },
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item .qubely-vertical-tab-item-button, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item'
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
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button,'
                            +'{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item.qubely-vertical-active'
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
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item:hover .qubely-vertical-tab-item-button,' +
                        '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item:hover,' +
                        '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item.qubely-vertical-active:hover .qubely-vertical-tab-item-button,' +
                        '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-nav .qubely-vertical-tab-item.qubely-vertical-active:hover'
                }
            ]
        },

        navText: { type: 'boolean', default: false },

        enableArrow: { type: 'boolean', default: false },

        navSubHeading: { type: 'boolean', default: false },
        enableIcon: { type: 'boolean', default: true },
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
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button'
                }
            ]
        },
        navShadowHover: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item-button:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active .qubely-vertical-tab-item-button:hover',
                }
            ]
        },

        navShadow2: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item'
                }
            ]
        },
        navShadowActive2: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active'
                }
            ]
        },
        navShadowHover2: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item:hover, {{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-item.qubely-vertical-active:hover',
                }
            ]
        },

        // Body
        bodyColor: {
            type: 'string', default: '',
            style: [
                {
                    condition: [{key: 'tabStyle', relation: '==', value: 'layout1'}],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {color: {{bodyColor}};}'
                }
            ]
        },
        bodyColor2: {
            type: 'string',
            default: '',
            style: [{
                condition: [{key: 'tabStyle', relation: '==', value: 'layout2'}],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {color: {{bodyColor2}};}'
            }]
        },
        bodyColor3: {
            type: 'string',
            default: '#ffffff',
            style: [{
                condition: [{key: 'tabStyle', relation: '==', value: 'layout3'}],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {color: {{bodyColor3}};}'
            }]
        },

        bodyBg: {
            type: 'string', default: '#FFFFFF',
            style: [
                {
                    condition: [{key: 'tabStyle', relation: '==', value: 'layout1'}],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {background-color: {{bodyBg}};}'
                }
            ]
        },
        bodyBg2: {
            type: 'string',
            default: '#f7f7f7',
            style: [{
                condition: [{key: 'tabStyle', relation: '==', value: 'layout2'}],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {background-color: {{bodyBg2}};}'
            }]
        },
        bodyBg3: {
            type: 'string',
            default: '#3902B8',
            style: [{
                condition: [{key: 'tabStyle', relation: '==', value: 'layout3'}],
                selector: '{{QUBELY}} .qubely-block-vertical-tab .qubely-vertical-tab-body {background-color: {{bodyBg3}};}'
            }]
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
                    condition: [{key: 'tabStyle', 'relation': '==', value: 'layout1'}],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab.qubely-alignment-left .qubely-vertical-tab-body {margin-left: {{bodySpacing}};} {{QUBELY}} .qubely-block-vertical-tab.qubely-alignment-right .qubely-vertical-tab-body {margin-right: {{bodySpacing}};}'
                }
            ]
        },
        bodySpacing2: {
            type: 'object', default: { md: 20, unit: 'px' },
            style: [
                {
                    condition: [{key: 'tabStyle', 'relation': '==', value: 'layout2'}],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab.qubely-alignment-left .qubely-vertical-tab-body {margin-left: {{bodySpacing2}};} {{QUBELY}} .qubely-block-vertical-tab.qubely-alignment-right .qubely-vertical-tab-body {margin-right: {{bodySpacing2}};}'
                }
            ]
        },
        bodySpacing3: {
            type: 'object', default: { md: 0, unit: 'px' },
            style: [
                {
                    condition: [{key: 'tabStyle', 'relation': '==', value: 'layout3'}],
                    selector: '{{QUBELY}} .qubely-block-vertical-tab.qubely-alignment-left .qubely-vertical-tab-body {margin-left: {{bodySpacing3}};} {{QUBELY}} .qubely-block-vertical-tab.qubely-alignment-right .qubely-vertical-tab-body {margin-right: {{bodySpacing3}};}'
                }
            ]
        }
    },
    edit: Edit,
    save: Save
})