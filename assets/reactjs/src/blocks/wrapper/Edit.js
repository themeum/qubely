const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, Toolbar } = wp.components
const { InspectorControls, BlockControls, InnerBlocks } = wp.editor
import { Color, ColorAdvanced, Padding, BoxShadow, Tabs, Tab, Border, BorderRadius } from "../../components/FieldRender"
import { CssGenerator } from '../../components/CssGenerator'
import InlineToolbar from '../../components/fields/inline/InlineToolbar'
import '../../components/GlobalSettings'
import icons from '../../helpers/icons';

class Edit extends Component {
	constructor() {
        super(...arguments);
        this.state = { device: 'md', spacer: true };
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
		const { setAttributes, attributes:{ uniqueId, bgColor, bgColorHover, bgShadow, bgShadowHover, bgBorderColorHover, padding, borderRadius, border} } = this.props
		const { device } = this.state
		if (uniqueId) { CssGenerator( this.props.attributes, 'wrapper', uniqueId); }

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('Background')} initialOpen={false}>
                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <ColorAdvanced label={__('Background Color')} value={bgColor} onChange={val => setAttributes({ bgColor: val })} />
								<Padding
										label={__('Padding')}
										value={padding}
										min={0}
										max={100}
										responsive
										device={device}
										unit={['px', 'em', '%']}
										onChange={val => setAttributes({ padding: val })}
										onDeviceChange={value => this.setState({ device: value })}
									/>
							    <Border label={__('Border')} value={border} onChange={val => setAttributes({ border: val })} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <BoxShadow label={__('Box-Shadow')} value={bgShadow} onChange={(value) => setAttributes({ bgShadow: value })} />
                                <BorderRadius label={__('Radius')} value={borderRadius} onChange={(value) => setAttributes({ borderRadius: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <ColorAdvanced label={__('Background Color')} value={bgColorHover} onChange={val => setAttributes({ bgColorHover: val })} />
								{ (border.openBorder != undefined && border.openBorder == 1) &&
                                	<Color label={__('Border Color')} value={bgBorderColorHover} onChange={(value) => setAttributes({ bgBorderColorHover: value })} />
                                }
                                <BoxShadow label={__('Box-Shadow')} value={bgShadowHover} onChange={(value) => setAttributes({ bgShadowHover: value })} />
                            </Tab>
                        </Tabs>
                    </PanelBody>
				</InspectorControls>

				<BlockControls>
                    <Toolbar>
                        <InlineToolbar 
                            data={[ { name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] } ]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

				<div className={`qubely-block-${uniqueId}`}>
					<div className="qubely-block-wrapper-block">
						<InnerBlocks templateLock={ false } />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Edit;