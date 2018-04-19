const safira = require('safira');
const GenericFilter = require('./genericFilter').class;

class TotalizadoresFilter extends GenericFilter{
    constructor(totalizadoresRepository){
        super(totalizadoresRepository);
    }

    porMes(mes){
        if(mes != undefined)
            this._filtro.mes = mes;

        return this;
    }

}

safira.define(TotalizadoresFilter)
      .singleton(false);
