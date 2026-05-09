<?php
require 'connecter_angular.php';

$id = intval($_REQUEST['id']);

if (!$id) {
    return http_response_code(400);
}

$sql = "DELETE FROM `vaisseau_empire` WHERE `id` = {$id} LIMIT 1";

if (mysqli_query($con, $sql)) {
    http_response_code(204);
} else {
    return http_response_code(422);
}
?>
