import Device from './Device';
import '../css/alignment.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;

const {
    Fragment,
    Component
} = wp.element;

const {
    Tooltip
} = wp.components;

class Alignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: this._filterValue()
        }
    }
    _filterValue() {
        const {
            value,
            responsive
        } = this.props;

        if (value) {
            return responsive ? (value[window.qubelyDevice] || '') : value;
        }
        return '';
    }

    setSettings(val) {
        const {
            value,
            onChange,
            responsive,
            disableToggle
        } = this.props;

        if (val == '' && disableToggle) {
            return
        }
        const final = responsive ? Object.assign({}, value, { [window.qubelyDevice]: val }) : val
        onChange(final)
        this.setState({ current: final })
    }
    render() {

        const {
            flex,
            label,
            device,
            responsive,
            alignmentType,
            disableCenter,
            disableJustify,
            onDeviceChange
        } = this.props;

        const defData = flex ? ['flex-start', 'center', 'flex-end'] : disableJustify ? (disableCenter ? ['left', 'right'] : ['left', 'center', 'right']) : ['left', 'center', 'right', 'justify'];

        const classes = classnames({
            'qubely-field': true,
            'qubely-field-alignment': true,
            'qubely-responsive': responsive
        });

        return (
            <div className={classes} >
                <div className="qubely-d-flex qubely-align-center qubely-mb-10">
                    {label && <label>{__(label, 'qubely')}</label>}
                    {responsive &&
                        <div className="qubely-ml-auto">
                            {
                                device ?
                                    <Device device={device} commonResponsiveDevice={device} className="qubely-ml-10" onChange={(val) => onDeviceChange(val)} />
                                    :
                                    <Device onChange={(val) => this.setState({ current: val })} />
                            }

                        </div>
                    }
                </div>

                <div className="qubely-field-button-list qubely-field-button-list-fluid">
                    {defData.map((data, index) => {
                        return (
                            <button className={(this._filterValue() == data ? 'active' : '') + ' qubely-button'} key={index} onClick={() => this.setSettings(this._filterValue() == data ? '' : data)}>
                                {
                                    alignmentType == 'content' ?
                                        <Fragment>
                                            {(data == 'left' || data == 'flex-start') &&
                                                <Tooltip text={__('Left', 'qubely')}>
                                                    <svg width="21" height="18" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-29 -4) translate(29 4)" fill="none"><path d="M1 .708v15.851" className="qubely-svg-stroke" stroke-linecap="square" /><rect className="qubely-svg-fill" x="5" y="5" width="16" height="7" rx="1" /></g></svg>
                                                </Tooltip>
                                            }
                                            {data == 'center' &&
                                                <Tooltip text={__('Middle', 'qubely')}>
                                                    <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-115 -4) translate(115 4)" fill="none"><path d="M8 .708v15.851" className="qubely-svg-stroke" stroke-linecap="square" /><rect className="qubely-svg-fill" y="5" width="16" height="7" rx="1" /></g></svg>
                                                </Tooltip>
                                            }
                                            {(data == 'right' || data == 'flex-end') &&
                                                <Tooltip text={__('Right', 'qubely')}>
                                                    <svg width="21" height="18" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1) rotate(-180 10.5 8.5)" fill="none"><path d="M1 .708v15.851" className="qubely-svg-stroke" stroke-linecap="square" /><rect className="qubely-svg-fill" fill-rule="nonzero" x="5" y="5" width="16" height="7" rx="1" /></g></svg>
                                                </Tooltip>
                                            }
                                        </Fragment>
                                        :
                                        <i className={'fa fa-align-' + data} />
                                }
                            </button>
                        );
                    })}
                </div>
            </div>
        )
    }
}
export default Alignment;