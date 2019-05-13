const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.editor
const { Component, Fragment } = wp.element;
const { PanelBody, Toolbar, Dropdown } = wp.components;
import { Range, Color, Alignment, Selector, QubelyDropdown } from '../../components/FieldRender'
import { CssGenerator } from '../../components/CssGenerator'
import InlineToolbar from '../../components/fields/inline/InlineToolbar'
import icons from '../divider/icon';
import '../../components/GlobalSettings';
const dividerOptions = ['fill', 'dot', 'dash', 'branch', 'dashes', 'leaf', 'line1', 'line2', 'line3', 'line4', 'line5', 'line6', 'line7', 'line8', 'line9', 'line10', 'line11', 'line12', 'line13', 'liner', 'mustache', 'shadow', 'slash', 'spring', 'valla', 'wave1', 'wave2', 'wave3']
class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = { device: 'md', isOpen: false, spacer: true, }
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
    renderDividerOptions = () => {
        const { setAttributes } = this.props
        return (
            <div className="qubely-divider-picker-options">
                <ul>
                    {dividerOptions.map((item, index) => (
                        <li
                            className={`qubely-divider-picker-option ${index}`}
                            onClick={() => { setAttributes({ style: item }) }}>
                            {icons[item]}
                        </li>
                    )
                    )}
                </ul>
            </div>
        )
    }

    render() {
        const { setAttributes, attributes: { uniqueId, color, height, width, alignment, style } } = this.props

        const { device } = this.state
        if (uniqueId) { CssGenerator(this.props.attributes, 'divider', uniqueId); }
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title={__('Divider Options')} initialOpen={true}>
                        <QubelyDropdown
                            dropDownClassName="qubely-divider-picker"
                            contentClassName="qubely-divider-picker-content"
                            position="bottom center"
                        >
                            <span >{icons[style]}</span>
                            {this.renderDividerOptions()}
                        </QubelyDropdown>
                        <Alignment
                            label={__('Alignment')}
                            alignmentType="content"
                            disableJustify
                            value={alignment}
                            onChange={val => setAttributes({ alignment: val })}
                            responsive
                            device={device} 
                            onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody >

                    <PanelBody title={__('Divider Settings', 'qubely')} initialOpen={false}>
                        <Color
                            label={__('Color')}
                            value={color}
                            onChange={val => setAttributes({ color: val })} />
                        <Range
                            label={__('Height')}
                            value={height}
                            onChange={val => setAttributes({ height: val })}
                            min={0}
                            max={15}
                            unit={['px', 'em', '%']}
                            responsive 
                            device={device} 
                            onDeviceChange={value => this.setState({ device: value })}/>
                        <Range
                            label={__('Width')}
                            value={width}
                            onChange={val => setAttributes({ width: val })}
                            min={0}
                            max={1000}
                            unit={['px', 'em', '%']}
                            responsive
                            device={device} 
                            onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                </InspectorControls >

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                <div className={`qubely-block-${uniqueId}`}>
                    <QubelyDropdown
                        dropDownClassName="qubely-divider-picker"
                        contentClassName="qubely-divider-picker-content"
                        position="bottom center"
                    >
                        <div className={`qubely-block-divider`}>
                            {((style == 'fill') || (style == 'dot') || (style == 'dash')) ?
                                <div className={`qubely-block-divider-style-${style}`} />
                                :
                                <span >{icons[style]}</span>
                            }
                        </div>
                        {this.renderDividerOptions()}
                    </QubelyDropdown>
                </div>
            </Fragment >
        );
    }
}

export default Edit;