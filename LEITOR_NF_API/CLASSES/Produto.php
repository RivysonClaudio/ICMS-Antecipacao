<?php

class Produto
{
    var $NCM;
    var $CEST;
    var $CFOP;
    var $xProd;
    var $vProd;

    public function __construct($produto){
        $this->NCM = (string)$produto->prod->NCM;
        $this->CEST = (string)$produto->prod->CEST;
        $this->CFOP = (string)$produto->prod->CFOP;
        $this->xProd = (string)$produto->prod->xProd;
        $this->vProd = (string)$produto->prod->vProd;
    }
}