const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
//const Post = require("./database/Post");
const router = require("./routes/rts");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const passport = require("passport");
require("./config/auth")(passport);


//Configurações
    //Seções
        app.use(session({
            secret: 'chavedesegurancadasession',
            resave: true,
            saveUninitialized:true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
    //Flash
        app.use(flash())

    //Middleware
        app.use((req, res, next) => {
            res.locals.msg_success = req.flash("msg_success")
            res.locals.msg_error = req.flash("msg_error")
            res.locals.error = req.flash("error")
            next()
        })
    //mongoose
    //está em pasta separada (db).

    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

    //Template Engine Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    // public(bootstrap)
        app.use(express.static(path.join(__dirname, "public")))    

//Rotas
app.use(router);

/*
app.post('/adcinfo', (req, res) => {
    Post.create({
        nome: req.body.cNome,
        sobre_nome: req.body.cSobreN,
        email: req.body.cEmail,
        senha: req.body.cSenha
    }).then(() => {
        res.send("direcionado com sucesso!")
    }).catch((erro) => {
        res.send('ERRO: '+erro)
    })
})
*/

app.listen(8080, () => {
    console.log('Servidor iniciado com sucesso na porta 8080: http://localhost:8080');
});