const {RichText} = wp.editor
const { __ } = wp.i18n
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment } = wp.element
const { PanelBody, TextareaControl } = wp.components;

class Edit extends Component {

    componentDidMount() {
        this.$el = $(this.el)
        console.log(this.$el)
        this.$el.animatedHeadline({
            animationType: 'rotate-3'
        })
    }

    render() {
        const { className, attributes, attributes: {animatedText, titleBefore, titleAfter}, setAttributes } = this.props

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Animated Text">
                        <TextareaControl
                            label={__('Form Submit Success Message')}
                            value={animatedText.join('\n')}
                            onChange={val => setAttributes({ animatedText: val.split('\n') })}
                            help={__('Set your desired message after successful form submission. Leave blank for default.')}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className={`qubely-animated-heading-wrap ${className}`} ref={el => this.el = el} >
                    <h1 className="qubely-animated-heading ah-headline">
                        <RichText
                            placeholder="Before"
                            value={titleBefore}
                            onChange={ ( titleBefore ) => setAttributes( { titleBefore } ) }
                        />
                        <span class="ah-words-wrapper">
                            {
                                animatedText.map((item, index) => <b class={index === 0 ? 'is-visible' : ''}>{item}</b>)
                            }
                        </span>
                        <RichText
                            placeholder="After"
                            value={titleAfter}
                            onChange={ ( titleAfter ) => setAttributes( { titleAfter } ) }
                        />
                    </h1>
                </div>
            </Fragment>
        );
    }
}

export default Edit;
