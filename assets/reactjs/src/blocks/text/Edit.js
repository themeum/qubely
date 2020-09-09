const { __ } = wp.i18n
const {
    Fragment,
    Component,
    createRef
} = wp.element;
const { PanelBody, Toolbar, SelectControl } = wp.components
const { RichText, InspectorControls, BlockControls } = wp.blockEditor
const {
    Typography,
    Color,
    Alignment,
    Headings,
    Toggle,
    Range,
    Separator,
    gloalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    Inline: {
        InlineToolbar,
        InlineSelector
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

import svg from '../heading/separators';

class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            device: 'md',
            selector: true,
            spacer: true,
            openPanelSetting: ''
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
    }

    handlePanelOpenings = (panelName) => {
        this.setState({ ...this.state, openPanelSetting: panelName })
    }

    render() {
        const {
            uniqueId,
            className,
            content,
            typography,
            alignment,
            selector,
            textColor,
            dropCap,
            dropCapSize,
            dropCapColor,
            dropCapSpacing,

            titleLevel,
            title,
            titleTypography,
            titleColor,
            titleSpacing,

            enableTitle,
            subTitle,
            subTitleLevel,
            subTitleContent,
            subTitleTypography,
            subTitleColor,
            subTitleSpacing,

            separatorStyle,
            separatorColor,
            separatorStroke,
            separatorPosition,
            separatorWidth,
            separatorSpacing,

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
        const { name, clientId, attributes, setAttributes, isSelected } = this.props
        const { device, openPanelSetting } = this.state
        const separators = {
            solid: { type: 'css', separator: 'solid', width: 300, stroke: 10 },
            double: { type: 'css', separator: 'double', width: 300, stroke: 10 },
            dotted: { type: 'css', separator: 'dotted', width: 300, stroke: 10 },
            dashed: { type: 'css', separator: 'dashed', width: 300, stroke: 10 },
            pin: { type: 'svg', separator: 'pin', svg: svg['pin'], width: 100, stroke: 0 },
            pin_filled: { type: 'svg', separator: 'pin_filled', svg: svg['pin_filled'], width: 100, stroke: 0 },
            zigzag: { type: 'svg', separator: 'zigzag', svg: svg['zigzag'], style: 'fill', width: 88, stroke: 5 },
            zigzag_large: { type: 'svg', separator: 'zigzag_large', svg: svg['zigzag_large'], style: 'fill', width: 161, stroke: 5 },
        }

        const titleTagName = 'h' + titleLevel;
        const subTitleTagName = 'h' + subTitleLevel;

        const renderSeparators = <Fragment>
            {separatorStyle &&
                <Fragment>
                    {separators[separatorStyle].type == 'css' &&
                        <span className={`qubely-separator-type-css qubely-separator-${separatorStyle}`}></span>
                    }
                    {separators[separatorStyle].type == 'svg' &&
                        <span className={`qubely-separator-type-svg qubely-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
                    }
                </Fragment>
            }
        </Fragment>

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs>
                        <InspectorTab key={'layout'}>
                            <InspectorSections block={'text'} />
                        </InspectorTab>
                        <InspectorTab key={'style'}>
                            <PanelBody initialOpen={true}>
                                <Alignment label={__('Alignment')} value={alignment} onChange={val => setAttributes({ alignment: val })} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>

                            <PanelBody title={__('Text')} initialOpen={false}>
                                <Typography label={__('Typography')} value={typography} scope={'p'} onChange={val => setAttributes({ typography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Color label={__('Text Color')} value={textColor} onChange={val => setAttributes({ textColor: val })} />
                                <Toggle label={__('Drop Cap')} value={dropCap} onChange={val => setAttributes({ dropCap: val })} />
                                {dropCap == 1 &&
                                    <Fragment>
                                        <Range label={__('Size')} value={dropCapSize} onChange={(value) => setAttributes({ dropCapSize: value })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Color label={__('Color')} value={dropCapColor} onChange={val => setAttributes({ dropCapColor: val })} />
                                        <Range label={__('Spacing')} value={dropCapSpacing} onChange={(value) => setAttributes({ dropCapSpacing: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }
                            </PanelBody>

                            <PanelBody title={__('Title')} opened={'Title' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Title' ? 'Title' : '')}>
                                <Toggle label={__('Enable')} value={enableTitle} onChange={val => setAttributes({ enableTitle: val })} />
                                {enableTitle == 1 &&
                                    <Fragment>
                                        <Headings selectedLevel={titleLevel} onChange={(value) => setAttributes({ titleLevel: value })} />
                                        <Typography label={__('Typography')} value={titleTypography} onChange={(value) => setAttributes({ titleTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Color label={__('Color')} value={titleColor} onChange={(value) => setAttributes({ titleColor: value })} />
                                        <Range label={<span>{__('Spacing')} <span className="dashicons dashicons-sort" title="Y Spacing" /></span>} value={titleSpacing} onChange={val => setAttributes({ titleSpacing: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Separator />
                                        <SelectControl
                                            label={__('Separator')}
                                            value={separatorStyle}
                                            options={[
                                                { label: '--Select--', value: '' },
                                                { label: 'Line', value: 'solid' },
                                                { label: 'Line Doubled', value: 'double' },
                                                { label: 'Dashed', value: 'dashed' },
                                                { label: 'Dotted', value: 'dotted' },
                                                { label: 'Pin', value: 'pin' },
                                                { label: 'Pin Filled', value: 'pin_filled' },
                                                { label: 'Zigzag', value: 'zigzag' },
                                                { label: 'Zigzag Large', value: 'zigzag_large' }
                                            ]}
                                            onChange={val => setAttributes({ separatorStyle: val })}
                                        />
                                        {separatorStyle &&
                                            <Fragment>
                                                <Color label={__('Separator Color')} value={separatorColor} onChange={val => setAttributes({ separatorColor: val })} />
                                                {(separatorStyle != 'pin' && separatorStyle != 'pin_filled') &&
                                                    <Range label={__('Stroke')} value={separatorStroke} onChange={val => setAttributes({ separatorStroke: parseInt(val) })} min={1} max={separators[separatorStyle].stroke} />
                                                }
                                                <Range label={__('Width')} value={separatorWidth} onChange={val => setAttributes({ separatorWidth: val })} min={20} max={separators[separatorStyle].width} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                                <Range label={__('Spacing')} value={separatorSpacing} onChange={val => setAttributes({ separatorSpacing: val })} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                                <SelectControl
                                                    label="Position"
                                                    value={separatorPosition}
                                                    options={[
                                                        { label: 'Top', value: 'top' },
                                                        { label: 'Bottom', value: 'bottom' },
                                                        { label: 'Left', value: 'left' },
                                                        { label: 'Right', value: 'right' },
                                                        { label: 'Left & Right', value: 'leftright' }
                                                    ]}
                                                    onChange={val => setAttributes({ separatorPosition: val })}
                                                />
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </PanelBody>

                            {enableTitle == 1 &&
                                <PanelBody title={__('Sub Title')} opened={'Sub Title' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Sub Title' ? 'Sub Title' : '')}>
                                    <Toggle label={__('Enable')} value={subTitle} onChange={val => setAttributes({ subTitle: val })} />
                                    {subTitle == 1 &&
                                        <Fragment>
                                            <Headings selectedLevel={subTitleLevel} onChange={(value) => setAttributes({ subTitleLevel: value })} />
                                            <Typography label={__('Typography')} value={subTitleTypography} onChange={val => setAttributes({ subTitleTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                            <Range label={<span>{__('Spacing')} <span className="dashicons dashicons-sort" title="Y Spacing" /></span>} value={subTitleSpacing} onChange={(value) => setAttributes({ subTitleSpacing: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                            <Color label={__('Color')} value={subTitleColor} onChange={val => setAttributes({ subTitleColor: val })} />
                                        </Fragment>
                                    }
                                </PanelBody>
                            }
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                <BlockControls>
                    <InlineSelector options={[['p', 'Paragraph'], ['span', 'span'], ['div', 'div']]} selector={selector} setAttributes={setAttributes} />
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        onContextMenu={event => handleContextMenu(event, this.qubelyContextMenu.current)}
                        className={`qubely-block-text ${(dropCap == 1) ? 'qubely-has-drop-cap' : ''}`} >
                        {enableTitle == 1 &&
                            <div className={`qubely-block-text-title-container ${separatorStyle ? 'qubely-has-separator' : ''} ${separatorPosition ? 'qubely-separator-position-' + separatorPosition : ''}`} >
                                <div className="qubely-block-text-title-inner">
                                    {separatorStyle && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright') ? <div className="qubely-separator qubely-separator-before">{renderSeparators}</div> : ''}
                                    <div onClick={() => this.handlePanelOpenings('Title')}>
                                        <RichText
                                            key="editable"
                                            tagName={titleTagName}
                                            className="qubely-block-text-title"
                                            keepPlaceholderOnFocus
                                            placeholder={__('Add Text...')}
                                            onChange={value => setAttributes({ title: value })}
                                            value={title} />
                                    </div>
                                    {separatorStyle != '' && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright') ? <div className="qubely-separator qubely-separator-after">{renderSeparators}</div> : ''}
                                </div>

                                {subTitle == 1 &&
                                    <div className="qubely-block-text-sub-title-container" onClick={() => this.handlePanelOpenings('Sub Title')}>
                                        <RichText
                                            key="editable"
                                            tagName={subTitleTagName}
                                            className="qubely-block-text-sub-title"
                                            keepPlaceholderOnFocus
                                            placeholder={__('Add Text...')}
                                            onChange={value => setAttributes({ subTitleContent: value })}
                                            value={subTitleContent} />
                                    </div>
                                }
                            </div>
                        }
                        <RichText
                            key="editable"
                            tagName={selector}
                            keepPlaceholderOnFocus
                            placeholder={__('Add Text...')}
                            onChange={value => setAttributes({ content: value })}
                            value={content}
                        />

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