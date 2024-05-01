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

function INSERT_NCM($ITEM){
    $conn = GET_CONECTION();

    $query = 'INSERT INTO ncms (ncm, cest, segmento, mva, aliquota, decreto, status, observacao)
                VALUES (\''. $ITEM['NCM'] .'\', \''. $ITEM['CEST'] .'\', \''. $ITEM['SEGMENTO'] .'\', \''. $ITEM['MVA'] .'\', \''. $ITEM['ALIQUOTA'] .'\', \''.$ITEM['DECRETO'] .'\', \''. $ITEM['STATUS'] .'\', \''. $ITEM['DESCRICAO'] .'\');';

    mysqli_query($conn, $query);

    mysqli_close($conn);
}

function GET_NCMS(){
    $conn = GET_CONECTION();

    $query = 'SELECT * FROM ncms;';

    $sql = mysqli_query($conn, $query);

    mysqli_close($conn);

    if($sql){
        while($row = mysqli_fetch_assoc($sql)){
            $rows[] = [
                'id' => $row['id'],
                'ncm' => $row['ncm'],
                'cest' => $row['cest'],
                'seg' => $row['segmento'],
                'mva' => $row['mva'],
                'al' => $row['aliquota'],
                'dec' => $row['decreto'],
                'sts' => $row['status'],
                'obs' => $row['observacao']
            ];
        }

        mysqli_free_result($sql);

        mysqli_close($conn);

        return json_encode($rows);  
    }
}

function GET_DECRETOS(){
    $conn = GET_CONECTION();

    $query = 'SELECT * FROM decreto;';

    $sql = mysqli_query($conn, $query);

    mysqli_close($conn);

    if($sql){
        while($row = mysqli_fetch_assoc($sql)){
            $rows[] = [
                'decreto' => $row['decreto'],
                'link' => $row['link']
            ];
        }

        mysqli_free_result($sql);

        mysqli_close($conn);

        return json_encode($rows);  
    }
}

print_r(GET_DECRETOS());