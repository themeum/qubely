const {
    gloalSettings: {
        globalAttributes
    }
} = wp.qubelyComponents

export const attributes = {
    uniqueId: {
        type: 'string',
        default: ''
    },
    // Global
    ...globalAttributes
}