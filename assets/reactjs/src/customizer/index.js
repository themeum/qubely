
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
import Plugin from './plugin' 
import icons from '../helpers/icons';


registerPlugin( 'qubely-customizer', {
    icon: icons.qubely,
    render: Plugin,
} );