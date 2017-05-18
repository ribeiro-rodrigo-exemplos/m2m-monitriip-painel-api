let logger = require('../util/log');
let moment = require('moment');

module.exports = () =>
    class viagemRepository {
            constructor(viagem,dateUtil) {
                this._viagem = viagem;
                this._dateUtil = dateUtil; 
            }

            filtrar(){
                this._filtro = {};
                return this;
            }

            porId(idViagem){
                if(idViagem != undefined)
                    this._filtro.idViagem = idViagem;

                return this;
            }

            porVeiculo(placa){
                if(placa != undefined)
                    this._filtro.placaVeiculo = placa;

                return this;
            }

            porMotorista(cpf){
                if(cpf != undefined)
                    this._filtro.cpfMotorista = cpf;

                return this;
            }

            dataInicial(data){
                if(data != undefined){
                    this._filtro.dataInicial = this._filtro.dataInicial ? this._filtro.dataInicial : {};
                    this._filtro.dataInicial.$gte = data; 
                }

                return this;
            }

            dataFinal(data){
                if(data != undefined){
                    this._filtro.dataInicial = this._filtro.dataInicial ? this._filtro.dataInicial : {};
                    this._filtro.dataInicial.$lte = data;
                }

                return this;
            }

            obterExtratos(){
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

                return this._prepareAggregate(query);
            }

            obterTotalizadores(){
                return new Promise((resolve,reject) => {
                    resolve([{data:'2017-02-03'}]);
                });
            }

            obterViagem(){
                return new Promise((resolve,reject) => {
                    resolve([{data:'2017-02-03'}]);
                });
            }

            _prepareAggregate(query){

                if(this._filtro)
                    query = [{$match:this._filtro}].concat(query);
                
                return this._viagem
                           .aggregate(query)
                           .then(result => result ? result : null);
            }    
    }
