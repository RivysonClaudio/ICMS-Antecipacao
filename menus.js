function navBOTOES(botao){
    if (botao == "XML"){
        document.body.style.overflow = "hidden";
        document.getElementById("overlay").style.display = 'flex';
        document.getElementById("modal-xml").style.display = '';
    }
    if(botao == "NCM"){
        document.getElementById("menu-ncm").style.display = (document.getElementById("menu-ncm").style.display == 'none')? '': 'none';
    }
    if (botao == "DECRETO"){
        document.getElementById("overlay").style.display = 'flex';
        document.getElementById("modal-decretos").style.display = '';
        document.body.style.overflow = "hidden";
    }
}

function MenuNCM(option){
    document.getElementById("overlay").style.display = 'flex';
    if (option == "CADASTRAR"){
         document.getElementById("modal-cadastrar-ncm").style.display = '';
         document.getElementById("modal-ncm-tabela").style.display = 'none';
         document.body.style.overflow = "hidden";
    }else if (option == "PESQUISAR"){
        document.getElementById("modal-ncm-tabela").style.display = '';
        document.getElementById("modal-cadastrar-ncm").style.display = 'none';
        document.body.style.overflow = "hidden";
    }   
}

function mostrarItens(lista){
    const segmento = document.getElementById("segmentos");
    const decreto = document.getElementById("decretos");
    const status = document.getElementById("status");
    const observacao = document.getElementById("observacao");

    if(lista == 'SEGMENTO'){
        segmento.style.display = 'flex';
        decreto.style.display = 'none';
        status.style.display = 'none';
        observacao.style.display = 'none';
        selecionarOpcao(segmento, document.getElementById('SEGMENTO'));
    }else if (lista == 'DECRETO'){
        segmento.style.display = 'none';
        decreto.style.display = 'flex';
        status.style.display = 'none';
        observacao.style.display = 'none';
        selecionarOpcao(decreto, document.getElementById('DECRETO'));
    }else if (lista == 'STATUS'){
        segmento.style.display = 'none';
        decreto.style.display = 'none';
        status.style.display = 'flex';
        observacao.style.display = 'none';
        selecionarOpcao(status, document.getElementById('STATUS'));
    }else if(lista == 'OBSERVACAO'){
        segmento.style.display = 'none';
        decreto.style.display = 'none';
        status.style.display = 'none';
        observacao.style.display = '';
    }
    else{
        segmento.style.display = 'none';
        decreto.style.display = 'none';
        status.style.display = 'none';
    }

    function selecionarOpcao(ul, input){
        ul.addEventListener('click', (event)=>{
            if(event.target.tagName === 'LI'){
                input.value = event.target.innerHTML;
            }
        })
    }

    document.getElementById("observacao").addEventListener('input', (event)=>{
        document.getElementById("OBSERVACAO").value = event.target.value;
    });
    document.getElementById("OBSERVACAO").addEventListener('input', (event)=>{
        document.getElementById("observacao").value = event.target.value;
    });
}

function fecharOverlay(){
    document.body.style.overflow = 'auto';
    document.getElementById("overlay").style.display = 'none';
    document.getElementById("modal-xml").style.display = 'none';
    document.getElementById("modal-cadastrar-ncm").style.display = 'none';
    document.getElementById("modal-ncm-tabela").style.display = 'none';
    document.getElementById("modal-decretos").style.display = 'none';
}