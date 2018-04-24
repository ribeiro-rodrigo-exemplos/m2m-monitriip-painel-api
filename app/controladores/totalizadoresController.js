const safira = require('safira')

class TotalizadoresController{

    constructor(totalizadoresRepository, logger){
        this._totalizadoresRepository = totalizadoresRepository;
        this._logger = logger;
    }

    obterTotalizadores(req, res, next){
        this._logger.info(`totalizadoresRepository - obterTotalizadores - ${JSON.stringify(req.query)}`);

        let data = req.query.data;
        let mes = req.query.mes; 

        let filtro =  this._totalizadoresRepository
                            .filtrar()
                            .porCliente(req.idCliente)

        if(mes)
            filtro = filtro.porMes(mes) 
        else 
            if(data)
                filtro = filtro.porData(data); 
        
        filtro.obter()
                .totalizadores()
                    .then(result => result.length ? res.json(result) : res.sendStatus(204))
                    .catch(error => next(error));
    }
}

safira.define(TotalizadoresController)