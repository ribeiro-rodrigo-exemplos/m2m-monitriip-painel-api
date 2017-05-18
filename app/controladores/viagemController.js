let logger = require('../util/log');

module.exports = () =>
    
    class ViagemController{
        constructor(viagemRepository, viagemService){
            this._viagemRepository = viagemRepository;
            this._viagemService = viagemService;
        }

        obterTotalizadoresDeViagens(req, res, next){

            const erros = this._validarParametrosDeConsulta(req);

            if (erros) {
                res.status(400)
                    .json(erros);
                return;
            } 

            this._viagemRepository
                .filtrar()
                    .porVeiculo(req.query.placaVeiculo)
                    .porMotorista(req.query.cpfMotorista)
                    .dataInicial(req.query.dataInicial)
                    .dataFinal(req.query.dataFinal)
                .obterTotalizadores()
                    .then(result => result ? res.json(result) : res.sendStatus(204))
                    .catch(error => next(error));
        }

        obterExtratosDeViagens(req,res,next){
            
            const erros = this._validarParametrosDeConsulta(req);

            if(erros){
                res.status(400)
                   .json(erros);
                return;
            }

            this._viagemRepository
                .filtrar()
                    .porVeiculo(req.query.placaVeiculo)
                    .porMotorista(req.query.cpfMotorista)
                    .dataInicial(req.query.dataInicial)
                    .dataFinal(req.query.dataFinal)
                .obterExtratos()
                    .then(result => result ? res.json(result) : res.sendStatus(204))
                    .catch(error => next(error))
        }

        obterViagem(req,res,next){

            this._viagemRepository
                .filtrar()
                    .porId(req.params.id)
                .obterViagem()
                .then(result => result ? res.json(result) : res.sendStatus(204))
                .catch(error => next(error));
        }

        _validarParametrosDeConsulta(req){
            req.checkQuery('dataInicial', 'deve estar no formato ISO').notEmpty();
            req.checkQuery('dataInicial', 'deve estar no formato ISO').isDate();
            req.checkQuery('dataFinal', 'deve estar no formato ISO').notEmpty();
            req.checkQuery('dataFinal', 'deve estar no formato ISO').isDate();
            req.checkQuery('cnpjCliente', 'deve estar preenchido').notEmpty();
            
            return req.validationErrors();
        }

    }