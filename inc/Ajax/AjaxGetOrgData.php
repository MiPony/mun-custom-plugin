<?php



use \wo_schedule\inc\Api\Organization;
use \wo_schedule\inc\Api\Organization_data;

add_action( 'wp_ajax_ajaxgetorgdata','do_ajax');
add_action( 'wp_ajax_nopriv_ajaxgetorgdata' , 'do_ajax');
function do_ajax(){
    $organization = new Organization($_POST['CID'],$_POST['email']);
    $organization_data = new Organization_data($organization);

    $json = json_decode($organization_data->result);

    if (!empty($json)){
        wp_send_json_success($json);
    }
}


