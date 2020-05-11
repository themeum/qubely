import './style.scss';
import Color from './components';
import classnames from 'classnames';
import icons from '../../helpers/icons';
import {
    getGlobalSettings as getGlobalCSS,
    injectGlobalCSS,
    updateGlobalVaribales
} from '../../helpers/globalCSS';


/**
 * Qubely Components
 */
import Typography from '../../components/fields/Typography';
import ButtonGroup from '../../components/fields/ButtonGroup';
import { CssGenerator } from '../../components/CssGenerator';
import { ADDNEWDEFAULT, DEFAULTPRESETS } from './constants';
import { placeCaretAtEnd } from '../../helpers/utils';
/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const {
    Component,
    Fragment,
    createRef
} = wp.element;

const {
    Tooltip,
    Dropdown,
    PanelBody,
    ColorPicker,
    TextControl,
} = wp.components;

const {
    select
} = wp.data;

const {
    RichText
} = wp.blockEditor;

const {
    PluginSidebar,
    PluginSidebarMoreMenuItem
} = wp.editPost;


const PATH = '/qubely/v1/global_settings';

async function fetchFromApi() {
    return await wp.apiFetch({ path: PATH })
}



class GlobalSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: {},
            newTypoScope: 'others',
            newTypoTitle: null,
            activePreset: null,
            enableRenaming: undefined,
            showTypoSettings: undefined,
            showPresetSettings: undefined
        }
        this.ref = createRef();
        this.saveGlobalCSS = this.saveGlobalCSS.bind(this);
    }

    async componentDidMount() {
        await this.getGlobalSettings();
        await this.saveGlobalCSS();
        await this.updateGlobalSettings()
    }
    async saveGlobalCSS() {
        let _CSS = await getGlobalCSS();
        injectGlobalCSS(_CSS);

    }

    async componentDidUpdate(prevProps, prevState) {
        const {
            presets,
            activePreset,
            enableRenaming
        } = this.state;

        if ((enableRenaming !== prevProps.enableRenaming) && typeof enableRenaming !== 'undefined') {
            setTimeout(() => {
                if (typeof this.ref.current !== 'undefined') {
                    placeCaretAtEnd(this.ref.current);
                }
            }, 100);
        }
        if (presets && activePreset) {
            if (activePreset !== prevState.activePreset) {
                updateGlobalVaribales(presets[activePreset]);
            }
        }
    }


    getGlobalSettings = () => {
        return fetchFromApi().then(data => {
            if (data.success) {
                console.log('data : ', data.settings);
                this.setState({ ...DEFAULTPRESETS, ...data.settings })
            } else {
                this.setState({ ...DEFAULTPRESETS })
            }
        });
    }

    updateGlobalSettings = async () => {
        const {
            presets,
            activePreset
        } = this.state;
        let tempData = {
            activePreset,
            presets: {
                ...presets
            }
        }
        await wp.apiFetch({
            path: PATH,
            method: 'POST',
            data: { settings: JSON.stringify(tempData) }
        }).then(data => {
            return data;
        })
    }

    delGlobalSettings = () => {
        wp.apiFetch({
            path: PATH,
            method: 'POST',
            data: { settings: JSON.stringify({ 'delete': true }) }
        }).then(data => {
            console.log('data : ', data);
            return data;
        })
    }

    render() {
        const {
            presets,
            newTypoScope,
            newTypoTitle,
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
                updateGlobalVaribales(tempPresets[presetKey]);
                return { presets: tempPresets };
            });
        }
        const addNewColor = (presetKey) => {
            this.setState(({ presets }, props) => {
                let tempPresets = presets;
                tempPresets[presetKey].colors.push('');
                return { presets: tempPresets };
            });
        }

        const deleteColor = (index, presetKey) => {
            this.setState(({ presets }, props) => {
                let tempPresets = presets;
                tempPresets[presetKey].colors.splice(index, 1);
                return { presets: tempPresets };
            });
        }

        const updateTypography = (addnew = false, presetKey, index, newValue) => {

            this.setState(({ newTypoScope, newTypoTitle, presets }) => {
                let tempPresets = presets;
                if (addnew) {
                    tempPresets[presetKey].typography.push({
                        name: newTypoTitle ? newTypoTitle : 'Custom Typo',
                        removable: true,
                        scope: newTypoScope,
                        value: {
                            openTypography: 1,
                        }
                    });
                } else if (newValue === 'delete') {
                    tempPresets[presetKey].typography.splice(index, 1);
                } else {
                    tempPresets[presetKey].typography[index].value = newValue;
                }

                updateGlobalVaribales(tempPresets[presetKey]);
                return ({
                    presets: tempPresets,
                    newTypoTitle: null,
                    // showTypoSettings: undefined
                });
            });
        }
        const addNewPreset = (selectedPreset, operation) => {
            this.setState(async (prevState) => {
                let tempPreset, numOfPresets = Object.keys(presets).length;
                if (operation === 'add') {
                    tempPreset = selectedPreset;
                } else {
                    tempPreset = JSON.parse(JSON.stringify(prevState.presets[selectedPreset]));
                }

                const newPresetName = `preset${numOfPresets + 1}`;
                prevState.presets[newPresetName] = tempPreset;
                prevState.presets[newPresetName].key = newPresetName;

                if (operation === 'duplicate') {
                    prevState.presets[newPresetName].name = `Copy of ${tempPreset.name}`;
                } else {
                    prevState.presets[newPresetName].name = `Preset #${numOfPresets + 1}`;
                }

                if (operation === 'saveAs') {
                    await fetchFromApi().then(data => {
                        if (data.success) {
                            if (typeof data.settings.presets[selectedPreset] !== 'undefined') {
                                prevState.presets[selectedPreset] = data.settings.presets[selectedPreset];
                            }
                        }
                    });
                    return ({
                        presets: prevState.presets,
                        showPresetSettings: undefined
                    });
                }

                return ({
                    presets: prevState.presets
                });
            })

        }
        const renderPresets = () => {

            const AddNewButton = (message, hint, classes, action = undefined) => {
                return (
                    <Tooltip text={__(hint)}>
                        <div
                            className={classes}
                            onClick={action}
                            {...((typeof action !== 'undefined') && {
                                onClick: () => action()
                            }
                            )}
                        >
                            <div className="add-new">
                                <span className="icon">
                                    {icons.plus_circle}
                                </span>
                                <span className="title">{__(message)}</span>
                            </div>
                        </div>
                    </Tooltip >
                );
            };

            const deletePreset = (selectedPreset) => {
                this.setState(prevState => {
                    delete prevState.presets[selectedPreset];
                    return ({
                        presets: prevState.presets,
                        // ...((selectedPreset === activePreset) && { activePreset: undefined})
                    })
                });
            }

            const renameTitle = (newTitle = '', presetKey) => {
                this.setState(prevState => {
                    prevState.presets[presetKey].name = newTitle;
                    return ({
                        presets: prevState.presets,
                    });
                });
            }

            return (
                <div className="qubely-global-settings" >
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
                            const changePreset = (index) => {
                                this.setState({
                                    showTypoSettings: undefined,
                                    activePreset: isActivePreset ? undefined : index
                                });
                            }
                            if (showPresetSettings === index) {
                                showDetailedSettings = true;
                            }

                            const classes = classnames(
                                'preset',
                                { ['active']: isActivePreset },
                                { ['detailed']: showDetailedSettings },
                                { ['renaming']: enableRenaming === presetKey }
                            )

                            return (
                                <div key={presetKey} className={classes}>
                                    <div className="title-wrapper">
                                        <div
                                            className="title"
                                            {...((!showDetailedSettings && !(enableRenaming === presetKey)) && {
                                                onClick: () => this.setState(state => ({
                                                    showPresetSettings: showDetailedSettings ? undefined : index
                                                }))
                                            })}

                                        >
                                            {
                                                showDetailedSettings ?
                                                    <span
                                                        className="radio-button fas fa-angle-left"
                                                        onClick={() => this.setState(state => ({
                                                            showPresetSettings: showDetailedSettings ? undefined : index
                                                        }))} />
                                                    :
                                                    <span className="radio-button">{isActivePreset ? icons.circleDot : icons.circleThin}</span>
                                            }
                                            {
                                                (enableRenaming === presetKey) ?
                                                    <RichText
                                                        ref={this.ref}
                                                        value={name}
                                                        keepPlaceholderOnFocus
                                                        className={'rename-preset'}
                                                        placeholder={__('Add preset name')}
                                                        onChange={newValue => renameTitle(newValue, presetKey)}
                                                    />
                                                    :
                                                    <span className="name"> {name}</span>
                                            }
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
                                            renderContent={({ onToggle }) => {
                                                let activeClass = classnames(
                                                    { ['active']: isActivePreset }
                                                )
                                                return (
                                                    <div className="global-preset-options">
                                                        {
                                                            showDetailedSettings ?
                                                                <div onClick={() => { addNewPreset(presetKey, 'saveAs'), onToggle() }}>Save as New</div>
                                                                :
                                                                <Fragment>
                                                                    <div className={activeClass} {...(!isActivePreset && { onClick: () => { changePreset(key); onToggle() } })} >Activate</div>
                                                                    <div
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                enableRenaming: presetKey
                                                                            });
                                                                            onToggle();
                                                                        }}
                                                                    >
                                                                        Rename
                                                                    </div>
                                                                    <div onClick={() => { addNewPreset(presetKey, 'duplicate'); onToggle() }}>Duplicate</div>
                                                                </Fragment>
                                                        }
                                                        {
                                                            index > 1 && <div onClick={() => deletePreset(presetKey)}>Delete</div>
                                                        }
                                                    </div>
                                                )
                                            }}
                                        />


                                    </div>

                                    {
                                        showDetailedSettings &&
                                        <Fragment>

                                            <PanelBody title={__('Global Colors')} initialOpen={true}>
                                                <div className="qubely-global-color-pallete">
                                                    {
                                                        colors.map((value, index) => (
                                                            <Color
                                                                value={value}
                                                                className={index < 5 ? 'primary-color' : 'added-color'}
                                                                deleteOption={index < 5 ? false : true}
                                                                onDelete={() => deleteColor(index, presetKey)}
                                                                onChange={newValue => changeColor(index, newValue, presetKey)}
                                                            />
                                                        ))
                                                    }
                                                    <Color
                                                        addNewColor
                                                        value={undefined}
                                                        addNew={() => addNewColor(presetKey)}
                                                        onChange={newValue => changeColor(presets[presetKey].colors.length - 1, newValue, presetKey)}
                                                    />
                                                </div>
                                            </PanelBody>
                                            {
                                                (typeof typography !== 'undefined' && typography.length > 0) &&
                                                <PanelBody title={__('Typography')} initialOpen={true}>
                                                    {
                                                        typography.map(({ name, value, scope = 'h', removable = false }, index) => {

                                                            let displaySettings = false;
                                                            if (showTypoSettings === index) {
                                                                displaySettings = true;
                                                            }
                                                            let Tag = `h${index + 1}`;
                                                            if (scope === 'p') {
                                                                Tag = 'p'
                                                            } else if (scope === 'button') {
                                                                Tag = 'button'
                                                            }
                                                            let wrapperClasses = classnames(
                                                                'qubely-global',
                                                                'typography',
                                                                { ['removable']: removable }
                                                            )
                                                            let titleClasses = classnames(
                                                                'typo-name',
                                                                `tag-${Tag}`,
                                                                { ['active']: displaySettings }
                                                            )
                                                            return (
                                                                <div className={wrapperClasses}>
                                                                    <div
                                                                        className={titleClasses}
                                                                        onClick={() => this.setState({ showTypoSettings: displaySettings ? undefined : index })}
                                                                    >
                                                                        <Tag > {name}</Tag>

                                                                        {
                                                                            removable &&
                                                                            <Tooltip text={__('Delete')}>
                                                                                <span className="delete-typo" onClick={() => updateTypography(false, presetKey, index, 'delete')} >{icons.delete}</span>
                                                                            </Tooltip>
                                                                        }
                                                                    </div>

                                                                    {displaySettings &&
                                                                        <Typography
                                                                            value={value}
                                                                            globalSettings
                                                                            key={name + index}
                                                                            onChange={newValue => updateTypography(false, presetKey, index, newValue)}
                                                                        />
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        typography.length < 13 &&
                                                        <Dropdown
                                                            position="bottom center"
                                                            className="typo-options"
                                                            contentClassName="typo-popover"
                                                            renderToggle={({ isOpen, onToggle }) => (
                                                                <div onClick={onToggle}>
                                                                    {AddNewButton('Add new typography', 'Add Typography', "add-new-wrapper add-new-typo")}
                                                                </div>

                                                            )}
                                                            renderContent={({ onToggle }) => {
                                                                return (
                                                                    <div className="new-typo-options">
                                                                        <div className="scope">Scope</div>
                                                                        <ButtonGroup
                                                                            label={__('')}
                                                                            options={
                                                                                [
                                                                                    [__('Paragraph'), 'p'],
                                                                                    [__('Button'), 'button'],
                                                                                    [__('Others'), 'others']
                                                                                ]
                                                                            }
                                                                            value={newTypoScope}
                                                                            onChange={value => this.setState({ newTypoScope: value })}
                                                                        />
                                                                        <TextControl
                                                                            className="new-typo-title"
                                                                            autoComplete="off"
                                                                            label={__('Title')}
                                                                            value={newTypoTitle}
                                                                            placeholder={__('add title')}
                                                                            onChange={value => this.setState({ newTypoTitle: value })}
                                                                        />
                                                                        <div className="actions">
                                                                            <div>
                                                                                <div className="action cancel" onClick={() => onToggle()} >Cancel</div>
                                                                                <div className={'action apply'} onClick={() => { onToggle(); updateTypography(true, presetKey); }}>Add</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                    }
                                                </PanelBody>
                                            }
                                        </Fragment>
                                    }
                                </div>
                            )
                        })
                    }
                    {AddNewButton('Add new preset', 'Add Preset', "add-new-wrapper", () => addNewPreset(ADDNEWDEFAULT, 'add'))}
                </div >
            )
        }

        const {
            isSavingPost,
            isPreviewingPost,
            isPublishingPost,
            isAutosavingPost,
        } = select('core/editor');

        if ((isSavingPost() || isPreviewingPost() || isPublishingPost()) && !isAutosavingPost()) {
            this.updateGlobalSettings();
        }
        console.log('this.state : ', this.state);
        return (
            <Fragment>
                <PluginSidebar
                    icon={icons.qubely}
                    name="global-settings-sidebar"
                    title={__('Global Settings')}
                >
                    {renderPresets()}
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
