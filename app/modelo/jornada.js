const mongoose = require('mongoose');
const safira = require('safira');
const SchemaTypes = mongoose.Schema.Types;

const schemaJornada = mongoose.Schema({
    idJornada: String,
    dataInicial: String,
    cpfMotorista: String,
    placaVeiculo: String,
    idCliente: Number,
    dataFinal: String
});

let jornada = mongoose.model('Jornada', schemaJornada, 'jornada');

safira.defineObject(jornada,'jornada');

