const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

const PORT = 3000;

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public'))); // I can pass the relative path too like: './public'

app.set('views', path.resolve(__dirname, 'src', 'views')); // I can pass the relative path too like: './scr/views'
app.set('view engine', 'ejs');

app.use(routes);



app.listen(PORT, ()=> {console.log(`Acess: http://localhost:${PORT}`);});
