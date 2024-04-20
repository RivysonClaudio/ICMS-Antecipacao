<?php 
    require_once ".\CLASSES\NotaFiscal.php";

    $xml_file = ".\\xml\\35240167903765000102550000004097881316696916.xml";

    if (file_exists($xml_file)){
        
        $xml = simplexml_load_file($xml_file);

        if($xml){
            $notaFiscal = new NotaFiscal($xml);
        }
    }

    
