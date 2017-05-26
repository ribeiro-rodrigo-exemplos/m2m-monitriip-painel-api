const safira = require("safira");

class EmpresaService{
    constructor(empresaRepository,logger){
        this._empresaRepository = empresaRepository;
        this._logger = logger;
    }

    validarEmpresaFilhaDoCliente(clienteId, cnpjEmpresa){
        this._logger.info(`empresaService - validaIdCliente - clienteId: ${clienteId} - cnpj: ${cnpjEmpresa}`);
        
        return this._empresaRepository.consultaEmpresa(cnpjEmpresa)
                                        .then(idClienteEmpresa => idClienteEmpresa === clienteId);
    }
}

safira.define(EmpresaService);
