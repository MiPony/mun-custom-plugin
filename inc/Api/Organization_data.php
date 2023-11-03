<?php
namespace wo_schedule\inc\Api;

use wo_schedule\inc\REGISTRY;
use wo_schedule\inc\token\Check_Oauth2;


class Organization_data
{
    public $result;
    private $organization;
    public function __construct(Organization $organization)
    {
        $this->organization = $organization;
        $func = $this->check_wo();
        if($func == false){
            $func = $this->get_org_data();
            return $this->result;
        } else {
            return $this->result;
        }
    }

    private function check_wo(){
        $response = wp_remote_get(REGISTRY::BASIC_URL .
                REGISTRY::ORGANIZATION_DATA_URL .
                $this->organization->cid .
                '?email=' . $this->organization->email . '&check_existing_wo=1',
                array('headers' => array('Authorization' => 'Bearer '. Check_Oauth2::check()) ));

        $result = wp_remote_retrieve_body($response);
        $result = json_decode($result);
        if ( !empty($result->wo_appointed_date) ) {
            $this->result = json_encode($result);
            return $this->result;
        }
        return false;
    }

    private function get_org_data(){
        $response = wp_remote_get(REGISTRY::BASIC_URL .
            REGISTRY::ORGANIZATION_DATA_URL .
            $this->organization->cid .
            '?email=' . $this->organization->email,
            array('headers' => array('Authorization' => 'Bearer '. Check_Oauth2::check()) ));

        if ( is_wp_error( $response ) ){
            echo $response->get_error_message();
            $this->result = $response;
            return $this->result;
        }
        elseif( wp_remote_retrieve_response_code( $response ) === 200 ){
            $this->result = wp_remote_retrieve_body( $response );
            return $this->result;
        }
    }
}