module.exports = app => {

    let controlador = app.beans.factory.detalheViagemController;

    app.route('/v1/viagens/:id/:filter')
        //.get(controlador.obterDetalheViagem.bind(controlador));
};