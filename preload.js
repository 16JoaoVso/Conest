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
    infoSearchDialog: () => ipcRenderer.send('dialog-infoSearchDialog'),
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    searchCliente: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    searchFornecedor: (nomeFornecedor) => ipcRenderer.send('search-fornecedor', nomeFornecedor),
    nameCliente: (args) => ipcRenderer.on('name-client', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataCliente: (dadosCliente) => ipcRenderer.on('dataclient', dadosCliente),
    resetForm: (args) => ipcRenderer.on('reset-form', args)
})