import '../css/color.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;

const {
    Component
} = wp.element;

const {
    Tooltip,
    Dropdown,
    ColorPicker,
} = wp.components;


async function fetchFromApi() {
    return await wp.apiFetch({ path: '/qubely/v1/global_settings' })
}

class Color extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'date',
            globalColors: []

        }
    }

    componentDidMount() {
        fetchFromApi().
            then(data => {
                if (data.success) {
                    const {
                        settings: {
                            presets,
                            activePreset
                        }
                    } = data;
                    console.log('data : ', data);
                    this.setState({
                        globalColors: presets[activePreset].colors
                    })
                } else {
                    this.setState({
                        globalColors: qubely_admin.palette
                    })
                }

            })
    }

    render() {

        const {
            globalColors
        } = this.state;

        const {
            value,
            label,
            onChange,
            className,
            disableClear,
            disableAlpha,
            disablePalette
        } = this.props;

        const classes = classnames(
            'qubely-field',
            'qubely-d-flex',
            'qubely-field-color',
            'qubely-align-center',
            { [className]: className }
        )

        return (
            <div className={classes}>
                {label && <label className="qubely-mb-0">{__(label)}</label>}
                <Dropdown
                    position="top center"
                    className="qubely-ml-auto"
                    renderToggle={({ isOpen, onToggle }) => (
                        <span className="qubely-color-picker-container">
                            <span className="qubely-color-picker"
                                isPrimary
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                style={{ backgroundColor: value || '' }}
                            />
                        </span>
                    )}
                    renderContent={() => (
                        <span>
                            <ColorPicker
                                color={value || ''}
                                onChangeComplete={val => {
                                    if (val.rgb) {
                                        onChange(val.rgb.a != 1 ? 'rgba(' + val.rgb.r + ',' + val.rgb.g + ',' + val.rgb.b + ',' + val.rgb.a + ')' : val.hex)
                                    }
                                }}
                                disableAlpha={disableAlpha ? disableAlpha : false}
                            />
                            {!disablePalette &&
                                <div className="qubely-rgba-palette">
                                    {/* {globalColors.map(color => <button style={{ color: color }} onClick={() => onChange(color)} />)} */}
                                    {globalColors.map((color, index) => <button style={{ color: `var(--qubely-color-${index + 1})` }} onClick={() => onChange(`var(--qubely-color-${index + 1})`)} />)}
                                </div>
                            }
                        </span>
                    )}
                />
                {(value != '' && !disableClear) &&
                    <Tooltip text={__('Clear')}>
                        <div className="qubely-ml-10">
                            <span className="qubely-border-clear" onClick={() => onChange('')} role="button"><i className="fas fa-undo" /></span>
                        </div>
                    </Tooltip>
                }
            </div>
        );
    }
}
export default Color;