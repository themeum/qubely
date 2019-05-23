const { Component } = wp.element
import '../../css/inline_toolbar.scss'
import InlineSpacer from './InlineSpacer'

class InlineToolbar extends Component {

    render() {
        let html = [];
        (this.props.data).forEach(val => {
            if (val.name == 'InlineSpacer' && this.props.prevState[val.key]) {
                html.push(<InlineSpacer value={this.props.attributes[val.key]} responsive={val.responsive ? true : false} unit={val.unit || ''} onChange={value => this.props.setAttributes({ [val.key]: value })} />)
            }
        })
        return html
    }
}
export default InlineToolbar