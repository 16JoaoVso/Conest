/**
 * Módulo de conexão com o banco de dados
 * Uso do framework mongoose
 */

// importar a biblioteca
const mongoose = require('mongoose')

// definir o banco de dados (copiar a string do compass)
let url = "mongodb+srv://admin:senac123@clusterconest.s4vidpx.mongodb.net/Clientes"

let isConnected = false

const dbStatus = async() => {
    if (isConnected === false) {
        await conectar()
    }
}

// conectar 
const conectar = async () => {
    if (isConnected === false) {
        try {
            await mongoose.connect(url)
            isConnected = true
            console.log("Conectado ao MONGODB")
            return (isConnected)
        } catch (error) {
            console.log(`Problema detectado: ${error.message}`)
        }
    }
}

// desconectar 
const desconectar = async () => {
    if (isConnected === true) {
        try {
            await mongoose.disconnect(url)
            isConnected = false
            console.log("Desconectado ao MONGODB")
        } catch (error) {
            console.log(`Problema detectado: ${error.message}`)
        }
    }
}

// exportar para o main os metodos e desconectar
module.exports = { conectar, desconectar }