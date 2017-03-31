const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

const schemaJornada = mongoose.Schema({
    idViagem: String,
    data: Date,
    veiculo: String,
    motorista: String,
    jornada: Number
});

schemaJornada.index({createDate: 1}, {expireAfterSeconds: 864000});

mongoose.model('Jornada', schemaJornada, 'jornadaMonitriip');

module.exports = () => mongoose.model('Jornada');