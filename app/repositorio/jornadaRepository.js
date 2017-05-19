let logger = require('../util/log');
const GenericFilter = require('./filtro/genericFilter')();

module.exports = () =>
    class JornadaRepository{
        constructor(jornada){
            this._jornada = jornada;
        }

        filtrar(){
            this._jornadaFilter = new GenericFilter(this);
            return this._jornadaFilter;
        }

        jornadas(){
            const fields = {
                coordenadasInicio:0,
                coordenadasFim:0
            }

            return this._prepareResult(fields);
        }

        _prepareResult(fields){
            let filtro = this._jornadaFilter.filtro;
            logger.info(`JornadaRepository - _prepareResult - filter - ${JSON.stringify(filtro)}`);
            return this._jornada.find(filtro,fields).lean().exec();
        }
    }