module.exports = app => {
    
    let controlador = app.beans.factory.viagemController;
    let apiTokenInterceptor = app.beans.factory.apiTokenInterceptor;

    app.use(apiTokenInterceptor.intercept.bind(apiTokenInterceptor));

    app.route('/v1/viagens')
        .get(controlador.obter.bind(controlador));
    
    app.route('/v1/viagem/:id')
        .get(controlador.obterPorId.bind(controlador));
           
};