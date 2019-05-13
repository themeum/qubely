const { Fragment, Component } = wp.element
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {
  render() {
  const { uniqueId, animation, title, labelPosition, striped, progress, showProgress } = this.props.attributes

  const labelsContent =  title != '' ?
            ( <div className={`qubely-block-progress-labels qubely-position-${labelPosition}`}>
                <div className="qubely-block-progress-bar-title">{title}</div>
                {showProgress && <div className="qubely-progress-percentage"><span>{progress}%</span></div>}
            </div> ) : ''
    return (
        <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
            <div className="qubely-block-progress-bar">
                { labelPosition == 'outside' && labelsContent }
                <div className="qubely-progress">
                    <div className="qubely-progress-bar" role="progressbar">
                        {striped && <div className="qubely-progress-striped"></div>}
                        { labelPosition == 'inside' && labelsContent }
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Save