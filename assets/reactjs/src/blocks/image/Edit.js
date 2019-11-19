const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, TextControl, Toolbar, SelectControl } = wp.components
const { RichText, InspectorControls, BlockControls } = wp.blockEditor
const { Media, Range, BoxShadow, Tabs, Tab, RadioAdvanced, Typography, Toggle, Styles, Alignment, ColorAdvanced, Color, Headings, Border, BorderRadius, Padding, Separator, Select, Margin, Url, gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, Inline: { InlineToolbar }, CssGenerator: { CssGenerator }, ContextMenu: { ContextMenu, handleContextMenu }, } = wp.qubelyComponents
import icons from '../../helpers/icons'
class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = { device: 'md', selector: true, spacer: true, openPanelSetting: '' };
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

    handlePanelOpenings = (panelName) => {
        this.setState({ ...this.state, openPanelSetting: panelName })
    }

    render() {
        const {
            uniqueId,
            layout,
            alignment,
            animateOnHover,
            title,
            titleLevel,
            titleTypography,
            titleColor,
            titleVisibleOnHover,

            enableSubTitle,
            subTitle,
            subTitleTypography,
            subTitleColor,
            subTitleSpacing,
            subTitleVisibleOnHover,


            contentAnimation,
            contentPadding,
            contentVerticalAlign,
            contentAlignment,
            
            imgSize,
            image,
            image2x,
            imgAlt,
            imageUrl,
            imageSize,
            imageSizeCustom,
            imageBorderRadius,
            imageOpacity,
            imageBoxShadow,
            imageBoxShadowHover,

            enableCaption,
            imageCaption,
            captionTypography,
            captionColor,
            captionSpacing,

            enableOverlay,
            overlayBg,
            overlayHoverBg,
            overlayBlend,

            enableFrame,
            frameBorder,
            frameMargin,
            frameSendToBack,
            frameAnimateOnHover,
            frameBorderRadius,

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
        } = this.props.attributes

        const { name, clientId, attributes, setAttributes, isSelected } = this.props
        const { openPanelSetting, device } = this.state

        const titleTagName = 'h' + titleLevel;

        if (uniqueId) { CssGenerator(this.props.attributes, 'image', uniqueId); }

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title=''>
                        <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 'simple', svg: icons.image.simple, label: __('Simple') },
                                { value: 'blurb', svg: icons.image.blurb, label: __('Blurb') }
                            ]}
                        />
                        <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} alignmentType="content" disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <Separator />
                        <Media label={__('Image')} multiple={false} type={['image']} panel={true} value={image} onChange={val => setAttributes({ image: val })} />
                        <Media label={__('Retina Image (@2x)')} multiple={false} type={['image']} panel={true} value={image2x} onChange={val => setAttributes({ image2x: val })} />
                        {
                            layout === 'simple' &&
                            <Url label={__('URL')} value={imageUrl} onChange={(value) => setAttributes({ imageUrl: value })} />
                        }
                        <TextControl label={__('Alt Text')} value={imgAlt} onChange={val => setAttributes({ imgAlt: val })} />
                        <RadioAdvanced label={__('Size')} value={imageSize} onChange={(value) => setAttributes({ imageSize: value })}
                            options={[
                                { label: __('Auto'), value: 'auto', title: __('Auto') },
                                { label: __('S'), value: '300px', title: __('Small') },
                                { label: __('M'), value: '600px', title: __('Medium') },
                                { label: __('L'), value: '800px', title: __('Large') },
                                { icon: 'fas fa-cog', value: 'custom', title: __('Custom') },
                            ]}
                        />
                        {imageSize == 'custom' &&
                            <Fragment>
                                <Range label={__('Custom Width')} value={imageSizeCustom} onChange={val => setAttributes({ imageSizeCustom: val })} min={10} max={1920} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Separator />
                            </Fragment>
                        }
                        <Range label={__('Opacity')} value={imageOpacity} onChange={val => setAttributes({ imageOpacity: parseFloat(val) })} min={0.1} max={1} step={.1} />
                        <BorderRadius label={__('Radius')} value={imageBorderRadius} onChange={val => setAttributes({ imageBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <BoxShadow label={__('Box-Shadow')} value={imageBoxShadow} onChange={val => setAttributes({ imageBoxShadow: val })} disableInset />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <BoxShadow label={__('Box-Shadow Hover')} value={imageBoxShadowHover} onChange={val => setAttributes({ imageBoxShadowHover: val })} disableInset />
                            </Tab>
                        </Tabs>
                    </PanelBody>

                    {layout == 'blurb' &&
                        <Fragment>
                            <PanelBody title={__('Title')} initialOpen={false}>
                                <Headings label={__('Title Tag')} selectedLevel={titleLevel} onChange={(value) => setAttributes({ titleLevel: value })} />
                                <Typography label={__('Typography')} value={titleTypography} onChange={val => setAttributes({ titleTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Color label={__('Color')} value={titleColor} onChange={val => setAttributes({ titleColor: val })} />
                            </PanelBody>
                            <PanelBody title={__('Sub Title')} initialOpen={false}>
                                <Toggle label={__('Enable')} value={enableSubTitle} onChange={val => setAttributes({ enableSubTitle: val })} />
                                {enableSubTitle == 1 &&
                                    <Fragment>
                                        <Color label={__('Color')} value={subTitleColor} onChange={val => setAttributes({ subTitleColor: val })} />
                                        <Typography label={__('Typography')} value={subTitleTypography} onChange={val => setAttributes({ subTitleTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Range label={__('Spacing')} value={subTitleSpacing} onChange={val => setAttributes({ subTitleSpacing: val })} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }
                            </PanelBody>
                            <PanelBody title={__('Content')} initialOpen={false}>
                                <Toggle label={__('Animate on Hover')} value={animateOnHover} onChange={val => setAttributes({ animateOnHover: val })} />
                                {animateOnHover == 1 &&
                                    <Fragment>
                                        <Select label={__('Animation')} options={[['none', __('No Animation')], ['slide-top', __('Slide From Top')], ['slide-right', __('Slide From Right')], ['slide-bottom', __('Slide From Bottom')], ['slide-left', __('Slide From Left')], ['zoom-in', __('Zoom In')], ['zoom-out', __('Zoom Out')], ['scale', __('Scale')]]} value={contentAnimation} onChange={val => setAttributes({ contentAnimation: val })} />
                                        <Separator />
                                        <Toggle label={__('Title Reveal on Hover')} value={titleVisibleOnHover} onChange={val => setAttributes({ titleVisibleOnHover: val })} />
                                        {(enableSubTitle == 1 && titleVisibleOnHover != 1) &&
                                            <Toggle label={__('Sub Title Reveal on Hover')} value={subTitleVisibleOnHover} onChange={val => setAttributes({ subTitleVisibleOnHover: val })} />
                                        }
                                        <Separator />
                                    </Fragment>
                                }
                                <Padding label={__('Padding')} value={contentPadding} onChange={val => setAttributes({ contentPadding: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <RadioAdvanced label={__('Vertical Align')} value={contentVerticalAlign} onChange={(value) => setAttributes({ contentVerticalAlign: value })}
                                    options={[
                                        { label: __('Top'), value: 'top', title: __('Top') },
                                        { label: __('Middle'), value: 'center', title: __('Middle') },
                                        { label: __('Bottom'), value: 'bottom', title: __('Bottom') },
                                    ]}
                                />
                                <Alignment label={__('Horizontal Alignment')} value={contentAlignment} alignmentType="content" onChange={val => setAttributes({ contentAlignment: val })} alignmentType="content" disableJustify />
                            </PanelBody>
                            <PanelBody title={__('Overlay')} initialOpen={false}>
                                <Toggle label={__('Enable')} value={enableOverlay} onChange={val => setAttributes({ enableOverlay: val })} />
                                {enableOverlay == 1 &&
                                    <Fragment>

                                        {animateOnHover == 1 ?
                                            <Tabs>
                                                <Tab tabTitle={__('Normal')}>
                                                    <ColorAdvanced label={__('Background')} value={overlayBg} onChange={(value) => setAttributes({ overlayBg: value })} />
                                                </Tab>
                                                <Tab tabTitle={__('Hover')}>
                                                    <ColorAdvanced label={__('Background')} value={overlayHoverBg} onChange={(value) => setAttributes({ overlayHoverBg: value })} />
                                                </Tab>
                                            </Tabs>
                                            :
                                            <Fragment>
                                                <ColorAdvanced label={__('Background')} value={overlayBg} onChange={(value) => setAttributes({ overlayBg: value })} />
                                                <Separator />
                                            </Fragment>
                                        }
                                        <Select label={__('Blend Mode')} options={[['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')]]} value={overlayBlend} onChange={val => setAttributes({ overlayBlend: val })} />
                                    </Fragment>
                                }
                            </PanelBody>

                            <PanelBody title={__('Frame')} initialOpen={false}>
                                <Toggle label={__('Enable')} value={enableFrame} onChange={val => setAttributes({ enableFrame: val })} />
                                {enableFrame == 1 &&
                                    <Fragment>
                                        <Border label={__('Frame')} value={frameBorder} onChange={val => setAttributes({ frameBorder: val })} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Margin
                                            label={__('Margin')}
                                            value={frameMargin}
                                            onChange={(value) => setAttributes({ frameMargin: value })}
                                            unit={['px', 'em', '%']}
                                            max={150}
                                            min={-150}
                                            responsive
                                            device={device}
                                            onDeviceChange={value => this.setState({ device: value })} />

                                        <BorderRadius label={__('Radius')} value={frameBorderRadius} onChange={val => setAttributes({ frameBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />

                                        <Toggle label={__('Send to Back')} value={frameSendToBack} onChange={val => setAttributes({ frameSendToBack: val })} />
                                        {animateOnHover == 1 &&
                                            <Toggle label={__('Visible on Hover')} value={frameAnimateOnHover} onChange={val => setAttributes({ frameAnimateOnHover: val })} />
                                        }
                                    </Fragment>
                                }
                            </PanelBody>
                        </Fragment>
                    }

                    {layout == 'simple' &&
                        <PanelBody title={__('Caption')} initialOpen={false}>
                            <Toggle label={__('Enable')} value={enableCaption} onChange={val => setAttributes({ enableCaption: val })} />
                            {enableCaption == 1 &&
                                <Fragment>
                                    <Typography label={__('Typography')} value={captionTypography} onChange={val => setAttributes({ captionTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    <Color label={__('Color')} value={captionColor} onChange={val => setAttributes({ captionColor: val })} />
                                    <Range label={__('Spacing')} value={captionSpacing} onChange={val => setAttributes({ captionSpacing: val })} min={0} max={100} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                </Fragment>
                            }
                        </PanelBody>
                    }

                    {animationSettings(uniqueId, animation, setAttributes)}

                    {interactionSettings(uniqueId, interaction, setAttributes)}

                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`qubely-block-${uniqueId}`}>
                    <div className={`qubely-block-image qubely-image-layout-${layout}`} onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}>
                        <div className={`qubely-image-media${(layout == 'blurb' && animateOnHover == 1) ? ' qubely-hover-animation-on' : ''}${(layout == 'blurb' && animateOnHover == 1) ? ' qubely-hover-animation-type-' + contentAnimation : ''} qubely-vertical-alignment-${contentVerticalAlign} qubely-horizontal-alignment-${contentAlignment}${enableFrame == 1 ? ((animateOnHover == 1 && frameAnimateOnHover == 1) ? ' qubely-has-frame qubely-frame-animate-on-hover' : ' qubely-has-frame') : ''}`} onClick={() => this.handlePanelOpenings('Media')}>
                            <figure>
                                <div className="qubely-image-container">

                                    {image.url != undefined ?
                                        <Fragment>
                                            {image2x.url != undefined ?
                                                <img className="qubely-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
                                                :
                                                <img className="qubely-image-image" src={image.url} alt={imgAlt && imgAlt} />
                                            }
                                        </Fragment>
                                        :
                                        <div className="qubely-image-image qubely-image-placeholder"><i className="far fa-image"/></div>
                                    }

                                    {layout == 'blurb' &&
                                        <div className="qubely-image-content">
                                            <div className="qubely-image-content-inner">
                                                <RichText
                                                    identifier="content"
                                                    className={`qubely-image-title${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' qubely-visible-on-hover-enabled' : ''}${(animateOnHover == 1 && titleVisibleOnHover == 1) ? ' qubely-visible-on-hover' : ''}`}
                                                    tagName={titleTagName}
                                                    value={title}
                                                    onChange={(value) => setAttributes({ title: value })}
                                                    placeholder={__('Add Title…')}
                                                />

                                                {enableSubTitle == 1 &&
                                                    <RichText
                                                        identifier="content"
                                                        className={`qubely-image-sub-title${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' qubely-visible-on-hover-enabled' : ''}${titleVisibleOnHover == 1 ? ' qubely-visible-on-hover' : (animateOnHover == 1 && subTitleVisibleOnHover == 1) ? ' qubely-visible-on-hover' : ''}`}
                                                        tagName='div'
                                                        value={subTitle}
                                                        onChange={(value) => setAttributes({ subTitle: value })}
                                                        placeholder={__('Add Sub Title…')}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>

                                {(layout == 'simple' && enableCaption == 1) &&
                                    <RichText
                                        key="editable"
                                        tagName='figcaption'
                                        className="qubely-image-caption"
                                        keepPlaceholderOnFocus
                                        placeholder={__('Add Caption...')}
                                        onChange={value => setAttributes({ imageCaption: value })}
                                        value={imageCaption}
                                    />
                                }
                            </figure>
                        </div>

                        <div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
                            <ContextMenu
                                name={name}
                                clientId={clientId}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                qubelyContextMenu={this.refs.qubelyContextMenu}
                            />
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Edit