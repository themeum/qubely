const { __ } = wp.i18n
const { Component } = wp.element
const { Spinner } = wp.components
import '../css/template.scss'

class Templates extends Component {

    constructor(props) {
        super(props)
        this.state = {
            templates: [],
            slideCount: 0,
            slideWidth: 0,
            sliderWidth: 0,
            maxMargin: 0,
            currentPage: 1,
            maxPage: 1,
            currentMargin: 0
        }
    }


    componentDidMount() {

        const {templates} = this.props;
        const slideWidth = this.slider.clientWidth;
        const slideCount = Object.keys(templates).length;
        const sliderWidth = (slideCount * .5 * slideWidth)

        this.setState({
            sliderWidth,
            slideWidth: slideWidth * .5,
            maxMargin: sliderWidth - slideWidth,
            slideCount,
            maxPage: Math.ceil(slideCount / 2)
        });



        /**
         * Fetch Template JSON from Server
         * @Warning: Please don't remove this code without asking @delowardev or @faisal
         */

        /*
            const {
                endPoint
            } = this.props

            fetch(`https://jsonplaceholder.typicode.com/${endPoint}`)
            .then(response => {
                response.json().then(values =>
                    this.setState({
                        templates: values
                    }))
            }).catch(error => {
                console.log('could not retrieve templates : ', error)
            });
        */


    }

    _handlePrev = () => {
        if(this.state.currentPage > 1){
            this.setState((state) => {
                return {
                    currentPage: state.currentPage - 1,
                    currentMargin: state.currentMargin - (state.slideWidth * 2)
                }
            })
        }
    }

    _handleNext = () => {
        if(this.state.currentPage < this.state.maxPage){
            this.setState((state) => {
                return {
                    currentPage: state.currentPage + 1,
                    currentMargin: state.currentMargin + (state.slideWidth * 2)
                }
            })
        }
    }

    _handleDot = (index) => {
        this.setState({
            currentPage: index + 1,
            currentMargin: index * this.state.slideWidth * 2
        })
    }


    handleTemplateSelection = (selectedTemplate) => {
        const { updateStyle, attributes } = this.props
        updateStyle({ attributes, ...selectedTemplate })

    }
    render() {
        // const { templates } = this.state
        const { label, templates } = this.props
        return (
            <div className="qubely-templates-container">
                <h4>{label || __('Templates')}</h4>
                {
                    templates ? (
                        <div className='qubely-template-slider-wrap'>
                            <div className='qubely-template-slider' ref={slider => this.slider = slider}>
                                <div
                                    className="qubely-template-slider-inner"
                                    style={{
                                        width: `${this.state.sliderWidth}px`,
                                        marginLeft: `-${this.state.currentMargin}px`
                                    }}
                                >
                                    {
                                        Object.keys(templates).map((key, _index) => {
                                            return (
                                                <div className="qubely-template-slide"
                                                     style={{width: `${this.state.slideWidth}px`}}
                                                     onClick={() => this.handleTemplateSelection(templates[key])}>
                                                    <div>
                                                        {key}
                                                        <img src="https://picsum.photos/id/192/200/250" alt=""/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="template-slider-controls">
                                <div className="template-slider-navigations">
                                    <button onClick={() => this._handlePrev()}>Prev</button>
                                    <button onClick={() => this._handleNext()}>Next</button>
                                </div>
                                <div className="template-slider-dots">
                                    {
                                        this.state.maxPage > 1 && (
                                            Array.from({length: this.state.maxPage}, (val, index) => {
                                                return (
                                                    <button onClick={() => this._handleDot(index)}>{index}</button>
                                                )
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ) : <div className="qubely-is_loading"><Spinner /></div>
                }
            </div>
        );
    }
}
export default Templates