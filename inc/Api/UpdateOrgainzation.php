<?php


namespace wo_schedule\inc\Api;

use wo_schedule\inc\REGISTRY;
use wo_schedule\inc\token\Check_Oauth2;

class UpdateOrgainzation
{
    public $organization_id;
    public $mail;
    public $params;
    public $result;
    public function __construct($organization_id,$mail,$params)
    {
        $this->organization_id = $organization_id;
        $this->mail = urlencode($mail);
        $this->params = $params;
    }
    public function update_org(){
        $response = wp_remote_request(REGISTRY::BASIC_URL.
                                        REGISTRY::UPDATE_ORGANOZATION_DATA.
                                        $this->organization_id.'?email='.
                                        $this->mail,
            array(
                'method' => "PATCH",
                'headers'=> array('Authorization' => 'Bearer '. Check_Oauth2::check(),'Content-Type' =>'application/json'),
                'body' => json_encode($this->params)
            )
        );
        $this->result =  wp_remote_retrieve_body( $response );

        return $this->result ;
    }
}