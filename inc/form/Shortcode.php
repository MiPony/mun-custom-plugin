<?php
namespace wo_schedule\inc\form;

use wo_schedule\inc\Ajax\AjaxGetOrgData;
use wo_schedule\inc\REGISTRY;
use wo_schedule\inc\token\Check_Oauth2;
class Shortcode
{
    public function __construct()
    {
        add_shortcode( 'wo-schedule-form', array( $this, 'form' ) );
    }

    public function form()
    {
        Check_Oauth2::check();
        include(REGISTRY::PLUGIN_PATH. '/html/form.php');
        // wp_enqueue_script('jq', plugins_url('/wo_schedule/inc').'/js/jq.js', array('wo_schedule'), $wp_version );
        wp_enqueue_script('jquery-maskedinput', plugins_url('/wo_schedule/inc').'/js/jquery.maskedinput.min.js', array('jquery-core'), WO_SCHEDULE_VERSION );
        wp_enqueue_script('validate', plugins_url('/wo_schedule/inc').'/js/validate.js', array('jquery-core'), WO_SCHEDULE_VERSION );
        wp_enqueue_script('additional', plugins_url('/wo_schedule/inc').'/js/additional.js', array('jquery-core'), WO_SCHEDULE_VERSION );
        wp_enqueue_script('custom-validation', plugins_url('/wo_schedule/inc').'/js/validation.js', array('validate'), WO_SCHEDULE_VERSION );
        wp_enqueue_script('wo_schedule', plugins_url('/wo_schedule/inc').'/js/main.js', array(), WO_SCHEDULE_VERSION );
        wp_enqueue_script('fields', plugins_url('/wo_schedule/inc').'/js/fields.js', array('wo_schedule'), WO_SCHEDULE_VERSION );
        wp_enqueue_style('wo_schedule', plugins_url('/wo_schedule/inc').'/css/style.css', array(), WO_SCHEDULE_VERSION );
        wp_enqueue_style('basic.min.css', plugins_url('/wo_schedule/inc').'/css/basic.min.css', array(), WO_SCHEDULE_VERSION );
        wp_enqueue_style('post-737.css', plugins_url('/wo_schedule/inc').'/css/post-737.css', array(), WO_SCHEDULE_VERSION );
        wp_enqueue_style('style2.css', plugins_url('/wo_schedule/inc').'/css/style2.css', array(), WO_SCHEDULE_VERSION );
        wp_enqueue_style('theme.min.css', plugins_url('/wo_schedule/inc').'/css/theme.min.css', array(), WO_SCHEDULE_VERSION );
        wp_localize_script( 'wo_schedule', 'mainVars', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ajax-nonce')
        ) );
    }
}