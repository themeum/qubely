import "./style.scss";
import Save from "./Save";
import Edit from "./Edit";
import attributes from "./attributes";
import classnames from "classnames";
const { Fragment, Component } = wp.element;
const { InnerBlocks, RichText } = wp.blockEditor;
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const supports = {
	html: false,
	className: false,
	align: ["full", "wide", "center"],
};

registerBlockType("qubely/tabs", {
	title: __("Tabs"),
	category: "qubely",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-tabs.svg"} alt={__("Tabs Block")} />,
	description: __("Showcase features in beautiful pre-designed tabs with Qubely Tabs."),
	supports: supports,
	example: {
		attributes: {
			tabTitles: [{ title: "Tab 1" }, { title: "Tab 2" }, { title: "Tab 3" }],
		},
		innerBlocks: [
			{
				name: "qubely/tab",
				innerBlocks: [
					{
						name: "qubely/heading",
						attributes: {
							content: "Qubely - A Full-fledged Gutenberg Builder",
							alignment: { md: "center" },
						},
					},
				],
			},
		],
	},
	attributes,
	edit: Edit,
	save: Save,
	deprecated: [
		{
			attributes,
			supports,
			save(props) {
				const {
					attributes: {
						uniqueId,
						className,
						tabs,
						navType,
						autoSwithcing,
						showProgressBar,
						defaultDelay,
						tabStyle,
						tabTitles,
						iconPosition,
						navAlignment,
						animation,
						interaction,
						navLayout,
						enableImageNavTitle,
						progressbarPosition,
						imageNavTitleAlignment,
						enableImageNavDesciption,
					},
				} = props;

				const interactionClass = IsInteraction(interaction) ? "qubley-block-interaction" : "";

				const renderTabTitles = () => {
					return tabTitles.map((title, index) => (
						<span
							key={index}
							className={`qubely-tab-item ${index == 0 ? "qubely-active" : ""}`}
							{...(autoSwithcing && {
								"data-customdelay": typeof title.delay !== "undefined" ? title.delay : defaultDelay,
							})}
						>
							{navType === "text" ? (
								<Fragment>
									<span
										className={`qubely-tab-title ${
											title.iconName ? "qubely-has-icon-" + iconPosition : ""
										}`}
										role="button"
									>
										{title.iconName && (iconPosition == "top" || iconPosition == "left") && (
											<i className={`qubely-tab-icon ${title.iconName}`} />
										)}
										{title.title}
										{title.iconName && iconPosition == "right" && (
											<i className={`qubely-tab-icon ${title.iconName}`} />
										)}
									</span>
								</Fragment>
							) : (
								<div className="qubely-tab-title">
									<div
										className={`description-type-tab nav-layout-${navLayout} align-${imageNavTitleAlignment}`}
									>
										{navLayout !== "three" && (
											<Fragment>
												{typeof title.avatar !== "undefined" && title.avatar.url ? (
													<img
														className="qubely-tab-image"
														src={title.avatar.url}
														alt={title.avatar.alt ? title.avatar.alt : "tab-image"}
													/>
												) : (
													<div className="qubely-tab-title qubely-image-placeholder qubely-tab-title-avatar">
														<i className="far fa-user" />
													</div>
												)}
											</Fragment>
										)}

										{(enableImageNavTitle || enableImageNavDesciption) && (
											<div className="qubely-tab-description">
												{enableImageNavTitle && (
													<RichText.Content
														tagName="div"
														className="image-type-nav-title"
														value={title.title}
													/>
												)}
												{enableImageNavDesciption && (
													<RichText.Content
														tagName="div"
														className="image-type-nav-description"
														value={title.description}
													/>
												)}
											</div>
										)}
									</div>
								</div>
							)}

							{autoSwithcing && showProgressBar && (
								<div
									className={`progress ${progressbarPosition}`}
									style={{
										width: "0%",
										transition:
											"width" + typeof title.delay === "undefined" ? defaultDelay : title.delay + "s",
									}}
								/>
							)}
						</span>
					));
				};

				const blockWrapperClasses = classnames(
					{ [`qubely-block-${uniqueId}`]: typeof uniqueId !== "undefined" },
					{ "with-auto-swithing": autoSwithcing },
					{ [className]: typeof className !== "undefined" }
				);
				const blockClasses = classnames("qubely-block-tab", `${interactionClass}`, `qubely-tab-style-${tabStyle}`, {
					"with-auto-swithing": autoSwithcing,
				});

				return (
					<div className={blockWrapperClasses} {...animationAttr(animation)}>
						<div
							className={blockClasses}
							{...(autoSwithcing && { "data-defaultdelay": defaultDelay, "data-tabs": tabs })}
						>
							<div className={`qubely-tab-nav qubely-alignment-${navAlignment}`}>{renderTabTitles()}</div>
							<div className={`qubely-tab-body`}>
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				);
			}
		}
	]
});
