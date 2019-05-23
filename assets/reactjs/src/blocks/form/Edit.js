const { __ } = wp.i18n;
const { InspectorControls, BlockControls, RichText } = wp.editor
const { Component, Fragment } = wp.element;
const { PanelBody, TextControl, TextareaControl, SelectControl, Toolbar, IconButton } = wp.components;
import { Styles, Wrapper, Range, Toggle, Typography, Color, Tabs, Tab, Border, RadioAdvanced, QubelyButtonEdit } from '../../components/FieldRender'
import { CssGenerator } from '../../components/CssGenerator';
import InlineToolbar from '../../components/fields/inline/InlineToolbar';
import '../../components/ButtonComponent';
import '../../components/GlobalSettings';
import icons from '../../helpers/icons';


class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            spacer: true,
            selectedItem: -1,
            dropdownOpen: -1,
            newItemType: 'text'
        }
        this.removeItem = this.removeItem.bind(this);
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

    setSettings(type, val, index = -1) {
        const selectedItem = (index !== -1) ? index : this.state.selectedItem;
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        formItems[selectedItem][type] = val;
        setAttributes({ formItems });
    }

    setOptionSettings(selectedItem, index, val) {
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        formItems[selectedItem].options[index] = val;
        setAttributes({ formItems });
    }

    insertItem() {
        const { newItemType } = this.state;
        const { attributes, setAttributes } = this.props;
        const formItems = [...attributes.formItems];
        const newItem = { type: newItemType, label: 'Label', placeholder: '', width: { md: 100 }, required: true, hideLabel: false };
        if (newItemType == 'radio' || newItemType == 'checkbox' || newItemType == 'dropdown') {
            newItem.options = ['Option 1', 'Option 2'];
        }
        formItems.push(newItem);
        this.setState({ newItemWrapper: false });
        setAttributes({ formItems });
    }

    insertOption(index) {
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        let activeItem = formItems[index];
        activeItem.options.push(`Option ${activeItem.options.length + 1}`);
        formItems[index] = activeItem;
        setAttributes({ formItems });
    }

    moveItem(index, moveTo) {
        const { attributes, setAttributes } = this.props;
        const formItems = [...attributes.formItems];
        const moveIndex = (moveTo == 'left') ? index - 1 : index + 1;
        const movableItem = formItems[index];
        formItems[index] = formItems[moveIndex];
        formItems[moveIndex] = movableItem;
        this.setState({ selectedItem: moveIndex });
        setAttributes({ formItems });
    }

    cloneItem(index) {
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        let clonedItem = JSON.parse(JSON.stringify(formItems[index]));
        formItems.splice(index + 1, 0, clonedItem);
        setAttributes({ formItems });
    }

    removeItem(index) {
        const { selectedItem } = this.state;
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        formItems.splice(index, 1);
        setAttributes({ formItems });
        if (selectedItem == index);
        this.setState({ selectedItem: -1 });
    }

    removeOption(item, option) {
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        formItems[item].options.splice(option, 1);
        setAttributes({ formItems });
    }

    render() {
        const { selectedItem, dropdownOpen, device } = this.state;
        const { attributes, setAttributes } = this.props;
        const { uniqueId, formItems, labelTypography, labelColor, labelColorFocus, inputTypography, inputColor, inputColorFocus, inputColorHover, inputBg, inputBgFocus, inputBgHover, inputBorder, inputBorderMaterial, inputBorderColorFocus, inputBorderColorHover, inputCorner, inputCornerRadius, inputSize, inputPaddingX, inputPaddingY, textareaHeight, placeholderColor, placeholderColorFocus, placeholderColorHover, enableButton, buttonTag, buttonSize, buttonFillType, buttonText, buttonIconName, buttonIconPosition, spacing, gutter, fieldErrorMessage, formSuccessMessage, formErrorMessage, reCaptcha, reCaptchaSiteKey, reCaptchaSecretKey, policyCheckbox, policyCheckboxText, emailReceiver, emailHeaders, emailFrom, emailSubject, emailBody, layout } = attributes;
        if (uniqueId) { CssGenerator(this.props.attributes, 'form', uniqueId); }

        return (
            <Fragment>
                <InspectorControls key="inspector">

                    <PanelBody title={__('')} initialOpen={true}>
                        <Styles
                            value={layout}
                            onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 'classic', img: icons.form_classic, label: __('Classic') },
                                { value: 'material', img: icons.form_material, label: __('Material') },
                            ]}
                        />
                    </PanelBody>

                    {selectedItem >= 0 &&
                        <PanelBody title={(formItems[selectedItem].label) ? formItems[selectedItem].label : __('Input Settings')}>

                            <TextControl
                                label={__('Label')}
                                value={formItems[selectedItem].label}
                                onChange={val => this.setSettings('label', val)}
                                placeholder={__('Enter Label')}
                            />

                            <TextControl
                                label={__('Name')}
                                value={formItems[selectedItem].name}
                                onChange={val => this.setSettings('name', val)}
                                placeholder={__('Enter Name')}
                                help={__('You must write field name with hyphen(-) with lowercase. No space, UPPERCASE, Capitalize is not allowed. This name should match with Form template value. Never keep empty this name.')}
                            />

                            {(formItems[selectedItem].type == 'checkbox' || formItems[selectedItem].type == 'radio') ? '' :
                                <TextControl
                                    label={__('Placeholder')}
                                    value={formItems[selectedItem].placeholder}
                                    onChange={val => this.setSettings('placeholder', val)}
                                    placeholder={__('Enter Placeholder')}
                                />
                            }
                            <Range
                                label={__('Width')}
                                value={formItems[selectedItem].width}
                                onChange={(val) => this.setSettings('width', val)}
                                max={100}
                                min={33}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />
                            <Toggle
                                label={__('Required')}
                                value={formItems[selectedItem].required}
                                onChange={val => this.setSettings('required', val)}
                            />
                            {layout == 'classic' &&
                                <Toggle
                                    label={__('Hide Label')}
                                    value={formItems[selectedItem].hideLabel}
                                    onChange={val => this.setSettings('hideLabel', val)}
                                />
                            }
                        </PanelBody>
                    }

                    <PanelBody title={__('Label')} initialOpen={false}>
                        <Typography
                            value={labelTypography}
                            onChange={val => setAttributes({ labelTypography: val })}
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Color
                            label={__('Color')}
                            value={labelColor}
                            onChange={val => setAttributes({ labelColor: val })}
                        />
                        {layout == 'material' &&
                            <Color
                                label={__('Focus Color')}
                                value={labelColorFocus}
                                onChange={val => setAttributes({ labelColorFocus: val })}
                            />
                        }
                    </PanelBody>

                    <PanelBody title={__('Input')} initialOpen={false}>
                        <Wrapper label={__('Size')}>
                            <RadioAdvanced
                                label={__('Input Size')}
                                options={[
                                    { label: 'S', value: 'small', title: 'Small' },
                                    { label: 'M', value: 'medium', title: 'Medium' },
                                    { label: 'L', value: 'large', title: 'Large' },
                                    { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                                ]}
                                value={inputSize}
                                onChange={(value) => setAttributes({ inputSize: value })} />
                            {inputSize == 'custom' &&
                                <Fragment>
                                    <Range
                                        label={<span className="dashicons dashicons-sort" title="Padding Y" />}
                                        value={inputPaddingY}
                                        onChange={(value) => setAttributes({ inputPaddingY: value })}
                                        unit={['px', 'em', '%']}
                                        min={0}
                                        max={50}
                                        responsive
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />

                                    {layout == 'classic' &&
                                        <Range
                                            label={<span className="dashicons dashicons-leftright" title="X Padding" />}
                                            value={inputPaddingX}
                                            onChange={(value) => setAttributes({ inputPaddingX: value })}
                                            unit={['px', 'em', '%']}
                                            min={0}
                                            max={50}
                                            responsive
                                            device={device}
                                            onDeviceChange={value => this.setState({ device: value })}
                                        />
                                    }

                                </Fragment>
                            }
                            <Range
                                label={__('Textarea Height')}
                                value={textareaHeight}
                                onChange={(value) => setAttributes({ textareaHeight: value })}
                                unit={['px', 'em', '%']}
                                min={100}
                                max={500}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />

                            <Range
                                label={__('Spacing')}
                                value={spacing}
                                onChange={(value) => setAttributes({ spacing: value })}
                                unit={['px', 'em', '%']}
                                min={0}
                                max={60}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />
                            <Range
                                label={__('Gutter')}
                                value={gutter}
                                onChange={(value) => setAttributes({ gutter: value })}
                                unit={['px', 'em', '%']}
                                min={0}
                                max={60}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />
                        </Wrapper>
                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <Color label={__('Color')} value={inputColor} onChange={val => setAttributes({ inputColor: val })} />
                                <Color label={__('Background Color')} value={inputBg} onChange={val => setAttributes({ inputBg: val })} />
                                {layout == 'classic' &&
                                    <Border label={__('Border')} value={inputBorder} onChange={val => setAttributes({ inputBorder: val })} min={0} max={10} />
                                }
                                {layout == 'material' &&
                                    <Border label={__('Border')} value={inputBorderMaterial} onChange={val => setAttributes({ inputBorderMaterial: val })} min={0} max={10} />
                                }
                                <Color label={__('Placeholder Color')} value={placeholderColor} onChange={val => setAttributes({ placeholderColor: val })} />
                            </Tab>
                            <Tab tabTitle={__('Focus')}>
                                <Color label={__('Color')} value={inputColorFocus} onChange={val => setAttributes({ inputColorFocus: val })} />
                                <Color label={__('Background Color')} value={inputBgFocus} onChange={val => setAttributes({ inputBgFocus: val })} />
                                <Color label={__('Border Color')} value={inputBorderColorFocus} onChange={(value) => setAttributes({ inputBorderColorFocus: value })} />
                                <Color label={__('Placeholder Color')} value={placeholderColorFocus} onChange={val => setAttributes({ placeholderColorFocus: val })} />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <Color label={__('Color')} value={inputColorHover} onChange={val => setAttributes({ inputColorHover: val })} />
                                <Color label={__('Background Color')} value={inputBgHover} onChange={val => setAttributes({ inputBgHover: val })} />
                                <Color label={__('Border Color')} value={inputBorderColorHover} onChange={(value) => setAttributes({ inputBorderColorHover: value })} />
                                <Color label={__('Placeholder Color')} value={placeholderColorHover} onChange={val => setAttributes({ placeholderColorHover: val })} />
                            </Tab>
                        </Tabs>

                        <Range
                            label={__('Corner Radius')}
                            value={inputCornerRadius}
                            onChange={(value) => setAttributes({ inputCornerRadius: value })}
                            min={0}
                            max={100} unit={['px', 'em', '%']}
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        
                        <Typography value={inputTypography} onChange={val => setAttributes({ inputTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Settings')} initialOpen={false}>

                        <Tabs>
                            <Tab tabTitle={__('Form')}>
                                <TextControl
                                    label={__('Required Field Error Message')}
                                    value={fieldErrorMessage}
                                    onChange={val => setAttributes({ fieldErrorMessage: val })}
                                />
                                <TextareaControl
                                    label={__('Form Submit Success Message')}
                                    value={formSuccessMessage}
                                    onChange={val => setAttributes({ formSuccessMessage: val })}
                                    help={__('Set your desired message after successful form submission. Leave blank for default.')}
                                />
                                <TextareaControl
                                    label={__('Form Submit Failed Message')}
                                    value={formErrorMessage}
                                    onChange={val => setAttributes({ formErrorMessage: val })}
                                    help={__('Set your desired message for form submission error. Leave blank for default.')}
                                />
                                <Toggle label={__('Enable Captcha')} value={reCaptcha} onChange={val => setAttributes({ reCaptcha: val })} />
                                {reCaptcha &&
                                    <div>
                                        <TextControl
                                            label={__('Site Key ')}
                                            value={reCaptchaSiteKey}
                                            onChange={val => setAttributes({ reCaptchaSiteKey: val })}
                                            placeholder={__('Enter Google Site Key')}
                                        />
                                        <TextControl
                                            label={__('Secret Key ')}
                                            value={reCaptchaSecretKey}
                                            onChange={val => setAttributes({ reCaptchaSecretKey: val })}
                                            placeholder={__('Enter Google Secret Key')}
                                        />
                                    </div>
                                }
                                <Toggle label={__('Enable Policy Checkbox')} value={policyCheckbox} onChange={val => setAttributes({ policyCheckbox: val })} />

                            </Tab>
                            <Tab tabTitle={__('Email')}>
                                <TextControl
                                    label={__('Recipient Email')}
                                    value={emailReceiver}
                                    onChange={val => setAttributes({ emailReceiver: val })}
                                    placeholder={__('Enter Recipient Email')}
                                    help={__('Enter the recipient email address. This field is mandatory. Without a recipient email, contact form will not work.')}
                                />
                                <TextareaControl
                                    label={__('Email Headers')}
                                    value={emailHeaders}
                                    onChange={val => setAttributes({ emailHeaders: val })}
                                />
                                <TextControl
                                    label={__('From Email')}
                                    value={emailFrom}
                                    onChange={val => setAttributes({ emailFrom: val })}
                                    placeholder={__('Your Name: admin@example.com')}
                                />
                                <TextControl
                                    label={__('Subject')}
                                    value={emailSubject}
                                    onChange={val => setAttributes({ emailSubject: val })}
                                    placeholder={__('Enter Subject')}
                                />
                                <TextareaControl
                                    label={__('Email Body')}
                                    value={emailBody}
                                    onChange={val => setAttributes({ emailBody: val })}
                                    help={__("Set your form email body here. In editor don't add any CSS style or others option just add your form field name between double curly braces {{field-name}} as you set in 'Field Name'.")}
                                />
                            </Tab>
                        </Tabs>
                    </PanelBody>
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                <div className={`qubely-block-${uniqueId}`}>
                    <div className={`qubely-block-form qubely-layout-${layout}`}>
                        <form className="qubely-form">
                            {formItems.map((item, index) =>
                                <div key={index} className={`qubely-form-group qubely-form-group-index-${index} ${selectedItem == index ? 'qubely-form-group-active' : ''}`} style={{ width: `${item.width.md}%` }} onClick={() => this.setState({ selectedItem: index })}>
                                    <div className="qubely-form-group-inner">

                                        {!item.hideLabel && layout == 'classic' &&
                                            <label className="qubely-form-label">
                                                <span contenteditable="true" onBlur={(e) => this.setSettings('label', e.target.innerText, index)}>
                                                    {__(item.label)} </span> {item.required && '*'}
                                            </label>
                                        }

                                        {/* Text and Email */}
                                        {(item.type == 'text' || item.type == 'email') &&
                                            <input className={`qubely-form-control is-${inputSize}`} type={item.type} placeholder={__(item.placeholder)} required={item.required} disabled />
                                        }

                                        {/* Radio and Checkbox */}
                                        {(item.type == 'radio' || item.type == 'checkbox') &&
                                            <div>
                                                {item.options && item.options.map((option, i) =>
                                                    <div className="qubely-radio-control">
                                                        <input type={item.type} name={`option${index}`} value={option} />
                                                        <label contenteditable="true" onBlur={(e) => this.setOptionSettings(index, i, e.target.innerText)}> {option} </label>
                                                        <span className="qubely-form-option-remove" onClick={(e) => { this.removeOption(index, i) }} >
                                                            <i className="fa fa-times" />
                                                        </span>
                                                    </div>
                                                )}
                                                {(selectedItem >= 0) && (selectedItem == index) &&
                                                    <span onClick={() => this.insertOption(index)}><i className="fa fa-plus" /></span>
                                                }
                                            </div>
                                        }

                                        {/* Textarea */}
                                        {item.type == 'textarea' &&
                                            <textarea className="qubely-form-control" placeholder={__(item.placeholder)} required={item.required} disabled></textarea>
                                        }

                                        {/* Dropdown */}
                                        {item.type == 'dropdown' &&
                                            <div class="qubely-dropdown-control">
                                                <input type="text" onClick={(e) => { e.stopPropagation(); this.setState({ dropdownOpen: (dropdownOpen == index) ? -1 : index }) }} />
                                                {(dropdownOpen == index) &&
                                                    <ul class="qubely-dropdown-content">
                                                        {item.options && item.options.map((option, i) =>
                                                            <li>
                                                                <span contenteditable="true" onBlur={(e) => this.setOptionSettings(index, i, e.target.innerText)}>{option}</span>
                                                                <i className="fa fa-times" onClick={(e) => { this.removeOption(index, i) }} />
                                                            </li>
                                                        )}
                                                        <span onClick={() => this.insertOption(index)}><i className="fa fa-plus" /></span>
                                                    </ul>
                                                }
                                            </div>
                                        }

                                        {layout == 'material' &&
                                            <label className="qubely-form-label">
                                                <span contenteditable="true" onBlur={(e) => this.setSettings('label', e.target.innerText, index)}>
                                                    {__(item.label)} </span> {item.required && '*'}
                                            </label>
                                        }
                                    </div>
                                    <div className="qubely-form-group-option">
                                        <span onClick={(e) => { e.stopPropagation(); this.moveItem(index, 'left'); }} className={(index == 0) && 'qubely-option-disable'}><i class="fa fa-long-arrow-alt-up" /></span>
                                        <span onClick={(e) => { e.stopPropagation(); this.moveItem(index, 'right'); }} className={(index == formItems.length - 1) && 'qubely-option-disable'}><i class="fa fa-long-arrow-alt-down" /></span>
                                        <span onClick={(e) => { e.stopPropagation(); this.cloneItem(index); }}><i class="fa fa-copy" /></span>
                                        <span onClick={(e) => { e.stopPropagation(); this.removeItem(index); }}><i class="fa fa-times-circle" /></span>
                                    </div>
                                </div>
                            )}
                            {policyCheckbox &&
                                <div className="qubely-form-group" style={{ width: '100%' }}>
                                    <input className="" type="checkbox" name="policy" id="qubely-form-policy-checkbox" value="Yes" />
                                    <RichText
                                        tagName="label"
                                        className=""
                                        value={policyCheckboxText}
                                        onChange={val => setAttributes({ policyCheckboxText: val })}
                                    />
                                </div>
                            }
                        </form>

                        <div className="qubely-form-group" style={{ width: '100%' }}>
                            <QubelyButtonEdit
                                enableButton={enableButton}
                                buttonFillType={buttonFillType}
                                buttonSize={buttonSize}
                                buttonText={buttonText}
                                buttonIconName={buttonIconName}
                                buttonIconPosition={buttonIconPosition}
                                buttonTag={buttonTag}
                                onTextChange={value => setAttributes({ buttonText: value })}
                            />
                        </div>
                        <div className="qubely-accordion-add-item">
                            <SelectControl
                                label=""
                                value={this.state.newItemType}
                                options={[
                                    { label: 'Text', value: 'text' },
                                    { label: 'Email', value: 'email' },
                                    { label: 'Radio', value: 'radio' },
                                    { label: 'Checkbox', value: 'checkbox' },
                                    { label: 'Textarea', value: 'textarea' },
                                    { label: 'Dropdown', value: 'dropdown' },
                                ]}
                                onChange={(val) => this.setState({ newItemType: val })}
                            />
                            <IconButton
                                icon={'insert'}
                                onClick={() => this.insertItem()} >
                                {__('Add New Item')}
                            </IconButton>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Edit;