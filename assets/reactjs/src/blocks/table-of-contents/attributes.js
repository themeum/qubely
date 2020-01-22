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
        default: 'unordered'
    },
    headerLinks: {
        type: 'string',
        default: ''
    },
    // Global
    ...globalAttributes
}
export default attributes;