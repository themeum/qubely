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
                let currentMargin = state.currentMargin - (state.slideWidth * 2)
                if(currentMargin < 0) {
                    currentMargin = 0
                }
                return {
                    currentPage: state.currentPage - 1,
                    currentMargin
                }
            })
        }
    }

    _handleNext = () => {
        if(this.state.currentPage < this.state.maxPage){
            this.setState((state) => {
                let currentMargin = state.currentMargin + (state.slideWidth * 2)
                if(currentMargin > state.maxMargin) {
                    currentMargin = state.maxMargin
                }
                return {
                    currentPage: state.currentPage + 1,
                    currentMargin
                }
            })
        }
    }

    _handleDot = (index) => {
        let currentMargin = index * this.state.slideWidth * 2

        if(currentMargin < 0){
            currentMargin = 0
        } else if(currentMargin > this.state.maxMargin){
            currentMargin = this.state.maxMargin
        }

        this.setState({
            currentPage: index + 1,
            currentMargin
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
                        <div className='qubely-template-slider-container'>
                            <div className="qubely-template-slider-wrap">
                                <div className='qubely-template-slider' ref={slider => this.slider = slider}>
                                    <div
                                        className="qubely-template-slider-inner"
                                        style={{
                                            width: `${this.state.sliderWidth}px`,
                                            marginLeft: `-${this.state.currentMargin}px`
                                        }}>
                                        {
                                            Object.keys(templates).map((key, _index) => {
                                                const thumbnail = templates[key].thumbnail
                                                return (
                                                    <div className="qubely-template-slide" style={{width: `${this.state.slideWidth}px`}}>
                                                        <div className="qubely-template-slide-inner">
                                                            <img src={(thumbnail && thumbnail !== undefined) ? thumbnail : 'https://i.ibb.co/ss6Jq2z/circle2.png'} alt={key}/>
                                                            <button onClick={() => this.handleTemplateSelection(templates[key])}>{__('Apply')}</button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                            { this.state.maxPage > 1 && (
                                <div className="template-slider-controls">
                                    <button className='template-slider-nav' onClick={() => this._handlePrev()} disabled={this.state.currentPage === 1}><span className='fas fa-chevron-left' /></button>
                                    {
                                        Array.from({length: this.state.maxPage}, (val, index) => {
                                            return (
                                                <button className={'template-slider-dot ' + (this.state.currentPage === index + 1 ? 'active' : '')} onClick={() => this._handleDot(index)}><span>{index+1}</span></button>
                                            )
                                        })
                                    }
                                    <button className='template-slider-nav' onClick={() => this._handleNext()} disabled={this.state.currentPage === this.state.maxPage}><span className='fas fa-chevron-right' /></button>
                                </div>
                            )}
                        </div>
                    ) : <div className="qubely-is_loading"><Spinner /></div>
                }
            </div>
        );
    }
}
export default Templates