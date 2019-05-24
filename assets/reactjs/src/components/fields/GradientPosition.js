const { __ } = wp.i18n
const { Component } = wp.element
import '../css/gradientposition.scss'
class GradientPosition extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDragging: false,
            deg: 0,
            cx: 25,
            cy: 25
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
        let circle = gradientPositionWraper.find('.qubely-gradient-circle')

        let newCoordinates = {
            x: event.pageX - circle.offset().left,
            y: event.pageY - circle.offset().top
        }
        this.setState({
            cx: newCoordinates.x,
            cy: newCoordinates.y
        })
        setTimeout(() => { onChange(this.getPosition(newCoordinates.x, newCoordinates.y)) }, 100)

    }

    render() {
        const { label } = this.props
        const { cx, cy } = this.state
        return (
            <div className="qubely-gradient-position-wraper" >
                <span className="qubely-gradient-position-label">  {label ? label : `Gradient Position`}   </span>
                <div className="qubely-gradient-position" onMouseLeave={() => this.dragEnd(event)} onMouseUp={event => this.dragEnd(event)} >
                    <span className="qubely-gradient-position-circle">
                        <svg width="60" data-svg-spinner="true" height="60" xmlns="http://www.w3.org/2000/svg">
                            <rect className="qubely-gradient-circle" className="qubely-gradient-circle" stroke="#ddd" strokeWidth="1" fill="none" cx="30" cy="30" r="25" width="55" height="50" />
                            <circle ref="qubelyGradientSelector" className="qubley-gradient-position-selector" style={{ cursor: 'all-scroll' }} fill="blue" stroke="transparent" strokeWidth="15" cx={cx} cy={cy} r="5"
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

