const { Component, Fragment } = wp.element
const { InnerBlocks } = wp.editor
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {

    createIterator = () => {
        const { attributes: { items } } = this.props
        let iterator = [], index = 0
        while (index < items) {
            iterator.push(index)
            index++
        }
        return iterator
    }
    renderCarouselNav = () => {
        const iterator = this.createIterator()
        return (iterator.map(index =>
            <span className={`qubely-carousel-item-indicator ${(index == 0) ? 'qubely-active' : ''}`}>
                <span class={`qubely-carousel-title`} role="button">
                    <span className="dashicons dashicons-minus"></span>
                </span>
            </span>)
        )


    }
    render() {
        const { uniqueId, items, showNavigations, navAlignment, animation } = this.props.attributes
        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`qubely-block-carousel`}>
                    <div className={`qubely-carousel-body`}>
                        {showNavigations && <div className="dashicons dashicons-arrow-left-alt2 qubely-carousel-nav" data-direction="previous" data-items={items}></div>}
                        <InnerBlocks.Content />
                        {showNavigations && <div className="dashicons dashicons-arrow-right-alt2 qubely-carousel-nav" data-direction="next" data-items={items}></div>}
                    </div>
                    <div className={`qubely-carousel-nav-wraper`}>
                        {this.renderCarouselNav()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Save