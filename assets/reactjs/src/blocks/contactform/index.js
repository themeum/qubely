/* eslint-disable react/react-in-jsx-scope */
import Edit from "./Edit";
import Save from "./Save";
import "./style.scss";

const { __ } = wp.i18n;
import attributes from "./attributes";
const { registerBlockType } = wp.blocks;

const { QubelyButtonSave } = wp.qubelyComponents;
const {
	HelperFunction: { animationAttr },
} = wp.qubelyComponents;

registerBlockType("qubely/contactform", {
	title: __("Contact Form"),
	description: __("Encourage site visitor interactions with Qubely Contact Form List"),
	category: "qubely",
	icon: <img src={qubely_admin.plugin + "assets/img/blocks/block-contact-form.svg"} alt={__("Contact Form")} />,
	keywords: [__("Contact"), __("Form")],
	supports: {
		align: ["center", "wide", "full"],
	},
	example: {
		attributes: {},
	},
	attributes,
	edit: Edit,
	save: Save,
	deprecated: [
		{
			attributes,
			save(props) {
				const {
					uniqueId,
					formItems,
					inputSize,
					fieldErrorMessage,
					formSuccessMessage,
					formErrorMessage,
					reCaptcha,
					reCaptchaSiteKey,
					reCaptchaSecretKey,
					emailReceiver,
					emailHeaders,
					emailFrom,
					emailSubject,
					emailBody,
					layout,
					buttonFillType,
					buttonSize,
					buttonText,
					buttonIconName,
					buttonIconPosition,
					buttonTag,
					animation,
				} = props.attributes;

				const _encrypt = (str) => {
					return window.btoa(unescape(encodeURIComponent(str)));
				};

				const _renderField = (item, index, inputSize) => {
					const fieldID = `qubely-form-input-${index}`;
					const fieldName = `qubely-form-input[${item.name}${item.required ? "*" : ""}]`;
					const fieldClass = `qubely-form-control is-${inputSize}`;
					switch (item.type) {
						case "text":
						case "email":
							return (
								<input
									id={fieldID}
									name={fieldName}
									className={fieldClass}
									type={item.type}
									placeholder={__(item.placeholder)}
									required={item.required}
								/>
							);
						case "textarea":
							return (
								<textarea
									id={fieldID}
									name={fieldName}
									className={fieldClass}
									placeholder={__(item.placeholder)}
									required={item.required}
								></textarea>
							);
						default:
							return "";
					}
				};

				const _renderFormGroupCss = () => {
					let formGroupCss = "";
					formItems.forEach((item, index) => {
						formGroupCss += `${
							item.width.md
								? `.qubely-form-group.qubely-form-group-index-${index} { width: ${item.width.md}% }`
								: ``
						}
                            ${
								item.width.sm
									? `@media (max-width: 991px) { .qubely-form-group.qubely-form-group-index-${index} { width: ${item.width.sm}% } }`
									: ``
							}
                            ${
								item.width.xs
									? `@media (max-width: 767px) { .qubely-form-group.qubely-form-group-index-${index} { width: ${item.width.xs}% } }`
									: ``
							}`;
					});
					return formGroupCss;
				};

				return (
					<div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
						<style>{_renderFormGroupCss()}</style>
						<div className={`qubely-block-contact-form qubely-layout-${layout}`}>
							<form className="qubely-form">
								{formItems.map((item, index) => (
									<div key={index} className={`qubely-form-group qubely-form-group-index-${index}`}>
										<div className="qubely-form-group-inner">
											{!item.hideLabel && layout == "classic" && (
												<label for={`qubely-form-input-${index}`} className="qubely-form-label">
													{" "}
													{__(item.label)} {item.required && "*"}
												</label>
											)}
											{_renderField(item, index, inputSize)}
											{layout == "material" && (
												<label className="qubely-form-label">
													{" "}
													{__(item.label)} {item.required && "*"}
												</label>
											)}
										</div>
									</div>
								))}

								{reCaptcha && reCaptchaSiteKey && reCaptchaSecretKey && (
									<div className="qubely-form-group">
										<div className="qubely-google-recaptcha" />
									</div>
								)}

								<div className="qubely-form-group" style={{ width: "100%" }}>
									<QubelyButtonSave
										buttonFillType={buttonFillType}
										buttonSize={buttonSize}
										buttonText={buttonText}
										buttonIconName={buttonIconName}
										buttonIconPosition={buttonIconPosition}
										buttonTag={buttonTag}
									/>
									<input type="hidden" name="field-error-message" value={fieldErrorMessage} />
									<input type="hidden" name="form-success-message" value={formSuccessMessage} />
									<input
										type="hidden"
										name="form-error-message"
										value={"Email sent failed, fill required field and try again!"}
									/>
									<input
										type="hidden"
										name="recaptcha"
										value={reCaptcha && reCaptchaSiteKey && reCaptchaSecretKey ? "true" : "false"}
									/>
									<input type="hidden" name="recaptcha-site-key" value={reCaptchaSiteKey} />
									<input type="hidden" name="recaptcha-secret-key" value={reCaptchaSecretKey} />
									<input type="hidden" name="email-receiver" value={emailReceiver} />
									<input type="hidden" name="email-headers" value={emailHeaders} />
									<input type="hidden" name="email-subject" value={emailSubject} />
									<input type="hidden" name="email-body" value={emailBody} />
								</div>
								<div className="qubely-form-group">
									<div className="qubely-form-group-inner">
										<div className="qubely-form-message"></div>
									</div>
								</div>
							</form>
						</div>
					</div>
				);
			},
		},
	],
});
