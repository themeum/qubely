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