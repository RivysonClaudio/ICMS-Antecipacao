<?php

require_once ".\CLASSES\NotaFiscal.php";

$dir = '../../POST/NOTAFISCAL/XML/';

$files = scandir($dir);

$files = array_diff($files, array('.', '..'));

$file = basename(reset($files));

$zipFilePath = $dir . $file;

$zip = new ZipArchive;

if ($zip->open($zipFilePath) === true) {
    for ($i = 0; $i < $zip->numFiles; $i++) {
        
        $fileName = $zip->getNameIndex($i);
        $fileContent = $zip->getFromIndex($i);

        $tempFilePath = tempnam(sys_get_temp_dir(), 'xml');
        file_put_contents($tempFilePath, $fileContent);

        $xml = simplexml_load_file($tempFilePath);

        if(!is_null($xml->NFe->infNFe)){
            $notaFiscal = new NotaFiscal($xml);
        
            if($notaFiscal->emit['UF'] != $notaFiscal->dest['UF']){
                $notasFiscais[] = $notaFiscal;
            }
        }

        unlink($tempFilePath);
    }

    echo json_encode($notasFiscais);

    $zip->close();
    
    unlink($zipFilePath);
} else {
    echo 'Erro ao abrir o arquivo ZIP';
}