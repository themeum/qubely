const { __ } = wp.i18n;
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
    showTitle: {
        type: 'boolean',
        default: true
    },
    allowedAnchors: {
        type: 'object',
        default: {
            h1: true,
            h2: true,
            h3: true,
            h4: true,
            h5: true,
            h6: true,
        }
    },
    scrollToTop: {
        type: 'boolean',
        default: true
    },
    title: {
        type: 'string',
        default: 'Table of Contents'
    },
    align: {
        type: 'string',
        default: 'left',
    },
    tableType: {
        type: 'string',
        default: 'ordered'
    },
    minimizeBox: {type: 'boolean', default: false},

    headerBg: {
        type: 'string',
        default: '#F7FCFF',
        style: [{ selector: '{{QUBELY}} .qubely-table-of-contents-header { background-color: {{headerBg}} }' }]
    },

    headingSize: {
        type: 'number',
        default: {
            md: 22,
            unit: 'px'
        },
        style: [{
            selector: '{{QUBELY}} .qubely-table-of-contents-header{font-size: {{headingSize}}}'
        }]
    },
    bodyFontSize: {
        type: 'number',
        default: {
            md: 18,
            unit: 'px'
        },
        style: [{
            selector: '{{QUBELY}} .qubely-table-of-contents-body{font-size: {{bodyFontSize}}}'
        }]
    },
    headerPaddingX: {
        type: 'number',
        default: {
            md: 20,
            unit: 'px'
        },
        style: [{
            selector: '{{QUBELY}} .qubely-table-of-contents-header{padding-left: {{headerPaddingX}}; padding-right: {{headerPaddingX}}}'
        }]
    },
    headerPaddingY: {
        type: 'number',
        default: {
            md: 15,
            unit: 'px'
        },
        style: [{
            selector: '{{QUBELY}} .qubely-table-of-contents-header{padding-top: {{headerPaddingY}}; padding-bottom: {{headerPaddingY}}}'
        }]
    },
    enableHeaderBorder: {type: 'boolean', default: true},
    headerBorderWidth: {
        type: 'number',
        default: {
            md: 1,
            unit: 'px'
        },
        style: [{
            condition: [{
                key: 'enableHeaderBorder',
                relation: '==',
                value: true
            }],
            selector: '{{QUBELY}} .qubely-table-of-contents-header{ border-bottom: {{headerBorderWidth}} solid}'
        }]
    },
    headerBorderColor: {
        type: 'string',
        default: '#EFEFEF',
        style: [{
            condition: [{
                key: 'enableHeaderBorder',
                relation: '==',
                value: true
            }],
            selector: '{{QUBELY}} .qubely-table-of-contents-header{ border-bottom-color: {{headerBorderColor}}}'
        }]
    },
    bodyBg: {
        type: 'object',
        default: {
            openColor: 1,
            type: 'color',
            color: '#ffffff',
        },
        style: [{ selector: '{{QUBELY}} .qubely-table-of-contents' }]
    },
    bodyPaddingX: {
        type: 'number',
        default: {
            md: 20,
            unit: 'px'
        },
        style: [{
            selector: '{{QUBELY}} .qubely-table-of-contents-body{padding-left: {{bodyPaddingX}}; padding-right: {{bodyPaddingX}}}'
        }]
    },
    bodyPaddingY: {
        type: 'number',
        default: {
            md: 10,
            unit: 'px'
        },
        style: [{
            selector: '{{QUBELY}} .qubely-table-of-contents-body{padding-top: {{bodyPaddingY}}; padding-bottom: {{bodyPaddingY}}}'
        }]
    },
    bodyBorder: {
        type: 'object',
        default: {
            borderType: 'global',
            widthType: 'global',
            openBorder: 1,
            type: 'solid',
            unit: 'px',
            color: '#EFEFEF',
            global: {
                md: 1
            }
        },
        style: [
            {
                selector: '{{QUBELY}} .qubely-table-of-contents'
            }
        ]
    },
    bodyShadow: {
        type: 'object',
        default: {
            openShadow: 1,
            inset: '',
            horizontal: 0,
            vertical: 32,
            blur: 54,
            spread: -20,
            color: 'rgba(0, 0, 0, .2)'
        },
        style: [
            {
                selector: '{{QUBELY}} .qubely-table-of-contents'
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
                selector: '{{QUBELY}} .qubely-table-of-contents'
            }
        ]
    },
    headerLinks: {
        type: 'string',
        default: ''
    },

    collapsibleAlignment: {
        type: 'string',
        default: 'qubely-justify-between'
    },

    collapsibleType: {
        type: 'string',
        default: 'text'
    },

    collapsibleOpen: {
        type: 'string',
        default: __('[Show]')
    },

    collapsibleClose: {
        type: 'string',
        default: __('[Hide]')
    },

    collapsibleIcon: {
        type: 'string',
        default: 'angle'
    },

    isCollapsed: {
        type: 'boolean',
        default: false
    },

    // Global
    ...globalAttributes
}
export default attributes;