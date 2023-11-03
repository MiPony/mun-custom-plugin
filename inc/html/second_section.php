<?php 
$states = array (
    "AL"=>"Alabama",
    "AK"=> "Alaska",
    "AS"=> "American Samoa",
    "AZ"=> "Arizona",
    "AR"=> "Arkansas",
    "CA"=> "California",
    "CO" => "Colorado",
    "CT"=> "Connecticut",
    "DE"=> "Delaware",
    "DC"=> "District Of Columbia",
    "FM"=> "Federated States Of Micronesia",
    "FL"=> "Florida",
    "GA"=> "Georgia",
    "GU"=> "Guam",
    "HI"=> "Hawaii",
    "ID"=> "Idaho",
    "IL"=> "Illinois",
    "IN"=> "Indiana",
    "IA"=> "Iowa",
    "KS"=> "Kansas",
    "KY"=> "Kentucky",
    "LA"=> "Louisiana",
    "ME"=> "Maine",
    "MH"=> "Marshall Islands",
    "MD"=> "Maryland",
    "MA"=> "Massachusetts",
    "MI"=> "Michigan",
    "MN"=> "Minnesota",
    "MS"=> "Mississippi",
    "MO"=> "Missouri",
    "MT"=> "Montana",
    "NE"=> "Nebraska",
    "NV"=> "Nevada",
    "NH"=> "New Hampshire",
    "NJ"=> "New Jersey",
    "NM"=> "New Mexico",
    "NY"=> "New York",
    "NC"=> "North Carolina",
    "ND"=> "North Dakota",
    "MP"=> "Northern Mariana Islands",
    "OH"=> "Ohio",
    "OK"=> "Oklahoma",
    "OR"=> "Oregon",
    "PW"=> "Palau",
    "PA"=> "Pennsylvania",
    "PR"=> "Puerto Rico",
    "RI"=> "Rhode Island",
    "SC"=> "South Carolina",
    "SD"=> "South Dakota",
    "TN"=> "Tennessee",
    "TX"=> "Texas",
    "UT"=> "Utah",
    "VT"=> "Vermont",
    "VI"=> "Virgin Islands",
    "VA"=> "Virginia",
    "WA"=> "Washington",
    "WV"=> "West Virginia",
    "WI"=> "Wisconsin",
    "WY"=> "Wyoming"
)
?>


<form id="secondForm" name="secondForm" style='display:none'>
    <div class="second__section">
      
        <legend data->NAME</legend>
        <input type="text"  required name ='first'> 
        <p>FIRST</p>
        <input type="text"  required name ='last'>
        <p>LAST</p>
        <legend>EMAIL</legend>
        <input type="text" required name="email">
        <p>
            If you can not provide a valid email address at this time, please call the office (312) 638-9878 to schedule.
        </p>
        <legend>
            PHONE=>*
        </legend>
        <input type="phone"  required name="phone">
       
            <!-- <p>IS (123) 123-1231 YOUR MOBILE, HOME OR WORK NUMBER?*</p>
        <input type="radio" id="phoneChoice1"
            name="phoneType" value="commercial">
        <label for="contactChoice1">MOBILE</label>
        <input type="radio" id="phoneChoice2"
            name="phoneType" value="residential">
        <label for="contactChoice2">HOME</label>
        <input type="radio" id="phoneChoice2"
            name="phoneType" value="residential">
        <label for="contactChoice2">WORK</label>
        <input type="radio" id="phoneChoice2"
            name="phoneType" value="residential">
        <label for="contactChoice2">OTHER</label> -->
        <legend>Company or business name*</legend>
        <input type="text" required name="company">
         <p>SITE ADDRESS OF BACKFLOW ASSEMBLY / DEVICE(S) FOR TESTING:*</p>
        <input type="text" required name="street">
        <p>STREET ADDRESS</p>
        <input type="text" name="line2">
        <p>ADDRESS LINE 2</p>
        <p>CITY</p>
        <input type="text" required name="city">
        <select name="states" id="">
          <?php  foreach ($states as $key => $value):?>
            <option value="<?php echo $key ?>"><?php  echo $value ?></option>
            <?php endforeach; ?>
        </select>
        <p>STATE</p>
        <input type="text" name="zip">
        <p>ZIP CODE</p>
        <!-- <div>
            <legend>
                IS THE MAILING AND BILLING ADDRESS THE SAME AS THE SITE ADDRESS ENTERED ABOVE?*
            </legend>
            <input type="radio" id="mailingChoice1"
                name="mailingChoice1" value="residential">
            <label for="contactChoice2">Yes</label>
            <input type="radio" id="mailingChoice2"
                name="mailingChoice2" value="residential">
            <label for="contactChoice2">No</label>
        </div>
        <div>
            <legend>
                WILL TEST TEST BE THE CONTACT FOR SCHEDULING / UPDATES?*
            </legend>
            <input type="radio" id="mailingChoice1"
                name="mailingChoice1" value="residential">
            <label for="contactChoice2">Yes</label>
            <input type="radio" id="mailingChoice2"
                name="mailingChoice2" value="residential">
            <label for="contactChoice2">No</label>
        </div> -->
        <div class="bottom__buttons">
            <button type="button" data-button='prev'>
                Previous
             </button>
            <button type="button" id ='next'>
                NEXT
            </button>
        </div>
    </div>
</form>
