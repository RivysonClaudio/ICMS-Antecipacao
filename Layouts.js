function HTML_STRUCT_NOTAFISCAL(object_json){
    const HTML_STRUCT_NOTAFISCAL = 
    `
    <div id="${object_json.chave}" class="NotaFiscal">
        <table class="NotaFiscal-Resumo">
            <tr>
                <td class="abrir-calculo" rowspan="2" onclick="MostrarProdutos(event)">
                    <span class="material-symbols-outlined">
                        calculate
                        </span>
                </td>
                <th>NOTA<br>FISCAL</th>
                <td>${object_json.nNF}</td>
                <th>EMISSÃO</th>
                <td>${formatoData(object_json.dhEmi)}</td>
                <th>EMITENTE</th>
                <td colspan="5">${object_json.emit.RAZAO_SOCIAL}</td>
                <th>CNPJ</th>
                <td>${formatoCNPJ(object_json.emit.CNPJ)}</td>
                <th>UF</th>
                <td>${object_json.emit.UF}</td>
            </tr>
            <tr>
                <th>TOTAL DA<br>NOTA</th>
                <td>0,00</td>
                <th>IMPOSTO<br>CALCULADO</th>
                <td>0,00</td>
                <th>IMPOSTO<br>SEFAZ</th>
                <td>0,00</td>
                <th>IMPOSTO<br>PAGO</th>
                <td>${parseFloat(object_json.vST).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <th>SALDO</th>
                <td>0,00</td>
                <th>EMITENTE<br>SIMPLES</th>
                <td>
                    <select name="emitente-simples" id="emitente-simples">
                        <option value="1">SIM</option>
                        <option value="0" selected>NÃO</option>
                    </select>
                </td>
                <th>SITUAÇÃO<br>NOTA</th>
                <td>
                    <select name="situacao-nota" id="situacao-nota">
                        <option value="1">AUTORIZADA</option>
                        <option value="0">CANCELADA</option>
                    </select>
                </td>
            </tr>
        </table>

        <div class="NotaFiscal-Calculo" style="display: none; position: relative;">

            <table id="NotaFiscal${object_json.nNF}-Calculo-Resumo" class="table-resumo-NotaFiscal">
                <thead>
                    <th colspan="9">
                        <table>
                            <tr>
                                <th>SUB. TRIBUT.:</th>
                                <td style="min-width: 150px; color: black; font-weight: normal;">0,00</td>
                                <th>ANTECIPAÇÃO:</th>
                                <td style="min-width: 150px; color: black; font-weight: normal;">0,00</td>
                                <th>DIF. ALIQ.:</th>
                                <td style="min-width: 150px; color: black; font-weight: normal;">0,00</td>
                            </tr>
                        </table>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <th>NCM</th>
                        <th>CEST</th>
                        <th>SEGMENTO</th>
                        <th>ALIQ</th>
                        <th>TOTAL PRODUTO</th>
                        <th>DESCONTO</th>
                        <th>BASE CALCULO</th>
                        <th>MVA</th>
                        <th>ICMS</th>
                    </tr>
                    
                    ${tabelaDeResumosPorNCM(object_json.produtos, object_json.nNF)}

                </tbody>
            </table>

            <table class="table-itens-NotaFiscal" style="display: none;">
                <thead>
                    <tr>
                        <th>Nº ITEM</th>
                        <th>NCM</th>
                        <th>CEST</th>
                        <th>CFOP</th>
                        <th>DESCRIÇÃO</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>IPI</th>
                        <th>FRETE</th>
                        <th>SEGURO</th>
                        <th>DESPESAS ACESSORIAS</th>
                        <th>DESCONTO</th>
                        <th>CALCULO</th>
                        <th>ICMS</th>
                    </tr>
                </thead>
                <tbody>
                    ${listagemDeProdutos(object_json.produtos, object_json.nNF, object_json.emit.CNPJ)}
                </tbody>
            </table>

            <div class="lateral mostrarResumo" title="Mostar o calculo resumido por NCM">
                <span class="material-symbols-outlined centralizar" style="display: flex;">apps</span>
            </div>
            <div class="lateral mostrarItens" title="Mostar o calculo Item a Item">
                <span class="material-symbols-outlined centralizar" style="display: flex;">menu</span>
            </div>
        </div>
    </div>
    `;

    function listagemDeProdutos(lista_de_produtos, NF, CNPJ){
        let lista = "";
        lista_de_produtos.forEach(produto =>{
            lista += HTML_STRUCT_PRODUTO(produto, NF, CNPJ);
        });
        return lista;
    }

    function tabelaDeResumosPorNCM(lista_de_produtos, NF){

        function uniqueByCompositeKey(produtos){
            const NCMsUnicos = new Set();

            return produtos.filter(produto =>{
                const key = [produto.NCM, produto.CEST, produto.ICMS[0]].join('|');

                if (NCMsUnicos.has(key)) {
                    return false
                }else{
                    NCMsUnicos.add(key)
                    return true
                }
            })
        }

        function listagemDeItens(produtoUnicos){
            lista = ""
            
            produtoUnicos.forEach(produto => {

                let NCM_ST = procurarNCM(produto.NCM, produto.CEST)                

                lista += 
                `
                    <tr>
                        <td>${produto.NCM}</td>
                        <td>${produto.CEST}</td>
                        <td>${(NCM_ST != 0) ? NCM_ST[0] : "SEM SEGMENTO"}</td>
                        <td>${produto.ICMS[0]}</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td>${(NCM_ST != 0) ? NCM_ST[1] : "0"}</td>
                        <td>0,00</td>
                    </tr>
                `
            })
               
            return lista
        }

        return listagemDeItens(uniqueByCompositeKey(lista_de_produtos), NF)
    }

    return HTML_STRUCT_NOTAFISCAL;
}

function HTML_STRUCT_RESUMO (produtoUnicos, NF){
    const HTML_STRUCT_RESUMO = 
    `
        <table id="RESUMO-NF${NF}" class="RESUMO-NOTAFISCAL">
            <thead>
                <th colspan="7">
                    <table>
                        <tr>
                            <th>SUB. TRIBUT.:</th>
                            <td style="min-width: 150px;">0,00</td>
                            <th>ANTECIPAÇÃO:</th>
                            <td style="min-width: 150px;">0,00</td>
                            <th>DIF. ALIQ.:</th>
                            <td style="min-width: 150px;">0,00</td>
                        </tr>
                    </table>
                </th>
            </thead>
            <tbody>
                <tr>
                    <th>NCM</th>
                    <th>CEST</th>
                    <th>SEGMENTO</th>
                    <th>ALIQ. INTER.</th>
                    <th>VALOR PRODUTO</th>
                    <th>BASE CALCULO</th>
                    <th>ICMS</th>
                </tr>
                
                ${listagemDeItens(produtoUnicos)}

            </tbody>
        </table>
    `;

    return HTML_STRUCT_RESUMO;
}

function HTML_STRUCT_PRODUTO(produto, NF, CNPJ){
    const PRODUTO_STRUCT = 
    `
    <tr id="NI${produto.nItem}NF${NF+CNPJ}">
        <td onclick="MostrarCalculo(event)">${produto.nItem}</td>
        <td>${produto.NCM}</td>
        <td>${produto.CEST}</td>
        <td>${produto.CFOP}</td>
        <td>${produto.xProd}</td>
        <td>${produto.qCom}</td> 
        <td>${produto.vProd}</td>
        <td>${produto.vIPI}</td>
        <td>${produto.vFrete}</td>
        <td>${produto.vSeg}</td>
        <td>${produto.vOutro}</td>
        <td>${produto.vDesc}</td>
        <td style="display: none;">${produto.ICMS[0]}</td>
        <td style="display: none;">${produto.ICMS[1]}</td>
        <td>
            <select name="TIPO-CALCULO" id="TIPO-CALCULO" onchange="CALCULO_ANTECIPACAO_DIFAL_ST('NI${produto.nItem}NF${NF+CNPJ}', 'NI${produto.nItem}NF${NF+CNPJ}CALC', this.value)">
                <option value="0">S.T.</option>
                <option value="1" selected>Antec. Trib.</option>
                <option value="2">Dif. Al.</option>
            </select>
        </td>
        <td>0,00</td>
    </tr>
    <tr class="calculo" style="display: none;">
        <td id="NI${produto.nItem}NF${NF+CNPJ}CALC" colspan="14" style="background-color: transparent;"></td>
    </tr>
    `;

    return PRODUTO_STRUCT;
}

function HTML_STRUCT_CALCULO_AT(SN, VALOR_OPERACAO, ICMS_AL, ICMS_ORIGEM, DIFAL, RED_BC_AL_EFET_SN, BASE_CALCULO, ICMS_AT, ALSN, MVA){
    const STRUCT_SN = `
    <table class="calculo-ICMS">
        <thead>
            <tr>
                <th>VALOR OPERAÇÃO</th>
                <th>ALIQ. ICMS</th>
                <th>VALOR ICMS</th>
                <th>BASE CALC.</th>
                <th>RED. B.C.</th>
                <th>BASE RED.</th>
                <th>ALIQ. INTERES.</th>
                <th>DIF. AL.</th>
                <th>ICMS ANT.</th>
            </tr>
        </thead>
        <tr>
            <td>${VALOR_OPERACAO.toFixed(2)}</td>
            <td>${ICMS_AL}%</td>
            <td>${ICMS_ORIGEM}</td>
            <td>${((VALOR_OPERACAO - ICMS_ORIGEM) / (1 - (ALIQUOTA_INTERNA_ICMS/100))).toFixed(2)}</td>
            <td>${RED_BC_AL_EFET_SN.toFixed(4)}</td>
            <td>${BASE_CALCULO.toFixed(2)}</td>
            <td>${ALIQUOTA_INTERNA_ICMS}%</td>
            <td>${DIFAL}%</td>
            <td>${ICMS_AT.toFixed(2)}</td>
        </tr>
        
    </table>
    `;

    const STRUCT = `
    <table class="calculo-ICMS">
        <thead>
            <tr>
                <th>VALOR OPERAÇÃO</th>
                <th>ALIQ. ICMS</th>
                <th>VALOR ICMS</th>
                <th>BASE CALC.</th>
                <th>RED. B.C.</th>
                <th>BASE RED.</th>
                <th>MVA</th>
                <th>BASE CALC.</th>
                <th>ALIQ. INTERES.</th>
                <th>ICMS ANT.</th>
            </tr>
        </thead>
        <tr>
            <td>${VALOR_OPERACAO.toFixed(2)}</td>
            <td>${ICMS_AL}%</td>
            <td>${ICMS_ORIGEM}</td>
            <td>${((VALOR_OPERACAO - ICMS_ORIGEM) / (1 - (ALIQUOTA_INTERNA_ICMS/100))).toFixed(2)}</td>
            <td>${0}</td>
            <td>${BASE_CALCULO.toFixed(2)}</td>
            <td>${MVA.toFixed(2)}%</td>
            <td>${(BASE_CALCULO * (1 + (MVA/100))).toFixed(2)}</td>
            <td>${ALIQUOTA_INTERNA_ICMS}%</td>
            <td>${ICMS_AT.toFixed(2)}</td>
        </tr>
        
    </table>
    `;
    
    if(SN){
        return STRUCT_SN;
    }
    return STRUCT;
}

function HTML_STRUCT_CALCULO_ST(SEGMENTO, BASE_CALCULO, ICMS_AL, ICMS_ORIGEM, MVA, ALIQUOTA_INTERNA, VALOR_PRODUTO){
    const STRUCT = `
    <table class="calculo-ICMS">
        <thead>
            <th>SEGMENTO</th>
            <th>BASE DE CALCULO</th>
            <th>REDUÇÃO B.C.</th>
            <th>BASE REDUZIDA</th>
            <th>ALIQ. INTERESTADUAL</th>
            <th>ICMS NORMAL</th>
            <th>MVA</th>
            <th>MVA AJUSTADO</th>
            <th>B.C. ICMS ST</th>
            <th>ALIQ. INTERNA</th>
            <th>ALIQ. REDU. SN</th>
            <th>ICMS ST</th>
        </thead>
        <tr>
            <td>${SEGMENTO}</td>
            <td>${BASE_CALCULO.toFixed(2)}</td>
            <td>${0}</td>
            <td>${BASE_CALCULO.toFixed(2)}</td>
            <td>${ICMS_AL}%</td>
            <td>${ICMS_ORIGEM}</td>
            <td>${MVA}%</td>
            <td>${((mva_ajustado(MVA, ALIQUOTA_INTERNA, ICMS_AL)-1)*100).toFixed(2)}%</td>
            <td>${(BASE_CALCULO * mva_ajustado(MVA, ALIQUOTA_INTERNA, ICMS_AL)).toFixed(2)}</td>
            <td>${ALIQUOTA_INTERNA.toFixed(2)}</td>
            <td>${0}</td>
            <td>${((BASE_CALCULO * mva_ajustado(MVA, ALIQUOTA_INTERNA, ICMS_AL))*(ALIQUOTA_INTERNA/100) - (VALOR_PRODUTO*(ICMS_AL/100))).toFixed(2)}</td>
        </tr>
    </table>
    `;
    
    return STRUCT;
}

function HTML_STRUCT_CALCULO_DIFAL(VALOR_OPERACAO, ICMS_AL, ICMS_ORIGEM, ALIQUOTA_INTERNA_ICMS){
    const STRUCT = `
    <table class="calculo-ICMS">
        <thead>
            <th>VALOR OPERAÇÃO</th>
            <th>ALIQ. INTERESTADUAL</th>
            <th>ICMS NORMAL</th>
            <th>B.C. ICMS NORMAL</th>
            <th>ALIQ. INTERNA</th>
            <th>B.C. ICMS ANTECIP.</th>
            <th>DIF. ALIQ.</th>
            <th>ICMS ANT.</th>
        </thead>
        <tr>
            <td>${VALOR_OPERACAO.toFixed(2)}</td>
            <td>${ICMS_AL}%</td>
            <td>${ICMS_ORIGEM.toFixed(2)}</td>
            <td>${(VALOR_OPERACAO - ICMS_ORIGEM).toFixed(2)}</td>
            <td>${ALIQUOTA_INTERNA_ICMS.toFixed(2)}%</td>
            <td>${(((VALOR_OPERACAO - ICMS_ORIGEM) / (100 - ALIQUOTA_INTERNA_ICMS))*100).toFixed(2)}</td>
            <td>${Math.abs(ALIQUOTA_INTERNA_ICMS - ICMS_AL).toFixed(2)}%</td>
            <td>${((VALOR_OPERACAO - ICMS_ORIGEM) * (Math.abs(ALIQUOTA_INTERNA_ICMS - ICMS_AL)/100)).toFixed(2)}</td>
        </tr>
    </table>
    `;
    
    return STRUCT;
}

function CALCULO_ANTECIPACAO_DIFAL_ST(ID_ITEM, ID_ITEM_CALC, TIPO){
    if (TIPO == 1){
        document.getElementById(ID_ITEM_CALC).innerHTML = AntecipacaoTributaria(document.getElementById(ID_ITEM).children);
    }
    if (TIPO == 0){
        document.getElementById(ID_ITEM_CALC).innerHTML = SubstituicaoTributaria(document.getElementById(ID_ITEM).children, procurarNCM(document.getElementById(ID_ITEM).children[1].textContent,
                                                                                                                                        document.getElementById(ID_ITEM).children[2].textContent));
    }
    if(TIPO == 2){
        document.getElementById(ID_ITEM_CALC).innerHTML = DiferencialEntreAliquotas(document.getElementById(ID_ITEM).children);
    }
}