/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const { RichTextToolbarButton } = wp.blockEditor;
/**
 * Internal dependencies
 */
import InlineTooltipUI from "./inline";

const name = "qubely/fontsize";
const title = __("Qubely Font-size");

export const fontsize = {
	name,
	title,
	tagName: "span",
	className: "qubely-custom-font",
	attributes: {
		data: "data-fontsize",
		style: "style",
	},
	edit: class FontSize extends Component {
		constructor(props) {
			super(props);
			this.state = {
				addingFontSize: false,
				tooltipText: "",
			};
			this.removeFontPicker = this.removeFontPicker.bind(this);
		}
		removeFontPicker() {
			this.setState({ addingFontSize: false });
			this.props.onFocus();
		}
		render() {
			const { value, isActive, onChange, activeAttributes } = this.props;
			const { addingFontSize } = this.state;

			return (
				<Fragment>
					<RichTextToolbarButton
						icon={"editor-code"}
						title={__("Qubely Font-size")}
						onClick={() => {
							this.setState({
								addingFontSize: true,
							});
						}}
						isActive={isActive}
						isDisabled={isActive ? false : value.start === value.end}
					/>

					{(addingFontSize || isActive) && (
						<InlineTooltipUI
							value={value}
							onChange={onChange}
							isActive={isActive}
							activeAttributes={activeAttributes}
							addingFontSize={addingFontSize}
							removeFontPicker={this.removeFontPicker}
						/>
					)}
				</Fragment>
			);
		}
	},
};
