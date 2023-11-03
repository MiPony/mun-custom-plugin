<?php

namespace wo_schedule\inc\token;

use wo_schedule\inc\REGISTRY;

class CSRF
{
    public $result;
    public function __construct(  )
    {
        $response = wp_remote_get( REGISTRY::BASIC_URL . Registry::BASIC_AUTH_URL);
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