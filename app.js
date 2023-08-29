const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const login = require('./src/routes/route-login');
app.use('/', login);

const mhs = require('./src/routes/route-mhs');
app.use('/', mhs);


app.listen(8081, ()=>{
    console.log('Server Berjalan di Port : 8081');
});
