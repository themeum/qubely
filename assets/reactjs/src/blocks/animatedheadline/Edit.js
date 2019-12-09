const {RichText} = wp.editor
const { __ } = wp.i18n
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment } = wp.element
const { PanelBody, TextareaControl, SelectControl } = wp.components;

class Edit extends Component {

    constructor(props) {
        super(props);
        this._handleTextChange = this._handleTextChange.bind(this)
        this._getAnimationClass = this._getAnimationClass.bind(this)
        this._handleTypeChange = this._handleTypeChange.bind(this)
        this.timer = 0;
        this.state = {
            animationClass: this._getAnimationClass(this.props.attributes.animationType)
        }
    }

    componentDidMount(){
      this.anim  = new animatedHeading({ heading: $(this.animatedHeading)})
    }

    _handleTextChange(val) {
        return this.props.setAttributes({ animatedText: val.split('\n') })
    }

    componentDidUpdate(prevProps, prevState) {
        const { animationType } = this.props.attributes
        const { attributes } = prevProps
        if (animationType !== attributes.animationType) {
            if (this.anim) {
                this.anim.destroy();
                delete this.anim;
                if (this.timer > 0 ){
                    clearTimeout(this.timer);
                    this.timer = 0;
                }
                setTimeout(()=>{
                    this.anim = new animatedHeading({ heading: $(this.animatedHeading)})
                },100)
                
            }
        }
    }

    _handleTypeChange(val) {
        this.setState({ animationClass: this._getAnimationClass(val) })
        this.props.setAttributes({ animationType: val })
    }
    _getAnimationClass(value = '') {
        let animationClass = ''
        switch (value) {
            case 'blinds':
                animationClass = 'letters animation-blinds'
                break
            case 'delete-typing':
                animationClass = 'letters type'
                break
            case 'flip':
                animationClass = 'text-animation-flip'
                break
            case 'fade-in':
                animationClass = 'zoom'
                break
            case 'loading-bar':
                animationClass = 'loading-bar'
                break
            case 'scale':
            case 'slide':
                animationClass = 'letters scale'
                break
            case 'push':
                animationClass = 'push'
                break
            case 'wave':
                animationClass = 'letters animation-wave'
                break
            default:
                animationClass = 'text-clip'
        }

        return animationClass
    }

    render() {
        const { className, attributes: {animatedText, titleBefore, titleAfter, animationType}, setAttributes } = this.props
        
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Animated Text">
                        <TextareaControl
                            onChange={val => this._handleTextChange(val)}
                            label={__('Animated Text')}
                            value={animatedText.join('\n')}
                            help={__('Set your desired message after successful form submission. Leave blank for default.')}
                        />

                        <SelectControl
                            label={__('Animation Type')}
                            value={animationType}
                            options={[
                                { label: __('Blinds'), value: 'blinds' },
                                { label: __('Clip'), value: 'clip' },
                                { label: __('Delete Typing'), value: 'delete-typing' },
                                { label: __('Flip'), value: 'flip' },
                                { label: __('Fade In'), value: 'fade-in' },
                                { label: __('Loading Bar'), value: 'loading-bar' },
                                { label: __('Scale'), value: 'scale' },
                                { label: __('Slide'), value: 'slide' },
                                { label: __('Push'), value: 'push' },
                                { label: __('Twist/Wave'), value: 'wave' },
                            ]}
                            onChange={val => this._handleTypeChange(val) }
                        />

                    </PanelBody>
                </InspectorControls>

                <div className={`qubely-addon-animated-heading ${className}`} >
                    <h2 className={`animated-heading-text ${this.state.animationClass}`} ref={el => this.animatedHeading = el}>
                        <RichText
                            placeholder="Before"
                            value={titleBefore}
                            onChange={ ( titleBefore ) => setAttributes( { titleBefore } ) }
                            className="animated-heading-before-part"
                        />

                        <span className="animated-text-words-wrapper">
                            {
                                animatedText.map((item, index) => {
                                    let isVisible = index === 0 ? 'is-visible' : 'is-hidden'
                                    let className = `animated-text ${isVisible}`
                                    return <span className={className}>{item}</span>
                                })
                            }
                        </span>

                        <RichText
                            placeholder="After"
                            value={titleAfter}
                            onChange={ ( titleAfter ) => setAttributes( { titleAfter } ) }
                            className="animated-heading-after-part"
                        />
                    </h2>
                </div>

            </Fragment>
        );
    }
}

export default Edit;
