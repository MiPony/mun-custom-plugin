window.addEventListener('load',()=>{
    var company,typeOfCompany,requestOk,deviceDueDateEnd = undefined,deviceDueDateStart = undefined,firstFormData,radio_value,setMinMaxDate,validationCheck,changeOperationalTime,step_index,first_time,outside_checked,onTimer,getNewDates,stopTimer = false,stopDateTimer,today_due_date,wo_dates_suggestions,ready_suggestions = false,refreshIntervalId,observer,editing = false,date,selected_index = 0,select_date;
    lookOnMutation()
    hideRadioLogic()
    initDatepicker()
    datepickerTurnedOnChange()
    disableInputOther()
    openCloseMap()
    hideDateIrrigationLogic()
    clearLocalStorage()
    clearLocalStorageTimer()
})
// Clear local storage if 20 minutes have passed since last page refresh
function clearLocalStorageTimer(){
    const endTimeLocal = new Date().getTime() + 1200000;
    var timeLocal = 100000;

    function getRemainingTimeLocal(deadline) {
      const currentTimeLocal = new Date().getTime();
      return deadline - currentTimeLocal;
    }

    function padLocal(value) {
      return ('0' + Math.floor(value)).slice(-2);
    }

    function showTimeLocal() {
            const remainingTimeLocal = getRemainingTimeLocal(endTimeLocal);
            const seconds = padLocal((remainingTimeLocal / 1000) % 60);
            const minutes = padLocal((remainingTimeLocal / (60 * 1000)) % 60);
                    
            timeLocal = (parseInt(minutes) * 60) + parseInt(seconds)
                    
        if(timeLocal <= 0){ 
            sessionStorage.clear()
        } else {
            if (remainingTimeLocal >= 1000) {
                requestAnimationFrame(showTimeLocal);
            }
        }
    }
    requestAnimationFrame(showTimeLocal);
}
// Clear local storage if plugin button in menu was clicked
function clearLocalStorage(){
    clear = document.querySelector('.menu-item-2956')
    if(!clear) {
        clear = document.querySelector('.menu-item-912')
    }
    
    clear.addEventListener('click', ()=>{
        sessionStorage.clear()
    })
}
// Date picker functionality in step third. Irrigation date
function initDatepicker(){
    jQuery('.datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'mm/dd/yy',
        altFormat: 'mm/dd/yy',
        // minDate: new Date(),
    });
    jQuery('.datepicker').on('click', function(e) {
        e.preventDefault();
        $(this).attr("autocomplete", "off");
    });
}
// Map functionality on the right side of the form
function openCloseMap(){
    let closeButton = document.getElementById('dialog-close-button'),
        openPopup = document.getElementById('open_popup_img'),
        increaseMap = document.getElementById('eicon-zoom-in-bold'),
        imagePopup = document.getElementById('elementor_lightbox_image'),
        increaseBoolean = false,
        openPopupBoalean = false,
        popupMap = document.getElementById('elementor-lightbox-slideshow-single-img');

    closeButton.addEventListener('click', ()=>{
        popupMap.style.display = 'none'
        openPopupBoalean = false
    })
    openPopup.addEventListener('click', ()=>{
        popupMap.style.display = 'block'
        openPopupBoalean = true
    })
    increaseMap.addEventListener('click', ()=>{
        if(increaseBoolean == false){
            imagePopup.style.height = '200%';
            imagePopup.style.width= '200%';
            increaseBoolean = true;
        } else {
            imagePopup.style.height = '100%';
            imagePopup.style.width= '100%';
            increaseBoolean = false;
        }
    })
}
// function inputExeptions(){
//     const  inputsNotRequired = document.querySelectorAll('input:not([required])');
//     return inputsNotRequired
// }

// The method after receiving data about the company, using the conditions.
// The script will be determined, which the user will follow
function secondStep (data){
    let divForInputs = document.querySelectorAll('.contact__updates'),
        phoneDivs = document.querySelectorAll('.phone__div'),
        phoneLegends = document.querySelectorAll('.phone__legend'),
        firstInfo = document.getElementById('first_info'),
        div = document.querySelector('.contact__updates-div');

    window.closeSpinner(document.querySelector('#firstForm .loader'))
    window.scrollToTop()
    window.ready_suggestions = false
    // These lines of code are designed so that the user can go back 1 step without refreshing the page
    document.getElementById('commercial_second_form').reset();
    document.getElementById('residential_second_form').reset();
    document.getElementById('commercial_third_section').reset();
    document.getElementById('residential_third_section').reset();
    divForInputs.item(0).classList.add('hide')
    divForInputs.item(1).classList.add('hide')
    phoneDivs.item(0).classList.add('hide')
    phoneDivs.item(1).classList.add('hide')
    phoneLegends.item(0).classList.add('hide')
    phoneLegends.item(1).classList.add('hide')
    div.classList.add('hide')
    document.querySelector('.site_contact_radio').innerHTML = ''
    document.querySelector('.res_site_contact_radio').innerHTML = ''
    document.getElementById('server_busy_note').classList.add('hide');
    document.getElementById('server_busy_text').innerHTML = ''

    company = data.data
    sessionStorage.data = JSON.stringify(data)
    firstInfo.style.display = 'none'
    statusRequestFalse = false
    window.first_time = true
    processingTimerStop = true
    reloadPage = false
    window.wo_dates_suggestions = undefined
    sessionStorage.setItem('first_time', window.first_time)
    if(company){
        window.deviceDueDateStart = company?.device_due_date_outdated_start
        window.deviceDueDateEnd = company?.device_due_date_outdated_end
    }
    if(window.deviceDueDateStart != undefined && window.deviceDueDateStart != false){
        window.deviceDueDateStart = window.deviceDueDateStart.split('/')
        window.deviceDueDateStart = window.deviceDueDateStart[1] + '-' + window.deviceDueDateStart[0] + '-' + window.deviceDueDateStart[2]
        sessionStorage.setItem('device_due_date_start', window.deviceDueDateStart)
    }
    if(window.deviceDueDateEnd != undefined && window.deviceDueDateEnd != false){
        window.deviceDueDateEnd = window.deviceDueDateEnd.split('/')
        window.deviceDueDateEnd = window.deviceDueDateEnd[1] + '-' + window.deviceDueDateEnd[0] + '-' + window.deviceDueDateEnd[2]
        sessionStorage.setItem('device_due_date_end', window.deviceDueDateEnd)
    }
    // This condition defines the script
    isRequestNotEmpty(data) ? requestNotEmpty(data) : requestEmpty()
    applyMask()
}
// Script with data
function requestNotEmpty(data){
    if(company.wo_appointed_date == undefined){
        window.quantitySteps()
        window.openMessageBox(true)
        hideHiddenCompanyFields()
        isCommercial() ? doCommercialThings() : doResidentialThings()
        // editInputsInit()
    }
}
// Script with no data
function requestEmpty(data){
    window.quantitySteps()
    window.openMessageBox(false)
    document.commercial_second_form.other.classList.add('hide')
    document.residential_second_form.other.classList.add('hide')
    showHiddenCompanyFields()
    isCommercial() ? doCommercialThingsWithNoData() : doResidentialThingsWithNoData()

}
// The method fills the inputs with data from the request
function populateCompanyData() {
    let secondForm = isCommercial() ? document.commercial_second_form
    : document.residential_second_form;
    parseFormContact(secondForm)
    let thirdForm = document.commercial_third_section
    if (window.company != undefined) {
        if(!isCommercial()){
            secondForm.address.value = company.addresses.site?.address_line1
                ?? company.addresses.bill?.address_line1
                ?? company.addresses.mail?.address_line1
            secondForm.address_line.value = company.addresses.site?.address_line2
                ?? company.addresses.bill?.address_line2
                ?? company.addresses.mail?.address_line2
            secondForm.zip.value = company.addresses.site?.postal_code
                ?? company.addresses.bill?.postal_code
                ?? company.addresses.mail?.postal_code
            secondForm.city.value = company.addresses.site?.locality
                ?? company.addresses.bill?.locality
                ?? company.addresses.mail?.locality
            isCompanyHaveOneAdress() ? secondForm.mailing_billing.value = 'yes'
                : secondForm.mailing_billing.value = 'no'
            isCompanyHaveOneAdress() ? hideMailingBillingDivs() : parseMailingBilling()
        }
        thirdForm.company_name.value = company.company_name
        thirdForm.address.value = company.addresses.site?.address_line1
            ?? company.addresses.bill?.address_line1
            ?? company.addresses.mail?.address_line1
        thirdForm.address_line.value = company.addresses.site?.address_line2
            ?? company.addresses.bill?.address_line2
            ?? company.addresses.mail?.address_line2
        thirdForm.zip.value = company.addresses.site?.postal_code
            ?? company.addresses.bill?.postal_code
            ?? company.addresses.mail?.postal_code
        thirdForm.city.value = company.addresses.site?.locality
            ?? company.addresses.bill?.locality
            ?? company.addresses.mail?.locality
        isCompanyHaveOneAdress() ? thirdForm.mailing_billing.value = 'yes'
            : thirdForm.mailing_billing.value = 'no'
        isCompanyHaveOneAdress() ? hideMailingBillingDivs() : parseMailingBilling()
    }
}
// Script - commercial + no data + show second steps
function doCommercialThingsWithNoData(){
    if(window.company != undefined){
        if(window.company.wo_appointed_date == undefined){
            window.step_index = 1
            sessionStorage.setItem('step_index', window.step_index)
            document.firstForm.style.display ='none';
            document.commercial_second_form.style.display = 'block';
            if (firstFormData.CID) commercial_second_form.CID.value = firstFormData.CID;
            if (firstFormData.email) commercial_second_form.email.value = firstFormData.email;
            populateCompanyData()
        }
    } else {
            window.step_index = 1
            sessionStorage.setItem('step_index', window.step_index)
            document.firstForm.style.display ='none';
            document.commercial_second_form.style.display = 'block';
            if (firstFormData.CID) commercial_second_form.CID.value = firstFormData.CID;
            if (firstFormData.email) commercial_second_form.email.value = firstFormData.email;
            populateCompanyData()
    }
}
// Script - residential + no data + show second steps
function doResidentialThingsWithNoData(){
    if(window.company != undefined){
        if(window.company.wo_appointed_date == undefined){
            window.step_index = 1
            sessionStorage.setItem('step_index', window.step_index)
            document.firstForm.style.display ='none';
            document.residential_second_form.style.display = 'block';
            if (firstFormData.CID) residential_second_form.CID.value = firstFormData.CID;
            if (firstFormData.email) residential_second_form.email.value = firstFormData.email;
            populateCompanyData()
        }
    } else {
            window.step_index = 1
            sessionStorage.setItem('step_index', window.step_index)
            document.firstForm.style.display ='none';
            document.residential_second_form.style.display = 'block';
            if (firstFormData.CID) residential_second_form.CID.value = firstFormData.CID;
            if (firstFormData.email) residential_second_form.email.value = firstFormData.email;
            populateCompanyData()
    }
}
// Script - residential + data
function doResidentialThings(){
    hideFirstForm()
    parseResidentialInputs()
}
// Script - residential + data + show second step
function parseResidentialInputs (){
    let secondForm = document.residential_second_form;
    hideRadioLogic()
    parseFormAdresses(secondForm);
    parseFormContact(secondForm);
    disableInputs(document.residential_second_form)
}
// Save change inputs and checkbox commercial second step to sessionStorage
function saveChangeInputsCommercialSecondStep(){    
    sessionStorage.setItem('CID',document.commercial_second_form.CID.value)
    sessionStorage.setItem('CCN',document.commercial_second_form.CCN.value)
    sessionStorage.setItem('first_name',document.commercial_second_form.first_name.value)
    sessionStorage.setItem('second_name',document.commercial_second_form.second_name.value)
    sessionStorage.setItem('email',document.commercial_second_form.email.value)
    sessionStorage.setItem('phone',document.commercial_second_form.phone.value)
    sessionStorage.setItem('site_first_name',document.commercial_second_form.site_first_name.value)
    sessionStorage.setItem('site_last_name',document.commercial_second_form.site_last_name.value)
    sessionStorage.setItem('site_email',document.commercial_second_form.site_email.value)
    sessionStorage.setItem('site_phone',document.commercial_second_form.site_phone.value)

    phone_type = document.commercial_second_form.phone_type
    phone_type.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('phone_type', index)
        }
    })

    contact_update = document.commercial_second_form.contact_update
    contact_update.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('contact_update', index)
        }
    })
}
// Save change inputs and checkbox residential second step to sessionStorage
function saveChangeInputsResidentialSecondStep(){    
    sessionStorage.setItem('CID',document.residential_second_form.CID.value)
    sessionStorage.setItem('CCN',document.residential_second_form.CCN.value)
    sessionStorage.setItem('first_name',document.residential_second_form.first_name.value)
    sessionStorage.setItem('second_name',document.residential_second_form.second_name.value)
    sessionStorage.setItem('email',document.residential_second_form.email.value)
    sessionStorage.setItem('phone',document.residential_second_form.phone.value)
    sessionStorage.setItem('address',document.residential_second_form.address.value)
    sessionStorage.setItem('address_line',document.residential_second_form.address_line.value)
    sessionStorage.setItem('city',document.residential_second_form.city.value)
    sessionStorage.setItem('state',document.residential_second_form.state.value)
    sessionStorage.setItem('zip',document.residential_second_form.zip.value)
    sessionStorage.setItem('bill_mail_name',document.residential_second_form.bill_mail_name.value)
    sessionStorage.setItem('bill_mail_address',document.residential_second_form.bill_mail_address.value)
    sessionStorage.setItem('bill_mail_address_line',document.residential_second_form.bill_mail_address_line.value)
    sessionStorage.setItem('bill_mail_city',document.residential_second_form.bill_mail_city.value)
    sessionStorage.setItem('bill_mail_state',document.residential_second_form.bill_mail_state.value)
    sessionStorage.setItem('bill_mail_zip',document.residential_second_form.bill_mail_zip.value)
    sessionStorage.setItem('site_contact_first',document.residential_second_form.site_contact_first.value)
    sessionStorage.setItem('site_contact_last',document.residential_second_form.site_contact_last.value)
    sessionStorage.setItem('site_contact_phone',document.residential_second_form.site_contact_phone.value)
    sessionStorage.setItem('site_contact_email',document.residential_second_form.site_contact_email.value)

    phone_type = document.residential_second_form.phone_type
    phone_type.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('phone_type', index)
        }
    })
    mailing_billing = document.residential_second_form.mailing_billing
    mailing_billing.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('mailing_billing', index)
        }
    })
    site_choice = document.residential_second_form.site_choice
    site_choice.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('site_choice', index)
        }
    })
}
// Save change inputs and checkbox residential third step to sessionStorage
function saveChangeInputsResidentialThirdStep(){  
    sessionStorage.setItem('gated_text', document.residential_third_section.gated_text.value)
    sessionStorage.setItem('lockbox_location', document.residential_third_section.res_lockbox_location.value)
    sessionStorage.setItem('lockbox_code', document.residential_third_section.res_lockbox_code.value)
    sessionStorage.setItem('rental_first_name', document.residential_third_section.res_rental_first_name.value)
    sessionStorage.setItem('rental_last_name', document.residential_third_section.res_rental_last_name.value)
    sessionStorage.setItem('rental_phone', document.residential_third_section.res_rental_phone.value)
    sessionStorage.setItem('rental_email', document.residential_third_section.res_rental_email.value)
    sessionStorage.setItem('turned_on', document.residential_third_section.datepicker_turned_on.value)

    gated = document.residential_third_section.gated
    gated.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('gated', index)
        }
    })
    adress_type = document.residential_third_section.adress_type
    adress_type.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('adress_type', index)
        }
    })
    device_location = document.residential_third_section.device_location
    device_location.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('device_location', index)
        }
    })
    lawn = document.residential_third_section.lawn
    lawn.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('lawn', index)
        }
    })
    access_type = document.residential_third_section.access_type
    access_type.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('access_type', index)
        }
    })
}
// Save change inputs commercial third step to sessionStorage
function saveChangeInputsCommercialThirdStep(){
    sessionStorage.setItem('company_name',document.commercial_third_section.company_name.value)
    sessionStorage.setItem('address',document.commercial_third_section.address.value)
    sessionStorage.setItem('address_line',document.commercial_third_section.address_line.value)
    sessionStorage.setItem('city',document.commercial_third_section.city.value)
    sessionStorage.setItem('state',document.commercial_third_section.state.value)
    sessionStorage.setItem('zip',document.commercial_third_section.zip.value)
    sessionStorage.setItem('lockbox_location',document.commercial_third_section.com_lockbox_location.value)
    sessionStorage.setItem('lockbox_code',document.commercial_third_section.com_lockbox_code.value)
    sessionStorage.setItem('input_open_hours',document.commercial_third_section.input_open_hours.value)
    sessionStorage.setItem('input_open_minutes',document.commercial_third_section.input_open_minutes.value)
    sessionStorage.setItem('input_close_hours',document.commercial_third_section.input_close_hours.value)
    sessionStorage.setItem('input_close_minutes',document.commercial_third_section.input_close_minutes.value)
    sessionStorage.setItem('billing_attention',document.commercial_third_section.billing_attention.value)
    sessionStorage.setItem('billing_address',document.commercial_third_section.billing_address.value)
    sessionStorage.setItem('billing_address_line',document.commercial_third_section.billing_address_line.value)
    sessionStorage.setItem('billing_city',document.commercial_third_section.billing_city.value)
    sessionStorage.setItem('billing_state',document.commercial_third_section.billing_state.value)
    sessionStorage.setItem('billing_zip',document.commercial_third_section.billing_zip.value)
    sessionStorage.setItem('mailing_attention',document.commercial_third_section.mailing_attention.value)
    sessionStorage.setItem('mailing_address',document.commercial_third_section.mailing_address.value)
    sessionStorage.setItem('mailing_address_line',document.commercial_third_section.mailing_address_line.value)
    sessionStorage.setItem('mailing_city',document.commercial_third_section.mailing_city.value)
    sessionStorage.setItem('mailing_state',document.commercial_third_section.mailing_state.value)
    sessionStorage.setItem('mailing_zip',document.commercial_third_section.mailing_zip.value)
    sessionStorage.setItem('rental_first_name',document.commercial_third_section.com_rental_first_name.value)
    sessionStorage.setItem('rental_last_name',document.commercial_third_section.com_rental_last_name.value)
    sessionStorage.setItem('rental_phone',document.commercial_third_section.com_rental_phone.value)
    sessionStorage.setItem('rental_email',document.commercial_third_section.com_rental_email.value)
    sessionStorage.setItem('location_comment',document.commercial_third_section.location_comment.value)
    sessionStorage.setItem('turned_on',document.commercial_third_section.datepicker_turned.value)
    sessionStorage.setItem('operational_time_open_hours',document.commercial_third_section.operational_time_open_hours.value)
    sessionStorage.setItem('operational_time_open_minutes',document.commercial_third_section.operational_time_open_minutes.value)
    sessionStorage.setItem('operational_open_times_of_day',document.commercial_third_section.operational_open_times_of_day.value)
    sessionStorage.setItem('operational_time_close_hours',document.commercial_third_section.operational_time_close_hours.value)
    sessionStorage.setItem('operational_time_close_minutes',document.commercial_third_section.operational_time_close_minutes.value)
    sessionStorage.setItem('operational_close_times_of_day',document.commercial_third_section.operational_close_times_of_day.value)
}
// Save change checkbox commercial third step to sessionStorage
function saveChangeRadioCommercialThirdStep(){
    adress_type = document.commercial_third_section.adress_type
    adress_type.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('adress_type', index)
        }
    })
    commercial_location = document.commercial_third_section.commercial_location
    commercial_location.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('commercial_location', index)
        }
    })
    lawn = document.commercial_third_section.lawn
    lawn.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('lawn', index)
        }
    })
    device_location = document.commercial_third_section.device_location
    device_location.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('device_location', index)
        }
    })
    access_type = document.commercial_third_section.access_type
    access_type.forEach((elem, index) => {
        if(elem.checked == true){
            sessionStorage.setItem('access_type', index)
        }
    })
}
// Used after refreshing the page for correct filling third steps with sessionStorage. If page refresh on second step
function thirdCommercialStep(){
    disableInputs(document.commercial_second_form)
    parseFormContact(document.commercial_second_form);
    let secondForm = document.commercial_second_form,
        loaderSecondForm = document.querySelector('#commercial_second_form .loader'),
        thirdForm = isCommercial ? document.commercial_third_section
                                : document.residential_third_section;
    if (window.company != undefined) {
        thirdForm.company_name.value = company.company_name
        thirdForm.address.value = company.addresses.site?.address_line1
            ?? company.addresses.bill?.address_line1
            ?? company.addresses.mail?.address_line1
        thirdForm.address_line.value = company.addresses.site?.address_line2
            ?? company.addresses.bill?.address_line2
            ?? company.addresses.mail?.address_line2
        thirdForm.zip.value = company.addresses.site?.postal_code
            ?? company.addresses.bill?.postal_code
            ?? company.addresses.mail?.postal_code
        thirdForm.city.value = company.addresses.site?.locality
            ?? company.addresses.bill?.locality
            ?? company.addresses.mail?.locality
        isCompanyHaveOneAdress ? thirdForm.mailing_billing.value = 'yes'
            : thirdForm.mailing_billing.value = 'no'
        isCompanyHaveOneAdress ? hideMailingBillingDivs : parseMailingBilling
    
        window.showLegend(thirdForm.city)

        let operational_time = document.querySelector('.operational_time');
        operational_time.classList.remove('hide')
        alertNote = document.getElementById('alert_note')
        siteContactsDiv = document.querySelector('.site_contact_radio')
        contacts = window.company.contacts

        i = 0 
        last_index = 0
        for (let key in contacts) {
            if(last_index == i) {
                if(contacts[key].site_contact == true){
                    first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                    last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                    email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                    phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                    siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="com_contact_site_${i}"
                        data-el="contact_site_access" data-radio="site_access_radio"
                        name="access_site" value="site_contacts">
                        <label for='com_contact_site_${i}'>
                        First name: <span>${first_name}</span><br>
                        Last name: <span>${last_name}</span><br>
                        Email: <span>${email}</span><br>
                        Phone: <span>${phone}</span>
                        </label></div>`
                }
            } else {
                if(contacts[key].site_contact == true){
                    first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                    last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                    email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                    phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                    siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="com_contact_site_${i}"
                        data-el="contact_site_access" data-radio="site_access_radio"
                        name="access_site" value="site_contacts">
                        <label for='com_contact_site_${i}'>
                        First name: <span>${first_name}</span><br>
                        Last name: <span>${last_name}</span><br>
                        Email: <span>${email}</span><br>
                        Phone: <span>${phone}</span>
                        </label></div>`
                }
            }
            i++
        }
        hideSiteContactLogic()
        if(window.company.outside_flags.outside == true && window.company.outside_flags.outside_only == false){
            let hide_block = document.querySelector('.hide_outside'),
                date__legend = document.querySelector('.date__legend'),
                inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`);

                hide_block.style.display = 'none'
                inside_loc_div.classList.remove('hide')
                date__legend.innerHTML = `SINCE ONE OR MORE DEVICES ARE LOCATED OUTSIDE PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*`
        } else if(window.company.outside_flags.outside_only == true){
            let sprinklers_radio_group = document.querySelector(`[data-group^=sprinklers_radio_group`),
                inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`);

            thirdForm.lawn.forEach(elem =>{
                elem.disabled = true
                if(elem.value == 'yes'){
                    elem.checked = true
                }
            })
            
            sprinklers_radio_group.classList.remove('hide')

            thirdForm.device_location.forEach(elem =>{
                elem.disabled = true
                if(elem.value == 'outside'){
                    elem.checked = true
                }
            })

            inside_loc_div.classList.remove('hide')
        }
        if (jQuery(secondForm).valid()) {
            loaderSecondForm.classList.remove('hide')
            setTimeout(()=>{
                window.step_index = 2
                sessionStorage.setItem('step_index', window.step_index)
                secondForm.style.display = 'none';
                thirdForm.style.display = 'block';
                alertNote.style.display = 'block';
            }, 1000)
            loaderSecondForm.classList.add('hide')
        }
        disableInputs(thirdForm);
    }
}
// Used after refreshing the page for correct filling third step with sessionStorage
function parseThirdCommercialStep(){
        thirdForm = isCommercial ? document.commercial_third_section
                                : document.residential_third_section;
        if (window.company != undefined) {
            thirdForm.company_name.value = company.company_name
            thirdForm.address.value = company.addresses.site?.address_line1
                ?? company.addresses.bill?.address_line1
                ?? company.addresses.mail?.address_line1
            thirdForm.address_line.value = company.addresses.site?.address_line2
                ?? company.addresses.bill?.address_line2
                ?? company.addresses.mail?.address_line2
            thirdForm.zip.value = company.addresses.site?.postal_code
                ?? company.addresses.bill?.postal_code
                ?? company.addresses.mail?.postal_code
            thirdForm.city.value = company.addresses.site?.locality
                ?? company.addresses.bill?.locality
                ?? company.addresses.mail?.locality
            isCompanyHaveOneAdress ? thirdForm.mailing_billing.value = 'yes'
                : thirdForm.mailing_billing.value = 'no'
            isCompanyHaveOneAdress ? hideMailingBillingDivs : parseMailingBilling
        
            window.showLegend(thirdForm.city)

            let operational_time = document.querySelector('.operational_time');
            operational_time.classList.remove('hide')
            siteContactsDiv = document.querySelector('.site_contact_radio')
            contacts = window.company.contacts

            i = 0 
            last_index = 0
            for (let key in contacts) {
                if(last_index == i) {
                    if(contacts[key].site_contact == true){
                        first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                        last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                        email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                        phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                        siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="com_contact_site_${i}"
                            data-el="contact_site_access" data-radio="site_access_radio"
                            name="access_site" value="site_contacts">
                            <label for='com_contact_site_${i}'>
                            First name: <span>${first_name}</span><br>
                            Last name: <span>${last_name}</span><br>
                            Email: <span>${email}</span><br>
                            Phone: <span>${phone}</span>
                            </label></div>`
                    }
                } else {
                    if(contacts[key].site_contact == true){
                        first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                        last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                        email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                        phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                        siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="com_contact_site_${i}"
                            data-el="contact_site_access" data-radio="site_access_radio"
                            name="access_site" value="site_contacts">
                            <label for='com_contact_site_${i}'>
                            First name: <span>${first_name}</span><br>
                            Last name: <span>${last_name}</span><br>
                            Email: <span>${email}</span><br>
                            Phone: <span>${phone}</span>
                            </label></div>`
                    }
                }
                i++
            }
            hideSiteContactLogic()
            if(window.company.outside_flags.outside == true && window.company.outside_flags.outside_only == false){
                let hide_block = document.querySelector('.hide_outside'),
                    date__legend = document.querySelector('.date__legend'),
                    inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`);
    
                    hide_block.style.display = 'none'
                    inside_loc_div.classList.remove('hide')
                    date__legend.innerHTML = `SINCE ONE OR MORE DEVICES ARE LOCATED OUTSIDE PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*`
            } else if(window.company.outside_flags.outside_only == true){
                let sprinklers_radio_group = document.querySelector(`[data-group^=sprinklers_radio_group`),
                    inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`);
    
                thirdForm.lawn.forEach(elem =>{
                    elem.disabled = true
                    if(elem.value == 'yes'){
                        elem.checked = true
                    }
                })
                
                sprinklers_radio_group.classList.remove('hide')
    
                thirdForm.device_location.forEach(elem =>{
                    elem.disabled = true
                    if(elem.value == 'outside'){
                        elem.checked = true
                    }
                })
    
                inside_loc_div.classList.remove('hide')
            }
            disableInputs(thirdForm);
        }
}
// Vanilla method for filling commercial third step
function doCommercialThings(){
    if(window.firstFormData.type == 'commercial'){
        document.commercial_second_form.style.display = 'block'
    }
    window.step_index = 1
    sessionStorage.setItem('step_index', window.step_index)
    document.firstForm.style.display ='none'
    disableInputs(document.commercial_second_form)
    parseFormContact(document.commercial_second_form);

    let startThirdSectionSelect = document.querySelector('#commercial_second_form button#next'),
        secondForm = document.commercial_second_form,
        loaderSecondForm = document.querySelector('#commercial_second_form .loader'),
        thirdForm = isCommercial ? document.commercial_third_section
                                : document.residential_third_section;

    startThirdSectionSelect.addEventListener('click',()=>{
        if (window.company != undefined) {
            thirdForm.company_name.value = company.company_name
            thirdForm.address.value = company.addresses.site?.address_line1
                ?? company.addresses.bill?.address_line1
                ?? company.addresses.mail?.address_line1
            thirdForm.address_line.value = company.addresses.site?.address_line2
                ?? company.addresses.bill?.address_line2
                ?? company.addresses.mail?.address_line2
            thirdForm.zip.value = company.addresses.site?.postal_code
                ?? company.addresses.bill?.postal_code
                ?? company.addresses.mail?.postal_code
            thirdForm.city.value = company.addresses.site?.locality
                ?? company.addresses.bill?.locality
                ?? company.addresses.mail?.locality
            isCompanyHaveOneAdress ? thirdForm.mailing_billing.value = 'yes'
                : thirdForm.mailing_billing.value = 'no'
            isCompanyHaveOneAdress ? hideMailingBillingDivs : parseMailingBilling
        
            window.showLegend(thirdForm.city)

            let operational_time = document.querySelector('.operational_time');
            operational_time.classList.remove('hide')
            alertNote = document.getElementById('alert_note')
            siteContactsDiv = document.querySelector('.site_contact_radio')
            contacts = window.company.contacts

            i = 0 
            last_index = 0
            for (let key in contacts) {
                if(last_index == i) {
                    if(contacts[key].site_contact == true){
                        first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                        last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                        email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                        phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                        siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="com_contact_site_${i}"
                            data-el="contact_site_access" data-radio="site_access_radio"
                            name="access_site" value="site_contacts">
                            <label for='com_contact_site_${i}'>
                            First name: <span>${first_name}</span><br>
                            Last name: <span>${last_name}</span><br>
                            Email: <span>${email}</span><br>
                            Phone: <span>${phone}</span>
                            </label></div>`
                    }
                } else {
                    if(contacts[key].site_contact == true){
                        first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                        last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                        email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                        phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                        siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="com_contact_site_${i}"
                            data-el="contact_site_access" data-radio="site_access_radio"
                            name="access_site" value="site_contacts">
                            <label for='com_contact_site_${i}'>
                            First name: <span>${first_name}</span><br>
                            Last name: <span>${last_name}</span><br>
                            Email: <span>${email}</span><br>
                            Phone: <span>${phone}</span>
                            </label></div>`
                    }
                }
                i++
            }
            hideSiteContactLogic()
            if(window.company.outside_flags.outside == true && window.company.outside_flags.outside_only == false){
                let hide_block = document.querySelector('.hide_outside'),
                    date__legend = document.querySelector('.date__legend'),
                    inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`);
    
                    hide_block.style.display = 'none'
                    inside_loc_div.classList.remove('hide')
                    date__legend.innerHTML = `SINCE ONE OR MORE DEVICES ARE LOCATED OUTSIDE PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*`
            } else if(window.company.outside_flags.outside_only == true){
                let sprinklers_radio_group = document.querySelector(`[data-group^=sprinklers_radio_group`),
                    inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`);
    
                thirdForm.lawn.forEach(elem =>{
                    elem.disabled = true
                    if(elem.value == 'yes'){
                        elem.checked = true
                    }
                })
                
                sprinklers_radio_group.classList.remove('hide')
    
                thirdForm.device_location.forEach(elem =>{
                    elem.disabled = true
                    if(elem.value == 'outside'){
                        elem.checked = true
                    }
                })
    
                inside_loc_div.classList.remove('hide')
            }
            if (jQuery(secondForm).valid()) {
                loaderSecondForm.classList.remove('hide')
                setTimeout(()=>{
                    window.step_index = 2
                    sessionStorage.setItem('step_index', window.step_index)
                    secondForm.style.display = 'none';
                    thirdForm.style.display = 'block';
                    alertNote.style.display = 'block';
                }, 1000)
                loaderSecondForm.classList.add('hide')
            }
            disableInputs(thirdForm);
        }
    })
        
}
// function toggleDateBlocks(response){
//     openLoader = document.getElementById('loader_fifth')
//     miniDateInfo = document.getElementById('mini_date_info')
//     noDateInfo = document.getElementById('no_date_info')
//     suggestions = document.querySelector('.suggestions')
    
//     if (response == true) {
//         openLoader.classList.remove('hide')
//         miniDateInfo.classList.remove('hide')
//         noDateInfo.classList.add('hide')
//     } else {
//         openLoader.classList.add('hide')
//         miniDateInfo.classList.add('hide')
//         noDateInfo.classList.remove('hide')
//     }
//     suggestions.innerHTML = '';
// }
// 

// If there are no dates for the user, he will be sent to send a letter to the manager
window.wodates = true;
// Checking the user token, can he get dates
function jobTokenCookie(data){
    let result = JSON.parse(data.data)
    if (data.success == true){
        if (result.result == 'success'){
            let name = "jobtoken";
            let value = result.job_token;
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            window.wodates = true;
            sessionStorage.setItem('wodates', window.wodates)
            let stopInterval = setInterval(()=>{
                if(document.sixth_form.style.display == 'block' || document.second_comment_form.style.display == 'block' || document.comment_form.style.display == 'block'){
                    clearInterval(stopInterval)
                }
                if((window.stopDateTimer == true || window.first_time == true) && (inputRangeHours >= 0 || window.firstFormData.type == 'residential') && document.fifth_form.style.display == 'block'){
                    sendToken();
                    clearInterval(stopInterval)
                }
            }, 500)
        } else if(data.success == true && result.wo_appointed_date != undefined){
            woAppointedDateEarly = true
            resultDataEarly = result
        }
    } else {
        window.wodates = false;
        sessionStorage.setItem('wodates', window.wodates)
    }
    window.ready_suggestions = true
    sessionStorage.setItem('ready_suggestions', window.ready_suggestions)
}
// Token hash
function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}
// Request for new dates when conditions are passed
function sendToken(){
    console.log(window.wo_dates_suggestions, checkIfIrrigationDateChanged(), window.getNewDates)
    if ((window.wo_dates_suggestions == undefined || checkIfIrrigationDateChanged() || window.getNewDates == true) && window.company.device_amount <= 50) {
        let formDataJson = {
            action : 'getdatessuggestions',
            nonce: mainVars.nonce,
            token : getCookie('jobtoken'),
        },
        formData = getFormData(formDataJson);
        window.getNewDates = false
        fetch( mainVars.ajax_url, {
            method: 'POST',
            body: formData,
        } )
            .then( res => res.text() )
            .then( (data,formData) => {doValidationSuggestions(JSON.parse(data),formData)})
            .catch( err => console.log( err,data) );
    }else {
        parseFifthSection(wo_dates_suggestions)
        window.stopTimer = false
        if(remainingTimeAfterReload == 0 || remainingTimeAfterReload == null){
            TimerProgress()
        }
    }

}
var tryProcessingTimer = 0
var processingTimerBool = true
var processingTimerStop = true
function processingTimer(){
    if(processingTimerBool == true && processingTimerStop == false) {
        processingTimerBool = false
        tryProcessingTimer++
        if(tryProcessingTimer > 3 && document.fifth_form.style.display == 'block') {
            tryProcessingTimer = 0
            indexTryBusyServer = 1
            document.getElementById('server_busy_note').classList.add('hide');
            document.getElementById('server_busy_text').innerHTML = ''
            document.commercial_third_section.style.display = 'none'
            document.residential_third_section.style.display = 'none'
            document.fifth_form.style.display = 'none'
            document.comment_form.style.display = 'block'
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)

            let box = document.querySelector('.message__box'),
                dateInfo = document.getElementById('date_info'),
                messageSuccess = document.querySelector('.message__success'),
                extraNote = document.querySelector('.message__success'),
                messageServerBusy = document.querySelector('.massage__error__server_busy');

            box.style.display = 'block'
            dateInfo.style.display = 'none'
            messageSuccess.style.display = 'none'
            extraNote.style.display = 'none'
            messageServerBusy.style.display = 'block'
            window.stopTimer = true
        } else if(document.fifth_form.style.display != 'block'){
            tryProcessingTimer = 0
        }
        
        setTimeout(()=>{
            if(indexTryBusyServer < 5) {
                indexTryBusyServer = 1
            }
            processingTimerBool = true
        }, 60000)
    }
}
var indexTryBusyServer = 1
var statusRequestFalse = false
// Conditions for switching to a method with receiving dates or switching to a form with sending a letter to a manager
function doValidationSuggestions(data){
    if (data.data.status == 'done'){
        window.validationCheck = true
        processingTimerStop = true
        wo_dates_suggestions = data.data.data.wo_dates_suggestions
        sessionStorage.wo_dates_suggestions = JSON.stringify(wo_dates_suggestions)
        indexTryBusyServer = 1
        statusRequestFalse = false
        processingTimerStop = false
        document.getElementById('server_busy_note').classList.add('hide');
        document.getElementById('server_busy_text').innerHTML = ''
        if(window.validationCheck == true || window.validationCheck == undefined){
            dateTimer()
            window.stopTimer = true

            setTimeout(()=>{
                window.stopTimer = false
                TimerProgress()
            }, 500)
        }
        parseFifthSection(wo_dates_suggestions)
    }
    else if(data.data.status == 'processing' || data.data.status == 'pending') {
        window.validationCheck = false
        setTimeout(()=>{
            sendToken()
        }, 1500)
    }
    else if(data.data.status == 'server_busy' || data.data.status == 'outdated') {
        if(indexTryBusyServer < 5){
            indexTryBusyServer++
            window.validationCheck = false
            processingTimerStop = false
            document.getElementById('server_busy_note').classList.remove('hide');
            document.getElementById('server_busy_text').innerHTML = `Server is busy, retry... #${indexTryBusyServer}`
            setTimeout(()=>{
                if(firstFormData.type == 'commercial'){
                    form = document.commercial_third_section
                    sendCompanyDataForToken(form)
                } else {
                    form = document.residential_third_section
                    sendCompanyDataForToken(form)
                }
            }, 5000)
        } else {
            indexTryBusyServer = 1
            processingTimerStop = true
            document.getElementById('server_busy_note').classList.add('hide');
            document.getElementById('server_busy_text').innerHTML = ''
            document.commercial_third_section.style.display = 'none'
            document.residential_third_section.style.display = 'none'
            document.fifth_form.style.display = 'none'
            document.comment_form.style.display = 'block'
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)

            let box = document.querySelector('.message__box'),
                dateInfo = document.getElementById('date_info'),
                messageSuccess = document.querySelector('.message__success'),
                extraNote = document.querySelector('.message__success'),
                messageServerBusy = document.querySelector('.massage__error__server_busy');

            box.style.display = 'block'
            dateInfo.style.display = 'none'
            messageSuccess.style.display = 'none'
            extraNote.style.display = 'none'
            messageServerBusy.style.display = 'block'
            window.stopTimer = true
        }
    }
    else if (data.data.status == 'failed' || data.data.status == 'aborted' || data.data.status == 'due_date_falls' || data.data.status == 'wo_time') {
        document.commercial_third_section.style.display = 'none'
        document.residential_third_section.style.display = 'none'
        processingTimerStop = true
        statusRequestFalse = true
        document.fifth_form.style.display = 'none'
        document.comment_form.style.display = 'block'
        document.getElementById('server_busy_note').classList.add('hide');
        document.getElementById('server_busy_text').innerHTML = ''
        indexTryBusyServer = 1
        window.step_index = 7
        sessionStorage.setItem('step_index', window.step_index)

        let box = document.querySelector('.message__box'),
            dateInfo = document.getElementById('date_info'),
            messageSuccess = document.querySelector('.message__success'),
            extraNote = document.querySelector('.message__success'),
            messageManyDevices = document.querySelector('.massage__error__many_devices'),
            // massageDueDateFalls = document.querySelector('.massage__error__due_date_falls'),
            massageOperationalHours = document.querySelector('.massage__error__operational_hours'),
            messageNoDate = document.querySelector('.massage__error__no_date');

        box.style.display = 'block'
        dateInfo.style.display = 'none'
        messageSuccess.style.display = 'none'
        extraNote.style.display = 'none'
        if(window.company.device_amount > 50){
            messageManyDevices.style.display = 'block'
            window.stopTimer = true
        } else 
        // if(data.data.status == 'due_date_falls'){
        //     massageDueDateFalls.style.display = 'block'
        //     window.stopTimer = true
        // } else 
        if(data.data.status == 'aborted'){
            messageNoDate.style.display = 'block'
            window.stopTimer = true
        } else if(data.data.status == 'wo_time') {
            massageOperationalHours.style.display = 'block'
            window.stopTimer = true
        } else if(data.data.status == 'failed'){
            messageNoDate.style.display = 'block'
            window.stopTimer = true
        }
    }
}
// Checking the company type
function isCommercial (){
    return (firstFormData.type == 'commercial') ?  true : false
}
// Checking for multiple company addresses
function isCompanyHaveOneAdress (){
    return (company.addresses.mail == company.addresses.mail) ? true : false
}
// If the user has an expired due date, then he will follow the script without no dates
function TodayVsDueDate(data){
    // let date = new Date(),
        // today = String(String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getDate()).padStart(2, '0') + '/' + date.getFullYear(),
        // todays = new Date(today),
        // dueDate = new Date(window.company.device_due_date);
    // if(todays.getTime() > dueDate.getTime()) {
    //     window.today_due_date = true
    //     sessionStorage.setItem('today_due_date', window.today_due_date)
    //     data.data = undefined
    // } else {
        window.today_due_date = false
        sessionStorage.setItem('today_due_date', window.today_due_date)
    // }
}
// Checking the user ability to follow the script with data
function isRequestNotEmpty(data){
    window.today_due_date = false
    sessionStorage.setItem('today_due_date', window.today_due_date)
    if (data.data !== undefined) {
        if (!data.data.device_amount && window.company.wo_appointed_date == undefined) data.data = undefined;
        if (window.company.autocreate_wo_disallowed == 'due_dates_diff_exceed' || window.company.autocreate_wo_disallowed == 'wo_exists_in_past'){
            data.data = undefined
        } 
        TodayVsDueDate(data)
        if (window.company.wo_appointed_date != undefined) InfoCreatedWO();
        return data.data == undefined ? false : true
    } 
}
// Displaying a form with complete information about the customer's order
function InfoCreatedWO(){
    let form = document.firstForm,
        form_info = document.wo_info,
        createdInfo = document.getElementById('created_info'),
        createdOrderInfo = document.getElementById('created_order_info'),
        hideCreatedWo = document.getElementById('hide_created_wo'),
        checkboxOrder = document.getElementById('checkbox_order_info'),
        dateInfo = document.getElementById('date_info');
        createdName = document.getElementById('created_name');

        form.style.display = 'none'
        checkboxOrder.style.display = 'none'
        window.step_index = 5
        sessionStorage.setItem('step_index', window.step_index)
        form_info.style.display = 'block'
        createdInfo.style.display = 'block'
        createdOrderInfo.style.display = 'block'
        dateInfo.style.display = 'none'
        hideCreatedWo.style.display = 'none'
        createdName.innerHTML = `Hello ${window.company.contact.first_name} ${window.company.contact.last_name}`
        document.commercial_second_form.style.display = 'none'
        document.residential_second_form.style.display = 'none'

        parseInfoCreatedWO()
}
// Parsing the form with complete information about the customer's order
function parseInfoCreatedWO(){
    let suggestionsblock = document.querySelector('.suggestions_info'),
        feesTable = document.getElementById('fees_table_info'),
        pagination = document.getElementById('pagination_info'),
        noFit = document.getElementById('no_fit'),
        createWO = document.getElementById('submit_wo_info_section'),
        percentageActive = document.querySelector('.form_progress .progress__active'),
        step = document.getElementById('step'),
        maxStep = document.getElementById('max_step'),
        deviceTable = document.getElementById('device_table_info');

        feesTable.innerHTML = `<tr><td>Device fee:</td><td>$ ${company.fees.device_fee}</td></tr>`
        if (company.fees.second_fee != 0.00){
            feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Second fee:</td><td>$ ${company.fees.second_fee}</td></tr>`
        }
        feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Village fee:</td><td>$ ${company.fees.village_fee}</td></tr>`
        feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Total fee:</td><td>$ ${ company.fees.total_fee}</td></tr>`
        deviceTable.innerHTML = `<tr><th>Size</th><th>Make</th><th>Model</th><th>Serial #</th><th>Application</th><th>Location</th><th>Due Date</th></tr>`
            for(let i=0; i < 20;i++){
                let device = window.company.device_table[i];
                if (device == undefined){
                    break;
                }
                deviceTable.innerHTML = deviceTable.innerHTML + `<tr data="${i}">
                                                            <td>${device.size}</td>
                                                            <td>${device.make}</td>
                                                            <td>${device.model}</td>
                                                            <td>${device.serial}</td>
                                                            <td>${device.application}</td>
                                                            <td>${device.location}</td>
                                                            <td>${device.due_date}</td></tr>`
            }
        if (window.company.device_amount > 20){
            pagination.classList.remove('hide')
        }

        renderDevicesByClickWOInfo()

        suggestionsblock.innerHTML =`<h3 class="red_date_title">${company.wo_appointed_date}</h3>`
        noFit.style.display = 'none'
        createWO.style.display = 'none'
        maxStep.innerHTML = 2
        step.innerHTML = 2
        percentageActive.style.width = 100 + '%';
        percentageActive.innerHTML = '100%';

}
function hideMailingBillingDivs(){

}
// Parsing the form inputs with company
function parseMailingBilling(form){
    form.bill_mail_state.value = company.addresses.bill?.administrative_area
        ?? company.addresses.mail?.administrative_area
    form.bill_mail_address.value = company.addresses.bill?.address_line1
        ?? company.addresses.mail?.address_line1
    form.bill_mail_address_line.value = company.addresses.bill?.address_line2
        ?? company.addresses.mail?.address_line2
    form.bill_mail_zip.value = company.addresses.bill?.postal_code
        ?? company.addresses.mail?.postal_code
    form.bill_mail_city.value = company.addresses.bill?.locality
        ?? company.addresses.mail?.locality
}
function parseBillingAndMailling(form){

}
// Request for company data
function doRequestFromFirstForm(form){
    sessionStorage.clear()
    hideRadioLogic()
    
    disableInputs(document.commercial_second_form,false)
    disableInputs(document.residential_second_form,false)
    disableInputs(document.commercial_third_section,false)
    disableInputs(document.residential_third_section,false)

    if(document.firstForm.CID.value && document.firstForm.email.value){
        let addtoformdata = {
            action : 'ajaxgetorgdata',
            nonce: mainVars.nonce
        },
        data = Object.fromEntries(new FormData(form).entries()),
        finalResult;
        firstFormData = data;
        sessionStorage.firstFormData = JSON.stringify(firstFormData)
        Object.assign(data,addtoformdata);
        finalResult = getFormData(data);
        
            fetch( mainVars.ajax_url, {
                method: 'POST',
                body: finalResult,
            } )
                .then( res => res.text())
                .then( data => secondStep(JSON.parse(data)))
                .catch( err => console.log( err,data) )
    } else {
        data = 0
        firstFormData = Object.fromEntries(new FormData(form).entries())
        sessionStorage.firstFormData = JSON.stringify(firstFormData)
        setTimeout(() => {
            secondStep(data)
        }, 1000);
    }
}
function getFormData(object) {

    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
function firstContact (obj){
    last_index = Object.keys(obj).length - 1

    return Object.keys(obj)[0];
}
function hideSuccessBlocks(){

    // document.querySelectorAll('.hide-if-success').forEach(el => {
    //     el.style.display='none';
    // })
}
// Mappings of the second step
function hideFirstForm(){
    let secondForm = document.residential_second_form,
        firstForm = document.firstForm;
        window.step_index = 1
        sessionStorage.setItem('step_index', window.step_index)
        firstForm.style.display='none';
        secondForm.style.display='block';
}
// Parsing the form inputs with company
function parseFormAdresses(form){
    form.state.value = company.addresses.site?.administrative_area
                    ?? company.addresses.bill?.administrative_area
                    ?? company.addresses.mail?.administrative_area
    form.address.value = company.addresses.site?.address_line1
                    ?? company.addresses.bill?.address_line1
                    ?? company.addresses.mail?.address_line1
    form.address_line.value = company.addresses.site?.address_line2
                    ?? company.addresses.bill?.address_line2
                    ?? company.addresses.mail?.address_line2
    form.zip.value = company.addresses.site?.postal_code
                    ?? company.addresses.bill?.postal_code
                    ?? company.addresses.mail?.postal_code
    form.city.value = company.addresses.site?.locality
                    ?? company.addresses.bill?.locality
                    ?? company.addresses.mail?.locality
    isCompanyHaveOneAdress() ? form.mailing_billing.value = 'yes'
                            : form.mailing_billing.value = 'no'
    if (form.mailing_billing.value == 'yes'){
        form.mailing_billing.forEach(el => {

            if (el.value == form.mailing_billing.value){
                let changeEvent = new Event('change');
                el.dispatchEvent(changeEvent);
            }
        })
    }
    isCompanyHaveOneAdress() ? hideMailingBillingDivs : parseBillingAndMailling(form)
}
// Parsing the form inputs with company              
function parseFormContact(form){
    if(window.company != undefined){
        let firstContactKey = firstContact((company.contacts));
        if(window.editing == false || window.editing == undefined){
            form.CID.value = company.company_id;
            form.CCN.value = company.ccn;
            form.second_name.value = company.contacts[firstContactKey].last_name;
            form.first_name.value = company.contacts[firstContactKey].first_name;
            form.CCN.value = company.ccn;
            if(company.contacts[firstContactKey].phone_numbers.length){
                form.phone.value = company.contacts[firstContactKey].phone_numbers[0].value;
            } else if (company.company_phone_numbers.length) {
                form.phone.value = company.company_phone_numbers[0].value;
            }
            if (Object.keys(company.contacts).length) form.email.value = company.contacts[firstContactKey].email;
            let phoneType = 'other'
            if(company.contacts[firstContactKey].phone_numbers.length){
                phoneType = company.contacts[firstContactKey].phone_numbers[0].type
            } else if (company.company_phone_numbers.length) {
                if ('' != company.company_phone_numbers[0].type) phoneType = company.company_phone_numbers[0].type
            }
            form.phone_type.value = phoneType
            if (form.phone_type.value == 'other'){
                form.phone_type.forEach(el => {
                    if (el.value == form.phone_type.value){
                        let changeEvent = new Event('change');
                        el.dispatchEvent(changeEvent);
                    }
                })
                if(company.contacts[firstContactKey].phone_numbers.length){
                    form.other.value = company.contacts[firstContactKey].phone_numbers[0].ext
                } else {
                    form.other.value = (company.company_phone_numbers.length) ? company.company_phone_numbers[0].ext : ''
                }
                
            }
        }
    }
}

// Shows hidden radio elements
function dontHideElementFromRadio(radios,value,el,inputs = undefined){
    radios.forEach(radio =>{
        radio.addEventListener('change',(e)=>{
            if (radio.value == value)
            {
                el.classList.remove('hide')
                inputs.forEach(input=>{
                    requireInput(input,true)
                })
            }
            else
            {
                el.classList.add('hide')
                    inputs.forEach(input=>{
                        requireInput(input,false)
                    })
            }
        })
    })
}
// Specifies required inputs
function requireInput(input,boolean){

        if(input.dataset.required == 'false') {
            input.required = false
        } else{
            input.required = boolean
        }


}
// Specifies required inputs
function isInNodelist(node,nodelist){
    Array.from(nodelist).some(el =>{
        el == node
    })
}
// Checkbox opening hierarchy functionality
function hideRadioLogic (){
    let showLogic = [
        {
                'radio_type' : 'phone_type',
                'value'      : 'other',
                'input'      : 'phone_type',
                'div'        : 'phone_type'
        },
        {
                'radio_type' : 'mailing_billing',
                'value'      : 'no',
                'input'      : 'mailing_billing_group',
                'div'        : 'mailing_billing'
        },
        {
            'radio_type' : 'phone_type_c',
            'value'      : 'other',
            'input'      : 'other_group_c',
            'div'        : 'phone_group_c'
        },
        {
            'radio_type' : 'contact_update',
            'value'      : 'NO',
            'input'      : 'contact_update',
            'div'        : 'contact_update'
        },
        {
            'radio_type' : 'mailing_billing_c',
            'value'      : 'no',
            'input'      : 'mailing_billing_c',
            'div'        : 'mailing_billing_c'
        },
        {
            'radio_type' : 'third_party',
            'value'      : 'yes',
            'input'      : 'third_party',
            'div'        : 'third_party'
        },
        {
            'radio_type' : 'commercial_location_with_no_data',
            'value'      : 'yes',
            'input'      : 'location_comment_with_no_data',
            'div'        : 'location_comment_with_no_data'
        },
        {
            'radio_type' : 'adress_is',
            'value'      : 'rental',
            'input'      : 'rental',
            'div'        : 'rental'
        },
        {
            'radio_type' : 'adress_is',
            'value'      : 'vacant',
            'input'      : 'vacant',
            'div'        : 'vacant'
        },
        {
            'radio_type' : 'contact_site',
            'value'      : 'lockbox',
            'input'      : 'lockbox',
            'div'        : 'lockbox_group'
        },
        {
            'radio_type' : 'contact_site',
            'value'      : 'contact',
            'input'      : 'contact_site_access',
            'div'        : 'contact_site_access'
        },
        {
            'radio_type' : 'site_access_radio',
            'value'      : 'other',
            'input'      : 'site_access_other',
            'div'        : 'site_access_other_group'
        },
        {
            'radio_type' : 'res_site_radio',
            'value'      : 'other',
            'input'      : 'other',
            'div'        : 'other'
        },
        {
            'radio_type' : 'gated',
            'value'      : 'yes',
            'input'      : 'gated',
            'div'        : 'gated'
        },
        {
            'radio_type' : 'rental_radio',
            'value'      : 'rental',
            'input'      : 'rental_radio',
            'div'        : 'rental_radio'
        },
        {
            'radio_type' : 'rental_radio',
            'value'      : 'vacant',
            'input'      : 'vacant_radio',
            'div'        : 'vacant_radio'
        },
        {
            'radio_type' : 'lockbox_radio',
            'value'      : 'lockbox',
            'input'      : 'lockbox_access',
            'div'        : 'lockbox_access'
        },
        {
            'radio_type' : 'lockbox_radio',
            'value'      : 'contact',
            'input'      : 'res_contact_site_access',
            'div'        : 'res_contact_site_access'
        },
        {
            'radio_type' : 'inside_radio',
            'value'      : 'outside',
            'input'      : 'inside_location',
            'div'        : 'inside_location'
        },
        {
            'radio_type' : 'sprinklers_type',
            'value'      : 'yes',
            'input'      : 'sprinklers_inputs',
            'div'        : 'sprinklers_group'
        },
        {
            'radio_type' : 'inside_radio_dates',
            'value'      : 'outside',
            'input'      : 'inside_loc_input',
            'div'        : 'inside_loc_div'
        },
        {
            'radio_type' : 'sprinklers_radio',
            'value'      : 'yes',
            'input'      : 'sprinklers_radio_inputs',
            'div'        : 'sprinklers_radio_group'
        },
        {
            'radio_type' : 'commercial_location',
            'value'      : 'yes',
            'input'      : 'location_comment',
            'div'        : 'location_comment'
        },

    ];
    for (var obj in showLogic) {
        dontHideElementFromRadio(document.querySelectorAll(`[data-radio^=${showLogic[obj].radio_type}]`), showLogic[obj].value,
            document.querySelector(`[data-group^=${showLogic[obj].div}]`),
            document.querySelectorAll(`[data-el^=${showLogic[obj].input}]`))
        saveHideElementFromStorage(document.querySelectorAll(`[data-radio^=${showLogic[obj].radio_type}]`), showLogic[obj].value,
            document.querySelector(`[data-group^=${showLogic[obj].div}]`),
            document.querySelectorAll(`[data-el^=${showLogic[obj].input}]`))
    }
}
// Checkbox opening hierarchy functionality to sessionStorage
function saveHideElementFromStorage(radios,value,el,inputs = undefined){
    radios.forEach(radio =>{
        if (radio.checked == true) {
            if (radio.value == value){
                el.classList.remove('hide')
                inputs.forEach(input=>{
                    requireInput(input,true)
                })
            } else {
                el.classList.add('hide')
                inputs.forEach(input=>{
                    requireInput(input,false)
                })
            }
        }
        if(document.firstForm.style.display == 'block'){
            el.classList.add('hide')
            inputs.forEach(input=>{
                requireInput(input,false)
            })
        }
    })
}
// Disable inputs if script with data
function disableInputs(form,arg = true){
    let inputs = form.elements;
    for (const input of inputs) {
        if (input.tagName == 'INPUT' && input.type != 'date' || input.tagName == 'SELECT'  ){
            if (input.name != 'phone_type' && input.name != 'operational_time_open_hours' && input.name != 'operational_time_open_minutes' 
                && input.name != 'operational_time_close_hours' && input.name != 'operational_time_close_minutes' 
                && input.name != 'adress_type' && input.name != 'rental_first_name' && input.name != 'rental_last_name' &&
                input.name != 'rental_phone' && input.name != 'rental_email' && input.name != 'access_type'
                && input.name != 'lockbox_location' && input.name != 'lockbox_code' && input.name != 'commercial_location'
                && input.name != 'lawn' && input.name != 'device_location'  && input.name != 'turned_on' 
                && input.name != 'operational_time' && input.name != 'access_site'
                && input.name != 'site_contact_first_name' && input.name != 'site_contact_last_name'
                && input.name != 'site_contact_phone' && input.name != 'site_contact_email'){
                input.disabled = arg;
            }
        }
    }
}
// Disable inputs if script with no data
function ableInputs(form){
    let inputs = form.elements;
    for (const input of inputs) {
        if (input.tagName == 'INPUT' && input.type != 'date' || input.tagName == 'SELECT' ){
            input.disabled = false;
        }
    }
}
// Add disable inputs if script with data
function disableInputOther(){
    let other = document.querySelectorAll('#typeChoice4');
    other.forEach(elem =>{
        elem.addEventListener('change', ()=>{
            if(elem.checked){
                if(window.company != undefined){
                    if(window.company.device_amount > 0){
                        if(window.firstFormData.type == 'commercial'){
                            document.commercial_second_form.other.classList.add('hide')
                        } else {
                            document.residential_second_form.other.classList.add('hide')
                        }
                    } else {
                        if(window.firstFormData.type == 'commercial'){
                            document.commercial_second_form.other.classList.remove('hide')
                        } else {
                            document.residential_second_form.other.classList.remove('hide')
                        }
                    }
                } else {
                    if(window.firstFormData.type == 'commercial'){
                        document.commercial_second_form.other.classList.remove('hide')
                    } else {
                        document.residential_second_form.other.classList.remove('hide')
                    }
                }
            }
        })
    })
}
function inputNotInContactList (input){

}
// Transition to the residential third step
function thirdstep(){
    let secondForm = document.residential_second_form,
        thirdForm = document.residential_third_section;

        if (window.company == undefined){
            window.step_index = 2
            sessionStorage.setItem('step_index', window.step_index)
            secondForm.style.display = 'none';
            thirdForm.style.display = 'block';
        }
}
// Transition to the residential third step with data to sessionStorage
function thirdstepsignedStorage(){
    let secondForm = document.residential_second_form,
        loader = document.querySelector('#residential_second_form .loader'),
        alertNote = document.getElementById('alert_note'),
        thirdForm = document.residential_third_section;
        parseResidentialInputs()
        if (jQuery(secondForm).valid()) {
            loader.classList.remove('hide')
            setTimeout(() => {
                if (window.company != undefined) {
                    window.step_index = 2
                    sessionStorage.setItem('step_index', window.step_index)
                    secondForm.style.display = 'none';
                    thirdForm.style.display = 'block';
                    alertNote.style.display = 'block';
                    siteContactsDiv = document.querySelector('.res_site_contact_radio')
                    contacts = window.company.contacts
        
                    i = 0 
                    last_index = 0
                    for (let key in contacts) {
                        if(contacts[key].site_contact == true){
                            if(last_index == i) {
                                first_name = contacts[key]?.first_name ? `First name: <span>${contacts[key].first_name}</span><br>` : ''
                                first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                                last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                                email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                                phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                                siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="res_contact_site${i}"
                                    data-el="res_contact_site_access" data-radio="res_site_radio"
                                    name="res_access_site" value="site_contacts">
                                    <label for='res_contact_site${i}'>
                                    First name: <span>${first_name}</span><br>
                                    Last name: <span>${last_name}</span><br>
                                    Email: <span>${email}</span><br>
                                    Phone: <span>${phone}</span>
                                    </label></div>`
                            } else {
                                first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                                last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                                email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                                phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                                siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="res_contact_site${i}"
                                    data-el="res_contact_site_access" data-radio="res_site_radio"
                                    name="res_access_site" value="site_contacts">
                                    <label for='res_contact_site${i}'>
                                    First name: <span>${first_name}</span><br>
                                    Last name: <span>${last_name}</span><br>
                                    Email: <span>${email}</span><br>
                                    Phone: <span>${phone}</span>
                                    </label></div>`
                            }
                        }
                        i++
                    }
                    hideSiteContactLogic()
                    if(window.company.outside_flags.outside == true && window.company.outside_flags.outside_only == false){
                        let hide_block = document.querySelector('.hide__outside'),
                            date__legend = document.querySelector('.date_legend'),
                            inside_loc_div = document.querySelector(`[data-group^=inside_location`);
    
                            hide_block.style.display = 'none'
                            inside_loc_div.classList.remove('hide')
                            date__legend.innerHTML = `SINCE ONE OR MORE DEVICES ARE LOCATED OUTSIDE PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*`
                    } else if(window.company.outside_flags.outside_only == true){
                        let sprinklers_radio_group = document.querySelector(`[data-group^=sprinklers_group`),
                            inside_loc_div = document.querySelector(`[data-group^=inside_location`)
        
                        thirdForm.lawn.forEach(elem =>{
                            if(window.today_due_date == false){
                                elem.disabled = true
                            }
                            if(elem.value == 'yes'){
                                elem.checked = true
                            }
                        })
                        
                        sprinklers_radio_group.classList.remove('hide')
        
                        thirdForm.device_location.forEach(elem =>{
                            if(window.today_due_date == false){
                                elem.disabled = true
                            }
                            if(elem.value == 'outside'){
                                elem.checked = true
                            }
                        })
        
                        inside_loc_div.classList.remove('hide')
                    }
                    loader.classList.add('hide')
                }
            }, 1000);
        }
}
// Transition to the residential third step with data
function thirdstepsigned(){
    let secondForm = document.residential_second_form,
        loader = document.querySelector('#residential_second_form .loader'),
        alertNote = document.getElementById('alert_note'),
        thirdForm = document.residential_third_section;
    secondForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        if (jQuery(secondForm).valid()) {
            loader.classList.remove('hide')
            setTimeout(() => {
                if (window.company != undefined) {
                    window.step_index = 2
                    sessionStorage.setItem('step_index', window.step_index)
                    secondForm.style.display = 'none';
                    thirdForm.style.display = 'block';
                    alertNote.style.display = 'block';
                    siteContactsDiv = document.querySelector('.res_site_contact_radio')
                    contacts = window.company.contacts
        
                    i = 0 
                    last_index = 0
                    for (let key in contacts) {
                        if(last_index == i) {
                            if(contacts[key].site_contact == true){
                                first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                                last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                                email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                                phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                                siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="res_contact_site${i}"
                                    data-el="res_contact_site_access" data-radio="res_site_radio"
                                    name="res_access_site" value="site_contacts">
                                    <label for='res_contact_site${i}'>
                                    First name: <span>${first_name}</span><br>
                                    Last name: <span>${last_name}</span><br>
                                    Email: <span>${email}</span><br>
                                    Phone: <span>${phone}</span>
                                    </label></div>`
                            }
                        } else {
                            if(contacts[key].site_contact == true){
                                first_name = contacts[key]?.first_name ? contacts[key].first_name : 'No data'
                                last_name = contacts[key]?.last_name ? contacts[key].last_name : 'No data'
                                email = contacts[key]?.email ? contacts[key]?.email : 'No data'
                                phone = contacts[key].phone_numbers[0]?.value ? contacts[key].phone_numbers[0]?.value : 'No data'
                                siteContactsDiv.innerHTML += `<div class="site_contact_flex"><input type="radio" id="res_contact_site${i}"
                                    data-el="res_contact_site_access" data-radio="res_site_radio"
                                    name="res_access_site" value="site_contacts">
                                    <label for='res_contact_site${i}'>
                                    First name: <span>${first_name}</span><br>
                                    Last name: <span>${last_name}</span><br>
                                    Email: <span>${email}</span><br>
                                    Phone: <span>${phone}</span>
                                    </label></div>`
                            }
                        }
                        i++
                    }
                    hideSiteContactLogic()
                    if(window.company.outside_flags.outside == true && window.company.outside_flags.outside_only == false){
                        let hide_block = document.querySelector('.hide__outside'),
                            date__legend = document.querySelector('.date_legend'),
                            inside_loc_div = document.querySelector(`[data-group^=inside_location`);
    
                            hide_block.style.display = 'none'
                            inside_loc_div.classList.remove('hide')
                            date__legend.innerHTML = `SINCE ONE OR MORE DEVICES ARE LOCATED OUTSIDE PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*`
                    } else if(window.company.outside_flags.outside_only == true){
                        let sprinklers_radio_group = document.querySelector(`[data-group^=sprinklers_group`),
                            inside_loc_div = document.querySelector(`[data-group^=inside_location`)
        
                        thirdForm.lawn.forEach(elem =>{
                            if(window.today_due_date == false){
                                elem.disabled = true
                            }
                            if(elem.value == 'yes'){
                                elem.checked = true
                            }
                        })
                        
                        sprinklers_radio_group.classList.remove('hide')
        
                        thirdForm.device_location.forEach(elem =>{
                            if(window.today_due_date == false){
                                elem.disabled = true
                            }
                            if(elem.value == 'outside'){
                                elem.checked = true
                            }
                        })
        
                        inside_loc_div.classList.remove('hide')
                    }
                    loader.classList.add('hide')
                }
            }, 1000);
        }
        if (window.company != undefined) {
            //disableInputs(thirdForm);
        }       
    })
        
}
thirdstepsigned()
// Transition to the residential fourth step with data
function sendDateForSprinklers (){
    let form = document.residential_third_section,
        devicesNote = document.getElementById('devices_note'),
        alertNote = document.getElementById('alert_note'),
        get_new_dates = document.getElementById('get_new_dates'),
        openLoader = document.querySelector('#residential_third_section .loader');
    
    form.addEventListener('submit',(e)=>{
        contacts = window.company.contacts
        ContactSiteHasBeenCreated = false
        for (let key in contacts) {
            if(document.residential_third_section.site_contact_first_name.value == contacts[key].first_name){
                if(document.residential_third_section.site_contact_last_name.value == contacts[key].last_name){
                    phone = document.residential_third_section.site_contact_phone.value
                    if(phone.replace(/[^+\d]/g, '') == contacts[key].phone_numbers[0].value){
                        if(document.residential_third_section.site_contact_email.value == contacts[key].email){
                            ContactSiteHasBeenCreated = true
                        }
                    }
                }
            }
        }
        if(ContactSiteHasBeenCreated == true){
            document.querySelector('.res_site_contact_error.error').style.display = 'block'
            elem = document.querySelector('.res_site_contact_error.error').offsetTop
            window.scrollTo({
                top: elem,
                left: 0,
                behavior: 'smooth'
              });
        } else {
            if (jQuery(form).valid()) {
                openLoader.classList.remove('hide');
                setTimeout(()=> {
                    e.preventDefault()
                    if (window.company != undefined && window.company.device_amount > 0 && window.company.autocreate_wo_disallowed != 'due_dates_diff_exceed' && window.today_due_date == false){
                        sendCompanyDataForToken(form);
                        window.step_index = 3
                        sessionStorage.setItem('step_index', window.step_index)
                        document.residential_third_section.style.display ='none'
                        document.fourthForm.style.display ='block'
                        get_new_dates.style.display = 'none'
                        alertNote.style.display = 'none'
                        devicesNote.style.display = 'block'
                        
                        saveChangeInputsResidentialThirdStep()
                        parseFourthSection()
                        residentialFourthStep()
                    }
                }, 1000)
                openLoader.classList.add('hide');
            }
        }
    })
    
    // sendCompanyDataForToken(form)
}
// Additional date change check
function datepickerTurnedOnChange() {
    let datepickerTable = document.getElementById('ui-datepicker-div'),
        datepickerInputCommercial = document.getElementById('datepicker_turned'),
        datepickerInputResidential = document.getElementById('datepicker_turned_on');

    datepickerTable.addEventListener('mousedown', ()=>{
        setTimeout(() => {
            if(window.wo_dates_suggestions != undefined){
                let formatDatepicker = '';
                if(window.firstFormData.type == 'commercial'){
                    formatDatepicker = new Date(datepickerInputCommercial.value)
                } else {
                    formatDatepicker = new Date(datepickerInputResidential.value)
                }
                let dates = wo_dates_suggestions.slice(0);

                wo_dates_suggestions.forEach(elem =>{
                    elem = new Date(elem)
                    if(formatDatepicker.getTime() > elem.getTime()){
                        dates.forEach((el,i) =>{
                            el = new Date(el)
                            if(el.getTime() == elem.getTime()){
                                dates.splice(i,1)
                            }
                        })
                    }
                })
                parseFifthSection(dates)
            }
        }, 100);
    })
}
// User token request
var inputRangeHours = 0
var operationalTime = ''
var changeInputTime = 0
function sendCompanyDataForToken(form){
        let inputOpenHour = 0,
            inputCloseHour = 0;

        arrayOpen = document.commercial_third_section.operational_open_hours.value.split('')
        arrayClose = document.commercial_third_section.operational_close_hours.value.split('')
        if(arrayOpen.length > 1 && arrayOpen[0] == 0){
            arrayOpen.shift()
            inputOpenHour = arrayOpen.join()
        } else {
            inputOpenHour = document.commercial_third_section.operational_open_hours.value
        }
        if(arrayClose.length > 1 && arrayClose[0] == 0){
            arrayClose.shift()
            inputCloseHour = arrayClose.join()
        } else {
            inputCloseHour = document.commercial_third_section.operational_close_hours.value
        }
        inputOpen = inputOpenHour + ':' + 
        document.commercial_third_section.operational_open_minutes.value + 
        document.commercial_third_section.operational_open_times_of_day.value.toUpperCase();

        inputClose = inputCloseHour + ':' + 
        document.commercial_third_section.operational_close_minutes.value + 
        document.commercial_third_section.operational_close_times_of_day.value.toUpperCase();

        operationalTime = inputOpen + ' - ' + inputClose

        let inputOpenRange = 0,
            inputCloseRange = 0,
            wo_max_time = window.company.wo_max_time;

        if(document.commercial_third_section.operational_open_times_of_day.value == 'pm'){
            inputOpenRange = parseInt(document.commercial_third_section.operational_open_hours.value) + 12
        } else {
            inputOpenRange = parseInt(document.commercial_third_section.operational_open_hours.value)
        }
        if(document.commercial_third_section.operational_close_times_of_day.value == 'pm'){
            inputCloseRange = parseInt(document.commercial_third_section.operational_close_hours.value) + 12
        } else {
            inputCloseRange = parseInt(document.commercial_third_section.operational_close_hours.value)
        }
        wo_min_time=420
        wo_max_time*=60
        inputOpenRange*=60
        inputCloseRange*=60
        inputOpenRange += parseInt(document.commercial_third_section.operational_open_minutes.value)
        inputCloseRange += parseInt(document.commercial_third_section.operational_close_minutes.value)
        if(inputCloseRange >= wo_max_time){
            if(inputOpenRange <= wo_min_time){
                inputRangeHours = wo_max_time - wo_min_time
            } else {
                inputRangeHours = wo_max_time - inputOpenRange
            }
        } else {
            if(inputOpenRange <= wo_min_time){
                inputRangeHours = inputCloseRange - wo_min_time
            } else {
                inputRangeHours = inputCloseRange - inputOpenRange
            }
        }
        if(parseInt(rangeParams.range_hours) != 0){
            range_hours = parseInt(rangeParams.range_hours)*60
            inputRangeHours -= range_hours
        }
        if(window.changeOperationalTime == false && changeInputTime != inputRangeHours){
            window.changeOperationalTime = true
        }
        if(window.firstFormData.type == 'residential'){
            window.changeOperationalTime = false
        }
        changeInputTime = inputRangeHours
        
        let resultDateStart = ''
        dateStart = form.turned_on?.value != undefined ? formatDate(new Date(form.turned_on.value)) : ''
        if(dateStart != 'NaN-NaN-NaN'){
            dateAfterSplit = dateStart.split('-')
            constAfterSplit = irrigation_const.irrigation_const ? irrigation_const.irrigation_const.split('-') : ''
            if(parseInt(dateAfterSplit[1]) < parseInt(constAfterSplit[1])){
                resultDateStart = irrigation_const.irrigation_const + '-' + dateAfterSplit[2]
            } else if(parseInt(dateAfterSplit[1]) == parseInt(constAfterSplit[1]) && parseInt(dateAfterSplit[0]) < parseInt(constAfterSplit[0])){
                resultDateStart = irrigation_const.irrigation_const + '-' + dateAfterSplit[2]
            } else {
                resultDateStart = dateStart
            }
        } else {
            resultDateStart = deviceDueDateStart
        }
        if(deviceDueDateEnd == null){
            deviceDueDateEnd = false
        }
        processingTimer()
        let formData = {
            action : 'jobtoken',
            nonce: mainVars.nonce,
            CID : firstFormData.CID,
            email : firstFormData.email,
            date_start: resultDateStart,
            date_end: deviceDueDateEnd,
            wo_time: operationalTime
        },
        openLoader = document.getElementById('loader_fifth'),
        disableSubmit = document.getElementById('submit_fifth_section');
        openLoader.classList.remove('hide')
        disableSubmit.disabled = true
        formData = getFormData(formData);
        fetch( mainVars.ajax_url, {
            method: 'POST',
            body: formData,
        } )
            .then( res => res.text() )
            .then( data => jobTokenCookie(JSON.parse(data)))
            .catch( err => console.log( err ) );
}  
sendDateForSprinklers();
// Assigning a Format to a Date
function formatDate(date) {
    let month = date.getMonth()+1,
        day = date.getDate();

    month = (month < 10) ? '0'+ month : month
    day = (day < 10) ? '0'+ day : day

    return day + "-" + month + "-" + date.getFullYear()
}
// Assigning a Format to a Date
function formatDateForDateInputs(date){
    let month = date.getMonth()+1
    month = (month < 10) ? '0'+ month : month

    return date.getFullYear() + "-" + month + "-" + date.getDate()
}
// Assigning a Format to a Date
function setMinMaxDate(){
    let residentionalForm = document.residential_third_section,
        commercialForm = document.commercial_third_section,
        thisYear = new Date().getFullYear(),
        minDate = new Date (thisYear,3,15),
        maxDate = new Date (thisYear,9,31);
        residentionalForm.turned_on.setAttribute('max',formatDateForDateInputs(maxDate))
        residentionalForm.turned_on.setAttribute('min',formatDateForDateInputs(minDate))
        commercialForm.turned_on.setAttribute('max',formatDateForDateInputs(maxDate))
        commercialForm.turned_on.setAttribute('min',formatDateForDateInputs(minDate))
}
setMinMaxDate()
// Parsing fourth step table
function parseFourthSection(){
    let feesTable = document.getElementById('fees_table'),
        pagination = document.getElementById('pagination'),
        deviceTable = document.getElementById('device_table'),
        checkDates = document.querySelectorAll(`[data-radio^=lockbox_radio]`)
        addDetails = document.getElementById('add_details');
        window.step_index = 3
        sessionStorage.setItem('step_index', window.step_index)
        feesTable.innerHTML = `<tr><td>Device fee:</td><td>$ ${company.fees.device_fee}</td></tr>`
        if (company.fees.second_fee != 0.00){
            feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Second fee:</td><td>$ ${company.fees.second_fee}</td></tr>`
        }
        feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Village fee:</td><td>$ ${company.fees.village_fee}</td></tr>`
        feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Total fee:</td><td>$ ${ company.fees.total_fee}</td></tr>`

        deviceTable.innerHTML = `<tr><th>Size</th><th>Make</th><th>Model</th><th>Serial #</th><th>Application</th><th>Location</th><th>Due Date</th></tr>`

            for(let i=0; i < 20;i++){
                let device = window.company.device_table[i];
                if (device == undefined){
                    break;
                }
                deviceTable.innerHTML = deviceTable.innerHTML + `<tr data="${i}">
                                                            <td>${device.size}</td>
                                                            <td>${device.make}</td>
                                                            <td>${device.model}</td>
                                                            <td>${device.serial}</td>
                                                            <td>${device.application}</td>
                                                            <td>${device.location}</td>
                                                            <td>${device.due_date}</td></tr>`
            }

        if (window.company.device_amount > 20){
            pagination.classList.remove('hide')
        }

        if(firstFormData.type == 'commercial'){
            if(document.commercial_third_section.adressTypeChoice2.checked){
                addDetails.innerHTML = `<tr><td>Rental tenant name:</td><td> ${document.commercial_third_section.com_rental_first_name.value} ${document.commercial_third_section.com_rental_last_name.value}</td></tr>`
                addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Rental tenant phone:</td><td> ${document.commercial_third_section.com_rental_phone.value}</td></tr>`
                addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Rental tenant email:</td><td> ${document.commercial_third_section.com_rental_email.value}</td></tr>`
            } else if(document.commercial_third_section.adressTypeChoice3.checked){
                if(document.commercial_third_section.accessTypeChoiceSite1.checked){
                    if(sendSiteContact == true){
                        addDetails.innerHTML = `<tr><td>Site contact name:</td><td> ${document.commercial_third_section.com_site_contact_first_name.value} ${document.commercial_third_section.com_site_contact_last_name.value}</td></tr>`
                        addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Site contact phone:</td><td> ${document.commercial_third_section.com_site_contact_phone.value}</td></tr>`
                        addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Site contact email:</td><td> ${document.commercial_third_section.com_site_contact_email.value}</td></tr>`
                    } else{
                        document.querySelectorAll(`[data-radio^=site_access_radio]`).forEach((el, index) => {
                            if(el.checked == true){
                                contacts = window.company.contacts
                                i = 0
                                
                                for (let key in contacts) {
                                    if(contacts[key].site_contact == true){
                                        if(index == i){
                                            addDetails.innerHTML = contacts[key]?.first_name != 'No data' ? 
                                                `<tr><td>Site contact name:</td><td> ${contacts[key]?.first_name} ${contacts[key]?.last_name}</td></tr>` : ''
                                            addDetails.innerHTML = contacts[key].phone_numbers[0]?.value != 'No data' ? addDetails.innerHTML +
                                                `<tr><td>Site contact phone:</td><td> ${contacts[key].phone_numbers[0]?.value}</td></tr>` : ''
                                            addDetails.innerHTML = contacts[key]?.email != 'No data' ? addDetails.innerHTML +
                                                `<tr><td>Site contact email:</td><td> ${contacts[key]?.email}</td></tr>` : ''
                                        }
                                        i++
                                    }
                                }
                            }
                        })
                    }
                } else {
                    addDetails.innerHTML = `<tr><td>Site contact name:</td><td> ${document.commercial_second_form.first_name.value} ${document.commercial_second_form.second_name.value}</td></tr>`
                    addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Describe location of lockbox:</td><td> ${document.commercial_third_section.com_lockbox_location.value}</td></tr>`
                    addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Lockbox code:</td><td> ${document.commercial_third_section.com_lockbox_code.value}</td></tr>`
                }
            } else {
                addDetails.innerHTML = `<tr><td>Site contact name:</td><td> ${document.commercial_second_form.first_name.value} ${document.commercial_second_form.second_name.value}</td></tr>`
            }
            if(document.commercial_third_section.turned_on.value){
                addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Irrigation date:</td><td> ${document.commercial_third_section.turned_on.value}</td></tr>`
            }
            if(document.commercial_third_section.location_comment.value) {
                addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Location comment:</td><td> ${document.commercial_third_section.location_comment.value}</td></tr>`
            }
        }else {
            if(document.residential_third_section.adressTypeChoice2.checked){
                addDetails.innerHTML = `<tr><td>Rental tenant name:</td><td> ${document.residential_third_section.res_rental_first_name.value} ${document.residential_third_section.res_rental_last_name.value}</td></tr>`
                addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Rental tenant phone:</td><td> ${document.residential_third_section.res_rental_phone.value}</td></tr>`
                addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Rental tenant email:</td><td> ${document.residential_third_section.res_rental_email.value}</td></tr>`
            } else if(document.residential_third_section.adressTypeChoice3.checked){
                if(checkDates[0]){
                    if(sendSiteContact == true){
                        addDetails.innerHTML = `<tr><td>Site contact name:</td><td> ${document.residential_third_section.res_site_contact_first_name.value} ${document.residential_third_section.res_site_contact_last_name.value}</td></tr>`
                        addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Site contact phone:</td><td> ${document.residential_third_section.res_site_contact_phone.value}</td></tr>`
                        addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Site contact email:</td><td> ${document.residential_third_section.res_site_contact_email.value}</td></tr>`
                    } else{
                        document.querySelectorAll(`[data-radio^=res_site_radio]`).forEach((el, index) => {
                            if(el.checked == true){
                                contacts = window.company.contacts
                                i = 0
                                
                                for (let key in contacts) {
                                    if(contacts[key].site_contact == true){
                                        if(index == i){
                                            addDetails.innerHTML = contacts[key]?.first_name != 'No data' ? 
                                                `<tr><td>Site contact name:</td><td> ${contacts[key]?.first_name} ${contacts[key]?.last_name}</td></tr>` : ''
                                            addDetails.innerHTML = contacts[key].phone_numbers[0]?.value != 'No data' ? addDetails.innerHTML +
                                                `<tr><td>Site contact phone:</td><td> ${contacts[key].phone_numbers[0]?.value}</td></tr>` : ''
                                            addDetails.innerHTML = contacts[key]?.email != 'No data' ? addDetails.innerHTML +
                                                `<tr><td>Site contact email:</td><td> ${contacts[key]?.email}</td></tr>` : ''
                                        }
                                        i++
                                    }
                                }
                            }
                        })
                    }
                } 
                else {
                    addDetails.innerHTML = `<tr><td>Site contact name:</td><td> ${document.residential_second_form.first_name.value} ${document.residential_second_form.second_name.value}</td></tr>`
                    addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Describe location of lockbox:</td><td> ${document.residential_third_section.res_lockbox_location.value}</td></tr>`
                    addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Lockbox code:</td><td> ${document.residential_third_section.res_lockbox_code.value}</td></tr>`
                }
            } else {
                addDetails.innerHTML = `<tr><td>Site contact name:</td><td> ${document.residential_second_form.first_name.value} ${document.residential_second_form.second_name.value}</td></tr>`
            }
            if(document.residential_third_section.turned_on.value){
                addDetails.innerHTML = addDetails.innerHTML + `<tr><td>Irrigation date:</td><td> ${document.residential_third_section.turned_on.value}</td></tr>`
            }
        }

    renderDevicesByClick()

}
// Parsing fifth step suggestions dates
function parseFifthSection(wo_dates_suggestions = undefined){
    let suggestionsblock = document.querySelector('.suggestions'),
        openLoader = document.getElementById('loader_fifth'),
        sug = document.querySelectorAll('.suggestions label'),
        radioBtns = document.getElementsByName('suggestions_date'),
        disableSubmit = document.getElementById('submit_fifth_section');

    openLoader.classList.add('hide')
    disableSubmit.disabled = false
    wo_dates_suggestions.forEach((el,index) =>{
        function getWeekDay(date) {
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          
            return days[date.getDay()];
        }
        splitEl = el.split(',', 3)
        dateEl = splitEl[0] + ',' + splitEl[1]
        let date = new Date(dateEl);
        if (index == 0){
            suggestionsblock.innerHTML =`<input class="suggestions_input" type="radio" id='suggestions_date${index}'
                name="suggestions_date" value="${getWeekDay(date)}, ${el}">
                <label data-show="show" for='suggestions_date${index}'>
                Option ${index+1}: ${getWeekDay(date)}, ${el}</label>`
        } else {
            suggestionsblock.innerHTML = suggestionsblock.innerHTML +`<input class="suggestions_input" type="radio" id='suggestions_date${index}'
                name="suggestions_date" value="${getWeekDay(date)}, ${el}">
                <label data-show="show" for='suggestions_date${index}'>
                Option ${index+1}: ${getWeekDay(date)}, ${el}</label>`
        }
    })
    arraySug= Array.from(sug)
    radioBtns[0].checked = true

    if(window.first_time == true){
        dateTimer()
    }
}
function findKeyOfArray (arr,key) {
    return arr.indexOf(key)
}
// Event residential fourth step
function residentialFourthStep (){
    document.fourthForm.addEventListener('submit',(e)=>{
        window.step_index = 3
        sessionStorage.setItem('step_index', window.step_index)
        e.preventDefault()
        window.NextStep()
    })
}
// Transition six step Work Order Info
function woInfo(){
    let form = document.fifth_form;
        
    form.addEventListener('submit',(e)=>{
        let orderInfo = document.getElementById('order_info'),
            dateInfo = document.getElementById('date_info'),
            radio = form.suggestions_date,
            form_info = document.wo_info,
            openLoader = document.getElementById('loader_main');

        e.preventDefault()
        openLoader.classList.remove('hide')
        setTimeout(() => {
            window.scrollToTop()
            window.step_index = 5
            sessionStorage.setItem('step_index', window.step_index)
            form.style.display = 'none'
            form_info.style.display = 'block'
            orderInfo.style.display = 'block'
            dateInfo.style.display = 'none'
            openLoader.classList.add('hide')
        }, 1000);
        if(radio.length > 1) {
            radio.forEach((elem, index) => {
                if(elem.checked == true){
                    window.selected_index = index
                    sessionStorage.selected_index = JSON.stringify(selected_index)
                }
            });
        } else {
            window.selected_index = 0
            sessionStorage.selected_index = JSON.stringify(selected_index)
        }
        window.select_date = radio.value
        sessionStorage.select_date = JSON.stringify(select_date)
        parseWOInfo(window.select_date)
    })
}
woInfo()
// Parsing six step Work Order Info table
function parseWOInfo(select_date){
    let suggestionsblock = document.querySelector('.suggestions_info'),
        feesTable = document.getElementById('fees_table_info'),
        pagination = document.getElementById('pagination_info'),
        divAccord = document.getElementById('divAccordClient5'),
        createdName = document.getElementById('order_name');
        firstContactKey = firstContact((company.contacts));
        deviceTable = document.getElementById('device_table_info');

        feesTable.innerHTML = `<tr><td>Device fee:</td><td>$ ${company.fees.device_fee}</td></tr>`
        if (company.fees.second_fee != 0.00){
            feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Second fee:</td><td>$ ${company.fees.second_fee}</td></tr>`
        }
        feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Village fee:</td><td>$ ${company.fees.village_fee}</td></tr>`
        feesTable.innerHTML = feesTable.innerHTML + `<tr><td>Total fee:</td><td>$ ${ company.fees.total_fee}</td></tr>`
        deviceTable.innerHTML = `<tr><th>Size</th><th>Make</th><th>Model</th><th>Serial #</th><th>Application</th><th>Location</th><th>Due Date</th></tr>`
            for(let i=0; i < 20;i++){
                let device = window.company.device_table[i];
                if (device == undefined){
                    break;
                }
                deviceTable.innerHTML = deviceTable.innerHTML + `<tr data="${i}">
                                                            <td>${device.size}</td>
                                                            <td>${device.make}</td>
                                                            <td>${device.model}</td>
                                                            <td>${device.serial}</td>
                                                            <td>${device.application}</td>
                                                            <td>${device.location}</td>
                                                            <td>${device.due_date}</td></tr>`
            }
        if (window.company.device_amount > 20){
            pagination.classList.remove('hide')
        }

        if(window.firstFormData.type == 'commercial'){
            if(document.commercial_third_section.datepicker_turned.value){
                divAccord.style.display = 'flex'
            } else {
                divAccord.style.display = 'none'
            }
        } else {
            if(document.residential_third_section.datepicker_turned_on.value){
                divAccord.style.display = 'flex'
            } else {
                divAccord.style.display = 'none'
            }
        }

        renderDevicesByClickWOInfo()
        suggestionsblock.innerHTML =`<h3 class="red_date_title">${select_date}</h3>`
}
// Event six step Work Order Info inputs
function WOInfoButton() {
    let noFit = document.getElementById('no_fit'),
        prevWOInfo = document.getElementById('prev_wo_info'),
        orderInfo = document.getElementById('order_info');

    noFit.addEventListener('click',(e)=> {
        noFit.classList.add('editing');
        let orderInfo = document.getElementById('order_info');
        let result = confirm('Attention! After this action you will not be able to auto-scheduling the test from the site (but you can still send your data to our manager and we will call you back). Confirm action?');
        if(result){
            window.scrollToTop()
            document.wo_info.style.display = 'none'
            window.step_index = 6
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
            document.second_comment_form.style.display = 'block'
            orderInfo.style.display = 'none'
        }
    })
    prevWOInfo.addEventListener('click',()=>{
        orderInfo.style.display = 'none'
    })
}
WOInfoButton()

function checkboxActive(){
    let divAccord = document.getElementById('divAccordClient5'),
        submit = document.getElementById('submit_wo_info_section'),
        checkboxFifth = true;

    
    document.wo_info.accordClient1.addEventListener('change', ()=>{
        if(divAccord.style.display == 'flex' && document.wo_info.accordClient5.checked == false){
            checkboxFifth = false
        } else {
            checkboxFifth = true
        }
        if(document.wo_info.accordClient1.checked == true && document.wo_info.accordClient2.checked == true && 
            document.wo_info.accordClient3.checked == true && document.wo_info.accordClient4.checked == true && checkboxFifth == true){
                submit.classList.remove('gray_button')
        } else {
            submit.classList.add('gray_button')
        }
    })
    document.wo_info.accordClient2.addEventListener('change', ()=>{
        if(divAccord.style.display == 'flex' && document.wo_info.accordClient5.checked == false){
            checkboxFifth = false
        } else {
            checkboxFifth = true
        }
        if(document.wo_info.accordClient1.checked == true && document.wo_info.accordClient2.checked == true && 
            document.wo_info.accordClient3.checked == true && document.wo_info.accordClient4.checked == true && checkboxFifth == true){
                submit.classList.remove('gray_button')
        } else {
            submit.classList.add('gray_button')
        }
    })
    document.wo_info.accordClient3.addEventListener('change', ()=>{
        if(divAccord.style.display == 'flex' && document.wo_info.accordClient5.checked == false){
            checkboxFifth = false
        } else {
            checkboxFifth = true
        }
        if(document.wo_info.accordClient1.checked == true && document.wo_info.accordClient2.checked == true && 
            document.wo_info.accordClient3.checked == true && document.wo_info.accordClient4.checked == true && checkboxFifth == true){
                submit.classList.remove('gray_button')
        } else {
            submit.classList.add('gray_button')
        }
    })
    document.wo_info.accordClient4.addEventListener('change', ()=>{
        if(divAccord.style.display == 'flex' && document.wo_info.accordClient5.checked == false){
            checkboxFifth = false
        } else {
            checkboxFifth = true
        }
        if(document.wo_info.accordClient1.checked == true && document.wo_info.accordClient2.checked == true && 
            document.wo_info.accordClient3.checked == true && document.wo_info.accordClient4.checked == true && checkboxFifth == true){
                submit.classList.remove('gray_button')
        } else {
            submit.classList.add('gray_button')
        }
    })
    document.wo_info.accordClient5.addEventListener('change', ()=>{
        if(divAccord.style.display == 'flex' && document.wo_info.accordClient5.checked == false){
            checkboxFifth = false
        } else {
            checkboxFifth = true
        }
        if(document.wo_info.accordClient1.checked == true && document.wo_info.accordClient2.checked == true && 
            document.wo_info.accordClient3.checked == true && document.wo_info.accordClient4.checked == true && checkboxFifth == true){
                submit.classList.remove('gray_button')
        } else {
            submit.classList.add('gray_button')
        }
    })
}
checkboxActive()
// Request to create an order
function datePicked() {
    let form = document.wo_info;

    form.addEventListener('submit', function cb(e){
        let submit = document.getElementById('submit_wo_info_section'),
            resRentalFirstName = document.getElementById('res_rental_first_name').value,
            resRentalLastName = document.getElementById('res_rental_last_name').value,
            resRentalPhone = document.getElementById('res_rental_phone').value,
            resRentalEmail = document.getElementById('res_rental_email').value,
            resLockboxLocation = document.getElementById('res_lockbox_location').value,
            resLockboxCode = document.getElementById('res_lockbox_code').value,
            comRentalFirstName = document.getElementById('com_rental_first_name').value,
            comRentalLastName = document.getElementById('com_rental_last_name').value,
            comRentalPhone = document.getElementById('com_rental_phone').value,
            comRentalEmail = document.getElementById('com_rental_email').value,
            comLockboxLocation = document.getElementById('com_lockbox_location').value,
            comLockboxCode = document.getElementById('com_lockbox_code').value,
            locationOutside = document.getElementById('deviseLocationChoice2').checked,
            locationOutsideRes = document.getElementById('deviseLocationChoiceCom2').checked,
            locationComment = document.getElementById('location_comment').value,
            gatedText = document.getElementById('gated_text').value,
            divAccord = document.getElementById('divAccordClient5'),
            noFit = document.getElementById('no_fit'),
            prevWOInfo = document.getElementById('prev_wo_info'),
            checkboxFifth = true,
            openLoader = document.getElementById('loader_wo_info');

            e.preventDefault()

        if(divAccord.style.display == 'flex' && document.wo_info.accordClient5.checked == false){
            checkboxFifth = false
        } else {
            checkboxFifth = true
        }
        if(document.wo_info.accordClient1.checked == true && document.wo_info.accordClient2.checked == true && 
            document.wo_info.accordClient3.checked == true && document.wo_info.accordClient4.checked == true && checkboxFifth == true){
            submit.style.display = 'none'
            noFit.disabled = true
            prevWOInfo.disabled = true
            openLoader.classList.remove('hide')
            
            splitEl = window.select_date.split(',', 3)
            dateEl = splitEl[0] + ',' + splitEl[1] + ',' + splitEl[2]
            let firstContactKey = firstContact((company.contacts)),
                formData = {
                    action : 'createjob',
                    nonce: mainVars.nonce,
                    CID :  firstFormData.CID ,
                    email : firstFormData.email,
                    date : dateEl,
                    first_name: company.contacts[firstContactKey].first_name,
                    last_name: company.contacts[firstContactKey].last_name,
                    selected_date_index: window.selected_index,
                };

            formData.site_contact_first_name = ''
            formData.site_contact_last_name = ''
            formData.site_contact_phone = ''
            formData.site_contact_email = ''
            if (firstFormData.type == 'residential') {
                formData.gated_text = gatedText;
                formData.rental_first_name = resRentalFirstName;
                formData.rental_last_name = resRentalLastName;
                formData.rental_phone = resRentalPhone;
                formData.rental_email = resRentalEmail;
                if(sendSiteContact == true){
                    formData.site_contact_first_name = document.residential_third_section.site_contact_first_name.value;
                    formData.site_contact_last_name = document.residential_third_section.site_contact_last_name.value;
                    formData.site_contact_phone = document.residential_third_section.site_contact_phone.value;
                    formData.site_contact_email = document.residential_third_section.site_contact_email.value;
                } else{
                    document.querySelectorAll(`[data-radio^=res_site_radio]`).forEach((el, index) => {
                        if(el.checked == true){
                            contacts = window.company.contacts
                            i = 0
                            
                            for (let key in contacts) {
                                if(contacts[key].site_contact == true){
                                    if(index == i){
                                        formData.site_contact_first_name = contacts[key]?.first_name != 'No data' ? contacts[key].first_name : ''
                                        formData.site_contact_last_name = contacts[key]?.last_name != 'No data' ? contacts[key]?.last_name : ''
                                        formData.site_contact_phone = contacts[key].phone_numbers[0]?.value != 'No data' ? contacts[key].phone_numbers[0]?.value : ''
                                        formData.site_contact_email = contacts[key]?.email != 'No data' ? contacts[key]?.email : ''
                                    }
                                    i++
                                }
                            }
                        }
                    })
                }
                formData.lockbox_location = resLockboxLocation;
                formData.lockbox_code = resLockboxCode;
                if(locationOutsideRes == true){
                    formData.device_location = 'outside';
                } else {
                    formData.device_location = 'not outside';
                }
            } else {
                formData.rental_first_name = comRentalFirstName;
                formData.rental_last_name = comRentalLastName;
                formData.rental_phone = comRentalPhone;
                formData.rental_email = comRentalEmail;
                if(sendSiteContact == true){
                    formData.site_contact_first_name = document.commercial_third_section.site_contact_first_name.value;
                    formData.site_contact_last_name = document.commercial_third_section.site_contact_last_name.value;
                    formData.site_contact_phone = document.commercial_third_section.site_contact_phone.value;
                    formData.site_contact_email = document.commercial_third_section.site_contact_email.value;
                } else{
                    document.querySelectorAll(`[data-radio^=site_access_radio]`).forEach((el, index) => {
                        if(el.checked == true){
                            contacts = window.company.contacts
                            i = 0
                            
                            for (let key in contacts) {
                                if(contacts[key].site_contact == true){
                                    if(index == i){
                                        formData.site_contact_first_name = contacts[key]?.first_name != 'No data' ? contacts[key].first_name : ''
                                        formData.site_contact_last_name = contacts[key]?.last_name != 'No data' ? contacts[key]?.last_name : ''
                                        formData.site_contact_phone = contacts[key].phone_numbers[0]?.value != 'No data' ? contacts[key].phone_numbers[0]?.value : ''
                                        formData.site_contact_email = contacts[key]?.email != 'No data' ? contacts[key]?.email : ''
                                    }
                                    i++
                                }
                            }
                        }
                    })
                }
                formData.lockbox_location = comLockboxLocation;
                formData.lockbox_code = comLockboxCode;
                formData.location_comment = locationComment;
                if(locationOutside == true){
                    formData.device_location = 'outside';
                } else {
                    formData.device_location = 'not outside';
                }
            }
            date = formData.date
            formData = getFormData(formData)
            fetch( mainVars.ajax_url, {
                method: 'POST',
                body: formData,
            } )
            .then( res => res.text() )
            .then( (data) => {
                let secondForm = isCommercial() ? document.commercial_second_form : document.residential_second_form
                data = JSON.parse(data);
                sendIfContactsChanged(secondForm)
                successDiv(data)
            })
            .catch( err => console.log( err, data ) )
            e.currentTarget.removeEventListener(e.type, cb);
        } else {

        }
    })
}
datePicked()
var woAppointedDateEarly = false
var resultDataEarly = {}
// Receiving a message about successful creation
function successDiv (result){
    let six_success = document.querySelector(".success"),
        orderInfo = document.getElementById('order_info'),
        messageManyDevices = document.querySelector('.massage__error__many_devices'),
        messageDueDateFalls = document.querySelector('.massage__error__due_date_falls'),
        messageOperationalHours = document.querySelector('.massage__error__operational_hours'),
        messageServerBusy = document.querySelector('.massage__error__server_busy')
        formTimer = document.querySelector('.form_timer'),
        messageNoDate = document.querySelector('.massage__error__no_date');

    window.stopTimer = true
    messageNoDate.style.display = 'none'
    messageManyDevices.style.display = 'none'
    messageDueDateFalls.style.display = 'none'
    messageOperationalHours.style.display = 'none'
    messageServerBusy.style.display = 'none'
    orderInfo.style.display = 'none'
    resultDataEarly = result.data
    if(resultDataEarly.fees != undefined){
        woAppointedDateEarly = true
    }
    if (result.data.status=='success' || result.success == true || result.data == true){
        document.wo_info.style.display='none'
        sessionStorage.clear()
        if (window.company != undefined && window.company.device_amount > 0 && window.today_due_date == false 
            && window.company.autocreate_wo_disallowed != 'due_dates_diff_exceed' && (!inputRangeHours ||  inputRangeHours >= 0) && window.wo_dates_suggestions != undefined){
            window.openSuccessMassageAfterApi()
        } else {
            six_success.style.display = 'block'
            formTimer.style.display = 'none'
        }
        document.comment_form.style.display = 'none'
    } else {
        return true
    }

}
function lookOnMutation () {
    var target = document.querySelector('.suggestions');

    const config = {
        childList: true,
    };
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {



            }
        }
    };
    observer = new MutationObserver(callback);
    observer.observe(target, config);
}
// Event fifth step Work Order Info inputs
function suggestionsShow(){
    let notSuitable = document.querySelector('#notSuitable'),
        dateInfo = document.getElementById('date_info'),
        secondCommentForm = document.querySelector('#second_comment_form'),
        loaderComment = document.getElementById('loader_second_comment'),
        fifthForm = document.querySelector('#fifth_form'),
        successEmailButton = document.querySelector('#success_email_button');
        
    notSuitable.addEventListener('click',(e)=> {
        notSuitable.classList.add('editing');
        let result = confirm('Attention! After this action you will not be able to auto-scheduling the test from the site (but you can still send your data to our manager and we will call you back). Confirm action?');
        if (result){
            window.step_index = 6
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
            fifthForm.style.display = 'none'
            secondCommentForm.style.display = 'block'
            dateInfo.style.display = 'none'

        }
    })
    successEmailButton.addEventListener('click',(e)=> {
        loaderComment.classList.remove('hide')
        successEmailButton.disabled = true
        window.sendCompanyByEmail(successEmailButton)
        e.preventDefault();
    })
}
suggestionsShow()
// Request to send a letter to the manager
function sendCompanyByEmail(successEmailButton = undefined){
    var dataWithCompany = {
        action : 'sendcompanybymail',
        nonce: mainVars.nonce,
        company : JSON.stringify(window.company),
        type: window.firstFormData.type
    },
    resRentalFirstName = document.getElementById('res_rental_first_name').value,
    resRentalLastName = document.getElementById('res_rental_last_name').value,
    resRentalPhone = document.getElementById('res_rental_phone').value,
    resRentalEmail = document.getElementById('res_rental_email').value,
    resLockboxLocation = document.getElementById('res_lockbox_location').value,
    resLockboxCode = document.getElementById('res_lockbox_code').value,
    comRentalFirstName = document.getElementById('com_rental_first_name').value,
    comRentalLastName = document.getElementById('com_rental_last_name').value,
    comRentalPhone = document.getElementById('com_rental_phone').value,
    comRentalEmail = document.getElementById('com_rental_email').value,
    comLockboxLocation = document.getElementById('com_lockbox_location').value,
    comLockboxCode = document.getElementById('com_lockbox_code').value,
    datepickerInputResidential = document.getElementById('datepicker_turned_on').value,
    datepickerInputCommercial = document.getElementById('datepicker_turned').value,
    gatedText = document.getElementById('gated_text').value;

    if (dataWithCompany.type == 'residential') {
        if(document.residential_third_section.adress_type[1].checked == true){
            dataWithCompany.rental_first_name = resRentalFirstName;
            dataWithCompany.rental_last_name = resRentalLastName;
            dataWithCompany.rental_phone = resRentalPhone;
            dataWithCompany.rental_email = resRentalEmail;
            dataWithCompany.adress_type = document.residential_third_section.adress_type[1].value
        } else if(document.residential_third_section.adress_type[2].checked == true){
            dataWithCompany.lockbox_location = resLockboxLocation;
            dataWithCompany.lockbox_code = resLockboxCode;
            dataWithCompany.adress_type = document.residential_third_section.adress_type[2].value
        } else {
            dataWithCompany.adress_type = document.residential_third_section.adress_type[0].value
        }
        dataWithCompany.gated_text = gatedText;
        dataWithCompany.turned_on = datepickerInputResidential;
        if(document.getElementById('accessTypeChoice1').checked == true){
            dataWithCompany.lawn = document.getElementById('accessTypeChoice1').value
            if(document.getElementById('deviseLocationChoiceCom1').checked == true){
                dataWithCompany.device_location = document.getElementById('deviseLocationChoiceCom1').value
            } else if(document.getElementById('deviseLocationChoiceCom2').checked == true){
                dataWithCompany.device_location = document.getElementById('deviseLocationChoiceCom2').value
            } else if(document.getElementById('deviseLocationChoiceCom3').checked == true){
                dataWithCompany.device_location = 'not sure'
            } else {
                dataWithCompany.device_location = 'yes'
            }
        } else if(document.getElementById('accessTypeChoice2').checked == true){
            dataWithCompany.lawn = document.getElementById('accessTypeChoice2').value
        } else if(document.getElementById('accessTypeChoice3').checked == true){
            dataWithCompany.lawn = 'not sure'
        } else {
            dataWithCompany.lawn = 'yes'
        }
    } else {
        if(document.getElementById('adressTypeChoice2').checked == true){
            dataWithCompany.rental_first_name = comRentalFirstName;
            dataWithCompany.rental_last_name = comRentalLastName;
            dataWithCompany.rental_phone = comRentalPhone;
            dataWithCompany.rental_email = comRentalEmail;
            dataWithCompany.adress_type = document.getElementById('adressTypeChoice2').value
        } else if(document.getElementById('adressTypeChoice3').checked == true){
            dataWithCompany.lockbox_location = comLockboxLocation;
            dataWithCompany.lockbox_code = comLockboxCode;
            dataWithCompany.adress_type = document.getElementById('adressTypeChoice3').value
            if(document.getElementById('accessTypeChoiceSite1').checked == true){
                dataWithCompany.access_type = document.getElementById('accessTypeChoiceSite1').value
            } else {
                dataWithCompany.access_type = document.getElementById('accessTypeChoiceSite2').value
            }
        } else {
            dataWithCompany.adress_type = document.getElementById('adressTypeChoice1').value
        }
        dataWithCompany.turned_on = datepickerInputCommercial;
        if(document.getElementById('commercialLocation1').checked == true){
            dataWithCompany.commercial_location = document.getElementById('commercialLocation1').value
        } else {
            dataWithCompany.commercial_location = document.getElementById('commercialLocation2').value
        }
        if(document.getElementById('accessTypeChoice1').checked == true){
            dataWithCompany.lawn = document.getElementById('accessTypeChoice1').value
            if(document.getElementById('deviseLocationChoice1').checked == true){
                dataWithCompany.device_location = document.getElementById('deviseLocationChoice1').value
            } else if(document.getElementById('deviseLocationChoice2').checked == true){
                dataWithCompany.device_location = document.getElementById('deviseLocationChoice2').value
            } else if(document.getElementById('deviseLocationChoice2').checked == true){
                dataWithCompany.device_location = 'not sure'
            } else {
                dataWithCompany.device_location = 'yes'
            }
        } else if(document.getElementById('accessTypeChoice2').checked == true){
            dataWithCompany.lawn = document.getElementById('accessTypeChoice2').value
        } else if(document.getElementById('accessTypeChoice3').checked == true){
            dataWithCompany.lawn = 'not sure'
        } else {
            dataWithCompany.lawn = 'yes'
        }
    }
    dataWithCompany.email_comment = isCommercial() ? document.getElementById("second_comment_form").elements["email_comment"].value : document.getElementById("comment_form").elements["email_comment"].value
    if(document.getElementById("second_comment_form").style.display == 'block'){
        dataWithCompany.email_comment = document.getElementById("second_email_comment").value
    }
    if(window.company != undefined){
        dataWithCompany.location_comment = document.commercial_third_section.location_comment.value
    } else {
        dataWithCompany.location_comment = document.getElementById("location_comment_with_no_data").value
    }
    if(window.firstFormData.type == 'commercial'){
        dataWithCompany.operational_time = operationalTime
    }
    let formData = getFormData(dataWithCompany);
    fetch( mainVars.ajax_url, {
        method: 'POST',
        body: formData,
    } )
        .then( res => res.text() )
        .then( data => successOldFlow(JSON.parse(data)))
        .catch( err => console.log( err) );

}
// Receiving a old message about successful creation
function successOldFlow(result) {
    let six_success = document.querySelector(".success"),
        loaderComment = document.getElementById('loader_second_comment'),
        successEmailButton = document.querySelector('#success_email_button'),
        secondCommentForm = document.querySelector("#second_comment_form");

    if (result.data == true || result.data.result == 'success') {
        window.stopTimer = true
        loaderComment.classList.add('hide')
        successEmailButton.disabled = false
        document.fifth_form.style.display = 'none';
        secondCommentForm.style.display = 'none';
        six_success.style.display = 'block';
        sessionStorage.clear()
        
        document.comment_form.style.display = 'none';
    }
}
// Transition to fifth step
function openfifthStep () {
    let submitBtn = document.querySelector('#fourthForm button[type=submit]'),
        dateInfo = document.getElementById('date_info'),
        devicesNote = document.getElementById('devices_note'),
        form = document.fourthForm,
        loaderFourth = document.getElementById('loader_fourth_form');
        
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        loaderFourth.classList.remove('hide')
        window.refreshIntervalId = setInterval(readySuggestions, 1000);
        function readySuggestions(){
            if(window.ready_suggestions == true){
                window.NextStep()
                window.scrollToTop()
                document.fourthForm.style.display = 'none'
                devicesNote.style.display = 'none'
                dateInfo.style.display = 'block'
                if (window.wodates == false ) {
                    if(window.firstFormData.type == 'commercial'){
                        irrigationDate = document.getElementById('datepicker_turned').value;
                    } else {
                        irrigationDate = document.getElementById('datepicker_turned_on').value;
                    }
                    let dueDate = new Date(window.company.device_due_date);
                    irrigationDate = new Date(irrigationDate)
                    if(irrigationDate.getTime() >= dueDate.getTime()){
                        let dateResult = {data:{status:'due_date_falls'}}
                        doValidationSuggestions(dateResult)
                    } else {
                        let dateResult = {data:{status:'failed'}}
                        doValidationSuggestions(dateResult)
                    }
                } else if(woAppointedDateEarly == true){
                    sixth_form.style.display = 'block'
                    dateInfo.style.display = 'none'
                    openSuccessMassageAfterApi()
                    sessionStorage.clear()
                } else if(inputRangeHours < 0) {
                    let dateResult = {data:{status:'wo_time'}}
                    doValidationSuggestions(dateResult)
                } else {
                    document.fifth_form.style.display = 'block';
                    window.step_index = 4
                    sessionStorage.setItem('step_index', window.step_index)
                    changeIrrigationDate()
                    
                    if(!checkIfIrrigationDateChanged() && window.onTimer == false){
                        window.stopDateTimer = true
                        window.stopTimer = false
                    } else if(window.first_time == false){
                        if(remainingTimeAfterReload == 0 || remainingTimeAfterReload == null){
                            window.stopTimer = true
                        }
                    } else {
                        window.stopTimer = false
                    }
                }
                loaderFourth.classList.add('hide')
                clearInterval(window.refreshIntervalId);
            }
        } 
    })
}
openfifthStep()
var ContactSiteHasBeenCreated = false
// Transition to commercial fourth step
function openFourthStep (){
    let form = document.commercial_third_section,
        devicesNote = document.getElementById('devices_note'),
        alertNote = document.getElementById('alert_note'),
        get_new_dates = document.getElementById('get_new_dates'),
        openLoader  = document.querySelector('#commercial_third_section .loader');
    form.addEventListener('submit',(e)=>{
        contacts = window.company.contacts
        ContactSiteHasBeenCreated = false
        for (let key in contacts) {
            if(document.commercial_third_section.site_contact_first_name.value == contacts[key].first_name){
                if(document.commercial_third_section.site_contact_last_name.value == contacts[key].last_name){
                    phone = document.commercial_third_section.site_contact_phone.value
                    if(phone.replace(/[^+\d]/g, '') == contacts[key].phone_numbers[0].value){
                        if(document.commercial_third_section.site_contact_email.value == contacts[key].email){
                            ContactSiteHasBeenCreated = true
                        }
                    }
                }
            }
        }
        if(ContactSiteHasBeenCreated == true){
            document.querySelector('.site_contact_error.error').style.display = 'block'
            elem = document.querySelector('.site_contact_error.error').offsetTop
            window.scrollTo({
                top: elem,
                left: 0,
                behavior: 'smooth'
              });
        } else {
            document.querySelector('.site_contact_error.error').style.display = 'none'
            if (jQuery(form).valid()) {
                openLoader.classList.remove('hide');
                setTimeout(()=>{
                    if (window.company != undefined && window.company.device_amount > 0 && window.company.autocreate_wo_disallowed != 'due_dates_diff_exceed' && window.today_due_date == false) {
                        e.preventDefault();
                        
                        window.step_index = 3
                        sessionStorage.setItem('step_index', window.step_index)
                        form.style.display = 'none'
                        alertNote.style.display = 'none'
                        get_new_dates.style.display = 'none'
                        document.fourthForm.style.display ='block'
                        devicesNote.style.display = 'block'

                        saveChangeRadioCommercialThirdStep()
                        saveChangeInputsCommercialThirdStep()
                        parseFourthSection()
                        sendCompanyDataForToken(form)
                    }
                }, 1000)
                openLoader.classList.add('hide');
            }
        }
    })
}
openFourthStep();
// Check change inputs irrigation dates
var checkChangeInputDates = false
function checkChangeIrrigationDates(){
    irrigationDateCommercial = document.getElementById('datepicker_turned')
    irrigationDateResidential = document.getElementById('datepicker_turned_on')

    irrigationDateCommercial.addEventListener('blur',(e)=>{
        checkChangeInputDates = true
    })
    irrigationDateResidential.addEventListener('blur',(e)=>{
        checkChangeInputDates = true
    })
}
checkChangeIrrigationDates()
var irrigationDateValue = '';
// Check change value irrigation dates
function changeIrrigationDate(){
    irrigationDateCommercial = document.getElementById('datepicker_turned')
    irrigationDateResidential = document.getElementById('datepicker_turned_on')
    
    
    if(firstFormData.type == 'commercial'){
        if(irrigationDateValue != irrigationDateCommercial.value){
            irrigationDateValue = irrigationDateCommercial.value
            sessionStorage.irrigationDateValue = JSON.stringify(irrigationDateValue)
            window.outside_checked = true
        } else {
            window.outside_checked = false
        }
    } else {
        if(irrigationDateValue != irrigationDateResidential.value){
            irrigationDateValue = irrigationDateResidential.value
            sessionStorage.irrigationDateValue = JSON.stringify(irrigationDateValue)
            window.outside_checked = true
        } else {
            window.outside_checked = false
        }
    }
    // toggleDateBlocks(false)
}
// Check change irrigation dates for request suggetions dates
function checkIfIrrigationDateChanged(){
    let locationOutside = document.getElementById('deviseLocationChoice2').checked,
        suggestions = document.querySelector('.suggestions'),
        locationOutsideRes = document.getElementById('deviseLocationChoiceCom2').checked;

    console.log(window.outside_checked, locationOutside, checkChangeInputs)
    if ((window.outside_checked == true && (checkChangeInputDates == true || (locationOutside == false && window.firstFormData.type == 'commercial') || (locationOutsideRes == false && window.firstFormData.type == 'residential') || checkChangeInputs == true)) || commentPrevSendToken == true || window.changeOperationalTime == true) {
        suggestions.innerHTML = ''
        return true
    }
    return false
}
// On edit mod
function editAllInputs(){
    let div = document.querySelectorAll('.edit_box');
    
    div.forEach(elem => {
        elem.addEventListener('click',()=>{
            if (window.company != undefined && window.company.device_amount > 0
                 && window.company.autocreate_wo_disallowed != 'due_dates_diff_exceed' && window.today_due_date == false){
                editingAll()
            }
        })
    })
}
editAllInputs()
// Show hidden elements with data
function showHiddenCompanyFields(){
    let hiddenFieldElements = document.querySelectorAll('.hidden-company__fields');
    hiddenFieldElements.forEach(elem => {
        elem.classList.remove('hide')
    })
}
// Hide hidden elements with data
function hideHiddenCompanyFields(){
    let hiddenFieldElements = document.querySelectorAll('.hidden-company__fields');
    hiddenFieldElements.forEach(elem => {
        elem.classList.add('hide')
    })
}
// Method mod edit-on with data
function editingAll(div){
    let alertNote = document.getElementById('alert_note');
    let result = confirm('Attention! After this action you will not be able to auto-scheduling the test from the site (but you can still send your data to our manager and we will call you back). Confirm action?');
    if (result){
        editing = true;
        sessionStorage.setItem('editing', editing)
        populateCompanyData()
        doCommercialThings()
        company = undefined;
        alertNote.style.display = 'none'
        closeMassageBox()
        disableInputs(document.commercial_second_form,false)
        disableInputs(document.residential_second_form,false)
        disableInputs(document.commercial_third_section,false)
        disableInputs(document.residential_third_section,false)
        window.openEditingFilds()
        window.validate()
        showHiddenCompanyFields()
        let hidenElements = document.querySelectorAll('.hide-if-success');
        hidenElements.forEach(elem => {
            elem.classList.remove('hide-if-success')
        })
        if (window.firstFormData.type == 'commercial'){
            document.commercial_third_section.style.display = 'none'
            document.residential_third_section.style.display = 'none'
            document.commercial_second_form.style.display = 'block'
            window.step_index = 1
            sessionStorage.setItem('step_index', window.step_index)
        }
        if (window.firstFormData.type == 'residential'){
            document.commercial_third_section.style.display = 'none'
            document.residential_third_section.style.display = 'none'
            document.residential_second_form.style.display = 'block'
            window.step_index = 1
            sessionStorage.setItem('step_index', window.step_index)
        }
        quantitySteps(editing)
    }
        fullnameEvents()
    }
// Parsing table devices > 50
function renderDevicesByClick(){
    let button = document.getElementById('read__more'),
        collapseButton = document.getElementById('read__less')
        deviceTable = document.getElementById('device_table'),
        pagination = document.getElementById('pagination'),
        openLoader = document.querySelector('#fourthForm .loader_message')
    if (window.company.device_amount > 20){
        button.style.display = 'block'
    } else {
        button.style.display = 'none'
    }
        button.addEventListener('click',()=>{
            openLoader.classList.remove('hide')
            var _deviceTable = deviceTable;
            setTimeout(function() {
                _deviceTable.innerHTML = '<tr><th>Size</th><th>Make</th><th>Model</th><th>Serial #</th><th>Application</th><th>Location</th></tr>';
                window.company.device_table.forEach((device,index) => {
                    _deviceTable.innerHTML = _deviceTable.innerHTML + `<tr data="${index}">
                                                                <td>${device.size}</td>
                                                                <td>${device.make}</td>
                                                                <td>${device.model}</td>
                                                                <td>${device.serial}</td>
                                                                <td>${device.application}</td>
                                                                <td>${device.location}</td></tr>`
                    if (index+1 == window.company.device_table.length) {
                        openLoader.classList.add('hide')
                        pagination.style.display = 'none'
                        collapseButton.style.display = 'block'
                    }
                })
            }, 1000);

            minifyDevices();
        })
}
// Parsing table devices > 50 - button hide
function minifyDevices(){
    let button = document.getElementById('read__less'),
    pagination = document.getElementById('pagination')
    deviceTable = document.getElementById('device_table');
    button.addEventListener('click',(e)=>{
        deviceTable.innerHTML = `<tr><th>Size</th><th>Make</th><th>Model</th><th>Serial #</th><th>Application</th><th>Location</th></tr>` ;
        for (var i = 0; i < 20 ; i++){
           let device = window.company.device_table[i];
            deviceTable.innerHTML = deviceTable.innerHTML + `<tr>
                                                            <td>${device.size}</td>
                                                            <td>${device.make}</td>
                                                            <td>${device.model}</td>
                                                            <td>${device.serial}</td>
                                                            <td>${device.application}</td>
                                                            <td>${device.location}</td></tr>`
        }
        button.style.display = 'none'
        pagination.style.display = 'flex'
    })
}
// Parsing table devices > 50 - six step
function renderDevicesByClickWOInfo(){
    let button = document.getElementById('read__more_info'),
        collapseButton = document.getElementById('read__less_info')
        deviceTable = document.getElementById('device_table_info'),
        pagination = document.getElementById('pagination_info'),
        openLoader = document.querySelector('#wo_info .loader_message')
    if (window.company.device_amount > 20){
        button.style.display = 'block'
    } else {
        button.style.display = 'none'
    }
        button.addEventListener('click',()=>{
            openLoader.classList.remove('hide')
            var _deviceTable = deviceTable;
            setTimeout(function() {
                _deviceTable.innerHTML = '<tr><th>Size</th><th>Make</th><th>Model</th><th>Serial #</th><th>Application</th><th>Location</th></tr>';
                window.company.device_table.forEach((device,index) => {
                    _deviceTable.innerHTML = _deviceTable.innerHTML + `<tr data="${index}">
                                                                <td>${device.size}</td>
                                                                <td>${device.make}</td>
                                                                <td>${device.model}</td>
                                                                <td>${device.serial}</td>
                                                                <td>${device.application}</td>
                                                                <td>${device.location}</td></tr>`
                    if (index+1 == window.company.device_table.length) {
                        openLoader.classList.add('hide')
                        pagination.style.display = 'none'
                        collapseButton.style.display = 'block'
                    }
                })
            }, 1000);

            minifyDevicesWOInfo();
        })
}
// Parsing table devices > 50 - six step - button hide
function minifyDevicesWOInfo(){
    let button = document.getElementById('read__less_info'),
    pagination = document.getElementById('pagination_info')
    deviceTable = document.getElementById('device_table_info');
    button.addEventListener('click',(e)=>{
        deviceTable.innerHTML = `<tr><th>Size</th><th>Make</th><th>Model</th><th>Serial #</th><th>Application</th><th>Location</th></tr>` ;
        for (var i = 0; i < 20 ; i++){
           let device = window.company.device_table[i];
            deviceTable.innerHTML = deviceTable.innerHTML + `<tr>
                                                            <td>${device.size}</td>
                                                            <td>${device.make}</td>
                                                            <td>${device.model}</td>
                                                            <td>${device.serial}</td>
                                                            <td>${device.application}</td>
                                                            <td>${device.location}</td></tr>`
        }
        button.style.display = 'none'
        pagination.style.display = 'flex'
    })
}
// Update inputs user changed
function sendIfContactsChanged (form){
    if ( window.editing == undefined){
        let inputs = form.elements;
        let firstContactKey = firstContact((window.company.contacts));
        var inputsData = new Map(),
            formObject;
        if(company.contacts[firstContactKey].phone_numbers.length){
            var companyData = new Map([
                ['first_name', window.company.contacts[firstContactKey].first_name],
                ['last_name', window.company.contacts[firstContactKey].last_name],
                ['phone', window.company.contacts[firstContactKey].phone_numbers[0]?.value],
                ['phone_type', window.company.contacts[firstContactKey].phone_numbers[0]?.type]
            ]);
        } else {
            var companyData = new Map([
                ['first_name', window.company.contacts[firstContactKey].first_name],
                ['last_name', window.company.contacts[firstContactKey].last_name],
                ['phone', window.company.company_phone_numbers[0]?.value],
                ['phone_type', window.company.company_phone_numbers[0]?.type]
            ]);
        }   
        inputs = [... inputs]
        inputs  = inputs.filter(getContactInputs)
        inputs.forEach(input =>{
            switch (input.name){
                case 'first_name':
                    inputsData.set('first_name', input.value)
                    break;
                case 'second_name':
                    inputsData.set('last_name', input.value)
                    break;
                case 'phone':
                    inputsData.set('phone', input.value)
                    break;
                case 'phone_type':
                    inputsData.set('phone_type', input.value)
                    break;
            }
        })
        let contacts = {
                contacts:{
                    ...window.company.contacts
                }
            },
            company_phone_numbers = {
                company_phone_numbers:{
                    ...window.company.company_phone_numbers
                }
            }
        if (checkIfContactsChanged(inputsData,companyData) == false){
            if (inputsData.get('first_name') != companyData.get('first_name') || inputsData.get('last_name') != companyData.get('last_name')) {
                contacts.contacts[firstContactKey].first_name = inputsData.get('first_name')
                contacts.contacts[firstContactKey].last_name = inputsData.get('last_name')
                formObject = {...contacts,...formObject}
                if (inputsData.get('phone') != companyData.get('phone')){
                    if(company.contacts[firstContactKey].phone_numbers.length){

                        contacts.contacts[firstContactKey].phone_numbers[0]?.value ?
                        contacts.contacts[firstContactKey].phone_numbers[0].value = inputsData.get('phone')
                        : ''

                        contacts.contacts[firstContactKey].phone_numbers[0]?.type ?
                        contacts.contacts[firstContactKey].phone_numbers[0].type = inputsData.get('phone_type')
                        : ''
                        formObject = {...contacts,...formObject}
                    } else {

                        company_phone_numbers.company_phone_numbers[0]?.value ?
                        company_phone_numbers.company_phone_numbers[0].value = inputsData.get('phone')
                        : ''

                        company_phone_numbers.company_phone_numbers[0]?.type ?
                        company_phone_numbers.company_phone_numbers[0].type = inputsData.get('phone_type')
                        : ''

                        formObject = {...company_phone_numbers,...formObject}
                    }
                }
            }
            if (inputsData.get('phone') != companyData.get('phone')){
                if(company.contacts[firstContactKey].phone_numbers.length){

                    contacts.contacts[firstContactKey].phone_numbers[0]?.value ?
                    contacts.contacts[firstContactKey].phone_numbers[0].value = inputsData.get('phone')
                    : ''

                    contacts.contacts[firstContactKey].phone_numbers[0]?.type ?
                    contacts.contacts[firstContactKey].phone_numbers[0].type = inputsData.get('phone_type') ?? 'other'
                    : '' 

                    formObject = {...contacts,...formObject}
                } else {

                    company_phone_numbers.company_phone_numbers[0]?.value ? 
                    company_phone_numbers.company_phone_numbers[0].value = inputsData.get('phone')
                    : ''

                    company_phone_numbers.company_phone_numbers[0]?.type ?
                    company_phone_numbers.company_phone_numbers[0].type = inputsData.get('phone_type') ?? 'other' 
                    : ''

                    formObject = {...company_phone_numbers,...formObject}
                }
            }
            toSend(formObject)
        }
    }
}
// Update request inputs user changed 
function toSend(formObject){
    let formDataJson = {
        action : 'updateorg',
        nonce: mainVars.nonce,
        data : JSON.stringify(formObject),
        email : window.firstFormData.email,
        cid : window.firstFormData.CID
    };
    formData = getFormData(formDataJson);
    fetch( mainVars.ajax_url, {
        method: 'POST',
        body: formData,
    } )
        .then( res => res.text() )
        .then( data => console.log(data))
        .catch( err => console.log( err,data) );
}
function checkIfContactsChanged(inputsData,companyData){
    let success = false;
    if (inputsData.get('first_name') == companyData.get('first_name')) {
        if (inputsData.get('last_name') == companyData.get('last_name')) {
            if (inputsData.get('phone') == companyData.get('phone')) {
                success = true
                if (inputsData.get('phone_type') == undefined || inputsData.get('phone_type') == companyData.get('phone_type')){
                    success = true;
                } else {
                    success = false
                }
            }
        }
    }
    return success
}
function getContactInputs(input){

        if (input.name == 'first_name' || input.name == 'second_name' || input.name == 'phone' || input.name == 'phone_type'){
            if (input.name == 'phone_type' && input.checked == true){
                return input;
            } else if(input.name != 'phone_type'){
                return input;
            }
        } else {
            return false;
        }
}

function focusDate(elem) {
    jQuery(elem).prev().focus()
}
// Var so that there are no duplicates of the timer
var notDuble = true
// 10-minute timer for which you need to have time to create an order. SetInterval doesn't work with unactive page.
function TimerProgress(){
    let percentageActiveTimer = document.querySelector('.progress_timer_active'),
        percentageActive = document.querySelector('.form_progress .progress__active'),
        get_new_dates = document.getElementById('get_new_dates'),
        date_info = document.getElementById('date_info'),
        step = document.getElementById('step'),
        form = document.querySelector('.form_timer');

    if(notDuble == true && window.stopTimer == false){
        notDuble = false
        widthActive = 0
        var second = 60
        form.style.display = 'block'
        Timer()
        let remainingTimeToEndTime = 600000
        var endTime = new Date().getTime() + remainingTimeToEndTime
        var time = endTime

        function getRemainingTime(deadline) {
            const currentTime = new Date().getTime();
            return deadline - currentTime;
        }

        function pad(value) {
            return ('0' + Math.floor(value)).slice(-2);
        }

        function showTime() {
            if(reloadPage == true && remainingTimeAfterReload != 0 && remainingTimeAfterReload != null){
                remainingTimeToEndTime = parseInt(remainingTimeAfterReload)
                endTime = new Date().getTime() + remainingTimeToEndTime
                reloadPage = false
            }
            const remainingTime = getRemainingTime(endTime);
            sessionStorage.setItem('remainingTime', remainingTime)
            const seconds = pad((remainingTime / 1000) % 60);
            const minutes = pad((remainingTime / (60 * 1000)) % 60);
            if(seconds != second){
                widthActive = ((parseInt(minutes) * 60) + parseInt(seconds)) * 0.1666667;
                percentageActiveTimer.style.width = widthActive + '%';
                time = (parseInt(minutes) * 60) + parseInt(seconds)
            }
            second = seconds
            if(time <= 0 || window.stopTimer == true || (time > 600 && time <= 6000)){
                if(time <= 0 || stopMainTimer == true || (time > 600 && time <= 6000)) {
                    stopMainTimer = false
                    remainingTimeAfterReload = 0
                    document.fifth_form.style.display = 'none'
                    document.wo_info.style.display = 'none'
                    document.second_comment_form.style.display = 'none'
                    document.comment_form.style.display = 'none'
                    document.commercial_second_form.style.display = 'none'
                    document.residential_second_form.style.display = 'none'
                    if(firstFormData.type == 'commercial'){
                        document.commercial_third_section.style.display = 'block'
                    } else {
                        document.residential_third_section.style.display = 'block'
                    }
                    document.fourthForm.style.display = 'none'
                    get_new_dates.style.display = 'block'
                    date_info.style.display = 'none'
                    document.getElementById('order_info').style.display = 'none'
                    window.getNewDates = true
                    step.innerHTML = 3
                    percentageActive.style.width = 60 + '%';
                    percentageActive.innerHTML = '60%';
                    window.step_index = 2
                    sessionStorage.setItem('step_index', window.step_index)
                    document.querySelector('.suggestions').innerHTML = ""
                }
                form.style.display = 'none'
                notDuble = true
            } else {
                if (remainingTime >= 1000) {
                    requestAnimationFrame(showTime);
                }
            }
        }
        requestAnimationFrame(showTime);
    }  
}
var stopMainTimer = false
// 10-minute timer for which you need to have time to create an order + digital timer
function Timer(){
    let timer = document.getElementById('timer');
    let remainingTimeToEndTime = 600000
    var endTime = new Date().getTime() + remainingTimeToEndTime
    var time = endTime;

    function getRemainingTime(deadline) {
      const currentTime = new Date().getTime();
      return deadline - currentTime;
    }

    function pad(value) {
      return ('0' + Math.floor(value)).slice(-2);
    }

    function showTime() {
        if(reloadPage == true && remainingTimeAfterReload != 0 && remainingTimeAfterReload != null){
            remainingTimeToEndTime = parseInt(remainingTimeAfterReload)
            endTime = new Date().getTime() + remainingTimeToEndTime
        }
        const remainingTime = getRemainingTime(endTime);
        const seconds = pad((remainingTime / 1000) % 60);
        const minutes = pad((remainingTime / (60 * 1000)) % 60);
                    
        timer.innerHTML = `${minutes}:${seconds}`;

        time = (parseInt(minutes) * 60) + parseInt(seconds)
                    
        if(time <= 0 || window.stopTimer == true || (time > 600 && time <= 6000)){ 
            if(time <= 0  || (time > 600 && time <= 6000)){
                stopMainTimer = true
            }
            window.stopTimer = true
        }
        if (remainingTime >= 1000) {
            requestAnimationFrame(showTime);
        }
    }
    requestAnimationFrame(showTime);
}
var checkChangeInputs = false
// Additional method for hiding radio elements and for signal change irrigation date
function hideDateIrrigationLogic(){
    let commercialForm = document.commercial_third_section.lawn,
        residentialForm = document.residential_third_section.lawn,
        inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`),
        inside_location = document.querySelector(`[data-group^=inside_location`);

    commercialForm.forEach(elem =>{
        elem.addEventListener('change',()=>{
            if(document.commercial_third_section.lawn.value == 'yes' && document.commercial_third_section.device_location.value == 'outside'){
                inside_loc_div.classList.remove('hide')
            }else if(document.commercial_third_section.lawn.value == 'no' || document.commercial_third_section.lawn.value == 'not_sure'){
                checkChangeInputs = true
                inside_loc_div.classList.add('hide')
                document.commercial_third_section.device_location.forEach(el =>{
                    el.checked = false
                })
            }
        })
    })
    residentialForm.forEach(elem =>{
        elem.addEventListener('change',()=>{
            if(document.residential_third_section.lawn.value == 'yes' && document.residential_third_section.device_location.value == 'outside'){
                inside_location.classList.remove('hide')
            }else if(document.residential_third_section.lawn.value == 'no' || document.residential_third_section.lawn.value == 'not_sure'){
                inside_location.classList.add('hide')
                document.residential_third_section.device_location.forEach(el =>{
                    el.checked = false
                })
            }
        })
    })
}
var sendSiteContact = false
function hideSiteContactLogic(){
    let commercialForm = document.commercial_third_section.access_site,
        residentialForm = document.residential_third_section.res_access_site,
        com_other = document.querySelector(`[data-group^=site_access_other_group`),
        res_other = document.querySelector(`[data-group^=other`);

    if(firstFormData.type == 'commercial'){
        commercialForm.forEach(elem =>{
            elem.addEventListener('change',()=>{
                if(elem.value == 'other' && document.commercial_third_section.access_type.value == 'contact'){
                    com_other.classList.remove('hide')
                    sendSiteContact = true
                } else {
                    com_other.classList.add('hide')
                    sendSiteContact = false
                }
            })
        })
        document.commercial_third_section.access_type.forEach(elem =>{
            elem.addEventListener('change',()=>{
                if(document.commercial_third_section.access_type.value != 'contact'){
                    com_other.classList.add('hide')
                    sendSiteContact = false
                } else if(document.commercial_third_section.access_site.value == 'other'){
                    com_other.classList.remove('hide')
                    sendSiteContact = true
                }
            })
        })
    } else {
        residentialForm.forEach(elem =>{
            elem.addEventListener('change',()=>{
                if(elem.value == 'other' && document.residential_third_section.access_type.value == 'contact'){
                    res_other.classList.remove('hide')
                    sendSiteContact = true
                } else {
                    res_other.classList.add('hide')
                    sendSiteContact = false
                }
            })
        })
        document.residential_third_section.access_type.forEach(elem =>{
            elem.addEventListener('change',()=>{
                if(document.residential_third_section.access_type.value != 'contact'){
                    res_other.classList.add('hide')
                    sendSiteContact = false
                } else if(document.residential_third_section.res_access_site.value == 'other'){
                    res_other.classList.remove('hide')
                    sendSiteContact = true
                }
            })
        })
    }
}
// Var so that there are no duplicates of the timer
var notDubleTimer = true
// Minute timer to ensure that requests for new dates are not many
function dateTimer(){
    let timer = document.getElementById('date_timer'),
        dateTimer = document.querySelector('.date_timer'),
        time = 60;
    
    if(notDubleTimer == true){
        notDubleTimer = false
        let stopInterval = setInterval(()=>{
            if(time == 0){
                dateTimer.style.display = 'none'
                timer.innerHTML = '';
                notDubleTimer = true
                clearInterval(stopInterval)

                window.stopDateTimer = true
                window.onTimer = true
                if(commentPrevSendToken == true){
                    sendToken()
                    commentPrevSendToken = false
                    document.getElementById('submit_fifth_section').disabled = false
                }
            } else {
                    if(window.stopDateTimer == true && window.onTimer == false && commentPrevSendToken == false){
                        dateTimer.style.display = 'none'
                        timer.innerHTML = '';
                    } else {
                        if((document.fifth_form.style.display == 'block' && window.onTimer == false) || (document.fifth_form.style.display == 'block' && commentPrevSendToken == true)){
                            dateTimer.style.display = 'block'
                            if(commentPrevSendToken == true){
                                document.getElementById('loader_fifth').classList.remove('hide')
                                document.getElementById('submit_fifth_section').disabled = true
                            }
                        } else {
                            dateTimer.style.display = 'none'
                        }
                    }
                    strTimer = `${time}`;
                    timer.innerHTML = strTimer;
            }
            --time;
        }, 1000)
    }
}
var remainingTimeAfterReload = 0,
    reloadPage = false;
// Great method to display and save data on page refresh. sessionStorage
function localStorageData(){
    document.addEventListener('DOMContentLoaded', e => {
        if(sessionStorage.firstFormData){
            data = JSON.parse(sessionStorage.data)
            firstFormData = JSON.parse(sessionStorage.firstFormData)
            company = data.data

            if(company != undefined){
                let firstContactKey = firstContact((company.contacts));

                if(firstFormData.type == 'commercial'){
                    document.firstForm.typeChoice1.checked = true
                } else {
                    document.firstForm.typeChoice2.checked = true
                }
                document.firstForm.CID.value = company.company_id
                document.firstForm.email.value = company.contacts[firstContactKey].email
                TodayVsDueDate(data)
            }

            let firstInfo = document.getElementById('first_info'),
                devicesNote = document.getElementById('devices_note'),
                dateInfo = document.getElementById('date_info'),
                orderInfo = document.getElementById('order_info'),
                messageSuccess = document.querySelector('.message__success'),
                extraNote = document.querySelector('.extra_note'),
                percentageActive = document.querySelector('.form_progress .progress__active'),
                step = document.getElementById('step'),
                maxStep = document.getElementById('max_step');

            com_forms = [
                document.firstForm,
                document.commercial_second_form,
                document.commercial_third_section,
                document.fourthForm,
                document.fifth_form,
                document.wo_info,
                document.second_comment_form,
                document.comment_form
            ],
            res_forms = [
                document.firstForm,
                document.residential_second_form,
                document.residential_third_section,
                document.fourthForm,
                document.fifth_form,
                document.wo_info,
                document.second_comment_form,
                document.comment_form
            ]

            if(firstFormData.type == 'commercial'){
                document.commercial_second_form.CID.value = sessionStorage.getItem('CID')
                document.commercial_second_form.CCN.value = sessionStorage.getItem('CCN')
                document.commercial_second_form.first_name.value = sessionStorage.getItem('first_name')
                document.commercial_second_form.second_name.value = sessionStorage.getItem('second_name')
                document.commercial_second_form.email.value = sessionStorage.getItem('email')
                document.commercial_second_form.phone.value = sessionStorage.getItem('phone')
                document.commercial_second_form.site_first_name.value = sessionStorage.getItem('site_first_name')
                document.commercial_second_form.site_last_name.value = sessionStorage.getItem('site_last_name')
                document.commercial_second_form.site_email.value = sessionStorage.getItem('site_email')
                document.commercial_second_form.site_phone.value = sessionStorage.getItem('site_phone')

                index_phone_type = sessionStorage.getItem('phone_type')
                if(index_phone_type){
                    document.commercial_second_form.phone_type[index_phone_type].checked = true
                }

                index_contact_update = sessionStorage.getItem('contact_update')
                if(index_contact_update){
                    document.commercial_second_form.contact_update[index_contact_update].checked = true
                }

                document.commercial_third_section.company_name.value = sessionStorage.getItem('company_name')
                document.commercial_third_section.address.value = sessionStorage.getItem('address')
                document.commercial_third_section.address_line.value = sessionStorage.getItem('address_line')
                document.commercial_third_section.city.value = sessionStorage.getItem('city')
                document.commercial_third_section.state.value = sessionStorage.getItem('state')
                document.commercial_third_section.zip.value = sessionStorage.getItem('zip')
                document.commercial_third_section.com_lockbox_location.value = sessionStorage.getItem('lockbox_location')
                document.commercial_third_section.com_lockbox_code.value = sessionStorage.getItem('lockbox_code')
                document.commercial_third_section.input_open_hours.value = sessionStorage.getItem('input_open_hours')
                document.commercial_third_section.input_open_minutes.value = sessionStorage.getItem('input_open_minutes')
                document.commercial_third_section.input_close_hours.value = sessionStorage.getItem('input_close_hours')
                document.commercial_third_section.input_close_minutes.value = sessionStorage.getItem('input_close_minutes')
                document.commercial_third_section.billing_attention.value = sessionStorage.getItem('billing_attention')
                document.commercial_third_section.billing_address.value = sessionStorage.getItem('billing_address')
                document.commercial_third_section.billing_address_line.value = sessionStorage.getItem('billing_address_line')
                document.commercial_third_section.billing_city.value = sessionStorage.getItem('billing_city')
                document.commercial_third_section.billing_state.value = sessionStorage.getItem('billing_state')
                document.commercial_third_section.billing_zip.value = sessionStorage.getItem('billing_zip')
                document.commercial_third_section.mailing_attention.value = sessionStorage.getItem('mailing_attention')
                document.commercial_third_section.mailing_address.value = sessionStorage.getItem('mailing_address')
                document.commercial_third_section.mailing_address_line.value = sessionStorage.getItem('mailing_address_line')
                document.commercial_third_section.mailing_city.value = sessionStorage.getItem('mailing_city')
                document.commercial_third_section.mailing_state.value = sessionStorage.getItem('mailing_state')
                document.commercial_third_section.mailing_zip.value = sessionStorage.getItem('mailing_zip')
                document.commercial_third_section.com_rental_first_name.value = sessionStorage.getItem('rental_first_name')
                document.commercial_third_section.com_rental_last_name.value = sessionStorage.getItem('rental_last_name')
                document.commercial_third_section.com_rental_phone.value = sessionStorage.getItem('rental_phone')
                document.commercial_third_section.com_rental_email.value = sessionStorage.getItem('rental_email')
                document.commercial_third_section.location_comment.value = sessionStorage.getItem('location_comment')
                document.commercial_third_section.datepicker_turned.value = sessionStorage.getItem('turned_on')
                document.commercial_third_section.operational_time_open_hours.value = sessionStorage.getItem('operational_time_open_hours')
                document.commercial_third_section.operational_time_open_minutes.value = sessionStorage.getItem('operational_time_open_minutes')
                document.commercial_third_section.operational_open_times_of_day.value = sessionStorage.getItem('operational_open_times_of_day')
                document.commercial_third_section.operational_time_close_hours.value = sessionStorage.getItem('operational_time_close_hours')
                document.commercial_third_section.operational_time_close_minutes.value = sessionStorage.getItem('operational_time_close_minutes')
                document.commercial_third_section.operational_close_times_of_day.value = sessionStorage.getItem('operational_close_times_of_day')

                index_adress_type = sessionStorage.getItem('adress_type')
                if(index_adress_type){
                    document.commercial_third_section.adress_type[index_adress_type].checked = true
                }

                index_commercial_location = sessionStorage.getItem('commercial_location')
                if(index_commercial_location){
                    document.commercial_third_section.commercial_location[index_commercial_location].checked = true
                }
                
                index_device_location = sessionStorage.getItem('device_location')
                if(index_device_location){
                    document.commercial_third_section.device_location[index_device_location].checked = true
                }

                
                index_lawn = sessionStorage.getItem('lawn')
                if(index_lawn){
                    document.commercial_third_section.lawn[index_lawn].checked = true
                }

                index_access_type = sessionStorage.getItem('access_type')
                if(index_access_type){
                    document.commercial_third_section.access_type[index_access_type].checked = true
                }

                hideRadioLogic()
            } else {
                document.residential_second_form.CID.value = sessionStorage.getItem('CID')
                document.residential_second_form.CCN.value = sessionStorage.getItem('CCN')
                document.residential_second_form.first_name.value = sessionStorage.getItem('first_name')
                document.residential_second_form.second_name.value = sessionStorage.getItem('second_name')
                document.residential_second_form.email.value = sessionStorage.getItem('email')
                document.residential_second_form.phone.value = sessionStorage.getItem('phone')
                document.residential_second_form.address.value = sessionStorage.getItem('address')
                document.residential_second_form.address_line.value = sessionStorage.getItem('address_line')
                document.residential_second_form.city.value = sessionStorage.getItem('city')
                document.residential_second_form.state.value = sessionStorage.getItem('state')
                document.residential_second_form.zip.value = sessionStorage.getItem('zip')
                document.residential_second_form.bill_mail_name.value = sessionStorage.getItem('bill_mail_name')
                document.residential_second_form.bill_mail_address.value = sessionStorage.getItem('bill_mail_address')
                document.residential_second_form.bill_mail_address_line.value = sessionStorage.getItem('bill_mail_address_line')
                document.residential_second_form.bill_mail_city.value = sessionStorage.getItem('bill_mail_city')
                document.residential_second_form.bill_mail_state.value = sessionStorage.getItem('bill_mail_state')
                document.residential_second_form.bill_mail_zip.value = sessionStorage.getItem('bill_mail_zip')
                document.residential_second_form.site_contact_first.value = sessionStorage.getItem('site_contact_first')
                document.residential_second_form.site_contact_last.value = sessionStorage.getItem('site_contact_last')
                document.residential_second_form.site_contact_phone.value = sessionStorage.getItem('site_contact_phone')
                document.residential_second_form.site_contact_email.value = sessionStorage.getItem('site_contact_email')

                index_phone_type = sessionStorage.getItem('phone_type')
                if(index_phone_type){
                    document.residential_second_form.phone_type[index_phone_type].checked = true
                }

                index_mailing_billing = sessionStorage.getItem('mailing_billing')
                if(index_mailing_billing){
                    document.residential_second_form.mailing_billing[index_mailing_billing].checked = true
                }

                index_site_choice = sessionStorage.getItem('site_choice')
                if(index_site_choice){
                    document.residential_second_form.site_choice[index_site_choice].checked = true
                }

                document.residential_third_section.gated_text.value = sessionStorage.getItem('gated_text')
                document.residential_third_section.res_lockbox_location.value = sessionStorage.getItem('lockbox_location')
                document.residential_third_section.res_lockbox_code.value = sessionStorage.getItem('lockbox_code')
                document.residential_third_section.res_rental_first_name.value = sessionStorage.getItem('rental_first_name')
                document.residential_third_section.res_rental_last_name.value = sessionStorage.getItem('rental_last_name')
                document.residential_third_section.res_rental_phone.value = sessionStorage.getItem('rental_phone')
                document.residential_third_section.res_rental_email.value = sessionStorage.getItem('rental_email')
                document.residential_third_section.datepicker_turned_on.value = sessionStorage.getItem('turned_on')

                index_gated = sessionStorage.getItem('gated')
                if(index_gated){
                    document.residential_third_section.gated[index_gated].checked = true
                }

                index_adress_type = sessionStorage.getItem('adress_type')
                if(index_adress_type){
                    document.residential_third_section.adress_type[index_adress_type].checked = true
                }
                
                index_device_location = sessionStorage.getItem('device_location')
                if(index_device_location){
                    document.residential_third_section.device_location[index_device_location].checked = true
                }

                index_lawn = sessionStorage.getItem('lawn')
                if(index_lawn){
                    document.residential_third_section.lawn[index_lawn].checked = true
                }

                index_access_type = sessionStorage.getItem('access_type')
                if(index_access_type){
                    document.residential_third_section.access_type[index_access_type].checked = true
                }

                hideRadioLogic()
            }

            window.step_index = sessionStorage.getItem('step_index')
            if(window.step_index == 8 || window.step_index < 0){
                window.step_index = 0
            }
            maxStep.innerHTML = sessionStorage.getItem('maxStep')
            maxSteps = parseInt(maxStep.innerHTML)
            stepIndex = parseInt(window.step_index)
            stepIndex++
            if (100/maxStep * stepIndex > 50){
                percentageActive.classList.add('text-center')
            } else {
                percentageActive.classList.add('text-right')
            }
            window.ready_suggestions = JSON.parse(sessionStorage.getItem('ready_suggestions'))
            window.editing = JSON.parse(sessionStorage.getItem('editing'))
            window.stopDateTimer = true
            window.selected_index = JSON.parse(sessionStorage.getItem('selected_index'))
            window.today_due_date = JSON.parse(sessionStorage.getItem('today_due_date'))
            window.first_time = JSON.parse(sessionStorage.getItem('first_time'))
            window.wodates = JSON.parse(sessionStorage.getItem('wodates'))
            window.deviceDueDateStart = sessionStorage.getItem('device_due_date_start')
            window.deviceDueDateEnd = sessionStorage.getItem('device_due_date_end')
            remainingTimeAfterReload = sessionStorage.getItem('remainingTime')
            if(remainingTimeAfterReload != 0 && remainingTimeAfterReload != null){
                reloadPage = true
            }

            if(firstFormData.type == 'commercial'){
                com_forms.forEach((elem, index) => {
                    if(index == window.step_index){
                        elem.style.display = 'block'
                    } else {
                        elem.style.display = 'none'
                    }
                })
            } else {
                res_forms.forEach((elem, index) => {
                    if(index == window.step_index){
                        elem.style.display = 'block'
                    } else {
                        elem.style.display = 'none'
                    }
                })
            }
            if(window.step_index == 0){
                remainingTimeAfterReload = 0
                reloadPage = false
            }
            if(window.step_index == 1){
                window.ready_suggestions = false
                if(remainingTimeAfterReload != 0 && remainingTimeAfterReload != null){
                    window.stopTimer = false
                    TimerProgress()
                }
                isRequestNotEmpty(data) ? requestNotEmpty(data) : requestEmpty()
                firstInfo.style.display = 'none'
                step.innerHTML = stepIndex
                percentageActive.innerHTML = 100/maxSteps * stepIndex + '%';
                percentageActive.style.width = 100/maxSteps * stepIndex + '%';
                wo_dates_suggestions = JSON.parse(sessionStorage.wo_dates_suggestions)
                sessionStorage.wo_dates_suggestions = JSON.stringify(wo_dates_suggestions)
                irrigationDateValue = JSON.parse(sessionStorage.irrigationDateValue)
                sessionStorage.irrigationDateValue = JSON.stringify(irrigationDateValue)
            } else if(window.step_index == 2){
                window.ready_suggestions = false
                wo_dates_suggestions = JSON.parse(sessionStorage.wo_dates_suggestions)
                sessionStorage.wo_dates_suggestions = JSON.stringify(wo_dates_suggestions)
                irrigationDateValue = JSON.parse(sessionStorage.irrigationDateValue)
                sessionStorage.irrigationDateValue = JSON.stringify(irrigationDateValue)
                if(remainingTimeAfterReload != 0 && remainingTimeAfterReload != null){
                    window.stopTimer = false
                    TimerProgress()
                }    
                if(firstFormData.type == 'commercial'){
                    if(company == undefined){
                        commercialSecondStep()
                        step.innerHTML = stepIndex
                        percentageActive.innerHTML = 100/maxSteps * stepIndex + '%';
                        percentageActive.style.width = 100/maxSteps * stepIndex + '%';
                    } else {
                        thirdCommercialStep()
                        step.innerHTML = stepIndex
                        percentageActive.innerHTML = 100/maxSteps * stepIndex + '%';
                        percentageActive.style.width = 100/maxSteps * stepIndex + '%';
                    }
                } else{
                    if(company == undefined){
                        thirdstep()
                        step.innerHTML = stepIndex
                        percentageActive.innerHTML = 100/maxSteps * stepIndex + '%';
                        percentageActive.style.width = 100/maxSteps * stepIndex + '%';
                    } else {
                        thirdstepsignedStorage()
                        step.innerHTML = stepIndex
                        percentageActive.innerHTML = 100/maxSteps * stepIndex + '%';
                        percentageActive.style.width = 100/maxSteps * stepIndex + '%';
                    }
                }
                firstInfo.style.display = 'none'
            } else if(window.step_index == 3){
                window.ready_suggestions = false
                if(remainingTimeAfterReload != 0 && remainingTimeAfterReload != null){
                    window.stopTimer = false
                    TimerProgress()
                }
                let form = ''
                isRequestNotEmpty(data) ? requestNotEmpty(data) : requestEmpty()
                if(firstFormData.type == 'commercial'){
                    parseThirdCommercialStep()
                    form = document.commercial_third_section
                } else {
                    form = document.residential_third_section
                }
                wo_dates_suggestions = JSON.parse(sessionStorage.wo_dates_suggestions)
                sessionStorage.wo_dates_suggestions = JSON.stringify(wo_dates_suggestions)
                irrigationDateValue = JSON.parse(sessionStorage.irrigationDateValue)
                sessionStorage.irrigationDateValue = JSON.stringify(irrigationDateValue)
                document.commercial_second_form.style.display = 'none'
                document.residential_second_form.style.display = 'none'
                messageSuccess.style.display = 'none'
                extraNote.style.display = 'none'
                parseFourthSection()
                sendCompanyDataForToken(form)
                firstInfo.style.display = 'none'
                devicesNote.style.display = 'block'
                step.innerHTML = stepIndex
                percentageActive.innerHTML = 100/maxSteps * stepIndex + '%';
                percentageActive.style.width = 100/maxSteps * stepIndex + '%';
            } else if(window.step_index == 4){
                isRequestNotEmpty(data) ? requestNotEmpty(data) : requestEmpty()
                if(firstFormData.type == 'commercial'){
                    parseThirdCommercialStep()
                    form = document.commercial_third_section
                    sendCompanyDataForToken(form)
                } else {
                    form = document.residential_third_section
                    sendCompanyDataForToken(form)
                }
                document.commercial_second_form.style.display = 'none'
                document.residential_second_form.style.display = 'none'
                messageSuccess.style.display = 'none'
                extraNote.style.display = 'none'
                wo_dates_suggestions = JSON.parse(sessionStorage.wo_dates_suggestions)
                sessionStorage.wo_dates_suggestions = JSON.stringify(wo_dates_suggestions)
                irrigationDateValue = JSON.parse(sessionStorage.irrigationDateValue)
                sessionStorage.irrigationDateValue = JSON.stringify(irrigationDateValue)
                parseFourthSection()
                parseFifthSection(wo_dates_suggestions)
                firstInfo.style.display = 'none'
                dateInfo.style.display = 'block'
                window.stopTimer = false
                TimerProgress()
                window.step_index = 4
                sessionStorage.setItem('step_index', window.step_index)
                step.innerHTML = stepIndex
                percentageActive.innerHTML = 100/maxSteps * stepIndex + '%';
                percentageActive.style.width = 100/maxSteps * stepIndex + '%';
            } else if(window.step_index == 5){
                isRequestNotEmpty(data) ? requestNotEmpty(data) : requestEmpty()
                if(firstFormData.type == 'commercial'){
                    parseThirdCommercialStep()
                }
                document.commercial_second_form.style.display = 'none'
                document.residential_second_form.style.display = 'none'
                messageSuccess.style.display = 'none'
                extraNote.style.display = 'none'
                wo_dates_suggestions = JSON.parse(sessionStorage.wo_dates_suggestions)
                sessionStorage.wo_dates_suggestions = JSON.stringify(wo_dates_suggestions)
                irrigationDateValue = JSON.parse(sessionStorage.irrigationDateValue)
                sessionStorage.irrigationDateValue = JSON.stringify(irrigationDateValue)
                parseFourthSection()
                parseFifthSection(wo_dates_suggestions)
                firstInfo.style.display = 'none'
                window.stopTimer = false
                TimerProgress()
                select_date = JSON.parse(sessionStorage.select_date)
                orderInfo.style.display = 'block'
                parseWOInfo(select_date)
                window.step_index = 5
                sessionStorage.setItem('step_index', window.step_index)
                step.innerHTML = 5
                percentageActive.innerHTML = 100 + '%';
                percentageActive.style.width = 100 + '%';
            } else if(window.step_index == 6){
                isRequestNotEmpty(data) ? requestNotEmpty(data) : requestEmpty()
                if(firstFormData.type == 'commercial'){
                    parseThirdCommercialStep()
                }
                document.commercial_second_form.style.display = 'none'
                document.residential_second_form.style.display = 'none'
                messageSuccess.style.display = 'none'
                extraNote.style.display = 'none'
                wo_dates_suggestions = JSON.parse(sessionStorage.wo_dates_suggestions)
                parseFourthSection()
                parseFifthSection(wo_dates_suggestions)
                firstInfo.style.display = 'none'
                TimerProgress()
                window.step_index = 6
                sessionStorage.setItem('step_index', window.step_index)
                step.innerHTML = 5
                percentageActive.innerHTML = 100 + '%';
                percentageActive.style.width = 100 + '%';
                dateInfo.style.display = 'none'
            } else if(window.step_index == 7){
                firstInfo.style.display = 'none'
                if(window.company == undefined){
                    maxStep.innerHTML = 4
                    step.innerHTML = 4
                    percentageActive.innerHTML = 100 + '%';
                    percentageActive.style.width = 100 + '%';
                } else if(!window.company.device_amount || window.company.autocreate_wo_disallowed == 'due_dates_diff_exceed' || window.today_due_date == true){
                    maxStep.innerHTML = 4
                    step.innerHTML = 4
                    percentageActive.innerHTML = 100 + '%';
                    percentageActive.style.width = 100 + '%';
                }  else {
                    isRequestNotEmpty(data) ? requestNotEmpty(data) : requestEmpty()
                    if(firstFormData.type == 'commercial'){
                        parseThirdCommercialStep()
                    }
                    document.commercial_second_form.style.display = 'none'
                    document.residential_second_form.style.display = 'none'
                    messageSuccess.style.display = 'none'
                    extraNote.style.display = 'none'
                    parseFourthSection()
                    step.innerHTML = 5
                    percentageActive.innerHTML = 100 + '%';
                    percentageActive.style.width = 100 + '%';
                }
            }
        }
    })
}
localStorageData()