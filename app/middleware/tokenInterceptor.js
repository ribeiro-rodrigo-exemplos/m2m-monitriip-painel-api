const safira = require('safira');

class TokenInterceptor{
    constructor(ssoService,app,logger) {
        this._ssoService = ssoService;
        this._recursosLiberados = [];
        this._logger = logger;

        app.use(this.intercept.bind(this));
    }

    liberar(...recursos) {
        this._recursosLiberados.push(...recursos);
    }

    obterToken(req) {
        return req.get('Authorization');
    }

    intercept(req, res, next) {
        if (this.recursoLiberado(req)) {
            next();
            return;
        }

        let token = this.obterToken(req);

        if (!token) {
            this._logger.error(`ApiTokenInterceptor - intercept - O recurso exige autenticação`);

            res.status(401)
                .send('O recurso exige autenticação');
            return;
        }

        token = token.replace("Bearer ", "");

        this._ssoService.decodificarWebToken(token)
            .then(decoded => {
                req.idCliente = decoded.idCliente;
                req.gmtCliente = decoded.gmtCliente
            })
            .then(() => next())
            .catch(erro => res.status(401).send('Token inválido. O recurso requisitado exige autenticação.'));
    }

    recursoLiberado(req) {
        if (req.method == 'OPTIONS' || req.method == 'HEAD') {
            return true;
        }

        return this._recursosLiberados.some(recurso =>
            recurso.method.includes(req.method) && recurso.path.test(req.baseUrl)
        );

    }
}

safira.define(TokenInterceptor);
safira.bean('tokenInterceptor');

