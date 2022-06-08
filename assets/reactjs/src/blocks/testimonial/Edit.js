const { __ } = wp.i18n;
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, TextControl, Toolbar } = wp.components;
const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;
const {
	Media,
	RadioAdvanced,
	Range,
	Color,
	Typography,
	Toggle,
	Separator,
	ColorAdvanced,
	Border,
	BorderRadius,
	BoxShadow,
	Styles,
	Alignment,
	Padding,
	Tabs,
	Tab,
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	Inline: { InlineToolbar },
	ContextMenu: { ContextMenu, handleContextMenu },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
	InspectorSections,
} = wp.qubelyComponents;
import icons from "../../helpers/icons";

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: "md",
			spacer: true,
			openPanelSetting: "",
		};
		this.qubelyContextMenu = createRef();
	}

	handlePanelOpenings = (panelName) => {
		this.setState({ ...this.state, openPanelSetting: panelName });
	};

	render() {
		const {
			uniqueId,
			layout,
			className,
			message,
			messageSpacingTop,
			messageSpacingBottom,
			name,
			nameColor,
			alignment,
			designation,
			designationColor,
			showAvatar,
			avatar,
			avatar2x,
			avatarAlt,
			avatarBorderRadius,
			avatarSize,
			avatarWidth,
			avatarHeight,
			avatarBorder,
			avatarSpacing,
			avatarLayout,
			quoteIconColor,
			quoteIconSize,
			quoteIconSpacing,
			nameTypo,
			nameSpacing,
			messageTypo,
			designationTypo,
			starsSize,
			showRatings,
			ratingsColor,
			quoteIcon,
			ratings,
			ratingsSpacing,
			bgPadding,
			textColor,
			bgColor,
			bgBorderRadius,
			border,
			boxShadow,
			boxShadowHover,

			//animation
			animation,
			globalZindex,
			enablePosition,
			selectPosition,
			positionXaxis,
			positionYaxis,
			hideDesktop,
			hideTablet,
			hideMobile,
			globalCss,
			interaction,
		} = this.props.attributes;

		const { clientId, attributes, setAttributes, isSelected } = this.props;
		const { openPanelSetting, device } = this.state;

		const testimonialTitle = (
			<RichText
				key="editable"
				tagName="span"
				keepPlaceholderOnFocus
				placeholder={__("Add Name...")}
				allowedFormats={["bold", "italic", "link", "strikethrough"]}
				onChange={(value) => setAttributes({ name: value })}
				value={name}
			/>
		);

		const testimonialDesignation = (
			<RichText
				key="editable"
				tagName="span"
				placeholder={__("Add designation...")}
				allowedFormats={["bold", "italic", "link", "strikethrough"]}
				keepPlaceholderOnFocus
				onChange={(value) => setAttributes({ designation: value })}
				value={designation}
			/>
		);

		const testimonialContent = (
			<RichText
				key="editable"
				tagName="div"
				placeholder={__("Add Message...")}
				allowedFormats={["bold", "italic", "link", "strikethrough"]}
				keepPlaceholderOnFocus
				onChange={(value) => setAttributes({ message: value })}
				value={message}
			/>
		);

		const authorInfo = (
			<Fragment>
				<div className={`qubely-testimonial-author`}>
					<div className={showAvatar ? `qubely-testimonial-avatar-layout-${avatarLayout}` : ``}>
						{showAvatar && (avatarLayout == "left" || avatarLayout == "top") && (
							<Fragment>
								{avatar.url != undefined ? (
									<img
										className="qubely-testimonial-avatar"
										src={avatar.url}
										srcSet={
											avatar2x.url != undefined ? avatar.url + " 1x, " + avatar2x.url + " 2x" : ""
										}
										alt={avatarAlt}
										onClick={() => this.handlePanelOpenings("Avatar")}
									/>
								) : (
									<div
										className="qubely-image-placeholder qubely-testimonial-avatar"
										onClick={() => this.handlePanelOpenings("Avatar")}
									>
										<i className="far fa-user" />
									</div>
								)}
							</Fragment>
						)}

						<div className="qubely-testimonial-author-info">
							<div
								className="qubely-testimonial-author-name"
								onClick={() => this.handlePanelOpenings("Name")}
							>
								{testimonialTitle}
							</div>
							<div
								className="qubely-testimonial-author-designation"
								onClick={() => this.handlePanelOpenings("Designation")}
							>
								{testimonialDesignation}
							</div>
						</div>

						{showAvatar && (avatarLayout == "right" || avatarLayout == "bottom") && (
							<Fragment>
								{avatar.url != undefined ? (
									<img
										className="qubely-testimonial-avatar"
										src={avatar.url}
										srcSet={
											avatar2x.url != undefined ? avatar.url + " 1x, " + avatar2x.url + " 2x" : ""
										}
										alt={avatarAlt}
										onClick={() => this.handlePanelOpenings("Avatar")}
									/>
								) : (
									<div
										className="qubely-image-placeholder qubely-testimonial-avatar"
										onClick={() => this.handlePanelOpenings("Avatar")}
									>
										<i className="far fa-user" />
									</div>
								)}
							</Fragment>
						)}
					</div>
				</div>
			</Fragment>
		);

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs>
						<InspectorTab key={"layout"}>
							<InspectorSections block={"testimonial"} />
						</InspectorTab>
						<InspectorTab key={"style"}>
							<PanelBody title="" initialOpen={true}>
								<Styles
									value={layout}
									onChange={(val) => setAttributes({ layout: val })}
									options={[
										{ value: 1, svg: icons.testimonial_1, label: __("Layout 1") },
										{ value: 2, svg: icons.testimonial_2, label: __("Layout 2") },
									]}
								/>
								<Alignment
									label={__("Alignment")}
									value={alignment}
									alignmentType="content"
									onChange={(val) => setAttributes({ alignment: val })}
									disableJustify
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>
							<PanelBody
								title={__("Message")}
								opened={"Message" === openPanelSetting}
								onToggle={() =>
									this.handlePanelOpenings(openPanelSetting !== "Message" ? "Message" : "")
								}
							>
								<Range
									label={__("Top Spacing")}
									value={messageSpacingTop}
									onChange={(value) => setAttributes({ messageSpacingTop: value })}
									unit={["px", "em", "%"]}
									max={300}
									min={0}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__("Bottom Spacing")}
									value={messageSpacingBottom}
									onChange={(value) => setAttributes({ messageSpacingBottom: value })}
									unit={["px", "em", "%"]}
									max={300}
									min={0}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Typography
									label={__("Typography")}
									value={messageTypo}
									onChange={(value) => setAttributes({ messageTypo: value })}
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody
								title={__("Name")}
								opened={"Name" === openPanelSetting}
								onToggle={() => this.handlePanelOpenings(openPanelSetting !== "Name" ? "Name" : "")}
							>
								<Range
									label={__("Spacing")}
									value={nameSpacing}
									onChange={(value) => setAttributes({ nameSpacing: value })}
									unit={["px", "em", "%"]}
									max={300}
									min={0}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Color
									label={__("Color")}
									value={nameColor}
									onChange={(value) => setAttributes({ nameColor: value })}
								/>
								<Typography
									label={__("Typography")}
									value={nameTypo}
									onChange={(value) => setAttributes({ nameTypo: value })}
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody
								title={__("Designation")}
								className={"Designation" === openPanelSetting ? "activePanel" : ""}
								opened={"Designation" === openPanelSetting}
								onToggle={() =>
									this.handlePanelOpenings(openPanelSetting !== "Designation" ? "Designation" : "")
								}
							>
								<Color
									label={__("Color")}
									value={designationColor}
									onChange={(value) => setAttributes({ designationColor: value })}
								/>
								<Typography
									label={__("Typography")}
									value={designationTypo}
									onChange={(value) => setAttributes({ designationTypo: value })}
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody
								title={__("Avatar")}
								opened={"Avatar" === openPanelSetting}
								onToggle={() => this.handlePanelOpenings(openPanelSetting !== "Avatar" ? "Avatar" : "")}
							>
								<Toggle
									label={__("Show Avatar")}
									value={showAvatar}
									onChange={(val) => setAttributes({ showAvatar: val })}
								/>
								{showAvatar && (
									<Fragment>
										<Media
											label={__("Upload Avatar")}
											multiple={false}
											type={["image"]}
											value={avatar}
											panel={true}
											onChange={(value) => setAttributes({ avatar: value })}
										/>

										<Media
											label={__("Upload Avatar @2x")}
											multiple={false}
											type={["image"]}
											value={avatar2x}
											panel={true}
											onChange={(value) => setAttributes({ avatar2x: value })}
										/>
										{avatar.url && (
											<TextControl
												label={__("Alt Text (Alternative Text)")}
												value={avatarAlt}
												onChange={(value) => setAttributes({ avatarAlt: value })}
											/>
										)}
										<Styles
											label={__("Avatar Layout")}
											value={avatarLayout}
											onChange={(val) => setAttributes({ avatarLayout: val })}
											options={[
												{ value: "left", svg: icons.avatar_left, label: __("Left") },
												{ value: "right", svg: icons.avatar_right, label: __("Right") },
												{ value: "top", svg: icons.avatar_top, label: __("Top") },
												{ value: "bottom", svg: icons.avatar_bottom, label: __("Bottom") },
											]}
										/>
										<Separator />
										<RadioAdvanced
											label={__("Avatar Size")}
											options={[
												{ label: "S", value: "48px", title: "Small" },
												{ label: "M", value: "64px", title: "Medium" },
												{ label: "L", value: "96px", title: "Large" },
												{ icon: "fas fa-cog", value: "custom", title: "Custom" },
											]}
											value={avatarSize}
											onChange={(value) => setAttributes({ avatarSize: value })}
										/>
										{avatarSize == "custom" && (
											<Fragment>
												<Range
													label={
														<span className="dashicons dashicons-leftright" title="Width" />
													}
													value={avatarWidth}
													onChange={(value) => setAttributes({ avatarWidth: value })}
													unit={["px", "em", "%"]}
													max={300}
													min={0}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
												<Range
													label={<span className="dashicons dashicons-sort" title="Height" />}
													value={avatarHeight}
													onChange={(value) => setAttributes({ avatarHeight: value })}
													unit={["px", "em", "%"]}
													max={300}
													min={0}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}
										<Fragment>
											<BorderRadius
												label={__("Radius")}
												value={avatarBorderRadius}
												onChange={(value) => setAttributes({ avatarBorderRadius: value })}
												min={0}
												max={100}
												unit={["px", "em", "%"]}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
											<Border
												label={__("Border")}
												value={avatarBorder}
												onChange={(value) => setAttributes({ avatarBorder: value })}
												unit={["px", "em", "%"]}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
											<Range
												label={__("Spacing")}
												value={avatarSpacing}
												onChange={(value) => setAttributes({ avatarSpacing: value })}
												min={0}
												max={200}
												unit={["px", "em", "%"]}
												responsive
												device={device}
												onDeviceChange={(value) => this.setState({ device: value })}
											/>
										</Fragment>
									</Fragment>
								)}
							</PanelBody>

							<PanelBody
								title={__("Quote Icon")}
								opened={"Quote Icon" === openPanelSetting}
								onToggle={() =>
									this.handlePanelOpenings(openPanelSetting !== "Quote Icon" ? "Quote Icon" : "")
								}
							>
								<RadioAdvanced
									label={__("Icon")}
									options={[
										{ icon: "fas fa-ban", value: "" },
										{ icon: "fas fa-quote-left", value: "fas fa-quote-left" },
									]}
									value={quoteIcon}
									onChange={(val) => setAttributes({ quoteIcon: val })}
								/>
								{quoteIcon && (
									<Fragment>
										<Color
											label={__("Color")}
											value={quoteIconColor}
											onChange={(value) => setAttributes({ quoteIconColor: value })}
										/>
										<Range
											label={__("Size")}
											value={quoteIconSize}
											onChange={(value) => setAttributes({ quoteIconSize: value })}
											min={10}
											max={150}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
										<Range
											label={__("Spacing")}
											value={quoteIconSpacing}
											onChange={(value) => setAttributes({ quoteIconSpacing: value })}
											min={0}
											max={100}
											unit={["px", "em", "%"]}
											responsive
											device={device}
											onDeviceChange={(value) => this.setState({ device: value })}
										/>
									</Fragment>
								)}
							</PanelBody>

							<PanelBody
								title={__("Ratings")}
								opened={"Ratings" === openPanelSetting}
								onToggle={() =>
									this.handlePanelOpenings(openPanelSetting !== "Ratings" ? "Ratings" : "")
								}
							>
								<Toggle
									label={__("Show Ratings")}
									value={showRatings}
									onChange={(val) => setAttributes({ showRatings: val })}
								/>
								{showRatings && (
									<Fragment>
										<Range
											label={__("Ratings")}
											value={ratings}
											onChange={(value) => setAttributes({ ratings: value })}
											min={0}
											max={5}
											step={0.1}
										/>
										{ratings != 0 && (
											<Fragment>
												<Color
													label={__("Color")}
													value={ratingsColor}
													onChange={(value) => setAttributes({ ratingsColor: value })}
												/>
												<Range
													label={__("Stars Size")}
													value={starsSize}
													onChange={(value) => setAttributes({ starsSize: value })}
													unit={["px", "em", "%"]}
													min={10}
													max={48}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
												<Range
													label={__("Spacing")}
													value={ratingsSpacing}
													onChange={(value) => setAttributes({ ratingsSpacing: value })}
													unit={["px", "em", "%"]}
													min={0}
													max={200}
													responsive
													device={device}
													onDeviceChange={(value) => this.setState({ device: value })}
												/>
											</Fragment>
										)}
									</Fragment>
								)}
							</PanelBody>

							<PanelBody title={__("Design")} initialOpen={false}>
								<Color
									label={__("Text Color")}
									value={textColor}
									onChange={(val) => setAttributes({ textColor: val })}
								/>
								<ColorAdvanced
									label={__("Background")}
									value={bgColor}
									onChange={(val) => setAttributes({ bgColor: val })}
								/>
								<Separator />
								<Border
									label={__("Border")}
									value={border}
									onChange={(val) => setAttributes({ border: val })}
								/>
								<Padding
									label={__("Padding")}
									value={bgPadding}
									onChange={(value) => setAttributes({ bgPadding: value })}
									unit={["px", "em", "%"]}
									min={0}
									max={100}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>

								<BorderRadius
									label={__("Border Radius")}
									value={bgBorderRadius}
									onChange={(val) => setAttributes({ bgBorderRadius: val })}
									min={0}
									max={100}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>

								<Tabs>
									<Tab tabTitle={__("Normal")}>
										<BoxShadow
											label={__("Box Shadow")}
											value={boxShadow}
											onChange={(val) => setAttributes({ boxShadow: val })}
										/>
									</Tab>
									<Tab tabTitle={__("Hover")}>
										<BoxShadow
											label={__("Box Shadow")}
											value={boxShadowHover}
											onChange={(val) => setAttributes({ boxShadowHover: val })}
										/>
									</Tab>
								</Tabs>
							</PanelBody>
						</InspectorTab>
						<InspectorTab key={"advance"}>
							{animationSettings(uniqueId, animation, setAttributes)}
							{interactionSettings(uniqueId, interaction, setAttributes)}
						</InspectorTab>
					</InspectorTabs>
				</InspectorControls>

				<BlockControls>
					<Toolbar
						className="components-dropdown components-dropdown-menu components-toolbar-group"
						label={__("Testimonial Options", "qubely")}
					>
						<InlineToolbar
							data={[{ name: "InlineSpacer", key: "spacer", responsive: true }]}
							{...this.props}
							prevState={this.state}
						/>
					</Toolbar>
					<AlignmentToolbar
						controls={["left", "center", "right"]}
						value={alignment}
						onChange={(value) => {
							setAttributes({ alignment: value });
						}}
					/>
				</BlockControls>

				{globalSettingsPanel({
					enablePosition,
					selectPosition,
					positionXaxis,
					positionYaxis,
					globalZindex,
					hideDesktop,
					hideTablet,
					hideMobile,
					globalCss,
					setAttributes
				})}

				<div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ""}`}>
					<div
						className={`qubely-block-testimonial`}
						onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
					>
						{layout == 2 && authorInfo}

						{showRatings && ratings > 0 && layout == 2 && (
							<div
								className="qubely-testimonial-ratings"
								style={{ "--qubely-testimonial-rating": `${ratings * 20}%` }}
								onClick={() => this.handlePanelOpenings("Ratings")}
							></div>
						)}

						{quoteIcon && layout == 1 && (
							<div
								className="qubely-testimonial-quote"
								onClick={() => this.handlePanelOpenings("Quote Icon")}
							>
								<span className={`qubely-quote-icon ${quoteIcon}`} />
							</div>
						)}

						<div className="qubely-testimonial-content" onClick={() => this.handlePanelOpenings("Message")}>
							{testimonialContent}
						</div>

						{showRatings && ratings > 0 && layout == 1 && (
							<div
								className="qubely-testimonial-ratings"
								style={{ "--qubely-testimonial-rating": `${ratings * 20}%` }}
								onClick={() => this.handlePanelOpenings("Ratings")}
							></div>
						)}

						{layout == 1 && authorInfo}

						{quoteIcon && layout == 2 && (
							<div
								className="qubely-testimonial-quote qubely-position-bottom"
								onClick={() => this.handlePanelOpenings("Quote Icon")}
							>
								<span className={`qubely-quote-icon ${quoteIcon}`} />
							</div>
						)}
						<div ref={this.qubelyContextMenu} className={`qubely-context-menu-wraper`}>
							<ContextMenu
								name={name}
								clientId={clientId}
								attributes={attributes}
								setAttributes={setAttributes}
								qubelyContextMenu={this.qubelyContextMenu.current}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withCSSGenerator()(Edit);
