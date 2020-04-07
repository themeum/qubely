
import classNames from 'classnames';
import '../../../components/css/color.scss';

const {
    useState,
    useRef,
    useEffect,
    Fragment,
    Component,
    useCallback
} = wp.element;

const {
    Dropdown,
    Popover,
    ColorPicker,
    Button
} = wp.components;

const { withState } = wp.compose

export default function Color({ value, onChange }) {

    const [showColorPicker, toggleColorPicker] = useState();
    const [ds, dsds] = useState('#fff');

    const classes = classNames(
        'qubely-field',
        'qubely-field-color',
        'qubely-d-flex',
        'qubely-align-center'
    );

    return (
        <div className={classes}>
            {/* <span className="qubely-color-picker-container">
                <span
                    isPrimary
                    className="qubely-color-picker"
                    style={{ backgroundColor: value || 'transparent' }}
                    onClick={() => toggleColorPicker(true)}
                />
            </span>
            {
                showColorPicker &&


                <Popover
                    position="bottom center"
                    className="qubely-socialicon-picker-popover"
                >
                    <div>
                        <ColorPicker
                            color={value || ''}
                            disableAlpha={false}
                            // onChangeComplete={newColor => {
                            //     console.log('change complete');
                            //     if (newColor.rgb && newColor.rgb.a != 1) {
                            //         onChange('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
                            //         // toggleColorPicker();
                            //     } else {
                            //         onChange(newColor.hex);
                            //         // toggleColorPicker();
                            //     }
                            // }}
                            onChangeComplete={val => {
                                console.log('change complete color');
                                if (val.rgb) { onChange(val.rgb.a != 1 ? 'rgba(' + val.rgb.r + ',' + val.rgb.g + ',' + val.rgb.b + ',' + val.rgb.a + ')' : val.hex) }
                            }}
                        />
                    </div>
                </Popover>
            } */}
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
                            color={ds}
                            disableAlpha={false}
                            onChangeComplete={newColor => {
                                console.log('change complete');
                                if (newColor.rgb && newColor.rgb.a != 1) {
                                    // onChange('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
                                    dsds('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
                                } else {
                                    // onChange(newColor.hex);
                                    dsds(newColor.hex);
                                }
                            }}
                        />
                        <buton onClick={() => onChange('#000')}>test</buton>
                    </div>

                )}
            />
        </div>
    );
}