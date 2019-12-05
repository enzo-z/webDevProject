<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
  if(!empty($_POST['cond'])){
    $pdo = new PDO("mysql:host=localhost;dbname=technote", 'ezamora', 'programador10Z-');
    $update = $pdo->prepare("UPDATE notes SET tema = :theme, texto = :anotation, id_titulos = :id_title WHERE id = :id");
    $update->bindValue(":theme", $_POST['theme']);
    $update->bindValue(":anotation", $_POST['anotation']);
    $update->bindValue(":id_title", $_POST['id_title']);
    $update->bindValue(":id", $_POST['id']);
    $update->execute();
  }else{
    $pdo = new PDO("mysql:host=localhost;dbname=technote", 'ezamora', 'programador10Z-');
    $insert = $pdo->prepare("INSERT INTO notes VALUES(DEFAULT, :theme, :anotation, :id_title)");
    $insert->bindValue(":theme", $_POST['theme']);
    $insert->bindValue(":anotation", $_POST['anotation']);
    $insert->bindValue(":id_title", $_POST['id_title']);
    $insert->execute();
  }
}
if($_SERVER['REQUEST_METHOD'] == 'GET'){
  if(!empty($_GET['current_id_title'])){
    $pdo = new PDO("mysql:host=localhost;dbname=technote", 'ezamora', 'programador10Z-');
    $busca = $pdo->prepare("SELECT * FROM notes WHERE id_titulos = :current_id_title");
    $busca->bindValue(":current_id_title", $_GET['current_id_title']);
    $busca->execute();
    if($busca->rowCount() > 0){
      echo json_encode($busca->fetchAll(PDO::FETCH_ASSOC));
    }else{
      echo json_encode(["response"]);
    }
  }
}
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
  //$headerStringValue = $_SERVER['HTTP_ID'];
  $pdo = new PDO("mysql:host=localhost;dbname=technote", 'ezamora', 'programador10Z-');
  $insert = $pdo->prepare("DELETE FROM notes WHERE id = :id ");
  $insert->bindValue(":id", intval($_SERVER['HTTP_ID']));
  $insert->execute();
}