const safira = require('safira');
const GenericFilter = require('./genericFilter').class;

class JornadaFilter extends GenericFilter{
    constructor(jornadaRepository){
        super(jornadaRepository);
    }
}

safira.define(JornadaFilter)
      .singleton(false);


