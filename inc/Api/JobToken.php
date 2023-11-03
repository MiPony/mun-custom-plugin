<?php


namespace wo_schedule\inc\Api;


use wo_schedule\inc\REGISTRY;
use wo_schedule\inc\token\Check_Oauth2;

class JobToken
{
    public $CID;
    public $email;
    public $wo_time;
    public $date_start;
    public $date_end;
    public $result;
    public function __construct($CID,$email,$date_start = null, $date_end, $wo_time)
    {
        $this->CID = $CID;
        $this->email = $email;
        $this->wo_time = $wo_time;
        $this->date_start = $date_start;
        $this->date_end = $date_end;
    }
    public function get_job_token (){
        date_default_timezone_set('UTC');
        $body = array();
        $body['company_id']=$this->CID;
        $body['email']=$this->email;
        $body['wo_time']=$this->wo_time;
        (!is_null( $this->date_start ) & $this->date_start != 'NaN-NaN-NaN' )? $body['date_start'] = $this->date_start : $body['date_start'] = '';
        if (!is_null($this->date_start) && !is_null($this->date_end)){
            $body['date_start']= $this->date_start;
            $body['date_end']= $this->date_end;
        }
        $body = array_diff($body, [""]);
        write_log($body);
        $response = wp_remote_post(REGISTRY::BASIC_URL. REGISTRY::WO_SCHEDULE_START_URL, array(
            'headers'=> array('Authorization' => 'Bearer '. Check_Oauth2::check(),'Content-Type' =>'application/json'),
            'body' => json_encode($body)));

        write_log('jobToken');
        write_log(wp_remote_retrieve_body( $response ));

        if( wp_remote_retrieve_response_code( $response ) === 200 ){}
        $this->result = wp_remote_retrieve_body( $response );

        $result = json_decode($this->result);
        if (isset($result->job_token)) Check_Oauth2::setJobToken($result->job_token);

        return $this->result;
    }
}