const { __ } = wp.i18n
const { createHigherOrderComponent } = wp.compose
const { Component, Fragment } = wp.element
const { InspectorControls } = wp.editor
const { PanelBody } = wp.components
import { Typography, Color, Alignment, Toggle, Range, Padding, RadioAdvanced, Separator, IconList } from './FieldRender'
import { CssGenerator } from './CssGenerator'

const addAttribute = (settings) => {
    if (settings.attributes && settings.attributes.listComponent) {
        settings.attributes = Object.assign({},
            {
                enableListAlignment: { type: 'boolean', default: false },
                listAlignment: {
                    type: 'string', default: 'center',
                    style: [
                        {
                            condition: [{ key: 'enableListAlignment', relation: '==', value: true }],
                            selector: '{{QUBELY}} .qubely-list {text-align:{{listAlignment}};}'
                        }]
                },

                listItems: {
                    type: 'array',
                    default: [
                        {
                            icon: 'far fa-star',
                            text: 'Add beautiful icons and text to this block'
                        },
                        {
                            icon: 'far fa-heart',
                            text: 'Set icon color for normal and hover state'
                        },
                        {
                            icon: 'fas fa-check',
                            text: 'Manage space between icon and the text'
                        },
                        {
                            icon: 'fas fa-burn',
                            text: 'Choose a desired layout from the list'
                        },
                    ]
                },

                spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },

                typography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li' }] },
                enableListIcons: { type: 'boolean', default: true },
                iconSize: {
                    type: 'string',
                    default: '16px',
                    style: [
                        {
                            condition: [
                                { key: 'iconSize', relation: '!=', value: 'custom' }
                            ],
                            selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {font-size: {{iconSize}};}'
                        }
                    ]
                },
                iconSizeCustom: {
                    type: 'object', default: { md: 16, unit: 'px' },
                    style: [
                        {
                            condition: [
                                { key: 'iconSize', relation: '==', value: 'custom' }
                            ],
                            selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {font-size: {{iconSizeCustom}};}'
                        }
                    ]
                },
                iconPosition: { type: 'string', default: 'left' },
                iconSpacing: {
                    type: 'object', default: { md: 10, unit: 'px' },
                    style: [
                        {
                            condition: [
                                { key: 'iconPosition', relation: '==', value: 'left' }
                            ],
                            selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {margin-right: {{iconSpacing}};}'
                        },
                        {
                            condition: [
                                { key: 'iconPosition', relation: '==', value: 'right' }
                            ],
                            selector: '{{QUBELY}} .qubely-list .qubely-list-item-icon {margin-left: {{iconSpacing}};}'
                        }
                    ]
                },

                iconColor: { type: 'string', default: '#5D7FEB', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li .qubely-list-item-icon {color: {{iconColor}};}' }] },

                color: { type: 'string', default: '#333', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li .qubely-text{color: {{color}};}' }] },
                spacing: { type: 'string', default: '5', style: [{ selector: '{{QUBELY}} .qubely-list .qubely-list-li:not(:last-child) {margin-bottom: {{spacing}}px;}' }] },
                featuresPadding: {
                    type: 'object',
                    default: {
                        paddingType: 'global',
                    },
                    style: [
                        {
                            selector: '{{QUBELY}} .qubely-pricing-features'
                        }
                    ]
                },

            }, settings.attributes)
    }
    return settings
}

const withInspectorControls = createHigherOrderComponent(OriginalComponent => {
    class QubelyWrappedComponent extends Component {

        modifySpecificItem = (value, index) => {
            const { setAttributes, attributes: { listItems } } = this.props;
            const modifiedListItems = listItems.map((listItem, currentIndex) => {
                if (index === currentIndex) {
                    listItem = { ...listItem, ...value }
                }
                return listItem
            })
            setAttributes({ listItems: modifiedListItems })
        }
        renderListControls = () => {
            const { setAttributes,
                attributes: { listItems, enableListIcons, clickedListItem, iconSize, iconSizeCustom, iconSpacing, iconPosition, color,
                    typography, enableListAlignment, listAlignment, iconColor, spacing, featuresPadding }
            } = this.props
            console.log('featuresPadding : ', featuresPadding)
            return (
                <Fragment>
                    <Toggle value={enableListAlignment} label={__('Custom Alignment')} onChange={val => setAttributes({ enableListAlignment: val })} />
                    {enableListAlignment && <Alignment label={__('Alignment')} value={listAlignment} onChange={val => setAttributes({ listAlignment: val })} disableJustify />}
                    <Color label={__('Color')} value={color} onChange={val => setAttributes({ color: val })} />
                    <Typography label={__('Typography')} value={typography} onChange={val => setAttributes({ typography: val })} />
                    <Range label={__('Spacing')} value={spacing} onChange={val => setAttributes({ spacing: val })} min={0} max={60} />
                    <Padding
                        min={0}
                        max={200}
                        responsive
                        value={featuresPadding}
                        unit={['px', 'em', '%']}
                        label={"Padding"}
                        onChange={val => setAttributes({ featuresPadding: val })} />
                    <Separator />
                    <Toggle value={enableListIcons} label={__('Icons')} onChange={val => setAttributes({ enableListIcons: val })} />
                    {enableListIcons &&
                        <Fragment>
                            <IconList
                                disableToggle={true}
                                value={listItems.length > 0 && listItems[clickedListItem].icon}
                                onChange={(value) => this.modifySpecificItem({ icon: value }, clickedListItem)}
                                colorSettings
                                iconColor={listItems.length > 0 && (listItems[clickedListItem].customColor || '#5D7FEB')}
                                onColorChange={(color) => this.modifySpecificItem({ customColor: color }, clickedListItem)}
                            />
                            <Separator label={__('Common Settings')} customClassName="qubely-separtor-extra-margin" />
                            <Color label={__('Icon Color')} value={iconColor} onChange={value => setAttributes({ iconColor: value })} />
                            <RadioAdvanced label={__('Icon Size')} value={iconSize} onChange={val => setAttributes({ iconSize: val })}
                                options={[
                                    { label: 'S', value: '12px', title: __('Small') },
                                    { label: 'M', value: '16px', title: __('Medium') },
                                    { label: 'L', value: '20px', title: __('Large') },
                                    { label: 'XL', value: '28px', title: __('Extra Large') },
                                    { icon: 'fas fa-cog', value: 'custom', title: __('Custom') }
                                ]}
                            />
                            {iconSize == 'custom' &&
                                <Range label={__('Custom Size')} value={iconSizeCustom} onChange={(value) => setAttributes({ iconSizeCustom: value })} min={0} max={100} unit={['px', 'em', '%']} responsive />
                            }
                            <RadioAdvanced label={__('Position')} value={iconPosition} onChange={val => setAttributes({ iconPosition: val })}
                                options={[
                                    { label: 'Left', value: 'left', title: __('Left') },
                                    { label: 'Right', value: 'right', title: __('Right') }
                                ]}
                            />
                            <Range label={__('Gap')} value={iconSpacing} onChange={val => setAttributes({ iconSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive />
                        </Fragment>
                    }
                </Fragment>
            )
        }
        render() {
            const { setAttributes, attributes: { uniqueId, listComponent, controlledFeaturesPanel, showFeaturesPanel } } = this.props
            let type = this.props.name.split("/")[0]
            let blockName = this.props.name.split("/")[1]
            if (uniqueId) { CssGenerator(this.props.attributes, blockName, uniqueId); }

            if (type !== 'qubely' || listComponent != true) {
                return <OriginalComponent {...this.props} />
            } else {
                return (
                    <Fragment>
                        <OriginalComponent {...this.props} />
                        <InspectorControls key="inspector">
                            {
                                controlledFeaturesPanel ?
                                    <PanelBody title={__('Features')} opened={showFeaturesPanel} onToggle={() => setAttributes({ showFeaturesPanel: !showFeaturesPanel })}>
                                        {this.renderListControls()}
                                    </PanelBody>
                                    :
                                    <PanelBody title={__('Features')} initialOpen={false}>
                                        {this.renderListControls()}
                                    </PanelBody>
                            }
                        </InspectorControls>
                    </Fragment>
                )
            }
        }
    }
    return QubelyWrappedComponent
}, "withInspectorControl");

wp.hooks.addFilter('blocks.registerBlockType', 'qubely/extendlist', addAttribute, 5)
wp.hooks.addFilter('editor.BlockEdit', 'qubely/extendlist', withInspectorControls, 9)

