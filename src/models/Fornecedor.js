/** 
 * Modelo de dados (model) Fornecedor
*/
const { model, Schema} = require('mongoose')

const fornecedorSchema = new schema({
    razaoFornecedor: {
        type: String
    },
    cnpjFornecedor: {
        type: String
    },
    foneFornecedor: {
        type: String
    },
    emailFornecedor: {
        type: String
    },
    cepFornecedor: {
        type: String
    },
    enderecoFornecedor: {
        type: String
    },
    numeroFornecedor: {
        type: String
    },
    complementoFornecedor: {
        type: String
    },
    cidadeFornecedor: {
        type: String
    },
    ufFornecedor: {
        type: String
    },
    bairroFornecedor: {
        type: String
    }
})

module.exports = model('Fornecedor', fornecedorSchema)