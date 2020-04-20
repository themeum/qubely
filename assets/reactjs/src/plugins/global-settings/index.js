import './style.scss';
import Color from './components';
import classnames from 'classnames';
import icons from '../../helpers/icons';
import { isObject } from '../../components/HelperFunction';


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
    select,
    withDispatch,
} = wp.data;

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


const DEFAULTPRESETS = {
    activePreset: 'preset1',
    presets: {
        preset1: {
            name: 'Preset1',
            key: 'preset1',
            colors: ['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B'],
            typography: [
                {
                    name: 'Heading 1',
                    value: {}
                },
                {
                    name: 'Heading 2',
                    value: {}
                },
                {
                    name: 'Heading 3',
                    value: {}
                },
                {
                    name: 'Heading 4',
                    value: {}
                },
                {
                    name: 'Heading 5',
                    value: {}
                },
                {
                    name: 'Heading 6',
                    value: {}
                }
            ],


        },
        preset2: {
            name: 'Preset2',
            key: 'preset2',
            colors: ['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B'],
            typography: [],
        },

    },

}
async function fetchFromApi() {
    return await wp.apiFetch({ path: PATH.fetch })
}



class GlobalSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePreset: null,
            presets: {}
        }
    }

    componentDidMount() {
        this.getGlobalSettings();
        wp.data.subscribe(() => {
            const {
                isSavingPost,
                isPreviewingPost,
                isPublishingPost,
                isAutosavingPost,
            } = select('core/editor');

            if ((isSavingPost() || isPreviewingPost() || isPublishingPost()) && !isAutosavingPost()) {
                this.updateGlobalSettings()
            }
        });
    }
    getGlobalSettings = () => {
        return fetchFromApi().then(data => {
            if (data.success) {
                console.log('data : ', data.settings);
                this.setState({ ...DEFAULTPRESETS, ...data.settings })
            } else {
                this.setState({ ...DEFAULTPRESETS })
            }

        })
    }
    updateGlobalSettings = () => {
        wp.apiFetch({
            path: PATH.post,
            method: 'POST',
            data: { settings: JSON.stringify(this.state) }
            // data: { settings: JSON.stringify({'faisal':{}}) }
        }).then(data => {
            return data
        })
    }

    render() {

        const {
            presets,
            activePreset
        } = this.state;


        // const changeColor = (key, newValue, presetKey) => {
        //     this.setState(({ presets }, props) => {
        //         let tempPresets = presets;
        //         tempPresets[presetKey].colors[key] = newValue;
        //         return { presets: tempPresets };
        //     });
        // }
        const updatePreset = (propertyName, index, newValue, presetKey, isObject = false) => {
            console.log('new update : ', propertyName, index, newValue, presetKey);

            if (isObject) {
                newValue = {
                    ...this.state.presets[presetKey][propertyName][index].value,
                    ...newValue
                }
            }
            this.setState(({ presets }, props) => {
                let tempPresets = presets;
                tempPresets[presetKey][propertyName][index].value = newValue;
                return { presets: tempPresets };
            });
        }

        const renderPresets = () => {
            return (
                <div className="qubely-global-settings">

                    {
                        Object.keys(presets).map((presetKey, index) => {
                            const {
                                name,
                                key,
                                colors,
                                typography
                            } = presets[presetKey];

                            let isActivePreset = false;
                            if (activePreset === key) {
                                isActivePreset = true;
                            }
                            const classes = classnames(
                                'preset',
                                { ['active']: isActivePreset }
                            )
                            return (
                                <div key={name} className={classes}>
                                    <div className="name" onClick={() => { this.setState({ activePreset: key }) }}> {name}</div>
                                    <PanelBody title={__('Global Colors')} initialOpen={true}>
                                        <div className="qubely-d-flex qubely-align-justified">
                                            {
                                                colors.map((value, index) => (
                                                    <Color
                                                        value={value}
                                                        key={value + index}
                                                        onChange={newValue => updatePreset('colors', index, newValue, presetKey)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </PanelBody>
                                    {
                                        (typeof typography !== 'undefined' && typography.length > 0) &&
                                        <PanelBody initialOpen={false} title={__('Typography')}>

                                            {
                                                typography.map(({ name, value }, index) => (
                                                    <div className="qubely-d-flex qubely-align-justified">
                                                        <div>{name}</div>
                                                        <Typography
                                                            value={value}
                                                            globalSettings
                                                            key={name + index}
                                                            onChange={newValue => updatePreset('typography', index, newValue, presetKey, true)}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </PanelBody>
                                    }
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
                    <button onClick={() => this.getGlobalSettings()}>get</button>
                    <button onClick={() => this.updateGlobalSettings()}>Save</button>
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
