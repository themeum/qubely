const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, TextControl, Toolbar } = wp.components
const { InspectorControls, BlockControls } = wp.editor
import { RadioAdvanced, Range, Typography, ColorAdvanced, Toggle, Color, BorderRadius } from '../../components/FieldRender'
import InlineToolbar from '../../components/fields/inline/InlineToolbar'
import { CssGenerator } from '../../components/CssGenerator'
import '../../components/GlobalSettings'
import '../../components/ContextMenu'

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
        const { uniqueId, progress, title, labelTypography, labelPosition, labelColor, labelSpacing, showProgress, barHeight, barBackground, progressBackground, striped, borderRadius } = this.props.attributes
        const { setAttributes } = this.props
        const { device } = this.state
        if (uniqueId) { CssGenerator(this.props.attributes, 'progressbar', uniqueId); }

        const labelsContent = <Fragment>
            {title != '' &&
                <div className={`qubely-block-progress-labels qubely-position-${labelPosition}`}>
                    <div className="qubely-block-progress-bar-title">{title}</div>
                    {showProgress && <div className="qubely-progress-percentage"><span>{progress}%</span></div>}
                </div>
            }
        </Fragment>

        return (
            <Fragment>
                <InspectorControls key="inspector">

                    <PanelBody title="">
                        <Range label={__('Progress')} value={progress} onChange={(value) => setAttributes({ progress: value })} min={1} max={100} />
                        <Range label={__('Height')} value={barHeight} onChange={(value) => setAttributes({ barHeight: value })} min={1} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Text')} initialOpen={false}>
                        <TextControl label={__('Title')} value={title} onChange={val => setAttributes({ title: val })} />
                        {title != '' &&
                            <Fragment>
                                <Toggle label={__('Show Percentage')} value={showProgress} onChange={val => setAttributes({ showProgress: val })} />
                                <RadioAdvanced
                                    label={__('Position')}
                                    options={[
                                        { label: __('Inside'), value: 'inside' },
                                        { label: __('Outside'), value: 'outside' }
                                    ]}
                                    value={labelPosition}
                                    onChange={val => setAttributes({ labelPosition: val })}
                                />
                                <Range label={__('Spacing')} value={labelSpacing} onChange={(value) => setAttributes({ labelSpacing: value })} unit={['px', 'em', '%']} min={0} max={40} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Typography label={__('Typography')} value={labelTypography} onChange={val => setAttributes({ labelTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Color label={__('Color')} value={labelColor} onChange={val => setAttributes({ labelColor: val })} />
                            </Fragment>
                        }
                    </PanelBody>

                    <PanelBody title={__('Bar')} initialOpen={false}>
                        <ColorAdvanced label={__('Background')} value={progressBackground} onChange={val => setAttributes({ progressBackground: val })} />
                        <Toggle label={__('Striped')} value={striped} onChange={val => setAttributes({ striped: val })} />
                        <BorderRadius label={__('Radius')} value={borderRadius} onChange={val => setAttributes({ borderRadius: val })} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Background')} initialOpen={false}>
                        <Color
                            label={__('Background')}
                            value={barBackground}
                            onChange={val => setAttributes({ barBackground: val })} />
                    </PanelBody>
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

                <div className={`qubely-block-${uniqueId}`}>
                    <div className="qubely-block-progress-bar">
                        {labelPosition == 'outside' && labelsContent}
                        <div className="qubely-progress">
                            <div className="qubely-progress-bar" role="progressbar">
                                {striped && <div className="qubely-progress-striped"></div>}
                                {labelPosition == 'inside' && labelsContent}
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}
export default Edit