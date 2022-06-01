/* eslint-disable react/react-in-jsx-scope */
import "./style.scss";
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, videoBackground },
} = wp.qubelyComponents;

class Save extends Component {
	getClassName = () => {
		const {
			attributes: { align, childRow, rowContainerWidth },
		} = this.props;
		let wrapperClassName = "";

		if (typeof align !== "undefined") {
			if (align === "full" && rowContainerWidth === "boxed") {
				wrapperClassName = "qubely-container";
			} else {
				wrapperClassName = "qubely-container-fluid";
			}
		} else {
			if (childRow) {
				wrapperClassName = "qubely-container-fluid";
			} else {
				wrapperClassName = "qubely-container";
			}
		}

		return wrapperClassName;
	};

	render() {
		const {
			attributes: {
				uniqueId,
				animation,
				align,
				rowContainerWidth,
				rowId,
				rowBg,
				shapeTop,
				shapeBottom,
				heightOptions,
			},
		} = this.props;

		return (
			<div
				className={`qubely-section qubely-block-${uniqueId} ${
					rowBg.bgimgParallax && rowBg.bgimgParallax == "animated" ? "qubely-section-parallax" : ""
				}`}
				{...(rowId ? { id: rowId } : "")}
				{...animationAttr(animation)}
			>
				{Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style && (
					<div
						className="qubely-shape-divider qubely-top-shape"
						dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeTop.style] }}
					/>
				)}
				{Object.entries(rowBg).length > 0 &&
					rowBg.openBg == 1 &&
					rowBg.bgType == "video" &&
					videoBackground(rowBg, "row")}
				{Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style && (
					<div
						className="qubely-shape-divider qubely-bottom-shape"
						dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeBottom.style] }}
					/>
				)}
				<div className="qubely-row-overlay"></div>
				<div className={this.getClassName()}>
					<div className={`qubely-row ${heightOptions == "window" ? "qubely-row-height-window" : ""}`}>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	}
}
export default Save;
