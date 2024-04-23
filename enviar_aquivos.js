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
        }
    }

    ajax.open("GET", "LEITOR_NF_API/API_LeituraNotasFiscais.php");
    ajax.send();
}