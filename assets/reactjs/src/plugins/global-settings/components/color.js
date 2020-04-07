
import classNames from 'classnames';
import '../../../components/css/color.scss';

const {
    useState,
} = wp.element;

const {
    Dropdown,
    ColorPicker,
} = wp.components;


export default function Color({ value, onChange }) {

    const [showColorPicker, toggleColorPicker] = useState();

    const classes = classNames(
        'qubely-field',
        'qubely-field-color',
        'qubely-d-flex',
        'qubely-align-center'
    );

    return (
        <div className={classes}>
        
            <Dropdown
                position="top center"
                className="qubely-ml-auto"
                renderToggle={({ isOpen, onToggle }) => (
                    <span className="qubely-color-picker-container">
                        <span
                            isPrimary
                            aria-expanded={isOpen}
                            className="qubely-color-picker"
                            style={{ backgroundColor: value || 'transparent' }}
                            onClick={onToggle}
                        />
                    </span>
                )}
                renderContent={() => (
                    <div>
                        <ColorPicker
                            color={value}
                            disableAlpha={false}
                            onChangeComplete={newColor => {
                                console.log('change complete');
                                if (newColor.rgb && newColor.rgb.a != 1) {
                                    onChange('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
                                } else {
                                    onChange(newColor.hex);
                                }
                            }}
                        />
                    </div>

                )}
            />
        </div>
    );
}