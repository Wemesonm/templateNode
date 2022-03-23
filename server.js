require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));



const routes = require('./routes');
const path = require('path');
const { middlewareGlobal, middlewareOutro} = require('./src/middlewares/middleware')

const PORT = 3000;

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public'))); // I can pass the relative path too like: './public'

app.set('views', path.resolve(__dirname, 'src', 'views')); // I can pass the relative path too like: './scr/views'
app.set('view engine', 'ejs');

//Nossos proprios middlewares
app.use(middlewareGlobal);
app.use(middlewareOutro);

app.use(routes);

// mongodb+srv://wemeson:Maroca01@cursojs1.eu2d5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.on('pronto',() => {

    app.listen(PORT, ()=> {console.log(`Acess: http://localhost:${PORT}`);});
})
