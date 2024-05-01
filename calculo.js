const ALIQUOTA_INTERNA_ICMS = 20.5;

function AntecipacaoTributaria(VALOR_PRODUTO, IPI, FRETE, SEGURO, OUTRAS_DESPESAS, DESCONTO, ICMS_AL, ICMS_ORIGEM){
    const VALOR_OPERACAO = VALOR_PRODUTO + IPI + FRETE + SEGURO + OUTRAS_DESPESAS - DESCONTO;
    const VALOR_OPERACAO_EXCLUINDO_ICMS = VALOR_OPERACAO - ICMS_ORIGEM;
    const BASE_CALCULO_AT = (VALOR_OPERACAO_EXCLUINDO_ICMS / (100 - ALIQUOTA_INTERNA_ICMS)) * 100;
    const ICMS_AT = (BASE_CALCULO_AT * (ALIQUOTA_INTERNA_ICMS / 100)) - ICMS_ORIGEM; 

    console.log(`${VALOR_OPERACAO} + ${VALOR_OPERACAO_EXCLUINDO_ICMS} + ${BASE_CALCULO_AT} + ${ICMS_AT}`);
    return HTML_STRUCT_CALCULO(BASE_CALCULO_AT, ICMS_AL, ICMS_ORIGEM, ALIQUOTA_INTERNA_ICMS, ICMS_AT);
}

function HTML_STRUCT_CALCULO(BASE_CALCULO_AT, ICMS_AL, ICMS_ORIGEM, ALIQUOTA_INTERNA_ICMS, ICMS_AT){
    const STRUCT = `
    <table class="calculo-ICMS">
        <thead>
            <th>BASE DE CALCULO<br>ICMS NORMAL</th>
            <th>REDUÇÃO<br>BASE DE CALCULO</th>
            <th>BASE REDUZIDA</th>
            <th>ALIQUOTA<br>ICMS NORMAL</th>
            <th>VALOR<br>ICMS NORMAL</th>
            <th>MVA</th>
            <th>ALIQUOTA INTERNA</th>
            <th>ALIQUOTA REDUZIDA<br>SN</th>
            <th>VALOR<br>ICMS ST</th>
        </thead>
        <tr>
            <td>${BASE_CALCULO_AT}</td>
            <td>${0}</td>
            <td>${BASE_CALCULO_AT}</td>
            <td>${ICMS_AL}</td>
            <td>${ICMS_ORIGEM}</td>
            <td>${0}</td>
            <td>${ALIQUOTA_INTERNA_ICMS}</td>
            <td>${0}</td>
            <td>${ICMS_AT}</td>
        </tr>
    </table>
    `;
    
    return STRUCT;
}