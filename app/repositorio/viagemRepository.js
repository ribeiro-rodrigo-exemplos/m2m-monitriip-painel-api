const safira = require('safira');

class ViagemRepository {
    constructor(viagem,dateUtil,logger,totalizadoresAggregate,extratoAggregate) {
        this._viagem = viagem;
        this._dateUtil = dateUtil;
        this._logger = logger;
        this._totalizadoresAggregate = totalizadoresAggregate;
        this._extratoAggregate = extratoAggregate; 
    }

    filtrar(){
        this._viagemFilter = safira.bean('viagemFilter');
        return this._viagemFilter;
    }

    extratos(){
        this._logger.info(`ViagemRepository - extratos`);
        return this._prepareAggregate(this._extratoAggregate);
    }

    totalizadores(){
        this._logger.info('ViagemRepository - totalizadores')
        return this._prepareAggregate(this._totalizadoresAggregate);
    }

    viagem(){
        this._logger.info('ViagemRepository - viagem');
        return this._prepareResult();
    }

    _prepareResult(fields){
        let filtro = this._viagemFilter ? this._viagemFilter.filtro : {};
        this._logger.info(`ViagemRepository - _prepareResult - query - ${JSON.stringify(filtro)}`);

        return this._viagem.find(filtro,fields).lean().exec();
    }

    _prepareAggregate(query){

        if(this._viagemFilter)
            query = [{$match:this._viagemFilter.filtro}].concat(query);
        
        this._logger.info(`ViagemRepository - _prepareAggregate - query - ${JSON.stringify(query)}`);
        
        return this._viagem
                    .aggregate(query)
                    .then(result => result ? result : null);
    }    
}

safira.define(ViagemRepository);
