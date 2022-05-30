const { Component } = wp.element;
const { InnerBlocks, RichText } = wp.blockEditor;
const {
	HelperFunction: { animationAttr },
} = wp.qubelyComponents;
class Save extends Component {
	render() {
		const {
			uniqueId,
			itemNumber,
			heading,
			panelIcon,
			iconPosition,
			fillType,
			animation,
			openFirstItem,
			richSnippet = undefined,
		} = this.props.attributes;
		const className = `qubely-accordion-item qubely-type-${fillType} ${
			openFirstItem && itemNumber == 0 && "qubely-accordion-active"
		}`;

		const mainEntryProp = richSnippet
			? {
					itemscope: true,
					itemprop: "mainEntity",
					itemtype: "https://schema.org/Question",
			  }
			: {};

		const itemPropName = richSnippet
			? {
					itemprop: "name",
			  }
			: {};

		const itemPropAnswer = richSnippet
			? {
					itemscope: true,
					itemprop: "acceptedAnswer",
					itemtype: "https://schema.org/Answer",
			  }
			: {};

		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div {...(typeof richSnippet !== "undefined" && mainEntryProp)} className={className}>
					<div className={`qubely-accordion-panel ${panelIcon && "qubely-icon-position-" + iconPosition}`}>
						<span className="qubely-accordion-panel-handler" role="button">
							{panelIcon && iconPosition == "left" && (
								<span className={`qubely-accordion-icon ${panelIcon}`} />
							)}
							<RichText.Content
								{...(typeof richSnippet !== "undefined" && itemPropName)}
								tagName="span"
								className="qubely-accordion-panel-handler-label"
								value={heading}
							/>
							{panelIcon && iconPosition == "right" && (
								<span className={`qubely-accordion-icon ${panelIcon}`} />
							)}
						</span>
					</div>
					<div
						{...(typeof richSnippet !== "undefined" && itemPropAnswer)}
						className="qubely-accordion-body"
						style={openFirstItem && itemNumber == 0 ? { display: "block" } : {}}
					>
						{typeof richSnippet !== "undefined" ? (
							<div itemprop="text">
								<InnerBlocks.Content />
							</div>
						) : (
							<InnerBlocks.Content />
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default Save;
