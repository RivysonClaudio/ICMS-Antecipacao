<?php

require_once '../../../CONEXAO_DB/db_con.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $CNPJ = $_POST["CNPJ"];
    $CNPJ = str_replace(".", "", $CNPJ);
    $CNPJ = str_replace("/", "", $CNPJ);
    $CNPJ = str_replace("-", "", $CNPJ);

    if (GET_CLIENTE($CNPJ) != ""){
        echo "Cliente já cadastrado na base de dados.";
    }else{
        echo INSERT_CLIENTE($CNPJ, $_POST["MVA"], $_POST["TRIBUTACAO"], $_POST["SITUACAO"]);
    }
}