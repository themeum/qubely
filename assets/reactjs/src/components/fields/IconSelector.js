const { Component } = wp.element;

class IconSelector extends Component {
	constructor(props) {
		super(props);
		this.state = { filterText: "" };
	}

	render() {
		const { value, label, icons, enableSearch, onChange } = this.props;
		const { filterText } = this.state;
		let finalData = [];
		if (enableSearch && filterText.length >= 2) {
			finalData = icons.filter((item) => item.name.toLowerCase().search(filterText.toLowerCase()) !== -1);
		} else {
			finalData = icons;
		}
		return (
			<div className="qubely-field qubely-field-icon-list qubely-field-icon-list-selector">
				{label && <label>{label}</label>}

				<div className="qubely-icon-list-wrapper">
					{enableSearch && (
						<input
							type="text"
							value={filterText}
							placeholder="Search..."
							onChange={(e) => this.setState({ filterText: e.target.value })}
							autoComplete="off"
						/>
					)}

					<div className="qubely-icon-list-icons">
						{finalData.map((item, i) => {
							return (
								<span
									key={i}
									className={value == item ? "qubely-active" : ""}
									onClick={() => onChange(item)}
								>
									<span className={item.value} />
								</span>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
export default IconSelector;
