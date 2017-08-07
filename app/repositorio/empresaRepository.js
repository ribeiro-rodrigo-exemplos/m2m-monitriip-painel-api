const safira = require("safira");

class EmpresaRepository{
    constructor(empresa,logger,cliente){
        this._cliente = cliente;
        this._empresa = empresa;
        this._logger = logger;
        this._cache = [];
    }

    consultaEmpresaPorCnpj(cnpj){
        this._logger.info(`EmpresaRepository - consultaEmpresaPorCnpj - cnpj: ${cnpj}`);

        if(this._cache[cnpj]){
            return new Promise((resolve, reject) => resolve(this._cache[cnpj]));
        }else{
            return this._empresa.findAll({where: {cd_cnpj: cnpj}, attributes: ['id_cliente']})
                    .then(result => {
                        let idCliente = result.length ? result[0].dataValues.id_cliente : null;

                        if(idCliente != null)
                            this._cache[cnpj] = idCliente;

                        return idCliente;
                    });
        }
    }

    consultaEmpresaPorCliente(clienteId){
        this._logger.info(`EmpresaRepository - consultaEmpresaPorCliente - cliente: ${clienteId}`);

        if(this._cache[clienteId]){
            return new Promise((resolve, reject) => resolve(this._cache[clienteId]));
        }else{
            return this._cliente.findAll({where: {id_cliente: clienteId}, attributes: ['cd_cnpj']})
                    .then(result => {
                        let cnpj = result.length ? result[0].dataValues.cd_cnpj : null;

                        if(clienteId != null)
                            this._cache[clienteId] = cnpj;

                        return cnpj;
                    });
        }
    }
}

safira.define(EmpresaRepository);