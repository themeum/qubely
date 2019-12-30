const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, Tooltip } = wp.components
const { compose } = wp.compose
const { withSelect, withDispatch } = wp.data
const { InnerBlocks, InspectorControls } = wp.blockEditor
const { Range, Alignment, gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, CssGenerator: { CssGenerator } } = wp.qubelyComponents

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md'
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
            attributes: {
                uniqueId,
                className,
                alignment,
                buttons,
                spacing,
                padding,
                interaction,
                //animation
                animation,
                //global
                globalZindex,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                hideTablet,
                hideMobile,
                globalCss
            },
            setAttributes,
            block,
            clientId,
            isSelected,
            name,
            updateBlockAttributes } = this.props
        if (uniqueId) { CssGenerator(this.props.attributes, 'buttongroup', uniqueId); }
        const { device } = this.state
        let index = 0
        while (index < buttons) {
            block.innerBlocks[index] && updateBlockAttributes(block.innerBlocks[index].clientId, Object.assign(block.innerBlocks[index].attributes, { parentClientId: clientId }))
            index++
        }
        index = 0
        let iterator = []
        while (index < buttons) {
            iterator.push(index)
            index++
        }

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title="" initialOpen={true}>
                        <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} flex disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <Range
                            label={__('Button Spacing')}
                            value={spacing}
                            onChange={value => setAttributes({ spacing: value })}
                            min={0} max={100}
                            unit={['px', 'em', '%']}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    {animationSettings(uniqueId, animation, setAttributes)}

                    {interactionSettings(uniqueId, interaction, setAttributes)}

                </InspectorControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div className={`qubely-block-button-group`}>
                        <InnerBlocks
                            tagName="div"
                            className=""
                            template={iterator.map(buttonIndex => ['qubely/button',
                                {
                                    buttonGroup: true,
                                    parentClientId: clientId,
                                    enableAlignment: false,
                                    spacer: {
                                        spaceTop: { md: '0', unit: "px" },
                                        spaceBottom: { md: '0', unit: "px" }
                                    },
                                    customClassName: 'qubely-group-button',
                                    disableFullWidth: true
                                }
                            ])}
                            templateLock="all"
                            allowedBlocks={['qubely/button']} />

                        <Tooltip text={__('Add new Button')}>
                            <span className="qubely-add-new" onClick={() => setAttributes({ buttons: buttons + 1 })} role="button" areaLabel={__('Add new button')}>
                                <i className="fas fa-plus-circle" />
                            </span>
                        </Tooltip>
                    </div>
                </div>

            </Fragment>
        )
    }
}
export default compose([
    withSelect((select, ownProps) => {
        const { clientId } = ownProps
        const { getBlock } = select('core/block-editor');
        return {
            block: getBlock(clientId)
        };
    }),
    withDispatch((dispatch) => {
        const { updateBlockAttributes } = dispatch('core/block-editor');
        return {
            updateBlockAttributes
        }
    }),
])(Edit)