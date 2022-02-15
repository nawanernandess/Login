//Definindo uma tabela no banco de dados
    
    const mongoose = require('../database/db');
    const Schema = mongoose.Schema;
    
    const Usuario = new Schema({
        nome:{
            type: String,
            required: true
        },
        sobrenome:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required: true
        },
        senha:{
            type: String,
            required: true
        },
        data:{
            type: Date,
            default: Date.now()
        }
    })


    mongoose.model("usuarios", Usuario)

  