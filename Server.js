const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;



const personRoutes = require('./router/personRoutes.js');
const menuRoutes = require('./router/menuRoutes.js');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.get('/',function(req,res){
    res.send('Welcome to my hotel...How i can help you ??,We have list of menus')
})



app.listen(3000, ()=>{
    console.log('listening on port 3000');
})