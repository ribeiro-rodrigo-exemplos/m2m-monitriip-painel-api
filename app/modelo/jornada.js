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

schemaJornada.index({createDate: 1}, {expireAfterSeconds: 864000});

let jornada = mongoose.model('Jornada', schemaJornada, 'jornada');

safira.defineObject(jornada,'jornada');

