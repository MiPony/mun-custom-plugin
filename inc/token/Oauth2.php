<?php


namespace wo_schedule\inc\token;


use wo_schedule\inc\REGISTRY;

class Oauth2
{
    const BODY = array(
        'grant_type' =>'password',
        'client_id' => REGISTRY::CLIENT_ID,
        'client_secret' => REGISTRY::CLIENT_SECRET,
        'username' => REGISTRY::USER,
        'password' => REGISTRY::PSWD
    );
    public $result;
    public function __construct()
    {

        $response = wp_remote_post(REGISTRY::BASIC_URL. REGISTRY::OAUTH2_URL,array ('body' => $this::BODY));
        if ( is_wp_error( $response ) ){
            echo $response->get_error_message();
            $this->result = NULL;
        }
        elseif( wp_remote_retrieve_response_code( $response ) === 200 ){
            $this->result = wp_remote_retrieve_body( $response );
        }
        return $this->result;
    }
}