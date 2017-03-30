var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidador = require('express-validator');

var app = express();

// app.use(express.static('/.app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidador());

consign({cwd:'app'})
    .include('util')
    .include('database')
    .then('modelo')
    .then('repositorio')
    // .then('servico')
    // .then('middleware')
    .then('controladores')
    .then('beans')
    .then('rotas')
    .into(app);

module.exports = app;


