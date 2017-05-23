const safira = require("safira");

class EmpresaRepository{
    constructor(empresa,logger){
        this._empresa = empresa;
        this._logger = logger;
    }

    consultaEmpresa(cnpj){
        this._logger.info(`EmpresaRepository - cnpj: ${cnpj}`);

        
        return this._empresa.findAll({where: {cd_cnpj: cnpj}, attributes: ['id_cliente']})
                .then(result => result.length ? result : null);
        
    }
}

safira.define(EmpresaRepository);