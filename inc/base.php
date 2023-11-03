<?php
function do_querys() {
    global $wpdb;
    $array_query = array();
    $array_query['query_users'] = 'CREATE TABLE IF NOT EXISTS `mun_user` ( 
    `id` INT NOT NULL , 
    `first_name` TEXT NOT NULL , 
    `last_name` TEXT NOT NULL , 
    `email` TEXT NOT NULL , 
    `phone` TEXT NOT NULL , 
    `phone_type` TEXT NOT NULL , 
    `cnn_or_id` TEXT NULL ) ';

    $array_query['query_company'] = 'CREATE TABLE IF NOT EXISTS `mun_site` ( 
    `id` INT NOT NULL , 
    `name` VARCHAR(30) NOT NULL , 
    `last_name` VARCHAR(30) NOT NULL , 
    `phone` VARCHAR(20) NOT NULL , 
    `email` VARCHAR(50) NOT NULL )';

    $array_query['query_contact']  ='CREATE TABLE IF NOT EXISTS `mun_company` ( 
    `id` INT NOT NULL , 
    `name` VARCHAR(30) NOT NULL , 
    `last_name` VARCHAR(30) NOT NULL , 
    `address` VARCHAR(50) NOT NULL , 
    `address2` VARCHAR(50) NULL , 
    `city` VARCHAR(50) NOT NULL , 
    `state` VARCHAR(20) NOT NULL , 
    `zip` VARCHAR(15) NOT NULL )';

    $array_query['query_mailing'] = 'CREATE TABLE IF NOT EXISTS `mun_contact` ( 
    `id` INT NOT NULL , 
    `name` VARCHAR(30) NOT NULL , 
    `last_name` VARCHAR(30) NOT NULL , 
    `address` VARCHAR(50) NOT NULL , 
    `address2` VARCHAR(50) NULL , 
    `city` VARCHAR(50) NOT NULL , 
    `state` VARCHAR(20) NOT NULL , 
    `zip` VARCHAR(15) NOT NULL )';

    $array_query['query_mailing'] = 'CREATE TABLE IF NOT EXISTS `mun_mailing` (
    `id` INT NOT NULL , 
    `name` VARCHAR(30) NOT NULL , 
    `last_name` VARCHAR(30) NOT NULL , 
    `address` VARCHAR(50) NOT NULL , 
    `address2` VARCHAR(50) NULL , 
    `city` VARCHAR(50) NOT NULL , 
    `state` VARCHAR(20) NOT NULL , 
    `zip` VARCHAR(15) NOT NULL )';


    $array_query['query_billing'] = 'CREATE TABLE IF NOT EXISTS `mun_billing` ( 
    `id` INT NOT NULL , 
    `name` VARCHAR(50) NOT NULL , 
    `last` VARCHAR(50) NOT NULL , 
    `phone` VARCHAR(50) NOT NULL , 
    `email` VARCHAR(50) NOT NULL )';

    $array_query['query_access'] = 'CREATE TABLE IF NOT EXISTS `mun_access` ( 
    `id` INT NOT NULL , 
    `type` VARCHAR(50) NOT NULL , 
    `lockbox_location` VARCHAR(50) NULL , 
    `lockbox_code` VARCHAR(50) NULL )';

    $array_query['query_additional'] = 'CREATE TABLE IF NOT EXISTS  `mun_additional` ( 
    `id` INT NOT NULL , 
    `text` VARCHAR(50) NOT NULL )';

    foreach ($array_query as $item){
        $wpdb->query( $item );
    }
}
do_querys();