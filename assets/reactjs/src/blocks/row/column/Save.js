const { Component } = wp.element
const { InnerBlocks } = wp.editor
import { animationAttr } from '../../../components/HelperFunction'

class Save extends Component {
	render() {
		const { attributes:{ uniqueId, animation } } = this.props
		return(
			<div className={ `qubely-column qubely-column-front qubely-block-${uniqueId}` } {...animationAttr(animation)}>
				<div className={ `qubely-column-inner` }>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
}
export default Save