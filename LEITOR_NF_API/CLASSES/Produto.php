<?php

class Produto
{
    var $nItem;
    var $NCM;
    var $CEST;
    var $CFOP;
    var $xProd;
    var $qCom;
    var $vProd;
    var $vIPI;
    var $vFrete;
    var $vSeg;
    var $vOutro;
    var $vDesc;

    var $ICMS = [];

    public function __construct($produto){
        $this->nItem = (string)$produto->attributes()->nItem;
        $this->NCM = (string)$produto->prod->NCM;
        $this->CEST = (string)$produto->prod->CEST;
        $this->CFOP = (string)$produto->prod->CFOP;
        $this->xProd = (string)$produto->prod->xProd;
        $this->qCom = (string)$produto->prod->qCom; 
        $this->vProd = (string)$produto->prod->vProd;
        $this->vFrete = (string)$produto->prod->vFrete;
        $this->vSeg = (string)$produto->prod->vSeg;
        $this->vOutro = (string)$produto->prod->vOutro;
        $this->vDesc = (string)$produto->prod->vDesc;

        $this->vIPI = !is_null($produto->imposto->IPI->IPITrib) ? (string)$produto->imposto->IPI->IPITrib->vIPI : "";
        $this->ICMS[] = (string)$produto->imposto->ICMS->children()[0]->pICMS;
        $this->ICMS[] = (string)$produto->imposto->ICMS->children()[0]->vICMS;
    }
}