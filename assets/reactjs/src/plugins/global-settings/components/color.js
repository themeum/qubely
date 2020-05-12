
import classNames from 'classnames';
import '../../../components/css/color.scss';
import icons from '../../../helpers/icons';
const {
    useState,
} = wp.element;

const {
    Dropdown,
    ColorPicker,
} = wp.components;


export default function Color({ value, onChange, className, deleteOption, onDelete, addNew = undefined, addNewColor = false }) {

    const classes = classNames(
        'qubely-field',
        'qubely-field-color',
        'qubely-d-flex',
        'qubely-align-center'
    );

    let containerClasses = classNames(
        className,
        'qubely-color-picker-container',
        { ['qubely-global']: addNewColor }
    )
    return (
        <div className={classes}>

            <Dropdown
                position="top center"
                className="qubely-ml-auto"
                renderToggle={({ isOpen, onToggle }) => (
                    <span className={containerClasses}>
                        <span
                            isPrimary
                            aria-expanded={isOpen}
                            className="qubely-color-picker"
                            style={{ backgroundColor: (!addNewColor && value) ? value : 'transparent' }}
                            onClick={() => {
                                if (addNewColor) {
                                    addNew();
                                }
                                onToggle()
                            }}
                        >
                            {addNewColor && icons.plus}
                        </span>
                        {
                            deleteOption &&
                            <span className="delete fas fa-times" onClick={() => onDelete()} >
                                {/*{icons.delete}*/}
                            </span>
                        }
                    </span>
                )}
                renderContent={() => {
                    return (
                        <ColorPicker
                            color={typeof value !== 'undefined' ? value : '#000'}
                            disableAlpha={false}
                            onChangeComplete={newColor => {
                                if (newColor.rgb && newColor.rgb.a != 1) {
                                    onChange('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
                                } else {
                                    onChange(newColor.hex);
                                }
                            }}
                        />
                    )
                }}
            />
        </div>
    );
}