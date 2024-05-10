const ALIQUOTA_INTERNA_ICMS = 18;

function AntecipacaoTributaria(row){
    const ITEM = infoITEM(row);
    const VALOR_OPERACAO = ITEM['VALOR DO PRODUTO'] + ITEM['IPI'] + ITEM['FRETE'] + ITEM['SEGURO'] + ITEM['OUTRAS'] - ITEM['DESCONTO'];
    const VALOR_OPERACAO_EXCLUINDO_ICMS = VALOR_OPERACAO - ITEM['VALOR ICMS NF'];
    const BASE_CALCULO_AT = (VALOR_OPERACAO_EXCLUINDO_ICMS / (100 - ALIQUOTA_INTERNA_ICMS)) * 100;
    const ICMS_AT = (BASE_CALCULO_AT * (ALIQUOTA_INTERNA_ICMS / 100)) - ITEM['VALOR ICMS NF']; 

    return HTML_STRUCT_CALCULO_AT(BASE_CALCULO_AT, ITEM['ALIQUOTA ICMS'], ITEM['VALOR ICMS NF'], ALIQUOTA_INTERNA_ICMS, ICMS_AT);
}

function SubstituicaoTributaria(row, arrayDadosST){
    const ITEM = infoITEM(row);
    const VALOR_OPERACAO = ITEM['VALOR DO PRODUTO'] + ITEM['IPI'] + ITEM['FRETE'] + ITEM['SEGURO'] + ITEM['OUTRAS'] - ITEM['DESCONTO'];

    return HTML_STRUCT_CALCULO_ST(arrayDadosST[0], VALOR_OPERACAO, ITEM['ALIQUOTA ICMS'], ITEM['VALOR ICMS NF'], arrayDadosST[1], arrayDadosST[2], ITEM['VALOR DO PRODUTO']);
}

function mva_ajustado(mva, al_inter, al_intra){
    return ((1 + (mva/100)) * (1 - (al_intra/100)) / (1 - (al_inter/100)));
}

function HTML_STRUCT_CALCULO_AT(BASE_CALCULO_AT, ICMS_AL, ICMS_ORIGEM, ALIQUOTA_INTERNA_ICMS, ICMS_AT){
    const STRUCT = `
    <table class="calculo-ICMS">
        <thead>
            <th>B.C. ICMS NORMAL</th>
            <th>REDUÇÃO B.C.</th>
            <th>BASE REDUZIDA</th>
            <th>ALIQ. INTERESTADUAL</th>
            <th>ICMS NORMAL</th>
            <th>MVA</th>
            <th>ALIQ. INTERNA</th>
            <th>ALIQ. RED. SN</th>
            <th>ICMS ANT.</th>
        </thead>
        <tr>
            <td>${BASE_CALCULO_AT.toFixed(2)}</td>
            <td>${0}</td>
            <td>${BASE_CALCULO_AT.toFixed(2)}</td>
            <td>${ICMS_AL}%</td>
            <td>${ICMS_ORIGEM}</td>
            <td>${0}</td>
            <td>${ALIQUOTA_INTERNA_ICMS.toFixed(2)}%</td>
            <td>${0}</td>
            <td>${ICMS_AT.toFixed(2)}</td>
        </tr>
    </table>
    `;
    
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

function infoITEM(ITEM){
    const VALOR_PRODUTO = parseFloat(ITEM[6].textContent);
    const IPI = isNaN(parseFloat(ITEM[7].textContent))? 0: parseFloat(ITEM[7].textContent);
    const FRETE = isNaN(parseFloat(ITEM[8].textContent))? 0: parseFloat(ITEM[8].textContent);
    const SEGURO = isNaN(parseFloat(ITEM[9].textContent))? 0: parseFloat(ITEM[9].textContent);
    const OUTRAS_DESPESAS = isNaN(parseFloat(ITEM[10].textContent))? 0: parseFloat(ITEM[10].textContent);
    const DESCONTO = isNaN(parseFloat(ITEM[11].textContent))? 0: parseFloat(ITEM[11].textContent);
    const ICMS_AL = isNaN(parseFloat(ITEM[12].textContent))? 0: parseFloat(ITEM[12].textContent);
    const ICMS_ORIGEM = isNaN(parseFloat(ITEM[13].textContent))? 0: parseFloat(ITEM[13].textContent);

    return {    'VALOR DO PRODUTO': VALOR_PRODUTO, 
                'IPI': IPI,
                'FRETE': FRETE, 
                'SEGURO': SEGURO,
                'OUTRAS': OUTRAS_DESPESAS,
                'DESCONTO': DESCONTO,
                'ALIQUOTA ICMS': ICMS_AL,
                'VALOR ICMS NF': ICMS_ORIGEM};
}