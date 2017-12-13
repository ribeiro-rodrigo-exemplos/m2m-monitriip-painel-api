const safira = require('safira');
const GenericFilter = require('./genericFilter').class;

class CheckinFilter extends GenericFilter{
    constructor(checkinRepository){
        super(checkinRepository);
    }

    porId(idViagem){
        if(idViagem != undefined)
            this._filtro.idViagem = idViagem;

        return this;
    }

}

safira.define(CheckinFilter)
      .singleton(false);
