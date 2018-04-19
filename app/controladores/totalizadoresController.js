const safira = require('safira')

class TotalizadoresController{

    constructor(totalizadoresRepository, logger){
        this._totalizadoresRepository = totalizadoresRepository;
        this._logger = logger;
    }

    obterTotalizadores(req, res, next){
        this._logger.info(`totalizadoresRepository - obterTotalizadores - ${JSON.stringify(req.query)}`);

        let visao = req.query.visao;
        let data = req.query.data;
        let fields = {}

        if (visao == 'diaria'){
            fields["_id"] = 0;
            fields["linha"] = 1; 
            fields["clienteId"] = 1;
            fields["mes"] = 1;
            fields["porDia." + data] = 1;
        }else if (visao == 'mensal'){
            fields["_id"] = 0;
            fields["linha"] = 1; 
            fields["clienteId"] = 1;
            fields["mes"] = 1;
            fields["doMes"] = 1;
        }else{
            res.status(204) 
            .json({});
        }
        
        data = data.substr(0,7);
                
        this._totalizadoresRepository
            .filtrar()
                .porMes(data)
                .porCliente(req.idCliente)
            .obter()
                .totalizadores(fields)
                    .then(result => result.length ? res.json(result) : res.sendStatus(204))
                    .catch(error => next(error));

    }
}

safira.define(TotalizadoresController)