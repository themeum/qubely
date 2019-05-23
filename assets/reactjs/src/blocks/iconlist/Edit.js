const { __ } = wp.i18n;
const { InspectorControls } = wp.editor
const { Component, Fragment } = wp.element;
const { PanelBody, Tooltip } = wp.components;
import { Typography, Alignment, Wrapper, Padding, Styles, Range, Tabs, Tab, IconList, Color, RadioAdvanced, Border, BorderRadius, BoxShadow, Separator } from '../../components/FieldRender'
import { CssGenerator } from '../../components/CssGenerator'
import icons from '../../helpers/icons'
class Edit extends Component {
    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.state = {
            device: 'md',
            currentListItemIndex: 0,
            openIconPopUp: false,
            removeItemViaBackSpace: 999,
            focusedItem: this.props.attributes.listItems.length - 1
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
        this.placeCaretAtEnd(document.querySelector(`.qubely-block-${uniqueId} .qubely-list-item-text-${this.state.focusedItem}`))
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.attributes.listItems.length > prevProps.attributes.listItems.length) {
            let focusedListItem = document.getElementById(`qubely-list-item-text-${this.state.focusedItem}`)
            focusedListItem.focus();
        } else if (this.props.attributes.listItems.length < prevProps.attributes.listItems.length) {
            const { focusedItem } = this.state
            let focusedListItem = document.querySelector(`.qubely-block-${prevProps.attributes.uniqueId} .qubely-list-item-text-${focusedItem}`)
            focusedListItem && this.placeCaretAtEnd(focusedListItem)
        }
    }
    modifySpecificItem = (value, index) => {
        const { attributes: { listItems }, setAttributes } = this.props;
        const modifiedListItems = listItems.map((listItem, currentIndex) => {
            if (index === currentIndex) {
                listItem = { ...listItem, ...value }
            }
            return listItem
        })
        setAttributes({ listItems: modifiedListItems })
    }
    updateListItems = (index, operation) => {
        const { attributes: { listItems }, setAttributes } = this.props
        let newList = JSON.parse(JSON.stringify(listItems))
        operation == 'add' ? newList.splice(index + 1, 0, { icon: 'fas fa-arrow-right', text: '' }) : newList.splice(index, 1)
        this.setState({ openIconPopUp: false })
        setAttributes({ listItems: newList })
    }
    placeCaretAtEnd = (el) => {
        el.focus()
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }
    renderListItems = () => {
        const { isSelected, attributes: { iconPosition, listItems } } = this.props
        const { focusedItem, removeItemViaBackSpace } = this.state
        return listItems.map((item, index) => {
            return (
                <li className="qubely-list-li qubely-list-li-editor" >
                    <div ref="avoidOnClick" className={`qubely-list-item qubely-list-item-${index}`} onClick={() => this.setState({ currentListItemIndex: index })}>
                        {iconPosition == 'left' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} onClick={() => this.setState({ openIconPopUp: this.state.currentListItemIndex == index ? !this.state.openIconPopUp : true })} />}
                        <div
                            className={`qubely-list-item-text-${index}`}
                            id={`qubely-list-item-text-${index}`}
                            contenteditable="true"
                            placeholder="Enter new list item"
                            onBlur={(event) => this.modifySpecificItem({ text: event.target.innerText }, index)}
                            onKeyPress={(event) => {
                                if (event.key == 'Enter') {
                                    event.preventDefault()
                                    this.updateListItems(index, 'add')
                                    this.setState({ focusedItem: index + 1 == listItems.length ? listItems.length : this.state.focusedItem + 1 })
                                }
                            }
                            }
                            onKeyUp={(event) => {
                                if (event.key == 'Backspace') {
                                    event.target.innerText.length == 0 && this.setState({ removeItemViaBackSpace: index })
                                    if (removeItemViaBackSpace == index) {
                                        this.updateListItems(index, 'delete')
                                        this.setState({ focusedItem: index > 0 ? index - 1 : index })
                                    }
                                }
                            }}
                            onClick={() => this.setState({ focusedItem: index })}>
                            {item.text}
                        </div>
                        {iconPosition == 'right' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} onClick={() => this.setState({ openIconPopUp: this.state.currentListItemIndex == index ? !this.state.openIconPopUp : true })} />}
                        {
                            item.text.length > 0 &&
                            <Tooltip text={__('Delete this item')}>
                                <span className="qubely-action-remove" role="button"
                                    onClick={() => {
                                        this.updateListItems(index, 'delete')
                                        index == focusedItem ? this.setState({ focusedItem: index > 0 ? index - 1 : index })
                                            :
                                            this.setState({ focusedItem: focusedItem > 0 ? focusedItem - 1 : focusedItem })

                                    }}>
                                    <i class="fas fa-times" />
                                </span>
                            </Tooltip>
                        }
                        {(this.state.currentListItemIndex == index && this.state.openIconPopUp && isSelected) &&
                            <Wrapper inline
                                domNodetobeAvoided={this.refs.avoidOnClick}
                                onClickOutside={() => {
                                    this.setState({
                                        openIconPopUp: false
                                    })
                                }}
                                customClass="qubely-padding-0">
                                <IconList
                                    disableToggle={true}
                                    value={listItems.length > 0 && listItems[index].icon}
                                    onChange={(value) => this.modifySpecificItem({ icon: value }, index)} />
                            </Wrapper>
                        }
                    </div>
                </li>
            )
        })

    }

    render() {
        const { setAttributes, attributes: { uniqueId,
            iconSize, iconSizeCustom, iconSpacing, layout, iconPosition,
            listItems, typography, alignment, iconColor, iconHoverColor,
            spacing, color, colorHover, padding, background, backgroundHover, border, borderRadius, borderColorHover, shadow, shadowHover,
        } } = this.props

        const { device } = this.state

        if (uniqueId) { CssGenerator(this.props.attributes, 'iconlist', uniqueId) }

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title={__('Alignment')} initialOpen={true}>
                        <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 'fill', svg: icons.list_fill, label: __('Fill') },
                                { value: 'classic', svg: icons.list_classic, label: __('Classic') }
                            ]}
                        />
                        <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} disableJustify responsive />
                    </PanelBody>

                    <PanelBody title={__('Typography')} initialOpen={false}>
                        <Typography label={__('Typography')} value={typography} onChange={val => setAttributes({ typography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>


                    <PanelBody title={__('Icon')} initialOpen={false}>
                        <RadioAdvanced label={__('Size')} value={iconSize} onChange={val => setAttributes({ iconSize: val })}
                            options={[
                                { label: 'S', value: '12px', title: __('Small') },
                                { label: 'M', value: '16px', title: __('Medium') },
                                { label: 'L', value: '20px', title: __('Large') },
                                { label: 'XL', value: '28px', title: __('Extra Large') },
                                { icon: 'fas fa-cog', value: 'custom', title: __('Custom') }
                            ]}
                        />
                        {iconSize == 'custom' &&
                            <Range label={__('Custom Size')} value={iconSizeCustom} onChange={(value) => setAttributes({ iconSizeCustom: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        }
                        <RadioAdvanced label={__('Position')} value={iconPosition} onChange={val => setAttributes({ iconPosition: val })}
                            options={[
                                { label: 'Left', value: 'left', title: __('Left') },
                                { label: 'Right', value: 'right', title: __('Right') }
                            ]}
                        />
                        <Range label={__('Spacing')} value={iconSpacing} onChange={val => setAttributes({ iconSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <Color label={__(' Color')} value={iconColor} onChange={value => setAttributes({ iconColor: value })} />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <Color label={__(' Color')} value={iconHoverColor} onChange={value => setAttributes({ iconHoverColor: value })} />
                            </Tab>
                        </Tabs>
                    </PanelBody>

                    <PanelBody title={__('Design')} initialOpen={false}>
                        <Range label={__('Spacing')} value={spacing} onChange={val => setAttributes({ spacing: val })} min={0} max={60} />
                        {layout == 'fill' &&
                            <Fragment>
                                <Padding
                                    label={__('Padding')}
                                    value={padding}
                                    min={0}
                                    max={100}
                                    responsive
                                    device={device}
                                    unit={['px', 'em', '%']}
                                    onChange={val => setAttributes({ padding: val })}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                                <Separator />
                                <BorderRadius
                                    label={__('Radius')}
                                    value={borderRadius}
                                    onChange={val => setAttributes({ borderRadius: val })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                            </Fragment>
                        }

                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <Color label={__('Text Color')} value={color} onChange={val => setAttributes({ color: val })} />
                                {layout == 'fill' &&
                                    <Color label={__('Background Color')} value={background} onChange={val => setAttributes({ background: val })} />
                                }
                                <Border label={__('Border')} value={border} onChange={val => setAttributes({ border: val })} min={0} max={10} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <Color label={__('Text Color')} value={colorHover} onChange={val => setAttributes({ colorHover: val })} />
                                {layout == 'fill' &&
                                    <Color label={__('Background Color')} value={backgroundHover} onChange={val => setAttributes({ backgroundHover: val })} />
                                }
                                {(border.openBorder != undefined && border.openBorder == 1) &&
                                    <Color label={__('Border Color')} value={borderColorHover} onChange={(value) => setAttributes({ borderColorHover: value })} />
                                }
                            </Tab>
                        </Tabs>
                    </PanelBody>

                    {layout == 'fill' &&
                        <PanelBody title={__('Shadow')} initialOpen={false}>
                            <Tabs>
                                <Tab tabTitle={__('Normal')}>
                                    <BoxShadow value={shadow} onChange={(value) => setAttributes({ shadow: value })} />
                                </Tab>
                                <Tab tabTitle={__('Hover')}>
                                    <BoxShadow value={shadowHover} onChange={(value) => setAttributes({ shadowHover: value })} />
                                </Tab>
                            </Tabs>
                        </PanelBody>
                    }

                </InspectorControls>
                <div className={`qubely-block-${uniqueId}`}>
                    <div className="qubely-block-icon-list">
                        <ul className="qubely-list">
                            {this.renderListItems()}
                        </ul>
                        <button onClick={() => {
                            this.setState({ currentListItemIndex: listItems.length, focusedItem: listItems.length })
                            this.updateListItems(listItems.length, 'add')
                        }} className="button is-default qubely-action-button" role="button">
                            <i class="fas fa-plus" /> {__('Add New')}
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Edit;
