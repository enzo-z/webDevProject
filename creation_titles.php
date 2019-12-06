<?php
//if($_SERVER['REQUEST_METHOD'] == 'POST'){
function buscaTitulos(){
    include("connectionpdo.php");
    $busca = $pdo->prepare("SELECT nome FROM titulos");
    $busca->execute();
    if($busca->rowCount() > 0){
        $registeredTitles = ($busca->fetchAll(PDO::FETCH_ASSOC));    
        //Query de Inserção
        $busca = NULL;
        $pdo = NULL;
        return $registeredTitles;
    }
}
function comparaTitulos($titleCreated, $registeredTitles){
    $cond = false;
    for ($i=0; $i < sizeof($registeredTitles) ; $i++) { 
        if($titleCreated != strtolower($registeredTitles[$i]['nome'])){
            $cond = true;

        }
        else{
            $cond = false;
            break;
        }
    }
    return $cond;
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(!empty($_POST['titleCreated'])){
        $titleCreated = strtolower($_POST['titleCreated']);
        if(comparaTitulos($titleCreated, buscaTitulos())){
            include("connectionpdo.php");
            $insert = $pdo->prepare("INSERT INTO titulos VALUES (NULL, :titleCreated);");
            $insert->bindValue(":titleCreated", $_POST['titleCreated']);
            $insert->execute();
            $insert = NULL;
            $pdo = NULL;
        }
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if($_POST['type'] == 'delete'){
        include('connectionpdo.php');
        $delete = $pdo->prepare("DELETE FROM titulos WHERE nome = :titleDeleted");
        $delete->bindValue(":titleDeleted", $_POST['titleDeleted']);
        $delete->execute();
        if($delete->rowCount() < 1){
            echo 'error';
        }
        $delete = NULL;
        $pdo = NULL;
    }
}
