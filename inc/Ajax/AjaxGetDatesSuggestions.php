<?php


use wo_schedule\inc\Api\GetDatesSuggestions;

add_action( 'wp_ajax_getdatessuggestions','dates');
add_action( 'wp_ajax_nopriv_getdatessuggestions' , 'dates');

function dates(){

    $jobtoken = new GetDatesSuggestions($_POST['token']);
    $data = $jobtoken->get_dates();
    wp_send_json_success($data);
    write_log(wp_send_json_success($data));
}