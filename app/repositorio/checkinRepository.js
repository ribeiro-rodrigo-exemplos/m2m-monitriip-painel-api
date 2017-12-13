const safira = require('safira');

class CheckinRepository{
    constructor(checkin,logger){
        this._checkin = checkin;
        this._logger = logger;
    }

    filtrar(){
        this._checkinFilter = safira.bean('checkinFilter');
        return this._checkinFilter;
    }

    bilhetesCheckin(){
        return this._prepareResult();
    }

    _prepareResult(fields){
        let filtro = this._checkinFilter.filtro;
        this._logger.info(`CheckinRepository - _prepareResult - filter - ${JSON.stringify(filtro)}`);
        return this._checkin.find(filtro,fields).lean().exec();
    }
}

safira.define(CheckinRepository);