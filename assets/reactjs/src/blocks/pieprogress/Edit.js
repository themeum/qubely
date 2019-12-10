
import Progress from './Progress'
import icons from "../../helpers/icons";
const { Fragment, Component } = wp.element;
const { PanelBody, Toolbar } = wp.components
const { InspectorControls, BlockControls } = wp.blockEditor
const { __ } = wp.i18n
const {
    Styles,
    Range,
    Color,
    ColorAdvanced,
    RadioAdvanced,
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
                corner,
                thickness,
                thicknessBg,
                background,
                fillColor,
                layout,
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
                        <Styles
                            value={layout}
                            onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 'outline', img: icons.pie_outline, label: __('Layout 1') },
                                { value: 'outline_fill', img: icons.pie_outline_fill, label: __('Layout 2') },
                                { value: 'fill', img: icons.pie_fill, label: __('Layout 3') },
                            ]}
                        />
                        <Range label={__('Progress Size')} value={size} onChange={(value) => setAttributes({ size: value })} min={20} max={500} />
                    </PanelBody>
                    <PanelBody title={__('Progress')}>
                        <Range label={__('Progress Count')} value={progress} onChange={(value) => setAttributes({ progress: value })} min={0} max={100} />
                        <ColorAdvanced label={__('Progress Color')} value={fillColor} onChange={val => setAttributes({ fillColor: val })} />

                        <RadioAdvanced
                            label={__('Corner')}
                            options={[
                                { label: 'Sharp', value: 'unset', title: 'Sharp' },
                                { label: 'Round', value: 'round', title: 'Round' },
                            ]}
                            value={corner}
                            onChange={(value) => setAttributes({ corner: value })} />
                        <Range label={__('Progress Width')} value={thickness} onChange={(value) => setAttributes({ thickness: value })} min={1} max={100} />

                    </PanelBody>

                    <PanelBody title={__('Circle')}>
                        <Range label={__('Circle Width')} value={thicknessBg} onChange={(value) => setAttributes({ thicknessBg: value })} min={1} max={100} />
                        <Color label={__('Circle Background')} value={background} onChange={val => setAttributes({ background: val })} />
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
