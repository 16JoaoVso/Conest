const { ipcMain, dialog, nativeTheme } = require('electron')
const { app, BrowserWindow, Menu, shell } = require('electron/main')
const path = require('node:path')

//importar o modulo de conexão
const { desconectar, conectar } = require('./database.js')




let = dbCon = null

//Importação do Schema das tabelas ("coleções")
const clienteModel = require("./src/models/Cliente.js")
const fornecedorModel = require("./src/models/Fornecedor.js")



// janela principal (definir o objeto win como variável pública)
const createWindow = () => {
    nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        icon: './src/public/img/mercado.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

//janela sobre
let about //Resolver bug de abertura de várias janela
const aboutWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!about) {
        about = new BrowserWindow({
            width: 460, //largura
            height: 300, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/sobre.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    about.loadFile('./src/views/sobre.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}

let client //Resolver bug de abertura de várias janelas

const clientWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!client) {
        client = new BrowserWindow({
            width: 1280, //largura
            height: 720, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/ajuda.png',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    // nativeTheme.themeSource = 'dark'
    client.loadFile('./src/views/clientes.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    client.on('closed', () => {
        client = null
    })
}

let supp //Resolver bug de abertura de várias janelas
// fornecedor
const suppWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!supp) {
        supp = new BrowserWindow({
            width: 1280, //largura
            height: 720, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/suppky.png',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    // nativeTheme.themeSource = 'dark'
    supp.loadFile('./src/views/fornecedores.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    supp.on('closed', () => {
        supp = null
    })
}

let product //Resolver bug de abertura de várias janelas

const productWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!product) {
        product = new BrowserWindow({
            width: 1280, //largura
            height: 720, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/product2.png',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    // nativeTheme.themeSource = 'dark'
    product.loadFile('./src/views/produtos.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    product.on('closed', () => {
        product = null
    })
}

let reports //Resolver bug de abertura de várias janelas

const reportsWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!reports) {
        reports = new BrowserWindow({
            width: 1280, //largura
            height: 720, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/report.png',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    // nativeTheme.themeSource = 'dark'
    reports.loadFile('./src/views/relatorios.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    reports.on('closed', () => {
        reports = null
    })
}

// iniciar a aplicação
app.whenReady().then(() => {

    //status de conexão com o banco de dados
    ipcMain.on('db-conect', async (event, message) => {
        dbCon = await conectar()
        event.reply('db-message', "conectado")
    })

    //desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar(dbCon)
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



// Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            },
            {
                label: 'Clientes',
                click: () => clientWindow(),
            },
            {
                label: 'Fornecedores',
                click: () => suppWindow(),
            },
            {
                label: 'Produtos',
                click: () => productWindow(),
            },
            {
                label: 'Relatorios',
                click: () => reportsWindow(),
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Projetos',
                click: () => shell.openExternal('https://github.com/16JoaoVso')
            },
            {
                type: 'separator'
            },
            {
                label: 'Sobre',
                click: () => aboutWindow(),
            }
        ]
    },
]

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) //Teste de passo 2 -slide
    // Passo 3 (slide): cadastrar o cliente no mongodb
    try {
        // Extrair os dados do objeto
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        })
        console.log(novoCliente)
        await novoCliente.save() //save() - moongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: 'Cliente cadastrado com sucesso',
            buttons: ['OK']
        })
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})




//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Aviso (Busca: preechimento de campo obrigatório)
ipcMain.on('dialog-infoSearchClient', (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: 'Atenção!',
        message: 'Preencha o cliente no campo de busca',
        buttons: ['OK']
    })
    event.reply('focus-search')
})
// Recebimento do pedido de busca de um cliente pelo nome (passo 1)
ipcMain.on('search-client', async (event, nomeCliente) => {
    console.log(nomeCliente)
    //Passo 2: Busca no banco de dados
    try {
        // find() é o "metodo de busca" newRegex 'i' case insetive
        const dadosCliente = await clienteModel.find({ nomeCliente: new RegExp(nomeCliente, 'i') }) // Passo 2
        console.log(dadosCliente) // Passo 3: recebimento dos dados do cliente
        //UX (Se o cliente não estiver cadastrado, avisa o usuario e habilita cadastro)
        if (dadosCliente.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Atenção!',
                message: 'Cliente não cadastrado. \nDeseja cadastrar esse cliente?',
                defaultId: 0,
                buttons: ['Sim', 'Não']

            }).then((result) => {
                if (result.response === 0) {
                    // Setar o nome do cliente no form e habilitar cadastramento
                    event.reply('set-nameclient')
                } else {
                    // limpar caixa de busca
                    event.reply('clear-search')
                }
            })
        } else {
            // Passo 4: enviar os dados do cliente renderizado
            event.reply('data-client', JSON.stringify(dadosCliente))
        }
    } catch (error) {
        console.log(error)
    }
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-client', async (event, cliente) => {
    console.log(cliente) //Teste do passo 2 - slide

    try {
        const clienteEditado = await clienteModel.findByIdAndUpdate(
            cliente.idCli, {
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: 'aviso',
            message: "Dados do cliente alterados com sucesso",
            buttons: ['OK']
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)

    }

})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-client', (event, idCli) => {
    console.log(idCli)
    dialog.showMessageBox({
        type: 'error',
        title: 'ATENÇÃO!',
        message: 'Tem certeza que deseja que esse cliente seja exlcuido ?',
        buttons: ['Sim', 'Não'],
        defaultId: 0
    }).then(async (result) => {
        if (result.response === 0) {

            try {
                await clienteModel.findByIdAndDelete(idCli)
                event.reply('reset-form')
            } catch (error) {
                console.log(error)
            }
        }
    })
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD CREATE Fornecedor

ipcMain.on('new-fornecedor', async (event, fornecedor) => {
    console.log(fornecedor)
    try {
        const novoFornecedor = new fornecedorModel({
            razaoFornecedor: fornecedor.razaoFor,
            foneFornecedor: fornecedor.foneFor,
            emailFornecedor: fornecedor.emailFor,
            cnpjFornecedor: fornecedor.cnpjFor,
            cepFornecedor: fornecedor.cepFor,
            enderecoFornecedor: fornecedor.enderecoFor,
            numeroFornecedor: fornecedor.numeroFor,
            complementoFornecedor: fornecedor.complementoFor,
            bairroFornecedor: fornecedor.bairroFor,
            cidadeFornecedor: fornecedor.cidadeFor,
            ufFornecedor: fornecedor.ufFor
        })
        console.log(novoFornecedor)   
        await novoFornecedor.save()
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: 'Fornecedor cadastrado com sucesso',
            buttons: ['OK']
        })
        event.reply('reset-form')


    } catch (error) {
        console.log(error)
    }
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ Fornecedor
    ipcMain.on('dialog-infoSearchSupp', (event)=>{
        dialog.showMessageBox({
            type: 'warning',
            title: 'Atenção!',
            message: 'Preencha a razão do Fornecedor no campo de busca',
            buttons: ['OK']
        })
        event.reply('focus-search')
    })
    ipcMain.on('search-fornecedor', async (event, razaoFornecedor)=>{
        console.log(razaoFornecedor)
        try {
            const dadosSupp = await fornecedorModel.find({razaoFornecedor: new RegExp(razaoFornecedor, 'i') })
            console.log(dadosSupp)

            if(dadosSupp.length === 0) {
                dialog.showMessageBox({
                    type: 'warning',
                    title: 'Atenção!',
                    message: 'Fornecedor não cadastrado. \nDeseja cadastrar esse fornecedor?',
                    defaultId: 0,
                    buttons: ['Sim', 'Não']
    
                }).then((result) => {
                    if(result.response === 0) {
                        event.reply('set-razaosupp')
                    } else {
                        event.reply('clear-search')
                    }
                })
            } else {
                event.reply('data-supp', JSON.stringify(dadosSupp))
            }
        } catch (error) {
            console.log(error)
        }
    })

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD UPDATE Fornecedor
ipcMain.on('update-supp', async (event, fornecedor)=> {
    console.log(fornecedor)

    if (fornecedor.razaoFor === '') {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Aviso',
            message: 'Preencha os campos obrigatórios',
            buttons: ['Ok'],
            defaultId: 0
        })
        event.reply('focus-client')
        return
    }

    try{
        const fornecedorEditado = await fornecedorModel.findByIdAndUpdate(
            fornecedor.idFor, {
            razaoFornecedor: fornecedor.razaoFor,
            foneFornecedor: fornecedor.foneFor,
            emailFornecedor: fornecedor.emailFor,
            cnpjFornecedor: fornecedor.cnpjFor,
            cepFornecedor: fornecedor.cepFor,
            enderecoFornecedor: fornecedor.enderecoFor,
            numeroFornecedor: fornecedor.numeroFor,
            complementoFornecedor: fornecedor.complementoFor,
            bairroFornecedor: fornecedor.bairroFor,
            cidadeFornecedor: fornecedor.cidadeFor,
            ufFornecedor: fornecedor.ufFor
            },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: 'aviso',
            message: "Dados do fornecedor alterados com sucesso",
            buttons: ['OK']
        })
        event.reply('reset-form')
    } catch(error) {
        console.log(error)
    }
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete Fornecedor
ipcMain.on('delete-supp', (event, idFor)=>{
    console.log(idFor)
    dialog.showMessageBox({
        type: 'error',
        title: 'ATENÇÃO!',
        message: 'Tem certeza que deseja que esse fornecedor seja exlcuido ?',
        buttons: ['Sim', 'Não'],
        defaultId: 0
    }).then(async (result) => {
        if (result.response === 0) {
            
            try {
                await fornecedorModel.findByIdAndDelete(idFor)
                event.reply('reset-form')
            } catch (error) {
                console.log(error)
            }
        }
    })
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<







//==================================================================================//
//função que verifica o status da conexão
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', 'Banco de dados conectado.')
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão ${error.message}`)
    }
}
ipcMain.on('open-client', () => {
    clientWindow()
})
ipcMain.on('open-supp', () => {
    suppWindow()
})
ipcMain.on('open-product', () => {
    productWindow()
})
ipcMain.on('open-reports', () => {
    reportsWindow()
})