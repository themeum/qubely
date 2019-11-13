import Edit from './Edit'
import Save from './Save'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr, videoBackground }, gloalSettings: { globalAttributes } } = wp.qubelyComponents

const attributes = {
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,  // Global Settings
    columns: { type: 'number', default: '' },
    childRow: { type: 'boolean', default: false },
    // Dimension
    padding: {
        type: 'object',
        default: {
            md: {
                top: 70,
                right: 0,
                bottom: 70,
                left: 0
            },
            unit: 'px',
        },
        style: [{ selector: '{{QUBELY}}.qubely-section {padding: {{padding}};}' }]
    },

    marginTop: { type: 'object', default: { md: 0, unit: 'px' }, style: [{ selector: '{{QUBELY}}.qubely-section{ margin-top:  {{marginTop}}; }' }] },
    marginBottom: { type: 'object', default: { md: 0, unit: 'px' }, style: [{ selector: '{{QUBELY}}.qubely-section{ margin-bottom:  {{marginBottom}}; }' }] },

    rowGutter: {
        type: 'object', default: { md: 30, sm: 30, xs: 30, unit: 'px' }, style: [{
            selector:
                '{{QUBELY}} .qubely-container {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                '{{QUBELY}} .qubely-row {margin-left: calc(-{{rowGutter}}/2); margin-right: calc(-{{rowGutter}}/2);}' +
                '{{QUBELY}} .qubely-row > .qubely-column {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                '{{QUBELY}} .qubely-row * > [data-type="qubely/column"] {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                '.components-resizable-box__container.qubely-column-resizer.is-selected-column > span > .components-resizable-box__handle, ' +
                'div[data-type="qubely/row"].is-selected .components-resizable-box__container.qubely-column-resizer > span > .components-resizable-box__handle,' +
                'div[data-type="qubely/row"].is-resizing .components-resizable-box__container.qubely-column-resizer > span > .components-resizable-box__handle {right: calc(-{{rowGutter}}/2);}'
        }]
    },

    rowContainerWidth: {
        type: 'string',
        default: 'boxed'
    },

    rowContainer: {
        type: 'number',
        default: 1140,
        style: [
            {
                condition: [
                    { key: 'align', relation: '==', value: 'full' },
                    { key: 'rowContainerWidth', relation: '==', value: 'boxed' },
                ],
                selector: '@media (min-width: 1200px) {{{QUBELY}} .qubely-container {max-width: {{rowContainer}}px;}}'
            }
        ]
    },
    position: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-row, {{QUBELY}} .qubely-row .editor-block-list__layout {-webkit-box-align: {{position}}; -ms-flex-align: {{position}}; align-items: {{position}}; }' }] },

    // Background
    rowBg: { type: 'object', default: { bgimgPosition: 'center center', bgimgSize: 'cover', bgimgRepeat: 'no-repeat', bgDefaultColor: '#f5f5f5' }, style: [{ selector: '{{QUBELY}}.qubely-section' }] },
    heightOptions: { type: 'string', default: 'auto' },
    rowHeight: {
        type: 'object', default: {},
        style: [
            {
                condition: [
                    { key: 'heightOptions', relation: '==', value: 'custom' },
                ],
                selector: '{{QUBELY}} .qubely-row {min-height: {{rowHeight}};}'
            }
        ]
    },

    borderRadius: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{QUBELY}}.qubely-section, {{QUBELY}}.qubely-section .qubely-video-bg-wrap, {{QUBELY}}.qubely-section .qubely-row-overlay'
            }
        ]
    },

    rowShadow: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}}.qubely-section' }] },
    border: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{QUBELY}}.qubely-section'
            }
        ]
    },

    // Overlay
    enableRowOverlay: { type: 'boolean', default: false },
    rowOverlay: {
        type: 'object',
        default: {},
        style: [
            {
                condition: [
                    { key: 'enableRowOverlay', relation: '==', value: true },
                ],
                selector: '{{QUBELY}} >.qubely-row-overlay'
            }
        ]
    },
    rowBlend: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} >.qubely-row-overlay { mix-blend-mode: {{rowBlend}}; }' }] },
    rowOpacity: { type: 'number', default: '.8', style: [{ selector: '{{QUBELY}} >.qubely-row-overlay {opacity: {{rowOpacity}}; }' }] },

    // Divider
    shapeTop: {
        type: 'object',
        default: {
            color: '#006fbf',
            width: { unit: '%' },
            height: { unit: 'px' },
        },
        style: [{ selector: '{{QUBELY}} .qubely-shape-divider.qubely-top-shape' }]
    },
    shapeBottom: {
        type: 'object',
        default: {
            color: '#006fbf',
            width: { unit: '%' },
            height: { unit: 'px' }
        },
        style: [{ selector: '{{QUBELY}} .qubely-shape-divider.qubely-bottom-shape' }]
    },

    // Responsive
    hideTablet: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}.qubely-section{ display:none; }' }] },
    hideMobile: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}.qubely-section{ display:none; }' }] },

    // Advanced Settings
    rowId: { type: 'string', default: '' },
    rowZindex: { type: 'number', default: '', style: [{ selector: '{{QUBELY}}.qubely-section{z-index:{{rowZindex}};}' }] },
    rowReverse: {
        type: 'object',
        default: { openRowReverse: false, values: {} },
        style: [{ selector: '{{QUBELY}}.qubely-section >.qubely-container >.qubely-row,{{QUBELY}}.qubely-section >.qubely-container-fluid >.qubely-row, {{QUBELY}} >.qubely-container-fluid >.qubely-row > .editor-inner-blocks > .editor-block-list__layout, {{QUBELY}} >.qubely-container >.qubely-row > .editor-inner-blocks > .editor-block-list__layout' }]
    },

    rowCss: { type: 'string', default: '', style: [{ selector: '' }] },
};

registerBlockType('qubely/row', {
    title: __('Row'),
    category: 'qubely',
    description: 'Include unique row and column layouts with Qubely Row.',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-row.svg'} alt={__('Row Block')} />,
    supports: { align: ['wide', 'center', 'full'] },
    keywords: [__('Row'), __('rw'), __('Layout')],
    example: {
        attributes: {},
    },
    attributes,
    edit: Edit,
    save: Save,
    deprecated: [
        {
            attributes,

            save(props) {
                const { attributes: { uniqueId, animation, rowId, rowBg, shapeTop, shapeBottom, align, heightOptions, rowContainerWidth } } = props
                return (
                    <div className={`qubely-section qubely-block-${uniqueId} ${(rowBg.bgimgParallax && rowBg.bgimgParallax == 'animated') ? 'qubely-section-parallax' : ''}`} {...rowId ? { id: rowId } : ''} {...animationAttr(animation)}>

                        {(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
                            <div className="qubely-shape-divider qubely-top-shape" dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeTop.style] }} />
                        }
                        {(Object.entries(rowBg).length > 0 && rowBg.openBg == 1 && rowBg.bgType == 'video') &&
                            videoBackground(rowBg, 'row')
                        }
                        {(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
                            <div className="qubely-shape-divider qubely-bottom-shape" dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeBottom.style] }} />
                        }
                        <div className="qubely-row-overlay"></div>
                        <div className={`${align == 'full' ? ((rowContainerWidth == 'boxed') ? 'qubely-container' : 'qubely-container-fluid') : 'qubely-container-fluid'}`}>
                            <div className={`qubely-row ${(heightOptions == 'window') ? 'qubely-row-height-window' : ''}`}>
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                )

            }
        }
    ]
});

