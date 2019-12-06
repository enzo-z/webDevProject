<?php
if($_SERVER['REQUEST_METHOD'] == 'GET'){
  include_once("connectionpdo.php");
  if(!empty($_GET['id_title'])){
    $busca = $pdo->prepare("SELECT nome FROM titulos WHERE id = :id");
    $busca->bindValue(":id", $_GET['id_title']);
    $busca->execute();
    if($busca->rowCount() > 0){
      $arr = $busca->fetch(PDO::FETCH_ASSOC);
      echo $arr['nome'];
    }
  }else if(!empty($_GET['title_name'])){
    $busca = $pdo->prepare("SELECT id FROM titulos WHERE nome = :name");
    $busca->bindValue(":name", $_GET['title_name']);
    $busca->execute();
    if($busca->rowCount() > 0){
      $arr = $busca->fetch(PDO::FETCH_ASSOC);
      echo $arr['id'];
    }
  }else{
    $busca = $pdo->prepare("SELECT * FROM titulos");
    $busca->execute();
    if($busca->rowCount() > 0 ){
      $arr = $busca->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($arr);
    }
  }
  $busca = NULL;
  $pdo = NULL;
}