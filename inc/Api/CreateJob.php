<?php


namespace wo_schedule\inc\Api;


use wo_schedule\inc\REGISTRY;
use wo_schedule\inc\token\Check_Oauth2;

class CreateJob
{
    public $CID;
    public $date;
    public $first_name;
    public $last_name;
    public $result;
    public $selected_date_index;
    public $additional_data;
    public $device_location;
    public function __construct($CID,$date,$first_name,$last_name,$selected_date_index,$additional_data,$device_location)
    {
        $this->CID = $CID;
        $this->date = date("d-m-Y", strtotime($date));
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->selected_date_index = $selected_date_index;
        $this->additional_data = $additional_data;
        $this->device_location = $device_location;
    }

    public function add_job (){
        $tester_comments = array();
        if ($this->additional_data) {
            foreach ($this->additional_data as $key => $value){
                $key = str_replace('_', ' ', $key);
                if ($value) $tester_comments[] = $key . ": " . $value;
            }
        }

        $body = array();
        $body['selected_date_index'] = (int)$this->selected_date_index;
        if ($tester_comments){
            $body['tester_comments'] = implode("\r\n", $tester_comments);
        }
        if ($this->device_location == 'outside'){
            $body['device_location'] = $this->device_location;
        }

        $token = Check_Oauth2::getJobToken();
        $params = array(
            'headers' => array(
                'Authorization: Bearer '. Check_Oauth2::check(),
                'Content-Type: application/json',
            ),
            'body' => json_encode($body)
        );

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => REGISTRY::BASIC_URL. REGISTRY::WO_DATES_SUGGESTIONS_URL . $token,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'PATCH',
            CURLOPT_POSTFIELDS => $params['body'],
            CURLOPT_HTTPHEADER => $params['headers'],
        ));
        $response = curl_exec($curl);
        $response_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);

        write_log('Create order');
        write_log($body);
        write_log('Create order response');
        write_log($response);
        write_log('Create order response code');
        write_log($response_code);
        write_log('Create order response body');
        write_log($response);

        if (200 == $response_code){
            $this->result = json_decode($response);
        }
        return $this->result;
    }

    public function add_alt_job (){
        $tester_comments = array();
        if ($this->additional_data) {
            foreach ($this->additional_data as $key => $value){
                $tester_comments[] = $key . ': ' . $value;
            }
        }

        $body = array();
        $body['company_id']=$this->CID;
        $body['first_name']=$this->first_name;
        $body['last_name']=$this->last_name;
        $body['date'] = $this->date;
        $body['tester_comments'] = implode("\r\n", $tester_comments);

        $response = wp_remote_post(REGISTRY::BASIC_URL. REGISTRY::CREATE_WO_URL, array(
            'headers'=> array('Authorization' => 'Bearer '. Check_Oauth2::check(),'Content-Type' =>'application/json'),
            'timeout ' => array(10),
            'body' => json_encode($body)));
//        if ( is_wp_error( $response ) ){
//            $$this->result->get_error_message();
//        }
        write_log('Create order');
        write_log($body);
        write_log('Create order response');
        write_log($response);
        write_log('Create order response code');
       write_log(wp_remote_retrieve_response_code( $response ));
        write_log('Create order response body');
        write_log(wp_remote_retrieve_body( $response ));
        if( wp_remote_retrieve_response_code( $response ) === 200 ){
            $this->result = json_decode(wp_remote_retrieve_body( $response ));
        }
        return $this->result;
    }
}