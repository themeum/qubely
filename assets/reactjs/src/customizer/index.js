
import Plugin from './plugin';
import icons from '../helpers/icons';
const { registerPlugin } = wp.plugins;

registerPlugin( 'qubely-customizer', {
    icon: icons.qubely,
    render: Plugin,
} );