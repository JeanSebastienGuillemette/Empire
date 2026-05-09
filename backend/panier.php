<?php
session_start();
include_once("fonctions-panier.php");

@$action = $_REQUEST['action'];
@$id = $_REQUEST['id'];
@$nom = $_REQUEST['nom'];
@$disponible = $_REQUEST['disponible'];

switch($action){
    case "ajouter":
        ajouterArticle($id, $nom, $disponible);
        break;
    case "suppression":
        supprimerArticle($id);
        break;
    case "refresh":
        break;
    case "vider":
        supprimePanier();
        break;
    default:
        break;
}

$transport = 20;
$taxe = 15;
$sousTotal = MontantGlobal();
$total = $sousTotal + $transport + $taxe;
$totalFormate = number_format($total, 2, '.', '');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Panier - Vaisseaux de l'Empire</title>
    <meta charset="UTF-8">
    <style>
        body { background-color: #0d0d0d; color: #e0e0e0; font-family: Arial, sans-serif; padding: 20px; }
        h2, h3 { color: #cc0000; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 1px solid #2a2a2a; padding: 8px 12px; }
        tr:nth-child(even) { background-color: #1a1a1a; }
        a { color: #cc0000; }
        input[type="submit"] { background-color: #cc0000; border: none; color: #fff; padding: 6px 16px; cursor: pointer; margin-top: 8px; }
        #paypal-button-container { margin-top: 16px; max-width: 400px; }
    </style>
</head>
<body>
<center>

<h2>Votre panier - Vaisseaux de l'Empire</h2>

<form method="post" action="panier.php">
<table style="width: 600px; border-collapse: collapse;">
    <tr>
        <td colspan="4"><strong>Articles dans votre panier</strong></td>
    </tr>
    <tr>
        <td>id</td>
        <td>Vaisseau</td>
        <td>Statut</td>
        <td>Action</td>
    </tr>
    <?php
    if (creationPanier()){
        $nbArticles = count($_SESSION['panier']['id']);
        if ($nbArticles <= 0)
            echo "<tr><td colspan='4'>Votre panier est vide</td></tr>";
        else {
            for ($i = 0; $i < $nbArticles; $i++){
                echo "<tr>";
                echo "<td>".htmlspecialchars($_SESSION['panier']['id'][$i])."</td>";
                echo "<td>".htmlspecialchars($_SESSION['panier']['nom'][$i])."</td>";
                echo "<td>".htmlspecialchars($_SESSION['panier']['disponible'][$i])."</td>";
                echo "<td><a href='".htmlspecialchars("panier.php?action=suppression&id=".rawurlencode($_SESSION['panier']['id'][$i]))."'>Supprimer</a></td>";
                echo "</tr>";
            }
            echo "<tr><td colspan='2'><strong>Sous-total</strong></td><td colspan='2'>".number_format($sousTotal, 2, ',', ' ')." $</td></tr>";
            echo "<tr><td colspan='2'><strong>Transport</strong></td><td colspan='2'>".number_format($transport, 2, ',', ' ')." $</td></tr>";
            echo "<tr><td colspan='2'><strong>Taxes</strong></td><td colspan='2'>".number_format($taxe, 2, ',', ' ')." $</td></tr>";
            echo "<tr><td colspan='2'><strong>Total</strong></td><td colspan='2'>".number_format($total, 2, ',', ' ')." $</td></tr>";
            echo "<tr><td colspan='4'>";
            echo "<input type='submit' value='Rafraîchir'/>";
            echo "<input type='hidden' name='action' value='refresh'/>";
            echo "</td></tr>";
        }
    }
    ?>
</table>
</form>

<?php if ($total > 0): ?>
<br>
<h3>Procéder au paiement : <?php echo number_format($total, 2, ',', ' '); ?> $</h3>
<div id="paypal-button-container"></div>

<script src="https://www.paypal.com/sdk/js?client-id=AcWPbUkWFyjzClMk6lMAfO3hdyvjLpZ2jFFnE7A5Z9RM6ez-H3gcWz3xJG8DXEwNf92nCZJTSXR560JL&currency=CAD"></script>
<script>
    function initPayPalButton() {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: "Vaisseaux de l'Empire",
                        amount: {
                            currency_code: "CAD",
                            value: "<?php echo $totalFormate; ?>"
                        }
                    }]
                });
            },

            onApprove: function(data, actions) {
                console.log('Order approved', data.orderID, data.payerID);
                fetch('panier.php?action=vider').then(function() {
                    document.getElementById('paypal-button-container').innerHTML = '<h3>Merci pour votre paiement!</h3>';
                    document.querySelector('form table').innerHTML = '<tr><td colspan="4">Votre panier est vide</td></tr>';
                    document.querySelector('h3').style.display = 'none';
                });
            },

            onError: function(err) {
                console.log(err);
            }
        }).render('#paypal-button-container');
    }
    initPayPalButton();
</script>
<?php endif; ?>

<br>
<p><a href="https://php.dinf.ca/projet/h2026/2353935/vaisseaux">Retour aux vaisseaux !!!</a></p>

</center>
</body>
</html>
