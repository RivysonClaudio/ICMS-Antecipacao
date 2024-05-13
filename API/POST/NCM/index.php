<?php

if(isset($_POST['NCM'])) {
    $ITEM = [$_POST['NCM'], $_POST['CEST'], $_POST['SEGMENTO'], $_POST['MVA'], $_POST['ALIQUOTA'], $_POST['DECRETO'], $_POST['STATUS'], $_POST['OBSERVACAO']];
} else {
    echo "Nenhum nome foi enviado.";
}

function INSERT_NCM($ITEM){
    $conn = GET_CONECTION();

    $query = 'INSERT INTO ncms (ncm, cest, segmento, mva, aliquota, decreto, status, observacao)
                VALUES (\''. $ITEM['NCM'] .'\', \''. $ITEM['CEST'] .'\', \''. $ITEM['SEGMENTO'] .'\', \''. $ITEM['MVA'] .'\', \''. $ITEM['ALIQUOTA'] .'\', \''.$ITEM['DECRETO'] .'\', \''. $ITEM['STATUS'] .'\', \''. $ITEM['OBS'] .'\');';

    mysqli_query($conn, $query);

    mysqli_close($conn);
}