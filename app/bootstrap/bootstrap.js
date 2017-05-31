const consign = require('consign');

consign({cwd:'app'})
    .include('bootstrap/config.js')
    .then('bootstrap/express.js')
    .then('util')
    .then('database')
    .then('modelo')
    .then('repositorio/filtro')
    .then('repositorio')
    .then('servico')
    .then('controladores')
    .then('middleware/corsInterceptor.js')
    .then('middleware/tokenInterceptor.js')
    .then('middleware/authorizationInterceptor.js')
    .then('rotas')
    //.then('middleware/errorInterceptor.js')
    .then('bootstrap/runner.js')
    .into({});
