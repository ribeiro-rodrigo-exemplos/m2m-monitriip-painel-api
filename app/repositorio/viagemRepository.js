let logger = require('../util/log');
let moment = require('moment');

module.exports = () =>
    class viagemRepository {
            constructor(viagem, jornada, dateUtil) {
                this._viagem = viagem;
                this._jornada = jornada;
                this._dateUtil = dateUtil;
            }

            buscarViagens(dataInicial, dataFinal, motorista, veiculo){
                logger.info(`viagemRepository - buscarViagens - dataInicial: ${dataInicial} - dataFinal: ${dataFinal} - motorista: ${motorista} - veiculo: ${veiculo}`);

                return new Promise((resolve, reject) => {
                    dataInicial = this._dateUtil.formataDataHora(dataInicial, "", "", this._dateUtil.tipoRetorno.DATA);
                    dataFinal = this._dateUtil.formataDataHora(dataFinal, "", "", this._dateUtil.tipoRetorno.DATA);

                    let query = {
                        motorista: motorista,
                        veiculo: veiculo,
                        $and: [{dataInicio: {$gte: new Date(dataInicial)}},{dataInicio: {$lte: new Date(dataFinal)}}]
                    }

                    this._viagem.find(query)
                        .then(result => resolve(result ? result : null))
                        .catch(erro => reject(erro));
                });
            }


            buscarJornadas(dataInicial, dataFinal, motorista, veiculo){
                logger.info(`viagemRepository - buscarJornadas - dataInicial: ${dataInicial} - dataFinal: ${dataFinal} - motorista: ${motorista} - veiculo: ${veiculo}`);

                return new Promise((resolve, reject) => {
                    dataInicial = this._dateUtil.formataDataHora(dataInicial, "", "", this._dateUtil.tipoRetorno.DATA);
                    dataFinal = this._dateUtil.formataDataHora(dataFinal, "", "", this._dateUtil.tipoRetorno.DATA);

                    let query = {
                        motorista: motorista,
                        veiculo: veiculo,
                        $and: [{dataInicio: {$gte: new Date(dataInicial)}},{dataInicio: {$lte: new Date(dataFinal)}}]
                    }

                    this._jornada.find(query)
                        .then(result => resolve(result ? result : null))
                        .catch(erro => reject(erro));
                });
            }

    }
