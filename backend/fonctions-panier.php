<?php

function creationPanier(){
    if (!isset($_SESSION['panier'])){
        $_SESSION['panier'] = array();
        $_SESSION['panier']['id'] = array();
        $_SESSION['panier']['nom'] = array();
        $_SESSION['panier']['disponible'] = array();
        $_SESSION['panier']['verrou'] = false;
    }
    return true;
}

function ajouterArticle($id, $nom, $disponible){
    if (creationPanier() && !isVerrouille()){
        $positionProduit = array_search($id, $_SESSION['panier']['id']);
        if ($positionProduit === false){
            array_push($_SESSION['panier']['id'], $id);
            array_push($_SESSION['panier']['nom'], $nom);
            array_push($_SESSION['panier']['disponible'], $disponible);
        }
    } else {
        echo "Un problème est survenu, veuillez contacter l'administrateur.";
    }
}

function supprimerArticle($id){
    if (creationPanier() && !isVerrouille()){
        $tmp = array();
        $tmp['id'] = array();
        $tmp['nom'] = array();
        $tmp['disponible'] = array();
        $tmp['verrou'] = $_SESSION['panier']['verrou'];

        for($i = 0; $i < count($_SESSION['panier']['id']); $i++){
            if ($_SESSION['panier']['id'][$i] !== $id){
                array_push($tmp['id'], $_SESSION['panier']['id'][$i]);
                array_push($tmp['nom'], $_SESSION['panier']['nom'][$i]);
                array_push($tmp['disponible'], $_SESSION['panier']['disponible'][$i]);
            }
        }
        $_SESSION['panier'] = $tmp;
        unset($tmp);
    } else {
        echo "Un problème est survenu, veuillez contacter l'administrateur.";
    }
}

function MontantGlobal(){
    $total = 0;
    if (!isset($_SESSION['panier']['id'])) return $total;
    for($i = 0; $i < count($_SESSION['panier']['id']); $i++){
        $total += $_SESSION['panier']['id'][$i];
    }
    return $total;
}

function supprimePanier(){
    unset($_SESSION['panier']);
}

function isVerrouille(){
    if (isset($_SESSION['panier']) && $_SESSION['panier']['verrou'])
        return true;
    else
        return false;
}

?>
