const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { PanelBody } = wp.components
const { withDispatch, select } = wp.data;
import { _equal } from '../components/HelperFunction'
import { CssGenerator } from '../components/CssGenerator'
import { Typography, Color, Separator } from '../components/FieldRender'
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
        const { body, p, h1, h2, h3, h4, h5, h6, button } = this.state.globalSettings
        
        return (
            <Fragment>
                <PanelBody title={__('Typography')} initialOpen={false}>
                    <Typography label={__('Body')} color value={body} onChange={ val => this.updateField({ body: val }) } />
                    <Separator />
                    <Typography label={__('Paragraph')} color value={p} onChange={ val => this.updateField({ p: val }) } />
                    <Separator />
                    <Typography label={__('Heading 1')} color value={h1} onChange={ val => this.updateField({ h1: val }) } />
                    <Separator />
                    <Typography label={__('Heading 2')} color value={h2} onChange={ val => this.updateField({ h2: val }) } />
                    <Separator />
                    <Typography label={__('Heading 3')} color value={h3} onChange={ val => this.updateField({ h3: val }) } />
                    <Separator />
                    <Typography label={__('Heading 4')} color value={h4} onChange={ val => this.updateField({ h4: val }) } />
                    <Separator />
                    <Typography label={__('Heading 5')} color value={h5} onChange={ val => this.updateField({ h5: val }) } />
                    <Separator />
                    <Typography label={__('Heading 6')} color value={h6} onChange={ val => this.updateField({ h6: val }) } />
                    <Separator />
                    <Typography label={__('Button')} color value={button} onChange={ val => this.updateField({ button: val }) } />
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