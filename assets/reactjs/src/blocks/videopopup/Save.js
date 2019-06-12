const { Component } = wp.element;
import { animationAttr } from '../../components/HelperFunction'
class Save extends Component {
    render() {
		const { uniqueId, layout, animation, alignment, icon, postfix, prefix, iconSize, url, isRipple, iconBorderRadius, iconBgColor, videoSource, bgVideo } = this.props.attributes
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-videopopup-wrapper qubely-alignment-${alignment}`}>
					{layout == 'fill' && <div className="qubely-block-videopopup-overlay"></div>}
					<div className={`qubely-block-videopopup qubely-size-${iconSize}`} >
						<a className="qubely-video-popup" href={videoSource=='external'?url:(bgVideo.url||'')}>
							{ prefix &&  <span className="qubely-video-popup-prefix"> {prefix} </span> }
							{ icon && (
                                <i className={`qubely-btn-icon ${icon}`}>
                                    { ( iconBgColor && isRipple) && <span
                                        className="qubely-ripple"
										style={{ '--qubely-ripple-radius': iconBorderRadius }}
                                    ></span> }
                                </i>
                            ) }
							{ postfix &&  <span className="qubely-video-popup-postfix">{postfix}</span> }
						</a>
					</div>
				</div>
			</div>
		)
    }
}
export default Save