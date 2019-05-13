const { Component } = wp.element;
const { RichText } = wp.editor
import { animationAttr } from '../../components/HelperFunction';

class Save extends Component {
	render() {
		const { uniqueId, layout, image, name, nameLevel, designation, description, useInfoIcon, phone, email, website, facebook, twitter, instagram, linkedin, youtube, github, flickr, pinterest, dribbble, behance, iconStyle, iconUseDefaultStyle, enableDesignation, enableDescription, animation } = this.props.attributes

		const nameTagName = 'h' + nameLevel;

		return (
			<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`qubely-block-team qubely-team-layout-${layout}`}>
					<div className="qubely-team-image-wrapper">
						{image.url != undefined ?
							<img className="qubely-team-image" src={ image.url } alt={name} />
							:
							<div className="qubely-image-placeholder"><i className="far fa-image"></i></div>
						}
					</div>
					<div className="qubely-team-content">
						<div className="qubely-team-content-inner">
							<RichText.Content tagName={nameTagName} className="qubely-team-name" value={name} />
							{enableDesignation == 1 &&
								<div className="qubely-team-designation-container">
									<RichText.Content tagName="span" className="qubely-team-designation" value={designation} />
								</div>
							}
							{enableDescription == 1 &&
								<RichText.Content tagName="div" className="qubely-team-description" value={description} />
							}
							{(phone || email || website) &&
								<div className="qubely-team-information">
									{phone &&
										<div class="qubely-team-information-phone">
											{useInfoIcon && 
												<i className="qubely-info-icon fas fa-phone" aria-label={__('Phone')} />
											}
											<span>{phone}</span>
										</div>
									}
									{email &&
										<div class="qubely-team-information-email">
											{useInfoIcon && 
												<i class="qubely-info-icon fas fa-envelope" aria-label={__('Email')} />
											}
											<span>{email}</span>
										</div>
									}
									{website &&
										<div class="qubely-team-information-website">
											{useInfoIcon && 
												<i class="qubely-info-icon fas fa-globe" aria-label={__('Website')} />
											}
											<span><a>{website}</a></span>
										</div>
									}
								</div>
							}
							{ (facebook || twitter || instagram || linkedin || youtube || github || flickr || pinterest || dribbble || behance) &&
								<div className={`qubely-team-social-links qubely-team-icon-layout-${iconStyle} qubely-team-icon-style-${iconUseDefaultStyle == 1 ? 'default' : 'custom'}`}>
									{facebook &&
										<a href={facebook} className="qubely-team-social-facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" /></a>
									}
									{twitter &&
										<a href={twitter} className="qubely-team-social-twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
									}
									{instagram &&
										<a href={instagram} className="qubely-team-social-instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
									}
									{linkedin &&
										<a href={linkedin} className="qubely-team-social-linkedin" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
									}
									{youtube &&
										<a href={youtube} className="qubely-team-social-youtube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>
									}
									{github &&
										<a href={github} className="qubely-team-social-github" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
									}
									{flickr &&
										<a href={flickr} className="qubely-team-social-flickr" target="_blank" rel="noopener noreferrer"><i className="fab fa-flickr" /></a>
									}
									{pinterest &&
										<a href={pinterest} className="qubely-team-social-pinterest" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest" /></a>
									}
									{dribbble &&
										<a href={dribbble} className="qubely-team-social-dribbble" target="_blank" rel="noopener noreferrer"><i className="fab fa-dribbble" /></a>
									}
									{behance &&
										<a href={behance} className="qubely-team-social-behance" target="_blank" rel="noopener noreferrer"><i className="fab fa-behance" /></a>
									}
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Save