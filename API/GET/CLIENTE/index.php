<?php

require_once '../../../CONEXAO_DB/db_con.php';

if (isset($_GET["cnpj"])){

    if(GET_CLIENTE($_GET["cnpj"]) != ""){
        echo GET_CLIENTE($_GET["cnpj"]);
    }
}