<?php

$host = 'localhost';
$user = 'laservicos';
$password = 'lacont08';
$database = 'ncm';

function GET_CONECTION(){

    global $host, $user, $password, $database;

    if (mysqli_connect($host, $user, $password, $database)){
        return mysqli_connect($host, $user, $password, $database);
    }else{
        echo '<script> alert("Não foi possível estabelecer uma conexão com o banco de dados.") </script>';
    }
}