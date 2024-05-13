<?php

require_once '../../../CONEXAO_DB/db_con.php';

if (isset($_GET["cnpj"])){

    if(GET_CLIENTE($_GET["cnpj"]) != ""){
        echo GET_CLIENTE($_GET["cnpj"]);
    }
}

function GET_CLIENTE($CNPJ){
    $conn = GET_CONECTION();

    $query = "SELECT * FROM cliente WHERE cnpj = '$CNPJ';";
    
    $sql = mysqli_query($conn, $query);

    if (mysqli_num_rows($sql) > 0){
        while($row = mysqli_fetch_assoc($sql)){
            $result = json_encode($row);
        }

        mysqli_free_result($sql);
    
        mysqli_close($conn);

        return $result;
    }
}