const safira = require('safira');

module.exports = app => {
    let controlador = safira.bean('jornadaController');

    app.route('/v1/jornadas')
       .get(controlador.obterJornadas.bind(controlador));
}