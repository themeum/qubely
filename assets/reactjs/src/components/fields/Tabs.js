const { __ } = wp.i18n
import '../css/panelTabs.scss'
const { Component } = wp.element
const { Tooltip } = wp.components

class Tabs extends Component {
    constructor(props) {
        super(props)
        this.state = { activeTab: this.props.children[0].props.tabTitle }
    }
    render() {
        const tabs = this.props.children
        const { activeTab } = this.state
        return (
            <div className={`qubely-field qubely-field-tabs ${ this.props.label ? 'qubely-has-label' : '' }`}>
                <div className="qubely-field-tab-header">
                    { this.props.label &&
                        <label>{this.props.label}</label>
                    }
                    <div className="qubely-field-tab-menus">
                        { tabs.map(tab =>
                            <Tooltip text={ __( tab.props.tabTitle )  } >
                                <button className={"qubely-tab-menu " + (tab.props.tabTitle === activeTab ? 'active' : '')} onClick={() => this.setState({ activeTab: tab.props.tabTitle })}>{tab.props.tabTitle}</button>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div className="qubely-field-tab-items">
                    { tabs.map(tab => tab.props.tabTitle === activeTab ? tab : "") }
                </div>
            </div>
        )
    }
}

export default Tabs