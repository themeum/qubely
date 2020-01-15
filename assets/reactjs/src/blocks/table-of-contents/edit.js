import classnames from 'classnames';
import icons from '../../helpers/icons';
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
    BlockControls
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
                className,
                headerLinks,
                animation,
                interaction
            }
        } = this.props

        const { device } = this.state

        if (uniqueId) { CssGenerator(attributes, 'table-of-contents', uniqueId); }


        const classes = classnames(className,
            `qubely-block-${uniqueId}`
        );
        console.log('headerLinks : ', headerLinks)
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title={__('')} initialOpen={true}>
                    </PanelBody>


                    {animationSettings(uniqueId, animation, setAttributes)}

                    {interactionSettings(uniqueId, interaction, setAttributes)}

                </InspectorControls>

                <div className={classes}>
                    <TableOfContents
                        headers={headerLinks && JSON.parse(headerLinks)}
                        blockProp={this.props}
                    />
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