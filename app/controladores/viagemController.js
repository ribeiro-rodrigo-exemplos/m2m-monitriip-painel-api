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

            let promises = [
                this._viagemRepository.buscarViagens(dataInicial, dataFinal, motorista, veiculo),
                this._viagemRepository.buscarJornadas(dataInicial, dataFinal, motorista, veiculo),
                this._viagemRepository.buscarTotalizadores(dataInicial, dataFinal, motorista, veiculo)
            ];

            Promise.all(promises)
                .then(result => {
                    objeto.viagens = result[0];
                    objeto.jornada = result[1];
                    objeto.totalizadores = result[2];
                }).then(() => {
                    res.json(objeto);
                }).catch(erro => next(erro));
        }
    }