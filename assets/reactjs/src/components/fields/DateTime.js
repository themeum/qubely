import '../css/datetime.scss'
const { Component } = wp.element
const _month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const _days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class DateTime extends Component {
    constructor(props) {
        super(props)
        this.state = { type: 'date', isOpen: false }
    }
    
    _daysInMonth(year, month) {
        return new Date(year, month, 0).getDate()
    }

    _daysName(dateString) {
        return new Date(dateString).getDay() - 1
    }

    _clickPevious(month, year) {
        if (this.state.type != 'month') {
            if (this.state.type == 'date') {
                if (month == 1) {
                    if (year != 1970) {
                        this._changeDate('ymo', [year - 1, 12])
                    }
                } else {
                    this._changeDate('mo', month - 1)
                }
            }
            if (this.state.type == 'year') {
                year = year - 42;
                this._changeDate('y', (year <= 1970 ? 1970 : year))
            }
        }
    }

    _clickNext(month, year) {
        const { type } = this.state
        if (type != 'month') {
            if (type == 'date') {
                if (month == 12) {
                    this._changeDate('ymo', [year + 1, 1])
                } else {
                    this._changeDate('mo', month + 1)
                }
            }
            if (type == 'year') {
                this._changeDate('y', year + 42)
            }
        }
    }

    _getYearView(year) {
        let data = []
        for (var i = 0; i <= 41; i++) {
            data.push(year + i)
        }
        return data
    }

    _getDaysView(timestamp) {
        let month = timestamp.getMonth() + 1,
            year = timestamp.getFullYear(),
            days = this._daysInMonth(year, month),
            start = this._daysName(year + '-' + month + '-1') + 1,
            toLoop = days + start,
            data = [],
            inc = 1
        for (let i = 0; i <= 41; i++) {
            if (i >= start && i < toLoop) {
                if ( timestamp.getDate() == inc ) {
                    data.push(<span className="active">{inc}</span>)
                } else {
                    data.push(<span>{inc}</span>)
                }
                inc++
            } else {
                data.push(<span></span>)
            }
        }
        return data
    }


    _changeDate(type, setValue) {
        const { value } = this.props
        if (typeof setValue != 'undefined' && setValue) {
            let timestamp = new Date(value||Date.now())
            let y = timestamp.getFullYear(),
                mo = timestamp.getMonth() + 1,
                d = timestamp.getDate(),
                h = timestamp.getHours(),
                m = timestamp.getMinutes(),
                s = timestamp.getSeconds();
            switch (type) {
                case 'y':
                    y = setValue
                    break;
                case 'mo':
                    mo = setValue
                    break;
                case 'd':
                    d = setValue
                    break
                case 'h':
                    h = setValue
                    break;
                case 'm':
                    m = setValue
                    break;
                case 's':
                    s = setValue
                    break;
                case 'ymo':
                    y = setValue[0]
                    mo = setValue[1]
                    break;
            }

            let dateTimestramp = new Date(y + '-' + mo + '-' + d + ' ' + h + ':' + m + ':' + s).getTime()
            this.props.onChange( dateTimestramp )
        }
    }

    render() {
        const { value } = this.props,
            timestamp = new Date(value||Date.now()),
            month = timestamp.getMonth(),
            year = timestamp.getFullYear()
        return (
            <div className="qubely-builder-form-group qubely-builder-form-group-wrap qubely-builder-form-datetime qubely-field">
                { this.props.label &&
                    <label>{this.props.label}</label>
                }
                <div className="qubely-element-form-calendar qubely-field-child">
                    <span className="calender-header">
                        <input onClick={() => this.setState({ isOpen: !this.state.isOpen })} className="date-time" readOnly value={year + '-' + (month + 1) + '-' + timestamp.getDate() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds()} />
                        <span onClick={() => this.setState({ isOpen: !this.state.isOpen })}><i className={'fas fa-calendar-alt'} /></span>
                    </span>

                    {this.state.isOpen &&
                        <div className="qubely-element-popup-calendar">
                            <div className="qubely-calender-title">
                                <span className={(this.state.type == 'month' ? 'disable' : '') + ' qubely-calender-prev'} onClick={() => this._clickPevious(month + 1, year)}><i className={this.state.type != 'month' ? "disable fas fa-angle-left" : "fas fa-angle-left"} /></span>
                                <span onClick={() => this.setState({ type: 'month' })}>{_month[month]}</span>
                                <span onClick={() => this.setState({ type: 'year' })}>{year}</span>
                                <span className={(this.state.type == 'month' ? 'disable' : '') + ' qubely-calender-next'} onClick={() => this._clickNext(month + 1, year)}><i className="fas fa-angle-right" /></span>
                            </div>
                            <div className="qubely-calender">
                                {this.state.type == 'year' &&
                                    <div className="qubely-calendar-year">
                                        {this._getYearView(year).map((y, i) => {
                                            return <span onClick={() => { this._changeDate('y', y); this.setState({ type: 'date' }); }} key={i}>{y}</span>
                                        })}
                                    </div>
                                }
                                {this.state.type == 'month' &&
                                    <div className="qubely-calendar-month">
                                        {_month.map((m, i) => {
                                            return <span onClick={() => { this._changeDate('mo', i + 1); this.setState({ type: 'date' }); }} key={i}>{m}</span>
                                        })}
                                    </div>
                                }
                                {this.state.type == 'date' &&
                                    <div>
                                        <div className="qubely-days-name">
                                            {_days.map((day, i) => {
                                                return <span key={i}>{day}</span>
                                            })}
                                        </div>
                                        <div className="qubely-days-date">
                                            {this._getDaysView(timestamp).map((d, i) => {
                                                return <span key={i} onClick={() => { this._changeDate('d', d.props.children) }}>{d}</span>
                                            })}
                                        </div>
                                    </div>
                                }
                                <div className="qubely-calendeer-time">
                                    <div className="qubely-calendar-hour">
                                        <input type="number" onChange={(e) => this._changeDate('h', e.target.value)} min="0" max="23" value={timestamp.getHours()}></input>
                                    </div>
                                    <div className="qubely-calendar-minute">
                                        <input type="number" onChange={(e) => this._changeDate('m', e.target.value)} min="0" max="59" value={timestamp.getMinutes()}></input>
                                    </div>
                                    <div className="qubely-calendar-second">
                                        <input type="number" onChange={(e) => this._changeDate('s', e.target.value)} min="0" max="59" value={timestamp.getSeconds()}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        );
    }
}

export default DateTime