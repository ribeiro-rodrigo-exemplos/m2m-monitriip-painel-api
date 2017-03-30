let logger = require('../util/log');

module.exports = () =>
    
    class Viagem{
        constructor(viagemRepository){
            this._viagemRepository = viagemRepository;
        }

        obter(req, res, next){

            let objeto = {};
            let dataInicial = req.query.dataInicial ? req.query.dataInicial : null ;
            let dataFinal = req.query.dataFinal ? req.query.dataFinal : null ;
            let motorista = req.query.motorista ? req.query.motorista : null;
            let veiculo = req.query.veiculo ? req.query.veiculo.toUpperCase() : null;

            logger.info(`viagemController - obter - dataInicial: ${dataInicial} - dataFinal: ${dataFinal} - motorista: ${motorista} - veiculo: ${veiculo}`);

            this._viagemRepository.buscarViagens(dataInicial, dataFinal, motorista, veiculo)
                .then(data => {
                    if(!data.length){
                        res.sendStatus(204);
                        return;
                    }

                    res.json(data);
                    
                }).catch(erro => next(erro));

        }
        
    }