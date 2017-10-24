const safira = require('safira');

let controlador = safira.bean('checkinController');
let app = safira.bean('app');

app.route('/v1/checkin/:idViagem')
    .get(controlador.obterBilhetesCheckin.bind(controlador));
