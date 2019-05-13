const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { TextControl } = wp.components
import { Typography, Alignment, Styles, Range, Tabs, Tab, Border, RadioAdvanced, Color, Wrapper, BoxShadow, CustomIcons, Toggle, Separator } from '../../components/FieldRender'
import '../css/gradientangle.scss'
const LABEL = "Gradient Angle"
class GradientAngle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isDragging: false,
            radius: 0,
            deg: 0
        }
    }

    componentWillMount() {
        document.addEventListener('mousemove', this.spinning)
    }
    componentDidMount() {
        this.updateSelectorPostion(this.props.value, 'componentDidMount')
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.value === this.props.value) return
        // this.updateSelectorPostion(this.props.value)
        if (prevState.deg === this.state.deg) return
        this.updateSelectorPostion(this.state.deg)
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.spinning)
    }

    updateSelectorPostion = (degree, calledFrom) => {
        let gradientAngleWraper = $('.qubely-gradient-angle')
        let circle = gradientAngleWraper.find('.qubely-gradient-circle')
        let selector = gradientAngleWraper.find('.qubley-gradient-angle-selector')

        let radius = circle.attr('r') - 6
        let t = Math.tan(degree / 360 * Math.PI);

        let px = parseInt(radius * (1 - t ** 2) / (1 + t ** 2)) + parseInt(circle.attr('cx'))
        let py = parseInt(radius * 2 * t / (1 + t ** 2)) + parseInt(circle.attr('cy'))

        selector.attr('cx', px)
        selector.attr('cy', py)
        calledFrom === 'componentDidMount' && this.setState({ radius: radius })
    }

    dragStart = (event) => {
        $('.qubely-gradient-angle').css({ 'cursor': 'all-scroll' })
        this.setState({ isDragging: true })
    }
    dragEnd = (event) => {
        if (this.state.isDragging) {
            event.preventDefault()
            const { onChange } = this.props
            $('.qubely-gradient-angle').css({ 'cursor': 'auto' })
            this.setState({ isDragging: false })
            // onChange(Math.round(this.state.deg))
        }
    }
    spinning = (event) => {
        const { isDragging, radius } = this.state
        if (!isDragging) return
        const { onChange } = this.props
        event.preventDefault()
        let gradientAngleWraper = $('.qubely-gradient-angle')
        let circle = gradientAngleWraper.find('.qubely-gradient-circle')

        let e = {
            cx: event.pageX - radius - circle.offset().left,
            cy: -(event.pageY - radius - circle.offset().top)
        },
            cord = { x: e.cx >= 0 ? 'right' : 'left', y: e.cy >= 0 ? 'top' : 'bottom' }, degree
        if (cord.x === 'right' && cord.y === 'top') {
            degree = 360 - (Math.atan(e.cy / e.cx) * (180 / Math.PI))
        } else if (cord.x === 'right' && cord.y === 'bottom') {
            degree = -(Math.atan(e.cy / e.cx) * (180 / Math.PI))
        } else if (cord.x === 'left' && cord.y === 'bottom') {
            degree = -(Math.atan(e.cy / e.cx) * (180 / Math.PI) - 180)
        } else if (cord.x === 'left' && cord.y === 'top') {
            degree = -(Math.atan(e.cy / e.cx) * (180 / Math.PI) - 180)
        }
        this.setState({ deg: degree })
        setTimeout(() => { onChange(Math.round(degree)) }, 100)

    }

    render() {
        const { value, label, onChange } = this.props
        return (
            <div className="qubely-gradient-angle-wraper" >
                <span className="qubely-gradient-angle-label">  {label ? label : LABEL}   </span>
                <div className="qubely-gradient-angle" onMouseLeave={() => this.dragEnd(event)} onMouseUp={event => this.dragEnd(event)} >
                    <span className="qubely-gradient-angle-circle">
                        <svg width="60" data-svg-spinner="true" height="60" xmlns="http://www.w3.org/2000/svg">
                            <circle ref="qubely-gradient-circle" className="qubely-gradient-circle" stroke="#ddd" strokeWidth="1" fill="none" cx="30" cy="30" r="25" />
                            <circle ref="qubelyGradientSelector" className="qubley-gradient-angle-selector" style={{ cursor: 'all-scroll' }} fill="blue" stroke="transparent" strokeWidth="15" cx="25" cy="20" r="5"
                                onMouseDown={event => this.dragStart(event)}
                            />
                        </svg>
                    </span>
                    <input type="number" className="qubely-gradient-angle-input" onChange={event => { this.setState({ deg: event.target.value }); onChange(event.target.value) }} value={value} min={0} max={360} />
                </div>
            </div>

        )
    }
}
export default GradientAngle

