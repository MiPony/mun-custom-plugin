<?php
namespace wo_schedule\inc;

use wo_schedule\inc\DotEnv;

(new DotEnv(__DIR__ . '/../.env'))->load();

define('BASIC_URL', getenv('BASIC_URL'));
define('CLIENT_ID', getenv('CLIENT_ID'));
define('CLIENT_SECRET', getenv('CLIENT_SECRET'));

define('BASIC_AUTH_URL', getenv('BASIC_AUTH_URL'));
define('OAUTH2_URL', getenv('OAUTH2_URL'));
define('ORGANIZATION_DATA_URL', getenv('ORGANIZATION_DATA_URL'));
define('WO_SCHEDULE_START_URL', getenv('WO_SCHEDULE_START_URL'));
define('WO_DATES_SUGGESTIONS_URL', getenv('WO_DATES_SUGGESTIONS_URL'));
define('CREATE_WO_URL', getenv('CREATE_WO_URL'));
define('USER', getenv('USER'));
define('PSWD', getenv('PSWD'));
define('UPDATE_ORGANOZATION_DATA', getenv('UPDATE_ORGANOZATION_DATA'));

class REGISTRY {

    const BASIC_URL = BASIC_URL;
    const BASIC_AUTH_URL = BASIC_AUTH_URL;
    const OAUTH2_URL = OAUTH2_URL;
    const CLIENT_ID = CLIENT_ID;
    const CLIENT_SECRET = CLIENT_SECRET;
    const ORGANIZATION_DATA_URL = ORGANIZATION_DATA_URL;
    const WO_SCHEDULE_START_URL = WO_SCHEDULE_START_URL;
    const WO_DATES_SUGGESTIONS_URL = WO_DATES_SUGGESTIONS_URL;
    const CREATE_WO_URL = CREATE_WO_URL;
    const USER = USER;
    const PSWD = PSWD;
    const PLUGIN_PATH = __DIR__;
    const UPDATE_ORGANOZATION_DATA = UPDATE_ORGANOZATION_DATA;
    const STATES = array (  "AL"=>"Alabama",
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
                        );
}

