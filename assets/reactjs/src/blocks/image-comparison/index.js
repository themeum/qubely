import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const {
    gloalSettings: { globalAttributes },
} = wp.qubelyComponents

const attributes = {

    uniqueId: {
        type: 'string',
        default: ''
    },
    recreateStyles: {
        type: 'boolean',
        default: true
    },
    ...globalAttributes,
    spacer: {
        type: 'object',
        default: {
            spaceTop: {
                md: '10',
                unit: "px"
            },
            spaceBottom: {
                md: '10',
                unit: "px"
            }
        },
        style: [
            { selector: '{{QUBELY}}' }
        ]
    },
    // original image
    imgSize: {
        type: 'string',
        default: 'full'
    },
	image: {
		type: 'object',
		default: {}
	},
    imageType: {
        type: 'string',
        default: 'local'
    },
    externalImageUrl: {
        type: 'object',
        default: {}
    },
    imageUrl: { type: 'object', default: {} },
    // modified image
    image2x: {
        type: 'object',
        default: {}
    },
    imgAlt: {
        type: 'string',
        default: ''
    },
    imgSize2: {
        type: 'string',
        default: 'full'
    },
	image2: {
		type: 'object',
		default: {}
	},
    imageType2: {
        type: 'string',
        default: 'local'
    },
    externalImageUrl2: {
        type: 'object',
        default: {}
    },
    image2_2x: {
        type: 'object',
        default: {}
    },
    imageUrl2: { type: 'object', default: {} },
    imgAlt2: {
        type: 'string',
        default: ''
    },

    // Title
    originalTitle: {
        type: 'string',
        default: 'Original',
    },
    titleLevel: {
        type: 'number',
        default: 3
    },
    originalTitleTypography: {
        type: 'object',
        default: {
            openTypography: 1,
            size: {
                md: 30,
                unit: 'px'
            }
        },
        style: [{
            selector: '{{QUBELY}} .comparison-image-text'
        }]
    },
    originalTitleColor: {
        type: 'string',
        default: '#FFF',
        style: [{
            selector: '{{QUBELY}} .comparison-image-text {color: {{originalTitleColor}};}'
        }]
    },
    modifiedTitle: {
        type: 'string',
        default: 'Modified'
    },

    // circle
    circleBackground: {
        type: 'string',
        default: '#dc717d',
        style: [{
            selector: '{{QUBELY}} .comparison-scrollCircle  {background-color: {{circleBackground}};}'
        }]
    },
    circleWidth: {
        type: 'number',
        default: 40,
        style: [
            {
                selector: '{{QUBELY}} .comparison-scrollCircle {width: {{circleWidth}}px;height: {{circleWidth}}px;}'
            }
        ],
    },

    disableTitle: {
        type: 'boolean',
        default: true
    },

    titleVerticalAlign: {
        type: 'string',
        default: 'flex-end',
        style: [
            {
                selector: '{{QUBELY}} .comparison-image-text {align-items: {{titleVerticalAlign}};}'
            }
        ]
    },
}

registerBlockType('qubely/imagecomparison', {
    title: __('Image Comparison'),
    description: __('Insert images and beautify them with Qubely Image Block.'),
    category: 'qubely',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-image.svg'} alt={__('Image')} />,
    keywords: [__('image', 'advanced image', 'fancy image'), 'image overlay'],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {
            image: { url: 'https://qubely.io/wp-content/uploads/qubely-assets/demo/image8.jpg' },
            enableCaption: true,
            imageCaption: __('Qubely is a full-fledged Gutenberg block toolkit.', 'qubely'),
        },
    },
    attributes,
    edit: Edit,
    save: Save,
});