/**
 * WordPress dependencies
 */
const { registerFormatType } = wp.richText;

/**
 * Internal dependencies
 */
import formats from './custom-formats';

formats.forEach( ( { name, ...settings } ) =>
	registerFormatType( name, settings )
);
