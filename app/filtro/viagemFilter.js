const GenericFilter = require('./genericFilter');

module.exports = class ViagemFilter extends GenericFilter{
    constructor(repository){
        super(repository);
    }

    porId(idViagem){
        if(idViagem != undefined)
            this._filtro.idViagem = idViagem;

        return this;
    }
}