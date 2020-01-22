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
    Toolbar
} = wp.components;

const {
    RichText,
    InspectorControls,
    BlockControls,
    BlockAlignmentToolbar,
} = wp.blockEditor;

const {
    Media,
    Tabs,
    Tab,
    Range,
    Separator,
    RadioAdvanced,
    Typography,
    Toggle,
    Styles,
    Alignment,
    ColorAdvanced,
    Color,
    Border,
    BoxShadow,
    BorderRadius,
    Padding,
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
                showTitle,
                title,
                headerLinks,
                animation,
                interaction
            }
        } = this.props

        const { device } = this.state

        if (uniqueId) { CssGenerator(attributes, 'table-of-contents', uniqueId); }


        const classes = classnames(
            `qubely-block-${uniqueId}`,
            'qubely-block-table-of-contents',
            `qubely-align-${align}`,
        );
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
                    </PanelBody>


                    {animationSettings(uniqueId, animation, setAttributes)}

                    {interactionSettings(uniqueId, interaction, setAttributes)}

                </InspectorControls>

                <div className={classes}>
                    <div className="qubely-table-of-contents">
                        {
                            showTitle &&
                            <RichText
                                tagName="div"
                                value={title}
                                className="title"
                                keepPlaceholderOnFocus
                                placeholder={__('Add Title')}
                                onChange={newTitle => setAttributes({ title: newTitle })}
                            />
                        }
                        <TableOfContents
                            headers={headerLinks && JSON.parse(headerLinks)}
                            blockProp={this.props}
                        />
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