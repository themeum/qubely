const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr, IsInteraction } } = wp.qubelyComponents

class Save extends Component {
    renderTabTitles = () => {
        const { attributes: { tabTitles, iconPosition } } = this.props

        return tabTitles.map((title, index) =>
            <span tabIndex="0" className={`qubely-vertical-tab-item ${(index == 0) ? 'qubely-vertical-active' : ''}`}>
                <span class={`qubely-vertical-tab-title ${title.iconName ? 'qubely-has-icon-' + iconPosition : ''}`} role="button">
                    {title.iconName && (iconPosition == 'top' || iconPosition == 'left') && (<i className={`qubely-vertical-tab-icon ${title.iconName}`} />)}
                    {title.title}
                    {title.iconName && (iconPosition == 'right') && (<i className={`qubely-vertical-tab-icon ${title.iconName}`} />)}
                </span>
            </span>
        )
    }
    render() {
        const { uniqueId, tabs, tabStyle, navAlignment, animation, interaction } = this.props.attributes
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        let iterator = [], index = 0
        while (index < tabs) {
            iterator.push(index)
            index++
        }
        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`qubely-block-vertical-tab ${interactionClass} qubely-vertical-tab-style-${tabStyle}`}>
                    <div className={`qubely-vertical-tab-nav qubely-alignment-${navAlignment}`}>
                        {this.renderTabTitles(iterator)}
                    </div>
                    <div className={`qubely-vertical-tab-body`}>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        )
    }
}
export default Save