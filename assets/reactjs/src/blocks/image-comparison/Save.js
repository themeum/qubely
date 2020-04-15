const { Component, Fragment } = wp.element;
const { RichText } = wp.blockEditor
const { HelperFunction: { IsInteraction, animationAttr } } = wp.qubelyComponents

class Save extends Component {
	drag = () => {
		console.log("drag function");
	}
    render() {
        const {
			uniqueId,
			className,
			layout,
			mediaType,
			titleLevel,
			title,
			separatorStyle,
			separatorPosition,
			enableContent,
			content,
			iconName,
			image,
			image2x,
			imgAlt,
			imageType,
            externalImageUrl,
            image2,
            image2_2x,
            imgAlt2,
            externalImageUrl2,
			number,
			enableButton,
			animation,
			buttonFillType,
			buttonSize,
			buttonText,
			buttonUrl,
			buttonIconName,
			buttonIconPosition,
			useMediaBg,
			interaction
        } = this.props.attributes
		//  console.log(this.props);
		return <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>

					<div class="qubely-block-image-comparison">
						{
							(imageType === 'local' && image.url != undefined) ?
								<Fragment>
									{image2x.url != undefined ?
										<img className="qubely-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
										:
										<img className="qubely-image-image" src={image.url} alt={imgAlt && imgAlt} />
									}
								</Fragment>
								:
								(imageType === 'external' && externalImageUrl.url != undefined) ?
									<img className="qubely-image-image" src={externalImageUrl.url} alt={imgAlt && imgAlt} />
									:
									<div className="qubely-image-image qubely-image-placeholder"><i className="far fa-image" /></div>
						}
						<span class="comparison-image-text">Original</span>
						<div class="comparison-resize-img">
							{
								(imageType === 'local' && image2.url != undefined) ?
									<Fragment>
										{image2_2x.url != undefined ?
											<img className="qubely-image-image" src={image2.url} srcset={image2.url + ' 1x, ' + image2_2x.url + ' 2x'} alt={imgAlt2 && imgAlt2} />
											:
											<img className="qubely-image-image" src={image2.url} alt={imgAlt2 && imgAlt2} />
										}
									</Fragment>
									:
									(imageType === 'external' && externalImageUrl2.url != undefined) ?
										<img className="qubely-image-image" src={externalImageUrl2.url} alt={imgAlt2 && imgAlt2} />
										:
										<div className="qubely-image-image qubely-image-placeholder"><i className="far fa-image" /></div>
							}
							<span class="comparison-image-text">Modified</span>
						</div>
						<span class="comparison-scrollCircle"
							onClick={ (event) => this.drag }
						>
						</span>
					</div>
				</div>
        // return <div className="image-comparison">
        //             <h2 onMouseDown={ (event) => console.log("object") } >Image comparison</h2>
        //             <img className="qubely-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
        //             <h2>Image 2 comparison</h2>
        //             <img className="qubely-image-image" src={image2.url} srcset={image2.url + ' 1x, ' + image2_2x.url + ' 2x'} alt={imgAlt2 && imgAlt2} />
        //         </div>
    }
}

export default Save;