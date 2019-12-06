<?php
$host = 'localhost';
$db = 'technote';
$login = 'root';
$password = '';
$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $login, $password);