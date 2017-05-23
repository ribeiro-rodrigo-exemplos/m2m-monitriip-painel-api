const safira = require("safira");

class ClienteInterceptor{
    constructor(app,empresaService,logger){
        this._empresaService = empresaService;
        this._logger = logger;
        app.use(this.validaCliente.bind(this));
    }

    validaCliente(req,res,next){
        let idCliente = req.idCliente;
        let cnpjCliente = req.query.cnpjCliente;

        this._empresaService.validaIdCliente(idCliente, cnpjCliente)
            .then((mensagem)=>{
                if (mensagem){
                    res.status(400)
                        .json(mensagem);
                        return;
                }
                next();
            }).catch(erro => next(erro));
        
        
    }
}

safira.define(ClienteInterceptor);
safira.bean('clienteInterceptor');
