
<form id="commercial_second_form" name="commercial_second_form" style="display: none">
    <section>
        <legend>CID # (CUSTOMER IDENTIFICATION NUMBER)</legend>
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
            <input class='full-width' type="email" required name ='email'>
        </div>
        <p id="help_email_com">If you can not provide a valid email address at this time, please call the office (312) 638-9878 to schedule.</p>
        <legend>PHONE:*</legend>
        <div class="edit_box">
            <input type="text" required name='phone'>
        </div>
        <legend class="hide phone__legend">
            IS (068) 904-1882 YOUR MOBILE, HOME OR WORK NUMBER?*
        </legend>
        <div class="hide phone__div">
            <div>
                <input type="radio" id="typeChoice1"
                       data-radio="phone_type_c"
                       name="phone_type" value="mobile">
                <label for="typeChoice1">MOBILE</label>
            </div>
            <div>
                <input type="radio" id="typeChoice2"
                       data-radio="phone_type_c"
                       name="phone_type" value="home">
                <label for="typeChoice2">HOME</label>
            </div>
            <div>
                <input type="radio" id="typeChoice3"
                       data-radio="phone_type_c"
                       name="phone_type" value="work">
                <label for="typeChoice3">WORK</label>
            </div>
            <div>
                <input type="radio" id="typeChoice4"
                       data-radio="phone_type_c"
                       name="phone_type" value="other">
                <label for="typeChoice4">OTHER</label>
            </div>
            <div data-group="phone_group_c" class ='hide'>
                <input  data-required='false' data-el="other_group_c" type="text" name="other">
            </div>
        </div>
        <div class="hide-if-success hide contact__updates">
            <legend class="contact__text">WILL TEST TEST BE THE SITE CONTACT FOR THE SCHEDULING / UPDATES?*</legend>
            <div>
                <div>
                    <input type="radio" id="siteContact1"
                           data-radio="contact_update"
                           name="contact_update" value="YES">
                    <label for="contactChoice1">YES</label>
                </div>
                <div>
                    <input type="radio" id="siteContact2"
                           data-radio="contact_update"
                           name="contact_update" value="NO">
                    <label for="contactChoice2">NO</label>
                </div>
            </div>
        </div>
        <div class="hide-if-success hide" data-group="contact_update">
            <div class="form__line">
            </div>
            <div>
                <legend>SITE CONTACT NAME:*</legend>
                <div class="two-in-row">
                    <div>
                        <input type="text" data-el="contact_update" name="site_first_name">
                        <p>FIRST</p>
                    </div>
                    <div>
                        <input type="text" data-el="contact_update" name="site_last_name">
                        <p>LAST</p>
                    </div>
                </div>
            </div>
            <legend>
                SITE CONTACT EMAIL*
            </legend>
            <input type="email" class="full-width" name="site_email" data-el="contact_update">
            <legend>
                SITE CONTACT PHONE #*
            </legend>
            <input type="text" name="site_phone" data-el="contact_update">
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
    </section>
</form>