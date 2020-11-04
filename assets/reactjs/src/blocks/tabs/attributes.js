const {
    gloalSettings: {
        globalAttributes
    }
} = wp.qubelyComponents

const attributes = {

    uniqueId: {
        type: 'string',
        default: ''
    },
    ...globalAttributes,  // Global Settings
    spacer: {
        type: 'object',
        default: {
            spaceTop: {
                md: '10',
                unit: 'px'
            },
            spaceBottom: {
                md: '10',
                unit: 'px'
            }
        },
        style: [{ selector: '{{QUBELY}}' }]
    },
    reverseContent: {
        type: 'boolean',
        default: false,
        style: [
            {
                condition: [
                    { key: 'reverseContent', relation: '==', value: true }
                ],
                selector: '{{QUBELY}} .qubely-block-tab{display: flex; flex-direction:column-reverse;}'
            }
        ]
    },
    autoSwithcing: {
        type: 'boolean',
        default: false,
    },
    delayType: {
        type: 'string',
        default: 'common',
    },
    recreateStyles: {
        type: 'boolean',
        default: true
    },
    defaultDelay: {
        type: 'number',
        default: 3,
    },
    showProgressBar: {
        type: 'boolean',
        default: false,
    },
    progressBarBg: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 1,
            color: '#EEEEEE',
            gradient: {
                color1: '#EEEEEE',
                color2: '#e5e5e5',
                direction: 0,
                start: 0,
                stop: 100,
                type: 'linear',
            }
        },
        style: [
            {
                selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-item.qubely-active .progress'
            }
        ]
    },
    progressBarHeight: {
        type: 'object',
        default: {
            md: "10",
            unit: "px",
        },
        style: [
            {
                selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-item.qubely-active .progress {height:{{progressBarHeight}};}'
            }
        ]
    },
    progressBarSpacing: {
        type: 'object',
        default: {
            md: "2",
            unit: "px",
        },
        style: [
            {
                selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-item.qubely-active .progress {margin-top:{{progressBarSpacing}};}'
            }
        ]
    },
    progressBarRadius: {
        type: 'object',
        default: {
            md: "2",
            unit: "px",
        },
        style: [
            {
                selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-item.qubely-active .progress {border-radius:{{progressBarRadius}};}'
            }
        ]
    },
    navAlignment: {
        type: 'string',
        default: 'left'
    },
    tabs: {
        type: 'number',
        default: 3
    },
    tabStyle: {
        type: 'string',
        default: 'pills'
    },

    tabTitles: {
        type: 'array',
        default: [
            { title: 'Tab 1' },
            { title: 'Tab 2' },
            { title: 'Tab 3' }
        ]
    },

    typography: {
        type: 'object',
        default: {},
        style: [
            { selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title' }
        ]
    },

    //icons
    iconPosition: {
        type: 'string',
        default: 'right'
    },
    iconSize: {
        type: 'object',
        default: {},
        style: [
            {
                selector: '{{QUBELY}} .qubely-tab-icon {font-size: {{iconSize}}}'
            }]
    },
    iconGap: {
        type: 'object',
        default: {
            md: 8,
            unit: 'px'
        },
        style: [{ selector: '{{QUBELY}} .qubely-tab-title.qubely-has-icon-left .qubely-tab-icon { margin-right: {{iconGap}}; } {{QUBELY}} .qubely-tab-title.qubely-has-icon-right .qubely-tab-icon  { margin-left: {{iconGap}};} {{QUBELY}} .qubely-tab-title.qubely-has-icon-top .qubely-tab-icon  { margin-bottom: {{iconGap}};}' }]
    },

    // Size
    navSize: {
        type: 'string',
        default: '6px 15px',
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
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
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
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
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
    navSpacing: {
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
        style: [
            { selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav {margin-left: calc(-{{navSpacing}}/2); margin-right: calc(-{{navSpacing}}/2);} {{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item {margin-left: calc({{navSpacing}}/2); margin-right: calc({{navSpacing}}/2);}' }
        ]
    },

    //Color
    navColor: {
        type: 'string',
        default: '#999999',
        style: [
            { selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title { color:{{navColor}}; }' }
        ]
    },
    navBg: {
        type: 'string',
        default: '#F5F5F5',
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '!=', value: 'underline' }
                ],
                selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item .qubely-tab-title {background-color: {{navBg}};}'
            }
        ]
    },
    navColorActive: {
        type: 'string',
        default: 'var(--qubely-color-1)',
        style: [
            { selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-nav .qubely-tab-item.qubely-active .qubely-tab-title { color:{{navColorActive}}; }' }
        ]
    },
    navBgActive: {
        type: 'string',
        default: '#e5e5e5',
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
        type: 'string',
        default: '',
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
        type: 'string',
        default: 'var(--qubely-color-1)',
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
        type: 'string', default: '#F5F5F5',
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
        type: 'object',
        default: {
            horizontal: 2,
            vertical: 2,
            blur: 3,
            spread: '0'
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
        type: 'string',
        default: '#e5e5e5',
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
        type: 'object',
        default: {
            md: 20,
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '!=', value: 'tabs' }
                ],
                selector: '{{QUBELY}} .qubely-block-tab .qubely-tab-body {padding-top: {{bodyTopSpacing}};}'
            }
        ]
    }
}
export default attributes;