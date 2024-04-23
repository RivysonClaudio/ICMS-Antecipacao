<?php 
    if (isset($_FILES['file'])){
        if(move_uploaded_file($_FILES['file']['tmp_name'], "xml/" . $_FILES['file']['name'])){
            echo 'Arquivos carregados com sucesso!';
        }else{
            echo 'Erro no carregamento dos arquivos.';
        }
    }

    
