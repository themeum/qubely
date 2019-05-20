const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

const blockAttrs = {
	uniqueId:{type: 'string',default:''},
	body: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin), .editor-styles-wrapper .editor-writing-flow *' }] },
	p: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) p, .editor-styles-wrapper .editor-writing-flow p' }] },
	h1: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h1, .edit-post-visual-editor h1' }] },
	h2: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h2, .edit-post-visual-editor h2' }] },
	h3: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h3, .edit-post-visual-editor h3' }] },
	h4: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h4, .edit-post-visual-editor h4' }] },
	h5: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h5, .edit-post-visual-editor h5' }] },
	h6: {type: 'object',default:{}, style: [{ selector: 'body:not(.wp-admin) h6, .edit-post-visual-editor h6' }] },
	button: {type: 'object',default:{}, style: [{ selector: '.edit-post-visual-editor .quebly-button' }] },
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