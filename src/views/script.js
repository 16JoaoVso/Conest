// Seleciona os elementos do formulário
const cepInput = document.getElementById('inputCep');
const logradouroInput = document.getElementById('logradouro');
const numeroInput = document.getElementById('numero');
const complementoInput = document.getElementById('complemento');
const bairroInput = document.getElementById('bairro');
const localidadeInput = document.getElementById('localidade');
const ufInput = document.getElementById('uf');
const BotaoBuscar = document.getElementById('btnSearchCep');

// Adiciona um evento de click ao botão "Buscar"
BotaoBuscar.addEventListener('click', buscarEndereco);

// Função que busca as informações de endereço
function buscarEndereco() {
  // Pega o valor do CEP digitado
  const cep = cepInput.value;

  // Faz a requisição à API dos Correios ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      // Preenche os campos do formulário com as informações retornadas
      logradouroInput.value = data.logradouro;
      numeroInput.value = data.complemento;
      complementoInput.value = data.numero;
      bairroInput.value = data.bairro;
      localidadeInput.value = data.localidade;
      ufInput.value = data.uf;
    })
    .catch(error => console.error('Erro ao buscar endereço:', error));
}