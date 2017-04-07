let logger = require('../util/log');
let moment = require('moment');

module.exports = () =>
    class viagemRepository {
            constructor(detalheViagem, dateUtil) {
                this._detalheViagem = detalheViagem;
                this._dateUtil = dateUtil;
            }

            buscarDetalheViagem(dataInicial, dataFinal, motorista, veiculo){
                logger.info(`viagemRepository - buscarViagens - dataInicial: ${dataInicial} - dataFinal: ${dataFinal} - motorista: ${motorista} - veiculo: ${veiculo}`);

                return new Promise((resolve, reject) => {
                    dataInicial = this._dateUtil.formataDataHora(dataInicial, "", "", this._dateUtil.tipoRetorno.DATA);
                    dataFinal = this._dateUtil.formataDataHora(dataFinal, "", "", this._dateUtil.tipoRetorno.DATA);

                    let query = 

                    this._viagem.find(query).lean().exec()
                        .then(result => {
                            resolve(result ? result : null)
                            })
                        .catch(erro => reject(erro));
                });
            }

    }
