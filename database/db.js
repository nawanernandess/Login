const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//Criando um banco de Usuarios(Users)
mongoose.connect("mongodb://localhost/users").then(() => {
    console.log("Conectado!!")
}).catch((err) => { 
    console.log("Falha ao se conectar:" + err)
})


module.exports = mongoose;