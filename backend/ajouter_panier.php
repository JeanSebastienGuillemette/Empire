<?php
session_start();
include_once("fonctions-panier.php");
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

$id = $_REQUEST['id'];
$nom = $_REQUEST['nom'];
$disponible = $_REQUEST['disponible'];

ajouterArticle($id, $nom, $disponible);
echo json_encode(['success' => true]);
