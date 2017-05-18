module.exports = app => {
    
    let controlador = app.beans.factory.viagemController;
    let apiTokenInterceptor = app.beans.factory.apiTokenInterceptor;

    app.use(apiTokenInterceptor.intercept.bind(apiTokenInterceptor));

    app.route('/v1/viagens/totalizadores')
        .get(controlador.obterTotalizadoresDeViagens.bind(controlador));

    app.route('/v1/viagens/extratos')
        .get(controlador.obterExtratosDeViagens.bind(controlador));
    
    app.route('/v1/viagens/:id')
        .get(controlador.obterViagem.bind(controlador));         
};