object_json = {
    nNF: '598418',
    dhEmi: '01/03/2024',
    emit: {
        CNPJ: '55.147.961/0001-15',
        xNome: 'MUNDIALTRACTOR COMERCIO IMPORTACAO E EXPORTACAO LTDA',
        UF: 'SP'
    },
    itens: [{
        nItem: 1,
        NCM: '40169300',
        CEST: '0100700',
        CFOP: '6403',
        xProd: '2759884 - JUNTA CARTER',
        unCom: '1',
        vProd: 151.00,
        IPI: 7.85,
        FRETE: 0,
        SEGURO: 0,
        Desp: 0,
        Desc: 0
    },
    {
        nItem: 2,
        NCM: '40169300',
        CEST: '0100700',
        CFOP: '6403',
        xProd: "2258019 - JUNTA BOMBA D'AGUA",
        unCom: '1',
        vProd: 59.00,
        IPI: 3.07,
        FRETE: 0,
        SEGURO: 0,
        Desp: 0,
        Desc: 0
    },
    {
        nItem: 3,
        NCM: '40169300',
        CEST: '0100700',
        CFOP: '6403',
        xProd: '2773013 - RETENTOR DIANTEIRO',
        unCom: '1',
        vProd: 69.00,
        IPI: 3.59,
        FRETE: 0,
        SEGURO: 0,
        Desp: 0,
        Desc: 0
    },
    {
        nItem: 4,
        NCM: '87085019',
        CEST: '0107500',
        CFOP: '6403',
        xProd: '2332613 - BUCHA',
        unCom: '2',
        vProd: 96.00,
        IPI: 3.12,
        FRETE: 0,
        SEGURO: 0,
        Desp: 0,
        Desc: 0
    },
    {
        nItem: 5,
        NCM: '84314923',
        CEST: '0104500',
        CFOP: '6404',
        xProd: '2774837 - TANQUE C/TAMPA',
        unCom: '1',
        vProd: 387.00,
        IPI: 0,
        FRETE: 0,
        SEGURO: 0,
        Desp: 0,
        Desc: 0
    },
    {
        nItem: 6,
        NCM: '74072929',
        CEST: '1006300',
        CFOP: '6102',
        xProd: '1781685 - TIRA DE BRONZE',
        unCom: '3',
        vProd: 507.00,
        IPI: 0,
        FRETE: 0,
        SEGURO: 0,
        Desp: 0,
        Desc: 0
    }
    ]
}

let div = `<div class="NotaFiscal">
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
                        <td>${object_json.dhEmi}</td>
                        <th>EMITENTE</th>
                        <td colspan="5">${object_json.emit.xNome}</td>
                        <th>CNPJ</th>
                        <td>${object_json.emit.CNPJ}</td>
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
                        <td>0,00</td>
                        <th>SALDO</th>
                        <td>0,00</td>
                        <th>EMITENTE<br>SIMPLES</th>
                        <td>
                            <select name="emitente-simples" id="emitente-simples">
                                <option value="1">SIM</option>
                                <option value="0">NÃO</option>
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

                <div class="NotaFiscal-Calculo">
                    <table class="table-itens-NotaFiscal">
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
                                <th>ICMS</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>`;

document.getElementById('content').innerHTML = div;