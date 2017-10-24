const safira = require('safira');

class CheckinController{
    constructor(checkinRepository, logger){
        this._checkinRepository = checkinRepository;
        this._logger = logger;
    }

    obterBilhetesCheckin(req, res, next){
        this._logger.info(`CheckinController - obterBilheteCheckin - ${JSON.stringify(req.params)}`); 

        this._checkinRepository
            .filtrar()
                .porId(req.params.idViagem)
            .obter()
                .bilhetesCheckin()
                    .then(result => result.length ? res.json(result) : res.sendStatus(204))
                    .catch(error => next(error));

    }

}

safira.define(CheckinController);