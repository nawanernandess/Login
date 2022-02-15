const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Post");
const Usuario = mongoose.model("usuarios"); 
const bcrypt = require("bcryptjs");
const passport = require("passport")

router.get('/logado', (req, res) => {
    res.render('logado')
})

router.get('/', (req, res) => {
    res.render('login')
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/logado",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)
})

router.get('/registro', (req, res) => {
    res.render('cadastro')
})

router.post('/adcinfo', (req, res) => {

    let erro =[]

    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null || !req.body.sobre || typeof req.body.sobre === undefined || req.body.sobre === null || !req.body.email || typeof req.body.email === undefined || req.body.email === null || !req.body.senha || typeof req.body.senha === undefined || req.body.senha === null){
        erro.push({text: "Preencha todos os campos!"}) 
    }else if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null){
        erro.push({text: "Nome Indefinido!"})
    }else{

    if(req.body.nome.length < 2){
        erro.push({text: "Nome pequeno, digite novamente!"})
    }

    if(!req.body.sobre || typeof req.body.sobre === undefined || req.body.sobre === null){
        erro.push({text: "Sobrenome Indefinido!"})
    }

    if(req.body.sobre.length < 2){
        erro.push({text: "Sobrenome pequeno, digite novamente!"})
    }

    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null){
        erro.push({text: "Email Indefinido!"})
    }

    if(req.body.email.length < 14){
        erro.push({text: "Email pequeno, digite novamente!"})
    }

    if(!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null){
        erro.push({text: "Senha Indefinida!"})
    }

    if(req.body.senha.length < 4){
        erro.push({text: "Senha pequena, minimo de 4 digitos!"})
    }

}


    if(erro.length > 0){
        res.render("../views/cadastro", {erro: erro})
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash("msg_error", "Email já cadastrado")
                res.redirect("/registro")
            }else{
                const newuser = new Usuario({
                    nome: req.body.nome,
                    sobrenome: req.body.sobre,  
                    email: req.body.email,
                    senha: req.body.senha
                }) 
                
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newuser.senha, salt, (erro, hash) =>{
                        if(erro){
                            req.flash("msg_error", "Houve um erro ao salvar o usuario")
                            res.redirect("/registro")
                        }

                        newuser.senha = hash
                        
                        newuser.save().then(() => {
                            req.flash("msg_success", "Usuario registrado com sucesso!")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("msg_error", "Erro ao cadastrar usuario, tente novamente!!")
                            res.redirect("/registro")
                        })
                    })
                })


            }
        }).catch((err) => {
            req.flash("msg_error", "Houve um erro interno!")
            res.redirect("/registro")
        })
    }
})


module.exports = router;