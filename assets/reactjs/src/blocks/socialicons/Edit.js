const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment } = wp.element;
const { PanelBody, TextControl, Toolbar, Button, Popover } = wp.components;
const {
    Styles,
    IconSelector,
    Toggle,
    Separator,
    RadioAdvanced,
    Range,
    Alignment,
    Typography,
    Color,
    Tabs,
    Tab,
    Border,
    Padding,
    BorderRadius,
    Inline: { InlineToolbar },
    CssGenerator: { CssGenerator },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    gloalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    withCSSGenerator
} = wp.qubelyComponents

import icons from '../../helpers/icons'
import IconSocialData from '../../components/fields/assets/IconSocialData'
class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            spacer: true,
            device: 'md',
            selectedLabel: -1,
            selectedItem: -1,
            showIconPicker: false
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

    setSettings(index, type, val) {
        const { attributes, setAttributes } = this.props
        let socialIcons = [...attributes.socialIcons]
        socialIcons[index] ? socialIcons[index][type] = val : ''
        setAttributes({ socialIcons })
    }

    insertItem() {
        const { attributes, setAttributes } = this.props;
        let socialIcons = [...attributes.socialIcons];
        const newItem = { icon: 'fab fa-facebook', label: 'Facebook', id: 'facebook', url: '' };
        socialIcons.push(newItem);
        this.setState({ selectedItem: socialIcons.length - 1 });
        setAttributes({ socialIcons });
    }

    removeItem() {
        const { selectedItem } = this.state;
        const { attributes, setAttributes } = this.props;
        let socialIcons = [...attributes.socialIcons];
        socialIcons.splice(selectedItem, 1);
        this.setState({ selectedItem: -1 });
        setAttributes({ socialIcons });
    }

    render() {
        const { selectedItem, selectedLabel, device, showIconPicker } = this.state;
        const { name, clientId, attributes, setAttributes, isSelected } = this.props;
        const {
            uniqueId,
            className,
            alignment,
            socialIcons,
            iconLabel,
            layout,
            useDefaultStyle,
            iconSize,
            iconSizeCustom,
            iconSpacing,
            iconBorderRadius,
            labelSpacing,
            labelTypography,
            iconColor,
            iconColorHover,
            IconBackground,
            IconBackgroundHover,
            iconPadding,
            iconBorder,
            iconBorderColorHover,

            //animation
            animation,
            //global
            enablePosition, 
            selectPosition, 
            positionXaxis, 
            positionYaxis,
            globalZindex,
            hideTablet,
            hideMobile,
            globalCss,
            interaction
        } = attributes;

        return (
            <Fragment>
                <InspectorControls key="inspector">

                    <PanelBody title={__('Styles')} initialOpen={true}>
                        <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 'fill', svg: icons.social_fill, label: __('Fill') },
                                { value: 'normal', svg: icons.social_normal, label: __('Normal') },
                            ]}
                        />
                        <Toggle label={__('Default Styles')} value={useDefaultStyle} onChange={val => setAttributes({ useDefaultStyle: val })} />
                        <Toggle label={__('Show Label')} value={iconLabel} onChange={val => setAttributes({ iconLabel: val })} />
                        <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    {!useDefaultStyle &&
                        <PanelBody title={__('Design')} initialOpen={false}>
                            <Tabs>
                                <Tab tabTitle={__('Normal')}>
                                    <Color label={__('Color')} value={iconColor} onChange={(value) => setAttributes({ iconColor: value })} />
                                    {layout == 'fill' &&
                                        <Fragment>
                                            <Color label={__('Background Color')} value={IconBackground} onChange={(value) => setAttributes({ IconBackground: value })} />
                                            <Border label={__('Border')} value={iconBorder} onChange={(value) => setAttributes({ iconBorder: value })} max={10} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        </Fragment>
                                    }
                                </Tab>
                                <Tab tabTitle={__('Hover')}>
                                    <Color label={__('Color')} value={iconColorHover} onChange={(value) => setAttributes({ iconColorHover: value })} />
                                    {layout == 'fill' &&
                                        <Fragment>
                                            <Color label={__('Background Color')} value={IconBackgroundHover} onChange={(value) => setAttributes({ IconBackgroundHover: value })} />
                                            <Color label={__('Border Color')} value={iconBorderColorHover} onChange={(value) => setAttributes({ iconBorderColorHover: value })} />
                                        </Fragment>
                                    }
                                </Tab>
                            </Tabs>
                        </PanelBody>
                    }

                    <PanelBody title={__('Icon')} initialOpen={false}>
                        <RadioAdvanced
                            label={__('Icon Size')}
                            options={[
                                { label: 'S', value: '16px', title: __('Small') },
                                { label: 'M', value: '22px', title: __('Medium') },
                                { label: 'L', value: '28px', title: __('Large') },
                                { icon: 'fas fa-cog', value: 'custom', title: __('Custom') }
                            ]}
                            value={iconSize}
                            onChange={(value) => setAttributes({ iconSize: value })} />

                        {iconSize == 'custom' &&
                            <Range
                                label={__('Custom Size')}
                                value={iconSizeCustom}
                                onChange={(value) => setAttributes({ iconSizeCustom: value })}
                                unit={['px', 'em', '%']}
                                max={100}
                                min={10}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })} />
                        }
                        {layout == 'fill' &&
                            <Fragment>
                                <Padding
                                    label={__('Padding')}
                                    value={iconPadding}
                                    onChange={(value) => setAttributes({ iconPadding: value })}
                                    unit={['px', 'em', '%']}
                                    max={150}
                                    min={0}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                                <Separator />

                                <BorderRadius
                                    label={__('Radius')}
                                    value={iconBorderRadius}
                                    onChange={(value) => setAttributes({ iconBorderRadius: value })}
                                    min={0}
                                    max={100} unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                            </Fragment>
                        }
                        <Separator />
                        <Range
                            label={__('Spacing')}
                            value={iconSpacing}
                            onChange={(value) => setAttributes({ iconSpacing: value })}
                            unit={['px', 'em', '%']}
                            max={50}
                            min={0}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />

                    </PanelBody>

                    {iconLabel &&
                        <PanelBody title={__('Label')} initialOpen={false}>
                            <Range
                                label={__('Spacing')}
                                value={labelSpacing}
                                onChange={(value) => setAttributes({ labelSpacing: value })}
                                unit={['px', 'em', '%']}
                                max={30}
                                min={0}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })} />
                            <Typography
                                label={__('Typography')}
                                value={labelTypography}
                                onChange={(value) => setAttributes({ labelTypography: value })}
                                disableLineHeight
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })} />
                        </PanelBody>
                    }
                    
                    {animationSettings(uniqueId, animation, setAttributes)}

                    {interactionSettings(uniqueId, interaction, setAttributes)}
                    
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state} />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}
                        className={`qubely-block-social-icons qubely-layout-${layout} qubely-style-${useDefaultStyle ? 'default' : 'custom'}`} >

                        <ul className="qubely-ul" >
                            {socialIcons.map((item, index) =>
                                <li key={index} className={`qubely-li qubely-social-item qubely-social-${item.id}`} arealabel={item.label} >

                                    <a
                                        onClick={(e) => {
                                            e.preventDefault()
                                            this.setState({
                                                selectedLabel: index,
                                                selectedItem: showIconPicker ? (selectedItem == index) ? -1 : index : index,
                                                showIconPicker: !showIconPicker
                                            })
                                        }}
                                    >
                                        <i className={'qubely-social-icon ' + item.icon} />
                                        {(iconLabel && item.label) && <div className="qubely-social-label" contenteditable="true" onBlur={(e) => this.setSettings(selectedLabel, 'label', e.target.innerHTML)}>{item.label}</div>}
                                    </a>

                                    {(showIconPicker && selectedItem == index && isSelected) &&
                                        <Fragment>
                                            <Popover
                                                position="bottom center"
                                                className="qubely-socialicon-picker-popover"
                                            >
                                                <div className="qubely-socialicon-picker">

                                                    <IconSelector
                                                        value={socialIcons[selectedItem].icon.value}
                                                        icons={IconSocialData}
                                                        enableSearch
                                                        onChange={val => {
                                                            this.setSettings(selectedItem, 'icon', val.value)
                                                            this.setSettings(selectedItem, 'label', val.name)
                                                            this.setSettings(selectedItem, 'id', val.id)
                                                        }}
                                                    />
                                                    <TextControl
                                                        label={__('URL')}
                                                        value={socialIcons[selectedItem].url}
                                                        onChange={val => this.setSettings(selectedItem, 'url', val)}
                                                        placeholder={__('URL')}

                                                    />
                                                    {iconLabel &&
                                                        <TextControl
                                                            label={__('Label')}
                                                            value={socialIcons[selectedItem].label}
                                                            onChange={val => this.setSettings(selectedItem, 'label', val)}
                                                            placeholder={__('Enter icon label')}
                                                        />
                                                    }
                                                    <Button
                                                        isDefault
                                                        isLarge
                                                        isPrimary
                                                        className="qubely-action-social-icon-apply"
                                                        onClick={(e) => this.setState({ selectedItem: -1 })} >
                                                        {__('Apply')}
                                                    </Button>
                                                    <Button
                                                        isDefault
                                                        isLarge
                                                        className="qubely-action-social-icon-remove"
                                                        onClick={(e) => this.removeItem()} >
                                                        {__('Remove')}
                                                    </Button>
                                                </div>
                                            </Popover>
                                        </Fragment>
                                    }
                                </li>
                            )}
                            <span onClick={() => this.insertItem()} className="qubely-social-icon-insert" role="button" arealabel={__('Add new icon')}>
                                <i className="qubely-social-icon fas fa-plus" />
                            </span>
                        </ul>

                        <div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
                            <ContextMenu
                                name={name}
                                clientId={clientId}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                qubelyContextMenu={this.refs.qubelyContextMenu}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withCSSGenerator()(Edit);