const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

const blockAttrs = {
	uniqueId:{type: 'string',default:''},
	body: {type: 'object',default:{}, style: [{ selector: 'body' }] },
	p: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper p' }] },
	h1: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper h1' }] },
	h2: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper h2' }] },
	h3: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper h3' }] },
	h4: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper h4' }] },
	h5: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper h5' }] },
	h6: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper h6' }] },
	a_typography: {type: 'object',default:{}, style: [{ selector: '.editor-styles-wrapper a' }] },
	a_color: {type: 'string', default: "" , style: [{ selector: '.editor-styles-wrapper a {color: {{a_color}} }' }] },
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