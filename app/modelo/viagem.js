const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

const schemaViagem = mongoose.Schema({
    idViagem: String,
    data: Date,
    veiculo: String,
    motorista: String,
    linha: String,
    tipo: String,
    quilometro: SchemaTypes.Decimal,
    tempo: String,
    bilhete: Number,
    parada: Number
});

schemaViagem.index({createDate: 1}, {expireAfterSeconds: 864000});

mongoose.model('Viagem', schemaViagem, 'viagemMonitriip');

module.exports = () => mongoose.model('Viagem');