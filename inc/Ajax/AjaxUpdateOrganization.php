<?php

use wo_schedule\inc\Api\UpdateOrgainzation;

add_action( 'wp_ajax_updateorg','updateorg');
add_action( 'wp_ajax_nopriv_updateorg' , 'updateorg');

function updateorg(){
    $data = stripcslashes($_POST['data']);
    $json = json_decode($data);

    $update = new UpdateOrgainzation($_POST['cid'],$_POST['email'],$json);
    $responce = $update->update_org();
    echo $responce;

    exit();
}