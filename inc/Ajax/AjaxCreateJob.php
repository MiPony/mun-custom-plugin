<?php
use wo_schedule\inc\Api\CreateJob;
add_action( 'wp_ajax_createjob','createjob');
add_action( 'wp_ajax_nopriv_createjob' , 'createjob');

function createjob() {

        $additional_data = array(
            'rental_first_name' => $_POST['rental_first_name'],
            'rental_last_name' => $_POST['rental_last_name'],
            'rental_phone' => $_POST['rental_phone'],
            'rental_email' => $_POST['rental_email'],
            'site_contact_first_name' => $_POST['site_contact_first_name'],
            'site_contact_last_name' => $_POST['site_contact_last_name'],
            'site_contact_phone' => $_POST['site_contact_phone'],
            'site_contact_email' => $_POST['site_contact_email'],
            'lockbox_location' => $_POST['lockbox_location'],
            'lockbox_code' => $_POST['lockbox_code'],
        );
        if (!empty($_POST['gated_text'])){
            $additional_data['gated_text'] = $_POST['gated_text'];
        }
        if (!empty($_POST['location_comment'])){
            $additional_data['location_comment'] = $_POST['location_comment'];
        }
    
    $job = new CreateJob($_POST['CID'],$_POST['date'],$_POST['first_name'],$_POST['last_name'],$_POST['selected_date_index'],$additional_data,$_POST['device_location']);
    
    $result = $job->add_job();

    if (!empty($result)){
        wp_send_json_success($result);
    } else {
        wp_send_json_error($result);
    }
    exit();
}