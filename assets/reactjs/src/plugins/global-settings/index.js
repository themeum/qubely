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
            activePreset: 'preset1',
            presets: {
                preset1: {
                    name: 'Preset1',
                    colors: {
                        name: 'color1',
                        values: {
                            color1: '#4A90E2',
                            color2: '#50E3C2',
                            color3: '#000',
                            color4: '#4A4A4A',
                            color5: '#9B9B9B',
                        }

                    }
                },
                preset2: {
                    name: 'Preset2',
                    colors: {
                        name: 'color1',
                        values: {
                            color1: '#4A90E2',
                            color2: '#50E3C2',
                            color3: '#000',
                            color4: '#4A4A4A',
                            color5: '#9B9B9B',
                        }

                    }
                },

            },

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


        const changeColor = (key, newValue, presetKey) => {
            this.setState(({ presets }, props) => {
                let tempPresets = presets;
                tempPresets[presetKey].colors.values[key] = newValue;
                return { presets: tempPresets };
            });
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

        const renderPresets = () => {
            return (
                <div className="qubely-global-settings">

                    {
                        Object.keys(presets).map((presetKey, index) => {
                            const { name, colors } = presets[presetKey];
                            let isActivePreset = false;
                            if (activePreset === presetKey) {
                                isActivePreset = true;
                            }
                            const classes = classnames(
                                'preset',
                                { ['active']: isActivePreset }
                            )
                            return (
                                <div key={name} className={classes}>
                                    <div className="name" onClick={() => { this.setState({ activePreset: index }) }}> {name}</div>
                                    <PanelBody title={__('Global Colors')} initialOpen={true}>
                                        <div className="qubely-d-flex qubely-align-justified">
                                            {
                                                Object.keys(colors.values).map((key, index) => {
                                                    return (
                                                        <Color
                                                            value={colors.values[key]}
                                                            onChange={newValue => changeColor(key, newValue, presetKey)}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </PanelBody>
                                </div>
                            )
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