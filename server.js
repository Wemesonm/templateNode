require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, middlewareOutro, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');

app.use(helmet());

const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); // I can pass the relative path too like: './public'


const sessionOptions = session({
    secret: 'fdadfsafsdfdasfasd', //isso 'e uma string aleatoria
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}), 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7, //tempo de uma semana de cookie
        httpOnly: true
    },
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // I can pass the relative path too like: './scr/views'
app.set('view engine', 'ejs');

app.use(csrf());
//Nossos proprios middlewares
app.use(middlewareGlobal);
app.use(middlewareOutro);
app.use(checkCsrfError);
app.use(csrfMiddleware);


app.use(routes);

app.on('pronto',() => {

    app.listen(PORT, ()=> {console.log(`Acess: http://localhost:${PORT}`);});
})
