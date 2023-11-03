window.addEventListener('load',()=>{
    phoneChange()
    companyNameChange()
    fullnameEvents()
    cityChange()
    changeTimeOpenTimeClose()
    changeIrrigationDatesRadio()
    var newData,typeOfCompany,changeTime;
})
document.firstForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    hideHiddenCompanyFields()
})
// Radio phone functionality
function phoneChange (){
    let phoneInputs = document.getElementsByName('phone'),
        phoneDivs = document.querySelectorAll('.phone__div'),
        phoneLegends = document.querySelectorAll('.phone__legend');
        phoneInputs.forEach((input,index) => {
            function changeLegend(phoneDivs, phoneLegends, index, input) {
                phoneDivs.item(index).classList.remove('hide')
                phoneLegends.item(index).classList.remove('hide')
                phoneLegends.item(index).innerHTML = `IS ${input.value} YOUR MOBILE, HOME OR WORK NUMBER?*`
            }
            input.addEventListener('input', () => {
                changeLegend(phoneDivs, phoneLegends, index, input);
            })
            input.addEventListener('keyup', () => {
                changeLegend(phoneDivs, phoneLegends, index, input);
            })
        })
}
// Time open-close third step functionality
function companyNameChange (){
    let element = document.getElementsByName('company_name')[0],
        elementDivs = document.querySelector('.company_name__div'),
        elementDivsTimeOpen = document.querySelector('.company_name__div_time_open')
        elementDivsTimeClose = document.querySelector('.company_name__div_time_close')
        elementLegends = document.querySelector('.company_name__legend'),
        elementLegendsTimeOpen = document.querySelector('.company_name__legend__time_picker_open');
        elementLegendsTimeClose = document.querySelector('.company_name__legend__time_picker_close');

        function changeLegend(elementDivs, elementLegends, element, 
            elementLegendsTimeOpen, elementLegendsTimeClose, elementDivsTimeOpen, elementDivsTimeClose) {
            if (!element.value) {
                elementDivs.classList.add('hide')
                elementLegends.classList.add('hide')
                elementDivsTimeOpen.classList.add('hide')
                elementDivsTimeClose.classList.add('hide')
                elementLegendsTimeOpen.classList.add('hide')
                elementLegendsTimeClose.classList.add('hide')
            } else {
                elementDivs.classList.remove('hide')
                elementLegends.classList.remove('hide')
                elementDivsTimeOpen.classList.remove('hide')
                elementDivsTimeClose.classList.remove('hide')
                elementLegendsTimeOpen.classList.remove('hide')
                elementLegendsTimeClose.classList.remove('hide')
                elementLegends.innerHTML = `IS THE WORK AT ${element.value} TO BE PERFORMED SUBJECT TO PREVAILING WAGE?*`
                elementLegendsTimeOpen.innerHTML = `${element.value} OPENING TIME MONDAY - FRIDAY:*`
                elementLegendsTimeClose.innerHTML = `${element.value} CLOSING TIME MONDAY - FRIDAY:*`
            }
        }
        element.addEventListener('input', () => {
            changeLegend(elementDivs, elementLegends, element, 
                elementLegendsTimeOpen, elementLegendsTimeClose, elementDivsTimeOpen, elementDivsTimeClose);
        })
        element.addEventListener('keyup', () => {
            changeLegend(elementDivs, elementLegends, element, 
                elementLegendsTimeOpen, elementLegendsTimeClose, elementDivsTimeOpen, elementDivsTimeClose);
        })
}
function fullnameEvents (){
    let firstNameInputs = document.getElementsByName('first_name'),
        lastNameInputs = document.getElementsByName('second_name');
    firstNameInputs.forEach((elem,index)=>{
        elem.addEventListener('input',()=>{
            lastNameInputs[index].addEventListener('input',()=>{
                fullnameChange(elem,lastNameInputs[index],index)
            })
        })
    })
    lastNameInputs.forEach((elem,index)=>{
        elem.addEventListener('input',()=>{
            firstNameInputs[index].addEventListener('input',()=>{
                fullnameChange(firstNameInputs[index],elem,index)
            })
        })
    })
}
function fullnameChange (firstName,lastName,index){
    let divForInputs = document.querySelectorAll('.contact__updates'),
        legend = document.querySelector('.contact__text'),
        div = document.querySelector('.contact__updates-div'),
        mail = document.querySelector('.contact__mailing');
    if(window.editing == true || window.company == undefined || window.company.device_amount == 0){
        divForInputs.item(index).classList.remove('hide');
        if (index == 0){
            divForInputs.item(index).classList.remove('hide')
            if (divForInputs.item(index).style.display == 'none'){
                divForInputs.item(index).style.display = 'block'
            }
            legend.innerHTML = `WILL ${firstName.value} ${lastName.value} BE THE SITE CONTACT FOR THE SCHEDULING / UPDATES?*`
        } else {
            mail.classList.remove('hide')
            div.classList.remove('hide')
            mail.innerHTML = `WILL ${firstName.value} ${lastName.value} BE THE SITE CONTACT FOR THE SCHEDULING / UPDATES?*`;
        }
    }
}
// Transition to the commercial second step after validation
function commercialSecondStep(){
    let secondForm = document.commercial_second_form,
        alertNote = document.getElementById('alert_note'),
        loaderSecondForm = document.querySelector('#commercial_second_form .loader');
            window.step_index = 2
            sessionStorage.setItem('step_index', window.step_index)
            alertNote.style.display = 'block';
            saveChangeInputsCommercialSecondStep()
            secondForm.style.display='none'
            document.commercial_third_section.style.display='block';
            loaderSecondForm.classList.add('hide')
}
// Transition to the commercial third step after validation
function commercialThirdStep(){
    let thirdForm = document.commercial_third_section,
        alertNote = document.getElementById('alert_note'),
        loaderThirdForm = document.querySelector('#commercial_third_section .loader');

        loaderThirdForm.classList.add('hide')
        processingTimerStop = true
        if (window.company == undefined){
            saveChangeInputsCommercialThirdStep()
            thirdForm.style.display = 'none';
            document.comment_form.style.display = 'block'
            alertNote.style.display = 'none';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company == undefined && window.editing == true){
            saveChangeInputsCommercialThirdStep()
            thirdForm.style.display='none'
            document.comment_form.style.display='block';
            alertNote.style.display = 'none';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company != undefined && !window.company.device_amount){
            saveChangeInputsCommercialThirdStep()
            thirdForm.style.display='none'
            document.comment_form.style.display='block';
            alertNote.style.display = 'none';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company != undefined && window.company.autocreate_wo_disallowed == 'due_dates_diff_exceed'){
            saveChangeInputsCommercialThirdStep()
            thirdForm.style.display='none'
            document.comment_form.style.display='block';
            alertNote.style.display = 'none';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company != undefined && window.today_due_date == true){
            saveChangeInputsCommercialThirdStep()
            thirdForm.style.display='none'
            document.comment_form.style.display='block';
            alertNote.style.display = 'none';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        }
}
function contentForm(){
    let form = document.comment_form;
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        if (window.company == undefined && window.editing == false){
            let data = Object.fromEntries(new FormData(form).entries())
        }
    })
}
contentForm()
// Prev button event
function prevButton (){
    let prevBtns = document.querySelectorAll('[data-button^=prev]');
    prevBtns.forEach(elem =>{
        elem.addEventListener('click',()=>{
                window.previousStep()
                catchPreviousForm(elem)
                window.scrollToTop()
        })
    })
}
prevButton()
var commentPrevSendToken = false
// Method prev button
function catchPreviousForm(elem){
    let com_forms = [
            document.firstForm,
            document.commercial_second_form,
            document.commercial_third_section,
            document.comment_form
        ],
        res_forms = [
            document.firstForm,
            document.residential_second_form,
            document.residential_third_section,
            document.comment_form
        ],
        com_formsWithCompany = [
            document.firstForm,
            document.commercial_second_form,
            document.commercial_third_section,
            document.fourthForm,
            document.fifth_form,
            document.wo_info,
            document.second_comment_form,
            document.comment_form
        ],
        res_formsWithCompany = [
            document.firstForm,
            document.residential_second_form,
            document.residential_third_section,
            document.fourthForm,
            document.fifth_form,
            document.wo_info,
            document.second_comment_form,
            document.comment_form
        ],
        dateInfo = document.getElementById('date_info'),
        createdInfo = document.getElementById('created_info'),
        createdOrderInfo = document.getElementById('created_order_info'),
        messageManyDevices = document.querySelector('.massage__error__many_devices'),
        messageDueDateFalls = document.querySelector('.massage__error__due_date_falls'),
        messageServerBusy = document.querySelector('.massage__error__server_busy'),
        messageError = document.querySelector('.massage__error__no_date'),
        suggestions = document.querySelector('.suggestions'),
        firstInfo = document.getElementById('first_info'),
        percentageActive = document.querySelector('.form_progress .progress__active'),
        massageOperationalHours = document.querySelector('.massage__error__operational_hours'),
        massage__error__wo_exists_in_past = document.querySelector('.massage__error__wo_exists_in_past'),
        step = document.getElementById('step'),
        checkboxOrder = document.getElementById('checkbox_order_info'),
        noFit = document.getElementById('no_fit'),
        createWO = document.getElementById('submit_wo_info_section'),
        maxStep = document.getElementById('max_step'),
        index;

    if (firstFormData.type == 'commercial' && window.company == undefined){
        index = com_forms.indexOf(elem.closest('form'))
        com_forms[index].style.display = 'none'
        com_forms[index-1].style.display = 'block'
        window.step_index-= 5
        sessionStorage.setItem('step_index', window.step_index)
    } else if (firstFormData.type == 'residential' && window.company == undefined) {
        index = res_forms.indexOf(elem.closest('form'))
        res_forms[index].style.display = 'none'
        res_forms[index-1].style.display = 'block'
        window.step_index-= 5
        sessionStorage.setItem('step_index', window.step_index)
    }
    if (firstFormData.type == 'commercial' && window.company != undefined){
        index = com_formsWithCompany.indexOf(elem.closest('form'))
        if((window.wo_dates_suggestions == undefined || statusRequestFalse == true || window.wodates == false || !window.company.device_amount || window.today_due_date == true || window.company.autocreate_wo_disallowed == 'due_dates_diff_exceed' || window.editing == true || inputRangeHours < 0)  && index == 7){
            com_formsWithCompany[index].style.display = 'none'
            com_formsWithCompany[index-5].style.display = 'block'
            window.step_index -= 5
            sessionStorage.setItem('step_index', window.step_index)
            window.ready_suggestions = false
            statusRequestFalse = false
            processingTimerStop = true
            massageOperationalHours.style.display = 'none'
            messageError.style.display = 'none'
            messageManyDevices.style.display = 'none'
            messageDueDateFalls.style.display = 'none'
            messageServerBusy.style.display = 'none'
            step.innerHTML = 3
            percentageActive.style.width = 60 + '%';
            percentageActive.innerHTML = '60%';
        } else {
            if(index != 6 && window.company.wo_appointed_date == undefined){
                com_formsWithCompany[index].style.display = 'none'
                com_formsWithCompany[index-1].style.display = 'block'
                window.step_index--
                sessionStorage.setItem('step_index', window.step_index)
            } else if(window.company.wo_appointed_date == undefined){
                com_formsWithCompany[index].style.display = 'none'
                com_formsWithCompany[index-2].style.display = 'block'
                window.step_index-= 2
                sessionStorage.setItem('step_index', window.step_index)
                suggestions.innerHTML = ''
                commentPrevSendToken = true
                dateInfo.style.display = 'block'
                if(notDubleTimer == true){
                    document.getElementById('loader_fifth').classList.remove('hide')
                    sendToken()
                    commentPrevSendToken = false
                    window.stopTimer = false
                    TimerProgress()
                }
            }
        }
    } else if (firstFormData.type == 'residential' && window.company != undefined) {
        index = res_formsWithCompany.indexOf(elem.closest('form'))
        if((window.wo_dates_suggestions == undefined || statusRequestFalse == true || window.wodates == false || !window.company.device_amount || window.today_due_date == true || window.company.autocreate_wo_disallowed == 'due_dates_diff_exceed' || window.editing == true || inputRangeHours < 0) && index == 7){
            res_formsWithCompany[index].style.display = 'none'
            res_formsWithCompany[index-5].style.display = 'block'
            window.step_index -= 5
            sessionStorage.setItem('step_index', window.step_index)
            window.ready_suggestions = false
            statusRequestFalse = false
            processingTimerStop = true
            massageOperationalHours.style.display = 'none'
            messageError.style.display = 'none'
            messageManyDevices.style.display = 'none'
            messageDueDateFalls.style.display = 'none'
            messageServerBusy.style.display = 'none'
            step.innerHTML = 3
            percentageActive.style.width = 60 + '%';
            percentageActive.innerHTML = '60%';
        } else {
            if(index != 6 && window.company.wo_appointed_date == undefined){
                res_formsWithCompany[index].style.display = 'none'
                res_formsWithCompany[index-1].style.display = 'block'
                window.step_index--
                sessionStorage.setItem('step_index', window.step_index)
            } else if(window.company.wo_appointed_date == undefined){
                res_formsWithCompany[index].style.display = 'none'
                res_formsWithCompany[index-2].style.display = 'block'
                window.step_index -= 2
                sessionStorage.setItem('step_index', window.step_index)
                suggestions.innerHTML = ''
                commentPrevSendToken = true
                dateInfo.style.display = 'block'
                if(notDubleTimer == true){
                    sendToken()
                    commentPrevSendToken = false
                    window.stopTimer = false
                    TimerProgress()
                }
            }
        }
    }
    if(firstFormData.type == 'commercial' && window.company != undefined) {
        if(window.company.wo_appointed_date != undefined){
            com_formsWithCompany[5].style.display = 'none'
            com_formsWithCompany[0].style.display = 'block'
            window.step_index = 0
            sessionStorage.setItem('step_index', window.step_index)
            noFit.style.display = 'block'
            createdInfo.style.display = 'none'
            createdOrderInfo.style.display = 'none'
            createWO.style.display = 'block'
            dateInfo.style.display = 'none'
            checkboxOrder.style.display = 'block'
            massage__error__wo_exists_in_past.style.display = 'none'
            firstInfo.style.display = 'block'
            maxStep.innerHTML = 4
            step.innerHTML = 1
            percentageActive.style.width = 25 + '%';
            percentageActive.innerHTML = '25%';
        }
    }
    if(firstFormData.type == 'residential' && window.company != undefined) {
        if(window.company.wo_appointed_date != undefined){
            res_formsWithCompany[5].style.display = 'none'
            res_formsWithCompany[0].style.display = 'block'
            window.step_index = 0
            sessionStorage.setItem('step_index', window.step_index)
            createdInfo.style.display = 'none'
            createdOrderInfo.style.display = 'none'
            checkboxOrder.style.display = 'block'
            noFit.style.display = 'block'
            createWO.style.display = 'block'
            massage__error__wo_exists_in_past.style.display = 'none'
            dateInfo.style.display = 'none'
            firstInfo.style.display = 'block'
            maxStep.innerHTML = 4
            step.innerHTML = 1
            percentageActive.style.width = 25 + '%';
            percentageActive.innerHTML = '25%';
        }
    }
}
// Transition to the residential second step after validation
function residentialSecondStep (){
    let form = document.residential_second_form,
        alertNote = document.getElementById('alert_note'),
        loaderSecondForm = document.querySelector('#residential_second_form .loader');
    loaderSecondForm.classList.add('hide')
        if (window.company == undefined){
            window.step_index = 2
            sessionStorage.setItem('step_index', window.step_index)
            saveChangeInputsResidentialSecondStep()
            form.style.display='none'
            document.residential_third_section.style.display='block';
            alertNote.style.display = 'block';
        }
}
// Method radio mailing script
function contactScheduling(){
    let firstName = document.getElementsByName('first_name')[1],
        lastName = document.getElementsByName('second_name')[1],
        legendText = document.getElementById('contact__mailing');
    firstName.addEventListener('input',()=>{
        lastName.addEventListener('input',()=>{
            legendText.innerHTML = `WILL ${firstName.value} ${lastName.value} BE THE CONTACT FOR SCHEDULING / UPDATES?*`
        })
    })
    lastName.addEventListener('input',()=>{
        firstName.addEventListener('input',()=>{
            legendText.innerHTML = `WILL ${firstName.value} ${lastName.value} BE THE CONTACT FOR SCHEDULING / UPDATES?*`
        })
    })
}
// Transition to the residential third step after validation
function submitThirdStep(){
    let form = document.residential_third_section,
        alertNote = document.getElementById('alert_note'),
        loaderForm = document.querySelector('#residential_third_section .loader');
        loaderForm.classList.add('hide')
        alertNote.style.display = 'none';
        processingTimerStop = true
        if (window.company == undefined && (window.editing == undefined || window.editing == false)){
            form.style.display='none'
            document.comment_form.style.display='block';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company == undefined && window.editing == true){
            form.style.display='none'
            document.comment_form.style.display='block';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company != undefined && !window.company.device_amount){
            form.style.display='none'
            document.comment_form.style.display='block';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company != undefined && (window.company.autocreate_wo_disallowed == 'due_dates_diff_exceed')){
            form.style.display='none'
            document.comment_form.style.display='block';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        } else if (window.company != undefined && window.today_due_date == true){
            form.style.display='none'
            document.comment_form.style.display='block';
            window.step_index = 7
            sessionStorage.setItem('step_index', window.step_index)
            window.stopTimer = true
        }
}
// Reset irrigation date when changing radio inputs
function changeIrrigationDatesRadio(){
    let checkDatesFirstLvl = document.querySelectorAll(`[data-radio^=sprinklers_type]`),
        checkDatesFirstLvlCommercial = document.querySelectorAll(`[data-radio^=sprinklers_radio]`),
        checkDatesSecondLvl = document.querySelectorAll(`[data-radio^=inside_radio]`),
        checkDatesSecondLvlCommmercial = document.querySelectorAll(`[data-radio^=inside_radio_dates]`);

    checkDatesFirstLvl.forEach((elem,index) =>{
        elem.addEventListener('change', ()=>{
            if(index != 0 && elem.checked) {
                document.residential_third_section.turned_on.value = ''
            }
        })
    }) 
    checkDatesSecondLvl.forEach((elem,index) =>{
        elem.addEventListener('change', ()=>{
            if(index != 1 && elem.checked) {
                document.residential_third_section.turned_on.value = ''
            }
        })
    })
    checkDatesFirstLvlCommercial.forEach((elem,index) =>{
        elem.addEventListener('change', ()=>{
            if(index != 0 && elem.checked) {
                document.commercial_third_section.turned_on.value = ''
            }
        })
    }) 
    checkDatesSecondLvlCommmercial.forEach((elem,index) =>{
        elem.addEventListener('change', ()=>{
            if(index != 1 && elem.checked) {
                document.commercial_third_section.turned_on.value = ''
            }
        })
    })
}
changeTime = false;
// When changing the default time, write in a comment
function changeTimeOpenTimeClose(){
    document.commercial_third_section.input_open_hours.addEventListener('input',()=>{
        window.changeTime = true
    })
    document.commercial_third_section.input_open_minutes.addEventListener('input',()=>{
        window.changeTime = true
    })
    document.commercial_third_section.input_open_times_of_day.addEventListener('change',()=>{
        window.changeTime = true
    })
    document.commercial_third_section.input_close_hours.addEventListener('input',()=>{
        window.changeTime = true
    })
    document.commercial_third_section.input_close_minutes.addEventListener('input',()=>{
        window.changeTime = true
    })
    document.commercial_third_section.input_close_times_of_day.addEventListener('change',()=>{
        window.changeTime = true
    })
}
// Request for a comment to the manager
function commentSubmitFunction(){
        let newData,
            openBlock = document.querySelector('.input-open'),
            closeBlock = document.querySelector('.input-close'),

            inputClose = '',
            inputOpen = '';

            document.commercial_third_section.operational_time_open_hours.value = ''
            document.commercial_third_section.operational_time_open_minutes.value = ''
            document.commercial_third_section.operational_time_close_hours.value = ''
            document.commercial_third_section.operational_time_close_minutes.value = ''
            if(document.commercial_third_section.access_site.value == 'site_contacts'){
                document.commercial_third_section.access_site.forEach(el =>{
                    el.value = ''
                })
            }

            inputOpen = document.commercial_third_section.input_open_hours.value + ':' + 
            document.commercial_third_section.input_open_minutes.value + ' ' + 
            document.commercial_third_section.input_open_times_of_day.value;

            inputClose = document.commercial_third_section.input_close_hours.value + ':' + 
            document.commercial_third_section.input_close_minutes.value + ' ' + 
            document.commercial_third_section.input_close_times_of_day.value;

            openBlock.innerHTML =`<input class="hide" type="text" id='input_open'
               name="input_open" value="${inputOpen}">
               <label for='input_open'></label>`
            closeBlock.innerHTML =`<input class="hide" type="text" id='input_close'
               name="input_close" value="${inputClose}">
               <label for='input_close'></label>`
            if(window.changeTime == false){
                openBlock.innerHTML = ``
                closeBlock.innerHTML = ``
            }
        let submitComment = document.getElementById('submit_comment'),
            loaderComment = document.getElementById('loader_comment'),
        com_forms = [
            document.firstForm,
            document.commercial_second_form,
            document.commercial_third_section,
            document.comment_form
        ],
        res_forms = [
            document.firstForm,
            document.residential_second_form,
            document.residential_third_section,
            document.comment_form
        ];
        if (firstFormData.type == 'commercial'){
            com_forms.forEach(el => {
                window.ableInputs(el)
                newData = {...newData,...Object.fromEntries(new FormData(el).entries())}
            })
        } else if (firstFormData.type == 'residential'){
            res_forms.forEach(el => {
                window.ableInputs(el)
                newData = {...newData,...Object.fromEntries(new FormData(el).entries())}
            })
        }
        submitComment.disabled = true
        loaderComment.classList.remove('hide')
        if(!newData.phone){
            newData.phone = ''
            newData.phone_type = ''
            newData.other = ''
        }
        if(newData.lawn == 'not_sure'){
            newData.lawn = 'not sure'
        }
        if(newData.device_location == 'not_sure'){
            newData.lawn = 'not sure'
        }
        if(firstFormData.type == 'commercial') {
            newData.operational_time = operationalTime
        }
        let formData = {
            action : 'mailer',
            nonce: mainVars.nonce,
            dataForms: JSON.stringify(newData)
        };
        formData = getFormData(formData);


        fetch( mainVars.ajax_url, {
            method: 'POST',
            body: formData,
        } )
            .then( res => res.text() )
            .then( data => window.successDiv(JSON.parse(data)))
            .catch( err => console.log( err) );
}
// Method that shows specific messages about data found
function openMessageBox (param){
    let box = document.querySelector('.message__box'),
        message__success = document.querySelector('.message__success'),
        extraNote = document.querySelector('.extra_note'),
        massage__error = document.querySelector('.massage__error'),
        massage__error__due_dates_diff_exceed = document.querySelector('.massage__error__due_dates_diff_exceed'),
        massage__error__wo_exists_in_past = document.querySelector('.massage__error__wo_exists_in_past'),
        massage__error__due_date_expired = document.querySelector('.massage__error__due_date_expired'),
        massage__error__no_devices = document.querySelector('.massage__error__no_devices');
        box.style.display = 'block'
    if (param == true){
        message__success.style.display = 'block';
        extraNote.style.display = 'block';
        document.getElementById('help_email_com').classList.add('hide')
        document.getElementById('help_email_res').classList.add('hide')
    } else if(window.company != undefined){
        if(window.today_due_date == true){
            massage__error__due_date_expired.style.display = 'block'
        } else if(company.device_amount == 0){
            massage__error__no_devices.style.display = 'block'
        } else if(window.company.autocreate_wo_disallowed == 'due_dates_diff_exceed'){
            massage__error__due_dates_diff_exceed.style.display = 'block'
        } else if(window.company.autocreate_wo_disallowed == 'wo_exists_in_past'){
            massage__error__wo_exists_in_past.style.display = 'block'
        } else if(company.wo_appointed_date == undefined){
            massage__error.style.display = 'block'
        }
    } else {
        massage__error.style.display = 'block'
    }
}
// Method that hide specific messages about data found
function closeMassageBox(){
    let box = document.querySelector('.message__box'),
        extraNote = document.querySelector('.extra_note'),
        message__success = document.querySelector('.message__success');

        box.style.display = 'none'
        message__success.style.display = 'none'
        extraNote.style.display = 'none'
}
// Message success create order
function openSuccessMassageAfterApi(){
    let successBlock = document.querySelector('.success');

    if(woAppointedDateEarly == false){
        successBlock.innerHTML =`<h2>Work Order was successfully submitted:<br><h3 class="red_date_title">WO #${resultDataEarly.wo_number}</h3><h3 class="red_date_title">${window.select_date}.<br> Total fee: $${window.company.fees.total_fee}</h3></h2>`
    } else {
        successBlock.innerHTML =`<h2>The work order was successfully submitted earlier:<br><h3 class="red_date_title">WO #${resultDataEarly.wo_number}</h3><h3 class="red_date_title">${resultDataEarly.wo_appointed_date}.<br> Total fee: $${resultDataEarly.fees.total_fee}</h3></h2>`
    }
    successBlock.innerHTML= successBlock.innerHTML+ '<br><h2>Please check your email for details.</h2>'
    successBlock.innerHTML= successBlock.innerHTML+ '<br><h2>Thank you for your Business and have a nice day!</h2>'
    successBlock.innerHTML= successBlock.innerHTML+ '<h2>The Municipal Backflow Team</h2>'
    successBlock.style.display = 'block';
}
function openEditingFilds (){
    let secondComForm = document.commercial_second_form,
        secondResForm = document.residential_second_form,
        thirdResForm = document.residential_third_section;
    var event = new Event('input');
    // Dispatch it.
    secondComForm.phone.dispatchEvent(event);
    secondComForm.first_name.dispatchEvent(event);
    secondComForm.second_name.dispatchEvent(event);
    secondResForm.phone.dispatchEvent(event);
    secondResForm.first_name.dispatchEvent(event);
    secondResForm.second_name.dispatchEvent(event);
    document.getElementsByName('company_name')[0].dispatchEvent(event)
}
// Separating scripts to mark steps
function quantitySteps(editing){
    let percentageActive = document.querySelector('.form_progress .progress__active'),
        percentageInactive = document.querySelector('.form_progress .progress__inactive'),
        step = document.getElementById('step'),
        maxStep = document.getElementById('max_step');

        step.innerHTML = 2

        if (window.company != undefined && window.company.device_amount > 0 && window.company.autocreate_wo_disallowed != 'due_dates_diff_exceed' && window.today_due_date == false){
            maxStep.innerHTML = 5
            sessionStorage.setItem('maxStep', maxStep.innerHTML)
            percentageActive.style.width = 40 + '%';
            percentageActive.innerHTML = '40%';
            percentageInactive.style.width = 60 + '%';
        } else if (window.company == undefined || editing == true){
            maxStep.innerHTML = 4
            sessionStorage.setItem('maxStep', maxStep.innerHTML)
            percentageActive.style.width = 50 + '%';
            percentageActive.innerHTML = '50%';
            percentageInactive.style.width = 50 + '%';
        }

}
// Event next step
function NextStep(){
       let  step = document.getElementById('step');
       maxStep = document.getElementById('max_step');
       if (step.innerHTML < maxStep.innerHTML) {
           step.innerHTML = parseInt(step.innerHTML) + 1;
           sessionStorage.setItem('step', step.innerHTML)
           calcWidth()
       }
}
// Functional prev step
function previousStep(){
    let step = document.getElementById('step'),
        box = document.querySelector('.message__box'),
        errorLabel = document.querySelectorAll('label.error'),
        errorInput = document.querySelectorAll('input.error'),
        firstInfo = document.getElementById('first_info'),
        alertNote = document.getElementById('alert_note'),
        devicesNote = document.getElementById('devices_note'),
        dateInfo = document.getElementById('date_info'),
        message__success = document.querySelector('.message__success'),
        extraNote = document.querySelector('.extra_note'),
        massage__error = document.querySelector('.massage__error'),
        hide_block = document.querySelector('.hide_outside'),
        inside_loc_div = document.querySelector(`[data-group^=inside_loc_div`),
        inside_location = document.querySelector(`[data-group^=inside_location`),
        sprinklers_radio_group = document.querySelector(`[data-group^=sprinklers_radio_group`),
        date__legend = document.querySelector('.date__legend'),
        hide__block = document.querySelector('.hide__outside'),
        date_legend = document.querySelector('.date_legend'),
        checkboxOrder = document.getElementById('checkbox_order_info'),
        timer = document.getElementById('date_timer'),
        get_new_dates = document.getElementById('get_new_dates'),
        suggestions = document.querySelector('.suggestions'),
        formTimer = document.querySelector('.form_timer'),
        massage__error__due_date_expired = document.querySelector('.massage__error__due_date_expired'),
        massage__error__due_dates_diff_exceed = document.querySelector('.massage__error__due_dates_diff_exceed'),
        massage__error__no_devices = document.querySelector('.massage__error__no_devices');
    if(document.second_comment_form.style.display == 'none' && document.wo_info.style.display == 'none'){
        step.innerHTML = parseInt(step.innerHTML) - 1;
        errorLabel.forEach((elem)=>{
            elem.style.display = 'none'
        })
        errorInput.forEach((elem)=>{
            elem.style.border = '1px solid #2880BA'
        })
        calcWidth()
        if(step.innerHTML == 2){
            get_new_dates.style.display = 'none'
            alertNote.style.display = 'none'
        }
        if (step.innerHTML == 3) {
            alertNote.style.display = 'block'
            devicesNote.style.display = 'none'
            window.ready_suggestions = false
        } else if(step.innerHTML == 1) {
            firstInfo.style.display = 'block'
            box.style.display = 'none'
            massage__error__due_date_expired.style.display = 'none'
            document.getElementById('help_email_com').classList.remove('hide')
            document.getElementById('help_email_res').classList.remove('hide')
            suggestions.innerHTML = ''
            window.editing = false
            window.stopDateTimer = true
            window.stopTimer = true
            formTimer.style.display = 'none'
            checkboxOrder.style.display = 'block'
            sessionStorage.setItem('editing', editing)
            window.today_due_date = false
            message__success.style.display = 'none'
            extraNote.style.display = 'none'
            massage__error.style.display = 'none'
            massage__error__no_devices.style.display = 'none'
            massage__error__due_dates_diff_exceed.style.display = 'none'
            hide_block.style.display = 'block'
            hide__block.style.display = 'block'
            reloadPage = false
            remainingTimeAfterReload = 0
            inside_loc_div.classList.add('hide')
            inside_location.classList.add('hide')
            document.commercial_third_section.lawn.forEach(elem =>{
                elem.disabled = false
            })   
            document.commercial_third_section.device_location.forEach(elem =>{
                elem.disabled = false
            })
            document.residential_third_section.lawn.forEach(elem =>{
                elem.disabled = false
            })   
            document.residential_third_section.device_location.forEach(elem =>{
                elem.disabled = false
            })     
            sprinklers_radio_group.classList.add('hide')
            date__legend.innerHTML = `PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*`
            date_legend.innerHTML = `PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*`
        }
        if(step.innerHTML == 4){
            dateInfo.style.display = 'none'
            checkChangeInputDates = false
            window.first_time = false
            wodatesEarly = false
            window.changeOperationalTime = false
            sessionStorage.setItem('first_time', window.first_time)
            if(notDubleTimer == false){
                window.stopDateTimer = false
            }
            window.onTimer = false
            window.validationCheck = undefined
        }
    }

}
// Calculation script steps
function calcWidth(){
    let percentageActive = document.querySelector('.form_progress .progress__active'),
        percentageInactive = document.querySelector('.form_progress .progress__inactive'),
        step = document.getElementById('step'),
        stepIndex = parseInt(step.innerHTML),
        maxStep = parseInt(document.getElementById('max_step').innerHTML);
        // console.log('maxStep/stepIndex',100/maxStep * stepIndex,' maxStep:',maxStep,' stepIndex: ',stepIndex)
        percentageActive.innerHTML = 100/maxStep * stepIndex + '%';
        percentageActive.style.width = 100/maxStep * stepIndex + '%';
        percentageInactive.style.width = 100 - (100/maxStep * stepIndex) + '%';
        if (100/maxStep * stepIndex > 50){
            percentageActive.classList.add('text-center')
        } else {
            percentageActive.classList.add('text-right')
        }
}
// The method on each step sends the user to the top of the page
function scrollToTop(){
    let elem = document.querySelector('.scroll_top');
    
    $('html, body').animate({
        scrollTop: $(elem).height()
    }, 500);
}
// Close loader spinner
function closeSpinner(a){
    a.classList.add('hide')
}
// Open loader spinner
function openSpinner(a){
    a.classList.remove('hide')
}
// If the city is Chicago, then a new functionality appears
function cityChange(){
    let city = document.getElementById('city');

    city.addEventListener('change', () => {
        if (window.company != undefined && window.company.device_amount > 0){
            window.showLegend(city);
        } else {
            window.showLegendWithNoData(city);
        }
    })
    
    city.addEventListener('keyup', () => {
        if (window.company != undefined && window.company.device_amount > 0){
            window.showLegend(city);
        } else {
            window.showLegendWithNoData(city);
        }
    })
}
// If the city is Chicago, then a new functionality appears(add method)
function showLegend(input) {
    let legend = document.getElementById('chicago_location'),
        location_comment = document.getElementById('location_comment'),
        cityText = 'Chicago';
    if (cityText.toUpperCase() == input.value.toUpperCase()) {
        legend.classList.remove('hide')
    } else {
        legend.classList.add('hide')
        location_comment.value = ''
    }
}
// If the city is Chicago, then a new functionality appears(add method)
function showLegendWithNoData(input) {
    let legend = document.getElementById('chicago_location_with_no_data')
        location_comment = document.getElementById('location_comment_with_no_data'),
        cityText = 'Chicago';
    if (cityText.toUpperCase() == input.value.toUpperCase()) {
        legend.classList.remove('hide')
    } else {
        legend.classList.add('hide')
        location_comment.value = ''
    }
}