const safira = require("safira");

class EmpresaRepository{
    constructor(empresa,logger){
        this._empresa = empresa;
        this._logger = logger;
        this._cache = [];
    }

    consultaEmpresa(cnpj){
        this._logger.info(`EmpresaRepository - consultaEmpresa - cnpj: ${cnpj}`);

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
}

safira.define(EmpresaRepository);