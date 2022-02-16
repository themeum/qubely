const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText } = wp.blockEditor;

class QubelyButtonEdit extends Component {
	render() {
		const {
			buttonIconName,
			buttonIconPosition,
			buttonSize,
			buttonText,
			onTextChange,
			buttonFillType,
			inlineStyles = { regular: {}, hover: {} },
		} = this.props;

		let styles = "",
			regularStyles = Object.keys(inlineStyles["regular"]),
			hoverStyles = Object.keys(inlineStyles["hover"]);

		if (regularStyles.length > 0) {
			regularStyles.forEach((key) => {
				if (key === "color") {
					styles += inlineStyles["selector"];
				} else {
					styles += inlineStyles["bgselector"];
				}
				styles += "{";
				let temp = ":" + inlineStyles.regular[key] + " !important;}";
				styles += key;
				styles += temp;
			});
		}

		if (hoverStyles.length > 0) {
			hoverStyles.forEach((key) => {
				if (key === "color") {
					styles += inlineStyles["selector"];
					styles += ":hover {";
				} else {
					styles += inlineStyles["bgselector"];
					styles += ":before{";
				}
				let temp = ":" + inlineStyles.hover[key] + " !important;}";
				styles += key;
				styles += temp;
			});
		}

		return (
			<div
				className={`qubely-block-btn-wrapper${
					typeof buttonFillType !== "undefined" ? ` button-type-${buttonFillType}` : ""
				}`}
			>
				<div className={`qubely-block-btn`}>
					<span className={`qubely-block-btn-anchor is-${buttonSize}`} style={inlineStyles}>
						{buttonIconName && buttonIconPosition == "left" && (
							<i className={`qubely-btn-icon ${buttonIconName}`} />
						)}
						<RichText
							key="editable"
							keepPlaceholderOnFocus
							placeholder={__("Add Text...")}
							onChange={(value) => onTextChange(value)}
							value={buttonText}
						/>
						{buttonIconName && buttonIconPosition == "right" && (
							<i className={`qubely-btn-icon ${buttonIconName}`} />
						)}
					</span>
				</div>
				{!!styles && <style>{styles}</style>}
			</div>
		);
	}
}

class QubelyButtonSave extends Component {
	render() {
		const {
			buttonIconName,
			buttonIconPosition,
			buttonSize,
			buttonText,
			buttonUrl,
			buttonTag,
			buttonId,
			buttonFillType = undefined,
			tableBuilder,
			inlineStyles = { regular: {}, hover: {} },
		} = this.props;

		const buttonHtml = (
			<Fragment>
				{buttonIconName && buttonIconPosition == "left" && (
					<i className={`qubely-btn-icon ${buttonIconName}`} />
				)}
				<RichText.Content value={buttonText ? buttonText : "Add Text..."} />
				{buttonIconName && buttonIconPosition == "right" && (
					<i className={`qubely-btn-icon ${buttonIconName}`} />
				)}
			</Fragment>
		);
		let styles = "",
			regularStyles = Object.keys(inlineStyles.regular),
			hoverStyles = Object.keys(inlineStyles.hover);

		if (regularStyles.length > 0) {
			regularStyles.forEach((key) => {
				if (key === "color") {
					styles += inlineStyles["selector"];
				} else {
					styles += inlineStyles["bgselector"];
				}
				styles += "{";
				let temp = ":" + inlineStyles.regular[key] + " !important;}";
				styles += key;
				styles += temp;
			});
		}
		if (hoverStyles.length > 0) {
			hoverStyles.forEach((key) => {
				if (key === "color") {
					styles += inlineStyles["selector"];
					styles += ":hover {";
				} else {
					styles += inlineStyles["bgselector"];
					styles += ":before{";
				}
				let temp = ":" + inlineStyles.hover[key] + " !important;}";
				styles += key;
				styles += temp;
			});
		}

		return (
			<div
				className={`qubely-block-btn-wrapper${
					typeof tableBuilder !== "undefined" && typeof buttonFillType !== "undefined"
						? ` button-type-${buttonFillType}`
						: ""
				}`}
			>
				<div className={`qubely-block-btn`}>
					{buttonTag == "a" ? (
						<a
							className={`qubely-block-btn-anchor is-${[buttonSize]}`}
							{...(buttonId ? 'id="' + buttonId + '"' : "")}
							href={buttonUrl && buttonUrl.url ? buttonUrl.url : "#"}
							{...(buttonUrl && buttonUrl.target && { target: "_blank" })}
							{...(buttonUrl && buttonUrl.nofollow
								? { rel: "nofollow noopener noreferrer" }
								: { ...(buttonUrl && buttonUrl.target && { rel: "noopener noreferrer" }) })}
						>
							{buttonHtml}
						</a>
					) : (
						<button
							className={`qubely-block-btn-anchor is-${buttonSize}`}
							{...(buttonId ? 'id="' + buttonId + '"' : "")}
							type="submit"
							role="button"
						>
							{buttonHtml}
						</button>
					)}
				</div>
				{!!styles && <style>{styles}</style>}
			</div>
		);
	}
}

export { QubelyButtonEdit, QubelyButtonSave };
