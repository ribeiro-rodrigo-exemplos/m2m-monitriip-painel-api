const safira = require("safira");

class EmpresaService{
    constructor(empresaRepository,logger){
        this._empresaRepository = empresaRepository;
        this._logger = logger;
    }

    validaIdCliente(clienteId, cnpj){
        this._logger.info(`empresaService - validaIdCliente - clienteId: ${clienteId} - cnpj: ${cnpj}`);
        
        return this._empresaRepository.consultaEmpresa(cnpj)
            .then(idCliente => {
                let idClienteToken = clienteId;
                let mensagem;
                
                if(idCliente != idClienteToken){
                    mensagem = {"param": `cliente é diferente! idCliente= ${idCliente} idClienteToken= ${idClienteToken}`};
                }

                return mensagem;
            });
    }
}

safira.define(EmpresaService);