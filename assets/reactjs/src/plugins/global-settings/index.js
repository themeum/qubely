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
import Typography from '../../components/fields/Typography'
import { CssGenerator } from '../../components/CssGenerator'
// const {
//     // Color,
//     // Typography,
//     CssGenerator: {
//         // CssGenerator
//     }
// } = wp.qubelyComponents;

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
                    openTypography: 1,
                    style: [{
                        selector: '{{QUBELY}} h1'
                    }]
                    // value: {}
                },
                {
                    name: 'Heading 2',
                    openTypography: 1,
                    // value: {},
                    style: [{
                        selector: '{{QUBELY}} h2'
                    }]
                },
                {
                    name: 'Heading 3',
                    openTypography: 1,
                    // value: {},
                    style: [{
                        selector: '{{QUBELY}} h3'
                    }]
                },
                {
                    name: 'Heading 4',
                    openTypography: 1,
                    // value: {},
                    style: [{
                        selector: '{{QUBELY}} h4'
                    }]
                },
                {
                    name: 'Heading 5',
                    openTypography: 1,
                    // value: {},
                    style: [{
                        selector: '{{QUBELY}} h5'
                    }]
                },
                {
                    name: 'Heading 6',
                    openTypography: 1,
                    // value: {},
                    style: [{
                        selector: '{{QUBELY}} h6'
                    }]
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
            showTypoSettings: undefined,
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
        const {
            presets,
            activePreset
        } = this.state;

        console.log('state before saving : ', presets[activePreset].typography[0]);

        wp.apiFetch({
            path: PATH.post,
            method: 'POST',
            data: { settings: JSON.stringify(this.state) }
        }).then(data => {
            console.log('data : ', data);
            return data
        })
    }
    delGlobalSettings = () => {
        wp.apiFetch({
            path: PATH.post,
            method: 'POST',
            data: { settings: JSON.stringify({ 'delete': true }) }
        }).then(data => {
            console.log('data : ', data);
            return data
        })
    }

    render() {

        const {
            presets,
            activePreset,
            showTypoSettings
        } = this.state;

        if (presets[activePreset]) {
            CssGenerator(presets[activePreset].typography, 'global-settings', 'global', false, true, false, presets[activePreset].typography)
        }


        const changeColor = (key, newValue, presetKey) => {
            this.setState(({ presets }, props) => {
                let tempPresets = presets;
                tempPresets[presetKey].colors[key] = newValue;
                return { presets: tempPresets };
            });
        }
        const updatePreset = (propertyName, index, newValue, presetKey, isObject = false) => {
            // console.log('new update : ', propertyName, index, newValue, presetKey);

            if (isObject) {
                newValue = {
                    ...this.state.presets[presetKey][propertyName][index],
                    ...newValue
                }
            }
            this.setState(({ presets }, props) => {
                let tempPresets = presets;
                tempPresets[presetKey][propertyName][index] = newValue;
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
                                    <div className="name" onClick={() => { this.setState({ activePreset: key, showTypoSettings: undefined }) }}> {name}</div>
                                    <PanelBody title={__('Global Colors')} initialOpen={true}>
                                        <div className="qubely-d-flex qubely-align-justified">
                                            {
                                                colors.map((value, index) => (
                                                    <Color
                                                        value={value}
                                                        key={value + index}
                                                        onChange={newValue => changeColor(index, newValue, presetKey)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </PanelBody>
                                    {
                                        (typeof typography !== 'undefined' && typography.length > 0) &&
                                        <PanelBody initialOpen={true} title={__('Typography')}>
                                            {
                                                typography.map((item, index) => {
                                                    let displaySettings = false;
                                                    if (isActivePreset && showTypoSettings === index) {
                                                        displaySettings = true;
                                                    }
                                                    let titleClasses = classnames(
                                                        'typo-name',
                                                        { ['active']: displaySettings }
                                                    )
                                                    return (
                                                        <div className="qubely-global typography qubely-d-flex qubely-align-justified">
                                                            <div
                                                                className={titleClasses}
                                                                onClick={() => this.setState({ showTypoSettings: displaySettings ? undefined : index })}
                                                            >
                                                                {item.name}
                                                            </div>

                                                            {displaySettings &&
                                                                <Typography
                                                                    value={item}
                                                                    globalSettings
                                                                    key={name + index}
                                                                    onChange={newValue => updatePreset('typography', index, newValue, presetKey, true)}
                                                                />
                                                            }
                                                        </div>
                                                    )
                                                })
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

        console.log('this state :', this.state);

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
                    <button onClick={() => this.delGlobalSettings()}>delete</button>
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
