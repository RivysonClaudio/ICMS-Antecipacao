//const NCM_form = document.getElementById('ncm-form');

//NCM_form.addEventListener('submit', sendNCM, false);

const NCMS = document.getElementById('listarNCMS');

if(NCMS.textContent == ""){
    chamarListaNCM(NCMS);
}

const SEGMENTOS = document.getElementById('segmentos');

if(SEGMENTOS.textContent == ""){
    chamarSegmentos(SEGMENTOS);
}

function sendNCM(){
    const form = document.getElementById('ncm-form');

    document.querySelectorAll('#segmentos li').forEach(seg => {
        if (seg.textContent == form.SEGMENTO.value){form.SEGMENTO.value = seg.id}
    })

    form.DECRETO.value = '1';

    form.STATUS.value = (form.STATUS.value == 'ATIVO')? '1': '0';

    const formData = new FormData(form);

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () =>{
        if (ajax.status === 200 && ajax.readyState === 4){
            if (ajax.response == 'NCM Salvo com sucesso no Banco de Dados.'){
                form.reset()
                chamarListaNCM(NCMS)
            }
        }
    }

    ajax.open("POST", "API/POST/NCM/", true);
    ajax.send(formData);
}

function chamarListaNCM(NCM_TABLE){
    let ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4){
            const Lista_de_NCM = ajax.response;

            Lista_de_NCM.forEach(NCM => {
                const tr = document.createElement('tr');
                tr.id = NCM['id'];
                const content = `   <td>${NCM['ncm']}</td>
                                    <td>${NCM['cest']}</td>
                                    <td>${NCM['sts'] == '1'? 'ATIVO': 'INATIVO'}</td>
                                    <td>${String(NCM['seg']).toUpperCase()}</td>
                                    <td>${NCM['al']}</td>
                                    <td>${NCM['mva']}</td>
                                    <td>${NCM['dec']}</td>
                                    <td>${NCM['obs']}</td>
                                    <td>
                                        <div class="controls-NCM-table">
                                            <span class="material-symbols-outlined" title="Editar NCM">edit</span>
                                            <span class="material-symbols-outlined" style="color: red" title="Deletar NCM">delete</span>
                                        </div>
                                    </td>
                                `;
                tr.innerHTML = content;
                NCM_TABLE.appendChild(tr);
            });
        }
    }

    ajax.open("GET", "API/GET/NCM");
    ajax.responseType = "json";
    ajax.send();
}

function chamarSegmentos(SEGMENTOS_LISTA){
    let ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4){
            ajax.response.forEach(SEGMENTO => {
                SEGMENTOS_LISTA.innerHTML += `<li id="${SEGMENTO['id']}">${SEGMENTO['seg'].toUpperCase()}</li>`;
            });
        }
    }

    ajax.open("GET", "API/GET/SEGMENTOS");
    ajax.responseType = "json";
    ajax.send();
}