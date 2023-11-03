<?php
use \wo_schedule\inc\REGISTRY;
?>
<form id="residential_second_form" name="residential_second_form" style="display:none">
    <legend data-show="a">CID # (CUSTOMER IDENTIFICATION NUMBER)</legend>
    <div class="edit_box">
        <input type="text" name ='CID'>
    </div>
    <p>If you retrieved a correspondence letter from us, enter your CID# (Customer Identification Number) located at the top right corner.</p>
    <legend>CCN # OR SITE ID #</legend>
    <div class="edit_box">
        <input type="text" name ='CCN'>
    </div>
    <p>Often provided by your City or Village.</p>
    <legend>NAME:*</legend>
    <div class="form__name two-in-row">
        <div class="edit_box">
            <input type="text" required name ='first_name'>
            <p>FIRST</p>
        </div>
        <div class="edit_box">
            <input type="text" required name ='second_name'>
            <p>LAST</p>
        </div>
    </div>
    <legend>EMAIL:*</legend>
    <div class="edit_box">
        <input type="email" required name ='email'>
    </div>
    <p id="help_email_res">If you can not provide a valid email address at this time, please call the office (312) 638-9878 to schedule.</p>
    <legend>PHONE:*</legend>
    <div class="edit_box">
        <input type="text" required name ='phone'>
    </div>
    <div class="phone__div hide">
        <legend class="phone__legend hide">
            IS (068) 904-1882 YOUR MOBILE, HOME OR WORK NUMBER?*
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" data-radio="phone_type" id="typeChoice1"
                       name="phone_type" value="mobile">
                <label for="typeChoice1">MOBILE</label>
            </div>
            <div>
                <input type="radio" data-radio="phone_type" id="typeChoice2"
                       name="phone_type" value="home">
                <label for="typeChoice2">HOME</label>
            </div>
            <div>
                <input type="radio" data-radio="phone_type" id="typeChoice3"
                       name="phone_type" value="work">
                <label for="typeChoice3">WORK</label>
            </div>
            <div>
                <input type="radio" data-radio="phone_type" id="typeChoice4"
                       name="phone_type" value="other">
                <label  for="typeChoice4">OTHER</label>
            </div>
            <div data-group="phone_type" class="hide">
                <input data-required='false' data-el="phone_type" type="text" name="other">
            </div>

        </div>
    </div>

    <legend>
        RESIDENTIAL SITE ADDRESS:*
    </legend>
    <div class="edit_box">
        <input type="text" class='full-width' name="address">
    </div>
    <p>STREET ADDRESS</p>
    <div class="edit_box">
        <input type="text" class='full-width' name="address_line">
    </div>
    <p>ADDRESS LINE 2</p>
    <div>
        <div class="two-in-row">
            <div class="edit_box">
                <input type="text" name="city">
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
    <div class="contact__updates hidden-company__fields">
        <legend>
            IS THE MAILING AND BILLING ADDRESS THE SAME AS THE SITE ADDRESS ENTERED ABOVE?*
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" data-radio="mailing_billing" id="addressChoice1"
                       name="mailing_billing" value="yes">
                <label for="addressChoice1">yes</label>
            </div>
            <div>
                <input type="radio" data-radio="mailing_billing" id="addressChoice2"
                       name="mailing_billing" value="no">
                <label for="addressChoice2">no</label>
            </div>
        </div>
    </div>
    <div class="hide" data-group="mailing_billing">
        <div class="hide-if-success">
            <legend>
                BILLING /MAILING ATTENTION TO:*
            </legend>
            <input  data-el="mailing_billing_group" type="text" data-required='true' name="bill_mail_name">
            <p>ATTENTION: BOB SMITH: COMPANY OR BUSINESS NAME</p>
        </div>
        <legend>
            BILLING /MAILING ADDRESS:*
        </legend>
        <input type="text" class="full-width" data-required='true' data-el="mailing_billing_group" name="bill_mail_address">
        <p>STREET ADDRESS</p>
        <input type="text" class ="full-width" data-required='false' data-el="mailing_billing_group" name="bill_mail_address_line">
        <p>ADDRESS LINE 2</p>
        <div>
            <div class="two-in-row">
                <div>
                    <input type="text" data-required='true' data-el="mailing_billing_group"  name="bill_mail_city">
                    <p>CITY</p>
                </div>
                <div>
                    <select name="state" id="bill_mail_state">
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
            <input type="text" data-required='true' data-el="mailing_billing_group"  name="bill_mail_zip">
            <p>ZIP CODE</p>
    </div>
    </div>
    <div class="contact__updates-div hide">
        <legend class="contact__mailing">
            WILL BE THE CONTACT FOR SCHEDULING / UPDATES?*
        </legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" data-radio="site_contact" id="siteChoice1"
                       name="site_choice" value="yes">
                <label for="siteChoice1">yes</label>
            </div>
            <div>
                <input type="radio" data-radio="site_contact" id="siteChoice2"
                       name="site_choice" value="no">
                <label for="siteChoice2">no</label>
            </div>
        </div>
    </div>
    <div class="site_contact hide" data-group="site_contact">
        <legend>SITE CONTACT NAME:*</legend>
        <div class="form__name two-in-row">
            <div>
                <input type="text" data-el="site_contact"  name='site_contact_first'>
                <p>FIRST</p>
            </div>
            <div>
                <input type="text" data-el="site_contact"  name='site_contact_last'>
                <p>LAST</p>
            </div>
        </div>
        <legend>SITE CONTACT PHONE #*</legend>
            <input type="text" data-el="site_contact"  name='site_contact_phone'>
        <legend>SITE CONTACT EMAIL*</legend>
            <input type="email" data-el="site_contact"  name='site_contact_email'>
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