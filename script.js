class NOTAFISCAL{

    CALCULO_LAYOUT = `
        <table class="calculo-ICMS">
            <thead>
                <th>SEGMENTO</th>
                <th>BASE DE CALCULO<br>ICMS NORMAL</th>
                <th>REDUÇÃO<br>BASE DE CALCULO</th>
                <th>BASE REDUZIDA</th>
                <th>ALIQUOTA<br>ICMS NORMAL</th>
                <th>VALOR<br>ICMS NORMAL</th>
                <th>MVA</th>
                <th>MVA<br>AJUSTADO</th>
                <th>BASE DE CALCULO<br>ICMS ST</th>
                <th>ALIQUOTA<br>ICMS ST</th>
                <th>VALOR<br>ICMS ST</th>
            </thead>
            <tr>
                <td>TESTE</td>
                <td>0,00</td>
                <td>0</td>
                <td>0,00</td>
                <td>0,00</td>
                <td>0,00</td>
                <td>00,00%</td>
                <td>000,00</td>
                <td>0,00</td>
                <td>00,00%</td>
                <td>0,00</td>
            </tr>
        </table>
    `;

    ITEM_NOTAFISCAL_LAYOUT = `
        <tr>
            <td>0</td>
            <td>0000.00.00</td>
            <td>00.000.00</td>
            <td>0000</td>
            <td>Exemplo</td>
            <td>0</td> 
            <td>0,00</td>
            <td>0,00</td>
            <td>0,00</td>
            <td>0,00</td>
            <td>0,00</td>
            <td>0,00</td>
            <td>
                <select name="TIPO-CALCULO" id="TIPO-CALCULO">
                    <option value="">S.T.</option>
                    <option value="">Antec. Trib.</option>
                    <option value="">Dif. Al.</option>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="13" style="background-color: transparent;">
                ${this.CALCULO_LAYOUT}
            </td>
        </tr>
    `;

    NOTA_FISCAL_LAYOUT = `
        <div class="NotaFiscal">
            <table class="NotaFiscal-Resumo">
                <tr>
                    <td class="abrir-calculo" rowspan="2">
                        <span class="material-symbols-outlined">
                            calculate
                            </span>
                    </td>
                    <th>NOTA<br>FISCAL</th>
                    <td>00000</td>
                    <th>EMISSÃO</th>
                    <td>00/00/0000</td>
                    <th>EMITENTE</th>
                    <td colspan="5">EMITENTE DE TESTE</td>
                    <th>CNPJ</th>
                    <td>00.000.000/0000-00</td>
                    <th>UF</th>
                    <td>PE</td>
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

            <h4 style="margin-left: 2%;">Itens da Nota Fiscal</h4>

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
                        ${this.ITEM_NOTAFISCAL_LAYOUT}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    constructor(Object){
        document.getElementById('content').innerHTML += this.NOTA_FISCAL_LAYOUT;
    }
}