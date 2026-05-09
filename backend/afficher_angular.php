<?php
/**
 * Renvoie la liste des voitures
 */
require 'connecter_angular.php';

$voit = [];
$sql = "SELECT id, nom, statut FROM vaisseau_empire";
$final = '[';
if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
      if ($cr > 0){
        $final .= ',';    
      }
    $vaiss[$cr]['id']    = $row['id'];
    $vaiss[$cr]['nom'] = $row['nom'];
    $vaiss[$cr]['statut'] = $row['statut'];
    $cr++;

    //Contruire la chaine de donnees au format accepter par Angular !!!
    $final .= '{"id":'.$row['id'].',"name":"'.$row['nom'].'","status":"'.$row['statut'].'"}';
  }
  $final .= ']'; 

  echo $final; //Envoie a Angular Frontend
  //echo json_encode(['data'=>$tuto]);
}
else
{
  http_response_code(404);
}
?>