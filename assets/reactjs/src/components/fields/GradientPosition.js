const { __ } = wp.i18n
const { Component } = wp.element
import '../css/gradientposition.scss'
class GradientPosition extends Component {

    constructor(props) {
        super(props)
        const { value } = this.props
        this.state = {
            isDragging: false,
            deg: 0,
            cx: typeof (value.x != 'undefined') ? (((value.x + 12) * 45) / 100) : 25,
            cy: typeof (value.y != 'undefined') ? (((value.y + 12) * 45) / 100) : 25,
        }
    }
    componentWillMount() {
        document.addEventListener('mousemove', this.spinning)
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.spinning)
    }


    dragStart = () => {
        $('.qubely-gradient-position').css({ 'cursor': 'all-scroll' })
        this.setState({ isDragging: true })
    }
    dragEnd = (event) => {
        if (this.state.isDragging) {
            event.preventDefault()
            $('.qubely-gradient-position').css({ 'cursor': 'auto' })
            this.setState({ isDragging: false })
        }
    }
    getPosition = (cx, cy) => {
        let position = 'center'
        if (cx <= 16) {
            position = cy <= 16 ? 'top left' : cy >= 34 ? 'bottom left' : 'left'
        } else if (cx > 34) {
            position = cy <= 16 ? 'top right' : cy >= 34 ? 'bottom right' : 'right'
        } else {
            position = cy <= 16 ? 'top' : cy >= 34 ? 'bottom' : 'center'
        }
        return position
    }
    spinning = (event) => {
        const { isDragging } = this.state
        const { onChange } = this.props
        if (!isDragging) return
        event.preventDefault()

        let gradientPositionWraper = $('.qubely-gradient-position')
        let circle = gradientPositionWraper.find('.qubely-gradient-rectangle')

        let newCoordinates = {
            cx: event.pageX - circle.offset().left < 50 ? event.pageX - circle.offset().left > 5 ? event.pageX - circle.offset().left : 5 : 50,
            cy: event.pageY - circle.offset().top < 50 ? event.pageY - circle.offset().top > 5 ? event.pageY - circle.offset().top : 5 : 50,
        }
        this.setState({ ...newCoordinates })
        setTimeout(() => {
            let position = {
                x: Math.ceil((newCoordinates.cx / 45) * 100) - 12,
                y: Math.ceil((newCoordinates.cy / 45) * 100) - 12,
            }
            onChange(position)
        }, 100)
    }

    render() {
        const { label } = this.props
        const { cx, cy } = this.state
        return (
            <div className="qubely-gradient-position-wraper" >
                <span className="qubely-gradient-position-label">  {label ? label : `Gradient Position`}   </span>
                <div className="qubely-gradient-position" onMouseLeave={() => this.dragEnd(event)} onMouseUp={event => this.dragEnd(event)} >
                    <span className="qubely-gradient-position-circle">
                        <svg width="55" data-svg-spinner="true" height="55" xmlns="http://www.w3.org/2000/svg">
                            <rect className="qubely-gradient-rectangle" stroke="#ddd" strokeWidth="1" fill="none" width="55" height="55" />
                            <circle ref="qubelyGradientSelector" className="qubley-gradient-position-selector" style={{ cursor: 'all-scroll' }} strokeWidth="5" fill="blue" stroke="transparent" cx={cx || 25} cy={cy || 25} r="5"
                                onMouseDown={event => this.dragStart(event)}
                            />
                        </svg>
                    </span>
                </div>
            </div>

        )
    }
}
export default GradientPosition

