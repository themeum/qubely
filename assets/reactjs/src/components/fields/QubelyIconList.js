const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText } = wp.editor
const { Tooltip, ColorPalette } = wp.components;
import { Wrapper, IconList, Color } from '../FieldRender'
const listWraperGlobalClassName = 'qubely-list', listItemGloblaPlaceHolder = 'Enter new list item'

class QubelyIconListEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentListItemIndex: 0,
            openIconPopUp: false,
            removeItemViaBackSpace: 999,
            focusedItem: this.props.listItems.length - 1,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { focusedItem } = this.state
        if (this.props.listItems.length > prevProps.listItems.length) {
            let focusedListItem = document.querySelector(`.${this.props.parentBlock} .qubely-list-item-text-${focusedItem}`)
            focusedListItem.focus();
        } else if (this.props.listItems.length < prevProps.listItems.length) {
            let focusedListItem = document.querySelector(`.${this.props.parentBlock} .qubely-list-item-text-${focusedItem}`)
            focusedListItem && this.placeCaretAtEnd(focusedListItem)
        }
    }
    placeCaretAtEnd = (el) => {
        el.focus();
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

    renderDeleteIcon = (index) => {
        const { focusedItem } = this.state
        return (
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
        )
    }

    renderListItems = () => {
        const { enableListIcons, iconPosition, listItems, newListItemPlaceHolder, disableButton, iconColor, onIconColorChange } = this.props
        const { focusedItem, removeItemViaBackSpace } = this.state
        return listItems.map((item, index) => {
            return (
                <li className={`qubely-list-li qubely-list-li-editor qubely-icon-position-${iconPosition}`}>
                    {iconPosition == 'right' && item.text.length > 0 && this.renderDeleteIcon(index)}
                    <div ref="avoidOnClick" className={`qubely-list-item qubely-list-item-${index}`} onClick={() => this.setState({ currentListItemIndex: index })}>
                        {enableListIcons && iconPosition == 'left' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} style={item.customColor ? { color: item.customColor } : {}} onClick={() => this.setState({ openIconPopUp: this.state.currentListItemIndex == index ? !this.state.openIconPopUp : true })} />}
                        <div
                            className={`qubely-list-item-text-${index} qubely-text `}
                            id={`qubely-list-item-text-${index}`}
                            contenteditable="true"
                            placeholder={newListItemPlaceHolder}
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
                        {enableListIcons && iconPosition == 'right' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} style={item.customColor ? { color: item.customColor } : {}} onClick={() => this.setState({ openIconPopUp: this.state.currentListItemIndex == index ? !this.state.openIconPopUp : true })} />}
                    </div>
                    {iconPosition == 'left' && item.text.length > 0 && this.renderDeleteIcon(index)}
                    {(this.state.currentListItemIndex == index && this.state.openIconPopUp) &&
                        <Wrapper inline
                            domNodetobeAvoided={this.refs.avoidOnClick}
                            onClickOutside={() => {
                                this.setState({
                                    openIconPopUp: false
                                })
                            }}
                            customClass="">
                            <Color label={__(' Color')} value={item.customColor ? item.customColor : '#ccc'} onChange={(color) => this.modifySpecificItem({ customColor: color }, index)} />
                            <IconList
                                disableToggle={true}
                                value={listItems.length > 0 && listItems[index].icon}
                                onChange={(value) => this.modifySpecificItem({ icon: value }, index)} />
                        </Wrapper>
                    }
                </li>
            )
        })

    }
    modifySpecificItem = (value, index) => {
        const { listItems, onListItemModification } = this.props;
        const modifiedListItems = listItems.map((listItem, currentIndex) => {
            if (index === currentIndex) {
                listItem = { ...listItem, ...value }
            }
            return listItem
        })
        onListItemModification(modifiedListItems)
    }
    updateListItems = (index, operation) => {
        const { listItems, onListItemModification } = this.props
        let newList = JSON.parse(JSON.stringify(listItems))
        operation == 'add' ? newList.splice(index + 1, 0, { icon: 'fas fa-check', text: '', customColor: false }) : newList.splice(index, 1)

        this.setState({ openIconPopUp: false })
        onListItemModification(newList)
    }
    render() {
        const { listWraperClassName, listItems, disableButton, buttonText, values, onReplace, customClassName, customPlaceHolder, onTagChange } = this.props
        return (
            <Fragment>
                <ul className={listWraperClassName || listWraperGlobalClassName}>
                    {this.renderListItems()}
                </ul>
                {
                    !disableButton &&
                    <button onClick={() => {
                        this.setState({ currentListItemIndex: listItems.length })
                        this.updateListItems(listItems.length, 'add')
                    }} className="button is-default qubely-action-button" role="button">
                        <i class="fas fa-plus" />{buttonText || __('Add New')}
                    </button>

                }

            </Fragment>

        )
    }
}
class QubelyIconListSave extends Component {

    render() {
        const { listWraperClassName, enableListIcons, iconPosition, listItems } = this.props
        return (
            <Fragment>
                <ul className={listWraperClassName || listWraperGlobalClassName}>
                    {
                        listItems.map((item, index) => {
                            return (
                                <li className={`qubely-list-li qubely-icon-position-${iconPosition}`}>
                                    <div className={`qubely-list-item qubely-list-item-${index}`} >
                                        {enableListIcons && iconPosition == 'left' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} style={item.customColor ? { color: item.customColor } : {}} />}
                                        <div
                                            className={`qubely-list-item-text-${index} qubely-text `}
                                            id={`qubely-list-item-text-${index}`}
                                        >
                                            {item.text}
                                        </div>
                                        {enableListIcons && iconPosition == 'right' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} style={item.customColor ? { color: item.customColor } : {}} />}
                                    </div>

                                </li>
                            )
                        })
                    }
                </ul>

            </Fragment>

        )
    }
}

export { QubelyIconListEdit, QubelyIconListSave }