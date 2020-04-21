const {
    gloalSettings: {
        globalAttributes
    }
} = wp.qubelyComponents

export const attributes = {
    uniqueId: {
        type: 'string',
        default: ''
    },
    // Global
    ...globalAttributes,
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
    alignment: {
        type: 'object',
        default: {
            md: 'left'
        },
        style: [{
            selector: '{{QUBELY}} .qubely-block-image {text-align: {{alignment}};}'
        }]
    },
    animateOnHover: {
        type: 'boolean',
        default: true
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
    imageATitle: {
        type: 'string',
        default: 'Original',
    },
    titleLevel: {
        type: 'number',
        default: 3
    },
    typography: {
        type: 'object',
        default: {
            openTypography: 0,
            size: {
                md: 30,
                unit: 'px'
            }
        },
        style: [{
            selector: '{{QUBELY}} .qubely-block-image-comparison .image-container .comparison-image-text'
        }]
    },
    titleColor: {
        type: 'string',
        default: '#FFF',
        style: [{
            selector: '{{QUBELY}} .qubely-block-image-comparison .image-container .comparison-image-text {color: {{titleColor}};}'
        }]
    },
    imageBTitle: {
        type: 'string',
        default: 'Modified'
    },

    // circle
    circleColor: {
        type: 'string',
        default: '#ffffff',
        /*style: [{
            selector: '{{QUBELY}} .comparison-scrollCircle  {color: {{circleColor}};}'
        }]*/
    },
    circleBackground: {
        type: 'string',
        default: '#2184F9',
        /*style: [{
            selector: '{{QUBELY}} .comparison-scrollCircle  {background-color: {{circleBackground}};}'
        }]*/
    },
    circleWidth: {
        type: 'number',
        default: 40,
        /*style: [
            {
                selector: '{{QUBELY}} .qubely-block-image-comparison .comparison-scrollCircle {width: {{circleWidth}}px; line-height: {{circleWidth}}px;height: {{circleWidth}}px; font-size: {{circleWidth}}px}' +
                    '{{QUBELY}} .qubely-block-image-comparison .comparison-scrollCircle i {line-height: {{circleWidth}}px}'
            }
        ],*/
    },
    // end of yp

    disableTitle: {
        type: 'boolean',
        default: true
    },

    // Content
    contentAnimation: {
        type: 'string',
        default: 'zoom-out'
    },
};