import classnames from "classnames";
const { Component, Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const {
	HelperFunction: { animationAttr },
} = wp.qubelyComponents;

class Save extends Component {
	render() {
		const {
			uniqueId,
			className,
			imageATitle,
			imageBTitle,
			image,
			image2x,
			imgAlt,
			image2,
			image2_2x,
			imgAlt2,
			animation,
			verticalAlign,
		} = this.props.attributes;

		let validImageA = false,
			validImageB = false;

		if (image.url || image2x.url) {
			validImageA = true;
		}
		if (image2.url || image2_2x.url) {
			validImageB = true;
		}

		return (
			<div
				className={`qubely-block-${uniqueId}${className ? ` ${className}` : ""}`}
				{...animationAttr(animation)}
			>
				<div
					className={classnames("qubely-block-image-comparison", {
						"has-child-placeholder": !validImageA || !validImageB,
					})}
				>
					<div
						className={classnames("image-container image-B", {
							["valid-images resizable-img"]: validImageA && validImageB,
							"is-placeholder": !validImageB,
						})}
					>
						{validImageB ? (
							<Fragment>
								<img
									className="qubely-image"
									src={image2.url}
									{...(image2_2x.url ? { srcset: image2.url + " 1x, " + image2_2x.url + " 2x" } : {})}
									alt={imgAlt2 && imgAlt2}
								/>
								<RichText.Content
									value={imageBTitle}
									tagName={"div"}
									className={"comparison-image-text " + "text-vertical-align-" + verticalAlign}
								/>
							</Fragment>
						) : (
							<div className="qubely-image-placeholder">
								<i className="far fa-image" />
							</div>
						)}
					</div>
					<div
						className={classnames("image-container image-A", {
							["valid-images"]: validImageA && validImageB,
							"is-placeholder": !validImageA,
						})}
					>
						{validImageA ? (
							<Fragment>
								<img
									className="qubely-image"
									src={image.url}
									{...(image2x.url ? { srcset: image.url + " 1x, " + image2x.url + " 2x" } : {})}
									alt={imgAlt && imgAlt}
								/>
								<RichText.Content
									tagName={"div"}
									className={"comparison-image-text " + "text-vertical-align-" + verticalAlign}
									value={imageATitle}
								/>
							</Fragment>
						) : (
							<div className="qubely-image-placeholder">
								<i className="far fa-image" />
							</div>
						)}
					</div>
					{validImageA && validImageB && <span className="comparison-scrollCircle" />}
				</div>
			</div>
		);
	}
}

export default Save;
