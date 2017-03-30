module.exports = app => {

    let controlador = app.beans.factory.viagemController;

    app.route('/v1/viagens')
        .get(controlador.obter.bind(controlador));
};