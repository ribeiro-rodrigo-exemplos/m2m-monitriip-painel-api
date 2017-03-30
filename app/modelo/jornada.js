// private Integer idEvento;
// private String imei;
// private BigDecimal pdop;
// private String latitudeLongitude;
// private Date dataHoraEvento;

// private String id;
// private Date dataInicial;
// private Date dataFinal;
// private Integer identificacaoCliente;
// private String placaVeiculo;
// private String cpfMotorista;
// private Integer codigoSentidoLinha;

const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

const schemaJornada = mongoose.Schema({
    // idEvento: Number,
    // imei: String,
    // pdop: SchemaTypes.Decimal,
    // latLong: String,
    // dataHoraEvento: Date,
    // dataInicial: Date,
    // dataFinal: Date,
    // cliente: Number,
    // placaVeiculo: String,
    // cpfMotorista: String,
    // codigoSentidoLinha: Number
});

schemaJornada.index({createDate: 1}, {expireAfterSeconds: 864000});

mongoose.model('jornada', schemaJornada, 'jornadaMonitriip');