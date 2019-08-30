
import './style.scss'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('qubely/postgrid', {
	title: __('Post Grid'),
	description: 'Fetch blog posts and display them beautifully in grid or list views with Qubely Postgrid Block.',
	icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-post-grid.svg'} alt={__('Postgrid Block')} />,
    category: 'qubely',
    keywords: [__('Post'), __('Post Grid')],
	edit: Edit,
	save: function( props ) {
		return null;
	}
});