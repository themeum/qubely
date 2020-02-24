import { generateCSS, updateCSS } from './generateCSS';
const { Fragment, Component } = wp.element;
const diff = require("deep-object-diff").diff;
const { PluginBlockSettingsMenuItem } = wp.editPost;
const { InspectorControls, BlockControls, RichText } = wp.blockEditor

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
                const { attributes, attributes: { uniqueId } } = this.props;
                const blockAttributes = wp.blocks.getBlockType(this.props.name).attributes;
                let responsiveCSS = {}, nonResponsiveCSS = {};

                const saveinState = (value => {
                    responsiveCSS = value.responsiveCSS;
                    nonResponsiveCSS = value.nonResponsiveCSS;
                    this.setState({
                        responsiveCSS: value.responsiveCSS,
                        nonResponsiveCSS: value.nonResponsiveCSS,
                    })
                });

                generateCSS(blockAttributes, attributes, value => saveinState(value));

                if (uniqueId) {
                    this.saveCSS(responsiveCSS, nonResponsiveCSS)
                }
            }
            saveCSS = (responsiveCSS, nonResponsiveCSS) => {

                let _CSS = '';
                const { attributes: { uniqueId } } = this.props;
                const nonResponsiveAttributes = Object.keys(nonResponsiveCSS);
                const responsiveAttributes = Object.keys(responsiveCSS);

                if (nonResponsiveAttributes.length > 0) {
                    nonResponsiveAttributes.forEach(attr => {
                        if (nonResponsiveCSS[attr]) {
                            if (typeof nonResponsiveCSS[attr] === 'array') {
                                _CSS += nonResponsiveCSS[attr].join(' ');
                            } else {
                                _CSS += nonResponsiveCSS[attr];
                            }
                        }
                    });
                }
                if (responsiveAttributes.length > 0) {
                    responsiveAttributes.forEach(attr => {
                        const currentAttribute = responsiveCSS[attr];
                        let attbrTypes = Object.keys(currentAttribute);
                        attbrTypes.forEach(key => {
                            if (key !== 'nonResponsiveCSS' && typeof currentAttribute[key] === 'object' && Object.keys(currentAttribute[key]).length > 0) {
                                if (currentAttribute[key].hasOwnProperty('md') && typeof currentAttribute[key].md !== 'undefined') {
                                    _CSS += currentAttribute[key].md;
                                } else if (currentAttribute[key].hasOwnProperty('sm') && typeof currentAttribute[key].sm !== 'undefined') {
                                    _CSS += '@media (max-width: 1199px) {' + currentAttribute[key].sm + '}';
                                } else if (currentAttribute[key].hasOwnProperty('xs') && typeof currentAttribute[key].xs !== 'undefined') {
                                    _CSS += '@media (max-width: 991px) {' + currentAttribute[key].xs + '}';
                                }
                            } else if (key === 'nonResponsiveCSS' && currentAttribute.nonResponsiveCSS.length > 0) {
                                _CSS += currentAttribute.nonResponsiveCSS.join(' ');
                            }
                        });
                    });
                }

                _CSS = _CSS.replace(new RegExp('{{QUBELY}}', "g"), '.qubely-block-' + uniqueId)

                let styleSelector = window.document;
                if (styleSelector.getElementById('qubely-block-' + uniqueId) === null) {
                    let cssInline = document.createElement('style');
                    cssInline.type = 'text/css';
                    cssInline.id = 'qubely-block-' + uniqueId;
                    if (cssInline.styleSheet) {
                        cssInline.styleSheet.cssText = _CSS;
                    } else {
                        cssInline.innerHTML = _CSS;
                    }
                    styleSelector.getElementsByTagName("head")[0].appendChild(cssInline);
                } else {
                    styleSelector.getElementById('qubely-block-' + uniqueId).innerHTML = _CSS;
                }
            }


            componentDidUpdate(prevProps, prevState) {
                const { attributes, attributes: { uniqueId } } = this.props;
                const { responsiveCSS, nonResponsiveCSS } = this.state;
                let isLayoutChanged = false,
                    blockAttributes = wp.blocks.getBlockType(this.props.name).attributes,
                    changedAttributes = Object.keys(diff(prevProps.attributes, attributes));

                const isDuplicatingBlock = () => {
                    if (prevProps.attributes.uniqueId === uniqueId) {
                        return false
                    }
                    const allBlocks = wp.data.select('core/block-editor').getBlocks();
                    for (let index = 0; index < allBlocks.length; index++) {
                        if (allBlocks[index].attributes.uniqueId === prevProps.attributes.uniqueId) {
                            return true;
                        }
                    }
                    return false
                }

                if (changedAttributes.length > 0) {
                    if (changedAttributes.indexOf('layout') !== -1 || changedAttributes.indexOf('style') !== -1 || changedAttributes.indexOf('fillType') !== -1 || changedAttributes.indexOf('iconStyle') !== -1 || changedAttributes.indexOf('buttonFillType') !== -1 || changedAttributes.indexOf('tabStyle') !== -1) {
                        isLayoutChanged = true;
                        this.saveStyleAttributes();
                    }

                    if (!isLayoutChanged) {

                        if (changedAttributes.indexOf('uniqueId') !== -1) {
                            let currentStyleElement = window.document.getElementById('qubely-block-' + prevProps.attributes.uniqueId);
                            if (currentStyleElement && !isDuplicatingBlock()) {
                                currentStyleElement.id = 'qubely-block-' + attributes.uniqueId;
                                let newStyle = currentStyleElement.innerHTML.replace(new RegExp(`${prevProps.attributes.uniqueId}`, "g"), `${attributes.uniqueId}`);
                                currentStyleElement.innerHTML = newStyle;
                            } else {
                                this.saveCSS(responsiveCSS, nonResponsiveCSS);
                            }
                        }

                        changedAttributes = changedAttributes.filter(attr => attr !== 'uniqueId');

                        let newState = {
                            nonResponsiveCSS: nonResponsiveCSS,
                            responsiveCSS: responsiveCSS
                        };

                        if (changedAttributes.length > 0) {
                            const updateState = (attribute, key, value) => {
                                if (typeof key === 'undefined') {
                                    newState = {
                                        ...newState,
                                        nonResponsiveCSS: {
                                            ...newState.nonResponsiveCSS,
                                            ...{ [attribute]: value }
                                        }
                                    }
                                } else {
                                    newState = {
                                        ...newState,
                                        responsiveCSS: {
                                            ...newState.responsiveCSS,
                                            ...{
                                                [attribute]: {
                                                    ...newState.responsiveCSS[attribute],
                                                    ...(key === 'simple') ?
                                                        {
                                                            simple: value
                                                        } :
                                                        {
                                                            ...value
                                                        }
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                            changedAttributes.forEach(changedAttribute => {
                                updateCSS(blockAttributes, attributes, (attribute, key, value) => updateState(attribute, key, value), changedAttribute);
                                this.saveCSS(newState.responsiveCSS, newState.nonResponsiveCSS, 'update');
                            });
                            this.setState({
                                responsiveCSS: newState.responsiveCSS,
                                nonResponsiveCSS: newState.nonResponsiveCSS
                            });
                        }

                    }

                }
            }

            copyAttributes = () => {
                const {
                    attributes,
                    attributes: {
                        qubelyStyleAttributes
                    }
                } = this.props;
                const { copyToClipboard } = wp.qubelyComponents.HelperFunction;
                let template = {}
                qubelyStyleAttributes.forEach(key => {
                    template[key] = attributes[key]
                })

                copyToClipboard(JSON.stringify(template))

            }
            render() {
                const { attributes: { showCopyAttr } } = this.props;
                return (
                    <Fragment>
                        {
                            showCopyAttr &&
                            <BlockControls>
                                <PluginBlockSettingsMenuItem
                                    icon={'editor-code'}
                                    label={'Copy Attributes'}
                                    onClick={() => this.copyAttributes()}
                                />
                            </BlockControls>
                        }
                        <OriginalComponent
                            {...this.props}
                            {...this.state}
                            setState={this.setState}
                        />
                    </Fragment>

                );
            }
        };
    }, 'withCSSGenerator');
}
