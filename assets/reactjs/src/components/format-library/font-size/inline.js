/**
 * External dependencies
 */
import uniqueId from "lodash/uniqueId";

/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { Range } = wp.qubelyComponents;

const { useState, useEffect, useMemo } = wp.element;
const { Popover } = wp.components;

const { removeFormat, applyFormat } = wp.richText;

const name = "qubely/fontsize";

function InlinePopover({ isActive, addingFontSize, removeFontPicker, value, onChange, activeAttributes }) {
	const [nextTooltip, setNextTooltip] = useState(activeAttributes.data);
	const [isEditing, enableEdit] = useState(typeof activeAttributes.data === "undefined" ? true : false);

	useEffect(() => {
		setNextTooltip(activeAttributes.data);
		if (activeAttributes.data) {
			// enableEdit(false);
		}
	}, [activeAttributes]);

	const mountingKey = useMemo(uniqueId, [addingFontSize]);

	const anchorRef = useMemo(() => {
		const selection = window.getSelection();

		if (!selection.rangeCount) {
			return;
		}

		const range = selection.getRangeAt(0);
		if (addingFontSize && !isActive) {
			return range;
		}

		let element = range.startContainer;

		// If the caret is right before the element, select the next element.
		element = element.nextElementSibling || element;

		while (element.nodeType !== window.Node.ELEMENT_NODE) {
			element = element.parentNode;
		}

		return element.closest("span");
	}, [addingFontSize, value.start, value.end]);

	const applyFontSize = (apply) => {
		let activeFormat;
		value.activeFormats.some((format) => {
			if (format.type === name) {
				activeFormat = {
					startIndex: format.startIndex,
					endIndex: format.endIndex,
				};
				return true;
			}
			return false;
		});

		let startIndex = value.start,
			endIndex = value.end;
		if (typeof activeFormat !== "undefined") {
			startIndex = activeFormat.startIndex;
			endIndex = activeFormat.endIndex;
		}

		onChange(
			applyFormat(value, {
				type: name,
				attributes: {
					data: nextTooltip,
					style: `font-size: ${nextTooltip}px;`,
				},
				startIndex,
				endIndex,
			})
		);

		if (apply) {
			enableEdit(false);
		}
		removeFontPicker();
	};

	return (
		<Popover
			key={mountingKey}
			anchorRef={anchorRef}
			position="bottom center"
			onClose={removeFontPicker}
			className="qubely-custom-popover custom-fontsize"
			focusOnMount={addingFontSize ? "firstElement" : false}
		>
			<div className="qubely-popover-contents">
				<div className="qubely-font-size-message">
					<Range
						label={__("Custom Font Size")}
						min={0}
						max={100}
						step={1}
						disabled={isEditing ? false : true}
						value={nextTooltip}
						onChange={(newValue) => {
							// setNextTooltip(newValue);
							onChange(
								applyFormat(value, {
									type: name,
									attributes: {
										data: newValue,
										style: `font-size: ${newValue}px;`,
									},
									startIndex: undefined,
									endIndex: undefined,
								})
							);
						}}
					/>

					<div className="qubely-action-buttons">
						{!isEditing ? (
							<button
								onClick={() => enableEdit(true)}
								type="button"
								className="components-button block-editor-link-control__search-item-action is-secondary qubely-edit"
							>
								Edit
							</button>
						) : (
							<button
								onClick={() => applyFontSize(true)}
								type="button"
								className="components-button block-editor-link-control__search-item-action is-secondary qubely-edit"
							>
								Apply
							</button>
						)}

						<button
							onClick={() => {
								onChange(removeFormat(value, name));
								enableEdit(false);
							}}
							type="button"
							className="components-button qubely-remove"
						>
							Remove
						</button>
					</div>
				</div>
			</div>
		</Popover>
	);
}

export default InlinePopover;
