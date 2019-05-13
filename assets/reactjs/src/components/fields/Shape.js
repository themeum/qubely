const { __ } = wp.i18n
import '../css/shape.scss'
import Range from "./Range"
import Select from "./Select"
import Device from '../Device'
const { Component, Fragment } = wp.element
import Color from "./Color"
const { CheckboxControl } = wp.components

class Shape extends Component {

    componentWillMount() {
        const { value } = this.props
        this.props.onChange(Object.assign({}, { openShape: 0 }, (value || {})));
    }

    setSettings(type, val) {
        const { value, onChange } = this.props
        const styleVal = type == 'style' && val == '' ? { openShape: 0 } : { openShape: 1 }
        onChange(Object.assign({}, value, styleVal, { [type]: val }))
    }

    render() {
        const { value } = this.props
        return (
            <div className="qubely-field-shape qubely-field">
                <div className="qubely-field-child">
                    <Select
                        clear
                        noValue={'None'}
                        value={value.style || ''}
                        options={['clouds-flat', 'clouds-opacity', 'paper-torn', 'pointy-wave', 'rocky-mountain', 'single-wave', 'slope-opacity', 'slope', 'waves3-opacity', 'drip', 'turning-slope', 'hill-wave', 'hill', 'line-wave', 'swirl', 'wavy-opacity', 'zigzag-shark']}
                        onChange={val => this.setSettings('style', val)} />
                    {value.openShape == 1 &&
                        <Color
                            label={__('Color')}
                            value={value && value.color}
                            onChange={val => this.setSettings('color', val)} />
                    }
                    {value.openShape == 1 &&
                        <Fragment>
                            <Range
                                label={__('Shape Width')}
                                min={100}
                                max={1000}
                                responsive
                                unit={['px', 'em', '%']}
                                value={value.width}
                                onChange={val => this.setSettings('width', val)}
                                step={1}
                                beforeIcon="leftright"
                                allowReset
                            />
                            <Range label={__('Shape Height')} min={0} max={500} responsive unit={['px', 'em', '%']} value={value.height} onChange={val => this.setSettings('height', val)} step={1} beforeIcon="sort" allowReset />
                        </Fragment>
                    }
                    {value.openShape == 1 &&
                        <CheckboxControl label={__('Bring to front')} isChecked={value.front == 1 ? true : false} onChange={val => this.setSettings('front', val ? 1 : 0)} />
                    }
                </div>
            </div>
        )
    }
}
export default Shape