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
function teclaEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        // executar a função associada ao botão buscar
        buscarFornecedor()
    }
}

document.getElementById('frmFornecedor').addEventListener('keydown', teclaEnter)

function removerTeclaEnter() {
    document.getElementById('frmFornecedor').removeEventListener('keydown', teclaEnter)
}

let formFornecedor = document.getElementById('frmFornecedor')
let razaoFornecedor = document.getElementById('inputName')
let foneFornecedor = document.getElementById('inputPhone')
let emailFornecedor = document.getElementById('inputEmail')
let cnpjFornecedor = document.getElementById('inputCnpj')
let cepFornecedor = document.getElementById('inputCep')
let enderecoFornecedor = document.getElementById('logradouro')
let numeroFornecedor = document.getElementById('numero')
let complementFornecedor = document.getElementById('complemento')
let bairroFornecedor = document.getElementById ('bairro')
let cidadeFornecedor = document.getElementById ('localidade')
let ufFornecedor = document.getElementById ('uf')

formFornecedor.addEventListener('submit', async(event)=>{
    event.preventDefault()
    console.log(razaoFornecedor.value, foneFornecedor.value, emailFornecedor.value, cnpjFornecedor.value, cepFornecedor.value, enderecoFornecedor.value, numeroFornecedor.value, complementFornecedor.value, bairroFornecedor.value, cidadeFornecedor.value, ufFornecedor.value)

    const fornecedor = {
        razaoFor: razaoFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        cnpjFor: cnpjFornecedor.value,
        cepFor: cepFornecedor.value,
        enderecoFor: enderecoFornecedor.value,
        numeroFor: numeroFornecedor.value,
        complementoFor: complementFornecedor.value,
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
        api.infoSearchDialog()
    } else {
        api.searchFornecedor()
    }
}