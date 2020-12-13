//require env variable
require('dotenv').config();
//require express framework
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//import module 
const User = require('./models/user')
// create own app
const app = express();
//import node-localStorage module from scratch
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
//mongoose connect and set plugins
mongoose.connect(process.env.CUSTOMCONNSTR_DB_URL || process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

//Ejs View engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//set 
app.use('/', require('./routes/home'));
app.use('/', require('./routes/users'));

// define port for app
const port = process.env.PORT || 3000;
//config listen
app.listen(port, () => console.log(`server is running at port: ${port}`));