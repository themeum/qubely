const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr, IsInteraction } } = wp.qubelyComponents

class Save extends Component {

    renderTabTitles = () => {
        const { tabTitles, iconPosition, navText, navLayout, navSubHeading, iconType, enableIcon, navTextAlignment } = this.props.attributes
        return tabTitles.map((title, index) => {
            const buttonClass = `qubely-vertical-tab-item-button ${enableIcon ? 'qubely-has-icon-' + iconPosition : ''}`
            const hasIcon = title.iconName !== 0 && title.iconName !== undefined && title.iconName.toString().trim() !== ''
            const IconImage = () => {
                return <div className={'qubely-icon-image qubely-vertical-tab-icon ' + ((title.image !== undefined && title.image.url) ? '' : 'qubely-vertical-placeholder')}>
                    {
                        title.image !== undefined && title.image.url ? (
                            <img
                                className="qubely-vertical-tab-image"
                                src={title.image.url}
                                alt={title.imageAlt && title.imageAlt}
                                srcSet={title.image2x !== undefined && title.image2x.url ? title.image.url + ' 1x, ' + title.image2x.url + ' 2x' : ''}
                            />
                        ) : (
                            <span className="far fa-image"/>
                        )
                    }
                </div>
            }
            const IconFont = () => hasIcon ? <span className={`qubely-vertical-tab-icon ${title.iconName}`} /> : ''
            const Icon = () => enableIcon ? (iconType === 1 ? <IconFont /> : <IconImage />) : ''
            return (
                <div class={`qubely-vertical-tab-item ${(index === 0) ? 'qubely-vertical-active' : ''}`}>
                    <div className={buttonClass}>
                        {
                            (navLayout === 2 && iconPosition === 'left') && <Icon />
                        }
                        <div className={`qubely-vertical-tab-item-content ${navTextAlignment === 'right' ? 'qubely-text-right' : ''}`}>
                            <h5 className='qubely-vertical-tab-title'>
                                {
                                    ( navLayout === 1 && iconPosition === 'left') && <Icon />
                                }
                                <div>{title.title}</div>
                                {
                                    ( navLayout === 1 && iconPosition === 'right') &&  <Icon />
                                }
                            </h5>
                            {navSubHeading && (
                                <h6 className="qubely-vertical-tab-nav-sub-heading">
                                    {title.navSubHeading}
                                </h6>
                            )}
                            {navText && (
                                <p className="qubely-vertical-tab-nav-text" style={{display: index !== 0 ? 'none': ''}}>{title.navText}</p>
                            )}
                        </div>
                        {
                            (navLayout === 2 && iconPosition === 'right') &&  <Icon />
                        }
                    </div>
                </div>
            )
        })
    }

    render() {
        const { uniqueId, tabs, tabStyle, navAlignment, animation, interaction } = this.props.attributes
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        let iterator = [], index = 0
        while (index < tabs) {
            iterator.push(index)
            index++
        }
        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`qubely-block-vertical-tab ${interactionClass} qubely-vertical-tab-style-${tabStyle} qubely-alignment-${navAlignment}`}>
                    <div className={`qubely-vertical-tab-nav`}>
                        {this.renderTabTitles(iterator)}
                    </div>
                    <div className={`qubely-vertical-tab-body`}>
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Save