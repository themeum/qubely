import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor
const {
    HelperFunction: {
        animationAttr,
        videoBackground
    },
} = wp.qubelyComponents;


registerBlockType('qubely/row', {
    title: __('Row'),
    category: 'qubely',
    description: 'Include unique row and column layouts with Qubely Row.',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-row.svg'} alt={__('Row Block')} />,
    supports: {
        align: ['wide', 'center', 'full'],
        html: false
    },
    keywords: [__('Row'), __('rw'), __('column'), __('Layout')],
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

