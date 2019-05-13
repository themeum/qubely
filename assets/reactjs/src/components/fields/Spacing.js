const { __ } = wp.i18n
import '../css/spacing.scss'
import Range from './Range'
import Color from './Color'
const { Component, Fragment } = wp.element

class Spacing extends Component {
    constructor(props) {
        super(props);
        this.props.onChange(Object.assign({}, { widthType: 'all', width: {} }, this.props.value));
    }
    setWidth(type, value) {
        this.props.onChange(Object.assign({}, this.props.value, { width: Object.assign({}, this.props.value.width, { [type]: value }) }));
    }
    setSettings(type, value) {
        this.props.onChange(Object.assign({}, this.props.value, { openBorder: (type == 'type' && value == '') ? 0 : 1 }, { [type]: value }));
    }
    render() {
        const { value } = this.props;

        return (
            <div className="qubely-field-border qubely-field">

                <div className="qubely-field qubely-field-border qubely-d-flex qubely-align-center">
                    <div>
                        {this.props.label ? this.props.label : __('Border')}
                    </div>
                    <div className="qubely-field-button-list qubely-ml-auto">
                        {
                            ['solid', 'dotted', 'dashed', 'double'].map((data, index) => {
                                return (
                                    <button className={(value.type == data ? 'active' : '') + ' qubely-button'} key={index} onClick={() => this.setSettings('type', data)}>
                                        <span className={`qubely-field-border-type qubely-field-border-type-${data}`} />
                                    </button>
                                )
                            })
                        }
                    </div>
                    {(value && value.type != '') &&
                        <div className="qubely-ml-10">
                            <a className="qubely-border-clear" href="javascript:;" onClick={() => this.setSettings('type', '')} title={__('Clear')} role="button"><i className="fas fa-undo"></i></a>
                        </div>
                    }
                </div>

                {value && value.type &&
                    <Fragment>

                        <Color
                            label={__('Border Color')}
                            value={value.color}
                            onChange={val => this.setSettings('color', val)}
                        />

                        <div className="qubely-field qubely-field-border qubely-d-flex qubely-align-center">
                            <div>
                                {this.props.label ? this.props.label : __('Border')} Width
                            </div>
                            <div className="qubely-field-button-list qubely-ml-auto">
                                {
                                    ['all', 'custom'].map((data, index) => {
                                        return (
                                            <button className={(value.widthType == data ? 'active' : '') + ' qubely-button'} key={index} onClick={() => this.setSettings('widthType', data)}>
                                                {data == 'all' ?
                                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.971 15.059v.941h-16v-16h16v15.058zm-1.882-.941v-12.235h-12.235v12.235h12.235z" className="qubely-svg-fill" /></svg>
                                                    :
                                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g className="qubely-svg-fill"><path d="M2.794 0h10.353v1.882h-10.353z" /><path d="M15.97 2.824v10.353h-1.882v-10.353z" /><path d="M1.853 2.823v10.353h-1.882v-10.353z" /><path d="M2.794 14.118h10.353v1.882h-10.353z" /></g></svg>
                                                }
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {value.widthType == 'all' &&
                            <div className="qubely-d-flex qubely-align-center qubely-mb-20">
                                <div className="qubely-w-100">
                                    <Range
                                        value={value.width.all || ''}
                                        onChange={val => this.setWidth('all', val)}
                                        min={0}
                                        max={20}
                                        step={1}
                                    />
                                </div>
                            </div>
                        }

                        {value.widthType == 'custom' &&
                            <div>
                                <div className="qubely-d-flex qubely-align-center qubely-mb-20">
                                    <div className="qubely-mr-15">
                                        <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#2184F9" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>
                                    </div>
                                    <div className="qubely-w-100">
                                        <Range
                                            value={value.width.top || ''}
                                            onChange={val => this.setWidth('top', val)}
                                            min={0}
                                            max={20}
                                            step={1}
                                        />
                                    </div>
                                </div>

                                <div className="qubely-d-flex qubely-align-center qubely-mb-20">
                                    <div className="qubely-mr-15">
                                        <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#2184F9" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>
                                    </div>
                                    <div className="qubely-w-100">
                                        <Range
                                            value={value.width.right || ''}
                                            onChange={val => this.setWidth('right', val)}
                                            min={0}
                                            max={20}
                                            step={1}
                                        />
                                    </div>
                                </div>

                                <div className="qubely-d-flex qubely-align-center qubely-mb-20">
                                    <div className="qubely-mr-15">
                                        <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#2184F9" d="M3 20h16v2h-16z" /></g></svg>
                                    </div>
                                    <div className="qubely-w-100">
                                        <Range
                                            value={value.width.bottom || ''}
                                            onChange={val => this.setWidth('bottom', val)}
                                            min={0}
                                            max={20}
                                            step={1}
                                        />
                                    </div>
                                </div>

                                <div className="qubely-d-flex qubely-align-center qubely-mb-20">
                                    <div className="qubely-mr-15">
                                        <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#2184F9" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>
                                    </div>
                                    <div className="qubely-w-100">
                                        <Range
                                            value={value.width.left || ''}
                                            onChange={val => this.setWidth('left', val)}
                                            min={0}
                                            max={20}
                                            step={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </Fragment>
                }
            </div>
        )
    }
}
export default Spacing 
