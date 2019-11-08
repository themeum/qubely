const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { PanelBody } = wp.components
const { withDispatch, select } = wp.data;
const {CssGenerator: { CssGenerator }, Typography, Color, Separator,HelperFunction: { _equal }  } = wp.qubelyComponents
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;


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

class Plugin extends Component {
    constructor(){
        super(...arguments)
        this.state = {
            globalSettings: null,
            fetched : false
        }
    }
    
    componentDidMount(){
        let globalAttributes = wp.blocks.getBlockAttributes( 'qubely/pagesettings' )
        if( typeof window.globalData.success === 'undefined' ){
            getInitialSettings().then( data=> {
                if( data.success  === true ){
                    globalAttributes = {...globalAttributes, api_fetch: true }
                    let globalSettings = {...globalAttributes, ...data.settings }
                    this.setState({ globalSettings: globalSettings, fetched: true })
                }
            })
        }else{
            let globalSettings = {...globalAttributes, ...window.globalData.settings }
            this.setState({ globalSettings, fetched: true })
        }
    }
    
    componentWillUpdate( nextProps, nextState ){
        if( !_equal(this.state.globalSettings, nextState.globalSettings) && nextState.fetched === false ){
            nextProps.makePostDarty()
        }
    }

    setPresetColor( blocks, prev, next ){
        const { updateBlockAttributes } = wp.data.dispatch('core/block-editor')
        if( prev && next ){
            blocks.map( row => {
                const { attributes, name, clientId } = row
                const blockName = name.split('/')
                if( blockName[0] === 'qubely' && attributes.uniqueId ){
                    Object.keys(attributes).forEach(function(key) {
                        if( typeof attributes[key] == 'string' ){
                            if( attributes[key] == prev ){
                                updateBlockAttributes( clientId, { [key]: next } )
                            }
                        }else if( typeof attributes[key] == 'object' ){
                            if( attributes[key].color && attributes[key].color == prev ){
                                updateBlockAttributes( clientId, { [key]: Object.assign( {}, attributes[key], { color: next } ) } )
                            }
                        }
                    });
                }
                if( row.innerBlocks && (row.innerBlocks).length > 0 ){
                    this.setPresetColor(row.innerBlocks)
                }
            })
        }
    }

    updateField( attrValue ){
        const {  setAttributes } = this.props 
        const { globalSettings } = this.state
        const newSettings = {...globalSettings, ...attrValue }
        
        if( attrValue.colorPreset1 ){
            this.setPresetColor( wp.data.select('core/block-editor').getBlocks(), globalSettings.colorPreset1, attrValue.colorPreset1 )
        }
        if( attrValue.colorPreset2 ){
            this.setPresetColor( wp.data.select('core/block-editor').getBlocks(), globalSettings.colorPreset2, attrValue.colorPreset2 )
        }
        if( attrValue.colorPreset3 ){
            this.setPresetColor( wp.data.select('core/block-editor').getBlocks(), globalSettings.colorPreset3, attrValue.colorPreset3 )
        }
        if( attrValue.colorPreset4 ){
            this.setPresetColor( wp.data.select('core/block-editor').getBlocks(), globalSettings.colorPreset4, attrValue.colorPreset4 )
        }
        if( attrValue.colorPreset5 ){
            this.setPresetColor( wp.data.select('core/block-editor').getBlocks(), globalSettings.colorPreset5, attrValue.colorPreset5 )
        }
        if( attrValue.colorPreset6 ){
            this.setPresetColor( wp.data.select('core/block-editor').getBlocks(), globalSettings.colorPreset6, attrValue.colorPreset6 )
        }

        setAttributes( attrValue )
        this.setState({globalSettings : {...newSettings}, fetched: false })
    }

    renderFields(){
        const { body, p, h1, h2, h3, h4, h5, h6, button, colorPreset1, colorPreset2, colorPreset3, colorPreset4, colorPreset5, colorPreset6 } = this.state.globalSettings
        
        return (
            <Fragment>
                <PanelBody title={__('Color Palette')} initialOpen={true}>
                    <div className="qubely-d-flex qubely-align-justified">
                        <Color disableClear disablePalette value={colorPreset1} onChange={ val => this.updateField({ colorPreset1: val }) } />
                        <Color disableClear disablePalette value={colorPreset2} onChange={ val => this.updateField({ colorPreset2: val }) } />
                        <Color disableClear disablePalette value={colorPreset3} onChange={ val => this.updateField({ colorPreset3: val }) } />
                        <Color disableClear disablePalette value={colorPreset4} onChange={ val => this.updateField({ colorPreset4: val }) } />
                        <Color disableClear disablePalette value={colorPreset5} onChange={ val => this.updateField({ colorPreset5: val }) } />
                        <Color disableClear disablePalette value={colorPreset6} onChange={ val => this.updateField({ colorPreset6: val }) } />
                    </div>
                </PanelBody>
                <PanelBody title={__('Typography')} initialOpen={false}>
                    <Typography label={__('Body')} value={body} onChange={ val => this.updateField({ body: val }) } /><Separator />
                    <Typography label={__('Heading 1')} value={h1} onChange={ val => this.updateField({ h1: val }) } /><Separator />
                    <Typography label={__('Heading 2')} value={h2} onChange={ val => this.updateField({ h2: val }) } /><Separator />
                    <Typography label={__('Heading 3')} value={h3} onChange={ val => this.updateField({ h3: val }) } /><Separator />
                    <Typography label={__('Heading 4')} value={h4} onChange={ val => this.updateField({ h4: val }) } /><Separator />
                    <Typography label={__('Heading 5')} value={h5} onChange={ val => this.updateField({ h5: val }) } /><Separator />
                    <Typography label={__('Heading 6')} value={h6} onChange={ val => this.updateField({ h6: val }) } /><Separator />
                    <Typography label={__('Button')} value={button} onChange={ val => this.updateField({ button: val }) } />
                </PanelBody>
            </Fragment>
        )
    }

    render() {
        const { globalSettings } = this.state
        return (
            <Fragment>
                <PluginSidebarMoreMenuItem target="qubely-customizer">
                { __( 'Qubely Settings' ) }
                </PluginSidebarMoreMenuItem>
                <PluginSidebar name="qubely-customizer"  title={ __( 'Qubely Global Settings' ) }>
                    { globalSettings !== null && this.renderFields() }
                </PluginSidebar>
            </Fragment>
        );
    }
}

export default compose([
    withDispatch( (dispatch, ownProps) => {
        const setAttributes = ( attr ) => {
            updateGlobalData( attr )
        }
        const makePostDarty = () => {
            const currentMeta = select( 'core/editor' ).getCurrentPostAttribute( 'meta' );
            currentMeta.qubely_global_settings = currentMeta.qubely_global_settings === "true" ? "false" : "true"
            const meta = {...currentMeta, qubely_global_settings: "true" }
            dispatch( 'core/editor' ).editPost( { meta } );
        }
       return { setAttributes, makePostDarty }
    })
    
])(Plugin)

wp.data.subscribe( () => {
    const {isSavingPost, isAutosavingPost} = select("core/editor")
    if( isSavingPost() && (!isAutosavingPost()) && window.globalSaving === false ){
        saveGlobalData()
    }
} );

// -----------------------------
// -----------------------------
// -----------------------------
