const safira = require("safira");

class EmpresaService{
    constructor(empresaRepository,logger){
        this._empresaRepository = empresaRepository;
        this._logger = logger;
    }

    validarEmpresaFilhaDoCliente(clienteId, cnpjEmpresa){
        this._logger.info(`empresaService - validaIdCliente - clienteId: ${clienteId} - cnpj: ${cnpjEmpresa}`);

        let promises =[
            this._empresaRepository.consultaEmpresaPorCnpj(cnpjEmpresa),
            this._empresaRepository.consultaEmpresaPorCliente(clienteId)
        ];

        return Promise.all(promises)
            .then(result => {
                if(result[0] === clienteId)
                    return true;

                if(result[1] === cnpjEmpresa)
                    return true;

                return false;
            });
    }
}

safira.define(EmpresaService);
