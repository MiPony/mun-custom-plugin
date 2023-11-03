<?php
use wo_schedule\inc\mail\CompanyMailer;

add_action( 'wp_ajax_sendcompanybymail','sendcompanybymail');
add_action( 'wp_ajax_nopriv_sendcompanybymail' , 'sendcompanybymail');

function sendcompanybymail(){
    $data = stripcslashes($_POST['company']);
    $json = json_decode($data,true);

    $type = $_POST['type'];
    $additional_fields = array(
        'email_comment', 'adress_type', 'access_type', 'commercial_location', 'lawn',
        'device_location', 'rental_first_name', 'rental_last_name',
        'rental_phone', 'rental_email', 'lockbox_location',
        'lockbox_code', 'gated_text', 'turned_on', 'location_comment',
        'operational_time'
    );
    foreach ($additional_fields as $value) {
        $json[$value] = isset($_POST[$value]) ? $_POST[$value] : '';
    }

    $mailer = new CompanyMailer($json,$type);
    $mail = $mailer->sendMail();

    if ($mail == null){
        wp_send_json_error($mail);
    } else {

    }
}