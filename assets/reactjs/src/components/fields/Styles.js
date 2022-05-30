import "../css/styles.scss";
const { __ } = wp.i18n;
const { Component } = wp.element;

class Styles extends Component {
	render() {
		const { label, value, options, columns = 2, proUpgradation, onChange } = this.props;

		return (
			<div className="qubely-field qubely-field-styles">
				{label && <label>{label}</label>}
				<div className={`qubely-field-style-list qubely-field-style-columns-${columns}`}>
					{options.map((data, i) => (
						<div
							key={i}
							role="button"
							tabIndex="0"
							aria-label={data.label ? data.label : ""}
							{...(!data.pro && { onClick: () => onChange(data.value) })}
							className={`${value == data.value ? "qubely-active" : ""}${
								data.pro ? " qubely-pro-layout" : ""
							}`}
						>
							{data.icon && (
								<span className="qubely-layout-style qubely-field-style-icon">{data.icon}</span>
							)}
							{data.svg && <span className="qubely-layout-style qubely-field-style-svg">{data.svg}</span>}
							{data.img && <span className="qubely-layout-style qubely-field-style-img">{data.img}</span>}
							{data.label && <span className="qubely-field-style-label">{data.label}</span>}
						</div>
					))}
				</div>
				{proUpgradation && (
					<div className="qubely-field-pro-upgrade">
						<div className="qubely-logo">
							<img src={qubely_admin.plugin + "assets/img/qubely-logo.svg"} alt={__("Qubely")} />
						</div>
						<div className="qubely-upgrade-message">
							<span className="qubely-upgrade-message-title">{__("Upgrade to Pro")}</span>
							<span className="qubely-upgrade-message-description">
								{__("Get all features of post grid at your disposal by upgrading to pro version")}
							</span>
						</div>
						<a
							className="qubely-upgrade-button"
							href={"https://www.themeum.com/product/qubely"}
							target="_blank"
						>
							{__("Upgrade Now")}
						</a>
					</div>
				)}
			</div>
		);
	}
}
export default Styles;
