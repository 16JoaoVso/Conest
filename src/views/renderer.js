
function Clientes() {
    api.openClient()
}
function Fornecedores() {
    api.openSupp()
}
function Produtos() {
    api.openProduct()
}
function Relatorios() {
    api.openReports()
}

document.getElementById('dataAtual').innerHTML = obterData()

function obterData() {
    const data = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options);
}

// alteração do icone de status do banco de dados
api.dbMessage((event, message) =>{
    console.log(message)
    if (message === "conectado"){
        document.getElementById('status').src = "../public/img/dbon.png"
    } else {
        document.getElementById('status').src = "../public/img/dboff.png"
    }
})
