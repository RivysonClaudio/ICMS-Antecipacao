const ALIQUOTA_INTERNA_ICMS = 20.5;

function AntecipacaoTributaria(row){
    const Form = document.getElementById('configuracaoRapida');
    const ITEM = infoITEM(row);

    let SN = false;

    const VALOR_OPERACAO = ITEM['VALOR DO PRODUTO'] + ITEM['IPI'] + ITEM['FRETE'] + ITEM['SEGURO'] + ITEM['OUTRAS'] - ITEM['DESCONTO'];

    const VALOR_OPERACAO_SEM_ICMS = VALOR_OPERACAO - ITEM['VALOR ICMS NF'];

    const DIFAL = ALIQUOTA_INTERNA_ICMS - ITEM['ALIQUOTA ICMS'];

    let RED_BC_AL_EFET_SN = 0;

    let BASE_CALCULO = VALOR_OPERACAO_SEM_ICMS / (1 - (ALIQUOTA_INTERNA_ICMS/100));

    let MVA = parseFloat(Form.MVA.value);

    let BC_AGREGADA = BASE_CALCULO * (1 + (MVA/100));

    let ICMS_AT = (BC_AGREGADA * (ALIQUOTA_INTERNA_ICMS/100)) - ITEM['VALOR ICMS NF'];

    if (Form.TRIBUTACAO.value != 2 && Form.SITUACAO.value == 0){
        SN = true;

        RED_BC_AL_EFET_SN = aliquotaEfetivaSN(ITEM['ALIQUOTA ICMS'], Form) / DIFAL;

        BASE_CALCULO = BASE_CALCULO * RED_BC_AL_EFET_SN;

        ICMS_AT = BASE_CALCULO * (DIFAL/100);
    }

    function aliquotaEfetivaSN(ICMS_AL, Form){
        if(ICMS_AL == 4){
            return Form.ALSN4.value;
        }
        if(ICMS_AL == 7){
            return Form.ALSN7.value;
        }
        if(ICMS_AL == 12){
            return Form.ALSN12.value;
        }
    }

    document.getElementById(row[0].parentElement.id).children[15].textContent = ICMS_AT.toFixed(2);

    return HTML_STRUCT_CALCULO_AT(SN, VALOR_OPERACAO, ITEM['ALIQUOTA ICMS'], ITEM['VALOR ICMS NF'], DIFAL, RED_BC_AL_EFET_SN, BASE_CALCULO, ICMS_AT, aliquotaEfetivaSN(ITEM['ALIQUOTA ICMS'], Form), MVA);
}

function SubstituicaoTributaria(row, arrayDadosST){
    const ITEM = infoITEM(row);

    const VALOR_OPERACAO = ITEM['VALOR DO PRODUTO'] + ITEM['IPI'] + ITEM['FRETE'] + ITEM['SEGURO'] + ITEM['OUTRAS'];

    const RED_BC = 0;

    const BASE_CALCULO_RED = VALOR_OPERACAO * (1 + (RED_BC/100));

    const BC_AJUSTADO = BASE_CALCULO_RED * mva_ajustado(arrayDadosST[1], arrayDadosST[2], ITEM['ALIQUOTA ICMS']);

    const ICMS_ST = (BC_AJUSTADO * (arrayDadosST[2]/100)) - (ITEM['VALOR DO PRODUTO'] * (ITEM['ALIQUOTA ICMS']/100));

    document.getElementById(row[0].parentElement.id).children[15].textContent = ICMS_ST.toFixed(2);

    return HTML_STRUCT_CALCULO_ST(arrayDadosST[0], VALOR_OPERACAO, ITEM['ALIQUOTA ICMS'], ITEM['VALOR ICMS NF'], arrayDadosST[1], arrayDadosST[2], ITEM['VALOR DO PRODUTO']);
}

function DiferencialEntreAliquotas(row){
    const ITEM = infoITEM(row);
    const VALOR_OPERACAO = ITEM['VALOR DO PRODUTO'] + ITEM['IPI'] + ITEM['FRETE'] + ITEM['SEGURO'] + ITEM['OUTRAS'] - ITEM['DESCONTO'];

    return HTML_STRUCT_CALCULO_DIFAL(VALOR_OPERACAO, ITEM['ALIQUOTA ICMS'], ITEM['VALOR ICMS NF'], ALIQUOTA_INTERNA_ICMS);
}

function mva_ajustado(mva, al_inter, al_intra){
    return ((1 + (mva/100)) * (1 - (al_intra/100)) / (1 - (al_inter/100)));
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
                'VALOR ICMS NF': ICMS_ORIGEM    };
}