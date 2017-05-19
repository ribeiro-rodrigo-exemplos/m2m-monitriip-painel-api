let logger = require('../util/log');
const ViagemFilter = require('./filtro/viagemFilter')();

module.exports = () =>
    class ViagemRepository {
            constructor(viagem,dateUtil) {
                this._viagem = viagem;
                this._dateUtil = dateUtil; 
            }

            filtrar(){
                this._viagemFilter = new ViagemFilter(this);
                return this._viagemFilter;
            }

            extratos(){
                let query = [
                    {$group:{
                        _id:"$idViagem",
                        dataInicial:{$first:"$dataInicial"},
                        dataFinal:{$last:"$dataFinal"},
                        identificacaoLinha:{$first:"$identificacaoLinha"},
                        tipoTransporte:{$first:"$tipoTransporte"},
                        totalKm:{$sum:"$totalKm"},
                        tempo:{$sum:"$duracao"},
                        totalBilhetes:{$sum:"$totalBilhetes"},
                        totalParadas:{$sum:"$totalParadas"}
                    }}
                ];

                logger.info(`ViagemRepository - obterExtratos`);

                return this._prepareAggregate(query);
            }

            totalizadores(){
                let query = [
                    {$group:{
                        _id:"$dataInicial",
                        totalKm:{$sum:"$totalKm"},
                        tempo:{$sum:"$duracao"},
                        totalBilhetes:{$sum:"$totalBilhetes"},
                        totalParadas:{$sum:"$totalParadas"},
                        direcoesContinuas:{$push:"$direcaoContinua"},
                        paradas:{$push:"$paradas"},
                        motoristas:{$addToSet:"$cpfMotorista"},
                        SOLICITACAO_DE_PASSAGEIRO:{$sum:"$totalParadasPorMotivo.SOLICITACAO_DE_PASSAGEIRO"},
                        PROGRAMADA:{$sum:"$totalParadasPorMotivo.PROGRAMADA"},
                        SOLICITACAO_DE_MOTORISTA:{$sum:"$totalParadasPorMotivo.SOLICITACAO_DE_MOTORISTA"},
                        SOLICITACAO_EXTERNA:{$sum:"$totalParadasPorMotivo.SOLICITACAO_EXTERNA"},
                        SOLICITACAO_FISCALIZACAO:{$sum:"$totalParadasPorMotivo.SOLICITACAO_FISCALIZACAO"},
                        ACIDENTE_NA_VIA:{$sum:"$totalParadasPorMotivo.ACIDENTE_NA_VIA"},
                        ACIDENTE_COM_VEICULO:{$sum:"$totalParadasPorMotivo.ACIDENTE_COM_VEICULO"},
                        ACIDENTE_COM_PASSAGEIRO:{$sum:"$totalParadasPorMotivo.ACIDENTE_COM_PASSAGEIRO"},
                        DEFEITO_NO_VEICULO:{$sum:"$totalParadasPorMotivo.DEFEITO_NO_VEICULO"},
                        TROCA_PROGRAMADA_DE_VEICULO:{$sum:"$totalParadasPorMotivo.TROCA_PROGRAMADA_DE_VEICULO"},
                        OUTRO:{$sum:"$totalParadasPorMotivo.OUTRO"}
                    }}, 
                    {$unwind:"$paradas"},
                    {$unwind:"$paradas"},
                    {$group:{
                        _id:"$_id",
                        totalKm:{$first:"$totalKm"},
                        tempo:{$first:"$tempo"},
                        totalBilhetes:{$first:"$totalBilhetes"},
                        direcoesContinuas:{$first:"$direcoesContinuas"},
                        totalParadas:{$first:"$totalParadas"},
                        paradas:{$addToSet:"$paradas.motivoParada"},
                        motoristas:{$first:"$motoristas"},
                        SOLICITACAO_DE_PASSAGEIRO:{$first:"$SOLICITACAO_DE_PASSAGEIRO"},
                        PROGRAMADA:{$first:"$PROGRAMADA"},
                        SOLICITACAO_DE_MOTORISTA:{$first:"$SOLICITACAO_DE_MOTORISTA"},
                        SOLICITACAO_EXTERNA:{$first:"$SOLICITACAO_EXTERNA"},
                        SOLICITACAO_FISCALIZACAO:{$first:"$SOLICITACAO_FISCALIZACAO"},
                        ACIDENTE_NA_VIA:{$first:"$ACIDENTE_NA_VIA"},
                        ACIDENTE_COM_VEICULO:{$first:"$ACIDENTE_COM_VEICULO"},
                        ACIDENTE_COM_PASSAGEIRO:{$first:"$ACIDENTE_COM_PASSAGEIRO"},
                        DEFEITO_NO_VEICULO:{$first:"$DEFEITO_NO_VEICULO"},
                        TROCA_PROGRAMADA_DE_VEICULO:{$first:"$TROCA_PROGRAMADA_DE_VEICULO"},
                        OUTRO:{$first:"$OUTRO"} 
                    }}
                ];

                logger.info('ViagemRepository - obterTotalizadores')

                return this._prepareAggregate(query);
            }

            obterViagem(){
                return new Promise((resolve,reject) => {
                    resolve([{data:'2017-02-03'}]);
                });
            }

            _prepareAggregate(query){

                if(this._viagemFilter)
                    query = [{$match:this._viagemFilter.filtro}].concat(query);
                
                this._viagemFilter = null;

                logger.info(`ViagemRepository - _prepareAggregate - query - ${JSON.stringify(query)}`);
                
                return this._viagem
                           .aggregate(query)
                           .then(result => result ? result : null);
            }    
    }
