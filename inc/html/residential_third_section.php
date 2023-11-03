<form id="residential_third_section" name="residential_third_section"
      style="display: none">
    <section>
        <div class="hide-if-success">
            <legend>
                IS THIS A GATED COMMUNITY?*
            </legend>
            <div class="radio__wrapper">
                <input type="radio" id="gatedChoice1"
                       data-radio="gated"
                       name="gated" value="yes">
                <label for="gatedChoice1">YES</label>

                <input type="radio" id="gatedChoice2"
                       data-radio="gated"
                       name="gated" value="no">
                <label for="gatedChoice2">NO</label>
                <div class="hide" data-group="gated">
                    <legend>
                        PLEASE ADD GATE INSTRUCTIONS FOR THE TECHNICIAN BELOW.*
                    </legend>
<!--                    <input type="textarea"  data-el="gated" name="gated_text" id="gated_text">-->
                    <textarea type="textarea"  data-el="gated" name="gated_text" id="gated_text"></textarea>
                </div>
            </div>
            <legend>
                THE SITE ADDRESS IS: *
            </legend>
            <div class="radio__wrapper">
                <div>
                    <input type="radio" id="adressTypeChoice1"
                           data-radio="rental_radio"
                           name="adress_type" value="owner">
                    <label for="adressTypeChoice1">OWNER OCCUPIED</label>
                </div>
                <div>
                    <input type="radio" id="adressTypeChoice2"
                           data-radio="rental_radio"
                           name="adress_type" value="rental">
                    <label for="adressTypeChoice2">A RENTAL</label>
                </div>
                <div>
                    <input type="radio" id="adressTypeChoice3"
                           data-radio="rental_radio"
                           name="adress_type" value="vacant">
                    <label for="adressTypeChoice3">VACANT</label>
                </div>
            </div>
            <div data-group="rental_radio" class="hide">
                <div>
                    <legend>RENTAL TENANT NAME:*</legend>
                    <div class="two-in-row">
                        <div>
                            <input type="text" data-el="rental_radio" name="rental_first_name"  id="res_rental_first_name">
                            <p>FIRST</p>
                        </div>
                        <div>
                            <input type="text" data-el="rental_radio" name="rental_last_name" id="res_rental_last_name">
                            <p>LAST</p>
                        </div>
                    </div>

                </div>
                <legend>
                    RENTAL TENANT PHONE:*
                </legend>
                <input type="text" data-el="rental_radio" name="rental_phone" id="res_rental_phone">
                <legend>
                    RENTAL TENANT EMAIL*
                </legend>
                <input type="email" data-el="rental_radio" name="rental_email" id="res_rental_email">
                <p>This field is required in order for the tenant to receive scheduling updates.</p>
            </div>
            <div data-group="vacant_radio" class='hide'>
                <legend>
                    HOW WILL THE TECHNICIAN GAIN ACCESS TO THE SITE / BACKFLOW DEVICES?*
                </legend>
                <div class="radio__wrapper">
                    <div>
                        <input type="radio" id="accessTypeChoice1"
                               data-el="vacant_radio" data-radio="lockbox_radio"
                               name="access_type" value="contact">
                        <label for="accessTypeChoice1">SITE CONTACT</label>
                    </div>
                    <div>
                        <input type="radio" id="accessTypeChoice2"
                               data-el="vacant_radio" data-radio="lockbox_radio"
                               name="access_type" value="lockbox">
                        <label for="accessTypeChoice2">LOCKBOX ONSITE</label>
                    </div>
                </div>
            <div data-group="res_contact_site_access" class="hide">
                <legend>
                    Choose from saved site contacts or get a new one:
                </legend>
                <div class="radio__wrapper">
                    <div class="res_site_contact_radio"></div>
                    <div>
                        <input type="radio" id="res_contact_site"
                            data-el="res_contact_site_access" data-radio="res_site_radio"
                            name="res_access_site" value="other">
                        <label for="res_contact_site">Other</label>
                    </div>
                </div>
            </div>
            <div data-group="other" class="hide">
                <div class="res_site_contact_error error" style="display: none;">The entered contact is already in the list.</div>
                    <legend>SITE CONTACT NAME:*</legend>
                    <div class="two-in-row">
                        <div>
                            <input type="text" data-el="other" name="site_contact_first_name" id="res_site_contact_first_name">
                            <p>FIRST</p>
                        </div>
                        <div>
                            <input type="text" data-el="other" name="site_contact_last_name" id="res_site_contact_last_name">
                            <p>LAST</p>
                        </div>
                    </div>
                <legend>
                    SITE CONTACT PHONE:*
                </legend>
                <input type="text" data-el="other" name="site_contact_phone" id="res_site_contact_phone">
                <legend>
                    SITE CONTACT EMAIL*
                </legend>
                <input type="email"  data-el="other" name="site_contact_email" id="res_site_contact_email">
                <p>This field is required in order for the site contact to receive scheduling updates.</p>
            </div>
                <div data-group="lockbox_access" class="hide">
                    <legend>
                        DESCRIBE LOCATION OF LOCKBOX?*
                    </legend>
<!--                    <input type="textarea" data-el="lockbox_access" name="lockbox_location"  id="res_lockbox_location">-->
                    <textarea type="textarea" data-el="lockbox_access" name="lockbox_location"  id="res_lockbox_location"></textarea>
                    <legend>
                        LOCKBOX CODE:*
                    </legend>
                    <input type="text" data-el="lockbox_access"  name="lockbox_code"  id="res_lockbox_code">
                </div>
            </div>
        </div>
        <div class="hide__outside">
            <legend>
                IS THIS FOR YOUR LAWN IRRIGATION / LAWN SPRINKLERS?*
            </legend>
            <div class="radio__wrapper">
                <div>
                    <input type="radio" data-radio="sprinklers_type" id="accessTypeChoice1"
                        name="lawn" value="yes">
                    <label for="accessTypeChoice1">YES</label>
                </div>
                <div>
                    <input type="radio" data-radio="sprinklers_type" id="accessTypeChoice2"
                        name="lawn" value="no" >
                    <label for="accessTypeChoice2" >NO</label>
                </div>
                <div>
                    <input type="radio" data-radio="sprinklers_type" id="accessTypeChoice3"
                        name="lawn" value="not_sure">
                    <label for="accessTypeChoice3" >NOT SURE?</label>
                </div>
            </div>
        </div>
            <div data-group="sprinklers_group" class="hide">
                <legend>
                    DEVICE LOCATION?*
                </legend>
                <div class="radio__wrapper">
                    <div>
                        <input type="radio" id="deviseLocationChoiceCom1"
                            data-radio="inside_radio"
                            data-el="sprinklers_inputs"
                            name="device_location" value="inside">
                        <label for="deviseLocationChoiceCom1">INSIDE RESIDENCE</label>
                    </div>
                    <div>
                        <input type="radio" id="deviseLocationChoiceCom2"
                            data-el="sprinklers_inputs"
                            data-radio="inside_radio"
                            name="device_location" value="outside">
                        <label for="deviseLocationChoiceCom2">OUTSIDE RESIDENCE</label>
                    </div>
                    <div>
                        <input type="radio" id="deviseLocationChoiceCom3"
                            data-el="sprinklers_inputs"
                            data-radio="inside_radio"
                            name="device_location" value="not_sure">
                        <label for="deviseLocationChoiceCom3">NOT SURE?</label>
                    </div>
                </div>
            </div>
            <div data-group="inside_location" class="hide">
                <legend class="date_legend">
                    PLEASE CHOOSE THE EARLIEST DATE THAT YOU OR YOUR IRRIGATION COMPANY WILL HAVE THE BACKFLOW DEVICE(S) INSTALLED AND WATER TURNED ON BY.*
                </legend>
                <input type="text" data-el="inside_location" placeholder="mm/dd/yyyy" class="datepicker" name="turned_on" id="datepicker_turned_on">
                <img onclick="focusDate(this)" src="<?php echo plugins_url('/wo_schedule/inc') ?>/img/datepicker.svg" class="datepicker-icon" />
            </div>
        
    </section>
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