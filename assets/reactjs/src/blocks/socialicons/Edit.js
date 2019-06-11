const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.editor
const { Component, Fragment } = wp.element;
const { PanelBody, TextControl, Toolbar, Button } = wp.components;
import { Styles, IconSelector, Toggle, Separator, RadioAdvanced, Range, Wrapper, Alignment, Typography, Color, Tabs, Tab, Border, Padding, BorderRadius } from '../../components/FieldRender'
import { CssGenerator } from '../../components/CssGenerator';
import InlineToolbar from '../../components/fields/inline/InlineToolbar'
import '../../components/GlobalSettings';
import icons from '../../helpers/icons';
import IconSocialData from '../../components/fields/assets/IconSocialData'
class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            spacer: true,
            device: 'md',
            selectedItem: -1
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

    setSettings(type, val) {
        const { selectedItem } = this.state;
        const { attributes, setAttributes } = this.props;
        let socialIcons = [...attributes.socialIcons];
        socialIcons[selectedItem] ? socialIcons[selectedItem][type] = val : ''
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
        const { selectedItem, device } = this.state;
        const { attributes, setAttributes, isSelected } = this.props;
        const { uniqueId, alignment, socialIcons, iconLabel, layout, useDefaultStyle, iconSize, iconSizeCustom, iconSpacing, iconBorderRadius, labelSpacing, labelTypography, iconColor, iconColorHover, IconBackground, IconBackgroundHover, iconPaddingX, iconPaddingY, iconPadding, iconBorder, iconBorderColor, iconBorderColorHover } = attributes;
        if (uniqueId) { CssGenerator(this.props.attributes, 'socialicons', uniqueId); };

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

                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state} />
                    </Toolbar>
                </BlockControls>

                <div className={`qubely-block-${uniqueId}`}>
                    <div className={`qubely-block-social-icons qubely-layout-${layout} qubely-style-${useDefaultStyle ? 'default' : 'custom'}`}>
                        <ul className="qubely-ul" ref="avoidOnClick" >
                            {socialIcons.map((item, index) =>
                                <li key={index} className={`qubely-li qubely-social-item qubely-social-${item.id}`} arealabel={item.label} >

                                    <a
                                        onClick={(e) => {
                                            e.preventDefault()
                                            this.setState({ selectedItem: (selectedItem == index) ? -1 : index })
                                        }}
                                    >
                                        <i className={'qubely-social-icon ' + item.icon} />
                                        {(iconLabel && item.label) ? <span className="qubely-social-label" contenteditable="true" onBlur={(e) => this.setSettings('label', e.target.innerHTML)}>{item.label}</span> : ''}
                                    </a>

                                    {(selectedItem == index && isSelected) &&
                                        <Wrapper inline
                                            domNodetobeAvoided={this.refs.avoidOnClick}
                                            onClickOutside={() => {
                                                this.setState({
                                                    selectedItem: (selectedItem == index) ? -1 : index,
                                                })
                                            }}
                                        >
                                            <IconSelector
                                                value={socialIcons[selectedItem].icon.value}
                                                icons={IconSocialData}
                                                enableSearch
                                                onChange={val => {
                                                    this.setSettings('icon', val.value)
                                                    this.setSettings('label', val.name)
                                                    this.setSettings('id', val.id)
                                                }}
                                            />
                                            <TextControl
                                                label={__('URL')}
                                                value={socialIcons[selectedItem].url}
                                                onChange={val => this.setSettings('url', val)}
                                                placeholder={__('URL')}

                                            />
                                            {iconLabel &&
                                                <TextControl
                                                    label={__('Label')}
                                                    value={socialIcons[selectedItem].label}
                                                    onChange={val => this.setSettings('label', val)}
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
                                        </Wrapper>
                                    }
                                </li>
                            )}
                            <span onClick={() => this.insertItem()} className="qubely-social-icon-insert" role="button" arealabel={__('Add new icon')}>
                                <i className="qubely-social-icon fas fa-plus" />
                            </span>
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Edit;