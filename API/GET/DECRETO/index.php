<?php

require_once '../../../CONEXAO_DB/db_con.php';

echo GET_DECRETOS();

function GET_DECRETOS(){
    $conn = GET_CONECTION();

    $query = 'SELECT * FROM decreto;';

    $sql = mysqli_query($conn, $query);

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