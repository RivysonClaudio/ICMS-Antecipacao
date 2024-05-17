<?php

require_once '../../../CONEXAO_DB/db_con.php';
require_once '../../GET/CLIENTE/index.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $CNPJ = $_POST["CNPJ"];
    $CNPJ = str_replace(".", "", $CNPJ);
    $CNPJ = str_replace("/", "", $CNPJ);
    $CNPJ = str_replace("-", "", $CNPJ);
    $ALSN4 = $_POST["ALSN4"] == ""? 0: str_replace(".", "", $_POST["ALSN4"]);
    $ALSN7 = $_POST["ALSN7"] == ""? 0: str_replace(".", "", $_POST["ALSN7"]);
    $ALSN12 = $_POST["ALSN12"] == ""? 0: str_replace(".", "", $_POST["ALSN12"]);

    if (GET_CLIENTE($CNPJ) != ""){
        echo UPDATE_CLIENTE($CNPJ, $_POST["MVA"], $_POST["TRIBUTACAO"], $_POST["SITUACAO"], $ALSN4, $ALSN7, $ALSN12);
    }else{
        echo INSERT_CLIENTE($CNPJ, $_POST["MVA"], $_POST["TRIBUTACAO"], $_POST["SITUACAO"], $ALSN4, $ALSN7, $ALSN12);
    }
}

function INSERT_CLIENTE($CNPJ, $MVA, $TRIBUTACAO, $SITUACAO, $ALSN4, $ALSN7, $ALSN12){
    $conn = GET_CONECTION();

    $query = "INSERT INTO cliente (cnpj, mva, tributacao, situacao, alsn4, alsn7, alsn12) VALUES ('$CNPJ', '$MVA', '$TRIBUTACAO', '$SITUACAO', '$ALSN4', '$ALSN7', '$ALSN12');";
    
    mysqli_query($conn, $query);

    mysqli_close($conn);

    return "Cliente salvo na base de dados.";
}

function UPDATE_CLIENTE($CNPJ, $MVA, $TRIBUTACAO, $SITUACAO, $ALSN4, $ALSN7, $ALSN12){
    $conn = GET_CONECTION();

    $query = "UPDATE cliente SET mva = $MVA, tributacao = $TRIBUTACAO, situacao = $SITUACAO, alsn4 = $ALSN4, alsn7 = $ALSN7, alsn12 = $ALSN12 WHERE cnpj = $CNPJ;";

    mysqli_query($conn, $query);

    mysqli_close($conn);

    return "Cliente já cadastrado no Banco de dados: Informações Atualizadas.";
}