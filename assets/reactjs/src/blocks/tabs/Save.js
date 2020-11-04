import classnames from 'classnames';
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.qubelyComponents;

class Save extends Component {

    render() {
        const {
            attributes: {
                uniqueId,
                className,
                tabs,
                autoSwithcing,
                showProgressBar,
                defaultDelay,
                tabStyle,
                tabTitles,
                iconPosition,
                navAlignment,
                animation,
                interaction
            }
        } = this.props;

        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

        const renderTabTitles = () => {
            return tabTitles.map((title, index) =>
                <div className={`qubely-tab-item ${(index == 0) ? 'qubely-active' : ''}`}{...(autoSwithcing && { 'data-customdelay': typeof title.delay !== 'undefined' ? title.delay : defaultDelay })}>
                    <span class={`qubely-tab-title ${title.iconName ? 'qubely-has-icon-' + iconPosition : ''}`} role="button">
                        {title.iconName && (iconPosition == 'top' || iconPosition == 'left') && (<i className={`qubely-tab-icon ${title.iconName}`} />)}
                        {title.title}
                        {title.iconName && (iconPosition == 'right') && (<i className={`qubely-tab-icon ${title.iconName}`} />)}
                    </span>
                    {
                        (autoSwithcing && showProgressBar) &&
                        <div className="progress" style={{ width: '0%', transition: typeof title.delay === 'undefined' ? defaultDelay : title.delay + 's' }} />
                    }
                </div>
            );
        }

        const blockWrapperClasses = classnames(
            { [`qubely-block-${uniqueId}`]: typeof uniqueId !== 'undefined' },
            { 'with-auto-swithing': autoSwithcing },
            { [className]: typeof className !== 'undefined' }
        )
        const blockClasses = classnames(
            'qubely-block-tab',
            `${interactionClass}`,
            `qubely-tab-style-${tabStyle}`,
            { 'with-auto-swithing': autoSwithcing },
        )

        return (
            <div
                className={blockWrapperClasses}
                {...animationAttr(animation)}
            >
                <div className={blockClasses}{...(autoSwithcing && { 'data-defaultdelay': defaultDelay, 'data-tabs': tabs })}>
                    <div className={`qubely-tab-nav qubely-alignment-${navAlignment}`}>
                        {renderTabTitles()}
                    </div>
                    <div className={`qubely-tab-body`}>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        );
    }
}
export default Save;