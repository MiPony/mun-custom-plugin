<?php
use \wo_schedule\inc\REGISTRY;
?>
<form id="commercial_third_section" name="commercial_third_section" style="display:none">
    <legend>COMPANY OR BUSINESS NAME:*</legend>
    <div class="edit_box">
        <input type="text" required name='company_name'>
    </div>
    <div class="hide-if-success">
        <legend class="company_name__legend hide">IS THE WORK AT TEST TO BE PERFORMED SUBJECT TO PREVAILING WAGE?*</legend>
        <div class="radio__wrapper company_name__div hide">
            <div class="edit_box">
                <input type="radio" id="wageChoice1" name="wage" value="yes" />
                <label for="wageChoice1">yes</label>
            </div>
            <div class="edit_box">
                <input type="radio" id="wageChoice2" name="wage" value="no" checked="checked" />
                <label for="wageChoice2">no</label>
            </div>
            <div class="business_faq">
                <div class="business_faq__description">See FAQ link below for information on prevailing wage.</div>
                <div class="business_faq__link">
                    <a href="https://www2.illinois.gov/idol/FAQs/Pages/prevailing-wage-faq.aspx#qst3" target="_blank">
                        <span class="business_faq__link-button-content-wrapper">
                            <span class="business_faq__link-button-icon">
                                <i aria-hidden="true" class="fas fa-link"></i>
                            </span>
                            <span class="business_faq__link-button-text">Prevailing Wage Act FAQ</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <legend>
        SITE ADDRESS OF BACKFLOW ASSEMBLY / DEVICE(S) FOR TESTING:*
    </legend>
    <div class="edit_box">
        <input class='full-width' type="text" name="address">
    </div>
    <p>STREET ADDRESS</p>
    <div class="edit_box">
        <input type="text" class='full-width' name="address_line">
    </div>
    <p>ADDRESS LINE 2</p>
    <div>
        <div class="two-in-row">
            <div class="edit_box">
                <input type="text" name="city" id="city">
                <p>CITY</p>
            </div>
            <div class="edit_box">
                <select name="state" id="state">
                    <?php  foreach (REGISTRY::STATES as $key => $value):
                        if ($key == 'IL'):?>
                            <option value="<?php echo $key ?>" selected><?php echo $value ?></option>
                        <?php else: ?>
                            <option value="<?php echo $key ?>"><?php  echo $value ?></option>
                        <?php endif;
                    endforeach; ?>
                </select>
                <p>STATE</p>
            </div>
        </div>
        <div class="edit_box">
            <input type="text" name="zip">
        </div>
        <p>ZIP CODE</p>
    </div>
    <div class="hidden-company__fields hide">
        <legend>
            IS THE MAILING AND BILLING ADDRESS THE SAME AS THE SITE ADDRESS ENTERED ABOVE?*
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" id="addressChoice1"
                    data-radio="mailing_billing_c"
                    name="mailing_billing" value="yes">
                <label for="addressChoice1">yes</label>
            </div>
            <div>
                <input type="radio" id="addressChoice2"
                    data-radio="mailing_billing_c"
                    name="mailing_billing" value="no">
                <label for="addressChoice2">no</label>
            </div>
        </div>
    </div>
    <div class="hide-if-success hidden-company__fields hide">
        <legend>
            DO YOU USE A THIRD PARTY BILLING COMPANY?*
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio"
                       data-radio="third_party"
                       id="thirdPartyChoice1"
                       name="third_party" value="yes">
                <label for="thirdPartyChoice1">yes</label>
            </div>
            <div>
                <input type="radio"
                       data-radio="third_party"
                       id="thirdPartyChoice2"
                       name="third_party" value="no">
                <label for="thirdPartyChoice2">no</label>
            </div>
           <div>
               <div class="third_party hide" data-group="third_party">
                   <legend>PLEASE PROVIDE THE NAME OF THE BILLING COMPANY USED. *</legend>
                   <input type="text" data-el="third_party" name="third_party_name">
               </div>
           </div>
           <p>Example: Vendor Cafe or Real Page</p>
        </div>
    </div>
    <div class="hide-if-success">
        <legend class="company_name__legend__time_picker_open hide">
            TEST OPENING TIME MONDAY - FRIDAY:*
        </legend>
        <div class="flex__row company_name__div_time_open hide">
            <div class="edit_box">
                <input class="time__input" id="input_open_hours" maxlength="2" placeholder="HH" aria-required="true" type="text">
                <label for="input_open_hours"></label>
            </div>
            <div class="time__colon">:</div>
            <div class="edit_box">
                <input class="time__input" id="input_open_minutes" maxlength="2" placeholder="MM" aria-required="true" type="text">
                <label for="input_open_minutes"></label>
            </div>
            <div class="edit_box">
                <select class="time__select" aria-label="AM/PM" id="input_open_times_of_day">
                    <option value="am" selected="selected">AM</option>
                    <option value="pm">PM</option>
                </select>
            </div>
            <div class="input-open">
            </div>
        </div>
    </div>
    <div class="time__picker hide-if-success">
        <legend class="company_name__legend__time_picker_close hide">
            TEST CLOSING TIME MONDAY - FRIDAY:*
        </legend>
        <div class="flex__row company_name__div_time_close hide">
            <div class="edit_box">
                <input class="time__input" id="input_close_hours" maxlength="2" placeholder="HH" aria-required="true" type="text">
                <label for="input_close_hours"></label>
            </div>
            <div class="time__colon">:</div>
            <div class="edit_box">
                <input class="time__input" id="input_close_minutes" maxlength="2" placeholder="MM" aria-required="true" type="text">
                <label for="input_close_minutes"></label>
            </div>
            <div class="edit_box">
                <select class="time__select" id="input_close_times_of_day" aria-label="AM/PM">
                    <option value="am">AM</option>
                    <option value="pm" selected="selected">PM</option>
                </select>
            </div>
            <div class="input-close">
            </div>
        </div>
    </div>
    <div class="operational_time hide">
        <legend>
            OPERATIONAL HOURS:*
        </legend>
        <div class="flex__row company_name__operational_open">
            <div>
                <input class="time__input" id="operational_open_hours" name="operational_time_open_hours" maxlength="2" placeholder="HH" aria-required="true" type="text">
                <label for="operational_open_hours"></label>
            </div>
            <div class="time__colon">:</div>
            <div>
                <input class="otime__input" id="operational_open_minutes" name="operational_time_open_minutes" maxlength="2" placeholder="MM" aria-required="true" type="text">
                <label for="operational_open_minutes"></label>
            </div>
            <div>
                <select class="time__select" name="operational_time" aria-label="AM/PM" id="operational_open_times_of_day">
                    <option value="am" selected="selected">AM</option>
                    <option value="pm">PM</option>
                </select>
            </div>
            <div class="operational_input-open">
            </div>
        </div>
        <div class="flex__row company_name__div_operational_close">
            <div>
                <input class="time__input" id="operational_close_hours" name="operational_time_close_hours" maxlength="2" placeholder="HH" aria-required="true" type="text">
                <label for="operational_close_hours"></label>
            </div>
            <div class="time__colon">:</div>
            <div>
                <input class="otime__input" id="operational_close_minutes" name="operational_time_close_minutes" maxlength="2" placeholder="MM" aria-required="true" type="text">
                <label for="operational_close_minutes"></label>
            </div>
            <div>
                <select class="time__select" id="operational_close_times_of_day" name="operational_time" aria-label="AM/PM">
                    <option value="am">AM</option>
                    <option value="pm" selected="selected">PM</option>
                </select>
            </div>
            <div class="operational_input-close">
            </div>
        </div>
    </div>
        <legend>
            THE SITE ADDRESS IS: *
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" id="adressTypeChoice1"
                       data-radio="adress_is"
                       name="adress_type" value="owner">
                <label for="adressTypeChoice1">OWNER OCCUPIED</label>
            </div>
            <div>
                <input type="radio" id="adressTypeChoice2"
                       data-radio="adress_is"
                       name="adress_type" value="rental">
                <label for="adressTypeChoice2">A RENTAL</label>
            </div>
            <div>
                <input type="radio" id="adressTypeChoice3"
                       data-radio="adress_is"
                       name="adress_type" value="vacant">
                <label for="adressTypeChoice3">VACANT</label>
            </div>
        </div>
    <div class="mailing_billing_c hide" data-group="mailing_billing_c">
        <div class="billing">
            <legend>
                BILLING ATTENTION TO:*
            </legend>

            <input type="text" data-el="mailing_billing_c" name="billing_attention">
            <p>ATTENTION: BOB SMITH: COMPANY OR BUSINESS NAME</p>
            <input type="text" class="full-width" data-el="mailing_billing_c" name="billing_address">
            <p>STREET ADDRESS</p>
            <input type="text" class="full-width" name="billing_address_line">
            <p>ADDRESS LINE 2</p>
            <div>
                <div class="two-in-row">
                    <div>
                        <input type="text" data-el="mailing_billing_c" name="billing_city">
                        <p>CITY</p>
                    </div>
                    <div>
                        <select name="billing_state" data-el="mailing_billing_c" id="state">
                            <?php  foreach (REGISTRY::STATES as $key => $value):
                                if ($key == 'IL'):?>
                                    <option value="<?php echo $key ?>" selected><?php echo $value ?></option>
                                <?php else: ?>
                                    <option value="<?php echo $key ?>"><?php  echo $value ?></option>
                                <?php endif;
                            endforeach; ?>
                        </select>
                        <p>STATE</p>
                    </div>
                </div>

                <input type="text" data-el="mailing_billing_c" name="billing_zip">
                <p>ZIP CODE</p>
            </div>
        </div>
        <div class="mailing">
            <legend>
                MAILING ATTENTION TO:*
            </legend>

            <input type="text" name="mailing_attention" data-el="mailing_billing_c">
            <p>ATTENTION: BOB SMITH: COMPANY OR BUSINESS NAME</p>
            <input type="text" class="full-width" name="mailing_address" data-el="mailing_billing_c">
            <p>STREET ADDRESS</p>
            <input type="text" class="full-width" name="mailing_address_line">
            <p>ADDRESS LINE 2</p>
            <div>
                <div class="two-in-row">
                    <div>
                        <input type="text" name="mailing_city" data-el="mailing_billing_c">
                        <p>CITY</p>
                    </div>
                    <div>
                        <select name="mailing_state" id="state" data-el="mailing_billing_c">
                            <?php  foreach (REGISTRY::STATES as $key => $value):
                                if ($key == 'IL'):?>
                                    <option value="<?php echo $key ?>" selected><?php echo $value ?></option>
                                <?php else: ?>
                                    <option value="<?php echo $key ?>"><?php  echo $value ?></option>
                                <?php endif;
                            endforeach; ?>
                        </select>
                        <p>STATE</p>
                    </div>
                </div>
                <input type="text" name="mailing_zip" data-el="mailing_billing_c">
                <p>ZIP CODE</p>
            </div>
        </div>
    </div>
    <div data-group="rental" class="hide-if-success hide">
        <div class="">
            <legend>RENTAL TENANT NAME:*</legend>
            <div class="two-in-row">
                <div>
                    <input type="text" data-el="rental" name="rental_first_name" id="com_rental_first_name">
                    <p>FIRST</p>
                </div>
                <div>
                    <input type="text" data-el="rental" name="rental_last_name" id="com_rental_last_name">
                    <p>LAST</p>
                </div>
            </div>

        </div>
        <legend>
            RENTAL TENANT PHONE:*
        </legend>
        <input type="text" data-el="rental" name="rental_phone" id="com_rental_phone">
        <legend>
            RENTAL TENANT EMAIL*
        </legend>
        <input type="email"  data-el="rental" name="rental_email" id="com_rental_email">
        <p>This field is required in order for the tenant to receive scheduling updates.</p>
    </div>
    <div class="hide-if-success hide" data-group="vacant">
        <legend>
            HOW WILL THE TECHNICIAN GAIN ACCESS TO THE SITE / BACKFLOW DEVICES?*
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" id="accessTypeChoiceSite1"
                       data-el="vacant"
                       data-radio="contact_site"
                       name="access_type" value="contact" >
                <label for="accessTypeChoiceSite1">SITE CONTACT</label>
            </div>
            <div>
                <input type="radio" id="accessTypeChoiceSite2"
                       data-el="vacant"
                       data-radio="contact_site"
                       name="access_type" value="lockbox">
                <label for="accessTypeChoiceSite2">LOCKBOX ONSITE</label>
            </div>
        </div>
        <div data-group="contact_site_access" class="hide">
            <legend>
                Choose from saved site contacts or get a new one:
            </legend>
            <div class="radio__wrapper">
                <div class="site_contact_radio"></div>
                <div>
                    <input type="radio" id="com_contact_site"
                        data-el="contact_site_access" data-radio="site_access_radio"
                        name="access_site" value="other">
                    <label for="com_contact_site">Other</label>
                </div>
            </div>
        </div>
        <div data-group="site_access_other_group" class="hide">
            <div class="site_contact_error error" style="display: none;">The entered contact is already in the list.</div>
            <div class="">
                <legend>SITE CONTACT NAME:*</legend>
                <div class="two-in-row">
                    <div>
                        <input type="text" data-el="site_access_other" name="site_contact_first_name" id="com_site_contact_first_name">
                        <p>FIRST</p>
                    </div>
                    <div>
                        <input type="text" data-el="site_access_other" name="site_contact_last_name" id="com_site_contact_last_name">
                        <p>LAST</p>
                    </div>
                </div>
            </div>
            <legend>
                SITE CONTACT PHONE:*
            </legend>
            <input type="text" data-el="site_access_other" name="site_contact_phone" id="com_site_contact_phone">
            <legend>
                SITE CONTACT EMAIL*
            </legend>
            <input type="email"  data-el="site_access_other" name="site_contact_email" id="com_site_contact_email">
            <p>This field is required in order for the site contact to receive scheduling updates.</p>
        </div>
        <div data-group="lockbox_group" class="hide">
            <legend>
                DESCRIBE LOCATION OF LOCKBOX?*
            </legend>
<!--            <input type="textarea" data-el="contact_site" name="lockbox_location" id="com_lockbox_location">-->
            <textarea type="textarea"  data-el="lockbox" name="lockbox_location" id="com_lockbox_location"></textarea>
            <legend>
                LOCKBOX CODE:*
            </legend>
            <input type="text" data-el="lockbox" name="lockbox_code" id="com_lockbox_code">
        </div>
    </div>
    <div id="chicago_location" class="hide">
        <legend>THE SITE LOCATION YOU ENTERED IS IN CHICAGO. IS THIS DOWNTOWN, IN THE LOOP? *</legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" id="commercialLocation1"
                    data-radio="commercial_location"
                    name="commercial_location" value="yes">
                <label for="commercialLocation1">yes</label>
            </div>
            <div>
                <input type="radio" id="commercialLocation2"
                    data-radio="commercial_location"
                    name="commercial_location" value="no">
                <label for="commercialLocation2">no</label>
            </div>
        </div>
        <div class="hide" data-group="location_comment">
            <div>
                <legend>PLEASE PROVIDE ANY SPECIAL PARKING INSTRUCTIONS, SUCH AS, CAN THE TECHNICIAN PARK IN THE DOCK / PARKING VOUCHERS, ETC.... *</legend>
                <div>
                    <textarea name="location_comment" id="location_comment" class="location_comment"></textarea>
                    <div class="notice_message">* Parking Fees May Apply</div>
                </div>
            </div>
            <br/>
        </div>
    </div>
    <div class="hide_outside">
        <legend>
            IS THIS FOR YOUR LAWN IRRIGATION / LAWN SPRINKLERS?*
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" data-radio="sprinklers_radio" id="accessTypeChoice1"
                       name="lawn" value="yes">
                <label for="accessTypeChoice1">YES</label>
            </div>
            <div>
                <input type="radio" data-radio="sprinklers_radio" id="accessTypeChoice2"
                       name="lawn" value="no" >
                <label for="accessTypeChoice2" >NO</label>
            </div>
            <div>
                <input type="radio" data-radio="sprinklers_radio" id="accessTypeChoice3"
                       name="lawn" value="not_sure">
                <label for="accessTypeChoice3" >NOT SURE?</label>
            </div>
        </div>
    </div>
        <div data-group="sprinklers_radio_group" class="hide">
            <legend>
                DEVICE LOCATION?*
            </legend>
            <div class="radio__wrapper">
                <div>
                    <input type="radio" id="deviseLocationChoice1"
                           data-radio="inside_radio_dates"
                           data-el="sprinklers_radio_inputs"
                           name="device_location" value="inside">
                    <label for="deviseLocationChoice1">INSIDE RESIDENCE</label>
                </div>
                <div>
                    <input type="radio" id="deviseLocationChoice2"
                           data-el="sprinklers_radio_inputs"
                           data-radio="inside_radio_dates"
                           name="device_location" value="outside">
                    <label for="deviseLocationChoice2">OUTSIDE RESIDENCE</label>
                </div>
                <div>
                    <input type="radio" id="deviseLocationChoice3"
                           data-el="sprinklers_radio_inputs"
                           data-radio="inside_radio_dates"
                           name="device_location" value="not_sure">
                    <label for="deviseLocationChoice3">NOT SURE?</label>
                </div>
            </div>
        </div>
        <div data-group="inside_loc_div" class="hide">
            <legend class="date__legend">
                PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*
            </legend>
            <input type="text" data-el="inside_loc_input" placeholder="mm/dd/yyyy" class="datepicker" name="turned_on" id="datepicker_turned">
            <img onclick="focusDate(this)" src="<?php echo plugins_url('/wo_schedule/inc') ?>/img/datepicker.svg" class="datepicker-icon" />
        </div>
        
    <div class="bottom__buttons">
        <button type="button" data-button='prev'>
            Previous page
        </button>
        <button type="submit" id ='next'>
            Next page
        </button>
        <div class="loader hide"></div>
    </div>
</form>