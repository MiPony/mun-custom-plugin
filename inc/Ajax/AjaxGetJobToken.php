<?php

use wo_schedule\inc\Api\JobToken;
add_action( 'wp_ajax_jobtoken','getjobtoken');
add_action( 'wp_ajax_nopriv_jobtoken' , 'getjobtoken');
function getjobtoken(){
    $jobtoken = new JobToken($_POST['CID'],$_POST['email'],$_POST['date_start'],$_POST['date_end'],$_POST['wo_time']);
    $token = $jobtoken->get_job_token();
    $json = json_decode($token);
    if (!empty($json) && (!empty($json->wo_appointed_date) || 'success' == $json->result)){
        wp_send_json_success($token);
    } else {
        wp_send_json_error($token);
    }
    exit();
}