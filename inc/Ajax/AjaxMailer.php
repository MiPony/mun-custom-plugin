<?php
use \wo_schedule\inc\mail\Mailer;



add_action( 'wp_ajax_mailer','mailer_func');
add_action( 'wp_ajax_nopriv_mailer' , 'mailer_func');

function mailer_func(){
    $data = stripcslashes($_POST['dataForms']);
    $json = json_decode($data);
    $array_from_json = (array) $json;
    $array_from_json = array_filter($array_from_json);
    $mailer = new Mailer($array_from_json);
    $mail = $mailer->sendMail();

    if ($mail == null){
        wp_send_json_error($mail);
    } else {
        wp_send_json_success($mail);
    }

    exit();
}