const mongoose = require('mongoose');
const safira = require('safira');

const SchemaTypes = mongoose.Schema.Types;

const schemaViagem = mongoose.Schema({
    idPeriodo: String,
    idViagem: String,
    identificacaoLinha: String,
    dataInicial: String,
    dataFinal: String,
    cpfMotorista: String,
    placaVeiculo: String,
    descricaoLinha: String,
    idCliente: Number,
    totalKm: SchemaTypes.Decimal,
    totalBilhetes: Number,
    totalParadas: Number,
    velocidadeMaxima: SchemaTypes.Decimal,
    velocidadeMedia: SchemaTypes.Decimal,
    velocidadeMinima: SchemaTypes.Decimal,
    duracao: SchemaTypes.Decimal,
    direcaoContinuaMaxima: SchemaTypes.Decimal,
    tipoViagem: String,
    tipoTransporte: String,
    sentidoLinha: String,
    paradas: {
        motivoParada: String,
        dataHora: String
    },
    bilhetes: Number,
    localizacoes: String
});

schemaViagem.index({createDate: 1}, {expireAfterSeconds: 864000});

let viagem = mongoose.model('Viagem', schemaViagem, 'viagem');

safira.defineObject(viagem,'viagem');