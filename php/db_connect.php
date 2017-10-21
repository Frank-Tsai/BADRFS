<?php
$db_host = "localhost";
$db_name = "tsuhao";
$db_user = "tsuhao";
$db_password = "2diirxli";
$dsn = "mysql:host=$db_host;dbname=$db_name";
$db = new PDO($dsn, $db_user, $db_password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
?>