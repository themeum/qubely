const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, TextControl, Toolbar } = wp.components
const { RichText, InspectorControls, BlockControls } = wp.blockEditor
const { Media, Tabs, Tab, Range, Separator, RadioAdvanced, Typography, Toggle, Styles, Alignment, ColorAdvanced, Color, Border, BoxShadow, BorderRadius, Padding, gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, Inline: { InlineToolbar }, CssGenerator: { CssGenerator }, ContextMenu: { ContextMenu, handleContextMenu }, } = wp.qubelyComponents
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
            name,
            nameTypo,
            nameColor,
            nameSpacing,

            enableDesignation,
            designation,
            designationTypo,
            designationColor,
            designationSpacing,

            image,
            image2x,
            imageWidth,
            imageSpacing,
            imageBorder,
            imageBorderRadius,
            imageBoxShadow,

            enableDescription,
            description,
            descriptionTypo,
            descriptionColor,
            descriptionSpacing,

            phone,
            email,
            website,
            infoSpacing,
            useInfoIcon,
            infoIconSize,
            infoIconSizeCustom,
            infoIconSpacing,
            infoIconColor,
            infoTypo,
            infoColor,

            showSociallinks,
            facebook,
            twitter,
            instagram,
            linkedin,
            youtube,
            github,
            flickr,
            pinterest,
            dribbble,
            behance,
            iconSize,
            iconSizeCustom,
            iconGutter,
            iconSpacing,
            iconStyle,
            iconUseDefaultStyle,
            iconBorderRadius,
            iconColor,
            iconBackground,
            iconBorder,
            iconColorHover,
            iconBackgroundHover,
            iconBorderColorHover,

            overlayHeight,
            overlayBg,
            overlayPaddingX,
            overlayPaddingY,
            contentPosition,
            contentAlignment,
            contentBg,
            contentPadding,
            contentBorder,
            overlayAlignment,

            bodyBg,
            bodyPadding,
            bodyBorder,
            bodyBorderRadius,
            bodyBoxShadow,

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
        } = this.props.attributes

        const { clientId, attributes, setAttributes, isSelected } = this.props
        const { openPanelSetting, device } = this.state

        if (uniqueId) { CssGenerator(this.props.attributes, 'team', uniqueId); }

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title={__('')} initialOpen={true}>
                        <Styles columns={21} value={layout} onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 1, svg: icons.team_1, label: __('Basic') },
                                { value: 2, svg: icons.team_2, label: __('Stack') },
                                { value: 3, svg: icons.team_3, label: __('Side by Side') }
                            ]}
                        />
                        <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Image')} opened={'Image' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Image' ? 'Image' : '')}>
                        <Media label={__('Team Member Image')} multiple={false} type={['image']} panel={true} value={image} onChange={val => setAttributes({ image: val })} />
                        <Media label={__('Team Member Image @2x')} multiple={false} type={['image']} panel={true} value={image2x} onChange={val => setAttributes({ image2x: val })} />
                        {layout != 2 && <Range label={__('Image Width')} value={imageWidth} onChange={val => setAttributes({ imageWidth: val })} min={32} max={500} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />}
                        {(layout == 1 || layout == 3) && <Range label={__('Image Spacing')} value={imageSpacing} onChange={val => setAttributes({ imageSpacing: val })} min={0} max={500} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />}
                        <Border
                            responsive
                            device={device}
                            value={imageBorder}
                            unit={['px', 'em', '%']}
                            label={__('Border')}
                            onChange={value => setAttributes({ imageBorder: value })}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <BorderRadius
                            min={0}
                            max={100}
                            responsive
                            device={device}
                            unit={['px', 'em', '%']}
                            value={imageBorderRadius}
                            label={__('Border Radius')}
                            onDeviceChange={value => this.setState({ device: value })}
                            onChange={val => setAttributes({ imageBorderRadius: val })}
                        />
                        <BoxShadow
                            label={__('Box-Shadow')}
                            value={imageBoxShadow}
                            onChange={(value) => setAttributes({ imageBoxShadow: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Name')} opened={'Name' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Name' ? 'Name' : '')}>
                        <Typography label="Typography" value={nameTypo} onChange={(value) => setAttributes({ nameTypo: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <Separator />
                        <Color label={__('Color')} value={nameColor} onChange={(value) => setAttributes({ nameColor: value })} />
                        <Range label={__('Spacing')} value={nameSpacing} onChange={val => setAttributes({ nameSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Designation')} opened={'Designation' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Designation' ? 'Designation' : '')}>
                        <Toggle label={__('Enable')} value={enableDesignation} onChange={val => setAttributes({ enableDesignation: val })} />
                        {enableDesignation == 1 &&
                            <Fragment>
                                <Separator />
                                <Typography label="Typography" value={designationTypo} onChange={(value) => setAttributes({ designationTypo: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Separator />
                                <Color label={__('Color')} value={designationColor} onChange={(value) => setAttributes({ designationColor: value })} />
                                <Range label={__('Spacing')} value={designationSpacing} onChange={val => setAttributes({ designationSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </Fragment>
                        }
                    </PanelBody>

                    <PanelBody title={__('Description')} opened={'Description' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Description' ? 'Description' : '')}>
                        <Toggle label={__('Enable')} value={enableDescription} onChange={val => setAttributes({ enableDescription: val })} />
                        {enableDescription == 1 &&
                            <Fragment>
                                <Typography label="Typography" value={descriptionTypo} onChange={(value) => setAttributes({ descriptionTypo: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Color label={__('Color')} value={descriptionColor} onChange={(value) => setAttributes({ descriptionColor: value })} />
                                <Range label={__('Spacing')} value={descriptionSpacing} onChange={val => setAttributes({ descriptionSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </Fragment>
                        }
                    </PanelBody>

                    <PanelBody title={__('Information')} opened={'Information' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Information' ? 'Information' : '')}>
                        <TextControl label={__('Phone')} value={phone} onChange={val => setAttributes({ phone: val })} />
                        <TextControl label={__('Email')} value={email} onChange={val => setAttributes({ email: val })} />
                        <TextControl label={__('Website')} value={website} onChange={val => setAttributes({ website: val })} />
                        {(phone || email || website) &&
                            <Fragment>
                                <Typography label="Typography" value={infoTypo} onChange={(value) => setAttributes({ infoTypo: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Color label={__('Color')} value={infoColor} onChange={(value) => setAttributes({ infoColor: value })} />
                                <Range label={__('Spacing')} value={infoSpacing} onChange={val => setAttributes({ infoSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Separator />
                                <Toggle label={__('Use Icon')} value={useInfoIcon} onChange={val => setAttributes({ useInfoIcon: val })} />
                                {useInfoIcon == 1 &&
                                    <Fragment>
                                        <RadioAdvanced label={__('Icon Size')} value={infoIconSize} onChange={(value) => setAttributes({ infoIconSize: value })}
                                            options={[
                                                { label: 'S', value: '14px', title: 'Small' },
                                                { label: 'M', value: '18px', title: 'Medium' },
                                                { label: 'L', value: '24px', title: 'Large' },
                                                { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                                            ]}
                                        />
                                        {infoIconSize == 'custom' &&
                                            <Range label={__('Custom Size')} value={infoIconSizeCustom} onChange={val => setAttributes({ infoIconSizeCustom: val })} min={12} max={300} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        }
                                        <Color label={__('Color')} value={infoIconColor} onChange={(value) => setAttributes({ infoIconColor: value })} />
                                        <Range label={__('Icon Spacing')} value={infoIconSpacing} onChange={val => setAttributes({ infoIconSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }
                            </Fragment>
                        }
                    </PanelBody>

                    <PanelBody title={__('Social')} opened={'Social' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Social' ? 'Social' : '')}>
                        <Toggle label={__('Show Social-links')} value={showSociallinks} onChange={val => setAttributes({ showSociallinks: val })} />
                        {
                            showSociallinks &&
                            <Fragment>
                                <TextControl label={__('Facebook')} value={facebook} onChange={val => setAttributes({ facebook: val })} />
                                <TextControl label={__('Twitter')} value={twitter} onChange={val => setAttributes({ twitter: val })} />
                                <TextControl label={__('Instagram')} value={instagram} onChange={val => setAttributes({ instagram: val })} />
                                <TextControl label={__('Linkedin')} value={linkedin} onChange={val => setAttributes({ linkedin: val })} />
                                <TextControl label={__('Youtube')} value={youtube} onChange={val => setAttributes({ youtube: val })} />
                                <TextControl label={__('Github')} value={github} onChange={val => setAttributes({ github: val })} />
                                <TextControl label={__('Flickr')} value={flickr} onChange={val => setAttributes({ flickr: val })} />
                                <TextControl label={__('Pinterest')} value={pinterest} onChange={val => setAttributes({ pinterest: val })} />
                                <TextControl label={__('Dribbble')} value={dribbble} onChange={val => setAttributes({ dribbble: val })} />
                                <TextControl label={__('Behance')} value={behance} onChange={val => setAttributes({ behance: val })} />
                                <Separator />
                                <Styles label={__('Icon Style')} value={iconStyle} onChange={val => setAttributes({ iconStyle: val })}
                                    options={[
                                        { value: 'fill', svg: icons.social_fill, label: __('Fill') },
                                        { value: 'normal', svg: icons.social_normal, label: __('Normal') },
                                    ]}
                                />
                                <RadioAdvanced label={__('Icon Size')} value={iconSize} onChange={(value) => setAttributes({ iconSize: value })}
                                    options={[
                                        { label: 'S', value: '14px', title: 'Small' },
                                        { label: 'M', value: '18px', title: 'Medium' },
                                        { label: 'L', value: '24px', title: 'Large' },
                                        { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                                    ]}
                                />
                                {iconSize == 'custom' &&
                                    <Range label={__('Custom Size')} value={iconSizeCustom} onChange={val => setAttributes({ iconSizeCustom: val })} min={12} max={300} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                }

                                {iconStyle == 'fill' &&
                                    <BorderRadius
                                        label={__('Corner Radius')}
                                        value={iconBorderRadius}
                                        onChange={(value) => setAttributes({ iconBorderRadius: value })}
                                        min={0}
                                        max={100} unit={['px', 'em', '%']}
                                        responsive
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })} />
                                }

                                <Range label={__('Gutter')} value={iconGutter} onChange={val => setAttributes({ iconGutter: val })} min={0} max={40} unit={['px', 'em']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Range label={__('Spacing')} value={iconSpacing} onChange={val => setAttributes({ iconSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />

                                <Toggle label={__('Default Styles')} value={iconUseDefaultStyle} onChange={val => setAttributes({ iconUseDefaultStyle: val })} />

                                {!iconUseDefaultStyle &&
                                    <Tabs>
                                        <Tab tabTitle={__('Normal')}>
                                            <Color label={__('Color')} value={iconColor} onChange={(value) => setAttributes({ iconColor: value })} />
                                            {iconStyle == 'fill' &&
                                                <Fragment>
                                                    <Color label={__('Background Color')} value={iconBackground} onChange={(value) => setAttributes({ iconBackground: value })} />
                                                    <Border label={__('Border')} value={iconBorder} onChange={(value) => setAttributes({ iconBorder: value })} />
                                                </Fragment>
                                            }
                                        </Tab>
                                        <Tab tabTitle={__('Hover')}>
                                            <Color label={__('Color')} value={iconColorHover} onChange={(value) => setAttributes({ iconColorHover: value })} />
                                            {iconStyle == 'fill' &&
                                                <Fragment>
                                                    <Color label={__('Background Color')} value={iconBackgroundHover} onChange={(value) => setAttributes({ iconBackgroundHover: value })} />
                                                    <Color label={__('Border Color')} value={iconBorderColorHover} onChange={(value) => setAttributes({ iconBorderColorHover: value })} />
                                                </Fragment>
                                            }
                                        </Tab>
                                    </Tabs>
                                }
                            </Fragment>
                        }
                    </PanelBody>

                    {layout == 2 &&
                        <Fragment>
                            <PanelBody title={__('Overlay')} initialOpen={false}>
                                <RadioAdvanced label={__('Height')} value={overlayHeight} onChange={(value) => setAttributes({ overlayHeight: value })}
                                    options={[
                                        { label: 'Auto', value: 'auto', title: 'Auto' },
                                        { label: '100%', value: 'fit', title: '100%' }
                                    ]}
                                />
                                {overlayHeight == 'fit' &&
                                    <RadioAdvanced label={__('Alignment')} value={overlayAlignment} onChange={(value) => setAttributes({ overlayAlignment: value })}
                                        options={[
                                            { label: 'Top', value: 'flex-start', title: 'Top' },
                                            { label: 'Middle', value: 'center', title: 'Middle' },
                                            { label: 'Bottom', value: 'flex-end', title: 'Bottom' },
                                        ]}
                                    />
                                }
                                <ColorAdvanced label={__('Background')} value={overlayBg} onChange={(value) => setAttributes({ overlayBg: value })} />
                                <Range label={<span className="dashicons dashicons-leftright" title="X Padding" />} value={overlayPaddingX} onChange={val => setAttributes({ overlayPaddingX: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Range label={<span className="dashicons dashicons-sort" title="Y Padding" />} value={overlayPaddingY} onChange={val => setAttributes({ overlayPaddingY: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>
                        </Fragment>
                    }

                    {layout != 2 &&
                        <Fragment>
                            <PanelBody title={__('Content')} initialOpen={false}>
                                {
                                    layout == 3 &&
                                    <Fragment>
                                        <RadioAdvanced label={__('Position')} value={contentPosition} onChange={(value) => setAttributes({ contentPosition: value })}
                                            options={[
                                                { label: 'Left', value: 'left', title: 'Left' },
                                                { label: 'Right', value: 'right', title: 'Right' }
                                            ]}
                                        />
                                        <Alignment label={__('Alignment')} alignmentType="content" value={contentAlignment} onChange={val => setAttributes({ contentAlignment: val })} disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }
                                <ColorAdvanced label={__('Background')} value={contentBg} onChange={(value) => setAttributes({ contentBg: value })} />
                                <Padding label={__('Padding')} value={contentPadding} onChange={val => setAttributes({ contentPadding: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Border label={__('Border')} value={contentBorder} onChange={val => setAttributes({ contentBorder: val })} />
                            </PanelBody>
                        </Fragment>
                    }

                    <PanelBody title={__('Background')} initialOpen={false}>
                        <ColorAdvanced label={__('Background')} value={bodyBg} onChange={(value) => setAttributes({ bodyBg: value })} />
                        <Padding label={__('Padding')} value={bodyPadding} onChange={val => setAttributes({ bodyPadding: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <Border label={__('Border')} separator value={bodyBorder} onChange={(value) => setAttributes({ bodyBorder: value })} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <BorderRadius label={__('Radius')} value={bodyBorderRadius} onChange={val => setAttributes({ bodyBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <BoxShadow label={__('Box-Shadow')} value={bodyBoxShadow} onChange={(value) => setAttributes({ bodyBoxShadow: value })} />
                    </PanelBody>

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
                    <div className={`qubely-block-team qubely-team-layout-${layout}`} onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}>
                        <div className="qubely-team-image-wrapper" onClick={() => this.handlePanelOpenings('Image')}>
                            {image.url != undefined ?
                                <img className="qubely-team-image" src={image.url} srcset={image2x.url != undefined ? image.url + ' 1x, ' + image2x.url + ' 2x' : ''} alt={name} />
                                :
                                <div className="qubely-image-placeholder"><i className="far fa-image" /></div>
                            }
                        </div>
                        <div className="qubely-team-content">
                            <div className="qubely-team-content-inner">
                                <div onClick={() => this.handlePanelOpenings('Name')}>
                                    <RichText
                                        key="editable"
                                        tagName='span'
                                        className="qubely-team-name"
                                        keepPlaceholderOnFocus
                                        placeholder={__('Add Name...')}
                                        onChange={value => setAttributes({ name: value })}
                                        value={name} />
                                </div>
                                {enableDesignation == 1 &&
                                    <div className="qubely-team-designation-container" onClick={() => this.handlePanelOpenings('Designation')}>
                                        <RichText
                                            key="editable"
                                            tagName='span'
                                            className="qubely-team-designation"
                                            keepPlaceholderOnFocus
                                            placeholder={__('Add Designation...')}
                                            onChange={value => setAttributes({ designation: value })}
                                            value={designation} />
                                    </div>
                                }
                                {enableDescription == 1 &&
                                    <div onClick={() => this.handlePanelOpenings('Description')}>
                                        <RichText
                                            key="editable"
                                            tagName='div'
                                            className="qubely-team-description"
                                            keepPlaceholderOnFocus
                                            placeholder={__('Add Description...')}
                                            onChange={value => setAttributes({ description: value })}
                                            value={description} />
                                    </div>
                                }
                                {(phone || email || website) &&
                                    <div className="qubely-team-information" onClick={() => this.handlePanelOpenings('Information')}>
                                        {phone &&
                                            <div className={`qubely-team-information-phone`}>
                                                {useInfoIcon &&
                                                    <i className="qubely-info-icon fas fa-phone" aria-label={__('Phone')} />
                                                }
                                                <span>{phone}</span>
                                            </div>
                                        }
                                        {email &&
                                            <div className={`qubely-team-information-email`}>
                                                {useInfoIcon &&
                                                    <i className={`qubely-info-icon fas fa-envelope`} aria-label={__('Email')} />
                                                }
                                                <span>{email}</span>
                                            </div>
                                        }
                                        {website &&
                                            <div className={`qubely-team-information-website`}>
                                                {useInfoIcon &&
                                                    <i className={`qubely-info-icon fas fa-globe`} aria-label={__('Website')} />
                                                }
                                                <span><a>{website}</a></span>
                                            </div>
                                        }
                                    </div>
                                }
                                {showSociallinks && (facebook || twitter || instagram || linkedin || youtube || github || flickr || pinterest || dribbble || behance) &&
                                    <div className={`qubely-team-social-links qubely-team-icon-layout-${iconStyle} qubely-team-icon-style-${iconUseDefaultStyle == 1 ? 'default' : 'custom'}`} onClick={() => this.handlePanelOpenings('Social')}>
                                        {facebook &&
                                            <a className="qubely-team-social-facebook"><i className="fab fa-facebook" /></a>
                                        }
                                        {twitter &&
                                            <a className="qubely-team-social-twitter"><i className="fab fa-twitter" /></a>
                                        }
                                        {instagram &&
                                            <a className="qubely-team-social-instagram"><i className="fab fa-instagram" /></a>
                                        }
                                        {linkedin &&
                                            <a className="qubely-team-social-linkedin"><i className="fab fa-linkedin" /></a>
                                        }
                                        {youtube &&
                                            <a className="qubely-team-social-youtube"><i className="fab fa-youtube" /></a>
                                        }
                                        {github &&
                                            <a className="qubely-team-social-github"><i className="fab fa-github" /></a>
                                        }
                                        {flickr &&
                                            <a className="qubely-team-social-flickr"><i className="fab fa-flickr" /></a>
                                        }
                                        {pinterest &&
                                            <a className="qubely-team-social-pinterest"><i className="fab fa-pinterest" /></a>
                                        }
                                        {dribbble &&
                                            <a className="qubely-team-social-dribbble"><i className="fab fa-dribbble" /></a>
                                        }
                                        {behance &&
                                            <a className="qubely-team-social-behance"><i className="fab fa-behance" /></a>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
                            <ContextMenu
                                name={this.props.name}
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