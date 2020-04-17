import classnames from 'classnames';
const { Component, Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const { HelperFunction: { animationAttr } } = wp.qubelyComponents;

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
			animation
		} = this.props.attributes;

		let validImageA = false, validImageB = false;

		if (image.url || image2x.url) {
			validImageA = true;
		}
		if (image2.url || image2_2x.url) {
			validImageB = true;
		}

		const imageAClasses = classnames(
			'image-container',
			'image-A',
			{ ['valid-images']: validImageA && validImageB }
		);
		const imageBClasses = classnames(
			'image-container',
			'image-B',
			{ ['valid-images resizable-img']: validImageA && validImageB }
		);
		return (
			<div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`} {...animationAttr(animation)}>

				<div class="qubely-block-image-comparison">

					<div className={imageBClasses}>
						{
							validImageB ?
								<Fragment>
									{image2_2x.url ?
										<img className="qubely-image" src={image2.url} srcset={image2.url + ' 1x, ' + image2_2x.url + ' 2x'} alt={imgAlt2 && imgAlt2} />
										:
										<img className="qubely-image" src={image2.url} alt={imgAlt2 && imgAlt2} />
									}
									<RichText.Content
										value={imageBTitle}
										className="comparison-image-text"
									/>
								</Fragment>
								:
								<div className="qubely-image-placeholder"><i className="far fa-image" /></div>

						}
					</div>
					<div className={imageAClasses}>
						{
							validImageA ?
								<Fragment>
									{image2x.url ?
										<img className="qubely-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
										:
										<img className="qubely-image" src={image.url} alt={imgAlt && imgAlt} />
									}
									<RichText.Content
										value={imageATitle}
										className="comparison-image-text"
									/>
								</Fragment>
								:
								<div className="qubely-image-placeholder"><i className="far fa-image" /></div>
						}
					</div>
					{
						(validImageA && validImageB) &&
						<span class="comparison-scrollCircle" />
					}
				</div>

			</div>
		);
	}
}

export default Save;