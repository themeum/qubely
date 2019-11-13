import './style.scss'
import Edit from './Edit'
import Save from './Save';
import svg from '../heading/separators';
const { __ } = wp.i18n
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes }, HelperFunction: { animationAttr } } = wp.qubelyComponents

registerBlockType('qubely/text', {
    title: __('Advanced Text'),
    description: 'Apply texts and tweak designs with Qubely Advanced Text.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-text.svg'} alt={__('Advanced Text Block')} />,
    supports: { align: false },
    keywords: [__('text'), __('paragraph'), __('heading')],
    example: {
		attributes: {
            enableTitle: true,
            title: __( 'Advanced Text Block', 'qubely' ),
            dropCap: true,
			content: __( 'Qubely blocks is added to the Gutenberg editor as soon as you install the plugin. You can start using it as any other Gutenberg block. Add ready blocks using the plus sign where you’ll find a new section of blocks under the Qubely icon.', 'qubely' ),
		},
	},
    attributes: {
        uniqueId: { type: 'string', default: '' },
        // Global
        ...globalAttributes,
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{QUBELY}}' }] },
        content: {
            type: 'string',
            source: 'html',
            selector: '.qubely-block-text> *:last-child',
            default: 'Qubely blocks is added to the Gutenberg editor as soon as you install the plugin. You can start using it as any other Gutenberg block. Add ready blocks using the plus sign where you’ll find a new section of blocks under the Qubely icon.'
        },
        alignment: { type: 'object', default: { md: 'left' }, style: [{ selector: '{{QUBELY}} .qubely-block-text {text-align: {{alignment}}; }' }] },
        selector: { type: 'string', default: 'p' },
        dropCap: { type: 'boolean', default: false },
        dropCapSize: {
            type: 'object', default: { md: 48, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'dropCap', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text p::first-letter, {{QUBELY}} .qubely-block-text .editor-rich-text p::first-letter {font-size: {{dropCapSize}};}'
                }
            ]
        },
        dropCapColor: {
            type: 'string', default: '#2962FF',
            style: [
                {
                    condition: [
                        { key: 'dropCap', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text p::first-letter, {{QUBELY}} .qubely-block-text .editor-rich-text p::first-letter {color: {{dropCapColor}};}'
                }
            ]
        },
        dropCapSpacing: {
            type: 'object', default: { md: 15, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'dropCap', relation: '==', value: true }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text p::first-letter, {{QUBELY}} .qubely-block-text .editor-rich-text p::first-letter {margin-right: {{dropCapSpacing}};}'
                }
            ]
        },


        typography: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-text, {{QUBELY}} .qubely-block-text .editor-rich-text p' }] },
        textColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-text > * { color:{{textColor}}; }' }] },


        // Title
        enableTitle: { type: 'boolean', default: 1 },
        title: {
            type: 'string',
            source: 'html',
            selector: '.qubely-block-text-title',
            default: 'Advanced Text Block'
        },
        titleLevel: { type: 'number', default: 2 },
        titleTypography: { type: 'object', default: { openTypography: 1, size: { md: 24, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-block-text-title' }] },
        titleColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-text-title {color: {{titleColor}};}' }] },
        titleSpacing: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{QUBELY}} .qubely-block-text-title-inner {margin-bottom: {{titleSpacing}};}' }] },

        subTitle: { type: 'boolean', default: 0 },
        subTitleLevel: { type: 'number', default: 3 },
        subTitleContent: {
            type: 'string',
            source: 'html',
            selector: '.qubely-block-text-sub-title',
            default: 'Sub Title'
        },
        subTitleTypography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{QUBELY}} .qubely-block-text .qubely-block-text-sub-title' }] },
        subTitleColor: {
            type: 'string', default: '#333',
            style: [
                {
                    condition: [
                        { key: 'subTitle', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text .qubely-block-text-sub-title {color: {{subTitleColor}};}'
                },
            ]
        },
        subTitleSpacing: {
            type: 'object', default: { md: 15, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'subTitle', relation: '==', value: 1 }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text .qubely-block-text-sub-title {margin-bottom: {{subTitleSpacing}};}'
                },
            ]
        },

        // Title separator
        separatorStyle: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text .qubely-separator-type-css {border-top-style: {{separatorStyle}};}'
                },
            ]
        },
        separatorPosition: { type: 'string', default: 'top' },
        separatorColor: {
            type: 'string', default: '#5D7FEB',
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text .qubely-separator-type-svg svg .qubely-separator-stroke {stroke: {{separatorColor}};} {{QUBELY}} .qubely-block-text svg .qubely-separator-fill {fill: {{separatorColor}};} {{QUBELY}} .qubely-block-text .qubely-separator-type-css {border-top-color: {{separatorColor}};}'
                },
            ]
        },
        separatorStroke: {
            type: 'number', default: 3,
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text .qubely-separator-type-svg svg .qubely-separator-stroke {stroke-width: {{separatorStroke}}px;} {{QUBELY}} .qubely-block-text .qubely-separator-type-css {border-top-width: {{separatorStroke}}px;}'
                },
            ]
        },
        separatorWidth: {
            type: 'object', default: { md: 60 },
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{QUBELY}} .qubely-block-text .qubely-separator-type-css {width: {{separatorWidth}}px;} {{QUBELY}} .qubely-block-text .qubely-separator-type-svg svg {width: {{separatorWidth}}px;}'
                },
            ]
        },
        separatorSpacing: {
            type: 'object', default: { md: 10 },
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'left' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-right: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'right' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-left: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'leftright' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator-before {margin-right: {{separatorSpacing}}px;} {{QUBELY}} .qubely-separator-after {margin-left: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'top' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-bottom: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{QUBELY}} .qubely-separator {margin-top: {{separatorSpacing}}px;}'
                },
            ]
        },
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    deprecated: [
        {
            save(props) {
                const separators = {
                    solid: { type: 'css', separator: 'solid', width: 300, stroke: 10 },
                    double: { type: 'css', separator: 'double', width: 300, stroke: 10 },
                    dotted: { type: 'css', separator: 'dotted', width: 300, stroke: 10 },
                    dashed: { type: 'css', separator: 'dashed', width: 300, stroke: 10 },
                    pin: { type: 'svg', separator: 'pin', svg: svg['pin'], width: 100, stroke: 0 },
                    pin_filled: { type: 'svg', separator: 'pin_filled', svg: svg['pin_filled'], width: 100, stroke: 0 },
                    zigzag: { type: 'svg', separator: 'zigzag', svg: svg['zigzag'], style: 'fill', width: 88, stroke: 5 },
                    zigzag_large: { type: 'svg', separator: 'zigzag_large', svg: svg['zigzag_large'], style: 'fill', width: 161, stroke: 5 },
                }

                const { uniqueId, content, selector, dropCap, enableTitle, titleLevel, subTitleLevel, separatorStyle, separatorPosition, title, subTitle, subTitleContent, animation } = props.attributes
                const titleTagName = 'h' + titleLevel;
                const subTitleTagName = 'h' + subTitleLevel;

                const renderSeparators = <Fragment>
                    {separatorStyle &&
                        <Fragment>
                            {separators[separatorStyle].type == 'css' &&
                                <span className={`qubely-separator-type-css qubely-separator-${separatorStyle}`}/>
                            }
                            {separators[separatorStyle].type == 'svg' &&
                                <span className={`qubely-separator-type-svg qubely-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
                            }
                        </Fragment>
                    }
                </Fragment>

                return (
                    <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                        <div className={`qubely-block-text ${(dropCap == 1) ? 'qubely-has-drop-cap' : ''}`}>
                            {enableTitle == 1 &&
                                <div className={`qubely-block-text-title-container ${separatorStyle ? 'qubely-has-separator' : ''} ${separatorPosition ? 'qubely-separator-position-' + separatorPosition : ''}`} >
                                    <div className="qubely-block-text-title-inner">
                                        {separatorStyle && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright') ? <div className="qubely-separator qubely-separator-before">{renderSeparators}</div> : ''}
                                        <RichText.Content tagName={titleTagName} className="qubely-block-text-title" value={title} />
                                        {separatorStyle != '' && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright') ? <div className="qubely-separator qubely-separator-after">{renderSeparators}</div> : ''}
                                    </div>

                                    {subTitle == 1 &&
                                        <div className="qubely-block-text-sub-title-container" onClick={() => this.handlePanelOpenings('Sub Title')}>
                                            <RichText.Content tagName={subTitleTagName} className="qubely-block-text-sub-title" value={subTitleContent} />
                                        </div>
                                    }
                                </div>
                            }
                            <RichText.Content tagName={selector} value={content} className="qubely-block-text-content" />
                        </div>
                    </div>
                )
            }
        },
    ],
    edit: Edit,
    save: Save,
});