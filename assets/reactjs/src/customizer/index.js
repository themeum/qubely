
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
import Plugin from './plugin' 

registerPlugin( 'qubely-customizer', {
    icon: "admin-site",
    render: Plugin,
} );
