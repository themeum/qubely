const { Component } = wp.element
import '../../css/inline_toolbar.scss'
import InlineColor from './InlineColor'
import InlineSpacer from './InlineSpacer'
import InlineAlignment from './InlineAlignment'
import InlineSelector from './InlineSelector'
import InlineTypography from './InlineTypography'

class InlineToolbar extends Component {

    render() {
        let html = [];
        (this.props.data).forEach(val => {
            if (val.name == 'InlineColor' && this.props.prevState[val.key]) {
                html.push(<InlineColor value={this.props.attributes[val.key]} onChange={value => this.props.setAttributes({ [val.key]: value })} />)
            } else if (val.name == 'InlineSpacer' && this.props.prevState[val.key]) {
                html.push(<InlineSpacer value={this.props.attributes[val.key]} responsive={val.responsive ? true : false} unit={val.unit || ''} onChange={value => this.props.setAttributes({ [val.key]: value })} />)
            } else if (val.name == 'InlineAlignment' && this.props.prevState[val.key]) {
                html.push(<InlineAlignment value={this.props.attributes[val.key]} responsive={val.responsive ? true : false} disableJustify={val.disableJustify ? true : false} onChange={value => this.props.setAttributes({ [val.key]: value })} />)
            } else if (val.name == 'InlineSelector' && this.props.prevState[val.key]) {
                html.push(<InlineSelector defaultVal={val.defaultVal || false} value={this.props.attributes[val.key]} onChange={value => this.props.setAttributes({ [val.key]: value })} />)
            } else if (val.name == 'InlineTypography' && this.props.prevState[val.key]) {
                html.push(<InlineTypography value={this.props.attributes[val.key]} onChange={value => this.props.setAttributes({ [val.key]: value })} />)
            }
        })
        return html
    }
}
export default InlineToolbar