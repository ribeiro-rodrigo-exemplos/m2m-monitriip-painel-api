const safira = require('safira');
const GenericFilter = require('./genericFilter').class;

class ViagemFilter extends GenericFilter{
    constructor(viagemRepository){
        super(viagemRepository);
    }

    porId(idViagem){
        if(idViagem != undefined)
            this._filtro.idViagem = idViagem;

        return this;
    }
}

safira.define(ViagemFilter)
      .singleton(false);
