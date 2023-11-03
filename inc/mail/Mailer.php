<?php
    namespace wo_schedule\inc\mail;

class Mailer
{
    public $body;
    public $result;
    public $mails;
    public $message;
    public $subject;
    public $headers;
    public function __construct($body)
    {
        $this->body = $body;
        $value = get_option('text_settings_mun');
        $entry_id = get_option('entry_id');
        $values = explode(",", $value['text_of_mun']);
        $this->mails = $values;
        // $this->mails = ['zetov.ruslan@gmail.com'];
        $this->subject = $value['title_field'] . ' -- Entry #' .  $entry_id;
        $entry_id++;
        update_option('entry_id', $entry_id, 'no');
        $this->headers = array(
            'From: ' . $body['email'] . ' ' . '<admin@asper.pro>',
            'Reply-To: ' . $body['email'] . ' ',
            'content-type: text/html',
        );
    }
    public function sendToCommercial(){
        foreach ($this->mails as $mail){
            wp_mail($mail, $this->subject, $this->message, $this->headers);
        }
    }
    public function sendToResidential(){
        foreach ($this->mails as $mail){
            wp_mail($mail, $this->subject, $this->message, $this->headers);
        }
    }

    public function sendMail(){
        $body = new RenderMassage($this->body);
        $this->message = $body->render_massage();
        if($this->body['type'] == 'commercial')
        {
            $this->sendToCommercial();
        } else {
            $this->sendToResidential();
        };
        return array(
            "data" => true
        );
    }
}