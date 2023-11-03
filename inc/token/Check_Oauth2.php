<?php


namespace wo_schedule\inc\token;

use wo_schedule\inc\REGISTRY;

class Check_Oauth2
{

    public static function check()
     {
         $special_query_results = get_transient( 'Oauth2' );

         if (empty($special_query_results)) {
            $Oauth2 = new Oauth2();
            $special_query_results = json_decode($Oauth2->result)->access_token;
            set_transient( 'Oauth2', $special_query_results, HOUR_IN_SECONDS);
         }

         return $special_query_results;
     }

    public static function setJobToken($job_token)
    {
        set_transient( 'JobToken_'  . md5($_SERVER['SERVER_ADDR'] . $_POST['CID'] . $_POST['email'] ), $job_token, HOUR_IN_SECONDS );
    }

    public static function getJobToken()
    {
        return get_transient( 'JobToken_'  . md5($_SERVER['SERVER_ADDR'] . $_POST['CID'] . $_POST['email'] ) );
    }
}