<form id='fourthForm' name='fourthForm' style='display:none;margin-top:20px;'>
    <div class="fourth__section">
        <h2>Fees:</h2>
        <table id="fees_table"></table>
        <h2>Devices:</h2>
        <div class="devices">
            <table id="device_table">
            </table>
        </div>
        <div class="bottom__buttons pagination" id="pagination">
                <button id='read__more' type="button">Review all devices</button>
                <div class="loader_message hide">Loading ...</div>
        </div>
        <button id='read__less' type="button">Collapse devices</button>
        <h2>Additional details:</h2>
        <table id="add_details"></table>
        <div class="buttons bottom__buttons">
            <button type="button" data-button="prev" id="editing_prev">
                Previous page
            </button>
            <button class="loader-button" type="submit" value="Next">
                Next page
            </button>
            <div class="loader hide" id="loader_fourth_form"></div>
        </div>
    </div>
</form>