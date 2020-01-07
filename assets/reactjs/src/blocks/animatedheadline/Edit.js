const { RichText } = wp.editor
const { __ } = wp.i18n
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment } = wp.element
const { PanelBody, SelectControl, FormTokenField } = wp.components;
const {
    Color,
    ColorAdvanced,
    Padding,
    BoxShadow,
    Tabs,
    Tab,
    Border,
    BorderRadius,
    Background,
    Typography,
    gloalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    Inline: {
        InlineToolbar
    },
    CssGenerator: {
        CssGenerator
    }
} = wp.qubelyComponents

class Edit extends Component {

    constructor(props) {
        super(props);
        this._getAnimationClass = this._getAnimationClass.bind(this)
        this._handleTypeChange = this._handleTypeChange.bind(this)
        this.timer = 0;
        this.state = {
            device: 'md',
            animationClass: this._getAnimationClass(this.props.attributes.animationType)
        }
    }
    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
        this.anim = new window.animatedHeading({ heading: $(this.animatedHeading) })
    }

    componentDidUpdate(prevProps, prevState) {
        const { animationType } = this.props.attributes
        const { attributes } = prevProps
        if (animationType !== attributes.animationType) {
            if (this.anim) {
                this.anim.destroy();
                delete this.anim;
                if (this.timer > 0) {
                    clearTimeout(this.timer);
                    this.timer = 0;
                }
                setTimeout(() => {
                    this.anim = new window.animatedHeading({ heading: $(this.animatedHeading) })
                }, 100)

            }
        }
    }

    _handleTypeChange(val) {
        const { attributes: { animatedTextColor }, setAttributes } = this.props
        this.setState({ animationClass: this._getAnimationClass(val) })
        setAttributes(!(val === 'clip' || val === 'flip' || val === 'fade-in' || val === 'loading-bar' || val === 'push') ? { animationType: val, animatedTextColor: { ...animatedTextColor, type: 'color' } } : { animationType: val })
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
        const {
            className,
            setAttributes,
            attributes: {
                uniqueId,
                animatedText,
                titleBefore,
                titleAfter,
                animationType,

                typography,
                color,
                animatedTextColor,
                animatedTextBgColor,
                animatedTextTypography,
                animatedTextPadding,
                animatedTextBorderRadius,

                animation,
                interaction,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss

            }
        } = this.props

        const { device, animationClass } = this.state

        if (uniqueId) { CssGenerator(this.props.attributes, 'animatedheadline', uniqueId); }

        let gradientTextColor = animationType === 'clip' || animationType === 'flip' || animationType === 'fade-in' || animationType === 'loading-bar' || animationType === 'push'

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Animated Text">
                        <FormTokenField
                            label={__('Animated Texts')}
                            value={animatedText}
                            placeholder={__("Add new text")}
                            onChange={tokens => setAttributes({ animatedText: tokens })}
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
                            onChange={val => this._handleTypeChange(val)}
                        />
                        {
                            gradientTextColor ?
                                <ColorAdvanced
                                    textColor
                                    label={__('Aniamated-text Color')}
                                    value={animatedTextColor}
                                    onChange={val => setAttributes({ animatedTextColor: val })}
                                />
                                :
                                <Color label={__('Aniamated-text Color')} value={animatedTextColor.color} onChange={val => setAttributes({ animatedTextColor: { ...animatedTextColor, color: val } })} />
                        }
                        <ColorAdvanced
                            textColor
                            label={__('Background')}
                            value={animatedTextBgColor}
                            onChange={val => setAttributes({ animatedTextBgColor: val })}
                        />

                        <Typography
                            device={device}
                            label={__('Typography')}
                            value={animatedTextTypography}
                            onChange={value => setAttributes({ animatedTextTypography: value })}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Padding
                            label={__('Padding')}
                            value={animatedTextPadding}
                            min={0}
                            max={300}
                            responsive
                            device={device}
                            unit={['px', 'em', '%']}
                            onChange={val => setAttributes({ animatedTextPadding: val })}
                            onDeviceChange={value => this.setState({ device: value })}
                        />

                    </PanelBody>

                    <PanelBody title={__('Design')} initialOpen={false}>
                        <Typography
                            device={device}
                            value={typography}
                            label={__('Typography')}
                            onChange={(value) => setAttributes({ typography: value })}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Color label={__('Color')} value={color} onChange={val => setAttributes({ color: val })} />
                    </PanelBody>

                    {animationSettings(uniqueId, animation, setAttributes)}

                    {interactionSettings(uniqueId, interaction, setAttributes)}
                </InspectorControls>
                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}
                <div className={`qubely-block-${uniqueId} qubely-addon-animated-heading ${className}`} >
                    <h2 className={`animated-heading-text ${animationClass}`} ref={el => this.animatedHeading = el}>
                        <RichText
                            placeholder={__("Before")}
                            value={titleBefore}
                            keepPlaceholderOnFocus
                            onChange={(titleBefore) => setAttributes({ titleBefore })}
                            className="animated-heading-before-part"
                        />
                        <span className="qubely-animated-text">
                            <span className="animated-text-words-wrapper">
                                {
                                    animatedText.map((item, index) => {
                                        let isVisible = index === 0 ? 'is-visible' : 'is-hidden'
                                        let className = `animated-text ${isVisible}`
                                        return <span className={className}>{item}</span>
                                    })
                                }
                            </span>
                        </span>
                        <RichText
                            placeholder={__("After")}
                            value={titleAfter}
                            keepPlaceholderOnFocus
                            onChange={(titleAfter) => setAttributes({ titleAfter })}
                            className="animated-heading-after-part"
                        />
                    </h2>
                </div>

            </Fragment>
        );
    }
}

export default Edit;
