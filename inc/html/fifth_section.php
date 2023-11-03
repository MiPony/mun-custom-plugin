<form name="fifth_form" id ='fifth_form' style="display: none">
    <h2 style>Select date:</h2>
    <div class="elementor-alert elementor-alert-info" role="alert" id="mini_date_info">
        <span class="elementor-alert-description-res-alert">
            <p>Please choose as close to option one as possible to help us prevent price increases and maintain efficiency.</p>
        </span>
    </div>
    <div class="elementor-alert elementor-alert-info hide" role="alert" id="no_date_info">
        <span class="elementor-alert-description-res-alert">
            <p>Sorry, there are no available WO dates for this selected date. Please choose another Irrigation date.</p>
        </span>
    </div>
    <div class="elementor-alert elementor-alert-info hide" role="alert" id="server_busy_note">
        <span class="elementor-alert-description-res-alert">
            <p id="server_busy_text"></p>
        </span>
    </div>
    <div class="suggestions"></div>
    <div class="loader hide" id="loader_fifth"></div>
    <div class ='button__wrapper'>
        <button type="button" class="minimize" id="notSuitable"> All dates are not suitable </button>
    </div>

    <div class="bottom__buttons">
        <button type='button' data-button = 'prev' id="prev_fifth_section">
            Previous page
        </button>

        <button type='submit' id="submit_fifth_section">Next page</button>
        <div class="loader hide" id="loader_main">

        </div>
    </div>
</form>