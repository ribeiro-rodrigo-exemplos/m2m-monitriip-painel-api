const safira = require('safira');
const GenericFilter = require('./genericFilter').class;

class TotalizadoresFilter extends GenericFilter{
    constructor(totalizadoresRepository,dateUtil){
        super(totalizadoresRepository);
        
        this._dateUtil = dateUtil; 

        this._fields = {
            "_id":0, 
            "linha": 1, 
            "clienteId":1, 
            "mes":1
        }; 
    }

    porMes(mes){
        if(mes != undefined){
            this._filtro.mes = mes;
            this._fields["doMes"] = 1;
        }

        return this;
    }

    porData(data){
        if(data != undefined){
            this._filtro.mes = this._dateUtil.obterMesDaData(data); 
            this._fields["porDia." + data] = 1;
        }

        return this; 
    }

    get fields(){
        return this._fields; 
    }

}

safira.define(TotalizadoresFilter)
      .singleton(false);
