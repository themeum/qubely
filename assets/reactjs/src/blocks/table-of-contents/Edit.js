import classnames from 'classnames';
import { TableOfContents } from './components';

const { __ } = wp.i18n;
const {
    Fragment,
    Component
} = wp.element;
const {
    PanelBody,
    TextControl,
    Toolbar,
    FormTokenField,
    RangeControl
} = wp.components;

const {
    RichText,
    InspectorControls,
    BlockControls,
    BlockAlignmentToolbar,
} = wp.blockEditor;

const {
    Range,
    Toggle,
    Background,
    Border,
    BoxShadow,
    BorderRadius,
    RadioAdvanced,
    Color,
    gloalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    Inline: {
        InlineToolbar
    },
    CssGenerator: {
        CssGenerator
    },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    }
} = wp.qubelyComponents;


class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            device: 'md'
        };
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
                align,
                className,
                tableType,
                scrollToTop,
                showTitle,
                allowedAnchors,
                allowedAnchors2,
                title,
                headerLinks,
                animation,
                interaction,
                minimizeBox,
                headingSize,
                headerBg,
                headerPaddingY,
                headerPaddingX,

                bodyBg,
                bodyFontSize,
                bodyPaddingY,
                bodyPaddingX,
                bodyBorder,
                bodyShadow,
                bodyBorderRadius,
                enableHeaderBorder,
                headerBorderColor,
                headerBorderWidth,

                collapsibleAlignment,
                collapsibleIcon,
                collapsibleType,
                collapsibleOpen,
                collapsibleClose
            }
        } = this.props

        const { device } = this.state

        if (uniqueId) { CssGenerator(attributes, 'table-of-contents', uniqueId); }


        const classes = classnames(
            `qubely-block-${uniqueId}`,
            'qubely-block-table-of-contents',
            `qubely-align-${align}`,
        );
        let defaultTags = {
            h1: false,
            h2: false,
            h3: false,
            h4: false,
            h5: false,
            h6: false,
        }
        return (
            <Fragment>
                <BlockControls>
                    <BlockAlignmentToolbar
                        value={align}
                        controls={['left', 'center', 'right']}
                        onChange={value => setAttributes({ align: value })}
                    />
                    <Toolbar controls={
                        [{
                            icon: 'editor-ul',
                            title: 'Convert to unordered list',
                            onClick: () => setAttributes({ tableType: 'unordered' }),
                            className: `qubely-action-change-listype ${tableType == 'unordered' ? 'is-active' : ''}`,
                        }, {
                            icon: 'editor-ol',
                            title: 'Convert to ordered list',
                            onClick: () => setAttributes({ tableType: 'ordered' }),
                            className: `qubely-action-change-listype ${tableType == 'ordered' ? 'is-active' : ''}`,
                        }]}
                    />
                </BlockControls>

                <InspectorControls key="inspector">
                    <PanelBody title={__('')} initialOpen={true}>
                        <FormTokenField
                            maxLength={6}
                            label={__('Anchors by Tags')}
                            placeholder={__('Add anchor')}
                            suggestions={['H1', 'H2', 'H3', 'H4', 'H5', 'H6']}
                            onChange={value => {
                                value.forEach(item => defaultTags[item] = true)
                                setAttributes({ allowedAnchors: defaultTags })
                            }}
                            value={Object.keys(allowedAnchors).filter(item => allowedAnchors[item])}
                        />
                        <Toggle label={__('Enable Scroll To Top')} value={scrollToTop} onChange={value => setAttributes({ scrollToTop: value })} />
                    </PanelBody>

                    <PanelBody title={__('Header')} initialOpen={false}>
                        <Background
                            label={__('Background')}
                            sources={['image', 'gradient']}
                            value={headerBg} onChange={headerBg => setAttributes({ headerBg })}
                        />
                        <Range
                            label={__('Font Size')}
                            value={headingSize}
                            onChange={(headingSize) => setAttributes({ headingSize })}
                            unit={['px']}
                            min={10} max={100} responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Range
                            label={__('Padding X')}
                            value={headerPaddingX}
                            onChange={(headerPaddingX) => setAttributes({ headerPaddingX })}
                            unit={['px']}
                            min={0} max={100} responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Range
                            label={__('Padding Y')}
                            value={headerPaddingY}
                            onChange={(headerPaddingY) => setAttributes({ headerPaddingY })}
                            unit={['px']}
                            min={0} max={100} responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Toggle
                            label={__('Border Separator')}
                            value={enableHeaderBorder}
                            onChange={headerBorderWidth => setAttributes({ headerBorderWidth })}
                        />
                        {
                            enableHeaderBorder && (
                                <Fragment>
                                    <Range
                                        label={__('Border Width')}
                                        value={headerBorderWidth}
                                        onChange={(headerBorderWidth) => setAttributes({ headerBorderWidth })}
                                        unit={['px']}
                                        min={0} max={100} responsive device={device}
                                        onDeviceChange={headerBorderWidth => this.setState({ headerBorderWidth })}
                                    />
                                    <Color
                                        label={__('Border Color')}
                                        value={headerBorderColor}
                                        onChange={headerBorderColor => setAttributes({ headerBorderColor })}
                                    />
                                </Fragment>
                            )
                        }
                    </PanelBody>

                    <PanelBody title={__('Collapsible')} initialOpen={false}>
                        <Toggle label={__('Enable Collapsible')} value={minimizeBox} onChange={minimizeBox => setAttributes({ minimizeBox })} />
                        {
                            minimizeBox && (
                                <Fragment>
                                    <RadioAdvanced
                                        label={__('Alignment')}
                                        options={[
                                            { icon: 'fas fa-align-justify', value: 'qubely-justify-between', title: __('Justify') },
                                            { icon: 'fas fa-align-left', value: 'qubely-justify-start', title: __('Start') },
                                            { icon: 'fas fa-align-center', value: 'qubely-justify-center', title: __('Center') },
                                            { icon: 'fas fa-align-right', value: 'qubely-justify-end', title: __('End') }
                                        ]}
                                        value={collapsibleAlignment}
                                        onChange={collapsibleAlignment => setAttributes({ collapsibleAlignment })} />
                                    <RadioAdvanced
                                        label={__('Type')}
                                        options={[
                                            { label: __('Text'), value: 'text', title: __('Text') },
                                            { label: __('Icon'), value: 'icon', title: __('Icon') }
                                        ]}
                                        value={collapsibleType}
                                        onChange={collapsibleType => setAttributes({ collapsibleType })} />
                                    {
                                        collapsibleType === 'icon' ? (
                                            <RadioAdvanced
                                                label={__('Icon')}
                                                options={[
                                                    { icon: 'fas fa-angle-up', value: 'angle', title: __('Angle') },
                                                    { icon: 'fas fa-chevron-circle-up', value: 'chevron-cirlce', title: __('Chevron Circle') },
                                                    { icon: 'fas fa-plus', value: 'plus', title: __('Plus/Minus') },
                                                    { icon: 'fas fa-plus-square', value: 'plus-square', title: __('Plus/Minus Square') }
                                                ]}
                                                value={collapsibleIcon}
                                                onChange={collapsibleIcon => setAttributes({ collapsibleIcon })} />
                                        ) : (
                                            <Fragment>
                                                <TextControl
                                                    label="Open Text"
                                                    value={ collapsibleOpen }
                                                    onChange={ ( collapsibleOpen ) => setState( { collapsibleOpen } ) } />
                                                <TextControl
                                                    label="Close Text"
                                                    value={ collapsibleClose }
                                                    onChange={ ( collapsibleClose ) => setState( { collapsibleClose } ) } />
                                            </Fragment>

                                        )
                                    }
                                </Fragment>
                            )
                        }
                    </PanelBody>

                    <PanelBody title={__('Body')} initialOpen={false}>
                        <Background
                            label={__('Background')}
                            sources={['image', 'gradient']}
                            value={bodyBg} onChange={bodyBg => setAttributes({ bodyBg })}
                        />
                        <Range
                            label={__('Font Size')}
                            value={bodyFontSize}
                            onChange={(bodyFontSize) => setAttributes({ bodyFontSize })}
                            unit={['px']}
                            min={10} max={100} responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Range
                            label={__('Padding X')}
                            value={bodyPaddingX}
                            onChange={(bodyPaddingX) => setAttributes({ bodyPaddingX })}
                            unit={['px']}
                            min={0} max={100} responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Range
                            label={__('Padding Y')}
                            value={bodyPaddingY}
                            onChange={(bodyPaddingY) => setAttributes({ bodyPaddingY })}
                            unit={['px']}
                            min={0} max={100} responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Border
                            label={__('Border')}
                            separator value={bodyBorder}
                            onChange={(value) => setAttributes({ bodyBorder: value })}
                            unit={['px', 'em', '%']}
                            max={100}
                            min={0}
                            responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <BoxShadow label={__('Box-Shadow')}
                               value={bodyShadow}
                               onChange={(value) => setAttributes({ bodyShadow: value })}
                        />
                        <BorderRadius
                            label={__('Radius')}
                            separator value={bodyBorderRadius}
                            onChange={(value) => setAttributes({ bodyBorderRadius: value })}
                            unit={['px', 'em', '%']}
                            max={100}
                            min={0}
                            responsive device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                    </PanelBody>


                    {animationSettings(uniqueId, animation, setAttributes)}

                    {interactionSettings(uniqueId, interaction, setAttributes)}

                </InspectorControls>

                <div className={classes}>
                    <div className="qubely-table-of-contents">
                        <div className={
                            classnames([
                                'qubely-table-of-contents-header',
                                collapsibleAlignment
                            ])
                        }>
                            {
                                showTitle && (
                                    <div class="qubely-table-of-contents-heading">
                                        <RichText
                                            tagName="div"
                                            value={title}
                                            className="title"
                                            keepPlaceholderOnFocus
                                            placeholder={__('Add Title')}
                                            onChange={newTitle => setAttributes({ title: newTitle })}
                                        />
                                    </div>
                                )
                            }
                            {
                                minimizeBox && <div class='qubely-table-of-contents-toggle'>[<a href='#'>{__('hide')}</a>]</div>
                            }
                        </div>
                        <div class='qubely-table-of-contents-body'>
                            <TableOfContents
                                headers={headerLinks && JSON.parse(headerLinks)}
                                blockProp={this.props}
                            />
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
            </Fragment>
        )
    }
}
export default Edit