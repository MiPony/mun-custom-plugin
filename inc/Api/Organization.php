<?php


namespace wo_schedule\inc\Api;


class Organization
{

    public $cid;
    public $email;
    public function __construct(string $cid,string $email)
    {
        $this->cid = $cid;
        $this->email = $email;
        return $this;
    }
}