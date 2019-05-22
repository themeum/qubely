const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

const blockAttrs = {
	uniqueId:{type: 'string',default:''},
	body: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin), .editor-styles-wrapper .editor-writing-flow *' }] },
	h1: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h1, .editor-styles-wrapper h1' }] },
	h2: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h2, .editor-styles-wrapper h2' }] },
	h3: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h3, .editor-styles-wrapper h3' }] },
	h4: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h4, .editor-styles-wrapper h4' }] },
	h5: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h5, .editor-styles-wrapper h5' }] },
	h6: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h6, .editor-styles-wrapper h6' }] },
	button: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) .quebly-button, .editor-styles-wrapper .quebly-button' }] },

	colorPreset1: {type: 'string', default: '#062040' },
	colorPreset2: {type: 'string', default: '#566372' },
	colorPreset3: {type: 'string', default: '#2084F9' },
	colorPreset4: {type: 'string', default: '#F3F3F3' },
	colorPreset5: {type: 'string', default: '#EEEEEE' },
	colorPreset6: {type: 'string', default: '#FFFFFF' },

}

/**
 * This blog only for global data structure 
 * It will not visible for users
 */
registerBlockType ( 'qubely/pagesettings', {
    title: __( 'Global Settings' ),
    icon: '',
    category: 'qubely',
    keywords: [ __( 'Global Settings' ), __( 'Global Settings' ), ],
    supports: { inserter: false, reusable: false, html: false },
    attributes: {...blockAttrs},
    edit: function(){},
    save: function(){}
});