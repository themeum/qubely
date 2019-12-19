
import Progress from './Progress'
import icons from '../../helpers/icons';
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
    Media,
    BoxShadow,
    Alignment,
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
            selector: true,
            spacer: true,
            openPanelSetting: ''
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
                alignment,
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
                image,
                image2x,
                imageAlt,
                imageSize,
                enableHeading,
                heading,
                headingColor,
                headingPosition,
                headingTypography,
                headingSpacing,
                headingAlignment,
                progressShadow,
                circleShadow,
                circleShrink,
                speed,
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
        } = this.props, {device} = this.state, thicknessCalc = {
            fill: (size / 2),
            outline: (size * (thickness * .5)) / 100,
            outline_fill: (size * (thickness * .5)) / 100,
        }, thicknessBgCalc = {
            fill: size / 2,
            outline: (size * (thicknessBg * .5)) / 100,
            outline_fill: (size * (thickness * .5)) / 100
        }, progressAttr = {
            size,
            layout,
            corner: layout === 'fill' ? 'unset' : corner,
            uniqueId,
            percent: progress,
            thickness: thicknessCalc[layout],
            thicknessBg: thicknessBgCalc[layout],
            emptyFill: background,
            fill: fillColor,
            circleShadow,
            progressShadow,
            circleShrink: ((size - thickness) * .5) * circleShrink / 100,
            duration: speed
        };

        if (uniqueId) { CssGenerator(this.props.attributes, 'pieprogress', uniqueId); }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="">
                        <Styles
                            value={layout}
                            onChange={val => setAttributes({ layout: val })}
                            proUpgradation
                            options={[
                                { value: 'outline', img: icons.pie_outline, label: __('Layout 1') },
                                { value: 'outline_fill', img: icons.pie_outline_fill, label: __('Layout 2'),  pro: true  },
                                { value: 'fill', img: icons.pie_fill, label: __('Layout 3'),  pro: true  },
                            ]}
                        />
                        <Range label={__('Progress Size')} value={size} onChange={(value) => setAttributes({ size: value })} min={20} max={500} />
                        <RadioAdvanced
                            label={__('Alignment')}
                            options={[
                                { label: <span style={{padding: '0 5px'}} class='fas fa-align-left' />, value: 'flex-start', title: 'Left' },
                                { label: <span style={{padding: '0 5px'}} class='fas fa-align-center' />, value: 'center', title: 'Center' },
                                { label: <span style={{padding: '0 5px'}} class='fas fa-align-right' />, value: 'flex-end', title: 'Right' },
                            ]}
                            value={alignment}
                            onChange={(alignment) => setAttributes({ alignment })} />
                        <img src={qubely_admin.plugin + 'assets/img/blocks/pieprogress/template-pro-notice.jpg'} alt={__('Pie Porgress Templates')} />
                    </PanelBody>
                    <PanelBody title={__('Progress')} initialOpen={false}>
                        <Range label={__('Progress Percent')} value={progress} onChange={(value) => setAttributes({ progress: value })} min={0} max={100} />
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
                            layout !== 'fill' && <Range label={__('Progress Width')} value={thickness} onChange={thickness => setAttributes({ thickness: thickness })} min={1} max={100} />
                        }

                        <BoxShadow label={__('Shadow')} value={progressShadow} onChange={progressShadow => setAttributes({ progressShadow })} />
                        <Range label={__('Speed (ms)')} value={speed} onChange={(speed) => setAttributes({ speed })} min={0} max={2000} />
                    </PanelBody>

                    <PanelBody title={__('Circle')} initialOpen={false}>
                        {
                            layout === 'outline' && <Range label={__('Circle Width')} value={thicknessBg} onChange={(value) => setAttributes({ thicknessBg: value })} min={1} max={100} />
                        }
                        <Range label={__('Circle Shrink (%)')} value={circleShrink} onChange={circleShrink => setAttributes({ circleShrink})} min={0} max={100} />
                        <Color label={__('Circle Background')} value={background} onChange={background => setAttributes({ background })} />
                        <BoxShadow label={__('Shadow')} value={circleShadow} onChange={circleShadow => setAttributes({ circleShadow})} />
                    </PanelBody>
                    <PanelBody title={__('Percentage / Icon')} initialOpen={false}>
                        <Toggle label={__('Enable')} value={enableIcon} onChange={enableIcon => setAttributes({ enableIcon })} />
                        { enableIcon &&
                            <Fragment>
                                <RadioAdvanced
                                    label={__('Type')}
                                    options={[
                                        { label: '%', value: 'percent', title: 'Percent' },
                                        { label: 'Icon', value: 'icon', title: 'Icon' },
                                        { label: 'Image', value: 'image', title: 'Image' },
                                        { label: 'Text', value: 'text', title: 'Text' }
                                    ]}
                                    value={iconStyle}
                                    onChange={iconStyle => setAttributes({ iconStyle })} />
                                {
                                    iconStyle === 'icon' && (
                                        <Fragment>
                                            <IconList
                                                value={iconName}
                                                onChange={iconName => setAttributes({ iconName })} />
                                            <Range label={__('Icon Size')} value={iconSize} onChange={iconSize => setAttributes({ iconSize })} min={10} max={200} />
                                        </Fragment>
                                    )
                                }
                                {
                                    iconStyle === 'image' && (

                                        <Fragment>
                                            <Media
                                                label={__('Image')}
                                                multiple={false}
                                                type={['image']}
                                                panel
                                                value={image} onChange={image => setAttributes({ image })} />
                                            <Media
                                                panel
                                                value={image2x}
                                                multiple={false}
                                                type={['image']}
                                                label={__('Retina Image')}
                                                onChange={image2x => setAttributes({ image2x })} />

                                            {image.url &&
                                                <Fragment>
                                                    <TextControl label={__('Alt Text')} value={imageAlt} onChange={imageAlt => setAttributes({ imageAlt })} />
                                                    <Range label={__('Image Width')} value={imageSize} onChange={imageSize => setAttributes({ imageSize })} min={imageSize.unit !== 'px' ? 0 : 10} max={imageSize.unit === '%' ? 100 : 500} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                                </Fragment>
                                            }

                                        </Fragment>
                                    )
                                }

                                {iconStyle === 'text' && (
                                    <TextControl
                                        label="Text"
                                        value={iconText}
                                        onChange={ ( iconText ) => setAttributes({iconText}) }
                                    />
                                )}
                                {iconStyle !== 'image' && (
                                    <Color label={__('Color')} value={iconTextColor} onChange={iconTextColor => setAttributes({ iconTextColor })} />
                                )}
                                {(iconStyle === 'text' || iconStyle === 'percent') && (
                                    <Typography value={iconTypography} onChange={iconTypography => setAttributes({ iconTypography })} />
                                )}

                            </Fragment>
                        }
                    </PanelBody>
                    <PanelBody title={__('Heading')} initialOpen={false}>
                        <Toggle label={__('Enable Heading')} value={enableHeading} onChange={enableHeading => setAttributes({ enableHeading })} />
                        { enableHeading && (
                            <Fragment>
                                <TextControl label={__('Heading text')} value={heading} onChange={heading => setAttributes({ heading })} />
                                {heading && <Color label={__('Heading Color')} value={headingColor} onChange={headingColor => setAttributes({ headingColor })} />}
                                <RadioAdvanced
                                    label={__('Type')}
                                    options={[
                                        { label: 'Inside', value: 'inside', title: 'Inside' },
                                        { label: 'Outside', value: 'outside', title: 'Outside' },
                                    ]}
                                    value={headingPosition}
                                    onChange={(headingPosition) => setAttributes({ headingPosition })} />
                                {heading && (
                                    <Fragment>
                                        {headingPosition === 'outside' && (
                                            <Alignment label={__('Alignment')} value={headingAlignment} onChange={headingAlignment => setAttributes({ headingAlignment })} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        )}
                                        <Range label={__('Spacing')} value={headingSpacing} onChange={headingSpacing => setAttributes({ headingSpacing })} min={0} max={200} />
                                        <Typography value={headingTypography} onChange={headingTypography => setAttributes({ headingTypography })} />
                                    </Fragment>
                                )}
                            </Fragment>
                        )
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
                <div className={`qubely-block-${uniqueId} qubely-block-pie-progress`} onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}>
                    <div className="qubely-progress-parent">
                        <Progress {...progressAttr} />
                        {(enableIcon || enableHeading) && (
                            <div className="qubely-progress-inner-text">
                                {enableIcon && (
                                    <Fragment>
                                        {iconStyle === 'text' && (
                                            <RichText
                                                value={ iconText }
                                                placeholder={__('Text Here')}
                                                onChange={ iconText  => setAttributes( { iconText } ) }
                                            />
                                        )}
                                         {iconStyle === 'percent' && (
                                            <div>
                                                <span className='qubely-pie-counter'>{progress}</span>%
                                            </div>
                                        )}
                                        {iconStyle === 'icon' && (
                                            <span className={`qubely-pie-icon ${iconName}`} />
                                        )}
                                        {iconStyle === 'image' && (
                                            <div className={'icon-image ' + (image.url === undefined && 'pie-placeholder')}>
                                                {
                                                    image.url !== undefined ? (
                                                        <img
                                                            className="qubely-pie-image"
                                                            src={image.url}
                                                            alt={imageAlt && imageAlt}
                                                            srcSet={image2x.url !== undefined ? image.url + ' 1x, ' + image2x.url + ' 2x' : ''}
                                                        />
                                                    ) : (
                                                        <span className="qubely-pie-placeholder far fa-image" />
                                                    )
                                                }
                                            </div>
                                        )}
                                    </Fragment>
                                )}
                                {(enableHeading && headingPosition === 'inside') && (
                                    <RichText
                                        value={ heading }
                                        className="qubely-pie-progress-heading"
                                        placeholder={__('Heading Here')}
                                        onChange={ heading  => setAttributes( { heading } ) }
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {(enableHeading && headingPosition === 'outside') && (
                        <RichText
                            value={ heading }
                            className="qubely-pie-progress-heading qubely-outside"
                            placeholder={__('Heading Here')}
                            onChange={ heading  => setAttributes( { heading } ) }
                        />
                    )}
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
