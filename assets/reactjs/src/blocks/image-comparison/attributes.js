const {
	gloalSettings: { globalAttributes },
} = wp.qubelyComponents;

export const attributes = {
	uniqueId: {
		type: "string",
		default: "",
	},
	// Global
	...globalAttributes,
	recreateStyles: {
		type: "boolean",
		default: true,
	},

	...globalAttributes,
	spacer: {
		type: "object",
		default: {
			spaceTop: {
				md: "10",
				unit: "px",
			},
			spaceBottom: {
				md: "10",
				unit: "px",
			},
		},
		style: [{ selector: "{{QUBELY}}" }],
	},
	alignment: {
		type: "object",
		default: {
			md: "left",
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-image {text-align: {{alignment}};}",
			},
		],
	},
	animateOnHover: {
		type: "boolean",
		default: true,
	},
	// original image
	imgSize: {
		type: "string",
		default: "full",
	},
	image: {
		type: "object",
		default: {},
	},
	imageType: {
		type: "string",
		default: "local",
	},
	externalImageUrl: {
		type: "object",
		default: {},
	},
	imageUrl: { type: "object", default: {} },
	// modified image
	image2x: {
		type: "object",
		default: {},
	},
	imgAlt: {
		type: "string",
		default: "",
	},
	imgSize2: {
		type: "string",
		default: "full",
	},
	image2: {
		type: "object",
		default: {},
	},
	imageType2: {
		type: "string",
		default: "local",
	},
	verticalAlign: {
		type: "string",
		default: "bottom",
	},
	externalImageUrl2: {
		type: "object",
		default: {},
	},
	image2_2x: {
		type: "object",
		default: {},
	},
	imageUrl2: { type: "object", default: {} },
	imgAlt2: {
		type: "string",
		default: "",
	},

	// Title
	imageATitle: {
		type: "string",
		default: "Original",
	},
	titleLevel: {
		type: "number",
		default: 3,
	},
	typography: {
		type: "object",
		default: {
			openTypography: 0,
			size: {
				md: 30,
				unit: "px",
			},
		},
		style: [
			{
				selector: "{{QUBELY}} .qubely-block-image-comparison .image-container .comparison-image-text",
			},
		],
	},
	titleColor: {
		type: "string",
		default: "#FFF",
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-block-image-comparison .image-container .comparison-image-text {color: {{titleColor}};}",
			},
		],
	},
	imageBTitle: {
		type: "string",
		default: "Modified",
	},

	horizontalOffset: {
		type: "object",
		default: { md: 25, unit: "px" },
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-block-image-comparison .image-container.image-A .comparison-image-text {right:  {{horizontalOffset}}}" +
					"{{QUBELY}} .qubely-block-image-comparison .image-container.image-B .comparison-image-text {left:  {{horizontalOffset}}}",
			},
		],
	},

	verticalOffset: {
		type: "object",
		default: { md: 15, unit: "px" },
		style: [
			{
				selector:
					".qubely-block-image-comparison .image-container .comparison-image-text.text-vertical-align-top { top: {{verticalOffset}}; }" +
					".qubely-block-image-comparison .image-container .comparison-image-text.text-vertical-align-bottom { bottom: {{verticalOffset}}; }",
			},
		],
	},

	// circle

	controlColor: {
		type: "string",
		default: "#ffffff",
		style: [
			{
				selector:
					"{{QUBELY}} .qubely-block-image-comparison:not(.has-child-placeholder) .image-container.image-B {border-right-color: {{controlColor}}}" +
					"{{QUBELY}} .qubely-block-image-comparison .comparison-scrollCircle {background-color: {{controlColor}}}" +
					"{{QUBELY}} .qubely-block-image-comparison .comparison-scrollCircle::after {border-right-color: {{controlColor}}}" +
					"{{QUBELY}} .qubely-block-image-comparison .comparison-scrollCircle::before {border-left-color: {{controlColor}}}",
			},
		],
	},

	disableTitle: {
		type: "boolean",
		default: true,
	},

	// Content
	contentAnimation: {
		type: "string",
		default: "zoom-out",
	},
};
