const fileInput = document.getElementById('upload');
const form = document.getElementById('upload-form');

fileInput.addEventListener('change', () => {
    document.getElementById('upload-btn').click();
});

form.addEventListener('submit', sendForm, false);

function sendForm(event){
    let formData, ajax;

    formData = new FormData(event.target);

    ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4){
            form.reset();
            if (ajax.response == 'Arquivos carregados com sucesso!'){
                RequisicaoJSON();
            }
        }
    }

    ajax.open("POST", "LEITOR_NF_API/API_RecebimentoNotasFiscais.php");
    ajax.send(formData);
}

function RequisicaoJSON(){
    let ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4){
            console.log(ajax.response);
            mostrarNotasFiscais(ajax.response, document.getElementById('container'));
        }
    }

    ajax.open("GET", "LEITOR_NF_API/API_LeituraNotasFiscais.php");
    ajax.responseType = "json";
    ajax.send();
}

function mostrarNotasFiscais(request_answer, container){
    request_answer.forEach(NF => {
        container.innerHTML += HTML_STRUCT(NF);
    });
}

function HTML_STRUCT(object_json){
    const HTML_STRUCT_NOTAFISCAL = 
    `
    <div class="NotaFiscal">
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
                <td colspan="5">${object_json.emit.RAZAO_SOCIAL}</td>
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
                    ${listagemDeProdutos(object_json.produtos)}
                </tbody>
            </table>
        </div>
    </div>
    `;

    return HTML_STRUCT_NOTAFISCAL;
}

function listagemDeProdutos(lista_de_produtos){
    let lista;
    lista_de_produtos.forEach(produto =>{
        lista += HTML_STRUCT_PRODUTO(produto);
    });
    return lista;
}

function HTML_STRUCT_PRODUTO(produto){
    const PRODUTO_STRUCT = 
    `
    <tr>
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
        <td>
            <select name="TIPO-CALCULO" id="TIPO-CALCULO">
                <option value="">S.T.</option>
                <option value="">Antec. Trib.</option>
                <option value="">Dif. Al.</option>
            </select>
        </td>
    </tr>
    <tr class="calculo" style="display: none;">
        <td colspan="13" style="background-color: transparent;">
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
                    <td>AUTOPEÇAS</td>
                    <td>151,00</td>
                    <td>0</td>
                    <td>151,00</td>
                    <td>4,00</td>
                    <td>6,04</td>
                    <td>71,78</td>
                    <td>101,11</td>
                    <td>319,46</td>
                    <td>20,50</td>
                    <td>59,45</td>
                </tr>
            </table>
        </td>
    </tr>
    `;

    return PRODUTO_STRUCT;
}