const { Component } = wp.element;
const { HelperFunction: { animationAttr } } = wp.qubelyComponents

class Save extends Component {
    render() {
		const { uniqueId, name, url, animation } = this.props.attributes
		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className="qubely-block-icon-wrapper">
					<div className="qubely-block-icon">
                    {url.url ?
						<a className="qubely-icon-block-anchor" href={url.url||'#'} {...( url.target && {target:'_blank'})} {...( url.nofollow && {rel:'nofollow noopener noreferrer'})}>
							<i className={name} />
						</a>
                        : <i className={name} />
                    }
					</div>
				</div>
			</div>
		)
    }
}
export default Save