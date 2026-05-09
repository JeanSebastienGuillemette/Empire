<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


// identifiants de base de données 
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'Empire123');
define('DB_NAME', 'empire_backend');

// Connectez-vous à la base de données 
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  //if (mysqli_connect_errno($connect)) {
    //die("Erreur de connection:" . mysqli_connect_error());
  //}

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();

?>