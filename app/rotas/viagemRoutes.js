const safira = require('safira'); 

module.exports = app => {
    let controlador = safira.bean('viagemController');
    let apiTokenInterceptor = safira.bean('apiTokenInterceptor');
    //let apiTokenInterceptor = app.beans.factory.apiTokenInterceptor;

    app.use(apiTokenInterceptor.intercept.bind(apiTokenInterceptor));

    app.route('/v1/viagens/totalizadores')
        .get(controlador.obterTotalizadoresDeViagens.bind(controlador));

    app.route('/v1/viagens/extratos')
        .get(controlador.obterExtratosDeViagens.bind(controlador));

    app.route('/v1/viagens/:id')
        .get(controlador.obterViagem.bind(controlador)); 
}

        
