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
    Dropdown,
    PanelBody,
    ColorPicker,
    TextControl
} = wp.components;

const {
    select,
    withDispatch,
} = wp.data;

const {
    RichText,
    PanelColorSettings
} = wp.blockEditor;

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
    activePreset: undefined,
    presets: {
        preset1: {
            name: 'Preset #1',
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
            name: 'Preset #2',
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
            presets: {},
            activePreset: null,
            enableRenaming: false,
            showTypoSettings: undefined,
            showPresetSettings: undefined
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
            enableRenaming,
            showTypoSettings,
            showPresetSettings
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

                            let isActivePreset = false, showDetailedSettings = false;

                            if (activePreset === key) {
                                isActivePreset = true;
                            }

                            if (showPresetSettings === index) {
                                showDetailedSettings = true;
                            }

                            const classes = classnames(
                                'preset',
                                { ['active']: isActivePreset },
                                { ['detailed']: showDetailedSettings }
                            )
                            const changePreset = (index) => {
                                this.setState({
                                    showTypoSettings: undefined,
                                    activePreset: isActivePreset ? undefined : index
                                })
                            }
                            const duplicatePreset = (selectedPreset) => {
                                this.setState(prevState => {
                                    let numOfPresets = Object.keys(presets).length,
                                        tempPreset = JSON.parse(JSON.stringify(prevState.presets[selectedPreset]));

                                    const newPresetName = `preset${numOfPresets + 1}`;
                                    prevState.presets[newPresetName] = tempPreset;
                                    prevState.presets[newPresetName].name = `Copy${tempPreset.name}`;
                                    prevState.presets[newPresetName].key = newPresetName;
                                    return ({
                                        presets: prevState.presets
                                    });
                                })

                            }
                            const deletePreset = (selectedPreset) => {
                                this.setState(prevState => {
                                    delete prevState.presets[selectedPreset];
                                    return ({
                                        presets: prevState.presets,
                                        // ...((selectedPreset === activePreset) && { activePreset: undefined})
                                    })
                                });
                            }

                            const renameTitle = (newTitle, presetKey) => {
                                console.log(' renameTitle(newTitle, presetKey) : ', newTitle, presetKey);
                                this.setState(prevState => {
                                    prevState.presets[presetKey].name = newTitle;
                                    return ({
                                        presets: prevState.presets,
                                    })
                                })
                            }

                            const saveAsNew = (presetKey) => {

                            }


                            return (
                                <div key={name} className={classes}>
                                    <div className="title-wrapper">

                                        <div
                                            className="title"
                                            {...(!showDetailedSettings && {
                                                onClick: () => this.setState(state => ({
                                                    showPresetSettings: showDetailedSettings ? undefined : index
                                                }))
                                            })}

                                        >
                                            {
                                                showDetailedSettings ?
                                                    <span className="radio-button"
                                                        onClick={() => this.setState(state => ({
                                                            showPresetSettings: showDetailedSettings ? undefined : index
                                                        }))}>
                                                        {icons.left}</span>
                                                    :
                                                    <span className="radio-button">{isActivePreset ? icons.circleDot : icons.circleThin}</span>
                                            }
                                            <span className="name"> {name}</span>
                                        </div>
                                        <Dropdown
                                            position="bottom center"
                                            className="options"
                                            contentClassName="global-settings preset-options"
                                            renderToggle={({ isOpen, onToggle }) => (
                                                showDetailedSettings ?
                                                    <div className="icon" onClick={onToggle}>{icons.ellipsis_h} </div>
                                                    :
                                                    <div className="icon" onClick={onToggle}>{icons.ellipsis_v} </div>
                                            )}
                                            renderContent={() => {
                                                let activeClass = classnames(
                                                    { ['active']: isActivePreset }
                                                )
                                                return (
                                                    <div className="global-preset-options">
                                                        {
                                                            showDetailedSettings ?
                                                                <div onClick={() => saveAsNew(presetKey)}>Save as New</div>
                                                                :
                                                                <Fragment>
                                                                    <div className={activeClass} {...(!isActivePreset && { onClick: () => changePreset(key) })} >Activate</div>
                                                                    <div onClick={() => this.setState(state => ({ enableRenaming: !state.enableRenaming }))}>Rename</div>
                                                                    <div onClick={() => duplicatePreset(presetKey)}>Duplicate</div>
                                                                </Fragment>
                                                        }

                                                        <div onClick={() => deletePreset(presetKey)}>Delete</div>
                                                    </div>
                                                )
                                            }}
                                        />


                                    </div>

                                    {
                                        showDetailedSettings &&
                                        <Fragment>

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
                                                <PanelBody title={__('Typography')}  initialOpen={true}>
                                                    {
                                                        typography.map((item, index) => {
                                                            let displaySettings = false;
                                                            if (showTypoSettings === index) {
                                                                displaySettings = true;
                                                            }
                                                            let titleClasses = classnames(
                                                                'typo-name',
                                                                { ['active']: displaySettings }
                                                            )
                                                            let Tag = `h${index + 1}`
                                                            return (
                                                                <div className="qubely-global typography qubely-d-flex qubely-align-justified">
                                                                    <div
                                                                        className={titleClasses}
                                                                        onClick={() => this.setState({ showTypoSettings: displaySettings ? undefined : index })}
                                                                    >
                                                                        <Tag> {item.name}</Tag>
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

                                        </Fragment>
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
