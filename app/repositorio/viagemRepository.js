let logger = require('../util/log');
let moment = require('moment');

module.exports = () =>
    class viagemRepository {
            constructor(viagem, jornada, totalizadores, dateUtil) {
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

                    this._viagem.find(query).lean().exec()
                        .then(result => {
                            resolve(result ? result : null)
                            })
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

                    this._jornada.find(query).lean().exec()
                        .then(result => {
                            resolve(result ? result : null)
                            })
                        .catch(erro => reject(erro));
                });
            }


            buscarTotalizadores(dataInicial, dataFinal, motorista, veiculo){
                logger.info(`viagemRepository - buscarTotalizadores - dataInicial: ${dataInicial} - dataFinal: ${dataFinal} - motorista: ${motorista} - veiculo: ${veiculo}`);

                return new Promise((resolve, reject) => {
                    dataInicial = this._dateUtil.formataDataHora(dataInicial, "", "", this._dateUtil.tipoRetorno.DATA);
                    dataFinal = this._dateUtil.formataDataHora(dataFinal, "", "", this._dateUtil.tipoRetorno.DATA);

                    let query = [								
                                    {$match: { dataInicio: {$gte:  new Date(dataInicial), $lte: new Date(dataFinal)}, 
                                                motorista: motorista, 
                                                veiculo: veiculo}},
                                    {$group: {_id: {}, totalParada: {$sum: "$paradas"}, 
                                                        totalBilhetes: {$sum: "$bilhetes"}, 
                                                        totalTempo: {$sum: "$tempoMin"},
                                                        totalQuilometragem: {$sum: "$quilometro"}
                                                        }}
                                ];
                    
                    this._viagem.aggregate(query)
                        .then(result => {
                            resolve(result ? result : null);
                        })
                        .catch(erro => reject(erro));
                });
            }

    }
