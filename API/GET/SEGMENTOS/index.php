<?php

include_once 'C:\xampp\htdocs\www\ICMS_Fronteira\CONEXAO_DB\db_con.php';

echo GET_SEGMENTOS();

function GET_SEGMENTOS(){
    $conn = GET_CONECTION();

    $query = 'SELECT * FROM segmento';

    $sql = mysqli_query($conn, $query);

    if($sql){
        while($row = mysqli_fetch_assoc($sql)){
            $rows[] = [
                'id' => $row['cod'],
                'seg' => $row['segmento']
            ];
        }

        mysqli_free_result($sql);

        mysqli_close($conn);

        return json_encode($rows);  
    }
}