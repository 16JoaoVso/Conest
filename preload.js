const  { contextBridge,ipcRenderer } = require('electron')


ipcRenderer.on('db-status', (event, status) => {
    console.log(status)

    // interagir diretamente no DOM do documento html (index.html)
    window.addEventListener('DOMContentLoaded', () =>{
        const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
    })
})

// Status de conexão (verificar se o banco de dados está conectado)

ipcRenderer.send('db-conect')

// processos
contextBridge.exposeInMainWorld('api', {
    openClient: () => ipcRenderer.send('open-client'),
    openSupp: () => ipcRenderer.send('open-supp'),
    openProduct: () => ipcRenderer.send('open-product'),
    openReports: () => ipcRenderer.send('open-reports'),
    dbMessage:(message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    infoSearchClient: () => ipcRenderer.send('dialog-infoSearchClient'),
    infoSearchSupp: () => ipcRenderer.send('dialog-infoSearchSupp'),
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    searchCliente: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    searchFornecedor: (razaoFornecedor) => ipcRenderer.send('search-fornecedor', razaoFornecedor),
    nameCliente: (args) => ipcRenderer.on('set-nameclient', args),
    razaoSupp: (args) => ipcRenderer.on('set-razaosupp', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataCliente: (dadosCliente) => ipcRenderer.on('data-client', dadosCliente),
    dataSupp: (dadosSupp) => ipcRenderer.on('data-supp', dadosSupp),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    updateCliente: (cliente) => ipcRenderer.send('update-client', cliente), 
    deleteCliente: (idCli) => ipcRenderer.send('delete-client', idCli),
    updateFornecedor: (fornecedor) => ipcRenderer.send('update-supp', fornecedor), 
    deleteFornecedor: (idFor) => ipcRenderer.send('delete-supp', idFor),
    focusClient:(focusCliente) => ipcRenderer.on('focus-client', focusCliente)
})