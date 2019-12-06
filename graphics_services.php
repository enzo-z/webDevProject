<?php
include_once("connectionpdo.php");
//id_titulo para caso queira fazer alguma coisa a mais
$busca = $pdo->prepare("SELECT titulos.nome, titulos.id  AS 'id_titulo', 
    COUNT(notes.id_titulos) AS 'qntd_cards' 
        FROM titulos 
            INNER JOIN notes ON titulos.id = notes.id_titulos 
            GROUP BY titulos.nome, titulos.id 
                ORDER BY titulos.id"); 
$busca->execute();
if($busca->rowCount() > 0){
    $arr = $busca->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($arr);
}
$busca = null;
$pdo = null;
    