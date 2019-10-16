
import Range from './Range'
import Toggle from './Toggle'
import Separator from './Separator'
import Animation from './Animation'
import Interaction from './Interaction'

const { __ } = wp.i18n
const { InspectorAdvancedControls } = wp.blockEditor
const { TextareaControl, PanelBody } = wp.components

//attributes 
export const globalAttributes = {
    animation: { type: 'object', default: {} },
    interaction: { type: 'object', default: {} },
    globalZindex: { type: 'string', default: '0', style: [{ selector: '{{QUBELY}} {z-index:{{globalZindex}};}' }] },
    hideTablet: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}{display:none;}' }] },
    hideMobile: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}{display:none;}' }] },
    globalCss: { type: 'string', default: '', style: [{ selector: '' }] },
}

export function globalSettingsPanel(globalZindex, hideTablet, hideMobile, globalCss, setAttributes) {
    return (
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
    )
}

export function animationSettings(uniqueId, animation, setAttributes) {
    return (
        <PanelBody title={__('Animation')} initialOpen={false}>
            <Animation
                uniqueId={uniqueId}
                label={__('Animation')}
                value={animation}
                onChange={(value) => setAttributes({ animation: value })} />
        </PanelBody>
    )
}


export function interactionSettings(uniqueId, interaction, setAttributes) {
    return (
        <PanelBody title={__("Interaction")} initialOpen={false}>
            <Interaction
                uniqueId={uniqueId}
                label={__('Interaction')}
                value={interaction}
                onChange={ value => setAttributes({ interaction: value })}
            />
        </PanelBody>
    )
}
