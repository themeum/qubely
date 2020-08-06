const { __ } = wp.i18n
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, RangeControl, TextControl, Toolbar } = wp.components
const { InspectorControls, BlockControls } = wp.blockEditor
const {
    Media,
    Background,
    Tabs,
    Tab,
    Range,
    BoxShadow,
    Separator,
    RadioAdvanced,
    Typography,
    Select,
    Color,
    Styles,
    Toggle,
    Border,
    Alignment,
    BorderRadius,
    gloalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    Inline: {
        InlineToolbar
    },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    withCSSGenerator,
    InspectorTabs,
    InspectorTab,
    InspectorSections
} = wp.qubelyComponents;

import icons from '../../helpers/icons';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            spacer: true
        };
        this.qubelyContextMenu = createRef();
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }

        this.$el = $(this.el);
        this.$el.magnificPopup({
            type: 'iframe',
            rtl: true,
            mainClass: 'mfp-fade',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false
        });
    }

    render() {
        const {
            name,
            clientId,
            attributes,
            isSelected,
            setAttributes,
            attributes: {
                uniqueId,
                className,
                videoSource,
                bgVideo,
                url,
                icon,
                height,
                iconColor,
                iconHoverColor,
                iconSize,
                iconSizeCustom,
                background,
                enableBackgroundOverlay,
                borderRadius,
                layout,
                shadow,
                shadowHover,
                postfix,
                prefix,
                typography,
                textGap,
                overlayBackground,
                overlayBlend,
                overlayOpacity,
                overlayHoverOpacity,
                iconBorderRadius,
                iconBgColor,
                isRipple,
                iconHoverBgColor,
                border,
                hoverBorder,
                prePostColor,
                prePostHoverColor,
                alignment,

                //animation
                animation,
                globalZindex,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                hideTablet,
                hideMobile,
                globalCss,
                interaction
            }
        } = this.props

        const { device } = this.state

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs>
                        <InspectorTab key={'layout'}>
                            <InspectorSections block={'videopopup'} />
                        </InspectorTab>
                        <InspectorTab key={'style'}>
                            <PanelBody title=''>
                                <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                                    options={[
                                        { value: 'fill', svg: icons.videopopup_fill, label: __('Fill') },
                                        { value: 'nofill', svg: icons.videopopup_classic, label: __('Classic') },
                                    ]}
                                />
                                <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} disableJustify />
                            </PanelBody>

                            <PanelBody title={__('Video')} initialOpen={false}>
                                <Select label={__('Source')} value={videoSource} options={[['local', __('Self Hosted ( Local )')], ['external', __('External')]]} onChange={val => setAttributes({ videoSource: val })} />
                                {videoSource == 'external' ?
                                    <TextControl type="url" label={__('URL')} value={url} onChange={val => {
                                        if (val.indexOf('youtu.be')) {
                                            val = val.replace("youtu.be/", "www.youtube.com/watch?v=");
                                        }
                                        setAttributes({ url: val })
                                    }} />
                                    :
                                    <Media
                                        video
                                        panel={true}
                                        value={bgVideo}
                                        multiple={false}
                                        type={['video']}
                                        label={__('Path')}
                                        onChange={val => setAttributes({ bgVideo: val })}
                                    />
                                }
                            </PanelBody>

                            <PanelBody title={__('Icon')} initialOpen={false}>
                                <RadioAdvanced
                                    label={__('Icon')}
                                    options={[
                                        { icon: 'fas fa-play', value: 'fas fa-play', title: __('Play') },
                                        { icon: 'fas fa-video', value: 'fas fa-video', title: __('Video') },
                                        { icon: 'fab fa-youtube', value: 'fab fa-youtube', title: __('YouTube') },
                                        { icon: 'fab fa-vimeo-v', value: 'fab fa-vimeo-v', title: __('Vimeo') },
                                        { icon: 'fas fa-search-plus', value: 'fas fa-search-plus', title: __('Search') }
                                    ]}
                                    value={icon}
                                    onChange={val => setAttributes({ icon: val })}
                                />

                                <BorderRadius label={__('Radius')} value={iconBorderRadius} onChange={val => setAttributes({ iconBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />

                                <RadioAdvanced
                                    label={__('Icon Size')}
                                    options={[
                                        { label: 'S', value: 'small', title: 'Small' },
                                        { label: 'M', value: 'medium', title: 'Medium' },
                                        { label: 'L', value: 'large', title: 'Large' },
                                        { icon: 'fas fa-cog', value: 'custom', title: 'Custom' },
                                    ]}
                                    value={iconSize}
                                    onChange={val => setAttributes({ iconSize: val })}
                                />
                                {iconSize == 'custom' &&
                                    <Fragment>
                                        <Range value={iconSizeCustom} onChange={val => setAttributes({ iconSizeCustom: val })} min={20} max={200} responsive unit device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }

                                <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <Color label={__('Icon Color')} value={iconColor} onChange={val => setAttributes({ iconColor: val })} />
                                        <Color label={__('Background Color')} value={iconBgColor || ''} onChange={val => setAttributes({ iconBgColor: val })} />
                                        <Border label={__('Border')} value={border} onChange={val => setAttributes({ border: val })} min={0} max={20} responsive unit device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <Color label={__('Icon Color')} value={iconHoverColor} onChange={val => setAttributes({ iconHoverColor: val })} />
                                        <Color label={__('Background Color')} value={iconHoverBgColor || ''} onChange={val => setAttributes({ iconHoverBgColor: val })} />
                                        <Border label={__('Border')} value={hoverBorder} onChange={val => setAttributes({ hoverBorder: val })} min={0} max={20} responsive unit device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Tab>
                                </Tabs>

                                {iconBgColor &&
                                    <Toggle label={__('Ripple Effect')} value={isRipple} onChange={val => setAttributes({ isRipple: val })} />
                                }
                            </PanelBody>

                            <PanelBody title={__('Prefix & Postfix')} initialOpen={false}>
                                <TextControl label={__('Prefix')} value={prefix} onChange={val => setAttributes({ prefix: val })} />
                                <TextControl label={__('Postfix')} value={postfix} onChange={val => setAttributes({ postfix: val })} />
                                {(prefix || postfix) &&
                                    <Fragment>
                                        <Range label={__('Spacing')} value={textGap} onChange={val => setAttributes({ textGap: val })} min={0} max={150} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Typography label={__('Typography')} color value={typography} onChange={val => setAttributes({ typography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Tabs>
                                            <Tab tabTitle={__('Normal')}>
                                                <Color label={__('Color')} value={prePostColor} onChange={val => setAttributes({ prePostColor: val })} />
                                            </Tab>
                                            <Tab tabTitle={__('Hover')}>
                                                <Color label={__('Color')} value={prePostHoverColor} onChange={val => setAttributes({ prePostHoverColor: val })} />
                                            </Tab>
                                        </Tabs>
                                    </Fragment>
                                }
                            </PanelBody>

                            {layout == 'fill' &&
                                <Fragment>
                                    <PanelBody title={__('Background')} initialOpen={false}>
                                        <Range label={__('Height')} value={height} onChange={val => setAttributes({ height: val })} min={100} max={1200} responsive unit device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Background label={__('Background')} sources={['image', 'gradient']} value={background} onChange={val => setAttributes({ background: val })} />
                                        {background.openBg == 1 &&
                                            <Fragment>
                                                <BorderRadius label={__('Radius')} value={borderRadius} onChange={(value) => setAttributes({ borderRadius: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                                <Separator />
                                                <Toggle label={__('Enable Overlay')} value={enableBackgroundOverlay} onChange={val => setAttributes({ enableBackgroundOverlay: val })} />
                                                {enableBackgroundOverlay == 1 &&
                                                    <Fragment>
                                                        <Background label={__('Overlay')} sources={['image', 'gradient']} value={overlayBackground} onChange={val => setAttributes({ overlayBackground: val })} />
                                                        {overlayBackground.openBg == 1 &&
                                                            <Fragment>
                                                                <RangeControl beforeIcon={"lightbulb"} label={__('Opacity')} min={0.01} max={1} step={.01} value={overlayOpacity} onChange={val => setAttributes({ overlayOpacity: val })} />
                                                                <RangeControl beforeIcon={"lightbulb"} label={__('Hover Opacity')} min={0.01} max={1} step={.01} value={overlayHoverOpacity} onChange={val => setAttributes({ overlayHoverOpacity: val })} />
                                                                <Select label={__('Overlay Blend Mode')} options={[['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')]]} value={overlayBlend} onChange={val => setAttributes({ overlayBlend: val })} />
                                                            </Fragment>
                                                        }
                                                    </Fragment>
                                                }
                                            </Fragment>
                                        }
                                        <Tabs>
                                            <Tab tabTitle={__('Normal')}>
                                                <BoxShadow label={__('Box-Shadow')} value={shadow} onChange={val => setAttributes({ shadow: val })} />
                                            </Tab>
                                            <Tab tabTitle={__('Hover')}>
                                                <BoxShadow label={__('Box-Shadow')} value={shadowHover} onChange={val => setAttributes({ shadowHover: val })} />
                                            </Tab>
                                        </Tabs>
                                    </PanelBody>
                                </Fragment>
                            }
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
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

                <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        className={`qubely-block-videopopup-wrapper qubely-alignment-${alignment}`}
                        onContextMenu={event => handleContextMenu(event, this.qubelyContextMenu.current)}
                    >
                        {layout == 'fill' && <div className="qubely-block-videopopup-overlay"></div>}
                        <div className={`qubely-block-videopopup qubely-size-${iconSize}`} >
                            <a className="qubely-video-popup" ref={el => this.el = el} href={videoSource == 'external' ? url : (bgVideo.url || '')}>
                                {prefix && <span className="qubely-video-popup-prefix"> {prefix} </span>}
                                {icon &&
                                    <span className="qubely-btn-icon-wrapper">
                                        <i className={`qubely-btn-icon ${icon}`}>
                                            {(iconBgColor && isRipple) && <span className="qubely-ripple" />}
                                        </i>
                                    </span>
                                }
                                {postfix && <span className="qubely-video-popup-postfix">{postfix}</span>}
                            </a>
                        </div>
                        <div
                            ref={this.qubelyContextMenu}
                            className={`qubely-context-menu-wraper`}
                        >
                            <ContextMenu
                                name={name}
                                clientId={clientId}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                qubelyContextMenu={this.qubelyContextMenu.current}
                            />
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}
export default withCSSGenerator()(Edit);