const safira = require('safira');

const Sequelize = require('sequelize');
let sequelize = require('../database/sso')();

let Cliente = sequelize.define('cliente', {
    idCliente: {
        type: Sequelize.BIGINT,
        field: 'id_cliente',
        primaryKey: true
    },
    cnpj: {
        type: Sequelize.STRING(20),
        field: 'cd_cnpj'
    }
}, {
    tableName: 'cliente',
    undescored: true,
    timestamps: false
});

safira.defineObject(Cliente,'cliente');
