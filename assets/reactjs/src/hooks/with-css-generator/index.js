import { generateCSS, updateCSS } from "./generateCSS";
const { Fragment, Component } = wp.element;
const diff = require("deep-object-diff").diff;
const { PluginBlockSettingsMenuItem } = wp.editPost;
const { BlockControls } = wp.blockEditor;

const { createHigherOrderComponent } = wp.compose;

export default function withCSSGenerator() {
	return createHigherOrderComponent((OriginalComponent) => {
		return class WrappedComponent extends Component {
			constructor() {
				super(...arguments);
				this.setState = this.setState.bind(this);
			}
			componentDidMount() {
				this.saveStyleAttributes();
			}

			saveStyleAttributes = () => {
				const {
					attributes,
					attributes: { uniqueId },
				} = this.props;
				const blockAttributes = wp.blocks.getBlockType(this.props.name).attributes;

				const saveinState = (value) => {
					// return;
					this.setState({
						responsiveCSS: value.responsiveCSS,
						nonResponsiveCSS: value.nonResponsiveCSS,
					});
				};

				generateCSS(blockAttributes, attributes, (value) => saveinState(value));

				if (uniqueId) {
					this.saveCSS();
				}
			};
			saveCSS = () => {
				const {
					attributes,
					attributes: { uniqueId },
					name,
				} = this.props;

				const {
					CssGenerator: { CssGenerator },
				} = wp.qubelyComponents;

				const blockName = name.split("/");
				CssGenerator(attributes, blockName[1], uniqueId, false);
			};

			componentDidUpdate(prevProps, prevState) {
				const {
					attributes,
					attributes: { uniqueId },
				} = this.props;
				const { responsiveCSS, nonResponsiveCSS } = this.state;
				let isLayoutChanged = false,
					blockAttributes = wp.blocks.getBlockType(this.props.name).attributes,
					changedAttributes = Object.keys(diff(prevProps.attributes, attributes));

				const { getBlocks } = wp.data.select("core/block-editor");

				let isDuplicateBlock = false;

				const isDuplicatingBlock = (allBlocks) => {
					if (allBlocks.length === 0) {
						return;
					}
					if (prevProps.attributes.uniqueId !== uniqueId) {
						for (let index = 0; index < allBlocks.length; index++) {
							if (allBlocks[index].attributes.uniqueId === prevProps.attributes.uniqueId) {
								isDuplicateBlock = true;
								break;
							} else if (allBlocks[index].innerBlocks.length > 0) {
								isDuplicatingBlock(allBlocks[index].innerBlocks);
								if (isDuplicateBlock) {
									break;
								}
							}
						}
					}
					return isDuplicateBlock;
				};

				if (changedAttributes.length > 0) {
					if (
						changedAttributes.indexOf("layout") !== -1 ||
						changedAttributes.indexOf("style") !== -1 ||
						changedAttributes.indexOf("recreateStyles") !== -1 ||
						changedAttributes.indexOf("fillType") !== -1 ||
						changedAttributes.indexOf("iconStyle") !== -1 ||
						changedAttributes.indexOf("buttonFillType") !== -1 ||
						changedAttributes.indexOf("tabStyle") !== -1 ||
						changedAttributes.indexOf("separatorStyle") !== -1
					) {
						isLayoutChanged = true;
						this.saveStyleAttributes();
					}
					if (!isLayoutChanged) {
						if (changedAttributes.indexOf("uniqueId") !== -1) {
							let currentStyleElement = window.document.getElementById(
								"qubely-block-" + prevProps.attributes.uniqueId
							);
							if (currentStyleElement && !isDuplicatingBlock(getBlocks())) {
								currentStyleElement.id = "qubely-block-" + attributes.uniqueId;
								let newStyle = currentStyleElement.innerHTML.replace(
									new RegExp(`${prevProps.attributes.uniqueId}`, "g"),
									`${attributes.uniqueId}`
								);
								currentStyleElement.innerHTML = newStyle;
							} else {
								this.saveCSS();
							}
						}

						changedAttributes = changedAttributes.filter((attr) => attr !== "uniqueId");

						let newState = {
							nonResponsiveCSS: nonResponsiveCSS,
							responsiveCSS: responsiveCSS,
						};

						if (changedAttributes.length > 0) {
							const updateState = (attribute, key, value) => {
								if (typeof key === "undefined") {
									newState = {
										...newState,
										nonResponsiveCSS: {
											...newState.nonResponsiveCSS,
											...{ [attribute]: value },
										},
									};
								} else {
									newState = {
										...newState,
										responsiveCSS: {
											...newState.responsiveCSS,
											...{
												[attribute]: {
													...newState.responsiveCSS[attribute],
													...(key === "simple"
														? {
																simple: value,
														  }
														: {
																...value,
														  }),
												},
											},
										},
									};
								}

								if (
									key === "Object" &&
									attributes[attribute].openTypography &&
									attributes[attribute].activeSource === "global" &&
									attributes[attribute].globalSource === "none"
								) {
									newState.responsiveCSS[attribute] = {};
								}
							};
							changedAttributes.forEach((changedAttribute) => {
								updateCSS(
									blockAttributes,
									attributes,
									(attribute, key, value) => updateState(attribute, key, value),
									changedAttribute
								);
								this.saveCSS();
							});
							this.setState({
								responsiveCSS: newState.responsiveCSS,
								nonResponsiveCSS: newState.nonResponsiveCSS,
							});
						}
					}
				}
			}

			// shouldComponentUpdate(nextProps, nextState) {
			//   if(nextProps.posts && JSON.stringify(nextProps.posts) !== JSON.stringify(this.props.posts) ) {
			//     return true;
			//   }
			//   if (
			//     JSON.stringify(nextProps.attributes) ===
			//     JSON.stringify(this.props.attributes)
			//   ) {
			//     return false;
			//   }
			//   return true;
			// }

			copyAttributes = () => {
				const {
					attributes,
					attributes: { qubelyStyleAttributes },
				} = this.props;
				const { copyToClipboard } = wp.qubelyComponents.HelperFunction;
				let template = {};
				qubelyStyleAttributes.forEach((key) => {
					template[key] = attributes[key];
				});

				copyToClipboard(JSON.stringify(template));
			};
			render() {
				const {
					clientId,
					attributes: { showCopyAttr },
				} = this.props;
				let obj = this.props;
				obj.attributes.uniqueId = clientId.substr(0, 6);
				return (
					<Fragment>
						{showCopyAttr && (
							<BlockControls>
								<PluginBlockSettingsMenuItem
									icon={"editor-code"}
									label={"Copy Attributes"}
									onClick={() => this.copyAttributes()}
								/>
							</BlockControls>
						)}
						<OriginalComponent {...obj} {...this.state} setState={this.setState} />
					</Fragment>
				);
			}
		};
	}, "withCSSGenerator");
}
