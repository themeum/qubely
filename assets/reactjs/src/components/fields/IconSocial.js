const { Component } = wp.element
import IconSocialData from './assets/IconSocialData'

class IconSocial extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filterText: ''
        }
    }

    _onClickIcon( item ) {
        const { editPanel } = this.props
        if( editPanel == true ) {
            this.setState({ isOpen: false, showIcons: !this.state.showIcons }) 
        }
        this.props.onChange( item )
    }
    
    render() {
        const { value } = this.props
        const { filterText } = this.state 
        let finalData = [];
        if (filterText.length > 2) {
            finalData = IconSocialData.filter( item => 
                item.label.toLowerCase().search( filterText.toLowerCase() ) !== -1
            );
        } else {
            finalData = IconSocialData;
        }
        return (
            <div className="qubely-field qubely-field-icon-list qubely-field-icon-list-social">
                { this.props.label &&
                    <label>{this.props.label}</label>
                }

                <div className="qubely-icon-list-wrapper">
                    <span>
                        <input type="text" value={this.state.filterText} placeholder="Search..." onChange={e => this.setState({ filterText: e.target.value })} autoComplete="off" />
                        <div className="qubely-icon-list-icons">
                            {finalData.map(item => { return (<span className={value == item.icon ? 'qubely-active' : ''} onClick={e => { this._onClickIcon( item ) }}><span className={item.icon} /></span>) })}
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}
export default IconSocial