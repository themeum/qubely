const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, TextControl, RangeControl, ToggleControl } = wp.components
const { InspectorControls, InnerBlocks } = wp.editor

class Item extends Component {
    render(){
        <InnerBlocks
            // template={iterator.map((value, index) => ['qubely/carouselitem', { id: index + 1, customClassName: `qubely-carousel-item` }])}
            template={this.renderTmpls()}
            templateLock="all"
            allowedBlocks={['qubely/carouselitem']} 
        />
    }
}