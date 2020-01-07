const {
    gloalSettings: {
        globalAttributes
    }
} = wp.qubelyComponents

export const attributes = {
    uniqueId: { type: 'string', default: '' },
    // Global
    ...globalAttributes,
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,  // Global Settings
    spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{QUBELY}}' }] },
    animatedText: { type: 'array', default: ['Apple', 'Banana', 'Orange'] },
    animationType: { type: 'string', default: 'text-clip' },
    typography: {
        type: 'object',
        default: {},
        style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading' }]
    },
    animatedTextTypography: {
        type: 'object',
        default: {},
        style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading .animated-text-words-wrapper' }]
    },
    titleBefore: {
        type: 'string',
        default: 'Before Text'
    },
    titleAfter: {
        type: 'string',
        default: 'After Text'
    },
    color: {
        type: 'string', default: '#000',
        style: [
            {

                selector: '{{QUBELY}}.qubely-addon-animated-heading { color:{{color}}; }'
            }
        ]
    },
    animatedTextColor: {
        type: 'object',
        default: {
            type: 'color',
            textColor: true,
            openColor: 1,
            color: '#2184F9',
            gradient: {
                color1: '#1066CC',
                color2: '#55cd37',
                direction: 0,
                start: 0,
                stop: 100
            }
        },
        style: [
            {

                selector: '{{QUBELY}}.qubely-addon-animated-heading .animated-text-words-wrapper span'
            }
        ]
    },
    animatedTextBgColor: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 0,
            color: '#2184F9',
            gradient: {
                color1: '#1066CC',
                color2: '#55cd37',
                direction: 0,
                start: 0,
                stop: 100
            }
        },
        style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading .animated-text-words-wrapper' }]
    },

    animatedTextPadding: {
        type: 'object',
        default: {
            openPadding: 0,
            paddingType: 'global',
            global: { md: '5' },
            custom: { md: '5 5 5 5' },
            unit: 'px'
        },
        style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading .qubely-animated-text' }]
    },
    animatedTextBorderRadius: {
        type: 'object',
        default: {
            radiusType: 'global',
            global: {},
            unit: 'px'
        },
        style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading .animated-text-words-wrapper' }]
    },
    border: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading' }] },
    bgBorderColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading:hover {border-color: {{bgBorderColorHover}};}' }] },

    bgShadow: { type: 'object', default: { openShadow: 0, horizontal: 1, vertical: 1, blur: 2, color: 'rgba(0, 0, 0, .2)', spread: 0 }, style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading' }] },
    bgShadowHover: { type: 'object', default: { color: '' }, style: [{ selector: '{{QUBELY}}.qubely-addon-animated-heading:hover' }] },

    showGlobalSettings: {
        type: 'boolean',
        default: true
    },
    showContextMenu: {
        type: 'boolean',
        default: true
    }
};