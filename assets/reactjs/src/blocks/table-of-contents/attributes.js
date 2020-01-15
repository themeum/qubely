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
    headerLinks: {
        type: 'string',
        default: ''
    },
    // Global
    ...globalAttributes
}
export default attributes;