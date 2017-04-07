const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

const schemaDetalheViagem = mongoose.Schema({
    idViagem: Number,
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

schemaDetalheViagem.index({createDate: 1}, {expireAfterSeconds: 864000});

mongoose.model('DetalheViagem', schemaDetalheViagem, 'detalheViagemMonitriip');

module.exports = () => mongoose.model('DetalheViagem');