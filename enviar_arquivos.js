if (sessionStorage.getItem('server_response') != null){
    chamarListaNCM().then(()=>{
        mostrarNotasFiscais(JSON.parse(sessionStorage.getItem('server_response')), document.getElementById('container'));
    })
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
            console.log(ajax.response);
            if (ajax.response == 'Arquivos carregados com sucesso!'){
                RequisicaoJSON();
            }
        }
    }

    ajax.open("POST", "API/POST/NOTAFISCAL/");
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

    ajax.open("GET", "API/GET/NOTAFISCAL/");
    ajax.responseType = "json";
    ajax.send();
}

function verificarSeOClienteEstaNaBaseDeDados(CNPJ){
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
    
        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4){
                if (ajax.status == 200){
                    if (ajax.response !== null){
                        const Form = document.getElementById('configuracaoRapida');
                        Form.MVA.value = ajax.response.mva;
                        Form.TRIBUTACAO.value = ajax.response.tributacao;
                        Form.TRIBUTACAO.dispatchEvent(new Event('change'));
                        Form.SITUACAO.value = ajax.response.situacao;
                        Form.ALSN4.value = parseFloat(ajax.response.alsn4)/100;
                        Form.ALSN7.value = parseFloat(ajax.response.alsn7)/100;
                        Form.ALSN12.value = parseFloat(ajax.response.alsn12)/100;
                    }

                    resolve()
                }else{
                    reject()
                }
            }
        }
    
        ajax.open("GET", "API/GET/CLIENTE/?cnpj=" + encodeURIComponent(CNPJ));
        ajax.responseType = "json";
        ajax.send();
    })
}

function informacoesDaempresa(nota_fiscal){
    document.getElementById('RazaoSocialDasNotasCalculadas').textContent = nota_fiscal.dest.RAZAO_SOCIAL;

    const Form = document.getElementById('configuracaoRapida');

    Form.CNPJ.value = formatoCNPJ(nota_fiscal.dest.CNPJ);
    Form.IE.value = nota_fiscal.dest.IE;
    Form.UF.value = nota_fiscal.dest.UF;

}

async function mostrarNotasFiscais(request_answer, container){  

    await verificarSeOClienteEstaNaBaseDeDados(request_answer[0].dest.CNPJ);
    informacoesDaempresa(request_answer[0]);

    request_answer.forEach(NF => {
        container.innerHTML += HTML_STRUCT_NOTAFISCAL(NF);
    });

    leitura_de_ncm()

    const notasFiscais = document.querySelectorAll('.NotaFiscal')

    notasFiscais.forEach(nota => {
        nota.querySelector('.mostrarResumo').addEventListener('click', () => {
            nota.querySelector('.table-resumo-NotaFiscal').style.display = '';
            nota.querySelector('.table-itens-NotaFiscal').style.display = 'none';
        })
        nota.querySelector('.mostrarItens').addEventListener('click', () => {
            nota.querySelector('.table-resumo-NotaFiscal').style.display = 'none';
            nota.querySelector('.table-itens-NotaFiscal').style.display = '';
        })
    })
}

function leitura_de_ncm(){
    const ncms_notas = document.querySelectorAll('.table-itens-NotaFiscal');

    Array.from(ncms_notas).forEach(nota => {
        Array.from(nota.rows).forEach(row =>{
            if(row.children[1] != undefined && row.children[1].textContent != 'NCM'){
                if(procurarNCM(row.children[1].textContent, row.children[2].textContent) != 0){
                    document.getElementById(row.id + "CALC").innerHTML = SubstituicaoTributaria(row.children, procurarNCM(row.children[1].textContent, row.children[2].textContent));
                    row.children[14].children[0].value = 0;
                }else{
                    document.getElementById(row.id + "CALC").innerHTML = AntecipacaoTributaria(row.children);
                    console.log(document.getElementById(row.id + "CALC"))
                }
            }
        })
    })

    TotalImposto('');
}

function procurarNCM(NCM, CEST){
    const ncms_bd = document.querySelectorAll('#listarNCMS tr');
    
    for(let i = 0; i < ncms_bd.length; i++){

        let ncm = ncms_bd[i];
        let ncm_procurado = NCM;

        for(let i = 0; i < 5; i++){
            if (ncm_procurado == ncm.children[0].textContent && ncm.children[1].textContent == CEST){
                return [ncm.children[3].textContent, parseFloat(ncm.children[5].textContent)/100, parseFloat(ncm.children[4].textContent)/100];
            }
            if (ncm_procurado == ncm.children[0].textContent && ncm.children[1].textContent != CEST){
                return [ncm.children[3].textContent, parseFloat(ncm.children[5].textContent)/100, parseFloat(ncm.children[4].textContent)/100];
            }
            ncm_procurado = ncm_procurado.slice(0, -1);
        }
    }

    return 0;
}

function TotalImposto(nota){
    if(nota == ''){
        document.querySelectorAll('#container div.NotaFiscal').forEach(nota =>{
        let itens = nota.querySelectorAll('.table-itens-NotaFiscal tr')
        let totaNota = 0
        let totalImposto = 0;

        itens.forEach(item =>{
            if(item.children.length == 16){
            totalImposto += parseFloat(item.children[15].textContent)

                if (item.children[6].textContent != 'VALOR'){
                    totaNota += getItemValor(item.children[6].textContent) + getItemValor(item.children[7].textContent) + getItemValor(item.children[8].textContent) + getItemValor(item.children[9].textContent) + getItemValor(item.children[10].textContent) - getItemValor(item.children[11].textContent)
                }
            }
        })

        let impostoPago = parseFloat((nota.querySelectorAll(".NotaFiscal-Resumo tr")[1].children[7].textContent).replace(",", "."))
        
        totaNota += impostoPago

        nota.querySelectorAll(".NotaFiscal-Resumo tr")[1].children[1].textContent = totaNota.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        nota.querySelectorAll(".NotaFiscal-Resumo tr")[1].children[3].textContent = totalImposto.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        nota.querySelectorAll(".NotaFiscal-Resumo tr")[1].children[9].textContent = (totalImposto - impostoPago).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

        function getItemValor(item){
            if(item != ''){return parseFloat(item)}
            return 0
        }
        })
    }
}

/* FUNÇÕES AUXILIARES */

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

/* FUNÇÕES AUXILIARES */