import Separator from "./fields/Separator";

const { __ } = wp.i18n
const { createHigherOrderComponent } = wp.compose
const { Component, Fragment } = wp.element
const { InspectorAdvancedControls, InspectorControls } = wp.editor
const { TextareaControl, PanelBody } = wp.components

import { CssGenerator } from './CssGenerator'
import { Range, Toggle, Animation } from './FieldRender'

const addAttribute = (settings) => {
    if (settings.attributes && settings.attributes.showGlobalSettings) {
        settings.attributes = Object.assign({}, settings.attributes, {
            animation: { type: 'object', default: {} },
            globalZindex: { type: 'number', default: 0, style: [{ selector: '{{QUBELY}} {z-index:{{globalZindex}};}' }] },
            hideTablet: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}{display:none;}' }] },
            hideMobile: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}{display:none;}' }] },
            globalCss: { type: 'string', default: '', style: [{ selector: '' }] },
        })
    }
    return settings
}

const withInspectorControls = createHigherOrderComponent(OriginalComponent => {
    class QubelyWrappedComponent extends Component {
        render() {
            const { setAttributes, attributes: { uniqueId, showGlobalSettings, animation, globalZindex, hideTablet, hideMobile, globalCss } } = this.props
            let type = this.props.name.split("/")[0]
            let blockName = this.props.name.split("/")[1]
            if (uniqueId) { CssGenerator(this.props.attributes, blockName, uniqueId); }
            if (type !== 'qubely' || showGlobalSettings != true) {
                return <OriginalComponent {...this.props} />
            } else {
                return (
                    <Fragment>
                        <OriginalComponent {...this.props} />
                        <InspectorControls>
                            <PanelBody title={__('Animation')} initialOpen={false}>
                                <Animation
                                    uniqueId={uniqueId}
                                    label={__('Animation')}
                                    value={animation}
                                    onChange={(value) => setAttributes({ animation: value })} />
                            </PanelBody>
                        </InspectorControls>
                        <InspectorAdvancedControls>
                            <Range
                                label={__('Z-Index')}
                                min={1}
                                max={10000}
                                value={globalZindex}
                                onChange={value => setAttributes({ globalZindex: value })} />
                            <Toggle
                                label={__('Hide on Tablet')}
                                value={hideTablet}
                                onChange={() => setAttributes({ hideTablet: !hideTablet })} />
                            <Toggle
                                label={__('Hide on Phone')}
                                value={hideMobile}
                                onChange={() => setAttributes({ hideMobile: !hideMobile })} />
                            <Separator
                                label={__('Block Raw CSS')} />
                            <TextareaControl
                                value={globalCss}
                                rows={5}
                                placeholder={__('Use {{QUBELY}} before the selector to wrap element. Otherwise it works globally.')}
                                onChange={val => setAttributes({ globalCss: val })} />
                        </InspectorAdvancedControls>
                    </Fragment>
                )
            }
        }
    }
    return QubelyWrappedComponent
}, "withInspectorControl");

wp.hooks.addFilter('blocks.registerBlockType', 'qubely/extend', addAttribute, 90)
wp.hooks.addFilter('editor.BlockEdit', 'qubely/extend', withInspectorControls, 100)

