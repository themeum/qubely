const { Component, findDOMNode } = wp.element;
import { _equal } from '../../components/HelperFunction'
const JSOptions = {
    autoplay: false,
    items: 1,
    margin: 10,
    center: false,
    dots: false,
    dot_indicator: false,
    nav: false,
}

export default class Carousel extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            device: '',
            isChanged: false,
            height: 0
        }
    }
    componentDidMount() {
        let activeDevice = this.parseResponsiveViewPort()
        this.setState({ device: activeDevice })
        require('./jsSlider')
        setTimeout(()=>{
            this.init(this.getOptions())
        }, 100)
        if( this.$node ){
            
            this.setState({ height: this.$node.height() })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_equal(nextProps.options, this.props.options) || nextProps.items.length !== this.props.items.length) {
            this.setState({ isChanged: true })
            this.destroy()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_equal(prevProps.options, this.props.options) || prevProps.items.length !== this.props.items.length) {
            setTimeout(() => {
                this.init(this.getOptions());
                this.setState({ isChanged: false })
            }, 1050) 
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    parseResponsiveViewPort = () => {
        const { options: { responsive } } = this.props
        if (typeof responsive === 'undefined'){ 
            return 'md'
        }
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
        newOptions.items = options.items[this.state.device]
        newOptions.autoplay = false
        return newOptions
    }

    destroy() {
        if( typeof this.$jsSlider !== 'undefined' )
            this.$jsSlider.destroy();
    }

    createDotsItems() {
        const { items:slider_items, options:{items} } = this.props
        let device = this.parseResponsiveViewPort()
        let dots = Math.floor(slider_items.length / items[device])
        return Array(dots).fill(0).map((item, index) => {
            return (
                <li style={{transition:'all 0.5s linear 0s'}} className={`js-dot-${index} ${index === 0 ? 'active' : ''}`}>
                    <span className="dot-indicator"></span>
                </li>
            )
        })
    }

    render() {
        const { options: { nav, dots }, children } = this.props
        const sliderOpts = {...this.props.options}
        sliderOpts.items = parseInt(this.props.options.items.md)
        
        const freezClass = this.state.isChanged ? 'qubely-slider-freez' : ''
        let style = {}
        if(this.$node && this.$node[0].clientHeight > 0 && this.state.isChanged){ 
            style = { height: this.$node[0].clientHeight+'px' }
        }
        return (
            <div style={style} className={`qubely-slider ${freezClass}`} ref={(item) => this.$node = $(findDOMNode(item))} {...sliderOpts}>
                <div className="qubely-slider-outer-stage">
                    {children}
                </div>
                {
                    nav &&
                    <div className="qubely-slider-nav-control">
                        <span className="qubely-next-control qubely-nav-control" onClick={() => this.$jsSlider.navigate('next')}>&gt;</span>
                        <span className="qubely-prev-control qubely-nav-control" onClick={() => this.$jsSlider.navigate('prev')}>&lt;</span>
                    </div>
                }
                {dots &&
                    <div className="qubely-slider-dots">
                        <ul>
                            {this.createDotsItems()}
                        </ul>
                    </div>
                }

            </div>
        )
    }
}