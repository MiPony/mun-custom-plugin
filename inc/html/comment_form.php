
    <form name="comment_form" id="comment_form" style="display: none">
    <div id="chicago_location_with_no_data" class="hide">
        <legend>THE SITE LOCATION YOU ENTERED IS IN CHICAGO. IS THIS DOWNTOWN, IN THE LOOP? *</legend>
        <div class="radio__wrapper">
            <div>
                <input type="radio" id="commercialLocation3"
                    data-radio="commercial_location_with_no_data"
                    name="commercial_location_with_no_data" value="yes">
                <label for="commercialLocation3">yes</label>
            </div>
            <div>
                <input type="radio" id="commercialLocation4"
                    data-radio="commercial_location_with_no_data"
                    name="commercial_location_with_no_data" value="no">
                <label for="commercialLocation4">no</label>
            </div>
        </div>
        <div class="hide" data-group="location_comment_with_no_data">
            <div>
                <legend>PLEASE PROVIDE ANY SPECIAL PARKING INSTRUCTIONS, SUCH AS, CAN THE TECHNICIAN PARK IN THE DOCK / PARKING VOUCHERS, ETC.... *</legend>
                <div>
                    <textarea name="location_comment_with_no_data" id="location_comment_with_no_data" class="location_comment"></textarea>
                    <div class="notice_message">* Parking Fees May Apply</div>
                </div>
            </div>
            <br/>
        </div>
    </div>
        <legend>ADDITIONAL COMMENT(S) OR QUESTION(S):</legend>
        <div>
            <textarea name="email_comment" placeholder="Comment..."></textarea>
        </div>
        <div class="margin-top bottom__buttons">
            <button type='button' data-button ='prev' id="editing_prev">
                Previous page
            </button>
            <button type='submit' id="submit_comment">
                Submit
            </button>
            <div class="loader hide" id="loader_comment">
        </div>
    </form>
</div>

