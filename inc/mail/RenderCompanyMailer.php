<?php


namespace wo_schedule\inc\mail;


class RenderCompanyMailer
{
    public $body;
    public $massage;
    public $type;
    public $first_contact;
    public function __construct($body,$type)
    {
        $this->body =  $body;
        $this->type = $type;
        $this->first_contact;
    }

    public function render_massage(){

        if (!empty($this->body)){
            if (!empty($this->type)){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>Is the Backflow Assembly located at a Commercial or Residential Property?</div>";
                $this->massage .= "<div class='value' style='padding: 10px;'>".$this->type." </div>";
            }
            if (!empty($this->body['company_id'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>CID # (Customer Identification Number)</div>";
                $this->massage .= "<div class='value' style='padding: 10px;'>".$this->body['company_id']." </div>";
            }
            if (!empty($this->body['company_name'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>Company or Business Name:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['company_name']." </div>";
            }
            if (!empty($this->body['contacts'])){
                $one_time = false;
                foreach ($this->body['contacts'] as $value){
                    if($one_time == false){
                        $this->massage .="<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>Email</div>".
                                        "<div class='value' style='padding: 10px;'>".$value['email']." </div>".
                                        "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>NAME:</div>".
                                        "<div class='value' style='padding: 10px;'>".$value['first_name']." ".$value['last_name']." </div>";
                        $one_time = true;
                    }
                }
            }
            if (!empty($this->body['company_phone_numbers'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>Phone:</div>";
                foreach ($this->body['company_phone_numbers'] as $value){
                    $this->massage .= "<div class='value' style='padding: 10px;'>".$value['value']." ".$value['type']." ".$value['ext']." </div>";
                }
            }
            if (!empty($this->body['addresses'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>SITE ADDRESS OF BACKFLOW ASSEMBLY / DEVICE(S) FOR TESTING:</div>";
                foreach ($this->body['addresses'] as $key => $value){
                    $add = empty($value['address_line2']) ? ""  : "<div class='value' style='padding: 0px 10px;'>".$value['address_line2']." </div>";
                    $this->massage .= "<div class='value' style='padding: 10px 10px 0px 10px;'>".$value['address_line1']." </div>".
                                     $add .
                                     "<div class='value' style='padding: 0px 10px;'>".$value['locality']." </div>".
                                     "<div class='value' style='padding: 0px 10px;'>".$value['administrative_area']." </div>".
                                     "<div class='value' style='padding: 0px 10px 10px 10px;'>".$value['postal_code']." </div>";
                    break;
                }
            }
            if (!empty($this->body['adress_type'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>THE SITE ADDRESS IS:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['adress_type']." </div>";
            }
            if (!empty($this->body['access_type'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>HOW WILL THE TECHNICIAN GAIN ACCESS TO THE SITE / BACKFLOW DEVICES?</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['access_type']." </div>";
            }
            if (!empty($this->body['lockbox_location'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>LOCKBOX LOCATION:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['lockbox_location']." </div>";
            }
            if (!empty($this->body['lockbox_code'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>LOCKBOX CODE:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['lockbox_code']." </div>";
            }
            if (!empty($this->body['commercial_location'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>THE SITE LOCATION YOU ENTERED IS IN CHICAGO. IS THIS DOWNTOWN, IN THE LOOP?</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['commercial_location']." </div>";
            }
            if (!empty($this->body['location_comment'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>PARKING INSTRUCTIONS:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['location_comment']." </div>";
            }
            if (!empty($this->body['lawn'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>IS THIS FOR YOUR LAWN IRRIGATION / LAWN SPRINKLERS?</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['lawn']." </div>";
            }
            if (!empty($this->body['device_location'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>DEVICE LOCATION?</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['device_location']." </div>";
            }
            if (!empty($this->body['operational_time'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>OPERATIONAL TIME:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['operational_time']." </div>";
            }
            if (!empty($this->body['rental_first_name'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>RENTAL DATA:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['rental_first_name']." ".$this->body['rental_last_name']." </div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['rental_phone']." </div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['rental_email']." </div>";
            }
            if (!empty($this->body['gated_text'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>GATED COMMUNITY:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['gated_text']." </div>";
            }
            if (!empty($this->body['turned_on'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>IRRIGATION DATE:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['turned_on']." </div>";
            }
            if (!empty($this->body['email_comment'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>COMMENT:</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['email_comment']." </div>";
            }
            if (!empty($this->body['location_comment_with_no_data'])){
                $this->massage .= "<div class='title' style='width:100%;background-color: #A0FFA0; padding: 10px;font-size:16px;'>PLEASE PROVIDE ANY SPECIAL PARKING INSTRUCTIONS, SUCH AS, CAN THE TECHNICIAN PARK IN THE DOCK / PARKING VOUCHERS, ETC....</div>".
                                    "<div class='value' style='padding: 10px;'>".$this->body['location_comment_with_no_data']." </div>";
            }
        }
        return $this->massage;
    }
}