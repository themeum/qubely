import './style.scss';
import Save from './Save';
import Edit from './Edit';
import attributes from './attributes';
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.qubelyComponents;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('qubely/tabs', {
    title: __('Tabs'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-tabs.svg'} alt={__('Tabs Block')} />,
    description: __('Showcase features in beautiful pre-designed tabs with Qubely Tabs.'),
    supports: {
        html: false,
        className: false,
        align: [
            'full',
            'wide',
            'center'
        ],
    },
    example: {
        attributes: {
            tabTitles: [
                { title: "Tab 1" },
                { title: "Tab 2" },
                { title: "Tab 3" }
            ]
        },
        innerBlocks: [
            {
                name: 'qubely/tab',
                innerBlocks: [
                    {
                        name: 'qubely/heading',
                        attributes: {
                            content: 'Qubely - A Full-fledged Gutenberg Builder',
                            alignment: { md: "center" }
                        },
                    },
                ],
            }
        ],
    },
    attributes,
    edit: Edit,
    save: Save,
    deprecated: [
        {
            attributes,
            save(props) {
                const {
                    attributes: {
                        uniqueId,
                        tabStyle,
                        tabTitles,
                        iconPosition,
                        navAlignment,
                        animation,
                        interaction
                    }
                } = props;

                const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

                const renderTabTitles = () => {
                    return tabTitles.map((title, index) =>
                        <span className={`qubely-tab-item ${(index == 0) ? 'qubely-active' : ''}`}>
                            <span class={`qubely-tab-title ${title.iconName ? 'qubely-has-icon-' + iconPosition : ''}`} role="button">
                                {title.iconName && (iconPosition == 'top' || iconPosition == 'left') && (<i className={`qubely-tab-icon ${title.iconName}`} />)}
                                {title.title}
                                {title.iconName && (iconPosition == 'right') && (<i className={`qubely-tab-icon ${title.iconName}`} />)}
                            </span>
                        </span>
                    );
                }
                return (
                    <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                        <div className={`qubely-block-tab ${interactionClass} qubely-tab-style-${tabStyle}`}>
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
        },
    ]
})