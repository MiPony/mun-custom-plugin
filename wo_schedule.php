<?php
/**
 * Plugin Name: WO schedule
 */
defined( 'ABSPATH' ) || exit;

define( 'WO_SCHEDULE_VERSION', '6.9');

include_once 'inc/autoload.php';
register_activation_hook( __FILE__, 'myplugin_install' );
function myplugin_install(){
//    include_once 'inc/base.php';

}
use \wo_schedule\inc\form\Shortcode;
use \wo_schedule\inc\mail\CompanyMailer;
use wo_schedule\inc\REGISTRY;

new Shortcode();

if (!function_exists('write_log')) {

    function write_log($log) {
        if (true === WP_DEBUG) {
            if (is_array($log) || is_object($log)) {
                error_log(print_r($log, true));
            } else {
                error_log($log);
            }
        }
    }

}
if( WP_DEBUG && WP_DEBUG_DISPLAY && (defined('DOING_AJAX') && DOING_AJAX) ){
    @ ini_set( 'display_errors', 1 );
}
include_once 'inc/Ajax/AjaxCreateJob.php';
include_once 'inc/Ajax/AjaxGetOrgData.php';
include_once 'inc/Ajax/AjaxGetJobToken.php';
include_once 'inc/Ajax/AjaxGetDatesSuggestions.php';
include_once 'inc/Ajax/AjaxMailer.php';
include_once 'inc/Ajax/AjaxSendCompanyByEmail.php';
include_once 'inc/Ajax/AjaxUpdateOrganization.php';
add_filter( 'http_request_timeout', 'filter_function_name_4327', 10, 1);
function filter_function_name_4327( $timeout_value){
    $timeout_value = 60;
    return $timeout_value;
}
add_action( 'wp_mail_failed', 'onMailError', 10, 1 );
function onMailError( $wp_error ) {
    write_log($wp_error);
    wp_send_json_error(array('data' => false));
}

function wpse_enqueue_datepicker() {
    wp_enqueue_script( 'jquery-ui-datepicker' );
}
add_action( 'wp_enqueue_scripts', 'wpse_enqueue_datepicker' );

function operational_range_hours() {
	wp_enqueue_script(
		'mainjs',
		plugins_url( 'inc/js/main.js', __FILE__)
	);
	$value = get_option('text_settings_mun');
	$range_params = array(
		'range_hours' => $value['range_hours']
	);
	wp_localize_script( 'mainjs', 'rangeParams', $range_params );
}
add_action( 'wp_enqueue_scripts', 'operational_range_hours' );

function irrigation_const() {
	wp_enqueue_script(
		'mainjs',
		plugins_url( 'inc/js/main.js', __FILE__)
	);
	$value = get_option('text_settings_mun');
	$irrigation_const = array(
		'irrigation_const' => $value['irrigation_const']
	);
	wp_localize_script( 'mainjs', 'irrigation_const', $irrigation_const );
}
add_action( 'wp_enqueue_scripts', 'irrigation_const' );

if (!function_exists('modify_jquery')) {
    function modify_jquery() {
        wp_dequeue_script('jquery-core');
        wp_deregister_script('jquery-core');

        wp_register_script('jquery-core', plugins_url('/wo_schedule/inc').'/js/jq.js', false, WO_SCHEDULE_VERSION, 'true');
        wp_enqueue_script('jquery-core');
    }
}
add_action('wp_enqueue_scripts', 'modify_jquery');

function mail_entry_id() {
	$option_name = 'entry_id';
	$newvalue = '1';
	$deprecated = '';
	$autoload = 'no';
	$entry_id = get_option('entry_id');
	$entry_i = '15509';
	if ($entry_id < $entry_i){
		update_option('entry_id', $entry_i, 'no');
	}
	add_option( $option_name, $newvalue, $deprecated, $autoload );
}
add_action('wp_enqueue_scripts',  'mail_entry_id');

class MunSettingsPage{
	
	public $page_slug;
	public $option_group;

	function __construct(){

		$this->page_slug = 'mun_options';
		$this->option_group = 'mun_settings';

		add_action('admin_menu', array( $this, 'mun_func' ) );
		add_action('admin_init',  array( $this, 'settings' ) );
	}

	function mun_func() {
		add_submenu_page(
			'options-general.php',
			'WO schedule form settings',
			'WO schedule',
			'manage_options',
			$this->page_slug,
			array( $this, 'display' ),
			10
		);
	}
	
	function display() {
		?><div class="wrap">
			<h1><?php echo get_admin_page_title() ?></h1>
			<form method="post" action="options.php">
			<?php 
				settings_fields( $this->option_group );
				do_settings_sections( $this->page_slug );
				submit_button();
			?>
			</form>
		</div>
		<?php
	}

	function settings(){
 
		register_setting(
			$this->option_group,
			'text_settings_mun'
		);
	 
		add_settings_section(
			'text_settings_mun',
			'',
			'',
			$this->page_slug
		);
	 
		add_settings_field(
			'text_of_mun',
			'Manager emails',
			[$this, 'field'],
			$this->page_slug,
			'text_settings_mun'
		);
		add_settings_field(
			'title_field', 
			'Email subject', 
			[$this, 'title_field'], 
			$this->page_slug,
			'text_settings_mun'
		);
		add_settings_field(
			'range_hours', 
			'Range operational hours', 
			[$this, 'range_hours'], 
			$this->page_slug,
			'text_settings_mun'
		);
		add_settings_field(
			'irrigation_const', 
			'Const irrigation date', 
			[$this, 'irrigation_const'], 
			$this->page_slug,
			'text_settings_mun'
		);
	}

	function field(){
		$value = get_option( 'text_settings_mun' );
		?>

		<input style="width:100%;" type="text" name="text_settings_mun[text_of_mun]" value="<?php echo isset($value['text_of_mun']) ? $value['text_of_mun'] : "";  ?>" />
		<p>Specify managers emails separated by comma</p>

    <?php
	}
	function title_field(){
		$value = get_option( 'text_settings_mun' );
		?>

		<input style="width:100%;" type="text" name="text_settings_mun[title_field]" value="<?php echo isset($value['title_field']) ? $value['title_field'] : "";  ?>" />

    <?php
	}
	function range_hours(){
		$value = get_option( 'text_settings_mun' );
		?>

		<input type="number" min="0" max="10" name="text_settings_mun[range_hours]" value="<?php echo isset($value['range_hours']) ? $value['range_hours'] : "";  ?>" />

    <?php
	}
	function irrigation_const(){
		$value = get_option( 'text_settings_mun' );
		?>

		<input type="text" min="0" max="10" name="text_settings_mun[irrigation_const]" value="<?php echo isset($value['irrigation_const']) ? $value['irrigation_const'] : "";  ?>" />
		<p>Day-Month</p>

    <?php
	}
}

new MunSettingsPage();