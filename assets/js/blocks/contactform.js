/**
 * Contact Form Block
 */

(function ($) {
    jQuery(document).ready(function () {
        $('.qubely-block-contact-form form.qubely-form:not(.qubely-form-ready)').each(function () {
            const $form = $(this);
            $form.addClass('qubely-form-ready');
            $form.find('input.qubely-form-control').on('keydown', (e) => {
                if (e.which === 13) { e.preventDefault(); return false; };
            });
            checkFormValidation($form, true); //add validation

            //FORM SUBMIT EVENT
            $form.submit((e) => {
                e.preventDefault();
                let formData = $form.serializeArray();
                const isRequired = checkFormValidation($form); //check validation
                if (!isRequired) {
                    const reCaptcha = $form.find('input[name="recaptcha"]').val();
                    const qubelyRecaptcha = this.querySelector('form .qubely-google-recaptcha');
                    if (reCaptcha == 'true' && qubelyRecaptcha) {
                        formData.push({ name: 'captcha', value: (typeof grecaptcha !== "undefined") ? grecaptcha.getResponse() : undefined });
                    }
                    jQuery.ajax({
                        url: qubely_urls.ajax + '?action=qubely_send_form_data',
                        type: "POST",
                        data: formData,
                        beforeSend: () => {
                            $form.find('button[type="submit"]').addClass('disable').attr('disabled', true);
                            $form.find(".qubely-form-message").html('<div class="qubely-alert qubely-alert-info">Message sending...</div>');
                        },
                        success: (response) => {
                            $form.find('button[type="submit"]').removeClass('disable').attr('disabled', false);
                            $form.find(".qubely-form-message").html(`<div class="qubely-alert qubely-alert-success">${response.data.msg}</div>`);
                            setTimeout(() => $form.find('.qubely-form-message').html(''), 4000);
                            if (response.data.status == 1) $form.trigger("reset");
                        },
                        error: (jqxhr, textStatus, error) => {
                            $form.find('button[type="submit"]').removeClass('disable').attr('disabled', false);
                            $form.find(".qubely-form-message").html(`<div class="qubely-alert qubely-alert-danger">${textStatus} : ${error} - ${jqxhr.responseJSON}</div>`);
                        }
                    });
                }
            });
        });

        if (typeof loadScriptAsync === 'undefined') {
            function loadScriptAsync(src) {
                return new Promise((resolve, reject) => {
                    const tag = document.createElement('script');
                    tag.src = src;
                    tag.async = true;
                    tag.onload = () => {
                        resolve();
                    };
                    const firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                });
            }
        }

        //CONTACT FORM RECAPTCHA
        const apiURL = 'https://www.google.com/recaptcha/api.js?onload=initGoogleReChaptcha&render=explicit';
        const qubelyRecaptcha = this.querySelector('form .qubely-google-recaptcha');
        if(qubelyRecaptcha) {
            loadScriptAsync(apiURL).then(() => {
                window.initGoogleReChaptcha = () => {
                    $('form.qubely-form').each(function () {
                        const $form = $(this);
                        const reCaptcha = $form.find('input[name="recaptcha"]').val();
                        const reCaptchaSiteKey = $form.find('input[name="recaptcha-site-key"]').val();
                        if (reCaptcha == 'true') {
                            const qubelyRecaptcha = this.querySelector('form .qubely-google-recaptcha');
                            grecaptcha.render(qubelyRecaptcha, {
                                sitekey: reCaptchaSiteKey
                            });
                        }
                    });

                };
            });
        }



        //FORM VALIDATION
        function checkFormValidation($form) {
            const fieldErrorMessage = atob($form.find('input[name="field-error-message"]').val());
            let onChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            let isRequired = false;
            $form.find(' input[type=text], input[type=email], input[type=radio], input[type=checkbox], textarea, select').each(function () {
                if (onChange === true) {
                    $(this).on('change keyup', function () {
                        isRequired = checkFields($(this), fieldErrorMessage);
                        if (isRequired) return false;
                    });
                } else {
                    isRequired = checkFields($(this), fieldErrorMessage);
                    if (isRequired) return false;
                }
            });
            return isRequired;
        }

        function checkFields($field, fieldErrorMessage) {
            let isRequired = false;
            const $parent = $field.parents('.qubely-form-group-inner');
            fieldErrorMessage = `<p class="qubely-form-required-field">${fieldErrorMessage}</p>`;
            const hasNoError = $parent.find("p.qubely-form-required-field").length === 0;

            if (typeof $field.prop('required') !== 'undefined') {
                if ($field.attr('type') === 'email') {
                    if (!validateEmail($field.val())) {
                        if (hasNoError) {
                            $parent.append(fieldErrorMessage);
                        }
                        return isRequired = true;
                    }
                }
                if ($field.val().length === 0) {
                    if (hasNoError) {
                        $parent.append(fieldErrorMessage);
                    }
                    isRequired = true;
                }
                if ($field.val().length > 0) {
                    $parent.find("p.qubely-form-required-field").remove();
                    isRequired = false;
                }
            }
            if ($field.attr('type') === 'radio' || $field.attr('type') === 'checkbox') {
                const parentElem = $field.parent().parent();
                if (parentElem.attr('data-required') == 'true') {
                    if (parentElem.find('input:checked').length === 0) {
                        if (hasNoError) {
                            $parent.append(fieldErrorMessage);
                        }
                        isRequired = true;
                    } else {
                        $parent.find("p.qubely-form-required-field").remove();
                        isRequired = false;
                    }
                }
            }
            return isRequired;
        }

        function validateEmail(email) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
        }
    })
})(jQuery)