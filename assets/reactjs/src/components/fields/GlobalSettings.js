
import Range from './Range'
import Toggle from './Toggle'
import Separator from './Separator'
import Animation from './Animation'
import Interaction from './Interaction'

const { __ } = wp.i18n
const { InspectorAdvancedControls } = wp.blockEditor
const { Fragment } = wp.element
const { TextareaControl, PanelBody, SelectControl } = wp.components

//attributes 
export const globalAttributes = {
    animation: { type: 'object', default: {} },
    interaction: { type: 'object', default: {} },
    enablePosition: { type: 'boolean', default: false },
    selectPosition: { type: 'string', default: 'relative', style: [{ selector: '{{QUBELY}} {position:{{selectPosition}};}' }] },
    positionXaxis: { type: 'object',  default: { md: '', unit: 'px' }, style: [{ selector: '{{QUBELY}} {left:{{positionXaxis}};}' }] },
    positionYaxis: { type: 'object', default: { md: '', unit: 'px' }, style: [{ selector: '{{QUBELY}} {top:{{positionYaxis}};}' }] },
    globalZindex: { type: 'string', default: '0', style: [{ selector: '{{QUBELY}} {z-index:{{globalZindex}};}' }] },
    hideTablet: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}{display:none;}' }] },
    hideMobile: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}{display:none;}' }] },
    globalCss: { type: 'string', default: '', style: [{ selector: '' }] },
}

export function globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes, isReturn = false) {

    const Output = <Fragment>
                    <Toggle
                        label={__('Enable Custom Position')}
                        value={enablePosition}
                        onChange={() => setAttributes({ enablePosition: !enablePosition })} 
                    />
                    {enablePosition &&
                        <Fragment>
                            <SelectControl
                                label={__('Select Position')}
                                value={selectPosition || ''}
                                options={[
                                    { label: __('Relative'), value: 'relative' },
                                    { label: __('Absolute'), value: 'absolute' },
                                    { label: __('Fixed'), value: 'fixed' }
                                ]}
                                onChange={val => setAttributes({ selectPosition: val })}
                            />
                            <Range
                                label={__('From X-axis')}
                                min={-2000}
                                max={2000}
                                step={1}
                                unit={['px', 'em', '%']}
                                responsive
                                // device={this.state.device}
                                // onDeviceChange={value => this.setState({ device: value })}
                                value={positionXaxis}
                                onChange={value => setAttributes({ positionXaxis: value })} 
                            />
                            <Range
                                label={__('From Y-axis')}
                                min={-2000}
                                max={2000}
                                step={1}
                                unit={['px', 'em', '%']}
                                responsive
                                // device={this.state.device}
                                // onDeviceChange={value => this.setState({ device: value })}
                                value={positionYaxis}
                                onChange={value => setAttributes({ positionYaxis: value })} 
                            />
                        </Fragment>
                    }
                    <Range
                        label={__('Z-Index')}
                        min={1}
                        max={10000}
                        value={globalZindex}
                        onChange={value => setAttributes({ globalZindex: value })} 
                    />
                    <Toggle
                        label={__('Hide on Tablet')}
                        value={hideTablet}
                        onChange={() => setAttributes({ hideTablet: !hideTablet })} 
                    />
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
            </Fragment>

    return  isReturn ? Output : <InspectorAdvancedControls>{Output}</InspectorAdvancedControls>
    
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
