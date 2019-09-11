const { Component } = wp.element
const { InnerBlocks } = wp.editor
const { HelperFunction: { animationAttr } } = wp.qubelyComponents

class Save extends Component {
    renderTabTitles = () => {
        const { attributes: { tabTitles, iconPosition } } = this.props

        return tabTitles.map((title, index) =>
            <span className={`qubely-tab-item ${(index == 0) ? 'qubely-active' : ''}`}>
                <span class={`qubely-tab-title ${title.iconName ? 'qubely-has-icon-' + iconPosition : ''}`} role="button">
                    {title.iconName && (iconPosition == 'top' || iconPosition == 'left') && (<i className={`qubely-tab-icon ${title.iconName}`} />)}
                    {title.title}
                    {title.iconName && (iconPosition == 'right') && (<i className={`qubely-tab-icon ${title.iconName}`} />)}
                </span>
            </span>
        )
    }
    render() {
        const { uniqueId, tabs, tabStyle, navAlignment, animation } = this.props.attributes

        let iterator = [], index = 0
        while (index < tabs) {
            iterator.push(index)
            index++
        }
        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`qubely-block-tab qubely-tab-style-${tabStyle}`}>
                    <div className={`qubely-tab-nav qubely-alignment-${navAlignment}`}>
                        {this.renderTabTitles(iterator)}
                    </div>
                    <div className={`qubely-tab-body`}>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        )
    }
}
export default Save