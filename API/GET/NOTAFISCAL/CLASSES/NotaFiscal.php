<?php

require_once ".\CLASSES\Produto.php";

class NotaFiscal
{
    var $chave;
    var $nNF;
    var $dhEmi;
    var $emit;
    var $dest;
    var $produtos = array();
    var $vST;

    public function __construct($xml){
        $this->chave = (string) $xml->NFe->infNFe["Id"];

        $this->nNF = (string)$xml->NFe->infNFe->ide->nNF;
        $this->dhEmi = (string)$xml->NFe->infNFe->ide->dhEmi;

        $this->emit = array(
            "CNPJ" => (string)$xml->NFe->infNFe->emit->CNPJ,
            "RAZAO_SOCIAL" => (string)$xml->NFe->infNFe->emit->xNome,
            "UF" => (string)$xml->NFe->infNFe->emit->enderEmit->UF
        );
        $this->dest = array(
            "CNPJ" => (string)$xml->NFe->infNFe->dest->CNPJ,
            "RAZAO_SOCIAL" => (string)$xml->NFe->infNFe->dest->xNome,
            "UF" => (string)$xml->NFe->infNFe->dest->enderDest->UF,
            "IE" => (string)$xml->NFe->infNFe->dest->IE
        );

        foreach($xml->NFe->infNFe->det as $item){
            $this->produtos[] = new Produto($item);
        }

        $this->vST = (string)$xml->NFe->infNFe->total->ICMSTot->vST;
    }
}
