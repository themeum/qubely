import './style.scss';
import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const {
    HelperFunction: {
        IsInteraction
    }
} = wp.qubelyComponents;


registerBlockType('qubely/buttongroup', {
    title: __('Button Group'),
    description: 'Bunch together a group of useful buttons with Qubely Button Group.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-button-group.svg'} alt={__('Button Group Block')} className="qubely-block-icon small"/>,
    supports: {
        align: ['center', 'wide', 'full'],
        html: false,
    },
    keywords: [
        __('button'),
        __('buttons'),
        __('link'),
        __('button group')
    ],
    example: {
        attributes: {
            buttons: 2,
            alignment: {
                md: "center"
            },
            spacing: {
                md: "15",
                unit: "px"
            }
        },

    },
    attributes,
    edit: Edit,
    save: Save,
    deprecated: [
        {
            attributes,
            save(props) {
                const {
                    uniqueId,
                    interaction,
                } = props.attributes;
                
                const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
                return (
                    <div className={`qubely-block-${uniqueId}`}>
                        <div className={`qubely-block-button-group ${interactionClass}`}>
                            <InnerBlocks.Content />
                        </div>
                    </div>
                )
            }
        }
    ]
});