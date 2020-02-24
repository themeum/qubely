import icons from '../../helpers/icons';
const { __ } = wp.i18n;
const {
    Fragment,
    Component
} = wp.element;

const { compose } = wp.compose;

const {
    withSelect,
    withDispatch
} = wp.data;

const {
    PanelBody,
    Toolbar,
    Tooltip
} = wp.components;

const {
    RichText,
    InspectorControls,
    BlockControls
} = wp.blockEditor;

const {
    Alignment,
    Typography,
    Color,
    ColorAdvanced,
    IconList,
    Select,
    Styles,
    Tabs,
    Tab,
    Range,
    Url,
    BoxShadow,
    RadioAdvanced,
    Separator,
    Border,
    BorderRadius,
    Padding,
    withCSSGenerator,
    InspectorTabs,
    InspectorTab,
    Inline: {
        InlineToolbar
    },
    gloalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    }
} = wp.qubelyComponents;


class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            device: 'md',
            spacer: true
        };
    }

    componentDidMount() {
        const {
            setAttributes,
            clientId,
            attributes: {
                uniqueId
            }
        } = this.props;

        const _client = clientId.substr(0, 6);

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
            removeBlock,
            setAttributes,
            updateBlockAttributes,
            buttonGroupAttributes,
            attributes: {
                uniqueId,
                className,
                parentClientId,
                buttonGroup,
                disableFullWidth,
                fillType,
                buttonSize,
                buttonWidthType,
                buttonWidth,
                buttonPadding,
                typography,
                textField,
                url,
                enableAlignment,
                alignment,
                buttonBorderRadius,
                iconName,
                iconPosition,
                iconSize,
                iconGap,
                buttonBorder,
                borderHoverColor,
                buttonColor,
                buttonColor2,
                buttonHoverColor,
                buttonHoverColor2,
                bgColor,
                bgHoverColor,
                buttonShadow,
                buttonHoverShadow,
                animation,
                interaction,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss
            }
        } = this.props;

        const { device, currentTab } = this.state;

        return (
            <Fragment>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                <InspectorControls key="inspector">
                    <InspectorTabs>
                        <InspectorTab key='layout'>
                            <PanelBody title={__('')} opened={true}>
                                <Styles value={fillType}
                                        onChange={(value) => setAttributes({ fillType: value })}
                                        options={[
                                            { value: 'fill', svg: icons.btn_fill, label: __('Fill') },
                                            { value: 'outline', svg: icons.btn_outline, label: __('Outline') }
                                        ]}
                                />
                                <Separator />
                                <Url label={__('Button URL')} value={url} onChange={(value) => setAttributes({ url: value })} />
                                {
                                    enableAlignment &&
                                    <Alignment
                                        responsive
                                        disableJustify
                                        device={device}
                                        value={alignment}
                                        label={__('Alignment')}
                                        alignmentType="content"
                                        onChange={val => setAttributes({ alignment: val })}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                }
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key='style'>
                            <PanelBody title={__('Size')} initialOpen={false}>
                                <RadioAdvanced
                                    label={__('Button Size')}
                                    options={[
                                        { label: 'S', value: 'small', title: 'Small' },
                                        { label: 'M', value: 'medium', title: 'Medium' },
                                        { label: 'L', value: 'large', title: 'Large' },
                                        { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                                    ]}
                                    value={buttonSize}
                                    onChange={(value) => setAttributes({ buttonSize: value })} />
                                {buttonSize == 'custom' &&
                                <Padding
                                    label={__('Padding')}
                                    value={buttonPadding}
                                    onChange={(value) => setAttributes({ buttonPadding: value })}
                                    unit={['px', 'em', '%']}
                                    max={150}
                                    min={0}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                                }
                                <RadioAdvanced
                                    label={__('Button Width')}
                                    options={[
                                        { label: __('Auto'), value: 'auto', title: __('Auto') },
                                        ...(!disableFullWidth && [{ label: __('Full'), value: 'block', title: __('Full') }]),
                                        { label: __('Fixed'), value: 'fixed', title: __('Fixed') }
                                    ]}
                                    value={buttonWidthType}
                                    onChange={(value) => setAttributes({ buttonWidthType: value })} />
                                {buttonWidthType == 'fixed' &&
                                <Range
                                    label={__('Fixed Width')}
                                    value={buttonWidth}
                                    onChange={(value) => setAttributes({ buttonWidth: value })}
                                    unit={['px', 'em', '%']}
                                    min={buttonWidth.unit === '%' ? 5 : 30}
                                    max={buttonWidth.unit === '%' ? 100 : 800}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                                }
                            </PanelBody>
                            <PanelBody title={__('Design')} initialOpen={false}>
                                <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <Color label={__('Text Color')} value={fillType == 'fill' ? buttonColor : buttonColor2} onChange={(value) => fillType == 'fill' ? setAttributes({ buttonColor: value }) : setAttributes({ buttonColor2: value })} />
                                        {fillType == 'fill' &&
                                        <ColorAdvanced label={__('Background')} value={bgColor} onChange={(value) => setAttributes({ bgColor: value })} />
                                        }
                                        <Border label={__('Border')} value={buttonBorder} onChange={val => setAttributes({ buttonBorder: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <BoxShadow label={__('Box-Shadow')} value={buttonShadow} onChange={(value) => setAttributes({ buttonShadow: value })} />
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <Color label={__('Text Color')} value={fillType == 'fill' ? buttonHoverColor : buttonHoverColor2} onChange={(value) => fillType == 'fill' ? setAttributes({ buttonHoverColor: value }) : setAttributes({ buttonHoverColor2: value })} />
                                        <ColorAdvanced label={__('Background')} value={bgHoverColor} onChange={(value) => setAttributes({ bgHoverColor: value })} />
                                        <Color label={__('Border Color')} value={borderHoverColor} onChange={(value) => setAttributes({ borderHoverColor: value })} />
                                        <BoxShadow label={__('Box-Shadow')} value={buttonHoverShadow} onChange={(value) => setAttributes({ buttonHoverShadow: value })} />
                                    </Tab>
                                </Tabs>
                                <BorderRadius
                                    label={__('Radius')}
                                    value={buttonBorderRadius}
                                    onChange={(value) => setAttributes({ buttonBorderRadius: value })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>

                            <PanelBody title={__('Icon')} initialOpen={false}>
                                <IconList
                                    label={__('Icon')}
                                    value={iconName}
                                    onChange={(value) => this.props.setAttributes({ iconName: value })} />
                                {iconName &&
                                <Fragment>
                                    <Select
                                        label={__('Position')}
                                        options={['left', 'right']}
                                        value={iconPosition}
                                        onChange={(value) => setAttributes({ iconPosition: value })} />
                                    <Range
                                        label={__('Size')}
                                        value={iconSize}
                                        onChange={(value) => setAttributes({ iconSize: value })}
                                        unit={['px', 'em', '%']}
                                        min={5}
                                        max={48}
                                        responsive
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })} />
                                    <Range
                                        label={__('Gap')}
                                        value={iconGap}
                                        onChange={val => setAttributes({ iconGap: val })}
                                        unit={['px', 'em', '%']}
                                        min={0}
                                        max={64}
                                        responsive
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })} />
                                </Fragment>
                                }
                            </PanelBody>
                            <PanelBody title={__('Typography')} initialOpen={false}>
                                <Typography
                                    label={__('Typography')}
                                    value={typography}
                                    onChange={(value) => setAttributes({ typography: value })}
                                    disableLineHeight
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key='advance'>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}


                <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div className="qubely-block-btn-wrapper" onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}>
                        <div className={`qubely-block-btn`}>
                            <span className={`qubely-block-btn-anchor is-${buttonSize}`}>
                                {(iconName.trim() != "") && (iconPosition == 'left') && (<i className={`qubely-btn-icon ${iconName}`} />)}
                                <RichText
                                    keepPlaceholderOnFocus
                                    className="qubely-button-text"
                                    placeholder={__('Add Text...')}
                                    onChange={value => setAttributes({ textField: value })}
                                    value={textField}
                                />
                                {(iconName.trim() != "") && (iconPosition == 'right') && (<i className={`qubely-btn-icon ${iconName}`} />)}
                            </span>
                        </div>
                        {
                            buttonGroup &&
                            <Tooltip text={__('Delete this button')}>
                                <span className="qubely-action-button-remove"
                                    onClick={() => {
                                        updateBlockAttributes(parentClientId, Object.assign(buttonGroupAttributes, { buttons: buttonGroupAttributes.buttons - 1 }))
                                        removeBlock(clientId)
                                    }}
                                    role="button">
                                    <i className="fas fa-times" />
                                </span>
                            </Tooltip>
                        }

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
export default compose([
    withSelect((select, ownProps) => {
        const { parentClientId } = ownProps.attributes
        const { getBlockAttributes } = select('core/block-editor');
        return { buttonGroupAttributes: getBlockAttributes(parentClientId) }
    }),
    withDispatch((dispatch) => {
        const { removeBlock, updateBlockAttributes } = dispatch('core/block-editor');
        return {
            removeBlock,
            updateBlockAttributes
        }
    }),
    withCSSGenerator()
])(Edit)
