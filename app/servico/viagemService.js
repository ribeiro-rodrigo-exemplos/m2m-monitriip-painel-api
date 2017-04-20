let logger = require('../util/log');

module.exports = () => 
    class viagemService{
        constructor(viagemRepository){
            this._viagemRepository = viagemRepository;
        }

        validaIdCliente(clienteId, cnpj){
            logger.info(`viagemService - validaIdCliente - clienteId: ${clienteId} - cnpj: ${cnpj}`);

            return new Promise((resolve, reject)=>{
                this._viagemRepository.consultaEmpresa(cnpj)
                    .then(result => {
                        let idCliente = result[0].dataValues.id_cliente;
                        let idClienteToken = clienteId;
                        let mensagem;
                        
                        if(idCliente != idClienteToken){
                            mensagem = {"param": "cliente é diferente! idCliente=" + idCliente + " idClienteToken=" + idClienteToken};
                        }

                        resolve(mensagem);
                
                    }).catch(erro => reject(erro));
            })
        }
    }

