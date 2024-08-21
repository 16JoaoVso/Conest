/**
 * Processo de renderização
 * Fornecedores
 */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

let idFornecedor = document.getElementById('inputId')
let formFornecedor = document.getElementById('frmFornecedor')
let razaoFornecedor = document.getElementById('inputName')
let foneFornecedor = document.getElementById('inputPhone')
let emailFornecedor = document.getElementById('inputEmail')
let cnpjFornecedor = document.getElementById('inputCnpj')
let cepFornecedor = document.getElementById('inputCep')
let enderecoFornecedor = document.getElementById('logradouro')
let numeroFornecedor = document.getElementById('numero')
let complementoFornecedor = document.getElementById('complemento')
let bairroFornecedor = document.getElementById ('bairro')
let cidadeFornecedor = document.getElementById ('localidade')
let ufFornecedor = document.getElementById ('uf')

formFornecedor.addEventListener('submit', async(event)=>{
    event.preventDefault()
    console.log(razaoFornecedor.value, foneFornecedor.value, emailFornecedor.value, cnpjFornecedor.value, cepFornecedor.value, enderecoFornecedor.value, numeroFornecedor.value, complementoFornecedor.value, bairroFornecedor.value, cidadeFornecedor.value, ufFornecedor.value)

    const fornecedor = {
        idFor: idFornecedor,
        razaoFor: razaoFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        cnpjFor: cnpjFornecedor.value,
        cepFor: cepFornecedor.value,
        enderecoFor: enderecoFornecedor.value,
        numeroFor: numeroFornecedor.value,
        complementoFor: complementoFornecedor.value,
        bairroFor: bairroFornecedor.value,
        cidadeFor: cidadeFornecedor.value,
        ufFor: ufFornecedor.value
    }
    api.newFornecedor(fornecedor)

    formFornecedor.reset()
})

let arrayFornecedor = []

function buscarFornecedor() {
    let razaoFornecedor = document.getElementById('inputSearch').value

    if (razaoFornecedor === "") {
        api.infoSearchSupp()
    } else {
        api.searchFornecedor(razaoFornecedor)
    }
}
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })
    api.razaoSupp((args)=>{
        let setRazaoFornecedor = document.getElementById('inputSearch').value
        document.getElementById('inputName').value += setRazaoFornecedor
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputSearch').blur()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    api.dataSupp((event, dadosSupp) => {
        arrayFornecedor = JSON.parse(dadosSupp)
        console.log(arrayFornecedor)
    arrayFornecedor.forEach((c) => {
        document.getElementById('inputId').value = c._id
        document.getElementById('inputName').value = c.razaoFornecedor
        document.getElementById('inputPhone').value = c.foneFornecedor
        document.getElementById('inputEmail').value = c.emailFornecedor
        document.getElementById('inputCnpj').value = c.cnpjFornecedor
        document.getElementById('inputCep').value = c.cepFornecedor
        document.getElementById('logradouro').value = c.enderecoFornecedor
        document.getElementById('numero').value = c.numeroFornecedor
        document.getElementById('complemento').value = c.complementoFornecedor
        document.getElementById ('bairro').value = c.bairroFornecedor
        document.getElementById ('localidade').value = c.cidadeFornecedor
        document.getElementById ('uf').value = c.ufFornecedor
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
})

function editarFornecedor() {
    const fornecedor = {
        // Passo 1
        idFor: idFornecedor.value,
        razaoFor: razaoFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        cnpjFor: cnpjFornecedor.value,
        cepFor: cepFornecedor.value,
        enderecoFor: enderecoFornecedor.value,
        numeroFor: numeroFornecedor.value,
        complementoFor: complementoFornecedor.value,
        bairroFor: bairroFornecedor.value,
        cidadeFor: cidadeFornecedor.value,
        ufFor: ufFornecedor.value
    }
    console.log(fornecedor) // Teste passo 1
    // Passo 2 - Enviar o objeto cliente ao main.js
    api.updateFornecedor(fornecedor)
}
function excluirFornecedor() {
    let idFor = idFornecedor.value
    console.log(idFor)
    api.deleteFornecedor(idFor)
}
 

api.focusClient((focusClient) => {
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

api.resetForm((args)=>{
    resetForm()
    formFornecedor.reset()
})

function resetForm() {
    document.getElementById('inputSearch').disabled = false
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnRead.disabled = false
    btnUpdate.disabled = true
    btnDelete.disabled = true
}