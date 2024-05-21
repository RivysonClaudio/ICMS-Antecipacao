<?php

require_once '../../../CONEXAO_DB/db_con.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $ITEM = [$_POST['NCM'], $_POST['CEST'], $_POST['SEGMENTO'], $_POST['MVA'], $_POST['ALIQUOTA'], $_POST['DECRETO'], $_POST['STATUS'], $_POST['OBSERVACAO']];
    INSERT_NCM($ITEM);
} else {
    echo "Nenhum nome foi enviado.";
}

function INSERT_NCM($ITEM){
    $conn = GET_CONECTION();

    $query = 'INSERT INTO ncms (ncm, cest, segmento, mva, aliquota, decreto, status, observacao)
                VALUES ('. $ITEM[0] .', '. $ITEM[1] .', '. $ITEM[2] .', '. $ITEM[3] .', '. $ITEM[4] .', '.$ITEM[5] .', '. $ITEM[6] .', '. $ITEM[7] .');';

    mysqli_query($conn, $query);

    mysqli_close($conn);

    echo 'NCM Salvo com sucesso no Banco de Dados.';
}