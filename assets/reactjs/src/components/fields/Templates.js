const { __ } = wp.i18n
const { Component } = wp.element
const { Spinner } = wp.components
import '../css/template.scss'

class Templates extends Component {

    constructor(props) {
        super(props)
        this.state = {
            templates: []
        }
    }


    componentDidMount() {


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
                        <div className='qubely-predefined-template-slides'>
                            {
                                Object.keys(templates).map((key, _index) => {
                                    return (
                                        <div className="qubely-predefined-template"
                                             onClick={() => this.handleTemplateSelection(templates[key])}>
                                            {key}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : <div className="qubely-is_loading"><Spinner /></div>
                }
            </div>
        );
    }
}
export default Templates