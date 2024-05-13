<?php

require_once '../../../CONEXAO_DB/db_con.php';

echo GET_NCMS();

function GET_NCMS(){
    $conn = GET_CONECTION();

    $query = '  SELECT ncms.*, segmento.segmento AS segmento_nome, decreto.decreto AS decreto_nome
                FROM ncms 
                JOIN segmento ON ncms.segmento = segmento.cod
                JOIN decreto ON ncms.decreto = decreto.id;';

    $sql = mysqli_query($conn, $query);

    if($sql){
        while($row = mysqli_fetch_assoc($sql)){
            $rows[] = [
                'id' => $row['id'],
                'ncm' => $row['ncm'],
                'cest' => $row['cest'],
                'seg' => $row['segmento_nome'],
                'mva' => $row['mva'],
                'al' => $row['aliquota'],
                'dec' => $row['decreto_nome'],
                'sts' => $row['status'],
                'obs' => $row['observacao']
            ];
        }

        mysqli_free_result($sql);

        mysqli_close($conn);

        return json_encode($rows);  
    }
}