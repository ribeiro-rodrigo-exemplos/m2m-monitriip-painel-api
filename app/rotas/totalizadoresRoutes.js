const safira = require('safira');

let controlador = safira.bean('totalizadoresController');
let app = safira.bean('app');

app.route('/v1/totalizadores')
    .get(controlador.obterTotalizadores.bind(controlador))
