<form name="wo_info" id ='wo_info' style="display: none">
    <h2>Date:</h2>
    <div class="suggestions_info"></div>
    <h2>Fees:</h2>
    <table id="fees_table_info"></table>
    <h2>Devices:</h2>
    <div class="devices">
        <table id="device_table_info">
        </table>
    </div>
    <div class="bottom__buttons pagination" id="pagination_info">
        <button id='read__more_info' type="button">Review all devices</button>
        <div class="loader_message hide">Loading ...</div>
    </div>
    <button id='read__less_info' type="button">Collapse devices</button>
    <div class="elementor-alert elementor-alert-info double-order-info" role="alert" id="double_order_info">
        <span class="elementor-alert-description-res-alert">
            <p><span id="hide_created_wo">No need to call or email us. Please look for email.</span>
                The day before and the day of your appointment, 
                you will be emailed a 3-hour time window of your technician's ETA, estimated time of arrival.
            </p>
            <p>
                This is why confirming your email after scheduling is imperative, 
                so you're up-to-date with your reminders and the emails don't end up in the spam folder.
            </p>
        </span>
    </div>
    <div class="elementor-alert elementor-alert-info checkbox_order_info" role="alert" id="checkbox_order_info">
        <span class="elementor-alert-description-res-alert">
            <h3>Terms and Conditions</h3> 
            <p>
                Once you have booked an appointment with us, 
                it means we have reserved time in our schedule exclusively for you! 
                And we do everything possible to not miss it or be late.
            </p>
            <p>
                If you forget and miss the appointment or if the area is not accessible, 
                then a trip charge will be incurred to compensate for our expense.
            </p>
            <p>
                To avoid these charges, please call us ASAP and absolutely no later than 4pm CST the day before. 
                Emailing or calling us after 5pm CST the day before will forfeit the early bird rate and rescheduling charges will incur, 
                since this time has been reserved for you and is now a loss.
            </p>
            <div class="checkbox_flex">
                <input type="checkbox" id="accordClient1">
                <label data-type="checkbox" for="accordClient1">I have provided a primary email address and am responsible for checking it.</label>
            </div>
            <div class="checkbox_flex">
                <input type="checkbox" id="accordClient2">
                <label data-type="checkbox" for="accordClient2">I am responsible for my appointment, even though a complimentary email reminder with the ETA will be sent.</label>
            </div>
            <div class="checkbox_flex">
                <input type="checkbox" id="accordClient3">
                <label data-type="checkbox" for="accordClient3">I am aware that there will be a trip charge if I miss my appointment.</label>
            </div>
            <div class="checkbox_flex">
                <input type="checkbox" id="accordClient4">
                <label data-type="checkbox" for="accordClient4">The area will be clear and accessible the day of the appointment.</label>
            </div>
            <div class="checkbox_flex" id="divAccordClient5" style="display:none;">
                <input type="checkbox" id="accordClient5">
                <label data-type="checkbox" for="accordClient5">For outside irrigation devices, I am aware Municipal Backflow does not start up, winterize, or install the device and the device must be installed prior to our arrival with the water ON to the backflow device.</label>
            </div>
        </span>
    </div>
    <div class="bottom__buttons">
        <button type='button' data-button='prev' id="prev_wo_info">Previous page</button>
        <button type='button' id="no_fit">Doesn't fit</button>
        <button class="gray_button" type='submit' id="submit_wo_info_section">Create work order</button>
        <div class="loader hide" id="loader_wo_info"></div>
    </div>
</form>