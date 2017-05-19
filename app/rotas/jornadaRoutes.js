module.exports = app => {
    let controlador = app.beans.factory.jornadaController;

    app.route('/v1/jornadas')
       .get(controlador.obterJornadas.bind(controlador));
}