<?php


namespace wo_schedule\inc\mail;
use wo_schedule\inc\mail\RenderMassage;

class CompanyMailer
{
    public $body;
    public $result;
    public $mails;
    public $message;
    public $subject;
    public $headers;
    public $type;
    public function __construct($body,$type)
    {
        $this->body = $body;
        $this->type = $type;
        $value = get_option('text_settings_mun');
        $entry_id = get_option('entry_id');
        $values = explode(",", $value['text_of_mun']);
        $this->mails = $values;
        // $this->mails = ['zetov.ruslan@gmail.com'];
        $this->subject = $value['title_field'] . ' -- Entry #' .  $entry_id;
        $entry_id++;
        update_option('entry_id', $entry_id, 'no');
        foreach ($this->body['contacts'] as $value){
            $email = $value['email'];
            break;
        }
        $this->headers = array(
            'From: ' . $email . ' ' . '<admin@asper.pro>',
            'Reply-To: ' . $email . ' ',
            'content-type: text/html',
        );
    }

    public function sendMail(){
        $render = new RenderCompanyMailer($this->body,$this->type);
        $render->render_massage();
        $this->message = $render->massage;
        foreach ($this->mails as $mail){
            wp_mail($mail, $this->subject, $this->message, $this->headers);
        }
        wp_send_json(array(
            "data" => true
        ));
    }
}