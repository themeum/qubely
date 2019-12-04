const { __ } = wp.i18n
const { compose } = wp.compose;
const { select, withDispatch } = wp.data
const { PanelBody, TextControl, SelectControl, Tooltip, Button, RangeControl } = wp.components
const { Component, Fragment } = wp.element
const { InspectorControls, InnerBlocks, InspectorAdvancedControls } = wp.blockEditor
const { Background, Select, Range, Toggle, Shape, BoxShadow, Tab, Tabs, Separator, Border, BorderRadius, RadioAdvanced, Dimension, gloalSettings: { globalSettingsPanel, animationSettings }, HelperFunction: { videoBackground }, CssGenerator: { CssGenerator } } = wp.qubelyComponents
import { ModalManager } from '../../helpers/ModalManager';
import PageListModal from '../../helpers/PageListModal';
import icons from '../../helpers/icons';

const colOption = [
    { label: '100', columns: 1, layout: { md: [100], sm: [100], xs: [100] } },
    { label: '50/50', columns: 2, layout: { md: [50, 50], sm: [100, 100], xs: [100, 100] } },
    { label: '33/33/33', columns: 3, layout: { md: [33.33, 33.33, 33.34], sm: [100, 100, 100], xs: [100, 100, 100] } },
    { label: '25/25/25/25', columns: 4, layout: { md: [25, 25, 25, 25], sm: [50, 50, 50, 50], xs: [100, 100, 100, 100] } },
    { label: '34/66', columns: 2, layout: { md: [34, 66], sm: [50, 50], xs: [100, 100] } },
    { label: '66/34', columns: 2, layout: { md: [66, 34], sm: [100, 100], xs: [100, 100] } },
    { label: '25/25/50', columns: 3, layout: { md: [25, 25, 50], sm: [50, 50, 100], xs: [100, 100, 100] } },
    { label: '50/25/25', columns: 3, layout: { md: [50, 25, 25], sm: [100, 50, 50], xs: [100, 100, 100] } },
    { label: '25/50/25', columns: 3, layout: { md: [25, 50, 25], sm: [100, 100, 100], xs: [100, 100, 100] } },
    { label: '20/20/20/20/20', columns: 5, layout: { md: [20, 20, 20, 20, 20], sm: [20, 20, 20, 20, 20], xs: [20, 20, 20, 20, 20] } },
    { label: '16/16/16/16/16/16', columns: 6, layout: { md: [16.66, 16.67, 16.66, 16.67, 16.67, 16.67], sm: [33.33, 33.33, 33.34, 33.33, 33.33, 33.34], xs: [50, 50, 50, 50, 50, 50] } },
    { label: '16/66/16', columns: 3, layout: { md: [16.66, 66.68, 16.66], sm: [100, 100, 100], xs: [100, 100, 100] } },
];

let defaultLayout = { md: [100], sm: [100], xs: [100] }

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            hideRowSettings: false
        }
    }
    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const { getBlockRootClientId } = select('core/block-editor');

        let parentClientId = getBlockRootClientId(clientId)

        if (parentClientId) {
            this.setState({ hideRowSettings: true })
        }

        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client, childRow: parentClientId ? true : false });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client, childRow: parentClientId ? true : false });
        }
    }

    getTemplate(columns) {
        return [...Array(parseInt(columns))].map((data, index) => {
            const columnWidth = { md: defaultLayout.md[index], sm: defaultLayout.sm[index], xs: defaultLayout.xs[index], unit: '%', device: 'md' }
            return ['qubely/column', { colWidth: columnWidth }]
        })
    }

    removeRowBlock() {
        const { clientId, removeBlock } = this.props;
        removeBlock(clientId); //remove row block
    }

    importLayout() {
        ModalManager.open(<PageListModal rowClientId={this.props.clientId} />);
    }

    render() {
        const {
            attributes: {
                uniqueId,
                rowId,
                columns,
                align,
                rowGutter,
                rowBlend,
                rowOverlay,
                rowOpacity,
                rowContainer,
                rowContainerWidth,
                position,
                padding,
                marginTop,
                marginBottom,
                rowBg,
                shapeTop,
                shapeBottom,
                rowReverse,
                rowShadow,
                heightOptions,
                rowHeight,
                border,
                borderRadius,
                enableRowOverlay
                ,
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
                globalCss
            },
            setAttributes } = this.props;

        const { device, hideRowSettings } = this.state

        if (uniqueId) { CssGenerator(this.props.attributes, 'row', uniqueId); }

        if (!columns) {
            return (
                <Fragment>
                    <div className="qubely-row-preset" >
                        <Button onClick={() => this.removeRowBlock()} className="qubely-component-remove-button" >
                            <i className="fa fa-times" />
                        </Button>
                        <div className="qubely-row-preset-title">{__('Select Column Layout')}</div>
                        <div className="qubely-row-preset-group">
                            {colOption.map((data) => (
                                <Tooltip text={data.label}>
                                    <button onClick={() => {
                                        setAttributes({ columns: data.columns });
                                        defaultLayout = data.layout
                                    }}>
                                        {data.layout.md.map(d => <i style={{ width: d + '%' }} />)}
                                    </button>
                                </Tooltip>
                            ))}
                        </div>
                        <div className={`import-layout-btn-container`}>
                            <button type="button"
                                className={`components-button is-button is-default is-primary is-large`}
                                onClick={() => this.importLayout()}>
                                {__('Import Layout')}
                            </button>
                        </div>
                    </div>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody initialOpen={true} title={__('Dimension')}>

                        <SelectControl
                            label={__('Height')}
                            value={heightOptions || ''}
                            options={[
                                { label: __('Auto'), value: '' },
                                { label: __('Window Height (100%)'), value: 'window' },
                                { label: __('Custom'), value: 'custom' }
                            ]}
                            onChange={val => setAttributes({ heightOptions: val })}
                        />

                        {heightOptions === 'custom' &&
                            <Range
                                label={__('Min Height')}
                                value={rowHeight || ''}
                                onChange={val => setAttributes({ rowHeight: val })}
                                min={40}
                                max={1200}
                                unit={['px', 'em', '%']}
                                responsive
                                device={this.state.device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />
                        }

                        {(align == 'full' && !hideRowSettings) &&
                            <Fragment>
                                <RadioAdvanced label={__('Container')} value={rowContainerWidth} onChange={val => setAttributes({ rowContainerWidth: val })}
                                    options={[
                                        { label: __('Full Width'), value: 'fluid', title: __('Full Width') },
                                        { label: __('Boxed'), value: 'boxed', title: __('Boxed') }
                                    ]}
                                />
                                {rowContainerWidth == 'boxed' &&
                                    <Range
                                        label={__('Container Width')}
                                        min={970} max={1920}
                                        value={rowContainer}
                                        onChange={val => setAttributes({ rowContainer: parseInt(val) })}
                                    />
                                }
                            </Fragment>
                        }

                        {columns > 1 &&
                            <Range
                                label={__('Gutter Size')}
                                min={0} max={100}
                                value={rowGutter}
                                onChange={val => setAttributes({ rowGutter: val })}
                                unit={['px', 'em', '%']}
                                responsive
                                device={this.state.device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />
                        }

                        <Separator />

                        <Dimension
                            label={__('Padding')}
                            value={padding}
                            onChange={val => setAttributes({ padding: val })}
                            min={0}
                            max={600}
                            unit={['px', 'em', '%']}
                            responsive
                            device={this.state.device}
                            onDeviceChange={value => this.setState({ device: value })}
                            clientId={this.props.clientId}
                        />

                        <Separator />
                        <Range label={__('Margin Top')} value={marginTop} onChange={(value) => setAttributes({ marginTop: value })} unit={['px', 'em', '%']} min={-400} max={500} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <Range label={__('Margin Bottom')} value={marginBottom} onChange={(value) => setAttributes({ marginBottom: value })} unit={['px', 'em', '%']} min={-400} max={500} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />


                        <Separator />

                        <div className="qubely-field">
                            <label>{__('Content Position')}</label>
                            <div className="qubely-field-button-list qubely-field-button-list-fluid">
                                <Tooltip text={__('Top')}>
                                    <button
                                        onClick={() => setAttributes({ position: 'flex-start' })}
                                        className={"qubely-button" + (position === 'flex-start' ? ' active' : '')}
                                    >{icons.vertical_top}</button>
                                </Tooltip>

                                <Tooltip text={__('Middle')} >
                                    <button
                                        onClick={() => setAttributes({ position: 'center' })}
                                        className={"qubely-button" + (position === 'center' ? ' active' : '')}
                                    >{icons.vertical_middle}</button>
                                </Tooltip>

                                <Tooltip text={__('Bottom')} >
                                    <button
                                        onClick={() => setAttributes({ position: 'flex-end' })}
                                        className={"qubely-button" + (position === 'flex-end' ? ' active' : '')}
                                    >{icons.vertical_bottom}</button>
                                </Tooltip>
                            </div>
                        </div>
                    </PanelBody>

                    <PanelBody initialOpen={false} title={__('Background')}>
                        <Background label={__('Background')} sources={['image', 'gradient', 'video']} parallax value={rowBg} onChange={val => setAttributes({ rowBg: val })} />
                        <Separator />
                        <Border
                            label={__('Border')}
                            value={border} unit={['px', 'em']}
                            responsive
                            onChange={val => setAttributes({ border: val })}
                            min={0}
                            max={10}
                            device={this.state.device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Separator />
                        <BoxShadow label={__('Box-Shadow')} value={rowShadow} onChange={val => setAttributes({ rowShadow: val })} />
                        <Separator />
                        <BorderRadius
                            label={__('Radius')}
                            value={borderRadius}
                            onChange={val => setAttributes({ borderRadius: val })}
                            min={0}
                            max={100}
                            unit={['px', 'em', '%']}
                            responsive
                            device={this.state.device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />

                        <Separator />
                        <Toggle label={__('Enable Overlay')} value={enableRowOverlay} onChange={val => setAttributes({ enableRowOverlay: val })} />
                        {enableRowOverlay == 1 &&
                            <Fragment>
                                <Background label={__('Overlay')} sources={['image', 'gradient']} value={rowOverlay} onChange={val => setAttributes({ rowOverlay: val })} />
                                {rowOverlay.openBg == 1 &&
                                    <Fragment>
                                        <RangeControl beforeIcon={"lightbulb"} label={__('Overlay Opacity')} min={.01} max={1} step={.01} value={rowOpacity} onChange={val => setAttributes({ rowOpacity: val })} />
                                        <Select label={__('Overlay Blend Mode')} options={[['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')]]} value={rowBlend} onChange={val => setAttributes({ rowBlend: val })} />
                                    </Fragment>
                                }
                            </Fragment>
                        }
                    </PanelBody>

                    <PanelBody initialOpen={false} title={__('Shape Divider')}>
                        <Tabs>
                            <Tab tabTitle={__('Top Shape')}>
                                <Shape value={shapeTop} responsive onChange={val => setAttributes({ shapeTop: val })} />
                            </Tab>
                            <Tab tabTitle={__('Bottom Shape')}>
                                <Shape value={shapeBottom} onChange={val => setAttributes({ shapeBottom: val })} />
                            </Tab>
                        </Tabs>
                    </PanelBody>
                    {animationSettings(uniqueId, animation, setAttributes)}
                </InspectorControls>

                <InspectorAdvancedControls>
                    <Toggle label={__('Column Reverse')} responsive value={rowReverse.values} onChange={val => setAttributes({ rowReverse: { values: val, openRowReverse: true } })} />
                    <TextControl label={__('CSS ID')} value={rowId} onChange={val => setAttributes({ rowId: val })} />
                    {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes, true)}
                </InspectorAdvancedControls>

                <div className={`qubely-section qubely-block-${uniqueId} ${(rowBg.bgimgParallax && rowBg.bgimgParallax == 'animated') ? 'qubely-section-parallax' : ''}`} {...rowId ? { id: rowId } : ''}>
                    <div className="qubley-padding-indicator">
                        <span className="qubely-indicator-top" style={{ height: padding.md.top ? padding.md.top + padding.unit : 0 }} >
                            {(padding.md.top && padding.md.top > 20) ? padding.md.top + ' ' + padding.unit : ''}
                        </span>
                        <span className="qubely-indicator-right" style={{ width: padding.md.right ? padding.md.right + padding.unit : 0 }} >
                            {(padding.md.right && padding.md.right > 40) ? padding.md.right + ' ' + padding.unit : ''}
                        </span>
                        <span className="qubely-indicator-bottom" style={{ height: padding.md.bottom ? padding.md.bottom + padding.unit : 0 }} >
                            {(padding.md.bottom && padding.md.bottom > 20) ? padding.md.bottom + ' ' + padding.unit : ''}
                        </span>
                        <span className="qubely-indicator-left" style={{ width: padding.md.left ? padding.md.left + padding.unit : 0 }} >
                            {(padding.md.left && padding.md.left > 40) ? padding.md.left + ' ' + padding.unit : ''}
                        </span>
                    </div>
                    <div className="qubley-margin-indicator">
                        <span className="qubely-indicator-top" style={{ height: marginTop.md ? marginTop.md + marginTop.unit : 0 }} >
                            {marginTop.md && marginTop.md > 20 ? marginTop.md + ' ' + marginTop.unit : ''}
                        </span>
                        <span className="qubely-indicator-bottom" style={{ height: marginBottom.md ? marginBottom.md + marginBottom.unit : 0 }} >
                            {marginBottom.md && marginBottom.md > 20 ? marginBottom.md + ' ' + marginBottom.unit : ''}
                        </span>

                    </div>
                    {(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
                        <div className="qubely-shape-divider qubely-top-shape" dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeTop.style] }} />
                    }
                    {(Object.entries(rowBg).length > 0 && rowBg.openBg == 1 && rowBg.bgType == 'video') &&
                        videoBackground(rowBg, 'row')
                    }
                    {(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
                        <div className="qubely-shape-divider qubely-bottom-shape" dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeBottom.style] }} />
                    }
                    <div className="qubely-row-overlay"></div>
                    <div className={`${align == 'full' ? ((rowContainerWidth == 'boxed') ? 'qubely-container' : 'qubely-container-fluid') : 'qubely-container-fluid'}`}>
                        <div className={`qubely-row qubely-backend-row ${(heightOptions == 'window') ? 'qubely-row-height-window' : ''}`}>
                            <InnerBlocks template={this.getTemplate(columns)} templateLock="all" allowedBlocks={['qubely/column']} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default compose([
    withDispatch((dispatch) => {
        const {
            removeBlock,
        } = dispatch('core/block-editor');

        return {
            removeBlock,
        };
    }),
])(Edit);