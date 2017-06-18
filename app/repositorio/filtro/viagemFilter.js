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

    comDataDeInicioDaViagemIgualOuSuperior(dataInicioViagem){
        if(dataInicioViagem != undefined){
            this._filtro.dataInicialViagem = this._filtro.dataInicioViagem ? this._filtro.dataInicioViagem : {};
            this._filtro.dataInicialViagem.$gte = dataInicioViagem;
        }
            
        return this;
    }

    comDataDeInicioDaViagemIgualOuInferior(dataInicioViagem){
        if(dataInicioViagem != undefined){
            this._filtro.dataInicialViagem = this._filtro.dataInicioViagem ? this._filtro.dataInicioViagem : {};
            this._filtro.dataInicialViagem.$lte = dataInicioViagem;
        }
        
        return this;
    }
}

safira.define(ViagemFilter)
      .singleton(false);
