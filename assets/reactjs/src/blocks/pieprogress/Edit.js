
import Progress from './Progress'
const { Fragment, Component } = wp.element;
const { PanelBody, Toolbar } = wp.components
const { InspectorControls, BlockControls } = wp.blockEditor
const { __ } = wp.i18n
const {
    Range,
    Color,
    ColorAdvanced,
    Inline: { InlineToolbar },
    CssGenerator: { CssGenerator },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    gloalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    }
} = wp.qubelyComponents


class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            spacer: true
        }
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }

    render() {


        const {
            name,
            clientId,
            attributes,
            setAttributes,
            attributes: {
                uniqueId,
                progress,
                size,
                thickness,
                thicknessBg,
                background,
                fillColor,

                //animation
                animation,
                //global
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss,
                interaction
            }
        } = this.props

        const progressAttr = {
            size,
            uniqueId,
            percent: progress,
            thickness,
            thicknessBg,
            emptyFill: background,
            fill: fillColor
        }

        if (uniqueId) { CssGenerator(this.props.attributes, 'pieprogress', uniqueId); }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="">
                        <Range label={__('Progress')} value={progress} onChange={(value) => setAttributes({ progress: value })} min={0} max={100} />
                        <Range label={__('Thickness')} value={thickness} onChange={(value) => setAttributes({ thickness: value })} min={1} max={100} />
                        <Range label={__('Background Thickness')} value={thicknessBg} onChange={(value) => setAttributes({ thicknessBg: value })} min={1} max={100} />
                        <Range label={__('Size')} value={size} onChange={(value) => setAttributes({ size: value })} min={20} max={500} />
                    </PanelBody>
                    <PanelBody title="Bar" initialOpen={false}>
                        <ColorAdvanced label={__('Bar Background')} value={fillColor} onChange={val => setAttributes({ fillColor: val })} />
                    </PanelBody>
                    <PanelBody title={__('Background')} initialOpen={false}>
                        <Color label={__('Empty Background')} value={background} onChange={val => setAttributes({ background: val })} />
                    </PanelBody>

                    {animationSettings(uniqueId, animation, setAttributes)}
                    {interactionSettings(uniqueId, interaction, setAttributes)}
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}
                <div className={`qubely-block-${uniqueId}`} onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}>
                    <Progress {...progressAttr} />
                    <div ref="qubelyContextMenu" className="qubely-context-menu-wraper">
                        <ContextMenu
                            name={name}
                            clientId={clientId}
                            attributes={attributes}
                            setAttributes={setAttributes}
                            qubelyContextMenu={this.refs.qubelyContextMenu}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Edit
