import { generateCSS, updateCSS } from "./generateCSS";
const { Fragment, Component } = wp.element;
const diff = require("deep-object-diff").diff;
const { PluginBlockSettingsMenuItem } = wp.editPost;
const { InspectorControls, BlockControls, RichText } = wp.blockEditor;

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
        const blockAttributes = wp.blocks.getBlockType(
          this.props.name
        ).attributes;

        const saveinState = (value) => {
          return;
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
        console.log(prevProps.attributes, this.props.attributes);
        console.log(
          prevProps.attributes.alignment,
          this.props.attributes.alignment
        );
        console.log(
          this.props.name + " ==>> " + this.props.attributes.uniqueId
        );

        this.saveCSS();
      }

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
          attributes: { showCopyAttr },
        } = this.props;
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
            <OriginalComponent
              {...this.props}
              {...this.state}
              setState={this.setState}
            />
          </Fragment>
        );
      }
    };
  }, "withCSSGenerator");
}
