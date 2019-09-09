
const { Component, cloneElement, findDOMNode } = wp.element;

import { _equal } from './utils'
const JSOptions = {
    items: 1,
    margin: 10,
    nav: false,
    dots: false,
    center: false,
    autoplay: false,
    dot_indicator: false,
}

export default class Carousel extends Component {
    constructor(props) {
        super(props)
        this.state = { device: '' }
    }
    componentDidMount() {
        let activeDevice = this.parseResponsiveViewPort()
        this.setState({ device: activeDevice })
        require('./qubelyCarousel')
        this.init(this.getOptions())
    }
    componentWillReceiveProps(nextProps) {
        this.destroy()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_equal(prevProps.options, this.props.options) || prevProps.children.length !== this.props.children.length) {
            this.init(this.getOptions());
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    parseResponsiveViewPort = () => {
        const { options: { responsive } } = this.props
        if (typeof responsive === 'undefined')
            return
        let activeView = null

        for (let i = 0; i < responsive.length; i++) {
            if (window.innerWidth > responsive[i].viewport) {
                activeView = responsive[i]
                break;
            }
        }
        if (activeView === null) {
            activeView = responsive[responsive.length - 1]
        }
        return activeView.viewport <= 1199 ? activeView.viewport <= 991 ? 'xs' : 'sm' : 'md'
    }

    init(options) {
        this.$node.jsSlider(options)
        this.$jsSlider = this.$node.data('jsSlider')
    }

    getOptions() {
        const { options } = this.props
        const newOptions = Object.assign(JSOptions, options)
        return newOptions
    }

    destroy() {
        this.$jsSlider.destroy();
    }

    cloneItems() {
        const { children, options } = this.props
        let device = this.parseResponsiveViewPort()
        let firstChilds = []
        let lastChilds = []

        const cloneItems = children.length > options.items[device] ? Math.ceil(children.length / 2) : options.items[device]
        Array(parseInt(cloneItems)).fill(0).map((_, i) => {
            const lastChild = cloneElement(children[(children.length - 1) - i], { className: `clone qubely-carousel-item` })
            const firstChild = cloneElement(children[i], { className: `clone qubely-carousel-item` })
            firstChilds.push(firstChild)
            lastChilds.push(lastChild)
        })
        return { firstChilds, lastChilds }
    }

    finddotLength = () => {
        const { options: { items } } = this.props
        let device = this.parseResponsiveViewPort()
        const cloneItems = $('.qubely-carousel-extended-outer-stage').find('.clone').length
        let numberOfItems = $('.qubely-carousel-extended-outer-stage').find('.qubely-carousel-item').length - cloneItems
        return (Math.floor(numberOfItems / items[device]))
    }

    createDotsItems() {
        const { children, options: { items } } = this.props
        let device = this.parseResponsiveViewPort()
        let dots = Math.floor(children.length / items[device]) + 1;
        return Array(dots).fill(0).map((item, index) => {
            return (
                <li className={`qubely-carousel-dot-${index}${index === 0 ? ' active' : ''}`}>
                    <span className="dot-indicator"></span>
                </li>
            )
        })
    }

    render() {
        const { options: { nav, dots, arrowStyle, arrowPosition }, children } = this.props
        const cloneItems = this.cloneItems()
        return (
            <div className={`qubely-carousel qubely-carousel-wrapper`} ref={(item) => this.$node = $(findDOMNode(item))} {...this.props.options}>
                <div className="qubely-carousel-extended-list">
                    <div className="qubely-carousel-extended-outer-stage">
                        {cloneItems.lastChilds}
                        {children}
                        {cloneItems.firstChilds}
                    </div>
                </div>
                {nav &&
                    <div className="qubely-carousel-nav-control">
                        <span className={`next-control nav-control ${arrowPosition}`} onClick={() => this.$jsSlider.navigate('next')}>
                            {(arrowStyle == 'arrowright2') ? <span class="dashicons dashicons-arrow-right-alt2"></span> : <span class="dashicons dashicons-arrow-right-alt"></span>}
                        </span>
                        <span className={`prev-control nav-control ${arrowPosition}`} onClick={() => this.$jsSlider.navigate('prev')}>
                            {(arrowStyle == 'arrowright2') ? <span class="dashicons dashicons-arrow-left-alt2"></span> : <span class="dashicons dashicons-arrow-left-alt"></span>}
                        </span>
                    </div>
                }
                {dots &&
                    <div className="qubely-carousel-dots">
                        <ul >
                            {this.createDotsItems()}
                        </ul>
                    </div>
                }
            </div>
        )
    }
}