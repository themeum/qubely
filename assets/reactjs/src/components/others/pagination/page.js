import PropTypes from "prop-types";
import classnames from "classnames";
const { Component } = wp.element;
const { __ } = wp.i18n;
class Page extends Component {
	render() {
		const { className, isCurrent, isDots, children, pageKey, onClick } = this.props;

		const classes = classnames(className, { current: isCurrent }, { dots: isDots });
		return (
			<button className={classes} onClick={() => onClick()}>
				{pageKey === "prev" && <span className="fas fa-angle-left" />}
				{__(children)}
				{pageKey === "next" && <span className="fas fa-angle-right" />}
			</button>
		);
	}
}

Page.defaultProps = {
	isCurrent: false,
	isDots: false,
	className: "",
};
Page.propTypes = {
	isCurrent: PropTypes.bool,
	className: PropTypes.string,
	key: PropTypes.string,
	isDots: PropTypes.bool,
	onClick: PropTypes.func,
};
export default Page;
