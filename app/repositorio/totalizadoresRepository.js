const safira = require('safira');

class TotalizadoresRepository{
    constructor(totalizadores,logger){
        this._totalizadores = totalizadores;
        this._logger = logger;
    }

    filtrar(){
        this._totalizadoresFilter = safira.bean('totalizadoresFilter');
        return this._totalizadoresFilter;
    }

    totalizadores(fields){
        return this._prepareResult(fields);
    }

    _prepareResult(fields){
        let filtro = this._totalizadoresFilter.filtro;
        this._logger.info(`TotalizadoresRepository - _prepareResult - filter - ${JSON.stringify(filtro)} - fields ${JSON.stringify(fields)}`);
        return this._totalizadores.find(filtro,fields).lean().exec();
    }
}

safira.define(TotalizadoresRepository);