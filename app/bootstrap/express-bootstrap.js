let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidador = require('express-validator');
let validator = require('express-validator');
let customValidations = require('../util/customValidations')();
let ErrorInterceptor = require('../middleware/errorInterceptor')();
let CorsInterceptor = require('../middleware/corsInterceptor')();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(CorsInterceptor.intercept);
app.use(expressValidador());

app.use(validator({
    customValidators:customValidations
}));

app.set('jwt_web_key','m2m');

consign({cwd:'app'})
    .include('util')
    .then('database')
    .then('modelo')
    .then('repositorio')
    .then('servico')
    .then('middleware')
    .then('controladores')
    .then('beans')
    .then('rotas')
    .into(app); 

app.use(ErrorInterceptor.intercept);

module.exports = app;


