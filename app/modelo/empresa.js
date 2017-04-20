const Sequelize = require('sequelize');
let sequelize = require('../database/frota')();

let Empresa = sequelize.define("empresa", {
    cnpj: {
        type: Sequelize.STRING(14),
        field: "cd_cnpj"
    },
    idCliente: {
        type: Sequelize.INTEGER(4),
        field: "id_cliente"
    }
}, {
    tableName: 'empresa',
    undescored: true,
    timestamps: false
});

module.exports = Empresa;

