<?php
require 'connecter_angular.php';
$query = null;
$table_data = null;
// Obtenez les données publiées
$postdata = file_get_contents("php://input");

// Extraire les données. 
$array = json_decode($postdata, true);
//Supprimer les données
$sql66 = "DELETE FROM  vaisseau_empire WHERE id > 0;";      
$result = mysqli_query($con,$sql66);

          foreach($array as $row) //Extract the Array Values by using Foreach Loop
          {
           $query .= "INSERT INTO `vaisseau_empire` (`id`, `nom`, `statut`) VALUES (NULL, '".$row["name"]."', '".$row["status"]."'); ";  // Make Multiple Insert Query 
           $table_data .= '
            <tr>
       <td>'.$row["id"].'</td>
       <td>'.$row["name"].'</td>
       <td>'.$row["status"].'</td>
      </tr>'; //Data for display on Web page
          }
          if(mysqli_multi_query($con, $query)) //Run Mutliple Insert Query
          {
            http_response_code(204);
          }
          else
          {
            return http_response_code(422);
          } 
?> 