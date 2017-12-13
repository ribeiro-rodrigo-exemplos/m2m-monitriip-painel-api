let express = require('express');
let bodyParser = require('body-parser');
let validator = require('express-validator');
let customValidations = require('../util/customValidations');
const safira = require('safira');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator({
    customValidators:customValidations
}));

safira.defineObject(app,'app');



