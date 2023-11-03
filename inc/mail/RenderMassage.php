<?php


namespace wo_schedule\inc\mail;


class RenderMassage
{
    public $body;
    public $massage;
    public function __construct($body)
    {
       $this->body =  $body;
    }

    public function parse_key($key,$value){
        $custom_massage = false;
        switch ($key){
            case 'type':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>Is the Backflow Assembly located at a Commercial or Residential Property?</div>";
                break;
            case 'CID':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>CID # (Customer Identification Number)</div>";
                break;
            case 'email':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Email</div>";
                break;
            case 'CCN':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>CCN # or Site ID #</div>";
                break;
            case 'first_name':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>NAME:</div>";
                $this->massage .= "<div class='value' style='padding: 10px;'>".$this->body['first_name']." ".$this->body['second_name']."</div>";
                $custom_massage = true;
                break;
            case 'phone':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Phone:</div>";
                break;
            case 'phone_type':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Is ".$this->body['phone']." Mobile, Home or Work number?</div>";
                break;
            case 'other':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Phone comment:</div>";
                break;
            case 'contact_update':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>WILL ".$this->body['first_name']." ".$this->body['second_name']."BE THE CONTACT FOR SCHEDULING / UPDATES?</div>";
                break;
            case 'site_first_name':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>SITE CONTACT NAME:</div>";
                $this->massage .= "<div class='value' style='padding: 10px;'>".$this->body['site_first_name']." ".$this->body['site_last_name']."</div>";
                $custom_massage = true;
                break;
            case 'site_phone':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Site Contact Phone #</div>";
                break;
            case 'site_email':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Site Contact Email</div>";
                break;
            case 'company_name':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Company or Business Name:</div>";
                break;
            case 'wage':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Is the work at ".$this->body['company_name']." to be performed subject to Prevailing Wage?</div>";
                break;
            case 'mailing_billing':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>IS THE MAILING AND BILLING ADDRESS THE SAME AS THE SITE ADDRESS ENTERED ABOVE?</div>";
                break;
            case 'third_party':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Do you use a third party billing company?</div>";
                break;
            case 'input_open':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>HOURS OF OPERATION:</div>";
                break;
            case 'billing_attention':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>BILLING ATTENTION TO:</div>";
                break;
            case 'billing_address':
                $add = empty($this->body['billing_address_line']) ? "" : "<span>".$this->body['billing_address_line']."</span><br>";
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>BILLING ADDRESS</div>";
                $this->massage .= "<div class='value' style='padding: 10px'>
                                    <span>".$this->body['billing_address']."</span><br>"
                                    . $add .
                                    "<span>".$this->body['billing_city']."</span><br>
                                    <span>".$this->body['billing_state']."</span><br>
                                    <span>".$this->body['billing_zip']."</span>
                                    </div>";
                $custom_massage = true;
                break;
            case 'mailing_address':
                $add = empty($this->body['mailing_address_line']) ? ""  : "<span>".$this->body['mailing_address_line']."</span><br>";
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>MAILING ADDRESS</div>";
                $this->massage .= "<div class='value' style='padding: 10px;'>
                                    <span>".$this->body['mailing_address']."</span><br>"
                                    . $add .
                                    "<span>".$this->body['mailing_city']."</span><br>
                                    <span>".$this->body['mailing_state']."</span><br>
                                    <span>".$this->body['mailing_zip']."</span>
                                    </div>";
                $custom_massage = true;
                break;
            case 'comment':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>ADDITIONAL Comment(s) or Question(s):</div>";
                break;
            case 'address':
                $add = empty($this->body['address_line']) ? ""  : "<span>".$this->body['address_line']."</span><br>";
                $addCity = empty($this->body['city']) ? ""  : $this->body['city'];
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>SITE ADDRESS OF BACKFLOW ASSEMBLY / DEVICE(S) FOR TESTING:</div>";
                $this->massage .= "<div class='value' style='padding: 10px;'>
                                    <span>".$this->body['address']."</span><br>"
                                    . $add .
                                    "<span>".$addCity."</span><br>
                                    <span>".$this->body['state']."</span><br>
                                    <span>".$this->body['zip']."</span>
                                    </div>";
                $custom_massage = true;
                break;
            case 'operational_time':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>OPERATIONAL TIME:</div>";
                break;
            case 'adress_type':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>THE SITE ADDRESS IS:</div>";
                break;
            case 'access_type':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>HOW WILL THE TECHNICIAN GAIN ACCESS TO THE SITE / BACKFLOW DEVICES?:</div>";
                break;
            case 'lockbox_location':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>DESCRIBE LOCATION OF LOCKBOX?:</div>";
                break;
            case 'lockbox_code':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>LOCKBOX CODE:</div>";
                break;
            case 'bill_mail_name':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>BILLING /MAILING ATTENTION TO:</div>";
                break;
            case 'site_contact_first':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>SITE CONTACT NAME:*</div>";
                $this->massage .="<div class='value' style='padding: 10px;'>".$this->body['site_contact_first']." ".$this->body['site_contact_last']."</div>";
                $custom_massage = true;
                break;
            case 'site_contact_phone':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Site Contact Phone #</div>";
                break;
            case 'site_contact_email':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Site Contact Email</div>";
                break;
            case 'gated':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>IS THIS A GATED COMMUNITY?</div>";
                break;
            case 'gated_text':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Please add Gate Instructions for the Technician below.</div>";
                break;
            case 'email_comment':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>Comment:</div>";
                break;
            case 'location_comment_with_no_data':
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>PLEASE PROVIDE ANY SPECIAL PARKING INSTRUCTIONS, SUCH AS, CAN THE TECHNICIAN PARK IN THE DOCK / PARKING VOUCHERS, ETC....</div>";
                break;
            case 'bill_mail_address':
                $add = empty($this->body['bill_mail_address_line']) ? ""  : "<span>".$this->body['bill_mail_address_line']."</span><br>";
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;'>BILLING/MAILING ADDRESS</div>";
                $this->massage .= "<div class='value' style='padding: 10px;'>
                                    <span>".$this->body['bill_mail_address']."</span><br>" 
                                    . $add .
                                    "<span>".$this->body['bill_mail_city']."</span><br>
                                    <span>".$this->body['bill_mail_zip']."</span>
                                    </div>";
                $custom_massage = true;
                break;
            case 'site_choice':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">WILL '.$this->body['first_name'].' '.$this->body['second_name']. ' BE THE SITE CONTACT FOR THE SCHEDULING / UPDATES?*</div>';
                break;
            case 'rental_first_name':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">RENTAL TENANT NAME:</div>';
                $this->massage .= '<div class="value" style="padding: 10px;">'.$this->body['rental_first_name'].' '.$this->body['rental_last_name'].'</div>';
                $custom_massage = true;
                break;
            case 'rental_phone':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">RENTAL TENANT PHONE:</div>';
                break;
            case 'rental_email':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">RENTAL TENANT EMAIL:</div>';
                break;
            case 'commercial_location':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">THE SITE LOCATION YOU ENTERED IS IN CHICAGO. IS THIS DOWNTOWN, IN THE LOOP?</div>';
                break;
            case 'lawn':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">IS THIS FOR YOUR LAWN IRRIGATION / LAWN SPRINKLERS?</div>';
                break;
            case 'device_location':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">DEVICE LOCATION?</div>';
                break;
            case 'turned_on':
                $this->massage .= '<div class="title" style="width:100%;background-color: #A0FFA0;padding: 10px;font-size:16px;">Please choose the earliest date that you or your Irrigation Company will have the Backflow Device(s) installed and water turned on by.</div>';
                break;
            case 'second_name':
            case 'site_last_name':
            case 'billing_address_line':
            case 'billing_city':
            case 'billing_state':
            case 'billing_zip':
            case 'mailing_address_line':
            case 'mailing_city':
            case 'mailing_state':
            case 'mailing_zip':
            case 'address_line':
            case 'city':
            case 'state':
            case 'zip':
            case 'site_contact_last':
            case 'bill_mail_address_line':
            case 'bill_mail_city':
            case 'bill_mail_zip':
            case 'rental_last_name':
                $custom_massage = true;
                break;
//            default:
//                $this->massage .= "<div class='title'>".$key." @error</div>";
        }
        if ($custom_massage == false ){
            $this->massage .= "<div class='value' style='padding: 10px;'>".$value." </div>";
        }
    }
    public function render_massage(){
        $this->massage = '';
        foreach ($this->body as $key => $value){
            $this->parse_key($key,$value);
        }
        return $this->massage;
    }
}