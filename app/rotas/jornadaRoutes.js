const safira = require('safira');

let controlador = safira.bean('jornadaController');
let app = safira.bean('app');

app.route('/v1/jornadas')
    .get(controlador.obterJornadas.bind(controlador));
