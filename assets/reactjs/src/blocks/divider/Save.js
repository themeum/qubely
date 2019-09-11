const { Component } = wp.element;
import icons from '../divider/icon';
const { HelperFunction: { animationAttr } } = wp.qubelyComponents

class Save extends Component {
    render() {
        const { uniqueId, style, animation } = this.props.attributes
        return (
            <div className= { `qubely-block-${uniqueId}` } {...animationAttr(animation)}>   
                <div className= { `qubely-block-divider` }>
                    { ((style == 'fill') || (style == 'dot') || (style == 'dash')) ?
                        <div className= { `qubely-block-divider-style-${style}` } />
                        :
                        icons[style]
                    }
                </div>
            </div>
        )
    }
}
export default Save