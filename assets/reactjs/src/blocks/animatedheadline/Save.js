const { Component } = wp.element
const { RichText } = wp.editor
class Save extends Component {

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
            attributes: {
                uniqueId,
                animatedText,
                titleBefore,
                titleAfter,
                animationType

            }
        } = this.props

        return (
            <div className={`qubely-block-${uniqueId} qubely-addon-animated-heading ${className ? className : ''}`} >
                <h2 className={`animated-heading-text ${this._getAnimationClass(animationType)}`} ref={el => this.animatedHeading = el}>
                    <RichText.Content
                        tagName='div'
                        value={titleBefore}
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

                    <RichText.Content
                        tagName='div'
                        value={titleAfter}
                        className="animated-heading-after-part"
                    />
                </h2>
            </div>
        );
    }
}

export default Save;
