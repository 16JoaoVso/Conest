/**
 * Processo de renderização
 * clientes
 */

// Mudar propriedades do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// Alterar comportamento do Enter
// Função para manipular o evento enter
function teclaEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        // executar a função associada ao botão buscar
        buscarCliente()
    }
}

// Adicionar a função de manipulação da tecla enter
document.getElementById('frmCliente').addEventListener('keydown', teclaEnter)

// Função para remover o manipulador de eventos da tecla enter
function removerTeclaEnter() {
    document.getElementById('frmCliente').removeEventListener('keydown', teclaEnter)
}

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura dos  inputs do formulario (passp 1 - slides)
let formCliente = document.getElementById('frmCliente')
let nomeCliente = document.getElementById('inputName')
let foneCliente = document.getElementById('inputPhone')
let emailCliente = document.getElementById('inputAddress')
// eveto relacionado ao botão de adicionar (passo 1 - slide)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    //Empacotar os dados em um objeto e enviar ao main.js
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)
    // limpar os dados from após envio
    formCliente.reset()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Array (vetor) usado na renderização dos dados do cliente 
let arrayCliente = []
// Função que busca os dados do cliente (envia ao main um pedido pelo nome do cliente)
// Passo - 1 (slide)
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value
    // Validação (UX)
    if (nomeCliente === "") {
        // Validar campo obrigatorio
        api.infoSearchDialog()
    } else {
        // Enviar o pedido de busca junto com o nome do cliente
        api.searchCliente(nomeCliente)
    }
    // Foco no campo de busca (UX)
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })
    // setar nome cliente e habilitar cadasramento
    api.nameCliente((args) => {
        // Restaurar o comportamento da tecla enter
        removerTeclaEnter()
        let setNomeCliente = document.getElementById('inputSearch').value
        document.getElementById('inputName').value += setNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputName').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    // limpar a caixa de de busca e setar o foco
    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // receber do main.js os dados do cliente
    api.dataCliente((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(arrayCliente)
    })
    // Passo 5 - Percorrer o array, extrair os dados e setar os campos de texto
    arrayCliente.forEach((c) => {
        document.getElementById('inputId').value = c._id
        document.getElementById('inputName').value = c.nomeCliente
        document.getElementById('inputAddress').value = c.emailCliente
        document.getElementById('inputPhone').value = c.foneCliente
        // Limpar caixa de busca
        document.getElementById('inputSearch').value = ""
       //remover o foco e desativar a caixa de busca
       document.getElementById('inputSearch').disabled = true
       document.getElementById("inputSearch").blur()
       //desativar os botão adicionar e buscar
       document.getElementById("btnCreate").disabled = true
       document.getElementById("btnRead").disabled = true
       // ativar os botões update e delete
       document.getElementById("btnUpdate").disabled = false
       document.getElementById("btnDelete").disabled = false
    })
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Reset no formulario
function resetForm() {
    document.getElementById('inputSearch').focus()
    document.getElementById('inputSearch').disabled = false
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    btnRead.disabled = false
    document.getElementById("frmCliente").addEventListener("keydown", teclaEnter)
}
