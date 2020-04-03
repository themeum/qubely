import icons from '../../helpers/icons';
import Color from './components';

/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const {
    useState,
    useRef,
    useEffect,
    Fragment,
    Component
} = wp.element;

const {
    PanelBody,
    ColorPicker
} = wp.components;

const { PanelColorSettings } = wp.blockEditor

const {
    PluginSidebar,
    PluginSidebarMoreMenuItem
} = wp.editPost;


/**
 * Qubely Components
 */
const {
    // Color,
    Typography,
    Separator
} = wp.qubelyComponents;


export default function GlobalSettings(props) {

    const [colors, setColors] = useState(['#4A90E2', '#50E3C2', '#000', '#4A4A4A', '#9B9B9B']);
    const changeColor = (newColor, index) => {
        let tempColor = [...colors]
        tempColor[index] = newColor;
        setColors(tempColor);
    }
    const colorPalettes = () => {
        return (
            <PanelBody title={__('Global Colors')} initialOpen={true}>
                <div className="qubely-d-flex qubely-align-justified">
                    {colors.map((color, index) => (
                        <Color
                            value={color}
                            key={color + index}
                            onChange={newColor => changeColor(newColor, index)}
                        />
                    ))}
                </div>
            </PanelBody>
        )
    }

    return (
        <Fragment>
            <PluginSidebar
                icon={icons.qubely}
                name="global-settings-sidebar"
                title={__('Global Settings')}
            >
                {colorPalettes()}
            </PluginSidebar>

            <PluginSidebarMoreMenuItem
                icon={icons.qubely}
                target="global-settings-sidebar"
            >
                {__('Global Settings')}
            </PluginSidebarMoreMenuItem>
        </Fragment>
    );

}