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

    // componentDidMount() {
    //     const {
    //         endPoint
    //     } = this.props

    //     fetch(`https://jsonplaceholder.typicode.com/${endPoint}`)
    //         .then(response => {
    //             response.json().then(values =>
    //                 this.setState({
    //                     templates: values
    //                 }))
    //         }).catch(error => {
    //             console.log('could not retrieve templates : ', error)
    //         });

    // }

    handleTemplateSelection = (selectedTemplate) => {
        const { updateStyle, attributes, templates } = this.props
        updateStyle({ attributes, ...selectedTemplate })

    }
    render() {
        // const { templates } = this.state
        const { label, templates } = this.props
        return (
            <div className="qubely-templates">
                <div className="qubely-d-flex qubely-align-center qubely-mb-10">
                    <div className="qubely-label">
                        <label htmlFor={'input'}>
                            {label || __('Templates')}
                        </label>
                    </div>
                </div>

                {
                    templates ?
                        Object.keys(templates).map((key, _index) => {
                            return (
                                <div className="qubely-template"
                                    onClick={() => this.handleTemplateSelection(templates[key])}>
                                    Template{_index + 1}
                                </div>
                            )
                        })
                        :
                        <div className="qubely-is_loading"><Spinner /></div>
                }
            </div>
        );
    }
}
export default Templates