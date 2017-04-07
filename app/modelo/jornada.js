const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

const schemaJornada = mongoose.Schema({
    idJornada: String,
    dataInicial: String,
    //coordenadasInicio: [],
    cpfMotorista: String,
    placaVeiculo: String,
    idCliente: Number,
    dataFinal: String,
    //coordenadasFim : []
});

schemaJornada.index({createDate: 1}, {expireAfterSeconds: 864000});

mongoose.model('Jornada', schemaJornada, 'jornada');

module.exports = () => mongoose.model('Jornada');