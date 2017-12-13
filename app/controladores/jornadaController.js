const safira = require('safira');

class JornadaController{
    constructor(jornadaRepository,logger){
        this._jornadaRepository = jornadaRepository;
        this._logger = logger;
    }

    obterJornadas(req,res,next){

        const erros = this._validarParametrosDeConsulta(req);

        if (erros){
            res.status(422)
                .json(erros);
            return;
        }    

        this._jornadaRepository
            .filtrar()
                .porVeiculo(req.query.placaVeiculo)
                .porMotorista(req.query.cpfMotorista)
                .porCliente({cnpj:req.query.cnpjCliente,id:req.idCliente})
                .comDataInicialIgualOuSuperior(req.query.dataInicial)
                .comDataInicialIgualOuInferior(req.query.dataFinal)
            .obter()
                .jornadas()
                .then(result => result.length ? res.json(result) : res.sendStatus(204));
    }

    _validarParametrosDeConsulta(req) {
        req.checkQuery('dataInicial', 'deve estar no formato ISO').notEmpty();
        req.checkQuery('dataInicial', 'deve estar no formato ISO').isDate();
        req.checkQuery('dataFinal', 'deve estar no formato ISO').notEmpty();
        req.checkQuery('dataFinal', 'deve estar no formato ISO').isDate();
        
        return req.validationErrors();
    }
}

safira.define(JornadaController);