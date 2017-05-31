const safira = require("safira");

class AuthorizationInterceptor{
    constructor(app,empresaService,logger){
        this._empresaService = empresaService;
        this._logger = logger;

        app.use(this.validaPermissaoParaConsultarComCnpj.bind(this));
    }

    validaPermissaoParaConsultarComCnpj(req,res,next){
        let idCliente = req.idCliente;
        let cnpjCliente = req.query.cnpjCliente;

        this._logger.info(`AuthorizationInterceptor - validaPermissaoParaConsultarComCnpj - clienteId: ${idCliente} - cnpj: ${cnpjCliente}`);

        if(!cnpjCliente){
            next();
            return; 
        }
            
        this._empresaService.validarEmpresaFilhaDoCliente(idCliente, cnpjCliente)
            .then(ehFilha => {
                ehFilha ? next() : res.status(403).send({param:"cnpjCliente",msg:"Não possui permissão para consultar com o cnpj",value:cnpjCliente})
            })
            .catch(erro => next(erro));    
    }
}

safira.define(AuthorizationInterceptor);
safira.bean('authorizationInterceptor');
