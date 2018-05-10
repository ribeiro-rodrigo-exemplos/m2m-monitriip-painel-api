const mongoose = require('mongoose');
const safira = require('safira');

const SchemaTypes = mongoose.Schema.Types;

const schemaTotalizadores = mongoose.Schema({
    linha: String,
    clienteId: Number,
    mes: String
});

let totalizadores = mongoose.model('Totalizadores', schemaTotalizadores, 'totalizadores');

safira.defineObject(totalizadores,'totalizadores');