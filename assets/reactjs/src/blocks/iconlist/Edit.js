const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, Tooltip, Popover } = wp.components;
const {
	Typography,
	Alignment,
	Padding,
	Styles,
	Range,
	Tabs,
	Tab,
	IconList,
	Color,
	RadioAdvanced,
	Border,
	BorderRadius,
	BoxShadow,
	Separator,
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	ContextMenu: { ContextMenu, handleContextMenu },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
} = wp.qubelyComponents;

import icons from "../../helpers/icons";

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: "md",
			currentListItemIndex: 0,
			openIconPopUp: false,
			removeItemViaBackSpace: -1,
			focusedItem: this.props.attributes.listItems.length - 1,
		};
		this.textInput = React.createRef();
		this.qubelyContextMenu = createRef();
	}
	componentDidMount() {
		const {
			attributes: { uniqueId },
		} = this.props;

		this.placeCaretAtEnd(
			document.querySelector(`.qubely-block-${uniqueId} .qubely-list-item-text-${this.state.focusedItem}`)
		);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.attributes.listItems.length > prevProps.attributes.listItems.length) {
			let focusedListItem = document.querySelector(
				`.qubely-block-${prevProps.attributes.uniqueId} .qubely-list-item-text-${this.state.focusedItem}`
			);
			focusedListItem.focus();
		} else if (this.props.attributes.listItems.length < prevProps.attributes.listItems.length) {
			const { focusedItem } = this.state;
			let focusedListItem = document.querySelector(
				`.qubely-block-${prevProps.attributes.uniqueId} .qubely-list-item-text-${focusedItem}`
			);
			if (this.props.isSelected && focusedListItem) {
				this.placeCaretAtEnd(focusedListItem);
			}
		}
	}
	modifySpecificItem = (value, index) => {
		const {
			attributes: { listItems },
			setAttributes,
		} = this.props;
		const modifiedListItems = listItems.map((listItem, currentIndex) => {
			if (index === currentIndex) {
				listItem = { ...listItem, ...value };
			}
			return listItem;
		});
		setAttributes({ listItems: modifiedListItems });
	};
	updateListItems = (index, operation) => {
		const {
			attributes: { listItems },
			setAttributes,
		} = this.props;
		let newList = JSON.parse(JSON.stringify(listItems));
		operation == "add"
			? newList.splice(index + 1, 0, { icon: "fas fa-arrow-right", text: "" })
			: newList.splice(index, 1);
		this.setState({ openIconPopUp: false });
		setAttributes({ listItems: newList });
	};
	placeCaretAtEnd = (el) => {
		if (el) {
			el.focus();
			if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
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
	};
	renderListItems = () => {
		const {
			isSelected,
			attributes: { iconPosition, listItems },
		} = this.props;
		const { focusedItem, removeItemViaBackSpace, currentListItemIndex, openIconPopUp } = this.state;
		let tempItems = listItems;
		if (Array.isArray(listItems)) {
			tempItems = listItems;
		} else {
			tempItems = listItems.default;
		}
		return tempItems.map((item, index) => {
			return (
				<li key={index} className="qubely-list-li qubely-list-li-editor">
					<div
						ref="avoidOnClick"
						className={`qubely-list-item qubely-list-item-${index}`}
						onClick={() => this.setState({ currentListItemIndex: index })}
					>
						{iconPosition == "left" && (
							<span
								className={`qubely-list-item-icon ${item.icon} fa-fw`}
								onClick={() =>
									this.setState({
										openIconPopUp: openIconPopUp
											? currentListItemIndex == index
												? false
												: true
											: true,
									})
								}
							/>
						)}
						<div
							className={`qubely-list-item-text-${index}`}
							id={`qubely-list-item-text-${index}`}
							contenteditable="true"
							suppressContentEditableWarning={true}
							placeholder="Enter new list item"
							onBlur={(event) => this.modifySpecificItem({ text: event.target.innerText }, index)}
							onKeyPress={(event) => {
								if (event.key == "Enter") {
									event.preventDefault();
									this.updateListItems(index, "add");
									this.setState({
										focusedItem: index + 1 == listItems.length ? listItems.length : focusedItem + 1,
									});
								}
							}}
							onKeyUp={(event) => {
								if (event.key == "Backspace") {
									event.target.innerText.length == 0 &&
										this.setState({ removeItemViaBackSpace: index });
									if (removeItemViaBackSpace == index) {
										this.updateListItems(index, "delete");
										this.setState({
											focusedItem: index > 0 ? index - 1 : index,
											removeItemViaBackSpace: -1,
										});
									}
								}
							}}
							onClick={() => this.setState({ focusedItem: index })}
						>
							{item.text}
						</div>
						{iconPosition == "right" && (
							<span
								className={`qubely-list-item-icon ${item.icon} fa-fw`}
								onClick={() =>
									this.setState({
										openIconPopUp: openIconPopUp
											? currentListItemIndex == index
												? false
												: true
											: true,
									})
								}
							/>
						)}
						{item.text.length > 0 && (
							<Tooltip text={__("Delete this item")}>
								<span
									className="qubely-action-remove"
									role="button"
									onClick={() => {
										this.updateListItems(index, "delete");
										index == focusedItem
											? this.setState({ focusedItem: index > 0 ? index - 1 : index })
											: this.setState({
													focusedItem: focusedItem > 0 ? focusedItem - 1 : focusedItem,
											  });
									}}
								>
									<i className="fas fa-times" />
								</span>
							</Tooltip>
						)}
						{currentListItemIndex == index && openIconPopUp && isSelected && (
							<Popover position={`bottom ${iconPosition}`} className="qubely-iconlist-icons-popover">
								<IconList
									disableToggle={true}
									value={listItems.length > 0 && listItems[index].icon}
									onChange={(value) => this.modifySpecificItem({ icon: value }, index)}
								/>
							</Popover>
						)}
					</div>
				</li>
			);
		});
	};

	render() {
		const {
			name,
			clientId,
			attributes,
			isSelected,
			setAttributes,
			attributes: {
				uniqueId,
				className,
				iconSize,
				iconSizeCustom,
				iconSpacing,
				layout,
				iconPosition,
				listItems,
				typography,
				alignment,
				iconColor,
				iconHoverColor,
				spacing,
				color,
				colorHover,
				padding,
				background,
				backgroundHover,
				border,
				borderRadius,
				borderColorHover,
				shadow,
				shadowHover,
				animation,
				globalZindex,
				enablePosition,
				selectPosition,
				positionXaxis,
				positionYaxis,
				hideDesktop,
				hideTablet,
				hideMobile,
				globalCss,
				interaction,
			},
		} = this.props;

		const { device } = this.state;

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("Alignment")} initialOpen={true}>
								<Styles
									value={layout}
									onChange={(val) => setAttributes({ layout: val })}
									options={[
										{ value: "fill", svg: icons.list_fill, label: __("Fill") },
										{ value: "classic", svg: icons.list_classic, label: __("Classic") },
									]}
								/>
								<Alignment
									label={__("Alignment")}
									value={alignment}
									alignmentType="content"
									onChange={(val) => setAttributes({ alignment: val })}
									disableJustify
									responsive
								/>
							</PanelBody>

							<PanelBody title={__("Typography")} initialOpen={false}>
								<Typography
									label={__("Typography")}
									value={typography}
									onChange={(val) => setAttributes({ typography: val })}
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody title={__("Icon")} initialOpen={false}>
								<RadioAdvanced
									label={__("Size")}
									value={iconSize}
									onChange={(val) => setAttributes({ iconSize: val })}
									options={[
										{ label: "S", value: "12px", title: __("Small") },
										{ label: "M", value: "16px", title: __("Medium") },
										{ label: "L", value: "20px", title: __("Large") },
										{ label: "XL", value: "28px", title: __("Extra Large") },
										{ icon: "fas fa-cog", value: "custom", title: __("Custom") },
									]}
								/>
								{iconSize == "custom" && (
									<Range
										label={__("Custom Size")}
										value={iconSizeCustom}
										onChange={(value) => setAttributes({ iconSizeCustom: value })}
										min={0}
										max={100}
										unit={["px", "em", "%"]}
										responsive
										device={device}
										onDeviceChange={(value) => this.setState({ device: value })}
									/>
								)}
								<RadioAdvanced
									label={__("Position")}
									value={iconPosition}
									onChange={(val) => setAttributes({ iconPosition: val })}
									options={[
										{ label: "Left", value: "left", title: __("Left") },
										{ label: "Right", value: "right", title: __("Right") },
									]}
								/>
								<Range
									label={__("Spacing")}
									value={iconSpacing}
									onChange={(val) => setAttributes({ iconSpacing: val })}
									min={0}
									max={60}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<Color
											label={__(" Color")}
											value={iconColor}
											onChange={(value) => setAttributes({ iconColor: value })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<Color
											label={__(" Color")}
											value={iconHoverColor}
											onChange={(value) => setAttributes({ iconHoverColor: value })}
										/>
									</Tab>
								</Tabs>
							</PanelBody>

							<PanelBody title={__("Design")} initialOpen={false}>
								<Range
									label={__("Spacing")}
									value={spacing}
									onChange={(val) => setAttributes({ spacing: val })}
									min={0}
									max={60}
								/>
								{layout == "fill" && (
									<Fragment>
										<Padding
											label={__("Padding")}
											value={padding}
											min={0}
											max={100}
											responsive
											device={device}
											unit={["px", "em", "%"]}
											onChange={(val) => setAttributes({ padding: val })}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Separator />
										<BorderRadius
											label={__("Radius")}
											value={borderRadius}
											onChange={(val) => setAttributes({ borderRadius: val })}
											min={0}
											max={100}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}

								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<Color
											label={__("Text Color")}
											value={color}
											onChange={(val) => setAttributes({ color: val })}
										/>
										{layout == "fill" && (
											<Color
												label={__("Background Color")}
												value={background}
												onChange={(val) => setAttributes({ background: val })}
											/>
										)}
										<Border
											label={__("Border")}
											value={border}
											onChange={(val) => setAttributes({ border: val })}
											min={0}
											max={10}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<Color
											label={__("Text Color")}
											value={colorHover}
											onChange={(val) => setAttributes({ colorHover: val })}
										/>
										{layout == "fill" && (
											<Color
												label={__("Background Color")}
												value={backgroundHover}
												onChange={(val) => setAttributes({ backgroundHover: val })}
											/>
										)}
										{border.openBorder != undefined && border.openBorder == 1 && (
											<Color
												label={__("Border Color")}
												value={borderColorHover}
												onChange={(value) => setAttributes({ borderColorHover: value })}
											/>
										)}
									</Tab>
								</Tabs>
							</PanelBody>

							{layout == "fill" && (
								<PanelBody title={__("Shadow")} initialOpen={false}>
									<Tabs>
										<Tab tabTitle={__("Normal")}>
											<BoxShadow
												value={shadow}
												onChange={(value) => setAttributes({ shadow: value })}
											/>
										</Tab>
										<Tab tabTitle={__("Hover")}>
											<BoxShadow
												value={shadowHover}
												onChange={(value) => setAttributes({ shadowHover: value })}
											/>
										</Tab>
									</Tabs>
								</PanelBody>
							)}
						</InspectorTab>
						<InspectorTab key={"advance"}>
							{animationSettings(uniqueId, animation, setAttributes)}
							{interactionSettings(uniqueId, interaction, setAttributes)}
						</InspectorTab>
					</InspectorTabs>
				</InspectorControls>

				{globalSettingsPanel({
					enablePosition,
					selectPosition,
					positionXaxis,
					positionYaxis,
					globalZindex,
					hideDesktop,
					hideTablet,
					hideMobile,
					globalCss,
					setAttributes
				})}

				<div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ""}`}>
					<div
						className="qubely-block-icon-list"
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						<ul className="qubely-list">{this.renderListItems()}</ul>
						<button
							onClick={() => {
								this.setState({
									currentListItemIndex: listItems.length,
									focusedItem: listItems.length,
								});
								this.updateListItems(listItems.length, "add");
							}}
							className="button is-default qubely-action-button"
							role="button"
						>
							<i className="fas fa-plus" /> {__("Add New")}
						</button>
						<div ref={this.qubelyContextMenu} className={`qubely-context-menu-wraper`}>
							<ContextMenu
								name={name}
								clientId={clientId}
								attributes={attributes}
								setAttributes={setAttributes}
								qubelyContextMenu={this.qubelyContextMenu.current}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withCSSGenerator()(Edit);
