import './style.scss';
import Color from './components';
import classnames from 'classnames';
import icons from '../../helpers/icons';


/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const {
    Component,
    Fragment
} = wp.element;

const {
    PanelBody,
    ColorPicker
} = wp.components;
const {
    withDispatch,
    select } = wp.data;

const { PanelColorSettings } = wp.blockEditor

const {
    PluginSidebar,
    PluginSidebarMoreMenuItem
} = wp.editPost;


/**
 * Qubely Components
 */
const {
    // Color,
    Typography,
    Separator
} = wp.qubelyComponents;

const PATH = {
    fetch: '/qubely/v1/global_settings',
    post: '/qubely/v1/global_settings'
}

async function fetchFromApi() {
    return await wp.apiFetch({ path: PATH.fetch })
}

function saveGlobalData(props) {
    console.log('hello from saveglobaldata : ', props);
}

class GlobalSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePreset: 0,
            presets: [
                {
                    name: 'preset1',
                    colors: ['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B'],
                },
                {
                    name: 'preset2',
                    colors: ['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B'],
                },
                {
                    name: 'preset3',
                    colors: ['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B'],
                },
                {
                    name: 'preset4',
                    colors: ['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B'],
                }
            ]

        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {

        const {
            presets,
            activePreset
        } = this.state;

        const changeColor = (newColor, index) => {
            let tempColor = [...colors]
            tempColor[index] = newColor;
            this.setState({ colors: tempColor });
        }


        const getInitialSettings = () => {
            return fetchFromApi().then(data => {
                if (data.success) {
                    // window.globalData = { ...data }
                    console.log('data : ', data);
                    // return data
                } else {
                    console.log(' no data found');
                }

            })
        }

        const colorPalettes = (currentPreset) => {

            return (
                <PanelBody title={__('Global Colors')} initialOpen={false}>
                    <div className="qubely-d-flex qubely-align-justified">
                        {presets[currentPreset].colors.map((color, index) => (
                            <Color
                                value={color}
                                key={color + index}
                                onChange={newColor => changeColor(newColor, index)}
                            />
                        ))}
                    </div>
                </PanelBody>
            )
        }


        const renderPresets = () => {
            return (
                <div className="qubely-global-settings">
                    {
                        presets.map((preset, index) => {
                            const { name } = preset;
                            let isActivePreset = false;
                            if (activePreset === index) {
                                isActivePreset = true;
                            }
                            const classes = classnames(
                                'preset',
                                { ['active']: isActivePreset }
                            )
                            return (
                                <div key={name} className={classes}>
                                    <div className="name" onClick={() => { this.setState({ activePreset: index }) }}> {name}</div>
                                    {
                                        isActivePreset &&
                                        <Fragment>
                                            {colorPalettes(index)}
                                        </Fragment>
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            )
        }

        return (
            <Fragment>
                <PluginSidebar
                    icon={icons.qubely}
                    name="global-settings-sidebar"
                    title={__('Global Settings')}
                >
                    {renderPresets()}
                    <button onClick={() => getInitialSettings()}>get</button>
                    <button onClick={() => saveGlobalData()}>Save</button>
                </PluginSidebar>

                <PluginSidebarMoreMenuItem
                    icon={icons.qubely}
                    target="global-settings-sidebar"
                >
                    {__('Global Settings')}
                </PluginSidebarMoreMenuItem>
            </Fragment>
        );
    }
}

export default GlobalSettings;


wp.data.subscribe(() => {
    const {
        isSavingPost,
        isPreviewingPost,
        isPublishingPost,
        isAutosavingPost,
    } = select('core/editor');

    if ((isSavingPost() || isPreviewingPost() || isPublishingPost()) && !isAutosavingPost()) {
        saveGlobalData()
    }
});