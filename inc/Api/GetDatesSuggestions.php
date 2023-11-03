<?php


namespace wo_schedule\inc\Api;


use wo_schedule\inc\REGISTRY;
use wo_schedule\inc\token\Check_Oauth2;

class GetDatesSuggestions
{
    public $result;
    public $token;
    public function __construct($token)
    {
        $this->token = $token;
    }

    public function get_dates(){
        $response = wp_remote_get(REGISTRY::BASIC_URL .
            REGISTRY::WO_DATES_SUGGESTIONS_URL.
            $this->token,
            array('headers' => array('Authorization' => 'Bearer '. Check_Oauth2::check()) ));
        if ( is_wp_error( $response ) ){
            $this->result = $response;
        }
        elseif( wp_remote_retrieve_response_code( $response ) === 200 ){
            $this->result = json_decode(wp_remote_retrieve_body( $response ));
        }
        return $this->result;
    }
    
    public function __toString()
    {
        return $this->result;
    }
}