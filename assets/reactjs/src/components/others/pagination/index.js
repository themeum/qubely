import PropTypes from "prop-types";
const { Component } = wp.element;
import Page from "./page";

export default class Pagination extends Component {
	render() {
		const { total, current, prevText, nextText, baseClassName, onClickPage } = this.props;

		if (!total) {
			return null;
		}

		let endSize = this.props.endSize < 1 ? 1 : this.props.endSize;
		let midSize = this.props.midSize < 0 ? 2 : this.props.midSize;

		let dots = false;

		let pages = [];

		if (current && current > 1) {
			pages.push({
				isCurrent: false,
				key: "prev",
				onClick: () => onClickPage(current - 1),
				className: "qubely-pagination-prev",
				text: prevText,
			});
		}

		for (let n = 1; n <= this.props.total; n++) {
			let isCurrent = n === current;

			if (isCurrent) {
				dots = true;
				pages.push({
					isCurrent: true,
					key: n,
					onClick: () => onClickPage(n),
					className: "pages",
					text: n,
				});
			} else {
				if (
					n <= endSize ||
					(current && n >= current - midSize && n <= current + midSize) ||
					n > total - endSize
				) {
					pages.push({
						isLink: true,
						key: n,
						onClick: () => onClickPage(n),
						className: "pages",
						text: n,
					});
					dots = true;
				} else if (dots) {
					pages.push({
						isDots: true,
						key: n,
						onClick: () => console.log("dots"),
						className: "pages",
						text: "...",
					});
					dots = false;
				}
			}
		}

		if (current && current < total) {
			pages.push({
				isCurrent: false,
				key: "next",
				onClick: () => onClickPage(current + 1),
				className: "qubely-pagination-next",
				text: nextText,
			});
		}

		return (
			<div className={baseClassName}>
				{pages.map(({ isCurrent, key, text, className, onClick, isDots, isLink }) => (
					<Page
						isCurrent={isCurrent}
						key={key}
						pageKey={key}
						onClick={() => onClick()}
						className={className}
						isDots={isDots}
						isLink={isLink}
					>
						{text}
					</Page>
				))}
			</div>
		);
	}
}

Pagination.defaultProps = {
	total: 0,
	current: 1,
	prevText: "Prev",
	nextText: "Next",
	endSize: 1,
	midSize: 2,
	baseClassName: "qubely-postgrid-pagination",
};

Pagination.propTypes = {
	total: PropTypes.number,
	current: PropTypes.number,
	prevText: PropTypes.string,
	nextText: PropTypes.string,
	endSize: PropTypes.number,
	midSize: PropTypes.number,
	baseClassName: PropTypes.string,
	onClickPage: PropTypes.func,
};
