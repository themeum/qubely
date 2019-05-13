const path = { 
    fetch: '/qubely/v1/global_settings',
    post: '/qubely/v1/global_settings'
}

async function fetchFromApi() {
    return await wp.apiFetch({path: path.fetch })
}

const getInitialSettings = () => {
    return fetchFromApi().then( data => {
        window.globalData = { ...data }
        return data
    } )
}

const updateGlobalData = ( updateData ) => {
    const settings = {...window.globalData.settings}
    window.globalData.settings = {...settings, ...updateData }
}

const saveGlobalData = () =>  {
    window.globalSaving = true
    const settings  = typeof window.globalData.settings === 'undefined' ? null : window.globalData.settings
    if( settings !== null ){
        wp.apiFetch({
                path: path.post,
                method: 'POST',
                data: { settings: JSON.stringify(settings) }
            }).then( data =>  {
                window.globalSaving = false
                return data 
            })
    }
}

export { getInitialSettings, updateGlobalData, saveGlobalData }