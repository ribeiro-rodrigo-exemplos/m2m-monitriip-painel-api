let jwt = require('jsonwebtoken');
const logger = require('../util/log');
const jwtKey = require('../bootstrap/config-bootstrap')()['jwtKey'];
const safira = require('safira');

class SSOService {
    constructor(jwtKey) {
        this._webTokenPass = jwtKey;
    }

    autenticar(credenciais) {
        logger.info(`SSOService - autenticar - credenciais: ${credenciais}`);

        return new Promise((resolve, reject) => {
            this._client.post('/AutenticarUsuario', credenciais, (erro, req, res, result) => {
                if (erro) {
                    this._resolveError(erro, reject);
                    return;
                }
                resolve(result);
            });
        });
    }

    possuiPermissaoParaOMonitrip(decoded) {
        logger.info(`SSOService - possuiPermissaoParaOMonitrip: ${decoded.funcionalidades.indexOf('Monitrip') >= 0 ? true : false}`);
        return decoded.funcionalidades.indexOf('Monitrip') >= 0 ? true : false;
    }

    decodificarToken(token) {
        return this._decodificarToken(token, this._apiTokenPass);
    }

    decodificarWebToken(token) {
        return this._decodificarToken(token, this._webTokenPass)
    }

    _decodificarToken(token, tokenPass) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, tokenPass, (erro, decoded) => {
                if (erro)
                    reject(erro);
                else
                    resolve(decoded);
            });
        });
    }

    _resolveError(erro, reject) {
        if (!erro.body.RetornoOk) {
            erro = new Error('Usuário ou senha incorretos');
            logger.error(`SSOService - _resolveError - erro: ${erro}`);
            erro.status = 401;
        }
        reject(erro);
    }
}

safira.define(SSOService,'ssoService')
      .constructorArg({value:jwtKey,name:"jwtKey"});

