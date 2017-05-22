const safira = require('safira'); 

let controlador = safira.bean('viagemController');
const app = safira.bean('app');

app.route('/v1/viagens/totalizadores')
    .get(controlador.obterTotalizadoresDeViagens.bind(controlador));

app.route('/v1/viagens/extratos')
    .get(controlador.obterExtratosDeViagens.bind(controlador));

app.route('/v1/viagens/:id')
    .get(controlador.obterViagem.bind(controlador)); 


        
