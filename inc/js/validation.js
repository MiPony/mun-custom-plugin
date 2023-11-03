
window.addEventListener('load',()=>{
    applyMask()
    validate()
})
function applyMask(){
    jQuery("input[name='phone'], input[name='site_phone'], input[name='site_contact_phone'], input[name='rental_phone']").mask("(999) 999-9999");
    jQuery(".datepicker").mask("99/99/9999");
}
function validate(){
        jQuery.validator.addMethod("emailValidation", function(value, element) {
            return this.optional( element ) || /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test( value );
        },'Please enter a valid email address.')
        jQuery.validator.addMethod("phoneNumber", function(value, element) {
            return this.optional( element ) || /^((\+0?1\s)?)\(?\d{3}\)[\s.-]\d{3}[\s.-]\d{4}$/.test( value );
        },'Please enter a valid phone number.')
        jQuery.validator.addMethod("zipCode", function(value, element) {
            return this.optional( element ) || /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( value );
        },'Please enter a valid zip code.')
        jQuery.validator.addMethod("dateValidation", function(value, element) {
            return this.optional( element ) || /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/.test( value );
        },'Please enter a valid date.')
        jQuery.validator.addMethod("hours", function(value, element) {
            return this.optional( element ) || /^([0-9]|0[0-9]|1[0-2])$/.test( value );
        },'Please enter a valid hours.')
        jQuery.validator.addMethod("minutes", function(value, element) {
            return this.optional( element ) || /^([0-5][0-9])$/.test( value );
        },'Please enter a valid minutes.')
        $("#firstForm").validate({
        rules:{
            CID:{
                required: false,
                number: true
            },
            email:{
                required: false,
                emailValidation:true
            }
        },
        errorPlacement: function(error, element) {
            if ('radio' == $(element).attr('type')) {
                error[0].innerHTML = "Please select Property type."
                error.insertBefore(jQuery(element).parent());
            }
        },
        submitHandler: function(form) {
            if ($("#firstForm").valid()) {
                window.doRequestFromFirstForm(form)
                window.openSpinner(document.querySelector('#firstForm .loader'))
            }
        }
    });
    $("#commercial_second_form").validate({
        rules:{
            CID: {
                required: false,
                number: true
            },
            first_name: {
                required: true,
                minlength: 2
            },
            second_name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                emailValidation:true
            },
            phone: {
                required:true,
                phoneNumber:true
            },
            other:{
                required: true,
                minlength: 2
            },
            site_last_name:{
                required: true,
                minlength: 2
            },
            site_first_name:{
                required: true,
                minlength: 2
            },
            site_phone:{
                required:true,
                phoneNumber:true
            },
            site_email:{
                required:true,
                emailValidation:true
            },
            phone_type:{
                required:true
            },
            contact_update:{
                required:true
            },
        },
        errorPlacement: function(error, element) {
            if ('radio' == $(element).attr('type')) {
              error.insertBefore(jQuery(element).parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            if ($("#commercial_second_form").valid()){
                let loaderForm = document.querySelector('#commercial_second_form .loader');
                loaderForm.classList.remove('hide')
                setTimeout(()=>{
                    window.commercialSecondStep()
                    window.closeMassageBox()
                    window.NextStep()
                    window.scrollToTop()
                }, 1000)
            }
        }
    });
    $("#commercial_third_section").validate({
        rules:{
            company_name:{
                required: true,
                minlength: 2
            },
            email:{
                required: true,
                emailValidation:true
            },
            address:{
                required: true,
                minlength: 2
            },
            address_line:{
                required: false
            },
            zip:{
                required: true,
                minlength:5,
                zipCode:true
            },
            billing_attention:{
                required: true,
                minlength: 2
            },
            billing_address:{
                required: true,
                minlength: 2
            },
            billing_city:{
                required: true,
                minlength: 2
            },
            billing_zip:{
                required: true,
                minlength:5,
                zipCode:true
            },
            mailing_attention:{
                required: true,
                minlength: 2
            },
            mailing_address:{
                required: true,
                minlength: 2
            },
            mailing_zip: {
                required: true,
                minlength:5,
                zipCode:true
            },
            rental_first_name: {
                required: true,
                minlength: 2
            },
            rental_last_name: {
                required: true,
                minlength: 2
            },
            rental_phone:{
                required: true,
                phoneNumber: true
            },
            rental_email:{
                required: true,
                emailValidation: true
            },
            site_contact_first_name: {
                required: true,
                minlength: 2
            },
            site_contact_last_name: {
                required: true,
                minlength: 2
            },
            site_contact_phone:{
                required: true,
                phoneNumber: true
            },
            site_contact_email:{
                required: true,
                emailValidation: true
            },
            lockbox_location: {
                required: true,
                minlength: 3
            },
            lockbox_code:{
                required: true,
                minlength: 2
            },
            phone_type:{
                required: true
            },
            mailing_billing:{
                required: true
            },
            third_party:{
                required: true
            },
            adress_type:{
                required: true
            },
            turned_on:{
                required:true,
                minlength:8
            },
            operational_time_open_hours:{
                required:true,
                hours: true
            },
            operational_time_open_minutes:{
                required:true,
                minutes: true
            },
            operational_time_close_hours:{
                required:true,
                hours: true
            },
            operational_time_close_minutes:{
                required:true,
                minutes: true
            },
            lawn:{
                required:true,
            },
            device_location:{
                required:true,
            },
            commercial_location:{
                required: true
            },
            location_comment:{
                required: true,
                minlength: 3
            },
            third_party_name:{
                required: true
            },

        },
        errorPlacement: function(error, element) {

            if ('radio' == $(element).attr('type')) {
                error.insertBefore(jQuery(element).parent());
            } else if ($(element).hasClass('datepicker')) {
                error.insertAfter(jQuery(element).parent());
            } else if($(element).hasClass('time__input')){
                if($(element['operational_open_hours-error'])){
                    error.insertBefore(jQuery(element).parent().parent());
                }
            } else if(!$(element).hasClass('otime__input')){
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            if ($("#commercial_third_section").valid() && ContactSiteHasBeenCreated == false){
                let loaderForm = document.querySelector('#commercial_third_section .loader');
                loaderForm.classList.remove('hide')
                setTimeout(()=> {
                    // window.hideEditingBlock()
                    window.commercialThirdStep()
                    window.NextStep()
                    window.scrollToTop()
                }, 1000)
            }
        }
    });

    $("#residential_second_form").validate({
        rules:{
            CID: {
                required: false,
                digits: true
            },
            CCN:{
                required: false,
                minlength: 2
            },
            first_name:{
                required: true,
                minlength: 2
            },
            second_name:{
                required: true,
                minlength: 2
            },
            email:{
                required: true,
                emailValidation: true
            },
            phone:{
                required: true,
                phoneNumber:true
            },
            phone_type:{
                required: true
            },
            other:{
                required:true
            },
            address:{
                required:true,
                minlength:2
            },
            address_line:{
                required:false
            },
            zip:{
                required:true,
                minlength:5,
                zipCode:true
            },
            mailing_billing:{
                required:true
            },
            bill_mail_name:{
                required:true,
                minlength:2
            },
            bill_mail_address:{
                required:true,
                minlength:2
            },
            bill_mail_address_line:{
                required:false
            },
            bill_mail_zip:{
                required:true,
                minlength:5,
                zipCode:true
            },
            site_choice:{
                required:true,
            },
            site_contact_first:{
                required:true,
                minlength:2
            },
            site_contact_last:{
                required:true,
                minlength:2
            },
            site_contact_phone:{
                required:true,
                phoneNumber:true
            },
            site_contact_email:{
                required:true,
                emailValidation: true
            }
        },
        errorPlacement: function(error, element) {
            if ('radio' == $(element).attr('type')) {
              error.insertBefore(jQuery(element).parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            if ($("#residential_second_form").valid()){
                let loaderForm = document.querySelector('#residential_second_form .loader');
                loaderForm.classList.remove('hide')
                setTimeout(()=> {
                    window.residentialSecondStep()
                    window.closeMassageBox()
                    if(window.company != undefined){
                        window.sendIfContactsChanged(form)
                    }
                    window.NextStep()
                    window.scrollToTop()
                }, 1000)
            }
        }

    });

     $("#residential_third_section").validate({
         rules:{
            gated:{
                required:true,
            },
             gated_text:{
                 required:true,
             },
             adress_type:{
                 required:true,
             },
             rental_first_name:{
                 required:true,
                 minlength:2
             },
             rental_last_name:{
                 required:true,
                 minlength:2
             },
             rental_phone:{
                 required:true,
                 phoneNumber:true
             },
             rental_email:{
                 required:true,
                 emailValidation:true
             },
             site_contact_first_name: {
                required: true,
                minlength: 2
            },
            site_contact_last_name: {
                required: true,
                minlength: 2
            },
            site_contact_phone:{
                required: true,
                phoneNumber: true
            },
            site_contact_email:{
                required: true,
                emailValidation: true
            },
             lockbox_radio:{
                 required:true,
             },
             lockbox_location:{
                 required:true,
             },
             lockbox_code:{
                 required:true,
             },
             inside_radio:{
                 required:true,
             },
             turned_on:{
                 required:true,
                 minlength:8
             },
             lawn:{
                 required:true,
             },
             access_type:{
                 required:true,
             },
             device_location:{
                 required:true,
             }

         },
         errorPlacement: function(error, element) {
            if ('radio' == $(element).attr('type')) {
                error.insertBefore(jQuery(element).parent());
            } else if ($(element).hasClass('datepicker')) {
                error.insertAfter(jQuery(element).parent());
            } else {
                error.insertAfter(element);
            }
        },
         submitHandler: function(form) {
             if ($("#residential_third_section").valid() && ContactSiteHasBeenCreated == false){
                 let loaderForm = document.querySelector('#residential_third_section .loader');
                 loaderForm.classList.remove('hide')
                 setTimeout(()=> {
                     window.submitThirdStep()
                     window.NextStep()
                     window.scrollToTop()
                 }, 1000)
             }
         }
     });

    $("#comment_form").validate({
        rules:{
            commercial_location_with_no_data:{
                required: true
            },
            location_comment_with_no_data:{
                required: true,
                minlength: 3
            },
        },
        errorPlacement: function(error, element) {
            if ('radio' == $(element).attr('type')) {
              error.insertBefore(jQuery(element).parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            if ($("#fourthForm").valid()){
                window.commentSubmitFunction()
            }
        }

    });
}