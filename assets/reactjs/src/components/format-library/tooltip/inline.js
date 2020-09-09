/**
 * External dependencies
 */
import { uniqueId } from 'lodash';

/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;
const {
    useState,
    useEffect,
    useMemo,
    Fragment
} = wp.element;
const {
    Popover,
    Tooltip
} = wp.components;

const {
    removeFormat,
    applyFormat,
} = wp.richText;
const name = 'qubely/tooltip';

function InlineTooltipUI({
    isActive,
    addingTooltip,
    stopAddingTooltip,
    value,
    onChange,
    activeAttributes,
}) {

    const [nextTooltip, setNextTooltip] = useState(activeAttributes.data);
    const [isEditing, enableEdit] = useState(typeof activeAttributes.data === 'undefined' ? true : false);
    useEffect(() => {
        setNextTooltip(activeAttributes.data);
        if (activeAttributes.data) {
            enableEdit(false);
        }
    }, [activeAttributes]);
    const mountingKey = useMemo(uniqueId, [addingTooltip]);

    const anchorRef = useMemo(() => {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);
        if (addingTooltip && !isActive) {
            return range;
        }

        let element = range.startContainer;

        // If the caret is right before the element, select the next element.
        element = element.nextElementSibling || element;

        while (element.nodeType !== window.Node.ELEMENT_NODE) {
            element = element.parentNode;
        }

        return element.closest('span');
    }, [addingTooltip, value.start, value.end]);

    const addTooltip = () => {
        let activeFormat;
        value.activeFormats.some(format => {
            if (format.type === name) {
                activeFormat = {
                    tooltipText: format.attributes.data,
                    startIndex: format.startIndex,
                    endIndex: format.endIndex,
                }
                return true;
            }
            return false;
        });

        let startIndex = value.start,
            endIndex = value.end;
        if (typeof activeFormat !== 'undefined') {
            startIndex = activeFormat.startIndex;
            endIndex = activeFormat.endIndex;
        }
        if (nextTooltip.length > 0) {
            onChange(applyFormat(value, {
                type: name,
                attributes: {
                    data: nextTooltip,
                    ariaLabel: nextTooltip,
                },
                startIndex,
                endIndex,
            }));
        } else {
            onChange(removeFormat(value, name));
        }
        stopAddingTooltip();
    }

    return (
        <Popover
            key={mountingKey}
            anchorRef={anchorRef}
            position="bottom center"
            onClose={stopAddingTooltip}
            className="qubely-custom-popover"
            focusOnMount={addingTooltip ? 'firstElement' : false}
        >
            <div className="qubely-popover-contents">
                {
                    isEditing ?
                        <Fragment>
                            <input
                                type="text"
                                value={nextTooltip}
                                className="qubely_tooltip-input"
                                placeholder={__('Add tooltip')}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        addTooltip();
                                        // enableEdit(false);
                                    }
                                }}
                                onChange={(event) => setNextTooltip(event.target.value)}
                            />
                            <Tooltip text={__('Add')}>
                                <div
                                    onClick={() => addTooltip()}
                                    className="qubely-custom-submit block-editor-link-control__search-actions"
                                >
                                    <span className="dashicons dashicons-editor-break" />
                                </div>
                            </Tooltip>
                        </Fragment>
                        :
                        <div className="tooltip-message">
                            <div className="qubely-tooltip-text">{nextTooltip}</div>
                            <div className="qubely-action-buttons">
                                <button
                                    onClick={() => enableEdit(true)}
                                    type="button"
                                    className="components-button block-editor-link-control__search-item-action is-secondary qubely-edit"
                                >
                                    Edit
                            </button>
                                <button
                                    onClick={() => {
                                        onChange(removeFormat(value, name));
                                        enableEdit(false);
                                    }}
                                    type="button"
                                    className="components-button qubely-remove"
                                >
                                    Delete
                            </button>
                            </div>
                        </div>
                }

            </div>
        </Popover >
    )
}

export default InlineTooltipUI;