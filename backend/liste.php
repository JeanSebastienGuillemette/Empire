<HTML>
<HEAD>
<TITLE>Liste des Vaisseaux de l'Empire</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</HEAD>
<BODY>
<CENTER>
    <?php
    require 'connecter_angular.php';
    header('Content-Type: text/html; charset=UTF-8');

    $query2 = "SELECT * FROM vaisseau_empire ORDER BY id;";
    $result2 = $con->query($query2);

    echo "Vaisseaux disponibles à l'achat !<P>";

    echo "<TABLE border=1>";
    echo "<TR><TD>id</TD><TD>Vaisseau</TD><TD>Statut</TD><TD>Action</TD></TR>";

    while ($val = $result2->fetch_assoc()){
        $bouton = "<a href='panier.php?action=ajouter&id=".$val["id"]."&nom=".$val["nom"]."&disponible="
            .$val["statut"]."' onclick='window.open(this.href, \"\", \"toolbar=no, location=no, directories=no, status=yes, scrollbars=yes, resizable=yes, copyhistory=no, width=600, height=350\"); return false;'>Ajouter au panier</a>";

        echo "<TR><TD>".$val["id"]."</TD><TD>".$val["nom"]."</TD><TD>".$val["statut"]."</TD><TD>".$bouton."</TD></TR>";
    }

    echo "</TABLE>";
    $result2->free();
    $con->close();
    ?>
<P><A HREF="panier.php">Voir le Panier !!!</A><P>
</CENTER>
</BODY>
</HTML>
