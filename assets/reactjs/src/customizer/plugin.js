const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { PanelBody } = wp.components
const { withDispatch, select } = wp.data;
import { _equal } from '../components/HelperFunction'
import { CssGenerator } from '../components/CssGenerator'
import { Typography, Color } from '../components/FieldRender'
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
import { getInitialSettings, updateGlobalData, saveGlobalData } from './action'


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

    updateField( attrValue ){
        const {  setAttributes } = this.props 
        const { globalSettings } = this.state
        const newSettings = {...globalSettings, ...attrValue }
        setAttributes( attrValue )
        this.setState({globalSettings : {...newSettings}, fetched: false })
    }

    renderFields(){
        const { body, p, h1, h2, h3, h4, h5, h6, a_color, a_typography } = this.state.globalSettings
        
        return (
            <Fragment>
                {/* Body ( Font+Color )
                Heading ( Font + Color )
                Link ( Color + Hover Color )
                Button (  ) feb-29 */}
                <PanelBody initialOpen={false} title={__('body Style')}>
                    <Typography label={__('Body')} color value={body} onChange={ val => this.updateField({ body: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('P Style')}>
                    <Typography label={__('P')} color value={p} onChange={ val => this.updateField({ p: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('H1 Style')}>
                    <Typography label={__('H1')} color value={h1} onChange={ val => this.updateField({ h1: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('H2 Style')}>
                    <Typography label={__('H2')} color value={h2} onChange={ val => this.updateField({ h2: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('H3 Style')}>
                    <Typography label={__('H3')} color value={h3} onChange={ val => this.updateField({ h3: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('H4 Style')}>
                    <Typography label={__('H4')} color value={h4} onChange={ val => this.updateField({ h4: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('H5 Style')}>
                    <Typography label={__('H5')} color value={h5} onChange={ val => this.updateField({ h5: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('H6 Style')}>
                    <Typography label={__('H6')} color value={h6} onChange={ val => this.updateField({ h6: val }) } />
                </PanelBody>
                <PanelBody initialOpen={false} title={__('Link Style')}>
                    <Typography label={__('Link')} color value={a_typography} onChange={ val => this.updateField({ a_typography: val }) } />
                    <Color label={__('Hover Color')} value={a_color}  onChange={ val => this.updateField({ a_color: val }) } />
                </PanelBody>
            </Fragment>
        )
    }

    render() {
        const { globalSettings } = this.state
        if( globalSettings !== null ){
            CssGenerator( globalSettings, 'pagesettings', '82982429487' )
        }
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