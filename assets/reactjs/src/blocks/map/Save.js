const { Component } = wp.element;
const {
	HelperFunction: { animationAttr },
} = wp.qubelyComponents;
class Save extends Component {
	render() {
		const {
			uniqueId,
			animation,
			placeID,
			mapAddress,
			zoom,
			height,
			apiKey,
			mapStyle,
			showZoomButtons,
			showMapTypeButtons,
			showStreetViewButton,
			showFullscreenButton,
			optionDraggable,
			showMarker,
			iconPointer,
		} = this.props.attributes;
		const attrs = {
			"data-apiKey": apiKey,
			"data-placeID": placeID,
			"data-zoom": zoom,
			"data-show-zoom-buttons": showZoomButtons ? "true" : "false",
			"data-show-map-type-buttons": showMapTypeButtons ? "true" : "false",
			"data-show-street-view-button": showStreetViewButton ? "true" : "false",
			"data-show-fullscreen-button": showFullscreenButton ? "true" : "false",
			"data-option-draggable": optionDraggable ? "true" : "false",
			"data-show-marker": showMarker ? "true" : "false",
			"data-icon-pointer": iconPointer,
			"data-styles": mapStyle,
		};
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				{apiKey ? (
					<div
						className="qubely-google-map"
						{...attrs}
						style={{ height: parseInt(height, 10) + "px", width: "100%" }}
					/>
				) : (
					<iframe
						width="100%"
						height={parseInt(height, 10) + "px"}
						src={`https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=${parseInt(
							zoom,
							10
						)}&ie=UTF8&iwloc=&output=embed`}
						frameBorder="0"
						scrolling="no"
						marginHeight="0"
						marginWidth="0"
					/>
				)}
			</div>
		);
	}
}
export default Save;
