
import Progress from './Progress'
import icons from "../../helpers/icons";
const { Fragment, Component } = wp.element;
const { PanelBody, Toolbar, TextControl } = wp.components
const { InspectorControls, BlockControls, RichText } = wp.blockEditor
const { __ } = wp.i18n
const {
    Styles,
    Range,
    Color,
    ColorAdvanced,
    RadioAdvanced,
    Toggle,
    Typography,
    IconList,
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
                iconStyle,
                enableIcon,
                iconText,
                iconTextColor,
                iconTypography,
                iconName,
                iconSize,
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
            layout,
            corner: layout === 'fill' ? 'unset' : corner,
            uniqueId,
            percent: progress,
            thickness: layout === 'fill' ? (size / 2) : (size * (thickness * .5)) / 100,
            thicknessBg: layout === 'outline_fill' ? ((size * (thickness * .5)) / 100) : layout === 'fill' ? (size / 2) : (size * (thicknessBg * .5)) / 100,
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

                        {layout !== 'fill' && (
                                <RadioAdvanced
                                    label={__('Corner')}
                                    options={[
                                        { label: 'Sharp', value: 'unset', title: 'Sharp' },
                                        { label: 'Round', value: 'round', title: 'Round' },
                                    ]}
                                    value={corner}
                                    onChange={(value) => setAttributes({ corner: value })} />
                            )
                        }


                        {
                            layout !== 'fill' && <Range label={__('Progress Width')} value={thickness} onChange={(value) => setAttributes({ thickness: value })} min={1} max={100} />
                        }

                    </PanelBody>

                    <PanelBody title={__('Circle')}>
                        {
                            layout === 'outline' && <Range label={__('Circle Width')} value={thicknessBg} onChange={(value) => setAttributes({ thicknessBg: value })} min={1} max={100} />
                        }
                        <Color label={__('Circle Background')} value={background} onChange={val => setAttributes({ background: val })} />
                    </PanelBody>

                    <PanelBody title={__('Percentage/Icon')}>
                        <Toggle label={__('Enable Icon')} value={enableIcon} onChange={val => setAttributes({ enableIcon: val })} />
                        { enableIcon &&
                            <Fragment>
                                <RadioAdvanced
                                    label={__('Type')}
                                    options={[
                                        { label: 'Text', value: 'text', title: 'Text' },
                                        { label: 'Image', value: 'image', title: 'Image' },
                                        { label: 'Icon', value: 'icon', title: 'Icon' },
                                    ]}
                                    value={iconStyle}
                                    onChange={(value) => setAttributes({ iconStyle: value })} />



                                {
                                    iconStyle === 'icon' && (
                                        <Fragment>
                                            <IconList
                                                value={iconName}
                                                onChange={iconName => setAttributes({ iconName })} />
                                            <Range label={__('Icon Size')} value={iconSize} onChange={(iconSize) => setAttributes({ iconSize })} min={10} max={100} />

                                        </Fragment>
                                    )
                                }

                                {iconStyle === 'text' && (
                                    <TextControl
                                        label="Icon Text"
                                        value={iconText}
                                        onChange={ ( iconText ) => setAttributes({iconText}) }
                                    />
                                )}
                                {iconStyle !== 'image' && (
                                    <Color label={__('Text Color')} value={iconTextColor} onChange={iconTextColor => setAttributes({ iconTextColor })} />
                                )}
                                {iconStyle === 'text' && (
                                    <Typography value={iconTypography} onChange={(value) => setAttributes({ iconTypography: value })} />
                                )}

                            </Fragment>
                        }
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
                    <div className="qubely-progress-parent">
                        <Progress {...progressAttr} />
                        <div className="qubely-progress-inner-text">
                            {iconStyle === 'text' && (
                                <RichText
                                    value={ iconText }
                                    placeholder={__('Text Here')}
                                    onChange={ ( iconText ) => setAttributes( { iconText } ) }
                                />
                            )}
                            {iconStyle === 'icon' && (
                                <span className={`qubely-pie-icon ${iconName}`} />
                            )}
                        </div>
                    </div>
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
