if (sessionStorage.getItem('server_response') != null){
    mostrarNotasFiscais(JSON.parse(sessionStorage.getItem('server_response')), document.getElementById('container'));
}


const fileInput = document.getElementById('upload');
const form = document.getElementById('upload-form');

fileInput.addEventListener('change', () => {
    document.getElementById('upload-btn').click();
});

form.addEventListener('submit', sendForm, false);

function sendForm(event){
    modalDeUpload("Enviando arquivos");

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
    modalDeUpload("Lendo Arquivos");

    let ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4){
            sessionStorage.setItem('server_response', JSON.stringify(ajax.response));
            location.reload();
        }
    }

    ajax.open("GET", "LEITOR_NF_API/API_LeituraNotasFiscais.php");
    ajax.responseType = "json";
    ajax.send();
}

function mostrarNotasFiscais(request_answer, container){  
    informacoesDaEmpresa(request_answer[0]);

    request_answer.forEach(NF => {
        container.innerHTML += HTML_STRUCT(NF);
    });
}

function informacoesDaEmpresa(nota){
    for(let i = 0; i < 4; i++){
        let newCell = document.createElement('td');
        if(i === 0){newCell.innerHTML = nota.dest.RAZAO_SOCIAL;}
        if(i === 1){newCell.innerHTML = formatoCNPJ(nota.dest.CNPJ);}
        if(i === 2){newCell.innerHTML = nota.dest.IE}
        if(i === 3){newCell.innerHTML = nota.dest.UF}
        document.getElementById('info-dest').appendChild(newCell);
    }
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

        <div class="NotaFiscal-Calculo" style="display: none;">
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
                    ${listagemDeProdutos(object_json.produtos, object_json.nNF, object_json.emit.CNPJ)}
                </tbody>
            </table>
        </div>
    </div>
    `;

    return HTML_STRUCT_NOTAFISCAL;
}


function listagemDeProdutos(lista_de_produtos, NF, CNPJ){
    let lista = "";
    lista_de_produtos.forEach(produto =>{
        lista += HTML_STRUCT_PRODUTO(produto, NF, CNPJ);
    });
    return lista;
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
            <select name="TIPO-CALCULO" id="TIPO-CALCULO" onchange="calcular(this.value, 'NI${produto.nItem}NF${NF+CNPJ}', 'NI${produto.nItem}NF${NF+CNPJ}CALC' )">
                <option value="0">S.T.</option>
                <option value="1">Antec. Trib.</option>
                <option value="2">Dif. Al.</option>
            </select>
        </td>
    </tr>
    <tr class="calculo" style="display: none;">
        <td id="NI${produto.nItem}NF${NF+CNPJ}CALC" colspan="13" style="background-color: transparent;">
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

function modalDeUpload(status){
    if(status === "Enviando arquivos"){
        document.getElementById("UPLOAD").style.display = 'none';
        document.getElementById("infoXML").style.display = 'none';
        document.getElementById("upload-bg").style.display = '';
        document.getElementById("loading").style.display = '';
        document.getElementById("upload-hd").children[0].innerHTML = "IMPORTANADO ARQUIVOS...";
    }

    if(status === "Lendo Arquivos"){
        document.getElementById("upload-hd").children[0].innerHTML = "LENDO OS ARQUIVOS...";
    }

    if (status === "OK"){
        document.getElementById("loading").style.display = 'none';
        document.getElementById("upload-hd").children[0].innerHTML = "TUDO CERTO COM OS ARQUIVOS!";
        document.getElementById("done").style.display = '';

        setTimeout(()=>{
            fecharOverlay();
            document.getElementById("done").style.display = 'none';
        }, 1500);
    }
}

function formatoData(dhEmi){
    dhEmi = dhEmi.split('T')[0]
    dhEmi = dhEmi.split('-');
    dhEmi = dhEmi[2] + "/" + dhEmi[1] + "/" + dhEmi[0];
    return dhEmi;
}

function formatoCNPJ(CNPJ){
    CNPJ = CNPJ.split("");
    CNPJ = CNPJ[0]+CNPJ[1]+"."+CNPJ[2]+CNPJ[3]+CNPJ[4]+"."+CNPJ[5]+CNPJ[6]+CNPJ[7]+"/"+CNPJ[8]+CNPJ[9]+CNPJ[10]+CNPJ[11]+"-"+CNPJ[12]+CNPJ[13];
    return CNPJ;
}

function calcular(value, ID_ITEM, ID_ITEM_CALC){
    CALCULO_ANTECIPACAO_DIFAL(ID_ITEM, ID_ITEM_CALC, value);
}

function CALCULO_ANTECIPACAO_DIFAL(ID_ITEM, ID_ITEM_CALC, TIPO){
    const ITEM = document.getElementById(ID_ITEM).children;

    const VALOR_PRODUTO = parseFloat(ITEM[6].textContent);
    const IPI = isNaN(parseFloat(ITEM[7].textContent))? 0: parseFloat(ITEM[7].textContent);
    const FRETE = isNaN(parseFloat(ITEM[8].textContent))? 0: parseFloat(ITEM[8].textContent);
    const SEGURO = isNaN(parseFloat(ITEM[9].textContent))? 0: parseFloat(ITEM[9].textContent);
    const OUTRAS_DESPESAS = isNaN(parseFloat(ITEM[10].textContent))? 0: parseFloat(ITEM[10].textContent);
    const DESCONTO = isNaN(parseFloat(ITEM[11].textContent))? 0: parseFloat(ITEM[11].textContent);
    const ICMS_AL = isNaN(parseFloat(ITEM[12].textContent))? 0: parseFloat(ITEM[12].textContent);
    const ICMS_ORIGEM = isNaN(parseFloat(ITEM[13].textContent))? 0: parseFloat(ITEM[13].textContent);

    if (TIPO == 1){
        document.getElementById(ID_ITEM_CALC).innerHTML = AntecipacaoTributaria(VALOR_PRODUTO, IPI, FRETE, SEGURO, OUTRAS_DESPESAS, DESCONTO, ICMS_AL, ICMS_ORIGEM);
    }
}