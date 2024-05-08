<?php

if(isset($_POST['NCM'])) {
    $ITEM = [$_POST['NCM'], $_POST['CEST'], $_POST['SEGMENTO'], $_POST['MVA'], $_POST['ALIQUOTA'], $_POST['DECRETO'], $_POST['STATUS'], $_POST['OBSERVACAO']];
} else {
    echo "Nenhum nome foi enviado.";
}