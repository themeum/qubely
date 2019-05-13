const { Component } = wp.element;
const { InnerBlocks } = wp.editor
import { animationAttr } from '../../components/HelperFunction'

class Save extends Component {
    render() {
		const { uniqueId, animation } = this.props.attributes
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className="qubely-block-wrapper-block">
					<InnerBlocks.Content />
				</div>
			</div>
		)
    }
}
export default Save