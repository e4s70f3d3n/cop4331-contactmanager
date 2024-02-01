<?php

$host = "localhost";
$username = "TheBeast";
$password = "WeLoveCOP4331";
$dbname = "COP4331";

$conn = new mysqli_connect($host, $username, $password, $dbname);

if(!$conn) {

    die("Connection Failed: " . mysqli_connect_error());
}

?>