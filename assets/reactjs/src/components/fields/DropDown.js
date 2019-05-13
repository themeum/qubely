const { Component } = wp.element
const { Dropdown } = wp.components
const dropDownGlobalClassName = "qubely-dropdown", contentGlobalClassName = "qubely-dropdown-content", dropdownGlobalPostion = "bottom center"
class QubelyDropdown extends Component {
    render() {
        const { children: [dropdownTrigger, content], dropDownClassName, contentClassName, position } = this.props
        return (
            <Dropdown
                className={dropDownClassName || dropDownGlobalClassName}
                contentClassName={contentClassName || contentGlobalClassName}
                position={position || dropdownGlobalPostion}
                renderToggle={({ isOpen, onToggle }) =>
                    <span onClick={onToggle} aria-expanded={isOpen}> {dropdownTrigger}</span>
                }
                renderContent={() => content}
            />
        )
    }
}
export default QubelyDropdown