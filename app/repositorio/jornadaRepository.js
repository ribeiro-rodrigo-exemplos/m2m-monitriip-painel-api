const safira = require('safira');

class JornadaRepository{
    constructor(jornada,logger){
        this._jornada = jornada;
        this._logger = logger;
    }

    filtrar(){
        this._jornadaFilter = safira.bean('jornadaFilter');
        return this._jornadaFilter;
    }

    jornadas(){
        return this._prepareResult();
    }

    _prepareResult(fields){
        let filtro = this._jornadaFilter.filtro;
        this._logger.info(`JornadaRepository - _prepareResult - filter - ${JSON.stringify(filtro)}`);
        return this._jornada.find(filtro,fields).lean().exec();
    }
}

safira.define(JornadaRepository);